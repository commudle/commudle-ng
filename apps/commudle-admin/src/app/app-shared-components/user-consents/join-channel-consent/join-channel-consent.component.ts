import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'commudle-join-channel-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './join-channel-consent.component.html',
  styleUrls: ['./join-channel-consent.component.scss'],
})
export class JoinChannelConsentComponent implements OnInit {
  @Input() communityName;
  @Input() channelName;
  constructor() {}

  ngOnInit(): void {}
}
