import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'commudle-community-payment-logs',
  templateUrl: './community-payment-logs.component.html',
  styleUrls: ['./community-payment-logs.component.scss'],
})
export class CommunityPaymentLogsComponent implements OnInit {
  communityId: number | string;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.communityId = this.activatedRoute.parent.parent.snapshot.params['community_id'];
  }
}
