import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule } from '@commudle/theme';
import { RouterModule } from '@angular/router';
import { IUser } from 'apps/shared-models/user.model';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';

@Component({
  selector: 'commudle-top-builders-card',
  standalone: true,
  templateUrl: './top-builders-card.component.html',
  styleUrls: ['./top-builders-card.component.scss'],
  imports: [CommonModule, NbCardModule, RouterModule, NbIconModule, MiniUserProfileModule, SharedPipesModule],
})
export class TopBuildersCardComponent implements OnInit {
  @Input() topBuilder: IUser;
  @Input() maxUserNameLength = 20;
  @Input() displayVotes = false;
  @Input() displayDesignation = false;
  @Input() showFollowButton = false;
  @Input() allignFollowButtonToRight = false;

  constructor() {}

  ngOnInit(): void {}
}
