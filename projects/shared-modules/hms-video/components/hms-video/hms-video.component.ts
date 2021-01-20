import { Component, Input, OnInit } from '@angular/core';
import { EHmsStates, HmsVideoStateService } from '../../services/hms-video-state.service';

@Component({
  selector: 'app-hms-video',
  templateUrl: './hms-video.component.html',
  styleUrls: ['./hms-video.component.scss']
})
export class HmsVideoComponent implements OnInit {
  @Input() roomId: string;
  EHmsStates = EHmsStates;
  currentState: EHmsStates;

  constructor(
    private hmsVideoStateService: HmsVideoStateService
  ) { }

  ngOnInit(): void {
    // todo set this as per the user's role [webinar, or conference]
    this.hmsVideoStateService.setState(EHmsStates.PREVIEW)

    this.hmsVideoStateService.hmsState$.subscribe(
      data => this.currentState = data
    );
  }

}
