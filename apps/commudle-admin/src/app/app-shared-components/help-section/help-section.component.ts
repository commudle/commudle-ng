import { Component, Input, OnInit } from '@angular/core';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from 'apps/shared-components/sidebar/service/sidebar.service';
import { help_dictionary } from '@commudle/shared-services';
import { IHelpDictionary } from '@commudle/shared-models';
import { HelpDictionaryService } from 'apps/commudle-admin/src/app/services/help-dictionary.service';

@Component({
  selector: 'commudle-help-section',
  templateUrl: './help-section.component.html',
  styleUrls: ['./help-section.component.scss'],
})
export class HelpSectionComponent implements OnInit {
  @Input() helpDictionaryName: string;
  faCircleQuestion = faCircleQuestion;
  helpDictionary = help_dictionary;
  helpDictionaryData: IHelpDictionary;
  constructor(private helpSidebarService: SidebarService, private helpDictionaryService: HelpDictionaryService) {}

  ngOnInit(): void {
    this.getHelpSectionData();
  }

  openSidebar() {
    this.helpSidebarService.openSidebar('helpSection');
  }

  getHelpSectionData() {
    this.helpDictionaryData = this.helpDictionary[this.helpDictionaryName];
    if (this.helpDictionaryData.type === 'url') {
      this.helpDictionaryService.getHelpDictionaryIframe(this.helpDictionaryData.url);
    }
  }
}
