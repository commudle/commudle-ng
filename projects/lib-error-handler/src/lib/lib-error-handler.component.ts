import { Component, OnInit, OnChanges } from '@angular/core';
import { LibErrorHandlerService } from './lib-error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-lib-error-handler',
  templateUrl: './lib-error-handler.component.html',
  styleUrls: ['./lib-error-handler.component.scss']
})
export class LibErrorHandlerComponent implements OnInit, OnChanges {

  errorCode: string;
  errorMessage: string;

  constructor(
    private errorHandlerService: LibErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.errorCode = this.errorHandlerService.errorCode;
    this.errorMessage = this.errorHandlerService.errorMessage;
  }


  goToHome() {
    console.log('clicked');
    this.router.navigate(['/']);
  }

}
