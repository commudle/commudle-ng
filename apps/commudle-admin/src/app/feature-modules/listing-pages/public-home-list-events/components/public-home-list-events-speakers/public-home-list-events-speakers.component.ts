import { Component, OnInit } from '@angular/core';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { HomeService } from 'apps/commudle-admin/src/app/services/home.service';
import { ILab } from 'apps/shared-models/lab.model';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'commudle-public-home-list-events-speakers',
  templateUrl: './public-home-list-events-speakers.component.html',
  styleUrls: ['./public-home-list-events-speakers.component.scss'],
})
export class PublicHomeListEventsSpeakersComponent implements OnInit {
  faMicrophone = faMicrophone;
  speakers: IUser[] = [];
  labs: ILab[] = [];
  constructor(private eventsService: EventsService, private homeService: HomeService) {}

  ngOnInit(): void {
    // this.getSpeakersList();
    this.getLabs();
  }

  getSpeakersList() {
    this.eventsService.getSpeakersList().subscribe((data) => {
      this.speakers = data;
      console.log(data, 'speakers');
      // this.changeDetectorRef.markForCheck();
    });
  }

  getLabs() {
    this.homeService.labs().subscribe((data) => (this.labs = data.labs));
  }
}
