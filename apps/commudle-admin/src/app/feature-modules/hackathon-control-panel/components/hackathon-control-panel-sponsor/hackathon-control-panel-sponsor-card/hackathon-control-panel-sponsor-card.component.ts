import { Component, Input, OnInit } from '@angular/core';
import { ISponsor } from 'apps/shared-models/sponsor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'commudle-hackathon-control-panel-sponsor-card',
  templateUrl: './hackathon-control-panel-sponsor-card.component.html',
  styleUrls: ['./hackathon-control-panel-sponsor-card.component.scss'],
})
export class HackathonControlPanelSponsorCardComponent implements OnInit {
  @Input() sponsor: ISponsor;
  constructor(private router: Router) {}

  ngOnInit() {}

  redirectTo(link) {
    this.router.navigate([link]);
  }
}
