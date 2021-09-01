import { Component, OnInit, Input } from '@angular/core';
import { IEntity } from '../../models/entity.model';

@Component({
  selector: 'app-entity-profile',
  templateUrl: './entity-profile.component.html',
  styleUrls: ['./entity-profile.component.scss']
})
export class EntityProfileComponent implements OnInit {

  @Input() entity: IEntity;
  @Input() size: string;

  constructor() { }

  ngOnInit(): void {
  }

}
