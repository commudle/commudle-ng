import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbIconConfig, NbToastrService } from '@commudle/theme';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private nbToastrService: NbToastrService) {}

  successDialog(message, duration = 2000) {
    const iconConfig: NbIconConfig = { icon: 'checkmark-outline', pack: 'eva' };
    this.nbToastrService.success('Success', message, {
      icon: iconConfig,
      status: 'success',
      duration: duration,
    });
  }

  warningDialog(message, duration = 2500) {
    const iconConfig: NbIconConfig = { icon: 'alert-circle-outline', pack: 'eva' };
    this.nbToastrService.warning('Warning', message, {
      icon: iconConfig,
      status: 'warning',
      duration: duration,
    });
  }

  notificationDialog(message, icon = 'email-outline', duration = 5000) {
    const iconConfig: NbIconConfig = { icon: icon, pack: 'eva' };
    const position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_LEFT;
    this.nbToastrService.warning('Notification', message, {
      icon: iconConfig,
      position: position,
      status: 'primary',
      duration: duration,
    });
  }
}
