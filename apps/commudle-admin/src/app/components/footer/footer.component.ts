import { Component, OnInit } from '@angular/core';
import { FooterService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  constructor(public footerService: FooterService) {}

  ngOnInit(): void {}
}
