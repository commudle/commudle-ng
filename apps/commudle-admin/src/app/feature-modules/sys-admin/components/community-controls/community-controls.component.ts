import { Component, OnInit } from '@angular/core';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-community-controls',
  templateUrl: './community-controls.component.html',
  styleUrls: ['./community-controls.component.scss'],
})
export class CommunityControlsComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setTitle('Admin: Community Controls');
  }
}
