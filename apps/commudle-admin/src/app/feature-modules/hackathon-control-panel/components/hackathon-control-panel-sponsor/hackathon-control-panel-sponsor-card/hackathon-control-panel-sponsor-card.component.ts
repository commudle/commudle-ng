import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISponsor } from 'apps/shared-models/sponsor.model';
import { Router } from '@angular/router';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'commudle-hackathon-control-panel-sponsor-card',
  templateUrl: './hackathon-control-panel-sponsor-card.component.html',
  styleUrls: ['./hackathon-control-panel-sponsor-card.component.scss'],
})
export class HackathonControlPanelSponsorCardComponent implements OnInit {
  @Input() sponsor: ISponsor;
  @Output() destroySponsorEvent: EventEmitter<any> = new EventEmitter();

  faCircleXmark = faCircleXmark;
  constructor(private router: Router) {}

  ngOnInit() {}

  redirectTo(link) {
    this.router.navigate([link]);
  }

  destroySponsor(sponsorId) {
    this.destroySponsorEvent.emit(sponsorId);
  }
}
