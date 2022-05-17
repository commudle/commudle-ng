import { Component, OnInit } from '@angular/core';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setTitle('Privacy Policy');
  }
}
