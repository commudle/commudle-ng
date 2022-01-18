import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { DOCUMENT } from '@angular/common';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authWatchService: LibAuthwatchService,
    private seoService : SeoService,
    // private router: Router
  ) { }

  ngOnInit() {
    this.seoService.setTag('robots', 'noindex');
    this.authWatchService.signOut().subscribe(() => {
      this.document.location.href = '/';
    });

  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.seoService.removeTag("name='robots'");
  }

}
