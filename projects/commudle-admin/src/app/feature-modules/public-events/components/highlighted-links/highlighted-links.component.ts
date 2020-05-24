import { Component, OnInit, Input } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';

@Component({
  selector: 'app-highlighted-links',
  templateUrl: './highlighted-links.component.html',
  styleUrls: ['./highlighted-links.component.scss']
})
export class HighlightedLinksComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() event: IEvent;

  constructor() { }

  ngOnInit() {
  }

}
