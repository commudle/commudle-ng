import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmbeddedVideoStreamsService } from 'apps/commudle-admin/src/app/services/embedded-video-streams.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IEmbeddedVideoStream } from 'apps/shared-models/embedded_video_stream.model';
import { EEmbeddedVideoStreamSources } from 'apps/shared-models/enums/embedded_video_stream_sources.enum';
import { IEvent } from 'apps/shared-models/event.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-embedded-video-stream',
  templateUrl: './event-embedded-video-stream.component.html',
  styleUrls: ['./event-embedded-video-stream.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventEmbeddedVideoStreamComponent implements OnInit, OnDestroy {
  @Input() event: IEvent;
  @Input() community: ICommunity;
  @Input() embeddedVideoStreamfromTrackSlot = false;
  @Input() embeddedFormData;
  @Output() embeddedVideoStream = new EventEmitter<IEmbeddedVideoStream>();

  EEmbeddedVideoStreamSources = EEmbeddedVideoStreamSources;
  evs = <IEmbeddedVideoStream>{};
  currentUser: ICurrentUser;

  embeddedVideoStreamForm;

  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private embeddedVideoStreamsService: EmbeddedVideoStreamsService,
    private toastLogService: LibToastLogService,
    private authService: LibAuthwatchService,
  ) {
    this.embeddedVideoStreamForm = this.fb.group({
      streamable_type: ['', Validators.required],
      streamable_id: [0, Validators.required],
      source: ['', Validators.required],
      embed_code: ['', Validators.required],
      zoom_host_email: ['', Validators.email],
      zoom_password: [''],
      rtmp_url: ['', [this.validateRtmpUrl.bind(this)]],
    });
  }

  ngOnInit() {
    if (!this.embeddedVideoStreamfromTrackSlot) {
      this.embeddedVideoStreamForm.patchValue({
        streamable_type: 'Event',
        streamable_id: this.event.id,
      });
    } else {
      if (this.embeddedFormData) {
        this.embeddedVideoStreamForm.patchValue({
          streamable_type: this.embeddedFormData.streamable_type,
          streamable_id: this.embeddedFormData.streamable_id,
          source: this.embeddedFormData.source,
          embed_code: this.embeddedFormData.embed_code,
          zoom_host_email: this.embeddedFormData.zoom_host_email,
          zoom_password: this.embeddedFormData.zoom_password,
        });
      } else {
        this.embeddedVideoStreamForm.patchValue({
          streamable_type: 'Event',
          streamable_id: this.event.id,
        });
      }
      this.updateValidators();
    }

    if (!this.embeddedVideoStreamfromTrackSlot) {
      this.getEmbeddedVideoStream();
    }

    this.subscription = this.authService.currentUser$.subscribe((data: ICurrentUser) => {
      this.currentUser = data;
    });
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
    if (this.embeddedVideoStreamfromTrackSlot) {
      this.embeddedVideoStream.emit(this.embeddedVideoStreamForm.value);
      this.toastLogService.successDialog('Saved!');
    } else {
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
