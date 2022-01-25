import { Component, OnInit } from '@angular/core';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-community-controls',
  templateUrl: './community-controls.component.html',
  styleUrls: ['./community-controls.component.scss'],
})
export class CommunityControlsComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setTitle('Admin: Community Controls');
  }
}
