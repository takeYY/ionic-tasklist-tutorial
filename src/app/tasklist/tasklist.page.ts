import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deleteTask, updateTask } from '../app-store/actions/session.actions';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
})
export class TasklistPage implements OnInit {
  tasks$: Observable<{ name: string }[]>;

  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private store: Store<{ tasks: { name: string }[] }>,
  ) {
    this.tasks$ = store.select('tasks');
  }

  ngOnInit() {}

  async changeTask(index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'タスクの変更',
      buttons: [
        {
          text: '削除',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this._checkDelete(index);
          },
        },
        {
          text: '変更',
          icon: 'create',
          handler: () => {
            this._renameTask(index);
          },
        },
        {
          text: '閉じる',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    actionSheet.present();
  }

  async _checkDelete(index: number) {
    const prompt = await this.alertController.create({
      header: '本当に削除しますか？',
      buttons: [
        {
          text: '閉じる',
        },
        {
          text: '削除',
          role: 'destructive',
          handler: () => {
            this.store.dispatch(deleteTask({ index }));
          },
        },
      ],
    });
    prompt.present();
  }

  async _renameTask(index: number) {
    const prompt = await this.alertController.create({
      header: '変更後のタスク',
      inputs: [
        {
          name: 'task',
          placeholder: 'タスク',
          value: this.tasks$[index].name,
        },
      ],
      buttons: [
        {
          text: '閉じる',
        },
        {
          text: '保存',
          handler: (data) => {
            this.store.dispatch(updateTask({ index, name: data.task }));
          },
        },
      ],
    });
    prompt.present();
  }
}
