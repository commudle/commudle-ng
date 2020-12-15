import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchStringValidator } from 'projects/shared-helper-modules/custom-validators.validator';
import { CommunityChannelManagerService } from '../../../services/community-channel-manager.service';

@Component({
  selector: 'app-archive-channel',
  templateUrl: './archive-channel.component.html',
  styleUrls: ['./archive-channel.component.scss']
})
export class ArchiveChannelComponent implements OnInit {
  communityChannelId;

  deleteForm = this.fb.group({
    confirmation: ['', [Validators.required, MatchStringValidator('YES')]]
  });

  constructor(
    private fb: FormBuilder,
    private communityChannelManagerService: CommunityChannelManagerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(
      data => {
        this.communityChannelId = data.community_channel_id;
      }
    )
  }

  submitForm() {
    this.communityChannelManagerService.deleteChannel(this.communityChannelId);
    this.router.navigate([{outlets: {p: null}}], {relativeTo: this.activatedRoute.parent.parent});
  }

}
