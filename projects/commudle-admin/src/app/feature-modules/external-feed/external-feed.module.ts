import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalFeedComponent } from './components/external-feed/external-feed.component';
import { ExternalFeedRoutingModule } from './external-feed-routing.module';
import {
  NbCardModule,
  NbSelectModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbPopoverModule,
  NbCheckboxModule
} from '@nebular/theme';

@NgModule({
  declarations: [ExternalFeedComponent],
  imports: [
    CommonModule,
    ExternalFeedRoutingModule,

    // nebular
    NbCardModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbPopoverModule,
    NbCheckboxModule
  ]
})
export class ExternalFeedModule { }
