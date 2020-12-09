import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ICommunity } from 'projects/shared-models/community.model';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';
import { CommunityChannelFormComponent } from '../community-channel-form/community-channel-form.component';

@Component({
  selector: 'app-new-community-channel',
  templateUrl: './new-community-channel.component.html',
  styleUrls: ['./new-community-channel.component.scss']
})
export class NewCommunityChannelComponent implements OnInit, OnDestroy {
  @ViewChild('newCommunityChannelFormTemplate', {static: true}) formTemplate: TemplateRef<any>;
  dialogRef;
  community: ICommunity;
  groupName;
  subscriptions = []

  constructor(
    private dialogService: NbDialogService,
    private communityChannelManagerService: CommunityChannelManagerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.communityChannelManagerService.selectedCommunity$.subscribe(
        data => {
          this.community = data;
        }
      )
    );

    this.subscriptions.push(
      // get the channel category name (optional)
      this.activatedRoute.queryParams.subscribe(
        data => {
          if (data.group_name) {
            this.groupName = data.group_name;
          }
        }
      )
    );

    this.openForm();
  }


  ngOnDestroy() {
    this.dialogRef.close();
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }


  openForm() {
    this.dialogRef = this.dialogService.open(this.formTemplate);
    this.dialogRef.onClose.subscribe(() => {
      this.router.navigate([{outlets: {p: null}}], {relativeTo: this.activatedRoute.parent});
    });
  }


  closeForm() {
    this.dialogRef.close();
  }

}
