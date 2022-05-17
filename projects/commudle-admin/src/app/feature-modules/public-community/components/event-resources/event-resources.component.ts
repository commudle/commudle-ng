import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-resources',
  templateUrl: './event-resources.component.html',
  styleUrls: ['./event-resources.component.scss']
})
export class EventResourcesComponent implements OnInit {
  // moment = moment;
  // community: ICommunity;
  // speakerResources: ISpeakerResource[];
  // sanitizedResources = {};
  //
  // constructor(
  //   private activatedRoute: ActivatedRoute,
  //   private speakerResourcesService: SpeakerResourcesService,
  //   private seoService : SeoService,
  //   
  //   private sanitizer: DomSanitizer
  // ) { }
  //
  // setMeta() {
  //   this.seoService.setTitle(`Past Event Sessions | ${this.community.name}`);
  //   this.meta.updateTag({ name: 'og:title', content: `Past Event Sessions | ${this.community.name}` });
  //   this.meta.updateTag({ name: 'twitter:title', content: `Past Expert Sessions | ${this.community.name}` });
  // }
  //
  ngOnInit() {
    //   this.activatedRoute.parent.data.subscribe(data => {
    //     this.community = data.community;
    //     this.setMeta();
    //     if (this.community) {
    //       this.getResources();
    //     }
    //   });
  }

  //
  //
  // getResources() {
  //   this.speakerResourcesService.pCommunitySpeakerResources(this.community.id).subscribe(
  //     data => {
  //       this.speakerResources = data.speaker_resources;
  //
  //       for (const spr of this.speakerResources) {
  //         if (spr.embedded_content) {
  //           this.sanitizedResources[`${spr.id}`] = this.sanitizer.bypassSecurityTrustHtml(spr.embedded_content);
  //         }
  //       }
  //     }
  //   );
  // }


}
