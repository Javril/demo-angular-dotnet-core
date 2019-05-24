import * as FromAuth from '../auth/store/auth.reducers';
import * as FromCount from '../redux/counter/counter.reducer';
import * as FromValueList from '../value/store/value.reducers';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    auth: FromAuth.State;
    count: number;
    valueList: FromValueList.State;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: FromAuth.authReducer,
    count: FromCount.counterReducer,
    valueList: FromValueList.valuesReducer
};
