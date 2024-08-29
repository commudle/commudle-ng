import { Component, Input, OnInit } from '@angular/core';
import { ICommunity } from '@commudle/shared-models';
import { faLocationDot, faUsers } from '@fortawesome/free-solid-svg-icons';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';
import moment from 'moment';

@Component({
  selector: 'commudle-call-for-speaker-card',
  templateUrl: './call-for-speaker-card.component.html',
  styleUrls: ['./call-for-speaker-card.component.scss'],
})
export class CallForSpeakerCardComponent implements OnInit {
  @Input() item: IEventDataFormEntityGroup;
  community: ICommunity;

  staticAssets = staticAssets;
  moment = moment;
  faUsers = faUsers;
  faLocationDot = faLocationDot;

  constructor(private communitiesService: CommunitiesService) {}

  ngOnInit(): void {
    console.log(this.item);
    this.getCommunity();
  }

  getCommunity() {
    this.communitiesService.pGetCommunityDetails(this.item.event.kommunity_id).subscribe((data) => {
      this.community = data;
    });
  }
}
