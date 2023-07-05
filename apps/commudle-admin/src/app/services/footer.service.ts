import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  private footerStatus: Subject<boolean> = new Subject<boolean>();
  public footerStatus$ = this.footerStatus.asObservable();
  private miniFooterStatus: Subject<boolean> = new Subject<boolean>();
  public miniFooterStatus$ = this.miniFooterStatus.asObservable();

  constructor() {}

  changeFooterStatus(value: boolean) {
    this.footerStatus.next(value);
  }

  changeMiniFooterStatus(value: boolean) {
    this.miniFooterStatus.next(value);
  }
}
