import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { IMainNewsletter } from 'projects/shared-models/main-newsletter.model';
import { MainNewslettersService } from '../../services/main-newsletters.service';

@Component({
  selector: 'app-main-newsletter',
  templateUrl: './main-newsletter.component.html',
  styleUrls: ['./main-newsletter.component.scss']
})
export class MainNewsletterComponent implements OnInit, OnDestroy {
  subscriptions = [];
  mainNewsletter: IMainNewsletter;
  sanitizedContent;

  constructor(
    private mainNewslettersService: MainNewslettersService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(
        data => {
          if (data.main_newsletter_id) {
            this.getMainNewsletter(data.main_newsletter_id);
          }
        }
      )
    )
  }

  ngOnDestroy() {
    for (let subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  getMainNewsletter(id) {
    this.mainNewslettersService.show(id).subscribe(
      data => {
        this.mainNewsletter = data;
        this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(data.content);
      }
    )
  }

}
