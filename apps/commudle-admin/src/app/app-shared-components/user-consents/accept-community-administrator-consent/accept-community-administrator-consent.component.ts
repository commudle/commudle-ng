import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'commudle-accept-community-administrator-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accept-community-administrator-consent.component.html',
  styleUrls: ['./accept-community-administrator-consent.component.scss'],
})
export class AcceptCommunityAdministratorConsentComponent implements OnInit {
  @Input() parentName;
  constructor() {}

  ngOnInit(): void {}
}
