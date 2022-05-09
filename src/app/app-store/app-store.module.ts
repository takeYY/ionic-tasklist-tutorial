import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['todos'] })(reducer);
}

@NgModule({
  declarations: [],
  imports: [CommonModule, !environment.production ? StoreDevtoolsModule.instrument() : []],
})
export class AppStoreModule {}
