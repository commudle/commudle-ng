import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { GooglePlacesAutocompleteService } from 'apps/commudle-admin/src/app/services/google-places-autocomplete.service';

@Component({
  selector: 'app-community-edit-details',
  templateUrl: './community-edit-details.component.html',
  styleUrls: ['./community-edit-details.component.scss'],
})
export class CommunityEditDetailsComponent implements OnInit {
  community: ICommunity;
  uploadedLogo: any;
  uploadedBanner: any;
  uploadedLogoFile: File;
  uploadedBannerFile: File;
  tags: string[] = [];
  minimumTags = 5;

  @ViewChild('autocompleteInput', { static: true }) autocompleteInput: ElementRef;

  @Output() updateCommunity = new EventEmitter();

  communityForm;

  tinyMCE = {
    placeholder: 'Start typing here...*',
    min_height: 500,
    width: '650',
    menubar: false,
    convert_urls: false,
    plugins: [
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'code',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'code',
      'help',
      'wordcount',
    ],
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist outdent indent | removeformat | help',
    license_key: 'gpl',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private communitiesService: CommunitiesService,
    private toastLogService: LibToastLogService,
    private googlePlacesAutocompleteService: GooglePlacesAutocompleteService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.communityForm = this.fb.group({
      community: this.fb.group<unknown>({
        id: [''],
        name: ['', Validators.required],
        about: ['', Validators.required],
        mini_description: ['', Validators.required],
        contact_email: ['', Validators.required],
        facebook: [''],
        twitter: [''],
        github: [''],
        website: [''],
        linkedin: [''],
        location: ['', Validators.required],
      }),
    });
  }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe((params) => {
      this.getCommunityDetails(params.community_id);
    });
    this.initAutocomplete();
  }

  getCommunityDetails(communityId) {
    this.communitiesService.getCommunityDetails(communityId).subscribe((data) => {
      this.community = data;
      data.tags.forEach((value) => this.tags.push(value.name));
      this.updateCommunity.emit(this.community);
      this.communityForm.get('community').patchValue(this.community);
      this.uploadedLogo = this.community.logo_image.url;
      if (this.community.banner_image) {
        this.uploadedBanner = this.community.banner_image.url;
      }
    });
  }

  displaySelectedLogo(event: any) {
    if (event.target.files && event.target.files[0]) {
      const logoFile = event.target.files[0];
      this.uploadedLogoFile = logoFile;
      const reader = new FileReader();
      reader.onload = (e: any) => (this.uploadedLogo = reader.result);
      reader.readAsDataURL(logoFile);
    }
  }

  displaySelectedBanner(event: any) {
    if (event.target.files && event.target.files[0]) {
      const bannerFile = event.target.files[0];
      this.uploadedBannerFile = bannerFile;
      const reader = new FileReader();
      reader.onload = (e: any) => (this.uploadedBanner = reader.result);
      reader.readAsDataURL(bannerFile);
    }
  }

  updateCommunityDetails() {
    const formData: any = new FormData();
    const communityFormData = this.communityForm.get('community').value;

    Object.keys(communityFormData).forEach((key) =>
      !(communityFormData[key] == null) ? formData.append(`community[${key}]`, communityFormData[key]) : '',
    );

    if (this.uploadedLogoFile != null) {
      formData.append('community[logo_image]', this.uploadedLogoFile);
    }

    if (this.uploadedBannerFile != null) {
      formData.append('community[banner_image]', this.uploadedBannerFile);
    }

    if (this.tags.length > 0) {
      this.tags.forEach((value) => formData.append('community[tags][]', value));
    }

    this.communitiesService.updateCommunity(formData, this.community.id).subscribe((community) => {
      this.toastLogService.successDialog('Updated! Reloading the app for changes to apply...');
      this.document.location.reload();
    });
  }

  onTagAdd(value: string) {
    if (!this.tags.includes(value)) {
      const finalValue = value.trim();
      this.tags.push(finalValue);
    }
  }

  onTagDelete(value: string) {
    this.tags = this.tags.filter((tag) => tag !== value);
  }

  initAutocomplete() {
    this.googlePlacesAutocompleteService.initAutocomplete(this.autocompleteInput.nativeElement);
    this.googlePlacesAutocompleteService.placeChanged.subscribe((place: google.maps.places.PlaceResult) => {
      this.onLocationPlaceSelected(place);
    });
  }

  onLocationPlaceSelected(place: google.maps.places.PlaceResult) {
    this.communityForm.get('community').get('location').setValue(place.formatted_address);
  }
}
