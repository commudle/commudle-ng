import { Clipboard } from '@angular/cdk/clipboard';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { ILab } from 'apps/shared-models/lab.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { NavigatorShareService } from 'apps/shared-services/navigator-share.service';

@Component({
  selector: 'app-lab-details',
  templateUrl: './lab-details.component.html',
  styleUrls: ['./lab-details.component.scss'],
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
  @Input() hideRecommendedLabs: boolean;
  @Input() hideInteractions: boolean;

  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();
  @Output() scrollToChat: EventEmitter<any> = new EventEmitter<any>();

  showContinue = true;

  constructor(
    private navigatorShareService: NavigatorShareService,
    private libToastLogService: LibToastLogService,
    private clipboard: Clipboard,
  ) {}

  ngOnInit(): void {}

  onSetStep(value: number) {
    this.setStep.emit(value);
    if (this.lab.lab_steps[value]?.id === this.lab.last_visited_step_id) {
      this.showContinue = false;
    }
  }

  onScrollToChat() {
    this.scrollToChat.emit();
  }

  copyTextToClipboard(lab: ILab): void {
    if (!this.navigatorShareService.canShare()) {
      if (this.clipboard.copy(`${environment.app_url}/labs/${lab.slug}`)) {
        this.libToastLogService.successDialog('Copied Lab successfully!');
      }
      return;
    }

    this.navigatorShareService
      .share({
        title: `${lab.name}`,
        url: `${environment.app_url}/labs/${lab.slug}`,
      })
      .then(() => {
        this.libToastLogService.successDialog('Shared successfully!');
      });
  }
}
