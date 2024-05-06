import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbDialogService } from '@commudle/theme';
import { faBullhorn, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeoService } from 'apps/shared-services/seo.service';
import { WhatsNewService } from 'apps/shared-services/whats-new.service';
import { WhatsNewCardComponent } from './whats-new-card/whats-new-card.component';
import { IWhatsNew } from 'apps/shared-models/whats-new.model';

@Component({
  selector: 'commudle-whats-new',
  standalone: true,
  templateUrl: './whats-new.component.html',
  styleUrls: ['./whats-new.component.scss'],
  imports: [CommonModule, NbCardModule, FontAwesomeModule, WhatsNewCardComponent, NbButtonModule],
})
export class WhatsNewComponent implements OnInit {
  showPopup = false;
  showDialogPopup = false;
  cookieCreationTime;
  lastUpdatedDate: string;
  newUpdates: IWhatsNew[];
  faBullhorn = faBullhorn;
  faXmark = faXmark;

  constructor(
    private whatsNewService: WhatsNewService,
    private seoService: SeoService,
    private nbDialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    if (!this.seoService.isBot) {
      setTimeout(() => {
        this.newUpdates = [];
        const currentDate = new Date();
        const formattedCurrentDate = new Date().toISOString();
        currentDate.setMonth(currentDate.getMonth() - 2);
        const formattedPastTime = currentDate.toISOString();
        const date = this.whatsNewService.getCookieByName('com-last-whats-new-seen')
          ? formattedCurrentDate
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

  setCookie() {
    this.whatsNewService.setCookieCreationTime('com-last-whats-new-seen');
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.nbDialogService.open(templateRef);
  }

  closePopup() {
    this.showPopup = false;
  }
}
