import { Injectable } from '@angular/core';
import { environment } from 'projects/commudle-admin/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DesktopNotificationsService {
  constructor() {}

  showNotification(title: string, message: string) {
    // this.getPermission().then((permission: 'default' | 'denied' | 'granted') => {
    //   if (permission === 'granted' && !document.hasFocus()) {
    //     const notification: Notification = this.createNotification(title, message);
    //
    //     notification.onclick = () => {
    //       window.open(environment.app_url, '_blank');
    //     };
    //   }
    // });
  }

  getPermission() {
    if ('Notification' in window) {
      return Notification.requestPermission();
    } else {
      return Promise.resolve('Notification not supported');
    }
  }

  createNotification(title: string, message: string) {
    return new Notification(title, {
      body: message,
      icon: 'assets/images/commudle-logo96.png',
      vibrate: [100, 50, 100],
      actions: [
        { action: 'explore', title: 'Go to the site' },
        { action: 'close', title: 'Close the notification' },
      ],
      timestamp: Date.now(),
    });
  }
}
