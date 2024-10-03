import { Component, OnInit } from '@angular/core';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { IDataFormEntityResponseGroup } from 'apps/shared-models/data_form_entity_response_group.model';
import { ERegistrationStatuses } from 'apps/shared-models/enums/registration_statuses.enum';
import moment from 'moment';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { EDbModels, EHackathonRegistrationStatus } from '@commudle/shared-models';
// import { generate } from 'lean-qr';

@Component({
  selector: 'commudle-event-hackathon-registrations',
  templateUrl: './event-hackathon-registrations.component.html',
  styleUrls: ['./event-hackathon-registrations.component.scss'],
})
export class EventHackathonRegistrationsComponent implements OnInit {
  registrations: IDataFormEntityResponseGroup[] = [];

  moment = moment;
  ERegistrationStatuses = ERegistrationStatuses;
  EHackathonRegistrationStatus = EHackathonRegistrationStatus;
  showEntryPass: boolean[] = [false];
  faTrophy = faTrophy;
  page = 1;
  count = 10;
  total = 0;
  EDbModels = EDbModels;
  loading = true;

  constructor(private usersService: AppUsersService) {}

  ngOnInit(): void {
    this.getMyRegistrations();
  }

  generateQRCode(uniqueCode, canvasId) {
    // const qr = document.getElementById(canvasId) as HTMLCanvasElement;
    // const qrCode = generate(uniqueCode);
    // qrCode.toCanvas(qr);
  }

  getMyRegistrations() {
    this.loading = true;
    this.usersService.getMyRegistrations(this.count, this.page).subscribe((data) => {
      this.registrations = data.values;
      this.page = +data.page;
      this.total = data.total;
      this.loading = false;
    });
  }

  toggleEntryPass(index, uniqueCode, canvasId) {
    for (let i = 0; i < this.registrations.length; i++) {
      if (i !== index) {
        this.showEntryPass[i] = false;
      }
    }
    this.showEntryPass[index] = !this.showEntryPass[index];
    if (this.showEntryPass[index]) {
      setTimeout(() => {
        this.generateQRCode(uniqueCode, canvasId);
      }, 0);
    }
  }
}
