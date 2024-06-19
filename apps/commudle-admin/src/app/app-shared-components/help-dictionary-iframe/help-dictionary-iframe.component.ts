import { Component, Input, OnInit } from '@angular/core';
import { faBars, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { HelpDictionaryService } from 'apps/commudle-admin/src/app/services/help-dictionary.service';
import { SidebarService } from 'apps/shared-components/sidebar/service/sidebar.service';

@Component({
  selector: 'commudle-help-dictionary-iframe',
  templateUrl: './help-dictionary-iframe.component.html',
  styleUrls: ['./help-dictionary-iframe.component.scss'],
})
export class HelpDictionaryIframeComponent implements OnInit {
  @Input() eventName: string;
  helpDictionaryUrl: string;
  expandSidebar: boolean;
  faCaretLeft = faCaretLeft;
  faBars = faBars;
  constructor(private helpDictionaryService: HelpDictionaryService, private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.helpDictionaryService.helpDictionary$.subscribe((data) => {
      this.helpDictionaryUrl = data;
      this.expandSidebar = true;
    });
  }

  closeSidebar() {
    this.expandSidebar = false;
    this.sidebarService.closeSidebar(this.eventName);
  }
}
