import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers, faBuilding, faCalendar, faCaretLeft, faBars, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Input() heading: string;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  //font-awesome icons
  faUsers = faUsers;
  faBuilding = faBuilding;
  faCalendar = faCalendar;
  faCaretLeft = faCaretLeft;
  faBars = faBars;
  faPenToSquare = faPenToSquare;
  constructor() {}

  ngOnInit(): void {}

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
}
