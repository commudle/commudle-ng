import { Component, OnInit, Input } from '@angular/core';
import { IFeedItem } from 'projects/shared-models/feed-item.model';
import * as moment from 'moment';

@Component({
  selector: 'app-external-feed-hlist-item',
  templateUrl: './external-feed-hlist-item.component.html',
  styleUrls: ['./external-feed-hlist-item.component.scss']
})
export class ExternalFeedHListItemComponent implements OnInit {
  moment = moment;

  @Input() feedItem;

  constructor() { }

  ngOnInit() {
  }
}