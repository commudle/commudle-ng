import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
@Component({
  selector: 'app-suggestion-box',
  templateUrl: './suggestion-box.component.html',
  styleUrls: ['./suggestion-box.component.scss']
})
export class SuggestionBoxComponent implements OnInit {

  @Input() taggableEntities : any[];
  @Input() selectedEntity : any;
  @Output() selectedItemEvent : EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onItemClicked(entity : any){
    console.log(entity)
    this.selectedItemEvent.emit({ entity : entity, eventType : "click" })
  }

  onItemHover(entity : any){
    this.selectedItemEvent.emit({ entity : entity, eventType : "hover" })
  }

}
