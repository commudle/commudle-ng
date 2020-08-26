
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { CommunityGroupsService } from 'projects/commudle-admin/src/app/services/community-groups.service';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';
import { ActivatedRoute, Router } from '@angular/router';

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
    logo: [''],
    description: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private communityGroupsService: CommunityGroupsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      if (data.community_group_id) {
        this.getCommunityGroup(data.community_group_id);
      }
    });
  }

  getCommunityGroup(communityGroupId) {
    this.communityGroupsService.show(communityGroupId).subscribe(data => {
      this.communityGroup = data;
      this.communityGroupForm.patchValue({
        name: this.communityGroup.name,
        description: this.communityGroup.description
      });
    });
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

  removeLogo() {
    this.uploadedLogoImage = null;
    this.communityGroup.logo = null;
    this.uploadedLogoImageFile = null;
    this.communityGroupForm.get('logo').patchValue('');
  }


  createOrUpdateCommunityGroup() {
    const formData: any = new FormData();

    const communityGroupFormData = this.communityGroupForm.value;
    Object.keys(communityGroupFormData).forEach(
      key => (!(communityGroupFormData[key] == null) ? formData.append(`community_group[${key}]`, communityGroupFormData[key]) : '')
      );

    if (this.uploadedLogoImageFile) {
      formData.append('community_group[logo]', this.uploadedLogoImageFile);
    }
    if (!this.communityGroup) {

      this.communityGroupsService.create(formData).subscribe(
        data => {
          this.communityGroup = data;
          this.redirect();
        }
      );
    } else {
      this.communityGroupsService.update(this.communityGroup.slug, formData).subscribe(
        data => {
          this.communityGroup = data;
          this.redirect();
        }
      );
    }

  }

  redirect() {
    this.toastLogService.successDialog('Saved!');
    this.router.navigate(['/admin/orgs', this.communityGroup.slug]);
  }

}
