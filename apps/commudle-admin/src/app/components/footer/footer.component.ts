import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';

import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements AfterViewChecked {
  showFooter = true;
  staticAssets = staticAssets;

  constructor(private footerService: FooterService, private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    this.footerService.footerStatus$.subscribe((value) => (this.showFooter = value));
    this.cdr.detectChanges();
  }
}
