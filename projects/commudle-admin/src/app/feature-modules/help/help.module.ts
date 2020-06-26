import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';
import { CreateEventComponent } from './create-event/create-event.component';


@NgModule({
  declarations: [HelpComponent, CreateEventComponent],
  imports: [
    CommonModule,
    HelpRoutingModule
  ]
})
export class HelpModule { }
