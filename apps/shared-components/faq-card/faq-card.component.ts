import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFaq } from '@commudle/shared-models';
import { SeoService } from '@commudle/shared-services';
import { faAdd, faMinus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-faq-card',
  templateUrl: './faq-card.component.html',
  styleUrls: ['./faq-card.component.scss'],
})
export class FaqCardComponent implements OnInit {
  @Input() faq: IFaq;
  @Input() isAdmin = false;
  @Output() destroyFaqEvent: EventEmitter<IFaq> = new EventEmitter();
  @Output() editFaqEvent: EventEmitter<IFaq> = new EventEmitter();
  showAnswers = [];
  icons = { faAdd, faMinus, faTrash, faEdit };

  showAnswer = false;

  constructor(private seoService: SeoService) {}

  ngOnInit() {
    if (!this.isAdmin) {
      this.setSchema();
    }
  }

  toggleShowAnswers() {
    this.showAnswer = !this.showAnswer;
  }
  deleteFaq(faq) {
    this.destroyFaqEvent.emit(faq);
  }
  editFaq(faq) {
    this.editFaqEvent.emit(faq);
  }

  setSchema() {
    this.seoService.setSchema({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: {
        '@type': 'Question',
        name: this.faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: this.faq.answer,
        },
      },
    });
  }
}
