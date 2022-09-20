import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  private footerStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public footerStatus$ = this.footerStatus.asObservable();

  constructor() {}

  changeFooterStatus(value: boolean) {
    this.footerStatus.next(value);
  }
}
