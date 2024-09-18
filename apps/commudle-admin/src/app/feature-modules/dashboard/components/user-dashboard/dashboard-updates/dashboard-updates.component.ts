import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ERegistrationStatuses } from 'apps/shared-models/enums/registration_statuses.enum';
// import { generate } from 'lean-qr';

@Component({
  selector: 'commudle-dashboard-updates',
  templateUrl: './dashboard-updates.component.html',
  styleUrls: ['./dashboard-updates.component.scss'],
})
export class DashboardUpdatesComponent implements OnInit {
  @ViewChild('qrCanvas', { static: true }) qrCanvas: ElementRef<HTMLCanvasElement>;
  ERegistrationStatuses = ERegistrationStatuses;
  showEntryPass: boolean[] = [];
  updates = [];
  faChevronDown = faChevronDown;

  constructor() {}

  ngOnInit(): void {
    this.generateQRCode();
  }

  generateQRCode() {
    // const qrCode = generate('650496');
    // qrCode.toCanvas(this.qrCanvas.nativeElement);
  }

  toggleEntryPass(index) {
    this.showEntryPass[index] = !this.showEntryPass[index];
  }
}
