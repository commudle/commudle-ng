import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from 'projects/shared-services/seo.service';
import { LibErrorHandlerService } from './lib-error-handler.service';

@Component({
  selector: 'lib-lib-error-handler',
  templateUrl: './lib-error-handler.component.html',
  styleUrls: ['./lib-error-handler.component.scss'],
})
export class LibErrorHandlerComponent implements OnInit, OnDestroy, OnChanges {
  errorCode: string;
  errorMessage: string;

  constructor(
    private errorHandlerService: LibErrorHandlerService,
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
