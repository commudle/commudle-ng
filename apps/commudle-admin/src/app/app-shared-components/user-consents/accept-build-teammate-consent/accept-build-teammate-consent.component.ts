import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'commudle-accept-build-teammate-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accept-build-teammate-consent.component.html',
  styleUrls: ['./accept-build-teammate-consent.component.scss'],
})
export class AcceptBuildTeammateConsentComponent implements OnInit {
  @Input() buildName: string;
  constructor() {}

  ngOnInit(): void {}
}
