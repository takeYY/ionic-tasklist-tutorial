import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
})
export class TasklistPage implements OnInit {
  tasks: { name: string }[] = [];
  constructor(
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if ('tasks' in localStorage) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  }

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
            this.tasks.splice(index, 1);
            localStorage.tasks = JSON.stringify(this.tasks);
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
          value: this.tasks[index].name,
        },
      ],
      buttons: [
        {
          text: '閉じる',
        },
        {
          text: '保存',
          handler: (data) => {
            this.tasks[index] = { name: data.task };
            localStorage.tasks = JSON.stringify(this.tasks);
          },
        },
      ],
    });
    prompt.present();
  }
}
