import { Action } from '@ngrx/store';
import { IValue } from '../IValue';

export const ADD_USER = 'ADD_USER';

export class AddUser implements Action {
    readonly type = ADD_USER;
    payload: IValue;
}

export type ValueListActions = AddUser;
