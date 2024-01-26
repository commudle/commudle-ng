import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EModelName } from '@commudle/shared-models';

@Component({
  selector: 'commudle-hackathon-control-panel-faqs',
  templateUrl: './hackathon-control-panel-faqs.component.html',
  styleUrls: ['./hackathon-control-panel-faqs.component.scss'],
})
export class HackathonControlPanelFaqsComponent implements OnInit {
  hackathonSlug = '';
  parentType = EModelName.HACKATHON;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.parent.paramMap.subscribe((params) => {
      this.hackathonSlug = params.get('hackathon_id');
    });
  }
}
