import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { EventPassService } from 'projects/commudle-admin/src/app/feature-modules/events/services/event-pass.service';
import { IEventPass } from 'projects/shared-models/event-pass.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-entry-pass-scan',
  templateUrl: './entry-pass-scan.component.html',
  styleUrls: ['./entry-pass-scan.component.scss'],
})
export class EntryPassScanComponent implements OnInit {

  @ViewChild('scanner', { static: false }) scanner: ZXingScannerComponent;
  @ViewChild('correctSound') correctSound: ElementRef;
  @ViewChild('incorrectSound') incorrectSound: ElementRef;

  scannerEnabled: boolean = true;
  
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  eventPass: IEventPass = null;
  event_id: string = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.QR_CODE,
  ];

  constructor(
    private eventPassService: EventPassService,
    private activatedRoute: ActivatedRoute,
    private toastService: LibToastLogService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.event_id = res.event_id;
    })
  }

  isBoolean(val){
    return val === true || val === false;
  }

  /*TODO
  on api call the response should contain both the event passs object and the message as on the backend
  we have converted the error response to success response so the message should be displayed from the frontend.
  */

  onCodeResult(resultString: string){
    this.eventPassService.getEntryPass(this.event_id, resultString).subscribe((data) => {
      if(!this.isBoolean(data)){
        this.correctSound.nativeElement.play();
        this.eventPass = data;
      }
      else{
        this.incorrectSound.nativeElement.play();
      }
    })
  }

  toggleAttendance(){
    this.eventPassService.toggleAttendance(870).subscribe((res) => {
      if(res){
        this.toastService.successDialog('Attendance Marked')
      }
    })
  }

  onCamerasFound(devices: MediaDeviceInfo[]){ // checks whether user has camera devices or not
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onHasPermission(has: boolean){ // to check whether user has provided permission to access camera or not
    this.hasPermission = has;
  }

  onDeviceSelectChange(selected: string){ // when user changes the camera
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  compareByDeviceId(optionValue, selectedValue): boolean{
    if(selectedValue){
      return optionValue === selectedValue.deviceId;
    }
  }
}
