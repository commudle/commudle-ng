import { LibToastLogService } from './../../../../../../../shared-services/lib-toastlog.service';
import { ICommunityGroup } from './../../../../../../../shared-models/community-group.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-group-form',
  templateUrl: './community-group-form.component.html',
  styleUrls: ['./community-group-form.component.scss']
})
export class CommunityGroupFormComponent implements OnInit {

  communityGroup: ICommunityGroup;
  uploadedLogoImage;
  uploadedLogoImageFile: File;

  communityGroupForm = this.fb.group({
    name: ['', Validators.required],
    logo: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit() {
  }

  displaySelectedLogo(event: any) {

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 2425190) {
        this.toastLogService.warningDialog('Image should be less than 2 Mb', 3000);
        return;
      }
      this.uploadedLogoImageFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedLogoImage = reader.result;
      };
      reader.readAsDataURL(file);
    }

  }

  createOrUpdateCommunityGroup() {

  }

}
