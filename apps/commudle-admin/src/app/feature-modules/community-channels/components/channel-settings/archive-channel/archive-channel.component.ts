import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchStringValidator } from 'apps/shared-helper-modules/custom-validators.validator';
import { CommunityChannelManagerService } from '../../../services/community-channel-manager.service';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';

@Component({
  selector: 'app-archive-channel',
  templateUrl: './archive-channel.component.html',
  styleUrls: ['./archive-channel.component.scss'],
})
export class ArchiveChannelComponent implements OnInit {
  @Input() communityChannelId;
  discussionType = EDiscussionType;

  deleteForm;

  constructor(
    private fb: FormBuilder,
    private communityChannelManagerService: CommunityChannelManagerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.deleteForm = this.fb.group({
      confirmation: ['', [Validators.required, MatchStringValidator('YES')]],
    });
  }

  ngOnInit(): void {}

  submitForm() {
    this.communityChannelManagerService.deleteChannel(this.communityChannelId, this.discussionType.CHANNEL);
    this.router.navigate([this.activatedRoute.parent.parent]);
  }
}
