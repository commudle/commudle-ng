import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NbTagComponent, NbTagInputAddEvent } from '@commudle/theme';
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
  @Input() backgroundColor: string;
  @Input() fontColor: string;
  @Input() maximumTag = 5;
  @Input() size; //It can be tiny;

  @Output() tagAdd: EventEmitter<string> = new EventEmitter<string>();
  @Output() tagDelete: EventEmitter<string> = new EventEmitter<string>();

  subscription: Subscription;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getTags() {
    const tags = this.tags.filter(Boolean);

    return tags;
  }

  onTagAdd({ value, input }: NbTagInputAddEvent): void {
    this.tagAdd.emit(value);
    // Reset the input
    input.nativeElement.value = '';

    this.subscription = fromEvent(input.nativeElement.parentNode, 'keypress', { capture: true }).subscribe((e: any) => {
      if (e.target === input.nativeElement && e.key === 'Enter') {
        e.stopPropagation();
        e.preventDefault();
      }
    });
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tagDelete.emit(tagToRemove.text);
  }
}
