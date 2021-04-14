import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleExtrnalFeedComponent } from './components/single-external-feed/single-external-feed.component';
import { ExternalFeedRoutingModule } from './external-feed-routing.module';
import { SingleExtrnalFeedDetailsComponent } from './components/single-external-feed-details/single-external-feed-details.component'
import { ExternalFeedComponent } from './components/external-feed/external-feed.component';
import {
	NbCardModule,
	NbSelectModule,
	NbInputModule,
	NbButtonModule,
	NbIconModule,
	NbPopoverModule,
	NbCheckboxModule
} from '@nebular/theme';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import {SharedPipesModule} from 'projects/shared-pipes/pipes.module';

@NgModule({
  declarations: [
    ExternalFeedComponent,
    SingleExtrnalFeedDetailsComponent,
    SingleExtrnalFeedComponent,
  ],
  imports: [
    CommonModule,
    ExternalFeedRoutingModule,
    SharedComponentsModule,
    EditorModule,
    SharedPipesModule,
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
