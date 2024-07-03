import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelpDictionaryService {
  public helpDictionary: Subject<any> = new Subject<any>();
  public helpDictionary$ = this.helpDictionary.asObservable();

  constructor() {}

  getHelpDictionaryIframe(url: string) {
    this.helpDictionary.next(url);
  }
}
