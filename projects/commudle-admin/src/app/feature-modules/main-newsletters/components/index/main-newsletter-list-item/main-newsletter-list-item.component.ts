import { EMainNewsletterStatuses, IMainNewsletter } from 'projects/shared-models/main-newsletter.model';
import { Component, Input, OnInit } from '@angular/core';
import { MainNewslettersService } from '../../../services/main-newsletters.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-main-newsletter-list-item',
  templateUrl: './main-newsletter-list-item.component.html',
  styleUrls: ['./main-newsletter-list-item.component.scss']
})
export class MainNewsletterListItemComponent implements OnInit {
  @Input() newsletter: IMainNewsletter;
  EMainNewsletterStatuses = EMainNewsletterStatuses;

  constructor(
    private mainNewsLettersService: MainNewslettersService,
    private libToastLogService: LibToastLogService
  ) { }

  ngOnInit(): void {
  }


  updateStatus(value) {
    this.mainNewsLettersService.updateStatus(this.newsletter.id, value).subscribe(
      data => {
        this.newsletter.status = value;
        this.libToastLogService.successDialog('Updated!');
      }
    )
  }

}
