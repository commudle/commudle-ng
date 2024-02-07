import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@commudle/theme';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { IUser } from '@commudle/shared-models';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'commudle-featured-experts-card',
  standalone: true,
  templateUrl: './featured-experts-card.component.html',
  styleUrls: ['./featured-experts-card.component.scss'],
  imports: [CommonModule, RouterModule, NbCardModule, MiniUserProfileModule],
})
export class FeaturedExpertsCardComponent implements OnInit {
  @Input() expert: IUser;
  staticAssets = staticAssets;
  constructor() {}

  ngOnInit(): void {
    console.log(this.expert);
  }
}
