import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@commudle/theme';
import { faBullhorn, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeoService } from 'apps/shared-services/seo.service';
import { WhatsNewService } from 'apps/shared-services/whats-new.service';

@Component({
  selector: 'commudle-whats-new',
  standalone: true,
  imports: [CommonModule, NbCardModule, FontAwesomeModule],
  templateUrl: './whats-new.component.html',
  styleUrls: ['./whats-new.component.scss'],
})
export class WhatsNewComponent implements OnInit {
  showPopup = false;
  cookieCreationTime: string;
  lastUpdatedDate: string;
  updates = [];
  newUpdates;
  faBullhorn = faBullhorn;
  faXmark = faXmark;

  constructor(private whatsNewService: WhatsNewService, private seoService: SeoService) {}

  ngOnInit(): void {
    if (!this.whatsNewService.getCookieByName('last_update_seen') && !this.seoService.isBot) {
      this.updates.push(this.newUpdates);
      this.showPopup = true;
      this.cookieCreationTime = this.whatsNewService.setCookieCreationTime('last_update_seen');
    }

    if (this.whatsNewService.getCookieByName('last_update_seen') && !this.seoService.isBot) {
      this.cookieCreationTime = this.whatsNewService.getCookieByName('last_update_seen');
      if (this.lastUpdatedDate > this.cookieCreationTime && this.newUpdates) {
        this.updates.push(this.newUpdates);
        this.showPopup = true;
      }
      this.cookieCreationTime = this.whatsNewService.setCookieCreationTime('last_update_seen');
    }
  }

  closePopup() {
    this.showPopup = false;
  }
}
