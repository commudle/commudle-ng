import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileStatusBarService } from 'apps/commudle-admin/src/app/services/profile-status-bar.service';

@Component({
  selector: 'commudle-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit, OnDestroy {
  constructor(private profileStatusBarService: ProfileStatusBarService) {}

  ngOnInit(): void {
    this.profileStatusBarService.setProfileBarStatus(false);
  }

  ngOnDestroy(): void {
    this.profileStatusBarService.setProfileBarStatus(true);
  }
}
