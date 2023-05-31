import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbIconModule } from '@commudle/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedComponentsModule } from '../../../../../shared-components/shared-components.module';
import { ICommunity } from 'apps/shared-models/community.model';
import { Session } from 'inspector';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';

@Component({
  selector: 'commudle-public-home-list-events-tech-sessions-card',
  standalone: true,
  templateUrl: './public-home-list-events-tech-sessions-card.component.html',
  styleUrls: ['./public-home-list-events-tech-sessions-card.component.scss'],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    NbButtonModule,
    NbCardModule,
    SharedComponentsModule,
    NbIconModule,
  ],
})
export class PublicHomeListEventsTechSessionsCardComponent implements OnInit {
  @Input() session;
  @Input() community: ICommunity;
  moment = moment;
  constructor() {}

  ngOnInit(): void {}
}
