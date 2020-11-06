import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbWindowService } from '@nebular/theme';
import { ICommunity } from 'projects/shared-models/community.model';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';
import { CommunityChannelDiscussionComponent } from '../community-channel-discussion/community-channel-discussion.component';

@Component({
  selector: 'app-community-channel-form',
  templateUrl: './community-channel-form.component.html',
  styleUrls: ['./community-channel-form.component.scss']
})
export class CommunityChannelFormComponent implements OnInit, OnDestroy {
  @ViewChild('formTemplate', {static: true}) formTemplate: TemplateRef<any>;
  subscriptions = [];
  community: ICommunity;
  dialogRef;

  // community channel form
  communityChannelForm = this.fb.group({
    kommunity_id: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    group_name: ['', Validators.required],
    is_private: [false, Validators.required]
  });

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private windowService: NbWindowService
  ) { }

  ngOnInit() {
    // get the selected community
    this.communityChannelManagerService.selectedCommunity$.subscribe(
      data => {
        this.community = data;
      }
    );

    // get the channel category name (optional)
    this.activatedRoute.queryParams.subscribe(
      data => {
        if (data.community_channel_group) {

        }
      }
    );
    this.openForm();
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }



  openForm() {
    this.dialogRef = this.dialogService.open(this.formTemplate, {}).onClose.subscribe(() => {
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    });
  }

  closeForm() {
    this.dialogRef.close();
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

}
