import { Component, Input, OnInit } from '@angular/core';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from 'apps/shared-components/sidebar/service/sidebar.service';
import { helpDictionary } from '@commudle/shared-services';

@Component({
  selector: 'commudle-help-section',
  templateUrl: './help-section.component.html',
  styleUrls: ['./help-section.component.scss'],
})
export class HelpSectionComponent implements OnInit {
  @Input() helpDictionaryName: string;
  faCircleQuestion = faCircleQuestion;
  helpDictionary = helpDictionary;
  helpDictionaryData = {};
  constructor(private helpSidebarService: SidebarService) {}

  ngOnInit(): void {}

  openSidebar() {
    this.helpSidebarService.openSidebar('helpSection');
  }

  getHelpSectionData() {
    this.helpDictionaryData = helpDictionary[this.helpDictionaryName];
    console.log(this.helpDictionaryData);
  }
}
