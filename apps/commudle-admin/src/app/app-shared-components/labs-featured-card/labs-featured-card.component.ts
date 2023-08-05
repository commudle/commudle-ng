import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule } from '@commudle/theme';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import * as moment from 'moment';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'commudle-labs-featured-card',
  standalone: true,
  templateUrl: './labs-featured-card.component.html',
  styleUrls: ['./labs-featured-card.component.scss'],
  imports: [CommonModule, NbCardModule, MiniUserProfileModule, SharedComponentsModule, NbButtonModule, RouterModule],
})
export class LabsFeaturedCardComponent implements OnInit {
  @Input() featuredItem: IFeaturedItems;
  moment = moment;
  constructor() {}

  ngOnInit(): void {
    console.log(this.featuredItem);
  }
}
