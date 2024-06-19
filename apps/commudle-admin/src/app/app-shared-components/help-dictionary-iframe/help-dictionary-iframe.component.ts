import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { HelpDictionaryService } from 'apps/commudle-admin/src/app/services/help-dictionary.service';
import { SidebarService } from 'apps/shared-components/sidebar/service/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-help-dictionary-iframe',
  templateUrl: './help-dictionary-iframe.component.html',
  styleUrls: ['./help-dictionary-iframe.component.scss'],
})
export class HelpDictionaryIframeComponent implements OnInit, OnDestroy {
  @Input() eventName: string;
  helpDictionaryUrl: string;
  faXmark = faXmark;
  faBars = faBars;
  private subscription: Subscription;
  constructor(private helpDictionaryService: HelpDictionaryService, private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.helpDictionaryService.helpDictionary$.subscribe((data) => {
      if (data) {
        this.helpDictionaryUrl = data;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeSidebar() {
    this.sidebarService.closeSidebar(this.eventName);
  }
}
