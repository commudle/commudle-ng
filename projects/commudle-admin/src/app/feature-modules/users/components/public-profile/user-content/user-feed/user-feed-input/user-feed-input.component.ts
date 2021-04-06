import {Component, EventEmitter, OnInit, Output, TemplateRef} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';

@Component({
  selector: 'app-user-feed-input',
  templateUrl: './user-feed-input.component.html',
  styleUrls: ['./user-feed-input.component.scss']
})
export class UserFeedInputComponent implements OnInit {

  tags: string[] = [];
  imagePreviews = [];
  postData = this.fb.group({
    content: ['', [Validators.required, Validators.maxLength(800)]],
    images: this.fb.array([], Validators.maxLength(3)),
    tags: this.fb.array([], [Validators.required, Validators.maxLength(10)]),
  });

  @Output() createPost: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private appUsersService: AppUsersService,
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService
  ) {
  }

  ngOnInit(): void {
    // Subscribing to content changes in post
    this.postData.get('content').valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(changes => {
      this.postData.get('content').setValue(changes);
    });
  }

  getPostData(value: string): FormArray {
    return this.postData.get(value) as FormArray;
  };

  detectFiles(event): void {
    const files = event.target.files;
    if (files && files.length > 0 && files.length <= 3) {
      if (files.length > 3) {
        this.nbToastrService.warning('Maximum only 3 images are allowed!', 'Warning');
      } else {
        for (const file of files) {
          const reader = new FileReader();
          if (file.size > 2425190) {
            this.nbToastrService.warning('Image should be less than 2 Mb!', 'Warning');
          } else {
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.getPostData('images').push(this.fb.group({file}));
              this.imagePreviews.push(reader.result);
            }
          }
        }
      }
    }
  }

  onDialogOpen(ref: TemplateRef<any>): void {
    this.nbDialogService.open(ref);
  }

  onTagAdd(value: string): void {
    if (!this.tags.includes(value) && value !== '') {
      this.tags.push(value);
      this.getPostData('tags').push(this.fb.control(value));
    }
  }

  onTagDelete(value: string): void {
    const idx = this.tags.indexOf(value);
    this.getPostData('tags').removeAt(idx);
    this.tags.splice(idx, 1);
  }

  submitPost() {
    if (this.postData.valid) {
      this.appUsersService.createPost(this.postData.value).subscribe(value => {
        this.nbToastrService.success('Post created successfully!', 'Success');
        this.createPost.emit();
        // Reset all fields
        this.tags = [];
        this.imagePreviews = [];
        this.postData.reset();
      });
    }
  }

}
