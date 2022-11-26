import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileStatusBarService } from 'apps/commudle-admin/src/app/services/profile-status-bar.service';

@Component({
  selector: 'lib-error404-page',
  templateUrl: './error404-page.component.html',
  styleUrls: ['./error404-page.component.scss'],
})
export class Error404PageComponent implements OnInit, OnDestroy {
  constructor(private profileStatusBarService: ProfileStatusBarService) {}

  ngOnInit(): void {
    this.profileStatusBarService.changeProfileBarStatus(false);
  }

  ngOnDestroy(): void {
    this.profileStatusBarService.changeProfileBarStatus(true);
  }
}
