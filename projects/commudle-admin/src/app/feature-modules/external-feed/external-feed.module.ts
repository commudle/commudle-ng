import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedItemComponent } from './components/feed-item/feed-item.component';
import { ExternalFeedRoutingModule } from './external-feed-routing.module';
import { FeedItemDetailsComponent } from './components/feed-item-details/feed-item-details.component'
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
import {FeedItemDiscussionComponent} from './components/feed-item-discussion/feed-item-discussion.component';
import {FeedItemDiscussionMessageComponent} from './components/feed-item-discussion/feed-item-discussion-message/feed-item-discussion-message.component';

@NgModule({
  declarations: [
    ExternalFeedComponent,
    FeedItemDetailsComponent,
    FeedItemComponent,
    ExternalFeedHListItemComponent,
    FeedItemDiscussionMessageComponent,
    FeedItemDiscussionComponent,
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
