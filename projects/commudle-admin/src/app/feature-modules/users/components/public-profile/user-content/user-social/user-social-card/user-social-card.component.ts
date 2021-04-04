import {Component, Input, OnInit} from '@angular/core';
import {ISocialResource} from 'projects/shared-models/social_resource.model';

@Component({
  selector: 'app-user-social-card',
  templateUrl: './user-social-card.component.html',
  styleUrls: ['./user-social-card.component.scss']
})
export class UserSocialCardComponent implements OnInit {

  @Input() socialResource: ISocialResource;

  constructor() {
  }

  ngOnInit(): void {
  }

}
