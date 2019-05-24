import * as ValueListActions from './value.actions';
import { IValue } from '../IValue';

export const ADD_USER = 'ADD_USER';

export interface State {
    values: IValue[];
}

const initialState = {
    values: [
        { id: 4, name: 'Gauvet' },
        { id: 5, name: 'Kona' }
    ]
};

export function valuesReducer(state = initialState, action: ValueListActions.ValueListActions) {
    switch (action.type) {
        case ValueListActions.ADD_USER:
            return {
                ...state,
                values: [...state.values, action.payload]
            };
        default:
            return state;
    }
}
