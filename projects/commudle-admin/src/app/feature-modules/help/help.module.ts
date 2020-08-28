import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { HelpHomeComponent } from './components/help-home/help-home.component';
import { CreateEventComponent } from './components/create-event/create-event.component';


@NgModule({
  declarations: [
    CreateEventComponent,
    MenuComponent,
    HelpHomeComponent
  ],
  imports: [
    CommonModule,
    HelpRoutingModule
  ]
})
export class HelpModule { }
