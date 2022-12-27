import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@commudle/theme';

@Injectable({
  providedIn: 'root',
})
export class LibErrorHandlerService {
  errorCode: string;
  errorMessage: string;

  constructor(private toastrService: NbToastrService, private router: Router) {}

  handleError(errorCode, errorMessage) {
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
    switch (errorCode) {
      case 401:
        this.router.navigate(['/login'], { queryParams: { redirect: this.router.url } });
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
