import { Action, createReducer, on } from '@ngrx/store';
import * as SessionActions from '../actions/session.actions';
import { Task } from '../../tasklist/type';

export const initialState: Task[] = [];

export const sessionFeatureKey = 'session';

export interface State {
  task: string;
}

export const reducer = createReducer(
  initialState,
  on(SessionActions.createTask, (state, action) => [...state, { name: action.name }]),
  on(SessionActions.updateTask, (state, action) => {
    const array = [...state];
    array[action.index] = { name: action.name };
    return array;
  }),
  on(SessionActions.deleteTask, (state, action) =>
    state.filter((_, index) => index !== action.index),
  ),
);

export const taskReducer = (taskList: Task[], action: Action): Task[] => reducer(taskList, action);
