import { Injectable, Inject } from '@angular/core';
import { NbToastrService, NbIconConfig } from '@nebular/theme';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LibToastLogService {


  constructor(
    private toastrService: NbToastrService,
  ) { }


  successDialog(message) {
    const iconConfig: NbIconConfig = { icon: 'checkmark-outline', pack: 'eva' };
    this.toastrService.success(
      'Success',
      message,
      {
        icon: iconConfig,
        status: 'success',
        duration: 1000
      }
    );
  }
}
