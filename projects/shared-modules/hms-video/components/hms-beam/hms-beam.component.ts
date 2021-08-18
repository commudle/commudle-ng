import { selectIsConnectedToRoom } from '@100mslive/hms-video-store';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HmsApiService } from 'projects/shared-modules/hms-video/services/hms-api.service';
import { hmsActions, hmsStore } from 'projects/shared-modules/hms-video/stores/hms.store';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';

@Component({
  selector: 'app-hms-beam',
  templateUrl: './hms-beam.component.html',
  styleUrls: ['./hms-beam.component.scss'],
})
export class HmsBeamComponent implements OnInit {
  // authToken: string;
  roomId: string;
  authToken: string;

  // hmsClient: IHmsClient;
  // currentUser: ICurrentUser;

  constructor(
    private activatedRoute: ActivatedRoute,
    private hmsApiService: HmsApiService,
    private httpClient: HttpClient,
    private apiRoutesService: ApiRoutesService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((value: Params) => {
      this.authToken = value.authToken;
      this.roomId = value.roomId;

      this.joinRoom();

      // this.getClientToken();
      // this.getUser().subscribe((value: any) => (this.currentUser = value.user));
    });

    // hmsStore.subscribe((value: boolean) => {
    //   console.log(value);
    // }, selectIsConnectedToRoom);
  }

  joinRoom(): void {
    hmsActions.join({
      authToken: this.authToken,
      userName: 'commudle-beam',
    });
  }

  // getClientToken(): void {
  //   this.hmsApiService.getClientTokenV2(this.roomId).subscribe((value: IHmsClient) => (this.hmsClient = value));
  // }

  // getUser(): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${this.authToken}`,
  //   });
  //   return this.httpClient.post<any>(
  //     this.apiRoutesService.getRoute(API_ROUTES.VERIFY_AUTHENTICATION),
  //     {},
  //     { headers: headers },
  //   );
  // }
}
