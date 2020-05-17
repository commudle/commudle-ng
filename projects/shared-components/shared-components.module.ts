import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbIconModule, NbThemeModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    WorkInProgressComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    // Nebular
    NbButtonModule,
    NbIconModule
  ],
  exports: [
    WorkInProgressComponent
  ]
})
export class SharedComponentsModule { }
