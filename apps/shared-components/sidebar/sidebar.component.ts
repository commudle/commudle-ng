import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretLeft, faBars } from '@fortawesome/free-solid-svg-icons';

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

  //font-awesome icons
  faCaretLeft = faCaretLeft;
  faBars = faBars;
  constructor() {}

  ngOnInit(): void {}

  handleSidebarToggle() {
    this.toggleSidebar.emit(!this.isExpanded);
  }
}
