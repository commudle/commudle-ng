import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'commudle-community-surveys',
  templateUrl: './community-surveys.component.html',
  styleUrls: ['./community-surveys.component.scss'],
})
export class CommunitySurveysComponent implements OnInit {
  parentId: number;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.parentId = this.activatedRoute.parent.parent.snapshot.params.community_id;
  }
}
