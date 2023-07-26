import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { SidebarService } from 'apps/commudle-admin/src/app/services/sidebar.service';

@Component({
  selector: 'commudle-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
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

  //font-awesome icons
  faCaretLeft = faCaretLeft;
  faBars = faBars;
  constructor(public sidebarService: SidebarService) {}

  ngOnInit(): void {
    if (this.sidebarService.setSidebar$.hasOwnProperty(this.eventName)) {
      this.sidebarService.setSidebar$[this.eventName].subscribe((data) => {
        this.expandSidebar = data;
      });
    }

    if (this.sidebarService.hideSidebar$.hasOwnProperty(this.eventName)) {
      this.sidebarService.hideSidebar$[this.eventName].subscribe((data) => {
        this.hideFullSidebar = data;
      });
    }
  }

  handleSidebarToggle() {
    this.sidebarService.toggleSidebarVisibility(this.eventName);
    this.toggleSidebar.emit(!this.isExpanded);
  }
}
