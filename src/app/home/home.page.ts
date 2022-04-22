import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public folder: string;
  title = 'タスク登録';
  tasks: { name: string }[] = [];

  task: string;
  constructor() {}

  ngOnInit() {
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  }

  ionViewWillEnter() {
    if ('task' in localStorage) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  }

  addTask() {
    this.tasks.push({
      name: this.task,
    });
    localStorage.tasks = JSON.stringify(this.tasks);
    this.task = '';
  }
}
