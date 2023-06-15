import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule } from '@commudle/theme';
import { MiniUserProfileModule } from '../../../../../shared-modules/mini-user-profile/mini-user-profile.module';
import * as moment from 'moment';
import { SharedComponentsModule } from '../../../../../shared-components/shared-components.module';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';

@Component({
  selector: 'commudle-featured-projects-card',
  standalone: true,
  templateUrl: './featured-projects-card.component.html',
  styleUrls: ['./featured-projects-card.component.scss'],
  imports: [CommonModule, NbCardModule, MiniUserProfileModule, SharedComponentsModule, NbButtonModule],
})
export class FeaturedProjectsCardComponent implements OnInit {
  @Input() featuredProject: IFeaturedItems;
  moment = moment;
  constructor() {}

  ngOnInit(): void {}
}
