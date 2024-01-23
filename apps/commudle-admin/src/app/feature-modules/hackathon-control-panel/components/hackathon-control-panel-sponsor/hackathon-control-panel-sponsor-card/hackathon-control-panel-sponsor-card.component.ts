import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISponsor } from 'apps/shared-models/sponsor.model';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'commudle-hackathon-control-panel-sponsor-card',
  templateUrl: './hackathon-control-panel-sponsor-card.component.html',
  styleUrls: ['./hackathon-control-panel-sponsor-card.component.scss'],
})
export class HackathonControlPanelSponsorCardComponent {
  @Input() sponsor: ISponsor;
  @Output() destroySponsorEvent: EventEmitter<ISponsor> = new EventEmitter();

  faCircleXmark = faCircleXmark;
  constructor() {}

  destroySponsor(sponsor) {
    this.destroySponsorEvent.emit(sponsor);
  }
}
