import { Component, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbTagComponent, NbTagInputAddEvent, NbToastrService } from '@nebular/theme';
import { UserChatsService } from 'projects/commudle-admin/src/app/feature-modules/user-chats/services/user-chats.service';
import { UserProfileManagerService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { environment } from 'projects/commudle-admin/src/environments/environment';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IUser } from 'projects/shared-models/user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';

@Component({
  selector: 'app-user-basic-details',
  templateUrl: './user-basic-details.component.html',
  styleUrls: ['./user-basic-details.component.scss'],
})
export class UserBasicDetailsComponent implements OnInit, OnChanges {
  @Input() user: IUser;

  users: IUser;
  @Output() updateProfile: EventEmitter<any> = new EventEmitter<any>();

  currentUser: ICurrentUser;

  // The updated tags
  tagsDialog: string[] = [];
  // The original tags
  tags: string[] = [];
  maxTags = 5;
  hiring: boolean = false;

  environment = environment;
  queryParamIsHiring: boolean = false;

  editTagDialog: NbDialogRef<any>;

  hiringDialog: NbDialogRef<any>;
  enableHiringDialog: NbDialogRef<any>;

  @ViewChild('editTags') editTags: TemplateRef<any>;
  @ViewChild('hiringDialogBox') hiringDialogBox: TemplateRef<any>;
  // @ViewChild('enableHiring') enableHiring: TemplateRef<any>;
  @ViewChild('enableHiring', { static: true }) enableHiring: TemplateRef<any>;

  constructor(
    private authWatchService: LibAuthwatchService,
    private dialogService: NbDialogService,
    private appUsersService: AppUsersService,
    private userChatsService: UserChatsService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private nbDialogService: NbDialogService,
    private userProfileManagerService: UserProfileManagerService,
  ) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data));
    this.userProfileManagerService.user$.subscribe((data: IUser) => {
      this.hiring = data.is_employer;
      this.users = data;
    });
    if (this.route.snapshot.queryParams['hiring'] === 'true') {
      this.queryParamIsHiring = true;
      if (!this.hiring) {
        this.openEnableHiring();
      }
    }
  }

  openEnableHiring() {
    this.enableHiringDialog = this.nbDialogService.open(this.enableHiring, {
      closeOnEsc: false,
      closeOnBackdropClick: false,
    });
  }

  ngOnChanges() {
    this.getUserTags();
    this.userProfileManagerService.getProfile(this.user.username);
  }

  getUserTags() {
    this.tags = [];

    // Get already available tags of the user
    this.user.tags.forEach((tag) => this.tags.push(tag.name));
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
    if (value && this.tagsDialog.length < this.maxTags) {
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

  openForWork() {
    this.userProfileManagerService.toggleEmployee().subscribe(() => {
      if (this.users.is_employee) {
        this.redirectTo('resume');
      }
    });
  }

  openForHiring() {
    if (!this.users.is_employer) {
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
    } else if (this.users.is_employer) {
      this.hiringDialog = this.nbDialogService.open(this.hiringDialogBox, {
        closeOnEsc: false,
        closeOnBackdropClick: false,
      });
      this.hiring = true;
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
