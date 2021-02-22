import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NbToastrService, NbWindowRef, NbWindowService} from '@nebular/theme';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {IUser} from 'projects/shared-models/user.model';

@Component({
  selector: 'app-user-cover-photo',
  templateUrl: './user-cover-photo.component.html',
  styleUrls: ['./user-cover-photo.component.scss']
})
export class UserCoverPhotoComponent implements OnInit {

  @Input() user: IUser;
  @Input() currentUser: ICurrentUser;

  @ViewChild('editCoverPhoto') editCoverPhoto: TemplateRef<any>;
  editCoverPhotoWindow: NbWindowRef;
  coverImageFormData: FormData;
  coverImage;

  constructor(
    private windowService: NbWindowService,
    private appUsersService: AppUsersService,
    private toastrService: NbToastrService
  ) {
  }

  ngOnInit(): void {
  }

  onCoverImageWindowOpen(): void {
    // Open a window to edit the tags
    this.editCoverPhotoWindow = this.windowService.open(
      this.editCoverPhoto,
      {
        title: 'Edit Cover Photo',
        closeOnBackdropClick: false,
        closeOnEsc: false
      },
    );
  }

  // Display the cover image below the input
  displayCoverImage(event: any): void {
    // Check if file has been selected
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // If file size is greater than 2 Mb then reject
      if (file.size > 2425190) {
        this.toastrService.show('Image should be less than 2 Mb', 'Error', {status: 'danger'});
        return;
      }
      // Create a new FormData
      this.coverImageFormData = new FormData();
      this.coverImageFormData.append('profile_banner_image', file);
      // Show the image as soon as it is selected
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => this.coverImage = reader.result;
    }
  }

  // Function to submit the cover image form
  onCoverImageWindowSubmit(): void {
    // Update only if a image is selected
    if (this.coverImageFormData) {
      this.appUsersService.updateProfileBannerImage(this.coverImageFormData).subscribe(() => {
        this.toastrService.show('Your cover image has been updated!', `Success!`, {status: 'success'});
        // TODO: Make this better
        // Reload the page to show the updated cover image
        setTimeout(() => window.location.reload(), 1500);
      });
    }
  }
}
