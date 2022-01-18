import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {IUser} from 'projects/shared-models/user.model';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';
import {ISocialResource} from 'projects/shared-models/social_resource.model';
import {Subject, Subscription} from 'rxjs';
import {NbDialogRef, NbDialogService, NbToastrService} from '@nebular/theme';
import {debounceTime} from 'rxjs/operators';
import {LinkPreviewService} from 'projects/commudle-admin/src/app/services/link-preview.service';
import {ILinkPreview} from 'projects/shared-models/link-preview.model';
import {FormBuilder, Validators} from '@angular/forms';
import {SocialResourceService} from 'projects/commudle-admin/src/app/services/social-resource.service';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-user-social',
  templateUrl: './user-social.component.html',
  styleUrls: ['./user-social.component.scss']
})
export class UserSocialComponent implements OnInit, OnDestroy {

  user: IUser;
  currentUser: ICurrentUser;
  subscriptions: Subscription[] = [];

  socialResources: ISocialResource[];
  isLoading = false;
  showLinkPreview = false;

  isEditing = false;
  invalidUrl = false;

  socialLink = '';
  socialLinkChanged: Subject<string> = new Subject<string>();
  socialLinkChangedSubscription: Subscription;

  linkPreview: ILinkPreview;
  socialResourcesForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    favicon: ['', Validators.required],
    link: ['', Validators.required],
    image: this.fb.group({
      url: ['', Validators.required],
    }),
    display_order: ['', Validators.required]
  });
  tags: string[] = [];
  urlPattern = new RegExp(
    '^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$'
    );



  @ViewChild('addLinkDialog') addLinkDialog: TemplateRef<any>;
  addLinkDialogRef: NbDialogRef<any>;

  constructor(
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService,
    private fb: FormBuilder,
    private appUsersService: AppUsersService,
    private linkPreviewService: LinkPreviewService,
    private socialResourceService: SocialResourceService,
    private authWatchService: LibAuthwatchService,
    private activatedRoute: ActivatedRoute,
    private seoService : SeoService
  ) {
  }

  ngOnInit(): void {

    this.subscriptions.push(this.activatedRoute.parent.params.subscribe(data => {
      // Get user's data
      this.getUserData();
    }));
    // Get logged in user
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe(data => this.currentUser = data));
    // Subscribe to search
    this.socialLinkChangedSubscription = this.socialLinkChanged.pipe(
      debounceTime(1000)
    ).subscribe(value => {
      if (!!this.urlPattern.test(value)) {
        this.invalidUrl = false;
        this.getLinkPreview(value.replace(/\s/g, ''));
      } else {
        this.invalidUrl = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
    this.socialLinkChangedSubscription.unsubscribe();
  }

  // Get user's data
  getUserData() {
    this.appUsersService.getProfile(this.activatedRoute.snapshot.parent.params.username).subscribe(data => {
      this.user = data;
      this.setMeta();
      // Get user's social resources
      this.getSocialResources();
    });
  }

  getSocialResources(): void {
    this.subscriptions.push(this.appUsersService.socialResources(this.user.username).subscribe(value => {
      this.socialResources = value.social_resources;
    }));
  }

  onOpenDialog(): void {
    this.addLinkDialogRef = this.nbDialogService.open(this.addLinkDialog, {
      closeOnBackdropClick: false,
      closeOnEsc: false,
      autoFocus: false
    });
  }

  onCloseDialog(): void {
    this.addLinkDialogRef.close();
    this.socialResourcesForm.reset();
    this.showLinkPreview = false;
    this.socialLink = '';
  }

  getLinkPreview(url: string): void {
    this.isLoading = true;
    if (url !== '') {
      this.linkPreviewService.getPreview(url).subscribe(value => {
        this.linkPreview = value;
        this.createForm(url);
        this.isLoading = false;
        this.showLinkPreview = true;
      });
    } else {
      this.socialResourcesForm.reset();
      this.showLinkPreview = false;
    }
  }

  createForm(url: string): void {
    this.socialResourcesForm.patchValue({
      title: this.linkPreview.title,
      description: this.linkPreview.description,
      favicon: this.linkPreview.favicon,
      link: url,
      image: {
        url: this.linkPreview.images[0]
      },
      display_order: this.socialResources.length
    });
  }

  addTag(tag: string): void {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter(value => value !== tag);
  }

  addSocialResource(): void {
    if (this.socialResourcesForm.valid && this.tags.length > 0) {
      this.socialResourceService.create(this.socialResourcesForm.value, this.tags).subscribe(value => {
        this.nbToastrService.success('Social resource successfully added!', 'Success');
        // Close dialog
        this.addLinkDialogRef.close();
        this.showLinkPreview = false;
        // Reset all fields
        this.socialResourcesForm.reset();
        this.socialResourcesForm.updateValueAndValidity();
        this.socialLink = '';
        this.tags = [];
        // Update the social resources
        this.getSocialResources();
      });
    } else {
      this.nbToastrService.danger('Error occurred while adding social resource!', 'Failed');
    }
  }

  deleteSocialResource(socialResourceId: number): void {
    this.socialResourceService.destroy(socialResourceId).subscribe(value => {
      this.nbToastrService.success('Social resource successfully removed!', 'Success');
      this.getSocialResources();
    });
  }

  toggleEditView() {
    if (!this.isEditing) {
      this.isEditing = true;
    } else {
      this.isEditing = false;
      this.updateDisplayOrder();
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.socialResources, event.previousIndex, event.currentIndex);
  }

  updateDisplayOrder() {
    const displayOrder = [];
    const length = this.socialResources.length;
    for (const [index, val] of this.socialResources.entries()) {
      displayOrder.push({
        id: val.id,
        display_order: length - index - 1
      });
    }
    this.socialResourceService.updateDisplayOrder(displayOrder).subscribe(value => {
      if (value) {
        this.nbToastrService.success('Social resources order updated!', 'Success');
      } else {
        this.nbToastrService.danger('Social resources order not updated!', 'Failed');
      }
    });
  }

  setMeta(): void {
    const titleText = `More links by @${this.user.username}`;
    this.seoService.setTitle(titleText);
    this.seoService.setTag('og:title', titleText);
    this.seoService.setTag('twitter:title', titleText);
  }



}
