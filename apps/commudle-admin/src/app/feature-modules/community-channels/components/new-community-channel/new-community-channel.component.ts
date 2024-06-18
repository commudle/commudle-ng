import { Component, Input } from '@angular/core';
import { ICommunity, ICommunityGroup, IHackathon } from '@commudle/shared-models';
import { CommunityChannelManagerService } from '@commudle/shared-services';
import { NbDialogRef } from '@commudle/theme';

@Component({
  selector: 'commudle-new-community-channel',
  templateUrl: './new-community-channel.component.html',
  styleUrls: ['./new-community-channel.component.scss'],
})
export class NewCommunityChannelComponent {
  @Input() groupName: string;
  @Input() discussionType: string;
  parent: ICommunity | ICommunityGroup | IHackathon;

  constructor(
    private dialogRef: NbDialogRef<NewCommunityChannelComponent>,
    private cmService: CommunityChannelManagerService,
  ) {
    this.getParent();
  }

  closeForm() {
    this.dialogRef.close();
  }

  getParent() {
    this.cmService.parent$.subscribe((data) => {
      this.parent = data;
    });
  }
}
