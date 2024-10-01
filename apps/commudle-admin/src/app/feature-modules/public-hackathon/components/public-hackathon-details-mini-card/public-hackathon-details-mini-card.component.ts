/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, Input, OnInit } from '@angular/core';
import { IHackathon, EHackathonLocationType } from 'apps/shared-models/hackathon.model';
import { faGlobe, faAward } from '@fortawesome/free-solid-svg-icons';
import { AuthService, countries_details } from '@commudle/shared-services';
import { HackathonService } from 'apps/commudle-admin/src/app/services/hackathon.service';
import { ICommunity, IHackathonTeam, IUser } from '@commudle/shared-models';
@Component({
  selector: 'commudle-public-hackathon-details-mini-card',
  templateUrl: './public-hackathon-details-mini-card.component.html',
  styleUrls: ['./public-hackathon-details-mini-card.component.scss'],
})
export class PublicHackathonDetailsMiniCardComponent implements OnInit {
  @Input() hackathon: IHackathon;
  @Input() community: ICommunity;
  @Input() hrgId: number;
  userTeamDetails: IHackathonTeam[];
  currentUser: IUser;
  currentDate: Date;
  hackathonApplicationStartDate: Date;
  hackathonApplicationEndDate: Date;
  icons = {
    faGlobe,
    faAward,
  };

  EHackathonLocationType = EHackathonLocationType;
  totalPrizesByCurrency: { currency: any; amount: number }[];
  countryDetails = countries_details;
  users: IUser[];
  totalUsers: number;
  hackathonStatus: string;
  daysLeft: number;

  constructor(private hackathonService: HackathonService, private authService: AuthService) {}

  ngOnInit() {
    this.fetchInterestedMembers();
    this.authService.currentUser$.subscribe((data) => {
      if (data) this.getTeamDetails();
      this.currentUser = data;
    });
    if (this.hackathon.application_start_date && this.hackathon.application_end_date)
      this.calculateHackathonDatesStatus();
    if (this.hackathon.total_prize_amount) {
      this.totalPrizesByCurrency = Object.keys(this.hackathon.total_prize_amount).map((currency) => ({
        currency: this.countryDetails.find((detail) => detail.currency === currency),
        amount: this.hackathon.total_prize_amount[currency],
      }));
    }
  }

  getTeamDetails() {
    this.hackathonService
      .getHackathonCurrentRegistrationDetails(this.hackathon.id)
      .subscribe((data: IHackathonTeam[]) => {
        this.userTeamDetails = data;
      });
  }

  calculateHackathonDatesStatus() {
    this.currentDate = new Date();
    this.hackathonApplicationStartDate = new Date(this.hackathon.application_start_date);
    this.hackathonApplicationEndDate = new Date(this.hackathon.application_end_date);
    if (this.currentDate < this.hackathonApplicationStartDate) {
      this.hackathonStatus = 'Upcoming';
    } else if (
      this.currentDate >= this.hackathonApplicationStartDate &&
      this.currentDate <= this.hackathonApplicationEndDate
    ) {
      this.hackathonStatus = 'Outgoing';
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const difference = this.hackathonApplicationEndDate.getTime() - this.currentDate.getTime();
      this.daysLeft = Math.ceil(difference / millisecondsPerDay);
    } else if (this.currentDate > this.hackathonApplicationEndDate) {
      this.hackathonStatus = 'Closed';
    }
  }

  fetchInterestedMembers() {
    this.hackathonService.pInterestedUsers(this.hackathon.id).subscribe((data) => {
      this.users = data.users;
      this.totalUsers = data.total_count;
    });
  }
}
