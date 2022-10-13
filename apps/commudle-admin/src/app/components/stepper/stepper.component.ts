import { Component, OnInit } from '@angular/core';
import { AppUsersService, LibAuthwatchService } from '@commudle/shared-services';
import { NbTagComponent, NbTagInputAddEvent } from '@nebular/theme';
import { UserProfileManagerService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
import { StepperService } from 'apps/commudle-admin/src/app/services/stepper.service';

@Component({
  selector: 'commudle-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  tagsDialog: string[] = [];
  tags: string[] = [];
  maxTags = 5;

  validUsername = true;
  validBasicDetailsStatus: boolean;
  validSocialLinksStatus: boolean;

  constructor(
    private authWatchService: LibAuthwatchService,
    private usersService: AppUsersService,
    private userProfileManagerService: UserProfileManagerService,
    private stepperService: StepperService,
  ) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((currentUser) => {
      if (currentUser) {
        this.usersService.getProfile(currentUser.username).subscribe((data) => {
          if (data) {
            if (this.tags.length != data.tags.length) {
              data.tags.forEach((tag) => this.tags.push(tag.name));
              this.tagsDialog = [];
              this.tags.forEach((tag) => this.tagsDialog.push(tag));
            }
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

  restrictComma(event) {
    if (event.code === 'Comma') {
      event.preventDefault();
    }
  }

  submitStepOne() {
    // Get the updated user tags
    this.tags = this.tagsDialog;
    // When the save button is clicked, update the tags
    this.usersService.updateTags({ tags: this.tags }).subscribe(() => {
      this.authWatchService.updateSignedInUser();
    });
    //update username
    this.userProfileManagerService.setUpdateUsername(true);
  }

  submitStepTwo() {
    this.userProfileManagerService.updateUserDetails(false);
  }

  submitStepThree() {
    this.userProfileManagerService.updateUserDetails(false);
  }

  checkUsername(validUsername) {
    this.validUsername = validUsername;
  }

  checkBasicDetailsValidity(status: boolean) {
    this.validBasicDetailsStatus = status;
  }

  checkSocialLinksValidity(status: boolean) {
    this.validSocialLinksStatus = status;
  }

  closeStepper() {
    this.stepperService.dialogRef.close();
  }
}
