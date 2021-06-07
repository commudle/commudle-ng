import { Component, OnInit } from '@angular/core';
import { IMainNewsletter } from 'projects/shared-models/main-newsletter.model';
import { MainNewslettersService } from '../../services/main-newsletters.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  page = 1;
  count = 10;
  newsletters: IMainNewsletter[];
  isLoading = true;

  constructor(
    private mainNewsLettersService: MainNewslettersService
  ) { }

  ngOnInit(): void {
    this.getNewsLetters();
  }


  getNewsLetters() {
    this.isLoading = true;
    this.mainNewsLettersService.adminIndex(this.page, this.count).subscribe(
      data => {
        this.newsletters = data.main_newsletters;
        this.page+=1;
        this.isLoading = false;
      }
    )
  }



  setMeta() {

  }

}
