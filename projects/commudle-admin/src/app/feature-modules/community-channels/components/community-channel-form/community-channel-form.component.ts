import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';

@Component({
  selector: 'app-community-channel-form',
  templateUrl: './community-channel-form.component.html',
  styleUrls: ['./community-channel-form.component.scss']
})
export class CommunityChannelFormComponent implements OnInit, OnDestroy {
  @ViewChild('formTemplate', {static: true}) formTemplate: TemplateRef<any>;
  subscriptions = [];
  community: ICommunity;
  existingChannel: ICommunityChannel;
  dialogRef;

  uploadedLogoImageFile: File;
  uploadedLogoImage;


  // community channel form
  communityChannelForm = this.fb.group({
    kommunity_id: ['', Validators.required],
    logo: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
    group_name: [''],
    is_private: [false, Validators.required]
  });

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit() {
    // get the selected community
    this.communityChannelManagerService.selectedCommunity$.subscribe(
      data => {
        this.community = data;
        this.communityChannelForm.patchValue({
          kommunity_id: this.community.slug
        });

      }
    );

    // get the channel category name (optional)
    this.activatedRoute.queryParams.subscribe(
      data => {
        if (data.community_channel_group) {

        }
      }
    );
    this.openForm();
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }



  openForm() {
    this.dialogRef = this.dialogService.open(this.formTemplate, {}).onClose.subscribe(() => {
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    });
  }

  closeForm() {
    this.dialogRef.close();
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }


  submitForm() {

  }

  createCommunityChannel() {

  }

  updateCommunityChannel() {

  }


  displaySelectedLogo(event: any) {

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);
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
    this.uploadedLogoImageFile = null;
    this.communityChannelForm.get('logo').patchValue('');

    // if we are editing the community channel here, then send a request to the server to remove the logo
  }

}
