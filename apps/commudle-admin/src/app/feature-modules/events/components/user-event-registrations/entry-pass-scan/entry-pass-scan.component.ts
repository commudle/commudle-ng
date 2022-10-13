import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbCardComponent, NbDialogService, NbToastrService } from '@nebular/theme';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { EventEntryPassesService } from 'apps/commudle-admin/src/app/services/event-entry-passes.service';
import { ICommunity } from '@commudle/shared-models';
import { IEvent } from '@commudle/shared-models';
import { IEventEntryPass } from '@commudle/shared-models';
import { SeoService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-entry-pass-scan',
  templateUrl: './entry-pass-scan.component.html',
  styleUrls: ['./entry-pass-scan.component.scss'],
})
export class EntryPassScanComponent implements OnInit, OnDestroy {
  event: IEvent;
  community: ICommunity;
  entryPass: IEventEntryPass;

  hasDevices: boolean;
  hasPermission: boolean;
  isScannerEnabled: boolean = true;
  isLoadingEntryPass: boolean = false;
  selectedDevice: MediaDeviceInfo;
  availableDevices: MediaDeviceInfo[] = [];
  isWindowOpen: boolean = false;

  @ViewChild('scannerComponent', { static: false }) scanner: ZXingScannerComponent;
  @ViewChild('entryPassWindow') entryPassWindow: TemplateRef<NbCardComponent>;
  @ViewChild('correctSound') correctSound: ElementRef<HTMLAudioElement>;
  @ViewChild('incorrectSound') incorrectSound: ElementRef<HTMLAudioElement>;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private eventEntryPassesService: EventEntryPassesService,
    private nbToastrService: NbToastrService,
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
    this.eventEntryPassesService.getEntryPass(this.event.id, entryCode).subscribe(
      (entryPass) => {
        this.entryPass = entryPass;

        if (this.entryPass.attendance) {
          this.correctSound.nativeElement.play();
          this.nbToastrService.success(
            this.entryPass.is_first_time_attendance ? 'Attendance marked' : 'Attendance already marked',
            'Success',
          );
        }

        this.openWindow();
        // TODO: Switching off the scanner is continuously triggering the onScanSuccess event.
        // this.scanner.reset();
        // this.disableScanner();
      },
      (error) => {
        console.error('Error: ', error);
        this.incorrectSound.nativeElement.play();
      },
      () => {
        this.isLoadingEntryPass = false;
      },
    );
  }

  unmarkAttendance() {
    this.subscriptions.push(
      this.eventEntryPassesService.toggleAttendance(this.entryPass.id).subscribe((value) => {
        if (value) {
          this.nbToastrService.success('Attendance Unmarked', 'Success');
          this.enableScanner();
        }
      }),
    );
  }

  onScanSuccess(value: string): void {
    if (!this.isWindowOpen) {
      this.getEntryPass(value);
    }
  }

  onCamerasFound(cameras: MediaDeviceInfo[]): void {
    this.availableDevices = cameras;
  }

  onHasDevices(response: boolean): void {
    this.hasDevices = response;
  }

  onPermissionResponse(response: boolean): void {
    this.hasPermission = response;
  }

  onSelectedChange(deviceId: string): void {
    this.selectedDevice = this.availableDevices.find((device) => device.deviceId === deviceId);
  }

  enableScanner() {
    this.isScannerEnabled = true;
  }

  disableScanner() {
    this.isScannerEnabled = false;
  }

  openWindow() {
    this.isWindowOpen = true;
    this.nbDialogService.open(this.entryPassWindow, {
      closeOnEsc: false,
      closeOnBackdropClick: false,
    });
  }

  handleOk() {
    this.enableScanner();
    this.isWindowOpen = false;
  }

  handleCancel() {
    this.unmarkAttendance();
    this.isWindowOpen = false;
  }

  onSubmit(value: string) {
    if (value?.length) {
      this.getEntryPass(value);
    }
  }
}
