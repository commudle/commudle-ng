import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataFormEntitiesService } from '../../services/data-form-entities.service';
import { IDataFormEntity, Visibility } from 'projects/shared-models/data_form_entity.model';
import { EventsService } from '../../services/events.service';
import { IEvent } from 'projects/shared-models/event.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { CommunitiesService } from '../../services/communities.service';
import { Title, Meta } from '@angular/platform-browser';
import { LibErrorHandlerService } from 'projects/lib-error-handler/src/public-api';
import { DataFormEntityResponsesService } from '../../services/data-form-entity-responses.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';


@Component({
  selector: 'app-fill-data-form',
  templateUrl: './fill-data-form.component.html',
  styleUrls: ['./fill-data-form.component.scss']
})
export class FillDataFormComponent implements OnInit {
  dataFormEntity: IDataFormEntity;
  Visibility: Visibility;
  formClosed = false;
  showProfileForm = true;
  redirectRoute: any;
  event: IEvent;
  community: ICommunity;
  selectedFormResponse: any;

  existingResponses;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataFormEntitiesService: DataFormEntitiesService,
    private eventsService: EventsService,
    private communitiesService: CommunitiesService,
    private router: Router,
    private title: Title,
    private meta: Meta,
    private errorHandler: LibErrorHandlerService,
    private dataFormEntityResponsesService: DataFormEntityResponsesService,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit() {
    this.redirectRoute = ['/'];
    this.activatedRoute.params.subscribe(params => {
      this.getDataFormEntity(params.data_form_entity_id);
    });


    this.activatedRoute.queryParams.subscribe(
      data => {
        if (data.next) {

          this.redirectRoute = [decodeURIComponent(data.next)];
        }
      }
    );
  }


  setMeta() {
    this.meta.updateTag({ name: 'description', content: `Fill the form for ${this.dataFormEntity.name}`});


    this.meta.updateTag({ name: 'og:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'og:image:secure_url', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'og:title', content: `${this.dataFormEntity.name}` });
    this.meta.updateTag({ name: 'og:description', content: `Fill the form for ${this.dataFormEntity.name}`});
    this.meta.updateTag( { name: 'og:type', content: 'website'});

    this.meta.updateTag({ name: 'twitter:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'twitter:title', content: `${this.dataFormEntity.name}` });
    this.meta.updateTag({ name: 'twitter:description', content: `Fill the form for ${this.dataFormEntity.name}`});
  }


  getDataFormEntity(dataFormEntityId) {
    this.dataFormEntitiesService.getDataFormEntity(dataFormEntityId).subscribe(
      data => {
        this.dataFormEntity = data;
        this.title.setTitle(`${this.dataFormEntity.name}`);
        this.setMeta();
        this.formClosed = !this.dataFormEntity.user_can_fill_form;
        if (!this.formClosed) {
          this.getExistingResponses();
          this.getParent();
        }
      }
    );
  }

  getExistingResponses() {
    this.dataFormEntityResponsesService.getExistingResponse(this.dataFormEntity.id).subscribe(
      data => {
        this.existingResponses = data.existing_responses;

        if (!this.dataFormEntity.multi_response &&  this.existingResponses.length >= 1) {
          this.selectedFormResponse = this.existingResponses[this.existingResponses.length - 1];
        }
      }
    );
  }



  getParent() {
    switch (this.dataFormEntity.redirectable_entity_type) {
      case 'Event':
        this.getEvent();
        break;
      case 'AdminSurvey':
        this.showProfileForm = false;
        // nothing need to be done here
        break;
      default:
        this.errorHandler.handleError(404, 'You cannot fill this form');

    }
  }


  getEvent() {
    this.eventsService.pGetEvent(this.dataFormEntity.redirectable_entity_id).subscribe(
      data => {
        this.event = data;
        this.title.setTitle(`${this.dataFormEntity.name} | ${this.event.name}`);
        this.getCommunity(this.event.kommunity_id);

        if (this.event.header_image_path) {
          this.meta.updateTag({name: 'og:image', content: this.event.header_image_path});
        }
      }
    );
  }

  getCommunity(communityId) {
    this.communitiesService.getCommunityDetails(communityId).subscribe(
      data => {
        this.community = data;

        if (!this.event.header_image_path) {
          this.meta.updateTag({name: 'og:image', content: this.community.logo_path});
        }
        if (!this.redirectRoute) {
          this.redirectRoute = ['/communities', this.community.slug, 'events', this.event.slug];
        }
      }
    );
  }


  submitForm($event) {
    this.dataFormEntityResponsesService.submitDataFormEntityResponse(
      this.dataFormEntity.id,
      $event).subscribe(
      data => {
        this.toastLogService.successDialog('Saved!');
        this.redirectTo();
      }
    );
  }

  redirectTo() {
    this.router.navigate(this.redirectRoute);
  }

}
