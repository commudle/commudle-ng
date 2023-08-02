import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'commudle-back-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent implements OnInit {
  @Input() text: string;
  faChevronLeft = faChevronLeft;
  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBackToPrevPage(): void {
    this.location.back();
  }
}
