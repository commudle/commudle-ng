import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFormEntitiesService } from '../../services/data-form-entities.service';
import { IDataFormEntity, Visibility } from 'projects/shared-models/data_form_entity.model';
import { EventsService } from '../../services/events.service';
import { IEvent } from 'projects/shared-models/event.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { CommunitiesService } from '../../services/communities.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-fill-data-form',
  templateUrl: './fill-data-form.component.html',
  styleUrls: ['./fill-data-form.component.scss']
})
export class FillDataFormComponent implements OnInit {
  dataFormEntity: IDataFormEntity;
  Visibility: Visibility;
  formClosed = false;
  redirectRoute: any;
  event: IEvent;
  community: ICommunity;


  constructor(
    private activatedRoute: ActivatedRoute,
    private dataFormEntitiesService: DataFormEntitiesService,
    private eventsService: EventsService,
    private communitiesService: CommunitiesService,
    private router: Router,
    private title: Title,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getDataFormEntity(params.data_form_entity_id);
    });


    this.activatedRoute.queryParams.subscribe(
      data => {
        if (data.next) {
          this.redirectRoute = decodeURIComponent(data.next);
        }
      }
    );
  }


  getDataFormEntity(dataFormEntityId) {
    this.dataFormEntitiesService.getDataFormEntity(dataFormEntityId).subscribe(
      data => {
        this.dataFormEntity = data;
        this.checkFormClosed();
        this.getParent();
      }
    );
  }


  checkFormClosed() {
    switch (this.dataFormEntity.entity_type) {
      case 'EventDataFormEntityGroup': {
        if (this.dataFormEntity.user_can_fill_event_form === false) {
          this.formClosed = true;
        }
      }
    }
  }


  getParent() {
    switch (this.dataFormEntity.redirectable_entity_type) {
      case 'Event':
        this.getEvent();
        break;
      default:
        console.log('no matching case');

    }
  }


  getEvent() {
    this.eventsService.pGetEvent(this.dataFormEntity.redirectable_entity_id).subscribe(
      data => {
        this.event = data;
        this.getCommunity(this.event.kommunity_id);
      }
    );
  }

  getCommunity(communityId) {
    this.communitiesService.getCommunityDetails(communityId).subscribe(
      data => {
        this.community = data;
        this.title.setTitle(`${this.dataFormEntity.name} | ${this.event.name}`);
        if (!this.redirectRoute) {
          this.redirectRoute = ['/communities', this.community.slug, 'events', this.event.slug];
        }
      }
    );
  }


  redirectTo($event) {
    this.router.navigate([this.redirectRoute]);
  }

}
