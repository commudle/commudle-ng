import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HmsStageService {
  stageStatus: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  stageStatus$ = this.stageStatus.asObservable();

  raisedHands: BehaviorSubject<Set<number>> = new BehaviorSubject<Set<number>>(new Set<number>());
  raisedHands$ = this.raisedHands.asObservable();

  constructor() {}

  inviteToStage(userId: number) {
    this.stageStatus.next(userId);
  }

  raiseHand(userId: number) {
    const raisedHands = this.raisedHands.value;
    if (!raisedHands.has(userId)) {
      raisedHands.add(userId);
      this.raisedHands.next(raisedHands);
    }
  }

  lowerHand(userId: number) {
    const raisedHands = this.raisedHands.value;
    if (raisedHands.has(userId)) {
      raisedHands.delete(userId);
      this.raisedHands.next(raisedHands);
    }
  }

  isRaisedHand(userId: number) {
    return this.raisedHands.value.has(userId);
  }
}
