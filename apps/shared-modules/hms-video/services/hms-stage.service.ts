import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HmsStageService {
  stageStatus: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  stageStatus$ = this.stageStatus.asObservable();

  constructor() {}

  inviteToStage(userId: number) {
    this.stageStatus.next(userId);
  }
}
