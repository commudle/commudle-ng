import {Component, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NbDialogRef, NbDialogService, NbTagComponent, NbTagInputAddEvent, NbToastrService} from '@nebular/theme';
import {IUser} from 'projects/shared-models/user.model';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';
import {UserChatsService} from 'projects/commudle-admin/src/app/feature-modules/user-chats/services/user-chats.service';

@Component({
  selector: 'app-user-basic-details',
  templateUrl: './user-basic-details.component.html',
  styleUrls: ['./user-basic-details.component.scss']
})
export class UserBasicDetailsComponent implements OnInit, OnChanges {

  @Input() user: IUser;
  @Input() currentUser: ICurrentUser;

  @Output() updateProfile: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('editTags') editTags: TemplateRef<any>;
  @ViewChild('editProfile') editProfile: TemplateRef<any>;

  editTagDialog: NbDialogRef<any>;
  editProfileDialog: NbDialogRef<any>;

  // About
  showFullAbout = false;

  // The updated tags
  tagsDialog: string[] = [];
  // The original tags
  tags: string[] = [];
  maxTags = 5;

  constructor(
    private dialogService: NbDialogService,
    private appUsersService: AppUsersService,
    private userChatsService: UserChatsService,
    private toastrService: NbToastrService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.getUserTags();
  }

  getUserTags() {
    this.tags = [];

    // Get already available tags of the user
    this.user.tags.forEach(tag => this.tags.push(tag.name));
  }

  onTagDialogOpen(): void {
    // Boilerplate tags
    this.tagsDialog = [];
    this.tags.forEach(tag => this.tagsDialog.push(tag));
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
    this.appUsersService.updateTags({tags: this.tags}).subscribe(() => {
      this.toastrService.show('Your tags have been updated!', `Success!`, {status: 'success'});
    });
    // Close the dialog
    this.editTagDialog.close();
  }

  // Function to remove a tag
  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tagsDialog = this.tagsDialog.filter(tag => tag !== tagToRemove.text);
  }

  // Function to add a tag
  onTagAdd({value, input}: NbTagInputAddEvent): void {
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

  // Open a chat with the particular user
  openChatWithUser(): void {
    this.userChatsService.changeFollowerId(this.user.id);
  }

  onEditProfileDialogOpen() {
    this.editProfileDialog = this.dialogService.open(this.editProfile, {hasScroll: true});
  }

  onUpdateProfile(ref: NbDialogRef<any>) {
    this.updateProfile.emit();
    ref.close();
  }

}
