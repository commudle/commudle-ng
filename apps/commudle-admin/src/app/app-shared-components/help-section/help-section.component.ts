import { Component, Input, OnInit } from '@angular/core';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from 'apps/shared-components/sidebar/service/sidebar.service';
import { GoogleTagManagerService, help_dictionary } from '@commudle/shared-services';
import { IHelpDictionary, EHelpDictionaryType } from '@commudle/shared-models';
import { HelpDictionaryService } from 'apps/commudle-admin/src/app/services/help-dictionary.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NbTooltipModule } from '@commudle/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'commudle-help-section',
  templateUrl: './help-section.component.html',
  styleUrls: ['./help-section.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, NbTooltipModule],
})
export class HelpSectionComponent implements OnInit {
  @Input() helpDictionaryName: string;
  faCircleQuestion = faCircleQuestion;
  helpDictionary = help_dictionary;
  helpDictionaryData: IHelpDictionary;
  EHelpDictionaryType = EHelpDictionaryType;
  constructor(
    private helpSidebarService: SidebarService,
    private helpDictionaryService: HelpDictionaryService,
    private gtm: GoogleTagManagerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getHelpSectionData();
  }

  openSidebar() {
    if (this.helpDictionaryData && this.helpDictionaryData.type === EHelpDictionaryType.URL) {
      this.helpDictionaryService.getHelpDictionaryIframe(this.helpDictionaryData.url);
      this.helpSidebarService.openSidebar('helpSection');
      this.gtmService(this.helpDictionaryData);
    }
  }

  getHelpSectionData() {
    this.helpDictionaryData = this.helpDictionary[this.helpDictionaryName];
  }

  gtmService(helpData) {
    this.gtm.dataLayerPushEvent('click-help', {
      com_type: helpData.type,
      com_help_url: helpData.url,
      com_page_url: this.router.url,
    });
  }
}
