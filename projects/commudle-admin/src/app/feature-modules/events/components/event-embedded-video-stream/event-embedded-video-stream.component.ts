import { Component, OnInit, Input } from '@angular/core';
import { IEvent } from 'projects/shared-models/event.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { FormBuilder, Validators } from '@angular/forms';
import { EmbeddedVideoStreamsService } from 'projects/commudle-admin/src/app/services/embedded-video-streams.service';
import { IEmbeddedVideoStream } from 'projects/shared-models/embedded_video_stream.model';
import { EEmbeddedVideoStreamSources } from 'projects/shared-models/enums/embedded_video_stream_sources.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-event-embedded-video-stream',
  templateUrl: './event-embedded-video-stream.component.html',
  styleUrls: ['./event-embedded-video-stream.component.scss']
})
export class EventEmbeddedVideoStreamComponent implements OnInit {
  @Input() event: IEvent;
  @Input() community: ICommunity;
  EEmbeddedVideoStreamSources = EEmbeddedVideoStreamSources;

  evs: IEmbeddedVideoStream;
  youtubeVideoId: string;
  embeddedVideoUrl: any;

  embeddedVideoStreamForm = this.fb.group({
    streamable_type: ['', Validators.required],
    streamable_id: ['', Validators.required],
    source: ['', Validators.required],
    embed_code: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private embeddedVideoStreamsService: EmbeddedVideoStreamsService,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit() {
    this.embeddedVideoStreamForm.patchValue({
      streamable_type: 'Event',
      streamable_id: this.event.id
    });

    this.getEmbeddedVideoStream();
  }



  getEmbeddedVideoStream() {
    this.embeddedVideoStreamsService.get(this.event.id).subscribe(
      data => {
        if (data) {
          this.evs = data;
          this.embeddedVideoStreamForm.patchValue(data);
        }
      }
    );
  }


  createOrUpdate() {
    this.embeddedVideoStreamsService.createOrUpdate(this.embeddedVideoStreamForm.value).subscribe(
      data => {
        this.evs = data;
        this.embeddedVideoStreamForm.patchValue(data);
        this.toastLogService.successDialog('Saved!');
      }
    );
  }

}
