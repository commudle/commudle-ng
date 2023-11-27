import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'commudle-reading-book-sidebar',
  templateUrl: './reading-book-sidebar.component.html',
  styleUrls: ['./reading-book-sidebar.component.scss'],
})
export class ReadingBookSidebarComponent implements OnInit {
  @Input() chapter; //lab
  @Input() selectedChapterIndex: number; //labstep

  @Output() setChapter: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  onSetStep(value: number) {
    this.setChapter.emit(value);
    // if (this.lab.lab_steps[value]?.id === this.lab.last_visited_step_id) {
    //   this.showContinue = false;
    // }
  }
}
