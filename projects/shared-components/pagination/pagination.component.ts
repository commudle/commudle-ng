import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() current: number = 0;
  @Input() total: number = 0;

  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  public pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.current && changes.current.currentValue) || (changes.total && changes.total.currentValue)) {
      this.pages = PaginationComponent.getPages(this.current, this.total);
    }
  }

  public onGoTo(page: number): void {
    this.goTo.emit(page);
  }

  public onNext(): void {
    this.next.emit(this.current + 1);
  }

  public onPrevious(): void {
    this.previous.next(this.current - 1);
  }

  private static getPages(current: number, total: number): number[] {
    if (total <= 7) {
      return [...Array(total).keys()].map((x) => ++x);
    }

    if (current > 5) {
      if (current >= total - 4) {
        return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total];
      }
    }

    return [1, 2, 3, 4, 5, -1, total];
  }
}
