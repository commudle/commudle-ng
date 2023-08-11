import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule } from '@commudle/theme';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import * as moment from 'moment';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'commudle-labs-featured-card',
  standalone: true,
  imports: [
    CommonModule,
    NbCardModule,
    MiniUserProfileModule,
    SharedComponentsModule,
    NbButtonModule,
    RouterModule,
    FontAwesomeModule,
  ],
  templateUrl: './labs-featured-card.component.html',
  styleUrls: ['./labs-featured-card.component.scss'],
})
export class LabsFeaturedCardComponent implements OnInit {
  @Input() featuredItem: IFeaturedItems;
  moment = moment;
  faMessage = faMessage;
  faHeart = faHeart;
  constructor() {}

  ngOnInit(): void {}
}
