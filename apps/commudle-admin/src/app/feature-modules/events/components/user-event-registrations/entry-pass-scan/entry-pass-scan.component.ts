import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from '@commudle/shared-services';
import { NbCardComponent, NbDialogService } from '@commudle/theme';
import { BarcodeFormat } from '@zxing/library';
import { EventEntryPassesService } from 'apps/commudle-admin/src/app/services/event-entry-passes.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { IEventEntryPass } from 'apps/shared-models/event_entry_pass.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-entry-pass-scan',
  templateUrl: './entry-pass-scan.component.html',
  styleUrls: ['./entry-pass-scan.component.scss'],
})
export class EntryPassScanComponent implements OnInit, OnDestroy {
  event: IEvent;
  community: ICommunity;
  entryPass: IEventEntryPass;

  isScannerEnabled = true;
  isLoadingEntryPass = false;
  isWindowOpen = false;
  availableDevices: MediaDeviceInfo[];
  deviceCurrent: MediaDeviceInfo;
  deviceSelected: string;

  formatsEnabled: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  hasDevices: boolean;
  hasPermission: boolean;

  @ViewChild('entryPassWindow') entryPassWindow: TemplateRef<NbCardComponent>;
  @ViewChild('correctSound') correctSound: ElementRef<HTMLAudioElement>;
  @ViewChild('incorrectSound') incorrectSound: ElementRef<HTMLAudioElement>;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private eventEntryPassesService: EventEntryPassesService,
    private nbToastrService: ToastrService,
    private nbDialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.getRouteData();

    this.seoService.noIndex(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());

    this.seoService.noIndex(false);
  }

  getRouteData(): void {
    this.activatedRoute.data.subscribe((value) => {
      this.event = value.event;
      this.community = value.community;
    });
  }

  getEntryPass(entryCode: string): void {
    this.isLoadingEntryPass = true;
    this.isScannerEnabled = false;
    this.eventEntryPassesService.getEntryPass(this.event.id, entryCode).subscribe(
      (entryPass) => {
        this.entryPass = entryPass;

        if (this.entryPass.attendance) {
          if (this.entryPass.is_first_time_attendance) {
            this.correctSound.nativeElement.play();
            this.nbToastrService.successDialog('Attendance marked');
          } else {
            this.incorrectSound.nativeElement.play();
            this.nbToastrService.warningDialog('Attendance already marked');
          }
        }

        this.isLoadingEntryPass = false;
        this.openWindow();
      },
      () => {
        this.incorrectSound.nativeElement.play();
        this.nbToastrService.warningDialog('Invalid Entry Code');
        this.isScannerEnabled = true;
        this.isLoadingEntryPass = false;
      },
    );
  }

  unmarkAttendance() {
    this.subscriptions.push(
      this.eventEntryPassesService.toggleAttendance(this.entryPass.id).subscribe((value) => {
        if (value) {
          this.nbToastrService.successDialog('Attendance Unmarked');
        }
      }),
    );
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    if (!this.isWindowOpen) {
      this.getEntryPass(resultString);
    }
  }

  onDeviceSelectChange(selected: string) {
    const selectedStr = selected || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    const device = this.availableDevices.find((x) => x.deviceId === selected);
    this.deviceCurrent = device || undefined;
  }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openWindow() {
    this.isWindowOpen = true;
    this.nbDialogService.open(this.entryPassWindow, {
      closeOnEsc: false,
      closeOnBackdropClick: false,
    });
  }

  handleOk() {
    this.isWindowOpen = false;
    this.isScannerEnabled = true;
  }

  handleCancel() {
    this.unmarkAttendance();
    this.isWindowOpen = false;
    this.isScannerEnabled = true;
  }

  onSubmit(value: string) {
    if (value?.length) {
      this.getEntryPass(value);
    }
  }
}
