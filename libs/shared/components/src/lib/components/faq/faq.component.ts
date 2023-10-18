import { Component, Input, OnInit } from '@angular/core';
import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'commudle-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  @Input() answers: string[];
  showAnswers = [];
  faAdd = faAdd;
  faMinus = faMinus;

  @Input() questions: string[] = [
    'What are the charges for payments received through payment gateway on Commudle?',
    'Will I get access to new features which are rolled out after I pay for my subscription?',
    'Is Commudle the right platform for my global community members?',
  ];
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.setSchema();
  }

  toggleShowAnswers(index: number) {
    this.showAnswers[index] = !this.showAnswers[index];
  }

  setSchema() {
    const faqData = this.questions.map((question, index) => {
      return {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: this.answers[index],
        },
      };
    });
    this.seoService.setSchema({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData,
    });
  }
}
