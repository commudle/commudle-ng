import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ICurrentUser, IUser } from '@commudle/shared-models';
import { AppUsersService, LibAuthwatchService } from '@commudle/shared-services';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'commudle-user-cover-photo',
  templateUrl: './user-cover-photo.component.html',
  styleUrls: ['./user-cover-photo.component.scss'],
})
export class UserCoverPhotoComponent implements OnInit {
  @Input() user: IUser;

  @Output() coverImageUpdate: EventEmitter<any> = new EventEmitter<any>();

  currentUser: ICurrentUser;
  editCoverImageDialog: NbDialogRef<any>;
  coverImageFormData: FormData;
  coverImage;

  @ViewChild('editCoverImage') editCoverImage: TemplateRef<any>;

  constructor(
    private authWatchService: LibAuthwatchService,
    private dialogService: NbDialogService,
    private appUsersService: AppUsersService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data));
  }

  onCoverImageDialogOpen(): void {
    // Open a window to edit the tags
    this.editCoverImageDialog = this.dialogService.open(this.editCoverImage, {
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }

  // Display the cover image below the input
  displayCoverImage(event: any): void {
    // Check if file has been selected
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // If file size is greater than 3 Mb then reject
      if (file.size > 3145728) {
        this.toastrService.show('Image should be less than 3 Mb', 'Error', { status: 'danger' });
        return;
      }
      // Create a new FormData
      this.coverImageFormData = new FormData();
      this.coverImageFormData.append('profile_banner_image', file);
      // Show the image as soon as it is selected
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => (this.coverImage = reader.result);
    }
  }

  // Function to submit the cover image form
  onCoverImageDialogSubmit(): void {
    // Update only if an image is selected
    if (this.coverImageFormData) {
      this.appUsersService.updateProfileBannerImage(this.coverImageFormData).subscribe(() => {
        this.toastrService.show('Your cover image has been updated!', `Success!`, { status: 'success' });
        // Event emitter to update cover photo
        this.coverImageUpdate.emit();
        this.editCoverImageDialog.close();
      });
    }
  }
}
