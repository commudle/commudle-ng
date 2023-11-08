import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';
import { NewsletterService } from 'apps/commudle-admin/src/app/services/newsletter.service';
import { INewsletter } from 'apps/shared-models/newsletter.model';
import { Subscription } from 'rxjs';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'commudle-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements OnInit {
  @Input() parentId: string | number;
  @Input() parentType: 'CommunityGroup' | 'Kommunity';
  subscriptions: Subscription[] = [];
  newsletters: INewsletter[];
  faPlus = faPlus;
  constructor(
    private newsletterService: NewsletterService,
    private dialogService: NbDialogService,
    private toastrService: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getNewsletters();
  }

  getNewsletters() {
    this.subscriptions.push(
      this.newsletterService.getIndex(this.parentId, this.parentType).subscribe((data: INewsletter[]) => {
        this.newsletters = data;
      }),
    );
  }

  togglePublished(id, index) {}

  openConfirmDialogBox(dialog: TemplateRef<any>, id, index) {
    this.dialogService.open(dialog, { context: { id, index } });
  }

  destroy(id, index) {
    this.newsletterService.destroy(id).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Deleted Successfully');
        this.newsletters.splice(index, 1);
      }
    });
  }

  redirectTo(slug) {
    let redirectUrl = '';
    if (this.parentType === 'Kommunity') {
      redirectUrl = '/communities/' + this.parentId + '/' + slug;
    }
    if (this.parentType === 'CommunityGroup') {
      redirectUrl = '/orgs/' + this.parentId + '/' + slug;
    }
    const url = this.router.serializeUrl(this.router.createUrlTree([redirectUrl]));
    window.open(url, '_blank');
  }
}
