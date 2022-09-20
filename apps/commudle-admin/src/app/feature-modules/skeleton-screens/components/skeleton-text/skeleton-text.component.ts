import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'commudle-skeleton-text',
  templateUrl: './skeleton-text.component.html',
  styleUrls: ['./skeleton-text.component.scss']
})
export class SkeletonTextComponent implements OnInit {
  @Input() rows: number;

  rowsList = [];

  constructor() { }

  ngOnInit(): void {
    if (!this.rows) {
      this.rows = 1;
    }

    this.rowsList = Array(this.rows).fill(0);
  }

}
