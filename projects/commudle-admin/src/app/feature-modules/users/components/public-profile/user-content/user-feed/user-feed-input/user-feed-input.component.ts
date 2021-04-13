import {Component, ElementRef, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
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

  imagePreviews = [];
  postData = this.fb.group({
    content: ['', [Validators.required, Validators.maxLength(800)]],
    images: this.fb.array([], Validators.maxLength(3)),
    tags: this.fb.array([], [Validators.required, Validators.maxLength(10)]),
  });
  limitRows = 4;
  messageLastScrollHeight: number;

  @Output() createPost: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('messageInput') private messageInput: ElementRef;

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
      this.postData.get('content').patchValue(changes);
      this.detectTags(this.postData.get('content').value);
    });
  }

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
              (this.postData.get('images') as FormArray).push(this.fb.group({file}));
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

  detectTags(content: string, removeTags: boolean = false) {
    const contentArray = content?.split(' ');
    const tags = contentArray?.filter(word => word.startsWith('#'));
    tags?.forEach(tag => (this.postData.get('tags') as FormArray).push(this.fb.control(tag)));
    if (removeTags) {
      return contentArray.filter(word => !tags.includes(word)).join(' ');
    }
  }

  submitPost() {
    if (this.postData.valid) {
      const formData = new FormData();
      const postDataValue = this.postData.value;

      // Add content
      formData.append('post[content]', this.detectTags(postDataValue.content, true));
      // Add tags
      [...new Set(postDataValue.tags)].forEach((tag: string) => {
        if (tag !== '') {
          formData.append('post[tags][]', tag.substring(1));
        }
      });
      // Add images
      postDataValue.images.forEach(image => formData.append('post[images][][file]', image.file));

      this.appUsersService.createPost(formData).subscribe(value => {
        this.nbToastrService.success('Post created successfully!', 'Success');
        this.createPost.emit();
        // Reset all fields
        this.imagePreviews = [];
        this.postData.reset();
        this.postData.updateValueAndValidity();
      });
    }
  }

  handleInputSize() {
    let rows = this.messageInput.nativeElement.getAttribute('rows');
    this.messageInput.nativeElement.setAttribute('rows', '1');

    if (rows < this.limitRows && this.messageInput.nativeElement.scrollHeight > this.messageLastScrollHeight) {
      rows++;
    } else if (rows > 1 && this.messageInput.nativeElement.scrollHeight < this.messageLastScrollHeight) {
      rows--;
    }

    this.messageLastScrollHeight = this.messageInput.nativeElement.scrollHeight;
    this.messageInput.nativeElement.setAttribute('rows', rows);
  }

}
