import { Component, OnInit } from '@angular/core';
import { SeoService } from 'apps/shared-services/seo.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';

@Component({
  selector: 'commudle-student-non-profit-community-support',
  templateUrl: './student-non-profit-community-support.component.html',
  styleUrls: ['./student-non-profit-community-support.component.scss'],
})
export class StudentNonProfitCommunitySupportComponent implements OnInit {
  faStar = faStar;

  questions = [
    'Will I have access to the online stage with streaming/recording feature in this plan?',
    'Does Commudle own my community because it is in the free plan?',
    'Can I create a non tech community on Commudle?',
    'What help will I get in promoting my new community?',
    'I am a student building a startup, can I apply for this plan?',
  ];

  answers = [
    'Yes, it is included in the plan, there is no limit to the number of live attendees. All the features including chats, qna and polls are also included.',
    "The answer is No. The organizers of the community own the rights to grant access to their team and make changes as per their convenience to how they drive their community activities. There are hundred's of such independently run communities on Commudle. We provide the platform which helps your community to grow.",
    'Commudle is built specifically for tech communities, this includes software developers, designers, cloud professionals, data science professionals and more.',
    'Once you start with engagements like events, channels, forums, newsletters in your community, we will help you increase the outreach by facilitating collaborations between your community and others present on Commudle. This gives a great boost when you are starting out.',
    'Yes! As long as your community is free to join and engage with, we are here to support you.',
  ];
  constructor(private seoService: SeoService, private footerService: FooterService) {}

  ngOnInit(): void {
    this.footerService.changeFooterStatus(true);
    this.seoService.setTags(
      'Student & Non Profit Community Support',
      'Building a community on Commudle is free for students and non profits. All features including events, video stage, QR code, channels, member management, projects, tutorials and more are free',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  ngOnDestroy(): void {
    this.footerService.changeFooterStatus(false);
  }
}
