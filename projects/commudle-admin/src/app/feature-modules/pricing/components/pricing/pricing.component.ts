import { Component, OnInit } from '@angular/core';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  logoCloud: { image: string; name: string; slug: string }[] = [
    {
      name: 'GDG New Delhi',
      slug: 'gdg-new-delhi',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbmNlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1931d8ac25e32d52949f7069bfa3ceaf01db6524/gdg_new_delhi.png',
    },
    {
      name: 'Women Who Code Delhi',
      slug: 'women-who-code-delhi',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbmdlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0eea224f77b91c395fe673164ee631209119061b/women_who_code_delhi.jpg',
    },
    {
      name: 'Voice First India',
      slug: 'voice-first-india',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbmtlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--91fa65611243731b0634dde7543ce281bc0efcc0/voice_first_india.png',
    },
    {
      name: 'AWS User Group Punjab',
      slug: 'aws-user-group-punjab',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbm9lIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--eb88ade542fb4c46b4e706041a558052b04e4221/aws_user_group_punjab.png',
    },
    {
      name: 'AeoLogic',
      slug: 'aeologic',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbnNlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5bcee4c04c89e3a69bc3cf14341b272d746fd560/aeologic.png',
    },
    {
      name: 'CodeChef SRM Chennai',
      slug: 'codechef-srm-chennai',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbndlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d397a7bbae81d16d5da6e8a7574573d7ad90602b/codechef_srm_chennai.png',
    },
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setTags(
      'Pricing: Students, DevRels, Startups',
      'Host all your developer community activities from events, member profiles, 1:1 communications, forums, channels and more, all at one place on Commudle',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
