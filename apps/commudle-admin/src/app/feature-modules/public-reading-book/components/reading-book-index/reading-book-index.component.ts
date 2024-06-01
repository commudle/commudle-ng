import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IReadingBook } from 'apps/shared-models/reading_book.model';

@Component({
  selector: 'commudle-reading-book-index',
  templateUrl: './reading-book-index.component.html',
  styleUrls: ['./reading-book-index.component.scss'],
})
export class ReadingBookIndexComponent implements OnInit {
  @Input() chapterIndexes: IReadingBook[] = [];
  params = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((value) => {
      this.params = value.slug;
    });

    if (this.params) {
      this.router.navigate(['/developer-ecosystem-blueprint/book', this.params]);
    } else {
      this.router.navigate(['/developer-ecosystem-blueprint/book', this.chapterIndexes[0].slug.current]);
    }
  }
}
