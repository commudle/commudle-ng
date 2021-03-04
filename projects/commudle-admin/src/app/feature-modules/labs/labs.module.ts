import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LabsRoutingModule} from './labs-routing.module';
import {LabsComponent} from './components/labs/labs.component';
import {CreateLabComponent} from './components/create-lab/create-lab.component';
import {EditLabComponent} from './components/edit-lab/edit-lab.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbTooltipModule,
  NbUserModule
} from '@nebular/theme';
import {EditorModule} from '@tinymce/tinymce-angular';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedComponentsModule} from 'projects/shared-components/shared-components.module';
import {MyLabsComponent} from './components/my-labs/my-labs.component';
import {LabComponent} from './components/lab/lab.component';
import {LabStepComponent} from './components/lab/lab-step/lab-step.component';
import {LabListItemComponent} from './components/my-labs/lab-list-item/lab-list-item.component';
import {ReusableComponentsModule} from '../reusable-components/reusable-components.module';
import {LabDiscussionComponent} from './components/lab/lab-discussion/lab-discussion.component';
import {LabDiscussionMessageComponent} from './components/lab/lab-discussion/lab-discussion-message/lab-discussion-message.component';
import {YouTubePlayerModule} from '@angular/youtube-player';


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

    // Nebular
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbListModule,
    NbFormFieldModule,
    NbTooltipModule,
    NbDialogModule.forChild(),
    NbUserModule
  ]
})
export class LabsModule {
}
