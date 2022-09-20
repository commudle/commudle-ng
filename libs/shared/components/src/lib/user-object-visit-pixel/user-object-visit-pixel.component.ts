import { DOCUMENT, isPlatformBrowser, Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { environment } from '@commudle/shared-environments';
import { LibAuthwatchService } from '@commudle/shared-services';
import { CookieService } from 'ngx-cookie-service';
import { UserObjectVisitsService } from '../services/user-object-visits.service';

@Component({
  selector: 'commudle-user-object-visit-pixel',
  templateUrl: './user-object-visit-pixel.component.html',
  styleUrls: ['./user-object-visit-pixel.component.scss'],
})
export class UserObjectVisitPixelComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() parentType;
  @Input() parentId;
  loading = false;
  userObjectVisitId;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  @ViewChild('pixel') private pixel: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private userObjectVisitsService: UserObjectVisitsService,
    private location: Location,
    private cookieService: CookieService,
    private authWatchService: LibAuthwatchService,
  ) {}

  ngOnInit() {}

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
      app_token: this.authWatchService.getAppToken(),
    };

    this.userObjectVisitsService.create(userObjectVisit).subscribe((data) => {
      this.loading = false;
      this.userObjectVisitId = data.id;
    });
  }

  markEndTime() {
    this.loading = true;
    this.userObjectVisitsService.markEndTime(this.userObjectVisitId).subscribe((data) => {
      this.loading = false;
    });
    this.userObjectVisitId = null;
  }
}
