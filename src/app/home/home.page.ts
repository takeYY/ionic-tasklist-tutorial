import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public folder: string;
  title = 'タスク管理';
  tasks: { name: string }[] = [];

  task: string;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ionViewWillEnter() {
    if ('task' in localStorage) {
      this.tasks = JSON.parse(localStorage.tasks);
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
