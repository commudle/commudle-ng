import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalMediaService {
  constructor() {
  }

  private _selectedAudioInputDevice: MediaDeviceInfo;

  get selectedAudioInputDevice(): MediaDeviceInfo {
    return this._selectedAudioInputDevice;
  }

  set selectedAudioInputDevice(value: MediaDeviceInfo) {
    this._selectedAudioInputDevice = value;
  }

  private _selectedVideoInputDevice: MediaDeviceInfo;

  get selectedVideoInputDevice(): MediaDeviceInfo {
    return this._selectedVideoInputDevice;
  }

  set selectedVideoInputDevice(value: MediaDeviceInfo) {
    this._selectedVideoInputDevice = value;
  }

  private _isAudioMuted: boolean;

  get isAudioMuted(): boolean {
    return this._isAudioMuted;
  }

  set isAudioMuted(value: boolean) {
    this._isAudioMuted = value;
  }

  private _isVideoMuted: boolean;

  get isVideoMuted(): boolean {
    return this._isVideoMuted;
  }

  set isVideoMuted(value: boolean) {
    this._isVideoMuted = value;
  }

  getConnectedDevices(type: 'audioinput' | 'audiooutput' | 'videoinput', callback): void {
    navigator.mediaDevices.enumerateDevices().then((devices: MediaDeviceInfo[]) => {
      const filtered = devices.filter((device: MediaDeviceInfo) => device.kind === type);
      callback(filtered);
    });
  }
}
