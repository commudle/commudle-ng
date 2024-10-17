import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EDbModels, IHackathon } from '@commudle/shared-models';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';

@Component({
  selector: 'commudle-hackathon-control-panel-channels',
  templateUrl: './hackathon-control-panel-channels.component.html',
  styleUrls: ['./hackathon-control-panel-channels.component.scss'],
})
export class HackathonControlPanelChannelsComponent implements OnInit {
  hackathonSlug: string;
  parentType = EDbModels.HACKATHON;
  hackathon: IHackathon;
  constructor(private activatedRoute: ActivatedRoute, private hackathonService: HackathonService) {}

  ngOnInit() {
    this.activatedRoute.parent.paramMap.subscribe((params) => {
      this.hackathonSlug = params.get('hackathon_id');
      this.fetchHackathonDetails();
    });
  }

  fetchHackathonDetails() {
    this.hackathonService.showHackathon(this.hackathonSlug).subscribe((data) => {
      this.hackathon = data;
    });
  }
}
