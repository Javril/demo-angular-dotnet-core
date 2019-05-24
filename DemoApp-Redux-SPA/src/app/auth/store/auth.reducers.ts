import { Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface State {
    token: string;
    isAuthenticated: boolean;
}

const initialState = {
    token: '',
    isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.SIGNUP:
        case AuthActions.SIGNIN:
            return {
                ...state,
                isAuthenticated: true
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false
            };
        default:
            return state;
    }
}