import { EventSponsorsService } from './../../../../services/event-sponsors.service';
import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { IEvent } from '@commudle/shared-models';
import { NbWindowService } from '@nebular/theme';
import { IEventSponsor } from '@commudle/shared-models';
import { ISponsors } from '@commudle/shared-models';
import { ISponsor } from '@commudle/shared-models';
import { FormBuilder, Validators } from '@angular/forms';
import { LibToastLogService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {
  @ViewChild('sponsorFormTemplate') sponsorFormTemplate: TemplateRef<any>;

  @Input() event: IEvent;

  existingSponsors: ISponsor[] = [];
  sponsors: IEventSponsor[] = [];
  windowRef;

  sponsorForm = this.fb.group({
    logo: ['', Validators.required],
    name: ['', Validators.required],
    link: ['']
  });

  uploadedLogoImageFile: File;
  uploadedLogoImage;

  constructor(
    private windowService: NbWindowService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private eventSponsorsService: EventSponsorsService
  ) { }

  ngOnInit() {
    this.getAllSponsors();
    this.getPastSponsors();
  }

  getAllSponsors() {
    this.eventSponsorsService.index(this.event.slug).subscribe(data => {
      this.sponsors = data.event_sponsors;
    });
  }

  openForm() {
    this.windowRef = this.windowService.open(
      this.sponsorFormTemplate, {
        title: 'Add a Sponsor'
      }
    );
  }

  getPastSponsors() {
    this.eventSponsorsService.getExistingSponsors(this.event.slug).subscribe(
      data => {
        this.existingSponsors = data.sponsors;
      }
    );
  }

  addExistingSponsor(sponsorId) {
    this.eventSponsorsService.addExistingSponsor(this.event.slug, sponsorId).subscribe(
      data => {
        this.sponsors.push(data);
        this.windowRef.close();
        this.toastLogService.successDialog(`${data.sponsor.name} added`, 3000);
      }
    );
  }

  createSponsor() {
    const formData: any = new FormData();

    const sponsorFormData = this.sponsorForm.value;
    Object.keys(sponsorFormData).forEach(
      key => (!(sponsorFormData[key] == null) ? formData.append(`sponsor[${key}]`, sponsorFormData[key]) : '')
      );

    if (this.uploadedLogoImageFile) {
      formData.append('sponsor[logo]', this.uploadedLogoImageFile);
    }
    this.eventSponsorsService.create(this.event.slug, formData).subscribe(
      data => {
        this.sponsors.push(data);
        this.windowRef.close();
        this.removeLogo();
        this.sponsorForm.reset();
        this.toastLogService.successDialog(`${data.sponsor.name} added`, 3000);
      }
    );
  }

  removeSponsor(eventSponsorId, index) {
    this.eventSponsorsService.destroy(eventSponsorId).subscribe(
      data => {
        this.sponsors.splice(index, 1);
      }
    );
  }


  // form functionalities
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
    this.uploadedLogoImageFile = null;
    this.sponsorForm.get('logo').patchValue('');
  }

}
