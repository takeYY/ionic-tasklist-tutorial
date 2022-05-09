import { createAction, props, union } from '@ngrx/store';
import { Task } from '../../tasklist/type';

export const readTasks = createAction('read Tasks', props<{ tasklist: Task[] }>());
export const createTask = createAction('create Task', props<{ name: string }>());
export const updateTask = createAction('update Task', props<{ index: number; name: string }>());
export const deleteTask = createAction('delete Task', props<{ index: number }>());

const actions = union({
  readTasks,
  createTask,
  updateTask,
  deleteTask,
});

export type SessionUnionActions = typeof actions;
