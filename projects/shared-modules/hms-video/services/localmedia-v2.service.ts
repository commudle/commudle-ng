import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';

// service for hms v2
@Injectable({
  providedIn: 'root',
})
export class LocalMediaV2Service {
  // Store and listen to device IDs
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

  getMediaPermissions(): Observable<MediaStream> {
    return from(navigator.mediaDevices.getUserMedia({ audio: true, video: true }));
  }

  getAudioInputDevices(): Observable<MediaDeviceInfo[]> {
    return from(
      navigator.mediaDevices.enumerateDevices().then((devices: MediaDeviceInfo[]) => {
        return devices.filter((device: MediaDeviceInfo) => device.kind === 'audioinput');
      }),
    );
  }

  getVideoDevices(): Observable<MediaDeviceInfo[]> {
    return from(
      navigator.mediaDevices.enumerateDevices().then((devices: MediaDeviceInfo[]) => {
        return devices.filter((device: MediaDeviceInfo) => device.kind === 'videoinput');
      }),
    );
  }

  getVideoStream(videoId: string): Observable<MediaStream> {
    return from(navigator.mediaDevices.getUserMedia({ video: { deviceId: videoId } }));
  }

  // Get current video device id
  getVideoDeviceId(): string {
    return this.videoDeviceId.getValue();
  }

  // Get current audio device id
  getAudioInputDeviceId(): string {
    return this.audioInputDeviceId.getValue();
  }

  // Get current audio enabled state
  getIsAudioEnabled(): boolean {
    return this.isAudioEnabled.getValue();
  }

  // Get current video enabled state
  getIsVideoEnabled(): boolean {
    return this.isVideoEnabled.getValue();
  }
}
