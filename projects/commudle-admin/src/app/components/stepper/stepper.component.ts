import { Component, OnInit } from '@angular/core';
import { NbTagComponent, NbTagInputAddEvent } from '@nebular/theme';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { UserProfileManagerService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  tagsDialog: string[] = [];
  tags: string[] = [];
  maxTags = 5;

  validUsername = true;

  constructor(
    private authWatchService: LibAuthwatchService,
    private usersService: AppUsersService,
    private userProfileManagerService: UserProfileManagerService,
  ) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((currentUser) => {
      if (currentUser) {
        this.usersService.getProfile(currentUser.username).subscribe((data) => {
          if (data) {
            data.tags.forEach((tag) => this.tags.push(tag.name));
            this.tagsDialog = [];
            this.tags.forEach((tag) => this.tagsDialog.push(tag));
          }
        });
      }
    });
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

  submitStepOne() {
    //update username (not working correctly)
    //this.userProfileManagerService.setUpdateUsername(true);
    // Get the updated user tags
    this.tags = this.tagsDialog;
    // When the save button is clicked, update the tags
    this.usersService.updateTags({ tags: this.tags }).subscribe(() => {});
  }

  checkUsername(validUsername) {
    this.validUsername = validUsername;
  }
}
