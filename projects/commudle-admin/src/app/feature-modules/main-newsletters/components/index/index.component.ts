import { Component, OnInit } from '@angular/core';
import { IMainNewsletter } from 'projects/shared-models/main-newsletter.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  newsletters: IMainNewsletter[];

  constructor() { }

  ngOnInit(): void {
  }



  setMeta() {
    
  }

}
