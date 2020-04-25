import { Component, OnInit } from '@angular/core';
import { IEvent } from 'projects/shared-models/event.model';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'projects/shared-models/community.model';
import { faClock, faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.scss']
})
export class EventDashboardComponent implements OnInit {
  moment = moment;

  faClock = faClock;
  faEdit = faEdit;
  faInfoCircle = faInfoCircle;

  event: IEvent;
  community: ICommunity;


  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {

    this.activatedRoute.data.subscribe(data => {
      this.event = data.event;
      this.community = data.community;
      this.titleService.setTitle(`${this.event.name} Dashboard | ${this.community.name}`);
    });
  }

}
