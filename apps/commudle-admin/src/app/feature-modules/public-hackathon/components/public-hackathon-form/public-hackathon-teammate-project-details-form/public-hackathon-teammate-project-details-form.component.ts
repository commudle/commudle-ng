import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { IHackathonTrack } from 'apps/shared-models/hackathon-track.model';
import { IHackathon } from 'apps/shared-models/hackathon.model';

@Component({
  selector: 'commudle-public-hackathon-teammate-project-details-form',
  templateUrl: './public-hackathon-teammate-project-details-form.component.html',
  styleUrls: ['./public-hackathon-teammate-project-details-form.component.scss'],
})
export class PublicHackathonTeammateProjectDetailsFormComponent implements OnInit {
  @Input() hackathon: IHackathon;
  @Output() createOrUpdateProjectDetails = new EventEmitter<any>();

  hackathonTracks: IHackathonTrack[];
  hackathonProjectDetailsForm: FormGroup;

  constructor(private hackathonService: HackathonService, private fb: FormBuilder) {
    this.hackathonProjectDetailsForm = this.fb.group({
      hackathon_track_id: ['', Validators.required],
      project_description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchHackathonTracks();
  }

  fetchHackathonTracks() {
    this.hackathonService.pIndexHackathonTracks(this.hackathon.id).subscribe((data: IHackathonTrack[]) => {
      this.hackathonTracks = data;
    });
  }

  submitProjectDetails() {
    this.createOrUpdateProjectDetails.emit(this.hackathonProjectDetailsForm.value);
  }
}
