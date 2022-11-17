import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserProfileManagerService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
import { IUser } from 'projects/shared-models/user.model';
import { staticAssets } from 'projects/commudle-admin/src/assets/static-assets';
import { Subscription } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-hiring-looking-works-tags',
  templateUrl: './hiring-looking-works-tags.component.html',
  styleUrls: ['./hiring-looking-works-tags.component.scss'],
})
export class HiringLookingWorksTagsComponent implements OnInit, AfterViewInit, OnDestroy {
  user: IUser;
  staticAssets = staticAssets;

  subscriptions: Subscription[] = [];

  @ViewChild('animeWorkHiring', { static: false }) animeWorkHiringContainer: ElementRef<HTMLDivElement>;

  constructor(private userProfileManagerService: UserProfileManagerService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.userProfileManagerService.user$.subscribe((data) => {
        this.user = data;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  ngAfterViewInit(): void {
    import('lottie-web').then((l) => {
      l.default.loadAnimation({
        container: this.animeWorkHiringContainer.nativeElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://assets7.lottiefiles.com/packages/lf20_3lol1shu/json files/json file.json',
      });
    });
  }
}
