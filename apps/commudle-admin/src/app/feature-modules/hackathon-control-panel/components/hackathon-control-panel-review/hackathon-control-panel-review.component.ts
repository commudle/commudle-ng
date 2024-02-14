import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HackathonUserResponsesService } from 'apps/commudle-admin/src/app/services/hackathon-user-responses.service';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonUserResponse } from 'apps/shared-models/hackathon-user-response.model';

@Component({
  selector: 'commudle-hackathon-control-panel-review',
  templateUrl: './hackathon-control-panel-review.component.html',
  styleUrls: ['./hackathon-control-panel-review.component.scss'],
})
export class HackathonControlPanelReviewComponent implements OnInit {
  hackathonUserResponses: IHackathonUserResponse[];
  userResponses: any;
  constructor(
    private hurService: HackathonUserResponsesService,
    private activatedRoute: ActivatedRoute,
    private hackathonService: HackathonService,
  ) {}

  ngOnInit() {
    this.activatedRoute.parent.paramMap.subscribe((params) => {
      this.fetchUserResponses(params.get('hackathon_id'));
    });
  }

  fetchUserResponses(hackathonId) {
    this.hackathonService.indexUserResponses(hackathonId).subscribe((data) => {
      this.userResponses = data;
      console.log('🚀 ~ HackathonControlPanelReviewComponent ~ this.hackathonService.indexUserResponses ~ data:', data);
    });
  }

  getTeammateDetails() {}
}
