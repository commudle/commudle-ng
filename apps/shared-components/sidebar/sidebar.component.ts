import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbIconModule } from '@commudle/theme';

@Component({
  selector: 'commudle-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, NbIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);
}
