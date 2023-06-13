import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule } from '@commudle/theme';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'commudle-top-builders-card',
  standalone: true,
  imports: [CommonModule, NbCardModule, RouterModule, NbIconModule],
  templateUrl: './top-builders-card.component.html',
  styleUrls: ['./top-builders-card.component.scss'],
})
export class TopBuildersCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
