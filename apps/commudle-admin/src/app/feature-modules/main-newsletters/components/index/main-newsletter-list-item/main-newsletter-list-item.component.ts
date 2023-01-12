import { EMainNewsletterStatuses, IMainNewsletter } from 'apps/shared-models/main-newsletter.model';
import { Component, Input, OnInit } from '@angular/core';
import { MainNewslettersService } from '../../../services/main-newsletters.service';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { NbDialogService } from '@commudle/theme';
import { MainNewsletterTestEmailerComponent } from '../../main-newsletter-test-emailer/main-newsletter-test-emailer.component';

@Component({
  selector: 'app-main-newsletter-list-item',
  templateUrl: './main-newsletter-list-item.component.html',
  styleUrls: ['./main-newsletter-list-item.component.scss']
})
export class MainNewsletterListItemComponent implements OnInit {
  @Input() newsletter: IMainNewsletter;
  EMainNewsletterStatuses = EMainNewsletterStatuses;
  showScheduler = false;

  constructor(
    private mainNewsLettersService: MainNewslettersService,
    private libToastLogService: LibToastLogService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
  }

  updateSchedule(data) {
    this.newsletter = data;
  }

  updateStatus(value) {
    this.mainNewsLettersService.updateStatus(this.newsletter.id, value).subscribe(
      data => {
        this.newsletter.status = value;
        this.libToastLogService.successDialog('Updated!');
      }
    )
  }

  sendTestEmail() {
    this.dialogService.open(MainNewsletterTestEmailerComponent, {context: {newsletter: this.newsletter}})
  }

}
