import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'commudle-accept-join-channel-email-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accept-join-channel-email-consent.component.html',
  styleUrls: ['./accept-join-channel-email-consent.component.scss'],
})
export class AcceptJoinChannelEmailConsentComponent implements OnInit {
  @Input() communityNameEmail;
  @Input() channelNameEmail;
  constructor() {}

  ngOnInit(): void {}
}
