import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  EEmbeddedVideoStreamSources,
  ICommunity,
  ICurrentUser,
  IEmbeddedVideoStream,
  IEvent,
} from '@commudle/shared-models';
import { EmbeddedVideoStreamsService, LibAuthwatchService, LibToastLogService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-event-embedded-video-stream',
  templateUrl: './event-embedded-video-stream.component.html',
  styleUrls: ['./event-embedded-video-stream.component.scss'],
})
export class EventEmbeddedVideoStreamComponent implements OnInit, OnDestroy {
  @Input() event: IEvent;
  @Input() community: ICommunity;

  EEmbeddedVideoStreamSources = EEmbeddedVideoStreamSources;
  evs = <IEmbeddedVideoStream>{};
  currentUser: ICurrentUser;

  embeddedVideoStreamForm = this.fb.group({
    streamable_type: ['', Validators.required],
    streamable_id: ['', Validators.required],
    source: ['', Validators.required],
    embed_code: ['', Validators.required],
    zoom_host_email: ['', Validators.email],
    zoom_password: [''],
    rtmp_url: ['', [this.validateRtmpUrl.bind(this)]],
  });

  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private embeddedVideoStreamsService: EmbeddedVideoStreamsService,
    private toastLogService: LibToastLogService,
    private authService: LibAuthwatchService,
  ) {}

  ngOnInit() {
    this.embeddedVideoStreamForm.patchValue({
      streamable_type: 'Event',
      streamable_id: this.event.id,
    });

    this.getEmbeddedVideoStream();

    this.subscription = this.authService.currentUser$.subscribe((data: ICurrentUser) => (this.currentUser = data));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  validateRtmpUrl(control) {
    const url: string = control.value;
    if (url?.startsWith('rtmp://') || url === '') {
      return null;
    } else {
      return { invalidUrl: true };
    }
  }

  getEmbeddedVideoStream() {
    this.embeddedVideoStreamsService.get(this.event.id).subscribe((data) => {
      if (data) {
        this.evs = data;
        this.embeddedVideoStreamForm.patchValue(data);
        this.updateValidators();
      }
    });
  }

  createOrUpdate() {
    this.embeddedVideoStreamsService.createOrUpdate(this.embeddedVideoStreamForm.value).subscribe((data) => {
      delete this.evs;
      // firing after 1 second because it doesn't update the value otherwise
      setTimeout(() => {
        this.evs = data;
      }, 100);
      this.embeddedVideoStreamForm.patchValue(data);
      this.updateValidators();
      this.toastLogService.successDialog('Saved!');
    });
  }

  updateValidators() {
    // remove the required validator from zoom attributes
    this.embeddedVideoStreamForm.get('zoom_host_email').clearValidators();
    this.embeddedVideoStreamForm.get('zoom_password').clearValidators();

    // add required validator to embed_code
    this.embeddedVideoStreamForm.get('embed_code').setValidators([Validators.required]);

    switch (this.embeddedVideoStreamForm.get('source').value) {
      case EEmbeddedVideoStreamSources.ZOOM:
        {
          this.embeddedVideoStreamForm.get('zoom_host_email').setValidators([Validators.required, Validators.email]);
          this.embeddedVideoStreamForm.get('zoom_password').setValidators(Validators.required);
        }
        break;
      case EEmbeddedVideoStreamSources.COMMUDLE:
        {
          this.embeddedVideoStreamForm.get('embed_code').clearValidators();
        }
        break;
    }

    this.embeddedVideoStreamForm.get('zoom_host_email').updateValueAndValidity();
    this.embeddedVideoStreamForm.get('zoom_password').updateValueAndValidity();
    this.embeddedVideoStreamForm.get('embed_code').updateValueAndValidity();
  }
}
