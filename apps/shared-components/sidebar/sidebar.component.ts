import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from 'apps/commudle-admin/src/app/services/sidebar.service';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'commudle-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, SharedPipesModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Input() showExpandedButton: boolean = true;
  @Input() position: 'left' | 'right' = 'left';
  @Input() expandedWidth: 'small' | 'medium' | 'large' | 'extra-large' = 'large';
  @Input() heading: string;
  @Input() forWindow = true;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() eventName: string;

  hideFullSidebar = false;
  expandSidebar = false;
  url;

  //font-awesome icons
  faCaretLeft = faCaretLeft;
  faBars = faBars;
  constructor(public sidebarService: SidebarService, public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const sidebarState = this.sidebarService.getSidebarState(this.eventName);

    if (sidebarState) {
      sidebarState.expanded.subscribe((data) => {
        this.expandSidebar = data;
      });

      sidebarState.hidden.subscribe((data) => {
        this.hideFullSidebar = data;
      });

      sidebarState.url.subscribe((data) => {
        if (data) {
          this.url = this.sanitizer.bypassSecurityTrustResourceUrl(data);
        }
      });
    }
  }

  handleSidebarToggle() {
    this.sidebarService.toggleSidebarVisibility(this.eventName);
    this.toggleSidebar.emit(!this.isExpanded);
  }
}
