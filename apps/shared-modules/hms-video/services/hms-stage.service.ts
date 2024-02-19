import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IHandRaisedUser {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class HmsStageService {
  stageStatus: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  stageStatus$ = this.stageStatus.asObservable();

  raisedHands: BehaviorSubject<{ [id: number]: { name: string } }> = new BehaviorSubject<{
    [id: number]: { name: string };
  }>({});
  raisedHands$ = this.raisedHands.asObservable();

  latestRaisedHand: BehaviorSubject<IHandRaisedUser> = new BehaviorSubject<IHandRaisedUser>(null);
  latestRaisedHand$ = this.latestRaisedHand.asObservable();

  constructor() {}

  inviteToStage(userId: number) {
    this.stageStatus.next(userId);
  }

  raiseHand(user: IHandRaisedUser) {
    const raisedHands = this.raisedHands.value;
    if (!raisedHands[user.id]) {
      raisedHands[user.id] = { name: user.name };
      this.raisedHands.next(raisedHands);
      this.latestRaisedHand.next(user);
    }
  }

  lowerHand(user: IHandRaisedUser) {
    const raisedHands = this.raisedHands.value;
    delete raisedHands[user.id];
    this.raisedHands.next(raisedHands);
  }

  isRaisedHand(userId: number) {
    return !!this.raisedHands.value[userId];
  }
}
