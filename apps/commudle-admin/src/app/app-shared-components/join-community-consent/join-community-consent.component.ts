import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'commudle-join-community-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './join-community-consent.component.html',
  styleUrls: ['./join-community-consent.component.scss'],
})
export class JoinCommunityConsentComponent implements OnInit {
  @Input() communitySlug: string;
  constructor() {}

  ngOnInit(): void {}
}
