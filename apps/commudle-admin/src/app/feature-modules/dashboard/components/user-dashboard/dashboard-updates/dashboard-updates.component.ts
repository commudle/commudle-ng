import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ICommunity } from '@commudle/shared-models';
import {
  faComments,
  faPlus,
  faLightbulb,
  faTrophy,
  faFileText,
  faFlask,
  faBullhorn,
} from '@fortawesome/free-solid-svg-icons';
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
  @ViewChild('postContentBox') postContentBox: TemplateRef<any>;

  ERegistrationStatuses = ERegistrationStatuses;
  showEntryPass: boolean[] = [false];
  updates = [];
  faPlus = faPlus;
  faTrophy = faTrophy;
  faFileText = faFileText;
  faFlask = faFlask;
  faBullhorn = faBullhorn;
  activeTab = 'registrations';
  community: ICommunity;
  faComments = faComments;
  myRegistrations: any[] = [];
  moment = moment;
  isPostContentOpen = false;
  faLightbulb = faLightbulb;
  page = 1;
  count = 5;
  total: number;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    // this.generateQRCode();
    this.getMyRegistrations();
  }

  setActiveTab(tab: 'channel' | 'registrations'): void {
    this.activeTab = tab;
  }

  generateQRCode(uniqueCode) {
    // const qrCode = generate(uniqueCode);
    // qrCode.toCanvas(this.qrCanvas.nativeElement);
  }

  toggleEntryPass(index, uniqueCode) {
    this.showEntryPass[index] = !this.showEntryPass[index];
    if (this.showEntryPass[index]) {
      this.generateQRCode(uniqueCode);
    }
  }

  getMyRegistrations() {
    this.usersService.getMyRegistrations(this.count).subscribe((data) => {
      this.myRegistrations = data.values;
      this.total = data.total;
      this.page = data.page;
      this.count = data.count;
      console.log(data);
    });
  }

  togglePostContentDropdown() {
    this.isPostContentOpen = !this.isPostContentOpen;
    console.log('called', this.isPostContentOpen);
  }
}
