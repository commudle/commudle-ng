import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IEditorValidator } from '@commudle/editor';
import { AuthService } from '@commudle/shared-services';
import { DiscussionHandlerService } from '../../services/discussion-handler.service';

@Component({
  selector: 'commudle-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscussionComponent implements OnInit {
  @Input() discussionId!: number;
  @Input() discussionParent: 'builds' | '' = '';

  validators: IEditorValidator = {
    required: true,
    minLength: 1,
    maxLength: 200,
    noWhitespace: true,
  };

  constructor(public discussionHandlerService: DiscussionHandlerService, public authService: AuthService) {}

  ngOnInit(): void {
    this.discussionHandlerService.init(this.discussionId, this.discussionParent);
  }
}
