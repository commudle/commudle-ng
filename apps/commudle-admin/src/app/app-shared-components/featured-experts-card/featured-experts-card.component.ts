import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@commudle/theme';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { IUser } from '@commudle/shared-models';

@Component({
  selector: 'commudle-featured-experts-card',
  standalone: true,
  imports: [CommonModule, NbCardModule],
  templateUrl: './featured-experts-card.component.html',
  styleUrls: ['./featured-experts-card.component.scss'],
})
export class FeaturedExpertsCardComponent implements OnInit {
  @Input() expert: IUser;
  staticAssets = staticAssets;
  constructor() {}

  ngOnInit(): void {
    console.log(this.expert);
  }
}
