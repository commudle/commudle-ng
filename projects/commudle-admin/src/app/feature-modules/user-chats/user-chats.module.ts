import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatsContainerComponent} from './components/chats-container/chats-container.component';
import {ChatsListComponent} from './components/chats-list/chats-list.component';
import {SharedComponentsModule} from '../../../../../shared-components/shared-components.module';
import {NbCardModule, NbListModule, NbUserModule} from '@nebular/theme';
import {ChatsWindowComponent} from './components/chats-window/chats-window.component';


@NgModule({
  declarations: [ChatsContainerComponent, ChatsListComponent, ChatsWindowComponent],
  exports: [
    ChatsContainerComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
  ]
})
export class UserChatsModule {
}
