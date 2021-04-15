import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleExternalFeedComponent } from './components/single-external-feed/single-external-feed.component';
import { ExternalFeedRoutingModule } from './external-feed-routing.module';
import { SingleExternalFeedDetailsComponent } from './components/single-external-feed-details/single-external-feed-details.component'
import { ExternalFeedComponent } from './components/external-feed/external-feed.component';
import {
	NbCardModule,
	NbSelectModule,
	NbInputModule,
	NbButtonModule,
	NbIconModule,
	NbPopoverModule,
	NbCheckboxModule,
} from '@nebular/theme';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import {SharedPipesModule} from 'projects/shared-pipes/pipes.module';
import {ExternalFeedHListItemComponent} from './components/external-feed-hlist-item/external-feed-hlist-item.component';

@NgModule({
  declarations: [
    ExternalFeedComponent,
    SingleExternalFeedDetailsComponent,
    SingleExternalFeedComponent,
    ExternalFeedHListItemComponent,
  ],
  imports: [
    CommonModule,
    ExternalFeedRoutingModule,
    SharedComponentsModule,
    EditorModule,
    SharedPipesModule,

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
