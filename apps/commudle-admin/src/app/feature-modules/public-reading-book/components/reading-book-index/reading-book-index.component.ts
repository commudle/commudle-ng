import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'commudle-reading-book-index',
  templateUrl: './reading-book-index.component.html',
  styleUrls: ['./reading-book-index.component.scss'],
})
export class ReadingBookIndexComponent implements OnInit {
  @Input() chapterIndexes;
  params = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((value) => {
      this.params = value.slug;
    });
  }
}
