import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAngleDown, faAngleUp, faDownload } from '@fortawesome/free-solid-svg-icons';
import { CmsService } from 'apps/shared-services/cms.service';
import { Subscription } from 'rxjs';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { LibErrorHandlerService } from 'apps/lib-error-handler/src/public-api';
import { IReadingBookModel } from 'apps/shared-models/reading_book.model';

@Component({
  selector: 'commudle-reading-book',
  templateUrl: './reading-book.component.html',
  styleUrls: ['./reading-book.component.scss'],
})
export class ReadingBookComponent implements OnInit {
  faDownload = faDownload;
  selectedChapterIndex;
  chapterIndexes;
  richTextContent: string;
  richTextFunFact: string;
  richTextCommudleHelps: string;
  subscriptions: Subscription[] = [];
  chapterData: IReadingBookModel;
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
    this.cmsService.getDataByTypeFieldOrder('book', fields, order).subscribe((data) => {
      if (data) {
        this.chapterIndexes = data;
      }
    });
  }

  getChaptersData() {
    this.isLoading = true;
    const slug: string = this.activatedRoute.snapshot.params.slug;
    this.subscriptions.push(
      this.cmsService.getDataBySlug(slug).subscribe((value) => {
        if (value) {
          this.chapterData = value;
          this.richTextContent = this.cmsService.getHtmlFromBlock(value);
          this.richTextFunFact = this.cmsService.getHtmlFromBlock(value, 'fun_facts');
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
    this.router.navigate(['/developer-community-blueprint', event.target.value]);
  }
}
