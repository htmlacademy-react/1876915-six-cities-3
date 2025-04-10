import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { store, userProcessActions } from '../store';
import { dropUserData, getToken } from './token';
import { AuthorizationStatus } from '../const';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

type AxiosResponseDataType = {
  type: string;
  message: string;
}

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities/';
const REQUEST_TIMEOUT = 5000;

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (status: number) => !!StatusCodeMapping[status];

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = getToken();
  if (token && config.headers) {
    config.headers['X-Token'] = token;
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = (error: AxiosError<AxiosResponseDataType>): Promise<AxiosError> => {
  const response = error.response;

  if (response) {
    if (response.status === +StatusCodes.UNAUTHORIZED) {
      store.dispatch(userProcessActions.setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dropUserData();
    }

    if (shouldDisplayError(response.status)) {
      toast.warn(response.data.message);
    }
  }

  return Promise.reject(error);
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(onRequest, onRequestError);
  api.interceptors.response.use(onResponse, onResponseError);

  return api;
};
