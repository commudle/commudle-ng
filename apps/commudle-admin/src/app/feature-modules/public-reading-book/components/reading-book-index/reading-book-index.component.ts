import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'commudle-reading-book-index',
  templateUrl: './reading-book-index.component.html',
  styleUrls: ['./reading-book-index.component.scss'],
})
export class ReadingBookIndexComponent implements OnInit {
  @Input() chapterIndexes;
  params = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((value) => {
      this.params = value.slug;
    });

    if (this.chapterIndexes && this.chapterIndexes.length > 0) {
      this.params = this.chapterIndexes[0].slug.current;
      this.router.navigate(['/reading-book', this.chapterIndexes[0].slug.current]);
    }
  }
}
