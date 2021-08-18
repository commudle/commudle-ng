import { DeviceMap, selectDevices, selectLocalMediaSettings } from '@100mslive/hms-video-store';
import { HMSDeviceManager } from '@100mslive/hms-video/dist/interfaces/HMSDeviceManager';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { hmsActions, hmsStore } from 'projects/shared-modules/hms-video/stores/hms.store';

@Component({
  selector: 'app-conference-settings',
  templateUrl: './conference-settings.component.html',
  styleUrls: ['./conference-settings.component.scss'],
})
export class ConferenceSettingsComponent implements OnInit, AfterViewInit {
  // Available devices
  devices: DeviceMap = hmsStore.getState(selectDevices);

  selectedDevice = hmsStore.getState(selectLocalMediaSettings);

  constructor(protected dialogRef: NbDialogRef<any>) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    hmsStore.subscribe(this.getMediaDevices, selectDevices);
  }

  getMediaDevices = (devices: HMSDeviceManager) => {
    if (devices.audioInput.length > 0 || devices.videoInput.length > 0) {
      this.devices = devices;
    }
  };

  setAudioDevice(deviceId: string): void {
    hmsActions.setAudioSettings({
      deviceId: deviceId,
    });
  }

  setVideoDevice(deviceId: string): void {
    hmsActions.setVideoSettings({
      deviceId: deviceId,
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
