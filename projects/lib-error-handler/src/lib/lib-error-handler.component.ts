import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { LibErrorHandlerService } from './lib-error-handler.service';
import { Router } from '@angular/router';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'lib-lib-error-handler',
  templateUrl: './lib-error-handler.component.html',
  styleUrls: ['./lib-error-handler.component.scss']
})
export class LibErrorHandlerComponent implements OnInit, OnDestroy, OnChanges {

  errorCode: string;
  errorMessage: string;

  constructor(
    private errorHandlerService: LibErrorHandlerService,
    private router: Router,
    private seoService : SeoService
  ) { }

  ngOnInit() {
    this.seoService.setTag('robots', 'noindex');
  }

  ngOnChanges() {
    this.errorCode = this.errorHandlerService.errorCode;
    this.errorMessage = this.errorHandlerService.errorMessage;
  }

  ngOnDestroy() {
    this.seoService.removeTag("name='robots'");
  }


  goToHome() {
    this.router.navigate(['/']);
  }

}
