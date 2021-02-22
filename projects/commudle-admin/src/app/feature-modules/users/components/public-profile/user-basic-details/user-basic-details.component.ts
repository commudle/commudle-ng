import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';
import {NbTagComponent, NbTagInputAddEvent, NbToastrService, NbWindowRef, NbWindowService} from '@nebular/theme';
import {IUser} from 'projects/shared-models/user.model';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {v4 as uuidv4} from 'uuid';
import {UserChatsService} from 'projects/commudle-admin/src/app/feature-modules/user-chats/services/user-chats.service';

@Component({
  selector: 'app-user-basic-details',
  templateUrl: './user-basic-details.component.html',
  styleUrls: ['./user-basic-details.component.scss']
})
export class UserBasicDetailsComponent implements OnInit {

  uuid = uuidv4();

  @Input() user: IUser;
  @Input() currentUser: ICurrentUser;

  @ViewChild('editTags') editTags: TemplateRef<any>;
  editTagWindow: NbWindowRef;
  tags: string[] = [];
  maxTags = 5;

  constructor(
    private windowService: NbWindowService,
    private appUsersService: AppUsersService,
    private userChatsService: UserChatsService,
    private toastrService: NbToastrService
  ) {
  }

  ngOnInit(): void {
    // Get already available tags of the user
    this.user.tags.forEach(tag => this.tags.push(tag.name));
  }

  onTagWindowOpen(): void {
    // Boilerplate tag
    if (this.tags.length < 1) {
      this.tags.push('Delete this');
    }

    // Open a window to edit the tags
    this.editTagWindow = this.windowService.open(
      this.editTags,
      {
        title: 'Edit Tags',
        closeOnBackdropClick: false,
        closeOnEsc: false
      },
    );
  }

  // Function to submit the tag form
  onTagWindowSubmit() {
    // When the save button is clicked, update the tags
    this.appUsersService.updateTags({tags: this.tags}).subscribe(() => {
      this.toastrService.show('Your tags have been updated!', `Success!`, {status: 'success'});
    });
    // Close the window
    this.editTagWindow.close();
  }

  // Function to remove a tag
  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags = this.tags.filter(tag => tag !== tagToRemove.text);
  }

  // Function to add a tag
  onTagAdd({value, input}: NbTagInputAddEvent): void {
    // Add a tag if the value is not empty and the number of tags is under the allowed limit
    if (value && this.tags.length < this.maxTags) {
      // Add a tag only if it is not present
      if (!this.tags.includes(value)) {
        this.tags.push(value);
      }
    }
    // Reset the input
    input.nativeElement.value = '';
  }

  // Open a chat with the particular user
  openChatWithUser(): void {
    this.userChatsService.changeFollowerId(this.user.id);
  }
}
