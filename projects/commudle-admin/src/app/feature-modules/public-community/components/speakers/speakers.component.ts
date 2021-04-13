import { ActivatedRoute } from '@angular/router';
import { ICommunity } from './../../../../../../../shared-models/community.model';
import { IUser } from './../../../../../../../shared-models/user.model';
import { Component, OnInit } from '@angular/core';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.component.html',
  styleUrls: ['./speakers.component.scss']
})
export class SpeakersComponent implements OnInit {

  speakers: IUser[];
  community: ICommunity;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communitySpeakerService: CommunitiesService,

  ) { }



  ngOnInit(): void {
    this.activatedRoute.parent.data.subscribe(data => {
      this.community = data.community;
      if(this.community){
        this.getSpeakerDetails();
      }
    })
  }

  getSpeakerDetails(){
    this.communitySpeakerService.speakers(this.community.id).subscribe(
      data => {
        this.speakers = data.users;
      }
    );
  }
}
