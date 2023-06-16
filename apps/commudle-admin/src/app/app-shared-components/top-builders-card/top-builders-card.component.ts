import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule } from '@commudle/theme';
import { RouterModule } from '@angular/router';
import { IUser } from 'apps/shared-models/user.model';
import { MiniUserProfileModule } from '../../../../../shared-modules/mini-user-profile/mini-user-profile.module';

@Component({
  selector: 'commudle-top-builders-card',
  standalone: true,
  templateUrl: './top-builders-card.component.html',
  styleUrls: ['./top-builders-card.component.scss'],
  imports: [CommonModule, NbCardModule, RouterModule, NbIconModule, MiniUserProfileModule],
})
export class TopBuildersCardComponent implements OnInit {
  @Input() topBuilder: IUser;
  @Input() displayVotes = false;
  @Input() displayDesignation = false;
  @Input() displayCommunityCount = false;
  @Input() displayViewProfile = false;
  @Input() showFollowButton = false;
  @Input() cardHeight: string;
  @Input() cardWidth: string;
  @Input() imageHeight: string;
  @Input() imageWidth: string;

  constructor() {}

  ngOnInit(): void {}
}
