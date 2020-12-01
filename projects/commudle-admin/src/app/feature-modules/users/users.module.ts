import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';


@NgModule({
  declarations: [UsersComponent, PublicProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
