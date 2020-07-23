import { Component, OnInit, Input, HostListener, OnDestroy, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { UserObjectVisitsService } from '../services/user-object-visits.service';
import { Location, DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'projects/commudle-admin/src/environments/environment';

@Component({
  selector: 'app-user-object-visit-pixel',
  templateUrl: './user-object-visit-pixel.component.html',
  styleUrls: ['./user-object-visit-pixel.component.scss']
})
export class UserObjectVisitPixelComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('pixel') private pixel: ElementRef;

  @Input() parentType;
  @Input() parentId;


  loading = false;

  userObjectVisitId;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private userObjectVisitsService: UserObjectVisitsService,
    private location: Location,
    private cookieService: CookieService,
    private elementRef: ElementRef
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

  markVisit() {
    this.loading = true;
    const userObjectVisit = {
      url: this.location.path(),
      session_token: this.cookieService.get(environment.session_cookie_name),
      parent_type: this.parentType,
      parent_id: this.parentId
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
