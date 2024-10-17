import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EDbModels, IHackathon } from '@commudle/shared-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-public-hackathon-channels',
  templateUrl: './public-hackathon-channels.component.html',
  styleUrls: ['./public-hackathon-channels.component.scss'],
})
export class PublicHackathonChannelsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  EDbModels = EDbModels;
  hackathon: IHackathon;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.hackathon = data.hackathon;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
