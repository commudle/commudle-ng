import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICommunity } from 'projects/shared-models/community.model';

import { Subscription } from 'rxjs';
import { NotificationsService } from '../../../notifications/services/notifications.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-public-community-notifications',
  templateUrl: './public-community-notifications.component.html',
  styleUrls: ['./public-community-notifications.component.scss'],
})
export class PublicCommunityNotificationsComponent implements OnInit {
  community: ICommunity;

  trackMarkAllAsRead = false;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private notificationsService: NotificationsService,
    private nbToastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community = data.community;
      }),
    );
  }

  markAllAsRead() {
    this.notificationsService.markAllAsRead('community', this.community.id).subscribe((result) => {
      if (result) {
        this.nbToastrService.success('All notifications marked as read', 'Success');

        this.trackMarkAllAsRead = !this.trackMarkAllAsRead;
      }
    });
  }
}
