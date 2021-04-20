import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleExternalFeedComponent } from './components/single-external-feed/single-external-feed.component';
import { ExternalFeedRoutingModule } from './external-feed-routing.module';
import { SingleExternalFeedDetailsComponent } from './components/single-external-feed-details/single-external-feed-details.component'
import { ExternalFeedComponent } from './components/external-feed/external-feed.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
	NbCardModule,
	NbSelectModule,
	NbInputModule,
	NbButtonModule,
	NbIconModule,
	NbPopoverModule,
	NbCheckboxModule,
    NbFormFieldModule,
    NbUserModule
} from '@nebular/theme';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import {SharedPipesModule} from 'projects/shared-pipes/pipes.module';
import {ExternalFeedHListItemComponent} from './components/external-feed-hlist-item/external-feed-hlist-item.component';
import {FeedDiscussionComponent} from './components/feed-discussion/feed-discussion.component';
import {FeedDiscussionMessageComponent} from './components/feed-discussion/feed-discussion-message/feed-discussion-message.component';

@NgModule({
  declarations: [
    ExternalFeedComponent,
    SingleExternalFeedDetailsComponent,
    SingleExternalFeedComponent,
    ExternalFeedHListItemComponent,
    FeedDiscussionMessageComponent,
    FeedDiscussionComponent,
  ],
  imports: [
    CommonModule,
    ExternalFeedRoutingModule,
    SharedComponentsModule,
    EditorModule,
    SharedPipesModule,
    FormsModule,
    ReactiveFormsModule,

    // nebular
    NbCardModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbPopoverModule,
    NbCheckboxModule,
    NbFormFieldModule,
    NbUserModule,
  ]
})
export class ExternalFeedModule { }
