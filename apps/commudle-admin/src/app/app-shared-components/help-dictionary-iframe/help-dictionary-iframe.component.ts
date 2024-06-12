import { Component, OnInit } from '@angular/core';
import { HelpDictionaryService } from 'apps/commudle-admin/src/app/services/help-dictionary.service';

@Component({
  selector: 'commudle-help-dictionary-iframe',
  templateUrl: './help-dictionary-iframe.component.html',
  styleUrls: ['./help-dictionary-iframe.component.scss'],
})
export class HelpDictionaryIframeComponent implements OnInit {
  helpDictionaryUrl: string;
  constructor(private helpDictionaryService: HelpDictionaryService) {}

  ngOnInit(): void {
    this.helpDictionaryService.helpDictionary$.subscribe((data) => {
      this.helpDictionaryUrl = data;
    });
  }
}
