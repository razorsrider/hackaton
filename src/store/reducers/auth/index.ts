// import { IUser } from '@/model/user';
import {AuthState, AuthAction, AuthActionEnum} from './type';

const initialState: AuthState = {
    isAuth: false,
    error: '',
    isLoading: false,
    user: {},
};

export const authReducer = (
    state = initialState,
    action: AuthAction
): AuthState => {
    switch (action.type) {
        case AuthActionEnum.SET_AUTH:
            return {...state, isAuth: action.payload, isLoading: false};
        case AuthActionEnum.SET_USER:
            return {...state, user: action.payload};
        case AuthActionEnum.SET_ERROR:
            return {...state, error: action.payload, isLoading: false};
        case AuthActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload};
        default:
            return state;
    }
};
