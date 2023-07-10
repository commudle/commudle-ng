import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbCardModule } from '@commudle/theme';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { ISpeakerResource } from 'apps/shared-models/speaker_resource.model';

@Component({
  selector: 'commudle-event-content-card',
  standalone: true,
  imports: [CommonModule, RouterModule, NbCardModule, SharedComponentsModule],
  templateUrl: './event-content-card.component.html',
  styleUrls: ['./event-content-card.component.scss'],
})
export class EventContentCardComponent implements OnInit {
  @Input() speakersContent: ISpeakerResource;
  @Input() horizontalScroll = false;
  // speakerTags;
  tags: string[] = [];
  constructor() {}

  ngOnInit(): void {}

  getTagNames() {
    for (const tag of this.speakersContent.tags) {
      this.tags.push(tag.name);
    }
    return this.tags;
  }
}
