import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'commudle-entity-profile',
  templateUrl: './entity-profile.component.html',
  styleUrls: ['./entity-profile.component.scss']
})
export class EntityProfileComponent implements OnInit {

  @Input() entity: any;
  @Input() size: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
