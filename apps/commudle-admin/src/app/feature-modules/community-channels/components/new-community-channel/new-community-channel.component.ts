import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef } from '@commudle/theme';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'commudle-new-community-channel',
  templateUrl: './new-community-channel.component.html',
  styleUrls: ['./new-community-channel.component.scss'],
})
export class NewCommunityChannelComponent implements OnInit, OnDestroy {
  @Input() groupName: string;
  @Input() discussionType: string;
  @Input() parentName: string; // example community or community group name

  constructor(private seoService: SeoService, private dialogRef: NbDialogRef<NewCommunityChannelComponent>) {}

  ngOnInit(): void {
    this.seoService.noIndex(true);
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }

  closeForm() {
    this.dialogRef.close();
  }
}
