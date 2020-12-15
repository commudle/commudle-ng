import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';


@NgModule({
  declarations: [UsersComponent, PublicProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedPipesModule,

    // Nebular
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbTooltipModule
  ]
})
export class UsersModule { }
