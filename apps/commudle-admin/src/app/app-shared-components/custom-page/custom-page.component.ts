import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from '@commudle/shared-services';
import { NbDialogService } from '@commudle/theme';
import { CustomPageService } from 'apps/commudle-admin/src/app/services/custom-page.service';
import { ICustomPage } from 'apps/shared-models/custom-page.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss'],
})
export class CustomPageComponent implements OnInit {
  @Input() parentId: number | string;
  @Input() parentType: 'CommunityGroup' | 'Kommunity';
  subscription: Subscription[] = [];
  pages: ICustomPage[];

  constructor(
    private customPageService: CustomPageService,
    private toastrService: ToastrService,
    private dialogService: NbDialogService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getCustomPages();
  }

  getCustomPages() {
    this.subscription.push(
      this.customPageService.getIndex(this.parentId, this.parentType).subscribe((data) => {
        this.pages = data;
      }),
    );
  }

  togglePublished(id, index) {
    this.customPageService.togglePublished(!this.pages[index].published, id).subscribe((data) => {
      this.pages[index] = data;
    });
  }

  openConfirmDialogBox(dialog: TemplateRef<any>, id, index) {
    this.dialogService.open(dialog, { context: { id, index } });
  }

  destroy(id, index) {
    this.customPageService.destroy(id).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Deleted Successfully');
        this.pages.splice(index, 1);
      }
    });
  }

  redirectTo(slug) {
    let redirectUrl = '';
    if (this.parentType === 'Kommunity') {
      redirectUrl = '/communities/' + this.parentId + '/p/' + slug;
    }
    if (this.parentType === 'CommunityGroup') {
      redirectUrl = '/orgs/' + this.parentId + '/p/' + slug;
    }
    const url = this.router.serializeUrl(this.router.createUrlTree([redirectUrl]));
    window.open(url, '_blank');
  }
}
