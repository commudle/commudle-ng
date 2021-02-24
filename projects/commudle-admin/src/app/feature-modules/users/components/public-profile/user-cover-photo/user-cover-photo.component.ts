import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {NbDialogRef, NbDialogService, NbToastrService} from '@nebular/theme';
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

  @Output() coverImageUpdate: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('editCoverImage') editCoverImage: TemplateRef<any>;

  editCoverImageDialog: NbDialogRef<any>;
  coverImageFormData: FormData;
  coverImage;

  constructor(
    private dialogService: NbDialogService,
    private appUsersService: AppUsersService,
    private toastrService: NbToastrService
  ) {
  }

  ngOnInit(): void {
  }

  onCoverImageDialogOpen(): void {
    // Open a window to edit the tags
    this.editCoverImageDialog = this.dialogService.open(
      this.editCoverImage, {
        closeOnBackdropClick: false,
        closeOnEsc: false
      }
    );
  }

  // Display the cover image below the input
  displayCoverImage(event: any): void {
    // Check if file has been selected
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // If file size is greater than 3 Mb then reject
      if (file.size > 3145728) {
        this.toastrService.show('Image should be less than 3 Mb', 'Error', {status: 'danger'});
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
  onCoverImageDialogSubmit(): void {
    // Update only if a image is selected
    if (this.coverImageFormData) {
      this.appUsersService.updateProfileBannerImage(this.coverImageFormData).subscribe(() => {
        this.toastrService.show('Your cover image has been updated!', `Success!`, {status: 'success'});
        // TODO: Make this better
        // Reload the page to show the updated cover image
        // setTimeout(() => window.location.reload(), 1500);
        this.coverImageUpdate.emit();
        this.editCoverImageDialog.close();
      });
    }
  }
}
