import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalmediaService {
  private selectedAudioDevice: BehaviorSubject<any> = new BehaviorSubject(null);
  public selectedAudioDevice$ = this.selectedAudioDevice.asObservable();

  private selectedVideoDevice: BehaviorSubject<any> = new BehaviorSubject(null);
  public selectedVideoDevice$ = this.selectedVideoDevice.asObservable();

  private camera: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public camera$ = this.camera.asObservable();

  private mic: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public mic$ = this.mic.asObservable();

  constructor() { }

  getDevices(): Observable<MediaDeviceInfo[]> {
    return from(navigator.mediaDevices.enumerateDevices())
  }

  getLocalStream(constraints) {
    return from(navigator.mediaDevices.getUserMedia(constraints));
  }

  updateAudioDevice(device) {
    this.selectedAudioDevice.next(device);
  }

  updateVideoDevice(device) {
    this.selectedVideoDevice.next(device);
  }

  updateCamera(value) {
    this.camera.next(value)
  }

  updateMic(value) {
    this.mic.next(value);
  }
}
