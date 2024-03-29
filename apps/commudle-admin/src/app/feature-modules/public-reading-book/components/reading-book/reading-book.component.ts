import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAngleDown, faAngleUp, faDownload } from '@fortawesome/free-solid-svg-icons';
import { CmsService } from 'apps/shared-services/cms.service';
import { Subscription } from 'rxjs';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { LibErrorHandlerService } from 'apps/lib-error-handler/src/public-api';
import { IReadingBook } from 'apps/shared-models/reading_book.model';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'commudle-reading-book',
  templateUrl: './reading-book.component.html',
  styleUrls: ['./reading-book.component.scss'],
})
export class ReadingBookComponent implements OnInit, OnDestroy {
  faDownload = faDownload;
  selectedChapterIndex;
  chapterIndexes: IReadingBook[];
  richTextContent: string;
  richTextFunFact: string;
  richTextCommudleHelps: string;
  subscriptions: Subscription[] = [];
  chapterData: IReadingBook;
  isLoading = true;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  currentUser: ICurrentUser;
  params = '';

  constructor(
    private cmsService: CmsService,
    private activatedRoute: ActivatedRoute,
    private authwatchService: LibAuthwatchService,
    private errorHandler: LibErrorHandlerService,
    private router: Router,
    private seoService: SeoService,
  ) {
    activatedRoute.params.subscribe(() => {
      this.getChaptersData();
    });
  }

  ngOnInit(): void {
    this.authwatchService.currentUser$.subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
    this.getIndex();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  imageUrl(source: any) {
    return this.cmsService.getImageUrl(source);
  }

  getIndex() {
    const fields = '_id, slug, chapter_name, chapter_number';
    const order = 'chapter_number asc';
    this.cmsService.getDataByTypeFieldOrder('book', fields, order).subscribe((data: IReadingBook[]) => {
      if (data) {
        this.chapterIndexes = data;
      }
    });
  }

  getChaptersData() {
    this.isLoading = true;
    this.chapterData = null;
    this.richTextContent = '';
    this.richTextFunFact = '';
    this.richTextCommudleHelps = '';
    const slug: string = this.activatedRoute.snapshot.params.slug;
    this.subscriptions.push(
      this.cmsService.getDataBySlug(slug).subscribe((value: IReadingBook) => {
        if (value) {
          this.chapterData = value;
          this.setMeta(value.chapter_name, value?.meta_description);
          if (value.content) this.richTextContent = this.cmsService.getHtmlFromBlock(value);
          if (value.fun_facts) this.richTextFunFact = this.cmsService.getHtmlFromBlock(value, 'fun_facts');
          if (value.how_commudle_helps)
            this.richTextCommudleHelps = this.cmsService.getHtmlFromBlock(value, 'how_commudle_helps');
        }
        this.isLoading = false;
      }),
    );
  }

  redirectToLogin() {
    if (!this.currentUser) {
      this.errorHandler.handleError(401, 'Login to apply');
    }
  }

  showIndex(event) {
    this.router.navigate(['/developer-ecosystem-blueprint/book', event.target.value]);
  }

  setMeta(chapter_name, description) {
    this.seoService.setTags(
      chapter_name,
      description ? description : '',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
