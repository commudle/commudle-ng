import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EPollStatuses, IPoll } from '@commudle/shared-models';
import { NbWindowService } from '@nebular/theme';
import { PollResultComponent } from '../../poll-result/poll-result.component';

@Component({
  selector: 'commudle-poll-list-item',
  templateUrl: './poll-list-item.component.html',
  styleUrls: ['./poll-list-item.component.scss'],
})
export class PollListItemComponent implements OnInit {
  EPollStatuses = EPollStatuses;

  @Input() poll: IPoll;
  @Input() deletable: boolean;
  @Input() editable: boolean; //editable is for start and stop ability

  @Output() deletePoll = new EventEmitter();
  @Output() startPoll = new EventEmitter();
  @Output() startSelfPoll = new EventEmitter();
  @Output() stopPoll = new EventEmitter();

  constructor(private windowService: NbWindowService) {}

  ngOnInit() {}

  delete() {
    this.deletePoll.emit(this.poll.id);
  }

  start() {
    this.startPoll.emit(this.poll.id);
  }

  startSelf() {
    this.startSelfPoll.emit(this.poll.id);
  }

  stop() {
    this.stopPoll.emit(this.poll.id);
  }

  displayResults() {
    this.windowService.open(PollResultComponent, {
      title: 'Result of the Poll',
      context: {
        pollId: this.poll.id,
      },
    });
  }
}
