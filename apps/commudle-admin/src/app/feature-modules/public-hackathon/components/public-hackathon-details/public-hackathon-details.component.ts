import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IHackathon } from 'apps/shared-models/hackathon.model';

@Component({
  selector: 'commudle-public-hackathon-details',
  templateUrl: './public-hackathon-details.component.html',
  styleUrls: ['./public-hackathon-details.component.scss'],
})
export class PublicHackathonDetailsComponent implements OnInit {
  hackathon: IHackathon;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // this.subscriptions.push(
    this.activatedRoute.parent.data.subscribe((data) => {
      this.hackathon = data.hackathon;
    });
    // );
  }
}
