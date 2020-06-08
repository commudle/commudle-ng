import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { NbSidebarService } from '@nebular/theme';
import { CommunitiesService } from '../../services/communities.service';
import { ICommunity } from 'projects/shared-models/community.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: ICurrentUser;
  communities: ICommunity[] = [];
  shineIndex = 0;

  photoGrid = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authWatchService: LibAuthwatchService,
    private communitiesService: CommunitiesService

  ) { }

  ngOnInit() {
    this.authWatchService.currentUser$.subscribe(currentUser => this.currentUser = currentUser);
    this.getCommunities();
  }

  login() {
    this.document.location.href = `https://auther.commudle.com/?back_to=${encodeURIComponent(window.location.href)}`;
  }


  getCommunities() {
    this.communitiesService.pGetCommunities().subscribe(
      data => {
        this.communities = data.communities;
        this.randomShine();
      }
    );
  }

  randomShine() {
    setInterval(() => {
      this.shineIndex = Math.floor(Math.random() * this.communities.length) + 0;
    }, 1000);
  }

}
