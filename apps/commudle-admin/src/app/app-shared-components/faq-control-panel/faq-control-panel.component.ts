import { Component, Input, OnInit } from '@angular/core';
import { EModelName, IFaq } from '@commudle/shared-models';
import { FaqService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';
import { faPlus, faFileImage, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NbDialogService } from '@commudle/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'commudle-faq-control-panel',
  templateUrl: './faq-control-panel.component.html',
  styleUrls: ['./faq-control-panel.component.scss'],
})
export class FaqControlPanelComponent implements OnInit {
  @Input() parentId: number | string;
  @Input() parentType: EModelName;

  faqs: IFaq[];
  subscriptions: Subscription[] = [];
  faqForm: FormGroup;
  icons = {
    faPlus,
    faFileImage,
    faXmark,
  };

  constructor(private faqService: FaqService, private nbDialogService: NbDialogService, private fb: FormBuilder) {
    this.faqForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getFaqs();
  }

  getFaqs() {
    this.subscriptions.push(
      this.faqService.indexFaqs(this.parentId, this.parentType).subscribe((data: IFaq[]) => {
        this.faqs = data;
      }),
    );
  }

  openSponsorDialogBox(dialog) {
    this.nbDialogService.open(dialog);
  }

  createFaq() {
    this.faqService.createFaq(this.faqForm.value, this.parentType, this.parentId).subscribe((data) => {
      if (data) this.faqs.unshift(data);
    });
  }
}
