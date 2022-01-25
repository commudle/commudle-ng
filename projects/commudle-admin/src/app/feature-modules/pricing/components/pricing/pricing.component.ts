import { Component, OnInit } from '@angular/core';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setTags(
      'Pricing & Features',
      'Plans for all Developer Communities, student, individual, non-profite and enterprise!',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
