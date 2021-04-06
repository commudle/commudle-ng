import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-user-social',
  templateUrl: './user-social.component.html',
  styleUrls: ['./user-social.component.scss']
})
export class UserSocialComponent implements OnInit, OnDestroy {

  @Input() user: IUser;
  @Input() currentUser: ICurrentUser;

  subscriptions: Subscription[] = [];

  socialResources: ISocialResource[];
  isLoading = false;
  showLinkPreview = false;

  socialLink = '';
  socialLinkChanged: Subject<string> = new Subject<string>();
  socialLinkChangedSubscription: Subscription;

  linkPreview: ILinkPreview;
  socialResourcesForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    favicon: ['', Validators.required],
    link: ['', Validators.required],
    image: this.fb.group({
      url: ['', Validators.required],
    })
  });
  tags: string[] = [];
  urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

  @ViewChild('addLinkDialog') addLinkDialog: TemplateRef<any>;
  addLinkDialogRef: NbDialogRef<any>;

  constructor(
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService,
    private fb: FormBuilder,
    private appUsersService: AppUsersService,
    private linkPreviewService: LinkPreviewService,
    private socialResourceService: SocialResourceService
  ) {
  }

  ngOnInit(): void {
    // Get user's social resources
    this.getSocialResources();

    // Subscribe to search
    this.socialLinkChangedSubscription = this.socialLinkChanged.pipe(
      debounceTime(1000)
    ).subscribe(value => {
      if (!!this.urlPattern.test(value)) {
        this.getLinkPreview(value);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
    this.socialLinkChangedSubscription.unsubscribe();
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
      }
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
        this.addLinkDialogRef.close();
        this.socialResourcesForm.reset();
        this.socialLink = '';
        this.getSocialResources();
        this.showLinkPreview = false;
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

}
