import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdatePinnedMessagesService {
  private updatePinnedMessages: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public updatePinnedMessages$ = this.updatePinnedMessages.asObservable();

  constructor() {}

  setUpdatePinnedMessagesStatus(value: boolean) {
    this.updatePinnedMessages.next(value);
  }
}
