import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NbTagComponent, NbTagInputAddEvent } from '@commudle/theme';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit, OnDestroy {
  @Input() tags: string[];
  @Input() editable: boolean;
  @Input() inputDisabled: boolean;
  @Input() minimumTags: number = 5;
  @Input() backgroundColor: string = 'com-bg-[#F7F9FC]';
  @Input() fontColor: string;
  @Input() maximumTag;
  @Input() size; //It can be tiny;

  @Output() tagAdd: EventEmitter<string> = new EventEmitter<string>();
  @Output() tagDelete: EventEmitter<string> = new EventEmitter<string>();

  subscription: Subscription;
  faXmark = faXmark;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getTags() {
    let tags = this.tags.filter(Boolean);

    if (this.maximumTag) {
      tags = tags.slice(0, this.maximumTag);
    }

    return tags;
  }

  onTagAdd({ value, input }): void {
    this.tagAdd.emit(value);

    if (input) {
      input.nativeElement.value = '';
      this.subscription = fromEvent(input.nativeElement.parentNode, 'keypress', { capture: true }).subscribe(
        (e: any) => {
          console.log(e);
          if (e.target === input.nativeElement && e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
          }
        },
      );
    }
  }

  onTagRemove(tag): void {
    this.tagDelete.emit(tag);
  }
}
