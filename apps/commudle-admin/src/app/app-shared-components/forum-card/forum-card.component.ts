import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICommunity, ICommunityChannel } from '@commudle/shared-models';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { NbButtonModule, NbIconModule } from '@commudle/theme';

@Component({
  selector: 'commudle-forum-card',
  standalone: true,
  imports: [CommonModule, NbIconModule],
  templateUrl: './forum-card.component.html',
  styleUrls: ['./forum-card.component.scss'],
})
export class ForumCardComponent implements OnInit {
  @Input() forum: ICommunityChannel;
  @Input() horizontalScroll = false;
  constructor() {}

  ngOnInit(): void {}
}
