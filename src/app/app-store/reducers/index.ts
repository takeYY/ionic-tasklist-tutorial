import { ActionReducerMap } from '@ngrx/store';

import { Task } from '../../tasklist/type';
import { taskReducer } from './session.reducer';

export type Reducers = {
  taskList: Task[];
};

export const reducers: ActionReducerMap<Reducers> = {
  taskList: taskReducer,
};
