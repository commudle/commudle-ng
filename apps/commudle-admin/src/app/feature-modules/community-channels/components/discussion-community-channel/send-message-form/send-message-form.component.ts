import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IAttachedFile, ICommunityChannel, IUserMessage } from '@commudle/shared-models';
import { LibToastLogService } from '@commudle/shared-services';
import { NoWhitespaceValidator } from '@commudle/shared-validators';
import { CommunityChannelManagerService } from '../../../services/community-channel-manager.service';
import { CommunityChannelsService } from '../../../services/community-channels.service';

@Component({
  selector: 'commudle-send-message-form',
  templateUrl: './send-message-form.component.html',
  styleUrls: ['./send-message-form.component.scss'],
})
export class SendMessageFormComponent implements OnInit, AfterViewInit {
  @ViewChild('inputElement', { static: true }) inputElement: ElementRef;
  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;
  @Input() disabled: boolean;
  @Input() rows: number;
  @Input() attachmentDisplay = 'top';
  @Input() editableMessage: IUserMessage;
  @Output() sendMessage = new EventEmitter();
  @Output() sendAttachmentMessage = new EventEmitter();
  @Output() sendUpdatedTextMessage = new EventEmitter();
  @Output() sendUpdatedAttachmentMessage = new EventEmitter();
  subscriptions = [];
  // taggableUsers: IUser[] = [];
  communityChannel: ICommunityChannel;

  existingAttachmentFiles: IAttachedFile[] = [];
  uploadedAttachmentFiles: IAttachedFile[] = [];
  uploadedFiles = [];
  showEmojiForm = false;
  showHelperText = false;

  sendUserMessageForm = this.fb.group({
    content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000), NoWhitespaceValidator]],
  });

  constructor(
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private communityChannelsService: CommunityChannelsService,
    private communityChannelManagerService: CommunityChannelManagerService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.communityChannelManagerService.selectedChannel$.subscribe((data) => {
        this.communityChannel = data;
      }),
    );
    if (this.editableMessage) {
      this.sendUserMessageForm.patchValue({
        content: this.editableMessage.content,
      });
      this.existingAttachmentFiles = this.editableMessage.attachments;
    }
  }

  ngAfterViewInit() {
    this.inputElement.nativeElement.focus();
  }

  showText() {
    this.showHelperText = true;
  }

  hideText() {
    this.showHelperText = false;
  }

  emitMessage(event) {
    if (!this.editableMessage) {
      if (this.sendUserMessageForm.valid && this.uploadedFiles.length > 0) {
        this.emitAttachmentMessage();
      } else if (this.uploadedFiles.length > 0) {
        this.emitAttachmentMessage();
      } else if (this.sendUserMessageForm.valid) {
        this.emitTextMessage();
      }
    } else {
      if (this.uploadedFiles.length > 0 || this.existingAttachmentFiles.length > 0) {
        this.emitUpdatedAttachmentMessage();
      }
      if (this.sendUserMessageForm.valid) {
        this.emitUpdatedTextMessage();
      }
    }

    event.preventDefault();
    this.sendUserMessageForm.reset();
    this.uploadedAttachmentFiles = [];
    this.uploadedFiles = [];
    this.fileInput.nativeElement.value = '';
  }

  emitTextMessage() {
    this.sendMessage.emit(this.sendUserMessageForm.value);
  }

  emitUpdatedTextMessage() {
    this.sendUpdatedTextMessage.emit(this.sendUserMessageForm.value);
  }

  emitAttachmentMessage() {
    const formData: any = new FormData();
    const userMessageFormValue = this.sendUserMessageForm.value;
    Object.keys(userMessageFormValue).forEach((key) => {
      formData.append(`user_message[${key}]`, userMessageFormValue[key]);
    });

    for (let i = 0; i < this.uploadedAttachmentFiles.length; i++) {
      Object.keys(this.uploadedAttachmentFiles[i]).forEach((key) =>
        formData.append(`user_message[attachments][][${key}]`, this.uploadedAttachmentFiles[i][key]),
      );
    }

    this.sendAttachmentMessage.emit(formData);
  }

  emitUpdatedAttachmentMessage() {
    const formData: any = new FormData();
    const userMessageFormValue = this.sendUserMessageForm.value;
    Object.keys(userMessageFormValue).forEach((key) => {
      formData.append(`user_message[${key}]`, userMessageFormValue[key]);
    });

    this.uploadedAttachmentFiles.push(...this.existingAttachmentFiles);

    for (let i = 0; i < this.uploadedAttachmentFiles.length; i++) {
      Object.keys(this.uploadedAttachmentFiles[i]).forEach((key) =>
        formData.append(`user_message[attachments][][${key}]`, this.uploadedAttachmentFiles[i][key]),
      );
    }

    this.sendUpdatedAttachmentMessage.emit(formData);
  }

  addFiles(event) {
    if (event.target.files && event.target.files.length > 0) {
      if (event.target.files.length > 5 || event.target.files.length + this.uploadedFiles.length > 5) {
        this.toastLogService.warningDialog('Max 5 files can be attached', 3000);
        return;
      }

      for (const file of event.target.files) {
        if (file.size > 12125950) {
          this.toastLogService.warningDialog('File should be less than 10 Mb', 3000);
          return;
        }
        const imgFile: IAttachedFile = {
          id: null,
          file: file,
          name: null,
          url: null,
          type: null,
        };
        this.uploadedAttachmentFiles.push(imgFile);
        const reader = new FileReader();
        // let rawData = new ArrayBuffer(12125950*4*5);
        reader.onload = (e: any) => {
          // rawData = e.target.result;
          this.uploadedFiles.push(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeFile(index) {
    if (this.uploadedAttachmentFiles[index]['id']) {
      this.uploadedAttachmentFiles[index]['delete'] = true;
    } else {
      this.uploadedAttachmentFiles.splice(index, 1);
      this.uploadedFiles.splice(index, 1);
    }
  }

  removeExistingFile(index: number) {
    this.existingAttachmentFiles[index]['delete'] = true;
  }

  selectInput() {
    this.showEmojiForm = false;
  }

  toggleEmojiForm() {
    this.showEmojiForm = !this.showEmojiForm;
  }

  selectEmoji(event) {
    const currentValue = this.sendUserMessageForm.get('content').value || '';
    this.sendUserMessageForm.patchValue({
      content: currentValue.concat(`${event.emoji.native}`),
    });
    this.inputElement.nativeElement.focus();
  }

  // getTaggableUsers(query) {
  //   this.communityChannelsService.getTaggableUsers(query, this.communityChannel.id).subscribe(
  //     data => {
  //       this.taggableUsers = data.users;
  //     }
  //   )
  // }
}
