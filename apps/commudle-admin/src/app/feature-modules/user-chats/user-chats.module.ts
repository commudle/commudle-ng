import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbBadgeModule, NbButtonModule, NbCardModule, NbIconModule, NbListModule, NbTooltipModule, NbUserModule } from '@nebular/theme';
import { SharedComponentsModule } from '@commudle/shared-components';
import { ChatsContainerComponent } from './components/chats-container/chats-container.component';
import { ChatsListComponent } from './components/chats-list/chats-list.component';
import { ChatsWindowComponent } from './components/chats-window/chats-window.component';


@NgModule({
  declarations: [
    ChatsContainerComponent,
    ChatsListComponent,
    ChatsWindowComponent
  ],
  exports: [
    ChatsContainerComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,

    // Nebular
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbBadgeModule
  ]
})
export class UserChatsModule {
}
