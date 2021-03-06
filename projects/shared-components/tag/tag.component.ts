import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NbTagComponent, NbTagInputAddEvent} from '@nebular/theme';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  @Input() tags: string[];
  @Input() editable: boolean;
  @Input() inputDisabled: boolean;

  @Output() tagAdd: EventEmitter<string> = new EventEmitter<string>();
  @Output() tagDelete: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onTagAdd({value, input}: NbTagInputAddEvent): void {
    this.tagAdd.emit(value);
    // Reset the input
    input.nativeElement.value = '';
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tagDelete.emit(tagToRemove.text);
  }

}
