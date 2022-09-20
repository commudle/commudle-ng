import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchStatusService {
  searchStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  searchStatus$ = this.searchStatus.asObservable();

  constructor() {}

  setSearchStatus(status: boolean) {
    this.searchStatus.next(status);
  }
}
