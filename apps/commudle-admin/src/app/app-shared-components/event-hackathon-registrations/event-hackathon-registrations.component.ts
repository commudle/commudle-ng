import { Component, OnInit } from '@angular/core';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { IDataFormEntityResponseGroup } from 'apps/shared-models/data_form_entity_response_group.model';
import { ERegistrationStatuses } from 'apps/shared-models/enums/registration_statuses.enum';
import moment from 'moment';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { EDbModels } from '@commudle/shared-models';

@Component({
  selector: 'commudle-event-hackathon-registrations',
  templateUrl: './event-hackathon-registrations.component.html',
  styleUrls: ['./event-hackathon-registrations.component.scss'],
})
export class EventHackathonRegistrationsComponent implements OnInit {
  registrations: IDataFormEntityResponseGroup[] = [];

  moment = moment;
  ERegistrationStatuses = ERegistrationStatuses;
  showEntryPass: boolean[] = [false];
  faTrophy = faTrophy;
  page = 1;
  count = 10;
  total = 0;
  EDbModels = EDbModels;

  constructor(private usersService: AppUsersService) {}

  ngOnInit(): void {
    this.getMyRegistrations();
  }

  generateQRCode(uniqueCode) {
    // const qrCode = generate(uniqueCode);
    // qrCode.toCanvas(this.qrCanvas.nativeElement);
  }

  getMyRegistrations() {
    this.usersService.getMyRegistrations(this.count, this.page).subscribe((data) => {
      this.registrations = data.values;
      this.page = +data.page;
      this.total = data.total;
    });
  }

  toggleEntryPass(index, uniqueCode) {
    this.showEntryPass[index] = !this.showEntryPass[index];
    if (this.showEntryPass[index]) {
      this.generateQRCode(uniqueCode);
    }
  }
}
