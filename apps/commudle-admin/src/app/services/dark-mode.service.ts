import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private isDarkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkMode.asObservable();

  constructor() {}

  toggleDarkMode(isDarkMode: boolean): void {
    this.isDarkMode.next(isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }
}
