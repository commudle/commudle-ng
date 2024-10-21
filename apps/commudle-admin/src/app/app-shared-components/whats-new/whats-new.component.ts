import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbDialogService } from '@commudle/theme';
import { faBullhorn, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeoService } from 'apps/shared-services/seo.service';
import { WhatsNewService } from 'apps/shared-services/whats-new.service';
import { WhatsNewCardComponent } from './whats-new-card/whats-new-card.component';
import { IWhatsNew } from 'apps/shared-models/whats-new.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'commudle-whats-new',
  standalone: true,
  templateUrl: './whats-new.component.html',
  styleUrls: ['./whats-new.component.scss'],
  imports: [CommonModule, NbCardModule, FontAwesomeModule, WhatsNewCardComponent, NbButtonModule],
})
export class WhatsNewComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>(); // This Subject will emit when the component is destroyed.

  showPopup = false;
  showDialogPopup = false;
  cookieCreationTime;
  lastUpdatedDate: string;
  newUpdates: IWhatsNew[];
  faBullhorn = faBullhorn;
  faXmark = faXmark;
  cookieName = 'com_last_whats_new_seen';
  showWhatsNewPopup: boolean;

  constructor(
    private whatsNewService: WhatsNewService,
    private seoService: SeoService,
    private nbDialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.whatsNewService.showWhatsNewPopup$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.showWhatsNewPopup = value;
    });
    if (!this.seoService.isBot) {
      setTimeout(() => {
        this.newUpdates = [];
        const currentDate = new Date();
        this.cookieCreationTime = this.whatsNewService.getCookieByName(this.cookieName);
        currentDate.setMonth(currentDate.getMonth() - 2);
        const formattedPastTime = currentDate.toISOString();
        const date = this.whatsNewService.getCookieByName(this.cookieName)
          ? this.cookieCreationTime
          : formattedPastTime;
        this.whatsNewService.getNewUpdates(date).subscribe((data) => {
          if (data.length > 0) {
            this.newUpdates = data;
            this.showPopup = true;
          }
        });
      }, 5000);
    }
  }

  ngOnDestroy(): void {
    // Emit a value to destroy$ when the component is destroyed.
    this.destroy$.next();
    this.destroy$.complete(); // Complete the subject to prevent memory leaks.
  }

  setCookie() {
    this.whatsNewService.setCookieCreationTime(this.cookieName);
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.nbDialogService.open(templateRef);
  }

  closePopup() {
    this.showPopup = false;
    this.destroy$.next();
    this.destroy$.complete();
  }
}
