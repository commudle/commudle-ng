import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';

@Component({
  selector: 'commudle-listing-pages-layout',
  standalone: true,
  imports: [CommonModule, SharedDirectivesModule],
  templateUrl: './listing-pages-layout.component.html',
  styleUrls: ['./listing-pages-layout.component.scss'],
})
export class ListingPagesLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
