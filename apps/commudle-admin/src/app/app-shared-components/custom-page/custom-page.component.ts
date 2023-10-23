import { Component, Input, OnInit, TemplateRef } from '@angular/core';
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
  @Input() parentId: number;
  @Input() parentType: 'CommunityGroup' | 'Kommunity';
  subscription: Subscription[] = [];
  pages: ICustomPage[];

  constructor(
    private customPageService: CustomPageService,
    private toastrService: ToastrService,
    private dialogService: NbDialogService,
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
}
