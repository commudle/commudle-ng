import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICurrentUser, ILinkPreview, ISocialResource, IUser } from '@commudle/shared-models';
import { AppUsersService, LibAuthwatchService } from '@commudle/shared-services';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { UserProfileMenuService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-menu.service';
import { LinkPreviewService } from 'apps/commudle-admin/src/app/services/link-preview.service';
import { SocialResourceService } from 'apps/commudle-admin/src/app/services/social-resource.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'commudle-user-social',
  templateUrl: './user-social.component.html',
  styleUrls: ['./user-social.component.scss'],
})
export class UserSocialComponent implements OnInit, OnChanges, OnDestroy {
  @Input() user: IUser;

  currentUser: ICurrentUser;

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
    display_order: ['', Validators.required],
  });
  tags: string[] = [];
  urlPattern = new RegExp(
    '^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.][a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$',
  );

  @ViewChild('addLinkDialog') addLinkDialog: TemplateRef<any>;
  addLinkDialogRef: NbDialogRef<any>;

  subscriptions: Subscription[] = [];

  constructor(
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService,
    private fb: FormBuilder,
    private appUsersService: AppUsersService,
    private linkPreviewService: LinkPreviewService,
    private socialResourceService: SocialResourceService,
    private authWatchService: LibAuthwatchService,
    public userProfileMenuService: UserProfileMenuService,
  ) {}

  ngOnInit(): void {
    // Get logged in user
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));
    // Subscribe to search
    this.socialLinkChangedSubscription = this.socialLinkChanged.pipe(debounceTime(1000)).subscribe((value) => {
      if (!!this.urlPattern.test(value)) {
        this.invalidUrl = false;
        this.getLinkPreview(value.replace(/\s/g, ''));
      } else {
        this.invalidUrl = true;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) {
      this.getSocialResources();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
    this.socialLinkChangedSubscription.unsubscribe();
  }

  getSocialResources(): void {
    this.subscriptions.push(
      this.appUsersService.socialResources(this.user.username).subscribe((value) => {
        this.socialResources = value.social_resources;
        this.userProfileMenuService.addMenuItem('content', this.socialResources.length > 0);
      }),
    );
  }

  onOpenDialog(): void {
    this.addLinkDialogRef = this.nbDialogService.open(this.addLinkDialog, {
      closeOnBackdropClick: false,
      closeOnEsc: false,
      autoFocus: false,
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
      this.subscriptions.push(
        this.linkPreviewService.getPreview(url).subscribe((value) => {
          this.linkPreview = value;
          this.createForm(url);
          this.isLoading = false;
          this.showLinkPreview = true;
        }),
      );
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
        url: this.linkPreview.images[0],
      },
      display_order: this.socialResources.length,
    });
  }

  addTag(tag: string): void {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter((value) => value !== tag);
  }

  addSocialResource(): void {
    if (this.socialResourcesForm.valid && this.tags.length > 0) {
      this.subscriptions.push(
        this.socialResourceService.create(this.socialResourcesForm.value, this.tags).subscribe(() => {
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
        }),
      );
    } else {
      this.nbToastrService.danger('Error occurred while adding social resource!', 'Failed');
    }
  }

  deleteSocialResource(socialResourceId: number): void {
    this.subscriptions.push(
      this.socialResourceService.destroy(socialResourceId).subscribe(() => {
        this.nbToastrService.success('Social resource successfully removed!', 'Success');
        this.getSocialResources();
      }),
    );
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
        display_order: length - index - 1,
      });
    }
    this.subscriptions.push(
      this.socialResourceService.updateDisplayOrder(displayOrder).subscribe((value) => {
        if (value) {
          this.nbToastrService.success('Social resources order updated!', 'Success');
        } else {
          this.nbToastrService.danger('Social resources order not updated!', 'Failed');
        }
      }),
    );
  }
}
