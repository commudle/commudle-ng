import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'commudle-accept-event-volunteer-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accept-event-volunteer-consent.component.html',
  styleUrls: ['./accept-event-volunteer-consent.component.scss'],
})
export class AcceptEventVolunteerConsentComponent implements OnInit {
  @Input() volunteerCommunityName;
  @Input() volunteerEventName;
  constructor() {}

  ngOnInit(): void {}
}
