import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'commudle-community-newsletter',
  templateUrl: './community-newsletter.component.html',
  styleUrls: ['./community-newsletter.component.scss'],
})
export class CommunityNewsletterComponent implements OnInit {
  parentId: string;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.parentId = this.activatedRoute.parent.parent.snapshot.params.community_id;
  }
}
