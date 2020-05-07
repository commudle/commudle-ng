import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFormEntitiesService } from '../../services/data-form-entities.service';
import { IDataFormEntity, Visibility } from 'projects/shared-models/data_form_entity.model';
import { EventsService } from '../../services/events.service';
import { IEvent } from 'projects/shared-models/event.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { CommunitiesService } from '../../services/communities.service';


@Component({
  selector: 'app-fill-data-form',
  templateUrl: './fill-data-form.component.html',
  styleUrls: ['./fill-data-form.component.scss']
})
export class FillDataFormComponent implements OnInit {
  dataFormEntity: IDataFormEntity;
  Visibility: Visibility;
  formClosed = false;
  redirectRoute = [];
  event: IEvent;
  community: ICommunity;


  constructor(
    private activatedRoute: ActivatedRoute,
    private dataFormEntitiesService: DataFormEntitiesService,
    private eventsService: EventsService,
    private communitiesService: CommunitiesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getDataFormEntity(params.data_form_entity_id);
    });
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
    this.eventsService.getEvent(this.dataFormEntity.redirectable_entity_id).subscribe(
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
        this.redirectRoute.push('/communities', this.community.slug, 'events', this.event.slug);
      }
    );
  }


  redirectTo($event) {
    console.log($event);
    console.log('here', this.redirectRoute);
    this.router.navigate(this.redirectRoute);
  }







}
