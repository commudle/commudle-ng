import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IUser } from 'projects/shared-models/user.model';
import { staticAssets } from 'projects/commudle-admin/src/assets/static-assets';

@Component({
  selector: 'app-hiring-looking-works-tags',
  templateUrl: './hiring-looking-works-tags.component.html',
  styleUrls: ['./hiring-looking-works-tags.component.scss'],
})
export class HiringLookingWorksTagsComponent implements OnInit, AfterViewInit {
  @Input() user: IUser;
  staticAssets = staticAssets;

  // @ViewChild('animeWorkHiring', { static: false }) animeWorkHiringContainer: ElementRef<HTMLDivElement>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // import('lottie-web').then((l) => {
    //   l.default.loadAnimation({
    //     container: this.animeWorkHiringContainer.nativeElement,
    //     renderer: 'svg',
    //     loop: true,
    //     autoplay: true,
    //     path: 'https://assets7.lottiefiles.com/packages/lf20_3lol1shu/json files/json file.json',
    //   });
    // });
  }
}
