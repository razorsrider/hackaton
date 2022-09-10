import { ResourceActionCreators } from './resource/action-creator';
import { AuthActionCreators } from './auth/action-creator';

export const ActionCreators = {
  ...ResourceActionCreators,
  ...AuthActionCreators,
};
