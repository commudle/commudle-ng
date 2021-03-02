import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabsRoutingModule } from './labs-routing.module';
import { LabsComponent } from './components/labs/labs.component';
import { CreateLabComponent } from './components/create-lab/create-lab.component';
import { EditLabComponent } from './components/edit-lab/edit-lab.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbCardModule, NbInputModule, NbButtonModule, NbIconModule, NbListModule, NbDialogModule } from '@nebular/theme';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { MyLabsComponent } from './components/my-labs/my-labs.component';
import { LabComponent } from './components/lab/lab.component';
import { LabStepComponent } from './components/lab/lab-step/lab-step.component';
import { PrismJsHighlightCodeService } from 'projects/shared-services/prismjs-highlight-code.service';
import { LabListItemComponent } from './components/my-labs/lab-list-item/lab-list-item.component';
import { ReusableComponentsModule } from '../reusable-components/reusable-components.module';
import { YouTubePlayerModule } from '@angular/youtube-player';


@NgModule({
  declarations: [
    LabsComponent,
    CreateLabComponent,
    EditLabComponent,
    MyLabsComponent,
    LabComponent,
    LabStepComponent,
    LabListItemComponent,
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
    NbDialogModule.forChild(),

  ]
})
export class LabsModule { }
