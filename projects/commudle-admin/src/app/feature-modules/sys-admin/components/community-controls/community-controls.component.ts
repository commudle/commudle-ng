import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-community-controls',
  templateUrl: './community-controls.component.html',
  styleUrls: ['./community-controls.component.scss']
})
export class CommunityControlsComponent implements OnInit {

  constructor(
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Admin: Community Controls')
  }

}
