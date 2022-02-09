import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniUserProfileDirective } from './directives/mini-user-profile.directive';
import { MiniUserProfileComponent } from './components/mini-user-profile/mini-user-profile.component';
import { NbCardModule, NbIconModule, NbTagModule } from '@nebular/theme';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';

@NgModule({
  declarations: [MiniUserProfileDirective, MiniUserProfileComponent],
  imports: [
    CommonModule,
    SharedComponentsModule,

    //Nebular
    NbCardModule,
    NbTagModule,
    NbIconModule,
  ],

  exports: [MiniUserProfileDirective],
})
export class MiniUserProfileModule {}
