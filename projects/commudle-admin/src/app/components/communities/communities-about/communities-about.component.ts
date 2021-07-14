import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-communities-about',
  templateUrl: './communities-about.component.html',
  styleUrls: ['./communities-about.component.scss'],
})
export class CommunitiesAboutComponent implements OnInit {
  constructor() {
    // do nothing
  }

  ngOnInit(): void {
    // do nothing
  }

  // Function to scroll to communities list section
  scrollToCommunitiesList(): void {
    const element = document.getElementById('communities-list');
    window.scroll({ top: element.offsetTop - 56, behavior: 'smooth' });
  }
}
