import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'datatable-pager',
  template: `
    <label for="jumpTo" class="jump-to-label">Jump to</label>
    <select name="jumpTo" id="jumpTo" [(ngModel)]="selectedPage" (change)="jumpToPage($event)" class="jump-to-select">
      <option *ngFor="let pg of allPages" [value]="pg.number">{{ pg.number }}</option>
    </select>
    &nbsp;&nbsp;&nbsp;
    <ul class="pager">
      <li [class.disabled]="!canPrevious()">
        <a role="button" aria-label="go to first page" href="javascript:void(0)" (click)="selectPage(1)">&lt;&lt; </a>
      </li>
      <li [class.disabled]="!canPrevious()">
        <a role="button" aria-label="go to previous page" href="javascript:void(0)" (click)="prevPage()">&lt;</a>
      </li>
      <li
        role="button"
        [attr.aria-label]="'page ' + pg.number"
        class="pages"
        *ngFor="let pg of pages"
        [class.active]="pg.number === page"
      >
        <a href="javascript:void(0)" (click)="selectPage(pg.number)">
          {{ pg.text }}
        </a>
      </li>
      <li [class.disabled]="!canNext()">
        <a role="button" aria-label="go to next page" href="javascript:void(0)" (click)="nextPage()">&gt;</a>
      </li>
      <li [class.disabled]="!canNext()">
        <a role="button" aria-label="go to last page" href="javascript:void(0)" (click)="selectPage(totalPages)">
          &gt;&gt;
        </a>
      </li>
    </ul>
  `,
  host: {
    class: 'datatable-pager',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTablePagerComponent implements OnInit {
  @Input() pagerLeftArrowIcon: string;
  @Input() pagerRightArrowIcon: string;
  @Input() pagerPreviousIcon: string;
  @Input() pagerNextIcon: string;

  @Input()
  set size(val: number) {
    this._size = val;
    this.pages = this.calcPages();
    this.updateAllPages();
  }

  get size(): number {
    return this._size;
  }

  @Input()
  set count(val: number) {
    this._count = val;
    this.pages = this.calcPages();
    this.updateAllPages();
  }

  get count(): number {
    return this._count;
  }

  @Input()
  set page(val: number) {
    this._page = val;
    this.pages = this.calcPages();
  }

  get page(): number {
    return this._page;
  }

  get totalPages(): number {
    const count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
    return Math.max(count || 0, 1);
  }

  @Output() changePage: EventEmitter<any> = new EventEmitter();

  _count = 0;
  _page = 1;
  _size = 0;
  pages: any;
  selectedPage = 0;
  allPages: any[];

  ngOnInit() {
    this.updateAllPages();
  }

  canPrevious(): boolean {
    return this.page > 1;
  }

  canNext(): boolean {
    return this.page < this.totalPages;
  }

  prevPage(): void {
    this.selectPage(this.page - 1);
  }

  nextPage(): void {
    this.selectPage(this.page + 1);
  }

  selectPage(page: number): void {
    this.selectedPage = page;
    if (page > 0 && page <= this.totalPages && page !== this.page) {
      this.page = page;

      this.changePage.emit({
        page,
      });
    } else {
      this.selectedPage = this.page;
    }
  }

  calcPages(page?: number): any[] {
    const pages = [];
    let startPage = 1;
    let endPage = this.totalPages;
    const maxSize = 5;
    const isMaxSized = maxSize < this.totalPages;

    page = page || this.page;

    if (isMaxSized) {
      startPage = page - Math.floor(maxSize / 2);
      endPage = page + Math.floor(maxSize / 2);

      if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(startPage + maxSize - 1, this.totalPages);
      } else if (endPage > this.totalPages) {
        startPage = Math.max(this.totalPages - maxSize + 1, 1);
        endPage = this.totalPages;
      }
    }

    for (let num = startPage; num <= endPage; num++) {
      pages.push({
        number: num,
        text: <string>(<any>num),
      });
    }

    return pages;
  }

  jumpToPage(event): void {
    this.selectedPage = Number(event.target.value);
    this.selectPage(this.selectedPage);
  }

  updateAllPages(): void {
    this.allPages = [];
    for (let num = 1; num <= this.totalPages; num++) {
      this.allPages.push({
        number: num,
        text: <string>(<any>num),
      });
    }
  }
}
