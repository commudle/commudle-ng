import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HelpDictionaryService } from 'apps/commudle-admin/src/app/services/help-dictionary.service';
import { IHelpDictionary } from 'apps/shared-models/help-dictionary.model';

@Component({
  selector: 'commudle-help-dictionary-iframe',
  templateUrl: './help-dictionary-iframe.component.html',
  styleUrls: ['./help-dictionary-iframe.component.scss'],
})
export class HelpDictionaryIframeComponent implements OnInit {
  helpDictionaryUrl: string;
  constructor(private helpDictionaryService: HelpDictionaryService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.helpDictionaryService.helpDictionary$.subscribe((data) => {
      this.helpDictionaryUrl = data;
    });
  }
}
