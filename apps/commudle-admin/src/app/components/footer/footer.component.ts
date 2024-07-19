import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { FooterService } from 'apps/commudle-admin/src/app/services/footer.service';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements AfterViewChecked {
  showMiniFooter = true;
  showFooter = false;
  staticAssets = staticAssets;
  faYoutube = faYoutube;

  constructor(private footerService: FooterService, private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked(): void {
    this.footerService.footerStatus$.subscribe((value) => (this.showFooter = value));
    this.footerService.miniFooterStatus$.subscribe((value) => (this.showMiniFooter = value));
    this.cdr.detectChanges();
  }
}
