import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

/*
TODO: 
1. when scanner opens initially, the camera which is selected by default should display in the list of camera selected
2. Make API Call in onCodeResult method to check validity of qr code and show response in the form of sounds
3. Use the permission api to display or hide the scan entry pass button
4. Display the user's info whom that entry pass belongs to + give option to mark attendence once verified
*/

@Component({
  selector: 'app-entry-pass-scan',
  templateUrl: './entry-pass-scan.component.html',
  styleUrls: ['./entry-pass-scan.component.scss'],
})
export class EntryPassScanComponent implements OnInit {

  @ViewChild('scanner', { static: false }) scanner: ZXingScannerComponent;

  scannerEnabled: boolean = true;
  
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;

  constructor() {}

  ngOnInit(): void {
  }

  onCodeResult(resultString: string){

  }

  onCamerasFound(devices: MediaDeviceInfo[]){
    console.log(this.scanner.device)
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onHasPermission(has: boolean){
    this.hasPermission = has;
  }

  onDeviceSelectChange(selected: string){
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

}
