import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { LibErrorHandlerService } from './lib-error-handler.service';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

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
    private meta: Meta
  ) { }

  ngOnInit() {
    this.meta.updateTag({
      name: 'robots',
      content: 'noindex'
    });
  }

  ngOnChanges() {
    this.errorCode = this.errorHandlerService.errorCode;
    this.errorMessage = this.errorHandlerService.errorMessage;
  }

  ngOnDestroy() {
    this.meta.removeTag("name='robots'");
  }


  goToHome() {
    this.router.navigate(['/']);
  }

}
