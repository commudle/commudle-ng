import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ICommunity } from 'projects/shared-models/community.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-community-edit-details',
  templateUrl: './community-edit-details.component.html',
  styleUrls: ['./community-edit-details.component.scss']
})
export class CommunityEditDetailsComponent implements OnInit {
  community: ICommunity;

  communityForm = new FormGroup({
    name: new FormControl(this.community.name),
    logo_path: new FormControl(this.community.logo_path),
    about: new FormControl(this.community.about),
    mini_description: new FormControl(this.community.mini_description),
    contact_email: new FormControl(this.community.contact_email),
    facebook: new FormControl(this.community.facebook),
    twitter: new FormControl(this.community.twitter),
    github: new FormControl(this.community.github),
    website: new FormControl(this.community.website),
    linkedin: new FormControl(this.community.linkedin),
  });

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.parent.data.subscribe((data) => {
      this.community = data.community;
    });
  }

  ngOnInit() {
  }

}
