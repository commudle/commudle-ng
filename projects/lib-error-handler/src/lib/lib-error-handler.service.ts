import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class LibErrorHandlerService {
  errorCode: string;
  errorMessage: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private toastrService: NbToastrService,
    private router: Router,
  ) {}

  handleError(errorCode, errorMessage) {
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    switch (errorCode) {
      case 401:
        this.document.location.href = `https://auther.commudle.com/?back_to=${encodeURIComponent(
          window.location.href,
        )}`;
        break;
      case 403:
        // redirect to unauthorized page
        this.router.navigate([`/error/?ref=${encodeURIComponent(window.location.href)}`]);
        break;
      case 404:
        this.router.navigate([`/404/?ref=${encodeURIComponent(window.location.href)}`]);
        break;
      default:
        // show a toastr
        this.toastrService.show(errorCode, errorMessage, {
          icon: '',
          status: 'danger',
          duration: 0,
        });
        break;
    }
  }
}
