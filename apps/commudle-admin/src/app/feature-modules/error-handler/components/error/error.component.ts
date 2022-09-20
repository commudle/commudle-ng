import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService, SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit, OnDestroy, OnChanges {
  errorCode: string;
  errorMessage: string;

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.seoService.noIndex(true);
  }

  ngOnChanges() {
    this.errorCode = this.errorHandlerService.errorCode;
    this.errorMessage = this.errorHandlerService.errorMessage;
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
