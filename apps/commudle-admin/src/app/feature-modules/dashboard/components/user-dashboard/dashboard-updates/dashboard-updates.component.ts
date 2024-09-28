import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EDbModels, ICommunity } from '@commudle/shared-models';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
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
import moment from 'moment';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IDataFormEntityResponseGroup } from 'apps/shared-models/data_form_entity_response_group.model';
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
  faPlus = faPlus;
  faTrophy = faTrophy;
  faFileText = faFileText;
  faFlask = faFlask;
  faBullhorn = faBullhorn;
  activeTab: 'registrations' | 'channel' = 'registrations';
  community: ICommunity;
  faComments = faComments;
  myRegistrations: IDataFormEntityResponseGroup[] = [];
  moment = moment;
  isPostContentOpen = false;
  faLightbulb = faLightbulb;
  page = 1;
  count = 5;
  total: number;
  currentUser: ICurrentUser;
  EDbModels = EDbModels;

  constructor(private usersService: AppUsersService, private authWatchService: LibAuthwatchService) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((data) => {
      this.currentUser = data;
    });
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
    for (let i = 0; i < this.myRegistrations.length; i++) {
      if (i !== index) {
        this.showEntryPass[i] = false;
      }
    }
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
  }
}
