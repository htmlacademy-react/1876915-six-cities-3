import { AppDispatch } from '../types';
import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useActionCreator = <Actions extends ActionCreatorsMapObject>(actions: Actions) => {
  const dispatch = useDispatch<AppDispatch>();

  return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
};


