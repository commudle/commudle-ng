import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';
import { EditorModule } from '@tinymce/tinymce-angular';
import { LinkyModule } from 'ngx-linky';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'projects/shared-directives/shared-directives.module';
import { MentionModule } from 'projects/shared-modules/mention/mention.module';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { ReusableComponentsModule } from '../reusable-components/reusable-components.module';
import { CreateLabComponent } from './components/create-lab/create-lab.component';
import { EditLabComponent } from './components/edit-lab/edit-lab.component';
import { LabDisplayCardComponent } from './components/lab-display-card/lab-display-card.component';
import { LabDetailsComponent } from './components/lab/lab-details/lab-details.component';
import { LabDiscussionMessageComponent } from './components/lab/lab-discussion/lab-discussion-message/lab-discussion-message.component';
import { LabDiscussionComponent } from './components/lab/lab-discussion/lab-discussion.component';
import { LabStepComponent } from './components/lab/lab-step/lab-step.component';
import { LabComponent } from './components/lab/lab.component';
import { HeaderBannerComponent } from './components/labs/header-banner/header-banner.component';
import { HeaderTextComponent } from './components/labs/header-text/header-text.component';
import { LabsComponent } from './components/labs/labs.component';
import { ClickOutsideDirective } from './components/labs/search-bar/click-outside.directive';
import { SearchBarComponent } from './components/labs/search-bar/search-bar.component';
import { LabListItemComponent } from './components/my-labs/lab-list-item/lab-list-item.component';
import { MyLabsComponent } from './components/my-labs/my-labs.component';
import { LabsRoutingModule } from './labs-routing.module';

@NgModule({
  declarations: [
    LabsComponent,
    CreateLabComponent,
    EditLabComponent,
    MyLabsComponent,
    LabComponent,
    LabStepComponent,
    LabListItemComponent,
    LabDiscussionComponent,
    LabDiscussionMessageComponent,
    SearchBarComponent,
    LabDisplayCardComponent,
    HeaderBannerComponent,
    HeaderTextComponent,
    LabDetailsComponent,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
    LabsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    FontAwesomeModule,
    SharedComponentsModule,
    ReusableComponentsModule,
    YouTubePlayerModule,
    SharedPipesModule,
    NbSpinnerModule,
    LinkyModule,
    SharedDirectivesModule,
    MentionModule,

    // Nebular
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbListModule,
    NbFormFieldModule,
    NbTooltipModule,
    NbDialogModule.forChild(),
    NbUserModule,
    NbSidebarModule.forRoot(),
    NbContextMenuModule,
  ],
  exports: [LabDisplayCardComponent, ClickOutsideDirective],
})
export class LabsModule {}
