import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbPopoverModule,
  NbSelectModule,
  NbUserModule,
} from '@commudle/theme';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { ExternalFeedHListItemComponent } from './components/external-feed-hlist-item/external-feed-hlist-item.component';
import { ExternalFeedComponent } from './components/external-feed/external-feed.component';
import { FeedItemDetailsComponent } from './components/feed-item-details/feed-item-details.component';
import { FeedItemComponent } from './components/feed-item/feed-item.component';
import { ExternalFeedRoutingModule } from './external-feed-routing.module';

@NgModule({
  declarations: [ExternalFeedComponent, FeedItemDetailsComponent, FeedItemComponent, ExternalFeedHListItemComponent],
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
    NbCheckboxModule,
  ],
  providers: [DatePipe],
})
export class ExternalFeedModule {}
