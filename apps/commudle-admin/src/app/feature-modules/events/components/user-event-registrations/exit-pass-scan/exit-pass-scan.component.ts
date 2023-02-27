import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbCardComponent, NbDialogService, NbToastrService } from '@commudle/theme';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { EventEntryPassesService } from 'apps/commudle-admin/src/app/services/event-entry-passes.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { IEventEntryPass } from 'apps/shared-models/event_entry_pass.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exit-pass-scan',
  templateUrl: './exit-pass-scan.component.html',
  styleUrls: ['./exit-pass-scan.component.scss'],
})
export class ExitPassScanComponent implements OnInit, OnDestroy {
  event: IEvent;
  community: ICommunity;
  entryPass: IEventEntryPass;
  exitPass: IEventEntryPass;

  hasDevices: boolean;
  hasPermission: boolean;
  isScannerEnabled = true;
  isLoadingEntryPass = false;
  selectedDevice: MediaDeviceInfo;
  availableDevices: MediaDeviceInfo[] = [];
  isWindowOpen = false;

  @ViewChild('scannerComponent', { static: false }) scanner: ZXingScannerComponent;
  @ViewChild('correctSound') correctSound: ElementRef<HTMLAudioElement>;
  @ViewChild('incorrectSound') incorrectSound: ElementRef<HTMLAudioElement>;
  @ViewChild('formDetailsWindow') formDetailsWindow: TemplateRef<NbCardComponent>;

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

  getExitPass(entryCode: string) {
    this.eventEntryPassesService.getExitPass(this.event.id, entryCode).subscribe((exitPass) => {
      this.exitPass = exitPass;

      this.openWindow();
    });
  }

  onScanSuccess(value: string): void {
    if (!this.isWindowOpen) {
      this.getExitPass(value);
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
    this.nbDialogService.open(this.formDetailsWindow, {
      closeOnEsc: false,
      closeOnBackdropClick: false,
    });
  }

  onSubmit(value: string) {
    if (value?.length) {
      this.getExitPass(value);
    }
  }
}
