import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleExtrnalFeedComponent } from './components/single-extrnal-feed/single-extrnal-feed.component';
import { ExternalFeedRoutingModule } from './external-feed-routing.module';
import { SingleExtrnalFeedDetailsComponent } from './components/single-extrnal-feed-details/single-extrnal-feed-details.component'
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
    SingleExtrnalFeedDetailsComponent,
    SingleExtrnalFeedComponent,
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
