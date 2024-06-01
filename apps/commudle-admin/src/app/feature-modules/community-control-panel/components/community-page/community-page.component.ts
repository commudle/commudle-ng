import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EDbModels } from '@commudle/shared-models';

@Component({
  selector: 'commudle-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss'],
})
export class CommunityPageComponent implements OnInit {
  parentId: number;
  EDbModels = EDbModels;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.parentId = this.activatedRoute.parent.parent.snapshot.params.community_id;
  }
}
