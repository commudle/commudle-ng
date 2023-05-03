import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule } from '@commudle/theme';

@Component({
  selector: 'commudle-user-consents',
  standalone: true,
  imports: [CommonModule, NbButtonModule],
  templateUrl: './user-consents.component.html',
  styleUrls: ['./user-consents.component.scss'],
})
export class UserConsentsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
