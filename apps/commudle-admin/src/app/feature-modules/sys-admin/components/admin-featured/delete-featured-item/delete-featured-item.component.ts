import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@commudle/theme';
import { SysAdminFeaturedItemsService } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-featured-items.service';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';

@Component({
  selector: 'commudle-delete-featured-item',
  templateUrl: './delete-featured-item.component.html',
  styleUrls: ['./delete-featured-item.component.scss'],
})
export class DeleteFeaturedItemComponent implements OnInit {
  @Input() featuredItemId: number;
  constructor(
    private featuredService: SysAdminFeaturedItemsService,
    private libToastLogService: LibToastLogService,
    private dialogRef: NbDialogRef<any>,
  ) {}

  ngOnInit(): void {}

  deleteFeaturedCommunity(): void {
    this.featuredService.deleteFeaturedItems(this.featuredItemId).subscribe((value) => {
      if (value) {
        this.libToastLogService.successDialog('Deleted featured community successfully');
        this.close(value);
      }
    });
  }

  close(value?) {
    this.dialogRef.close(value);
  }
}
