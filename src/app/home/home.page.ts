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
  tasks: { name: string }[] = [{ name: 'タスク1' }, { name: 'タスク2' }];
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
}
