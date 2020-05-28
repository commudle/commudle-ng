import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { UserProfileHorizontalComponent } from './user-profile-horizontal/user-profile-horizontal.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbIconModule, NbThemeModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    WorkInProgressComponent,
    UserProfileHorizontalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    // Nebular
    NbButtonModule,
    NbIconModule
  ],
  exports: [
    WorkInProgressComponent,
    UserProfileHorizontalComponent
  ]
})
export class SharedComponentsModule { }
