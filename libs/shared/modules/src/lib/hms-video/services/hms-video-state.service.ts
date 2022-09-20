import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EHmsStates } from '../enums/hms-states.enum';

@Injectable({
  providedIn: 'root',
})
export class HmsVideoStateService {
  states = EHmsStates;

  private hmsState: BehaviorSubject<EHmsStates> = new BehaviorSubject(null);
  public hmsState$ = this.hmsState.asObservable();

  constructor() {}

  // set the state to display the desired component
  setState(stage: EHmsStates) {
    this.hmsState.next(stage);
  }
}
