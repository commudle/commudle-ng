import { Component, OnInit } from '@angular/core';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss'],
})
export class CommunitiesComponent implements OnInit {
  constructor(private seoService : SeoService) {}

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.seoService.setTags(
      'Communities & Experts', 
      'Find the Developer Communities you want to join, or build your own! Grow your Developer network.',
      'https://commudle.com/assets/images/commudle-logo192.png'
    );
  }
}
