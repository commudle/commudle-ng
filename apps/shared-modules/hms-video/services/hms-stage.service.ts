import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HmsStageService {
  stageStatus: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  stageStatus$ = this.stageStatus.asObservable();

  raisedHands: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  raisedHands$ = this.raisedHands.asObservable();

  constructor() {}

  inviteToStage(userId: number) {
    this.stageStatus.next(userId);
  }

  raiseHand(userId: number) {
    const raisedHands = this.raisedHands.value;
    if (raisedHands.indexOf(userId) === -1) {
      raisedHands.push(userId);
      this.raisedHands.next(raisedHands);
    }
  }

  lowerHand(userId: number) {
    const raisedHands = this.raisedHands.value;
    const index = raisedHands.indexOf(userId);
    if (index !== -1) {
      raisedHands.splice(index, 1);
      this.raisedHands.next(raisedHands);
    }
  }
}
