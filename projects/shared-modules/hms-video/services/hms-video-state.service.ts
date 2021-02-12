import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum EHmsStates {
  INIT = 'select_role',
  PREVIEW = 'preview',
  ROOM = 'room'
}


@Injectable({
  providedIn: 'root'
})
export class HmsVideoStateService {

  states = EHmsStates;

  private hmsState: BehaviorSubject<EHmsStates> = new BehaviorSubject(null);
  public hmsState$ = this.hmsState.asObservable();


  constructor() { }

  // set the state to display the desired component
  setState(stage: any) {
    this.hmsState.next(stage);
  }
}
