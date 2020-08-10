import { Component, OnInit, Input, HostListener, OnDestroy, ElementRef, Inject, ViewChild, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { UserObjectVisitsService } from '../services/user-object-visits.service';
import { Location, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'projects/commudle-admin/src/environments/environment';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';

@Component({
  selector: 'app-user-object-visit-pixel',
  templateUrl: './user-object-visit-pixel.component.html',
  styleUrls: ['./user-object-visit-pixel.component.scss']
})
export class UserObjectVisitPixelComponent implements OnInit, OnDestroy, AfterViewInit {
  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  @ViewChild('pixel') private pixel: ElementRef;

  @Input() parentType;
  @Input() parentId;


  loading = false;

  userObjectVisitId;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private userObjectVisitsService: UserObjectVisitsService,
    private location: Location,
    private cookieService: CookieService,
    private authWatchService: LibAuthwatchService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.updateServer();
  }

  ngOnDestroy() {
    this.markEndTime();
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    this.updateServer();
  }

  updateServer() {
    if (this.isBrowser) {
      const rect = this.pixel.nativeElement.getBoundingClientRect();
      if (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || this.document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || this.document.documentElement.clientWidth)
      ) {
        if (!this.userObjectVisitId && !this.loading) {
          this.markVisit();
        }
      } else {
        if (this.userObjectVisitId && !this.loading) {
          this.markEndTime();
        }
      }
    }
  }

  markVisit() {
    this.loading = true;
    const userObjectVisit = {
      url: this.location.path(),
      session_token: this.cookieService.get(environment.session_cookie_name),
      parent_type: this.parentType,
      parent_id: this.parentId,
      app_token: this.authWatchService.getAppToken()
    };

    this.userObjectVisitsService.create(userObjectVisit).subscribe(data => {
      this.loading = false;
      this.userObjectVisitId = data.id;
    });
  }


  markEndTime() {
    this.loading = true;
    this.userObjectVisitsService.markEndTime(this.userObjectVisitId).subscribe(
      data => {
        this.loading = false;
      }
    );
    this.userObjectVisitId = null;
  }

}
