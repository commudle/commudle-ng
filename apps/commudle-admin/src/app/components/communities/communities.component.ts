import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss'],
})
export class CommunitiesComponent implements OnInit {
  isMobileView: boolean;
  constructor() {}

  ngOnInit(): void {
    this.isMobileView = window.innerWidth <= 640;
  }
}
