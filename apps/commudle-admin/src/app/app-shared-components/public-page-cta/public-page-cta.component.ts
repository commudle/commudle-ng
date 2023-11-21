import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-public-page-cta',
  templateUrl: './public-page-cta.component.html',
  styleUrls: ['./public-page-cta.component.scss'],
})
export class PublicPageCtaComponent implements OnInit {
  faCheck = faCheck;
  constructor() {}

  ngOnInit(): void {}
}
