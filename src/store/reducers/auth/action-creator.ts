import { Dispatch } from 'redux';
import { IUser } from '@/model/user';
import { openErrorNotification } from '@/components/notification/notification';
import UserStorage from '@/core/storage/user-storage';
import UserService from '@/core/api/user-service';
import {
  SetUserAction,
  AuthActionEnum,
  SetAuthAction,
  SetIsLoadingAction,
  SetErrorAction,
  AuthAction,
} from './type';

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload: user,
  }),
  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: auth,
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload,
  }),
  login: (login: string, password: string) => async (
    dispatch: Dispatch<AuthAction>
  ) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      setTimeout(async () => {
        const response = await UserService.login(login, password);
        if (response.success) {
          UserStorage.accessToken = response.data.token.accessToken;
          const { user } = response.data;
          dispatch(AuthActionCreators.setUser(user));
          dispatch(AuthActionCreators.setIsAuth(true));
        } else {
          dispatch(AuthActionCreators.setError('Неверный логин или пароль'));
          openErrorNotification('Ошибка', 'Некорректный логин или пароль');
        }
        dispatch(AuthActionCreators.setIsLoading(false));
      }, 300);
    } catch (e) {
      dispatch(AuthActionCreators.setError('Неверный логин или пароль'));
    }
  },
  logout: () => async (dispatch: Dispatch<AuthAction>) => {
    UserStorage.clear();
    dispatch(AuthActionCreators.setUser({} as IUser));
    dispatch(AuthActionCreators.setIsAuth(false));
  },
};
