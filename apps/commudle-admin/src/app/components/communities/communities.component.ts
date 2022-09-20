import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunitiesComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setTags(
      'Host & Build Your Own Thriving Dev Community',
      'Commudle is the best platform for dev communities and forums. Connect with more than 40,000 developers & their communities from diverse backgrounds who constantly share & learn and stay up to date. Sign up now!',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
