import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionPageNotificationsService {
  constructor() {}

  private _newChat = new BehaviorSubject<boolean>(false);

  set newChat(value: boolean) {
    this._newChat.next(value);
  }

  private _newQna = new BehaviorSubject<boolean>(false);

  set newQna(value: boolean) {
    this._newQna.next(value);
  }

  private _newChat$ = this._newChat.asObservable();

  get newChat$(): Observable<boolean> {
    return this._newChat$;
  }

  private _newQna$ = this._newQna.asObservable();

  get newQna$(): Observable<boolean> {
    return this._newQna$;
  }
}
