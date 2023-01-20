import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileStatusBarService } from 'apps/commudle-admin/src/app/services/profile-status-bar.service';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';

@Component({
  selector: 'lib-error404-page',
  templateUrl: './error404-page.component.html',
  styleUrls: ['./error404-page.component.scss'],
})
export class Error404PageComponent implements OnInit, OnDestroy {
  constructor(private profileStatusBarService: ProfileStatusBarService, private footerService: FooterService) {}

  ngOnInit(): void {
    this.footerService.changeFooterStatus(true);
    this.profileStatusBarService.changeProfileBarStatus(false);
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
    this.profileStatusBarService.changeProfileBarStatus(true);
  }
}
