import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from 'projects/shared-helper-modules/custom-validators.validator';
import { IAttachedFile } from 'projects/shared-models/attached-file.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-send-message-form',
  templateUrl: './send-message-form.component.html',
  styleUrls: ['./send-message-form.component.scss']
})
export class SendMessageFormComponent implements OnInit, AfterViewInit {
  @ViewChild('inputElement', {static: true}) inputElement: ElementRef;
  @ViewChild('fileInput', {static: true})  fileInput: ElementRef;

  @Input() disabled: boolean;
  @Input() attachmentDisplay = 'top';
  @Output() sendMessage = new EventEmitter();
  @Output() sendAttachmentMessage = new EventEmitter();

  uploadedAttachementFiles: IAttachedFile[] = [];
  uploadedFiles = [];

  sendUserMessageForm = this.fb.group({
    content: [
      '', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200),
          NoWhitespaceValidator
        ]
      ]
  });


  constructor(
    private fb: FormBuilder,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.inputElement.nativeElement.focus();
  }

  emitMessage() {
    if (this.uploadedFiles.length > 0) {
      this.emitAttachmentMessage();
    } else {
      this.emitTextMessage();
    }
    this.sendUserMessageForm.reset();
    this.uploadedAttachementFiles = [];
    this.uploadedFiles = [];
    this.fileInput.nativeElement.value = '';
  }


  emitTextMessage() {
    this.sendMessage.emit(this.sendUserMessageForm.value);
  }


  emitAttachmentMessage() {
    const formData: any = new FormData();
    const userMessageFormValue = this.sendUserMessageForm.value;
    Object.keys(userMessageFormValue).forEach(
      key => {
        formData.append(`user_message[${key}]`, userMessageFormValue[key])
      }
      );


    for (let i = 0; i < this.uploadedAttachementFiles.length; i++) {
      Object.keys(this.uploadedAttachementFiles[i]).forEach(
        key => formData.append(`user_message[attachments][][${key}]`, this.uploadedAttachementFiles[i][key])
        );
    }


    this.sendAttachmentMessage.emit(formData);
  }


  addFiles(event) {
    if (event.target.files && event.target.files.length > 0) {
      if (event.target.files.length > 5 || (event.target.files.length + this.uploadedFiles.length > 5) ) {
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
          type: null
        };
        this.uploadedAttachementFiles.push(imgFile);
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
    if (this.uploadedAttachementFiles[index]['id']) {
      this.uploadedAttachementFiles[index]['delete'] = true;
    } else {
      this.uploadedAttachementFiles.splice(index, 1);
      this.uploadedFiles.splice(index, 1);
    }
  }

}
