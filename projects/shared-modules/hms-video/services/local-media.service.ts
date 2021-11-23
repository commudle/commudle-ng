import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalMediaService {
  private audioInputDeviceId: BehaviorSubject<string> = new BehaviorSubject<string>('default');
  public audioInputDeviceId$ = this.audioInputDeviceId.asObservable();
  private videoDeviceId: BehaviorSubject<string> = new BehaviorSubject<string>('default');
  public videoDeviceId$ = this.videoDeviceId.asObservable();
  private isAudioEnabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isAudioEnabled$ = this.isAudioEnabled.asObservable();
  private isVideoEnabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public isVideoEnabled$ = this.isVideoEnabled.asObservable();

  constructor() {}

  setAudioInputDeviceId(deviceId: string): void {
    this.audioInputDeviceId.next(deviceId);
  }

  setVideoDeviceId(deviceId: string): void {
    this.videoDeviceId.next(deviceId);
  }

  setIsAudioEnabled(isAudioEnabled: boolean): void {
    this.isAudioEnabled.next(isAudioEnabled);
  }

  setIsVideoEnabled(isVideoEnabled: boolean): void {
    this.isVideoEnabled.next(isVideoEnabled);
  }

  getMediaPermissions(name: PermissionName): Observable<PermissionState> {
    return from(
      navigator.permissions.query({ name }).then((permission: PermissionStatus) => {
        return permission.state;
      }),
    );
  }

  getAudioInputDevices(): Observable<MediaDeviceInfo[]> {
    return from(
      navigator.mediaDevices.enumerateDevices().then((devices: MediaDeviceInfo[]) => {
        return devices.filter((device: MediaDeviceInfo) => device.kind === 'audioinput' && device.label !== '');
      }),
    );
  }

  getVideoDevices(): Observable<MediaDeviceInfo[]> {
    return from(
      navigator.mediaDevices.enumerateDevices().then((devices: MediaDeviceInfo[]) => {
        return devices.filter((device: MediaDeviceInfo) => device.kind === 'videoinput' && device.label !== '');
      }),
    );
  }

  getVideoStream(videoId: string): Observable<MediaStream> {
    return from(navigator.mediaDevices.getUserMedia({ video: { deviceId: videoId } }));
  }

  getVideoDeviceId(): string {
    return this.videoDeviceId.getValue();
  }

  getAudioInputDeviceId(): string {
    return this.audioInputDeviceId.getValue();
  }

  getIsAudioEnabled(): boolean {
    return this.isAudioEnabled.getValue();
  }

  getIsVideoEnabled(): boolean {
    return this.isVideoEnabled.getValue();
  }
}
