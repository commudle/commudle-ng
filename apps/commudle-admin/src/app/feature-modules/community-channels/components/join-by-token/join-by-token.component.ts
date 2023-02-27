// TODO to be deprecated, move this to a popup which appears on the channel page itself
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityChannelsService } from '../../services/community-channels.service';

@Component({
  selector: 'app-join-by-token',
  templateUrl: './join-by-token.component.html',
  styleUrls: ['./join-by-token.component.scss']
})
export class JoinByTokenComponent implements OnInit {
  joined = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityChannelsService: CommunityChannelsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.verifyToken();
  }


  verifyToken() {
    this.communityChannelsService.joinByToken(this.activatedRoute.snapshot.params.token).subscribe(
      data => {
        this.joined = true;
        this.router.navigate(['/communities', this.activatedRoute.snapshot.params.community_id, 'channels', data]);
      }
    )
  }

}
