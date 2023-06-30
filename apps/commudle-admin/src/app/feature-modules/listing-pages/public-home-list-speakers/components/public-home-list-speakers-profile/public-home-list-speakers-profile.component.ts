import { Component, OnInit } from '@angular/core';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'commudle-public-home-list-speakers-profile',
  templateUrl: './public-home-list-speakers-profile.component.html',
  styleUrls: ['./public-home-list-speakers-profile.component.scss'],
})
export class PublicHomeListSpeakersProfileComponent implements OnInit {
  speakers: IUser[] = [];

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.getSpeakersList();
  }

  getSpeakersList() {
    this.eventsService.getSpeakersList().subscribe((data) => {
      this.speakers = this.speakers.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
    });
  }
}
