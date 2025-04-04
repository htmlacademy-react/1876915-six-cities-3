import { useMemo } from 'react';
import { useAppDispatch } from './use-app-dispatch';
import { ActionCreatorsMapObject, AsyncThunk, bindActionCreators } from '@reduxjs/toolkit';

type BoundAction<Actions extends ActionCreatorsMapObject> = { [key in keyof Actions]: Actions[key] extends AsyncThunk<unknown, unknown, Record<PropertyKey, unknown>> ? BoundAsyncThunk<Actions[key]> : Actions[key] }
type BoundAsyncThunk<Thunk extends AsyncThunk<unknown, unknown, Record<PropertyKey, unknown>>> = (...args: Parameters<Thunk>) => ReturnType<ReturnType<Thunk>>;

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(actions: Actions): BoundAction<Actions> => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
};

