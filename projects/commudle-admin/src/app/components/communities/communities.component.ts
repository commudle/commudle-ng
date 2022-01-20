import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss'],
})
export class CommunitiesComponent implements OnInit {
  constructor(private title: Title, private meta: Meta, private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setTags(
      'All Communities',
      'Find a community you want to join, network & learn with software developers and build recognition with your "Developer Profile" as you contribute to communities.',
      'https://commudle.com/assets/images/commudle-logo192.png'
    );
  }
}
