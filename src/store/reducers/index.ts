import { combineReducers } from 'redux';
import { resourceReducer } from './resource';
import { authReducer } from './auth';

export const rootReducer = combineReducers({
  resource: resourceReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
