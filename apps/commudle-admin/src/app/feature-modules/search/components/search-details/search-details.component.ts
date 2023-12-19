import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'commudle-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.scss'],
})
export class SearchDetailsComponent implements OnInit {
  @Input() option: any;

  constructor() {}

  ngOnInit(): void {}
}
