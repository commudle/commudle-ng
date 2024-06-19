import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISponsor } from 'apps/shared-models/sponsor.model';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { IHackathonSponsor } from 'apps/shared-models/hackathon-sponsor';
@Component({
  selector: 'commudle-hackathon-control-panel-sponsor-card',
  templateUrl: './hackathon-control-panel-sponsor-card.component.html',
  styleUrls: ['./hackathon-control-panel-sponsor-card.component.scss'],
})
export class HackathonControlPanelSponsorCardComponent {
  @Input() hackathonSponsor: IHackathonSponsor;
  @Output() destroySponsorEvent: EventEmitter<ISponsor> = new EventEmitter();
  @Output() editSponsorEvent: EventEmitter<IHackathonSponsor> = new EventEmitter();

  faCircleXmark = faCircleXmark;
  constructor() {}

  destroySponsor(sponsor) {
    this.destroySponsorEvent.emit(sponsor);
  }
  editSponsor(sponsor) {
    this.editSponsorEvent.emit(sponsor);
  }
}
