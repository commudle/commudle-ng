import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-suggestion-box',
  templateUrl: './suggestion-box.component.html',
  styleUrls: ['./suggestion-box.component.scss']
})
export class SuggestionBoxComponent implements OnInit {

  @Input() taggableUsers : string[];

  constructor() {
  }

  ngOnInit(): void {
  }


}
