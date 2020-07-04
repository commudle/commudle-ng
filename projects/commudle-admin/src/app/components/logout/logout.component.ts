import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authWatchService: LibAuthwatchService,
    // private router: Router
  ) { }

  ngOnInit() {
    this.authWatchService.signOut().subscribe();
    this.document.location.href = '/';

  }

}
