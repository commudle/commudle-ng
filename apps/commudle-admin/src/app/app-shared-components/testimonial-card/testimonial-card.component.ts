import { Component, Input, OnInit } from '@angular/core';
import { ITestimonial } from 'apps/shared-models/testimonial.model';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'commudle-testimonial-card',
  templateUrl: './testimonial-card.component.html',
  styleUrls: ['./testimonial-card.component.scss'],
})
export class TestimonialCardComponent implements OnInit {
  @Input() testimonials: ITestimonial[];
  users: IUser[] = [];

  constructor(private usersService: AppUsersService) {}

  ngOnInit(): void {
    this.testimonials.forEach((testimonial) => {
      this.getUserDetails(testimonial.username);
    });
  }

  getUserDetails(username) {
    this.usersService.getProfile(username).subscribe((data) => {
      if (data) {
        this.users.push(data);
      }
    });
  }
}
