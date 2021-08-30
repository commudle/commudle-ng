import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ILab} from 'projects/shared-models/lab.model';
import {IDiscussion} from 'projects/shared-models/discussion.model';

@Component({
  selector: 'app-lab-details',
  templateUrl: './lab-details.component.html',
  styleUrls: ['./lab-details.component.scss']
})
export class LabDetailsComponent implements OnInit {

  @Input() lab: ILab;
  @Input() similarLabs: ILab[];
  @Input() selectedLabStep: number;
  @Input() discussionChat: IDiscussion;
  @Input() messagesCount: number;

  @Input() hideUser: boolean;
  @Input() hideSteps: boolean;
  @Input() hideRelatedLabs: boolean;
  @Input() hideInteractions: boolean;

  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();
  @Output() scrollToChat: EventEmitter<any> = new EventEmitter<any>();

  showContinue:boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSetStep(value: number) {
    this.setStep.emit(value);
    if( this.lab.lab_steps[value].id === this.lab.last_visited_step_id ){
      this.showContinue = false;
    }
  }

  onScrollToChat() {
    this.scrollToChat.emit();
  }
}
