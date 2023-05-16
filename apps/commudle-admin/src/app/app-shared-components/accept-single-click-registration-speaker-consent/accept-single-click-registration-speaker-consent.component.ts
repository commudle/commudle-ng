import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'commudle-accept-single-click-registration-speaker-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accept-single-click-registration-speaker-consent.component.html',
  styleUrls: ['./accept-single-click-registration-speaker-consent.component.scss'],
})
export class AcceptSingleClickRegistrationSpeakerConsentComponent implements OnInit {
  @Input() communityNameSpeaker;
  constructor() {}

  ngOnInit(): void {}
}
