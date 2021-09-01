import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { IEntity } from '../../models/entity.model';


@Component({
  selector: 'app-suggestion-box',
  templateUrl: './suggestion-box.component.html',
  styleUrls: ['./suggestion-box.component.scss']
})
export class SuggestionBoxComponent implements OnInit {

  @Input() taggableEntities : IEntity[];
  @Input() selectedEntity : IEntity;
  @Output() selectedItemEvent : EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onItemClicked(entity : IEntity){
    console.log(entity)
    this.selectedItemEvent.emit({ entity : entity, eventType : "click" })
  }

  onItemHover(entity : IEntity){
    this.selectedItemEvent.emit({ entity : entity, eventType : "hover" })
  }

}
