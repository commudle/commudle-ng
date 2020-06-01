import { Component, OnInit, Input } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { EventDataFormEntityGroupsService } from 'projects/commudle-admin/src/app/services/event-data-form-entity-groups.service';
import { IEventDataFormEntityGroup } from 'projects/shared-models/event_data_form_enity_group.model';
import { ERegistationTypes } from 'projects/shared-models/enums/registration_types.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-highlighted-links',
  templateUrl: './highlighted-links.component.html',
  styleUrls: ['./highlighted-links.component.scss']
})
export class HighlightedLinksComponent implements OnInit {
  ERegistationTypes = ERegistationTypes;

  @Input() community: ICommunity;
  @Input() event: IEvent;

  openForms: IEventDataFormEntityGroup[] = [];
  currentRoute;

  constructor(
    private eventDataFormEntityGroupsService: EventDataFormEntityGroupsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getOpenForms();
    this.currentRoute = encodeURIComponent(this.router.url);
  }

  getOpenForms() {

    if (this.event.editable) {
      this.eventDataFormEntityGroupsService.pGetPublicOpenDataForms(this.event.id).subscribe(
        data => {
          this.openForms = data.event_data_form_entity_groups;
        }
      );
    }

  }

}
