import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { CollaborationCommunityComponent } from './components/collaboration-community/collaboration-community.component';
import { UserRoleConfirmationComponent } from './components/user-role-confirmation/user-role-confirmation.component';


const routes: Routes = [
  {
    path: 'event-rsvp',
    component: RsvpComponent
  },
  {
    path: 'collaboration-community',
    component: CollaborationCommunityComponent
  },
  {
    path: 'user-role',
    component: UserRoleConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailConfirmationsRoutingModule { }
