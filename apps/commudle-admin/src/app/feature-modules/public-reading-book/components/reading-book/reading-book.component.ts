import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@commudle/theme';
import { faAngleDown, faAngleUp, faDownload } from '@fortawesome/free-solid-svg-icons';
import { ReadingBookIndexComponent } from 'apps/commudle-admin/src/app/feature-modules/public-reading-book/components/reading-book-index/reading-book-index.component';
import { CmsService } from 'apps/shared-services/cms.service';
import { Subscription } from 'rxjs';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { LibErrorHandlerService } from 'apps/lib-error-handler/src/public-api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'commudle-reading-book',
  templateUrl: './reading-book.component.html',
  styleUrls: ['./reading-book.component.scss'],
})
export class ReadingBookComponent implements OnInit {
  faDownload = faDownload;
  selectedChapterIndex;
  chapterIndexes;
  richText: string;
  subscriptions: Subscription[] = [];
  chapterData;
  isLoading = true;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  currentUser: ICurrentUser;
  params = '';

  // chapterIndexes = [
  //   {
  //     title: 'The Developer Ecosystem Blueprint: Strategies for Building Thriving Communities',
  //     slug: 'the-developer-ecosystem-blueprint-strategies-for-building-thriving-communities',
  //     page: '1',
  //   },
  //   {
  //     title: 'Lessons from Veteran Community Leaders',
  //     slug: 'lessons-from-veteran-community-leaders',
  //     page: '2',
  //   },
  //   {
  //     title: 'You (Who) should read this?',
  //     slug: 'you-who-should-read-this',
  //     page: '3',
  //   },
  //   {
  //     title: 'What’s in it for you?',
  //     slug: 'what-s-in-it-for-you',
  //     page: '4',
  //   },
  //   {
  //     title: 'And hey, here’s something about me.',
  //     slug: 'and-hey-here-s-something-about-me',
  //     page: '5',
  //   },
  //   {
  //     title: 'On to building Developer Communities',
  //     slug: 'on-to-building-developer-communities',
  //     page: '6',
  //   },
  //   {
  //     title: 'Stage One: Soul Search',
  //     slug: 'stage-one-soul-search',
  //     page: '7',
  //   },
  //   {
  //     title: 'Stage Two: What? (to do) & Who?',
  //     slug: 'stage-two-what-to-do-who',
  //     page: '8',
  //   },
  //   {
  //     title: 'Stage Three: How?',
  //     slug: 'stage-three-how',
  //     page: '9',
  //   },
  //   {
  //     title: 'Stage Four: The Launch',
  //     slug: 'stage-four-the-launch',
  //     page: '10',
  //   },
  //   {
  //     title: 'Stage Five: Sustain',
  //     slug: 'stage-five-sustain',
  //     page: '11',
  //   },
  //   {
  //     title: 'Stage Six Point One: Recalibration',
  //     slug: 'stage-six-point-one-recalibration',
  //     page: '12',
  //   },
  //   {
  //     title: 'Stage Six Point Two: Engagements, Engagements, Engagements',
  //     slug: 'stage-six-point-two-engagements-engagements-engagements',
  //     page: '13',
  //   },
  //   {
  //     title: 'Stage Seven: The Umbrella of New Programs',
  //     slug: 'stage-seven-the-umbrella-of-new-programs',
  //     page: '14',
  //   },
  //   {
  //     title: 'Introducing the CREDIT framework!',
  //     slug: 'introducing-the-credit-framework',
  //     page: '15',
  //   },
  //   {
  //     title: 'Stage Eight: Saturation: From Survival to Revival',
  //     slug: 'stage-eight-saturation-from-survival-to-revival',
  //     page: '16',
  //   },
  //   {
  //     title: 'The Life of a Community',
  //     slug: 'the-life-of-a-community',
  //     page: '17',
  //   },
  // ];

  constructor(
    private cmsService: CmsService,
    private activatedRoute: ActivatedRoute,
    private dialogService: NbDialogService,
    private authwatchService: LibAuthwatchService,
    private errorHandler: LibErrorHandlerService,
    private router: Router,
    private http: HttpClient,
  ) {
    activatedRoute.params.subscribe(() => {
      this.getChaptersData();
    });
  }

  ngOnInit(): void {
    this.authwatchService.currentUser$.subscribe((currentUser) => {
      this.currentUser = currentUser;
      // if (!this.currentUser) {
      //   this.errorHandler.handleError(401, 'Login to apply');
      // }
    });
    // this.params = this.activatedRoute.snapshot.params.slug;
    this.getIndex();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  imageUrl(source: any) {
    // this.imageLoading = false;
    return this.cmsService.getImageUrl(source);
  }

  getIndex() {
    this.cmsService.getDataByType('book').subscribe((data) => {
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
          this.richText = this.cmsService.getHtmlFromBlock(value);
        }
        this.isLoading = false;
        // this.setMeta();
      }),
    );
  }

  // changeStep(slug: string) {
  //   // this.scrollToTop();
  //   // this.selectedLabStep += count;
  //   // this.lastVisitedStepId = null;
  //   // this.highlightCodeSnippets();
  //   // if (this.selectedLabStep === -1) {
  //   //   this.router.navigate(['/labs', this.lab.slug]);
  //   //   this.setMeta();
  //   // }
  // }

  showIndex(event) {
    this.router.navigate(['/reading-book', event.target.value]);
  }

  downloadPDF() {
    console.log('called');
    const proxyUrl = 'https://your-ngrok-tunnel-url/api/pdf';
    const pdfUrl = 'https://pdfkit.com/docs/v0.9/basic.pdf';
    this.http.get(proxyUrl + '?url=' + pdfUrl, { responseType: 'blob' }).subscribe((data) => {
      console.log(data, 'called 2');
      // this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((data) => {
      const fileURL = URL.createObjectURL(data);
      const anchor = document.createElement('a');
      anchor.href = fileURL;
      anchor.download = 'sample.pdf';
      anchor.click();
      URL.revokeObjectURL(fileURL);
    });
  }
}

// downloadPDF() {
//   const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
//   this.http.get(pdfUrl, { responseType: 'arraybuffer' }).subscribe((data: ArrayBuffer) => {
//     const blob = new Blob([data], { type: 'application/pdf' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'your-filename.pdf';
//     document.body.appendChild(a);
//     a.click();

//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
//   });
// }
