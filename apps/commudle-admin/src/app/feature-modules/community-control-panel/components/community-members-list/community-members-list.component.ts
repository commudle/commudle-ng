import { ToastrService } from '@commudle/shared-services';
import { Component } from '@angular/core';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ActivatedRoute } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-community-members-list',
  templateUrl: './community-members-list.component.html',
  styleUrls: ['./community-members-list.component.scss'],
})
export class CommunityMembersListComponent {
  sendingRequest = false;
  communityId: string | number;
  tabs: any[] = [
    {
      title: 'All Members',
      route: `./`,
    },
    {
      title: 'Blocked Users',
      route: `./blocked`,
    },
  ];

  faEnvelope = faEnvelope;

  constructor(
    private communityService: CommunitiesService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) {}

  sendSpeakerCSV() {
    this.sendingRequest = true;
    this.communityService
      .sendCsvSpeakersList(this.activatedRoute.parent.snapshot.params['community_id'])
      .subscribe((data) => {
        if (data) {
          this.toastrService.successDialog('CSV will be sent to your email inbox');
          this.sendingRequest = false;
        }
      });
  }
}
