import { Component, EventEmitter, OnChanges, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbTagComponent, NbTagInputAddEvent, NbToastrService } from '@commudle/theme';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { UserChatsService } from 'apps/commudle-admin/src/app/feature-modules/user-chats/services/user-chats.service';
import { UserProfileManagerService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { LibErrorHandlerService } from 'apps/lib-error-handler/src/lib/lib-error-handler.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IUser } from 'apps/shared-models/user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';

@Component({
  selector: 'app-user-basic-details',
  templateUrl: './user-basic-details.component.html',
  styleUrls: ['./user-basic-details.component.scss'],
})
export class UserBasicDetailsComponent implements OnInit, OnChanges {
  user: IUser;
  @Output() updateProfile: EventEmitter<any> = new EventEmitter<any>();

  currentUser: ICurrentUser;
  faExclamationTriangle = faExclamationTriangle;

  // The updated tags
  tagsDialog: string[] = [];
  // The original tags
  tags: string[] = [];
  hiring = false;

  environment = environment;
  queryParamIsHiring = false;

  editTagDialog: NbDialogRef<any>;

  hiringDialog: NbDialogRef<any>;
  enableHiringDialog: NbDialogRef<any>;

  disabled = false;

  @ViewChild('editTags') editTags: TemplateRef<any>;
  @ViewChild('hiringDialogBox') hiringDialogBox: TemplateRef<any>;
  @ViewChild('enableHiring', { static: true }) enableHiring: TemplateRef<any>;

  constructor(
    private authWatchService: LibAuthwatchService,
    private dialogService: NbDialogService,
    private appUsersService: AppUsersService,
    private userChatsService: UserChatsService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private userProfileManagerService: UserProfileManagerService,
    private errorHandler: LibErrorHandlerService,
  ) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data));
    this.userProfileManagerService.user$.subscribe((data: IUser) => {
      this.user = data;
      this.getUserTags();
    });
    if (this.route.snapshot.queryParams['hiring'] === 'true' && this.user) {
      this.queryParamIsHiring = true;
      if (!this.user.is_employer) {
        this.openEnableHiring();
      }
    }
  }

  openEnableHiring() {
    this.enableHiringDialog = this.dialogService.open(this.enableHiring, {
      closeOnEsc: false,
      closeOnBackdropClick: false,
    });
  }

  ngOnChanges() {
    this.userProfileManagerService.getProfile(this.user.username);
  }

  getUserTags() {
    this.tags = [];

    // Get already available tags of the user
    if (this.user) {
      this.user.tags.forEach((tag) => this.tags.push(tag.name));
    }
  }

  onTagDialogOpen(): void {
    // Boilerplate tags
    this.tagsDialog = [];
    this.tags.forEach((tag) => this.tagsDialog.push(tag));
    if (this.tagsDialog.length < 1) {
      this.tagsDialog.push('Commudle');
    }
    // Open a dialog to edit the tags
    this.editTagDialog = this.dialogService.open(this.editTags);
  }

  // Function to submit the tag form
  onTagDialogSubmit() {
    // Get the updated user tags
    this.tags = this.tagsDialog;
    // When the save button is clicked, update the tags
    this.appUsersService.updateTags({ tags: this.tags }).subscribe(() => {
      this.toastrService.show('Your tags have been updated!', `Success!`, { status: 'success' });
    });
    // Close the dialog
    this.editTagDialog.close();
    this.updateProfile.emit();
  }

  // Function to remove a tag
  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tagsDialog = this.tagsDialog.filter((tag) => tag !== tagToRemove.text);
  }

  // Function to add a tag
  onTagAdd({ value, input }: NbTagInputAddEvent): void {
    // Add a tag if the value is not empty and the number of tags is under the allowed limit
    if (value) {
      // Add a tag only if it is not present
      if (!this.tagsDialog.includes(value)) {
        this.tagsDialog.push(value);
      }
    }
    // Reset the input
    input.nativeElement.value = '';
  }

  restrictComma(event) {
    if (event.code === 'Comma') {
      event.preventDefault();
    }
  }

  // Open a chat with the particular user
  openChatWithUser(): void {
    this.userChatsService.changeFollowerId(this.user.id);
  }

  checkCurrentUser() {
    if (this.currentUser) {
      this.openChatWithUser();
    } else {
      this.errorHandler.handleError(401, 'Login to message');
    }
  }

  openForWork() {
    this.userProfileManagerService.toggleEmployee().subscribe(() => {
      if (this.user.is_employee) {
        this.redirectTo('resume');
      }
    });
  }

  openForHiring() {
    if (!this.user.is_employer) {
      this.userProfileManagerService.toggleEmployer().subscribe(() => {
        this.userProfileManagerService.getProfile(this.user.username);
        if (this.queryParamIsHiring) {
          this.enableHiringDialog.close();
          setTimeout(() => {
            this.router.navigate([], {
              fragment: 'jobs',
              queryParamsHandling: 'preserve',
            });
          }, 500);
        } else {
          setTimeout(() => {
            this.router.navigate([], {
              fragment: 'jobs',
              queryParams: { hiring: 'true' },
            });
          }, 500);
        }
      });
    } else if (this.user.is_employer) {
      this.hiringDialog = this.dialogService.open(this.hiringDialogBox, {
        closeOnEsc: false,
        closeOnBackdropClick: false,
      });
      this.user.is_employer = true;
    }
  }

  closeHiring() {
    this.userProfileManagerService.toggleEmployer().subscribe(() => {
      this.userProfileManagerService.getProfile(this.user.username);
    });
    this.hiringDialog.close();
  }

  redirectTo(fragment) {
    this.router.navigate([], { fragment: fragment });
  }
}
