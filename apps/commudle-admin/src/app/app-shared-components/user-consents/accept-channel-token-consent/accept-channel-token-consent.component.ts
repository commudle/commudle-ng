import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'commudle-accept-channel-token-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accept-channel-token-consent.component.html',
  styleUrls: ['./accept-channel-token-consent.component.scss'],
})
export class AcceptChannelTokenConsentComponent implements OnInit {
  @Input() communityNameToken;
  @Input() channelNameToken;
  constructor() {}

  ngOnInit(): void {}
}
