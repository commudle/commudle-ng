import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'commudle-accept-resume-consent',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './accept-resume-consent.component.html',
  styleUrls: ['./accept-resume-consent.component.scss'],
})
export class AcceptResumeConsentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
