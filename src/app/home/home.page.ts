import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { createTask } from '../app-store/actions/session.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  title = 'タスク登録';
  tasks$: Observable<{ name: string }[]>;

  taskName: string;

  constructor(private store: Store<{ tasks: { name: string }[] }>) {
    this.tasks$ = store.select('tasks');
  }

  addTask() {
    this.store.dispatch(createTask({ name: this.taskName }));
    this.taskName = '';
  }
}
