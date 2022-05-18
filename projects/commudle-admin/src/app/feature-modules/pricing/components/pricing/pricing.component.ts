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
      name: '#VoiceFirst India',
      slug: 'voicefirst',
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
      name: 'Aeologic - Building Innovators',
      slug: 'aeologic-building-innovators',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbnNlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5bcee4c04c89e3a69bc3cf14341b272d746fd560/aeologic.png',
    },
    {
      name: 'CodeChef SRM Chennai',
      slug: 'codechef-srm-chennai',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbndlIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d397a7bbae81d16d5da6e8a7574573d7ad90602b/codechef_srm_chennai.png',
    },
    {
      name: 'Code Warriors',
      slug: 'code-warriors',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ1VmIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cabf8b38a9a79bb33d3163c4f9cda70a85e19e47/code_warriors.png',
    },
    {
      name: 'CDN Commudle Developer Network',
      slug: 'cdn-commudle-developer-network',
      image:
        'https://json.commudle.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ1lmIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d1aab5e1bd61349d5582ec309b13ea60f75dbfa3/cdn_commudle_developer_network.png',
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
