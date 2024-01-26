import { Component, Input, OnInit } from '@angular/core';
import { EModelName, IFaq } from '@commudle/shared-models';
import { FaqService, ToastrService } from '@commudle/shared-services';
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

  constructor(
    private faqService: FaqService,
    private nbDialogService: NbDialogService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {
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

  openFaqDialogBox(dialog, faq?: IFaq, index?) {
    if (faq) {
      this.faqForm.patchValue({
        question: faq.question,
        answer: faq.answer,
      });
    }
    this.nbDialogService.open(dialog, {
      context: { index: index, faq: faq },
    });
  }

  createFaq() {
    this.faqService.createFaq(this.faqForm.value, this.parentType, this.parentId).subscribe((data) => {
      if (data) this.faqs.unshift(data);
      this.faqForm.reset();
    });
  }

  destroyFaq(faq, index) {
    this.faqService.destroyFaq(faq.id).subscribe((data) => {
      if (data) {
        this.toastrService.successDialog('Faq has been deleted');
        this.faqs.splice(index, 1);
      }
    });
  }

  editFaq(faqId, index) {
    this.faqService.updateFaq(this.faqForm.value, faqId, this.parentType, this.parentId).subscribe((data) => {
      if (data) this.faqs[index] = data;
    });
  }
}
