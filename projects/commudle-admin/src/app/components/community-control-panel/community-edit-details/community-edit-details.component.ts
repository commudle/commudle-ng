import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICommunity } from 'projects/shared-models/community.model';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from '../../../services/communities.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-community-edit-details',
  templateUrl: './community-edit-details.component.html',
  styleUrls: ['./community-edit-details.component.scss']
})
export class CommunityEditDetailsComponent implements OnInit {
  community: ICommunity;
  uploadedLogo: any;
  uploadedLogoFile: File;

  communityForm = this.fb.group({
    community: this.fb.group({
      id: [''],
      name: ['', Validators.required],
      about: [''],
      mini_description: [''],
      contact_email: ['', Validators.required],
      facebook: [''],
      twitter: [''],
      github: [''],
      website: [''],
      linkedin: [''],
    })
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private communitiesService: CommunitiesService,
    private toastLogService: LibToastLogService
  ) {
    this.communitiesService.getCommunityDetails(this.activatedRoute.snapshot.parent.params['name']).subscribe((data) => {
      this.community = data;
      this.communityForm.get('community').patchValue(this.community);
      this.uploadedLogo = this.community.logo_path;
    });
  }

  ngOnInit() {

  }


  displaySelectedLogo(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.uploadedLogoFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedLogo = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }


  updateCommunityDetails() {
    const formData: any = new FormData();
    const communityFormData = this.communityForm.get('community').value;
    Object.keys(communityFormData).forEach(
      key => (!(communityFormData[key] == null) ? formData.append(`community[${key}]`, communityFormData[key]) : '')
      );

    if (this.uploadedLogoFile != null) {
      formData.append('community[logo_image]', this.uploadedLogoFile);
    }
    this.communitiesService.updateCommunity(formData, this.community.id).subscribe((community) => {
      this.toastLogService.successDialog('Updated!');
    });
  }

}
