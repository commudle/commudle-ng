import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LibAuthwatchService } from './lib-authwatch.service';
import { UserVisitsChannel } from './websockets/user-visits.channel';

@Injectable({
  providedIn: 'root',
})
export class UserVisitsService {
  private subscription;

  // visitors data
  private visitors: BehaviorSubject<any> = new BehaviorSubject(null);
  public visitors$ = this.visitors.asObservable();

  constructor(private userVisitsChannel: UserVisitsChannel, private authWatchService: LibAuthwatchService) {}

  subscribe(url) {
    const appToken = this.authWatchService.getAppToken();
    if (appToken) {
      if (this.subscription) {
        this.userVisitsChannel.unsubscribe();
      }
      this.subscription = this.userVisitsChannel.subscribe(url);
    }
  }

  receiveData() {
    this.userVisitsChannel.channelData$.subscribe((data) => {
      if (data) {
        switch (data.action) {
          case this.userVisitsChannel.ACTIONS.VISITORS: {
            this.visitors.next(data.visitors);
          }
        }
      }
    });
  }
}
