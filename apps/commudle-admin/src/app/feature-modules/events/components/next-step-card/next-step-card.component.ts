import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'commudle-next-step-card',
  templateUrl: './next-step-card.component.html',
  styleUrls: ['./next-step-card.component.scss'],
})
export class NextStepCardComponent implements OnInit {
  @Input() routePath: string;
  @Input() headingText: string;
  @Input() subHeadingText: string;
  @Input() communitySlug: string;
  @Input() eventSlug: string;
  @Input() faIcon;
  @Input() nbIcon;
  @Input() buttonText = 'Setup Now';

  constructor() {}

  ngOnInit(): void {}
}
