import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'commudle-reading-book-index',
  templateUrl: './reading-book-index.component.html',
  styleUrls: ['./reading-book-index.component.scss'],
})
export class ReadingBookIndexComponent implements OnInit {
  @Input() chapterIndexes;
  @Input() selectedChapterIndex: number; //labstep

  @Output() setChapter: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {
    // console.log(this.chapterIndexes, 'index');
    // if (this.chapterIndexes.length > 0) {
    console.log(this.chapterIndexes, 'index');
    // }
  }

  ngAfterViewInit() {
    console.log(this.chapterIndexes, 'index');
  }

  onSetStep(index: number) {
    this.setChapter.emit(index);
    // if (this.lab.lab_steps[value]?.id === this.lab.last_visited_step_id) {
    //   this.showContinue = false;
    // }
  }
}
