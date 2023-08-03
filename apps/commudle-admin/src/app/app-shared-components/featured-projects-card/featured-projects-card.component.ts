import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule } from '@commudle/theme';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import * as moment from 'moment';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'commudle-featured-projects-card',
  standalone: true,
  templateUrl: './featured-projects-card.component.html',
  styleUrls: ['./featured-projects-card.component.scss'],
  imports: [CommonModule, NbCardModule, MiniUserProfileModule, SharedComponentsModule, NbButtonModule, RouterModule],
})
export class FeaturedProjectsCardComponent implements OnInit {
  @Input() featuredProject: IFeaturedItems;
  @Input() showTag = true;
  moment = moment;
  constructor() {}

  ngOnInit(): void {}
}
