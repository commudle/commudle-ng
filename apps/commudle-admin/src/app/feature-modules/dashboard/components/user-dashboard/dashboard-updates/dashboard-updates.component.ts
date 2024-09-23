import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faComments, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ERegistrationStatuses } from 'apps/shared-models/enums/registration_statuses.enum';
import { UsersService } from 'apps/shared-services/users.service';
import moment from 'moment';
// import { generate } from 'lean-qr';

@Component({
  selector: 'commudle-dashboard-updates',
  templateUrl: './dashboard-updates.component.html',
  styleUrls: ['./dashboard-updates.component.scss'],
})
export class DashboardUpdatesComponent implements OnInit {
  @ViewChild('qrCanvas', { static: true }) qrCanvas: ElementRef<HTMLCanvasElement>;
  ERegistrationStatuses = ERegistrationStatuses;
  showEntryPass: boolean[] = [false];
  updates = [];
  faPlus = faPlus;
  activeTab = 'registrations';
  community: any;
  faComments = faComments;
  myRegistrations: any[] = [];
  moment = moment;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.generateQRCode();
    this.getMyRegistrations();
  }

  setActiveTab(tab: 'channel' | 'registrations'): void {
    this.activeTab = tab;
  }

  generateQRCode() {
    // const qrCode = generate('650496');
    // qrCode.toCanvas(this.qrCanvas.nativeElement);
  }

  toggleEntryPass(index) {
    this.showEntryPass[index] = !this.showEntryPass[index];
  }

  getMyRegistrations() {
    this.usersService.getMyRegistrations().subscribe((data) => {
      this.myRegistrations = data.values;
      console.log(data);
    });
  }
}
