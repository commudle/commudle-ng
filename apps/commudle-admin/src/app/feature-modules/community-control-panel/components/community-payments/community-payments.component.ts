import { Component } from '@angular/core';
import { NbRouteTab } from '@commudle/theme';

@Component({
  selector: 'commudle-community-payments',
  templateUrl: './community-payments.component.html',
  styleUrls: ['./community-payments.component.scss'],
})
export class CommunityPaymentsComponent {
  tabs: NbRouteTab[] = [
    {
      title: 'Bank Details',
      route: '.',
    },
    {
      title: 'Payment Logs',
      route: ['./logs'],
    },
  ];
}
