import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonTrack } from 'apps/shared-models/hackathon-track.model';
import { IHackathonUserResponse } from 'apps/shared-models/hackathon-user-response.model';
import { IHackathon } from 'apps/shared-models/hackathon.model';

@Component({
  selector: 'commudle-public-hackathon-project-details-form',
  templateUrl: './public-hackathon-project-details-form.component.html',
  styleUrls: ['./public-hackathon-project-details-form.component.scss'],
})
export class PublicHackathonProjectDetailsFormComponent implements OnInit {
  @Input() hackathon: IHackathon;
  @Input() hackathonUserResponse: IHackathonUserResponse;
  @Output() createOrUpdateProjectDetails = new EventEmitter<any>();

  hackathonTracks: IHackathonTrack[];
  hackathonProjectDetailsForm: FormGroup;

  constructor(private hackathonService: HackathonService, private fb: FormBuilder) {
    this.hackathonProjectDetailsForm = this.fb.group({
      hackathon_track_id: '',
      project_description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchHackathonTracks();
    if (
      this.hackathonUserResponse &&
      (this.hackathonUserResponse.track_id || this.hackathonUserResponse.project_description)
    ) {
      this.hackathonProjectDetailsForm.patchValue({
        hackathon_track_id: this.hackathonUserResponse.track_id,
        project_description: this.hackathonUserResponse.project_description,
      });
    }
  }

  fetchHackathonTracks() {
    this.hackathonService.pIndexHackathonTracks(this.hackathon.id).subscribe((data: IHackathonTrack[]) => {
      this.hackathonTracks = data;
      const hackathonTrackIdControl = this.hackathonProjectDetailsForm.get('hackathon_track_id');
      if (hackathonTrackIdControl && this.hackathonTracks.length > 0) {
        hackathonTrackIdControl.setValidators([Validators.required]);
      } else if (hackathonTrackIdControl) {
        hackathonTrackIdControl.clearValidators();
      }
      hackathonTrackIdControl.updateValueAndValidity();
    });
  }

  submitProjectDetails() {
    this.createOrUpdateProjectDetails.emit(this.hackathonProjectDetailsForm.value);
  }
}
