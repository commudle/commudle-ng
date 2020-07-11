import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { CreateEventComponent } from './create-event/create-event.component';


@NgModule({
  declarations: [CreateEventComponent],
  imports: [
    CommonModule,
    HelpRoutingModule
  ]
})
export class HelpModule { }
