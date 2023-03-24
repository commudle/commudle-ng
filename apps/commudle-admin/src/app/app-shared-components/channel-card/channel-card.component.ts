import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { RouterModule } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'commudle-channel-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.scss'],
})
export class ChannelCardComponent implements OnInit {
  @Input() channel: ICommunityChannel;
  constructor() {}

  ngOnInit(): void {}
}
