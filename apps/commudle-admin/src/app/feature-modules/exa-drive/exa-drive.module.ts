import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExaDriveRoutes } from 'apps/commudle-admin/src/app/feature-modules/exa-drive/exa-drive.routing';
import { ExaDrivePageComponent } from 'apps/commudle-admin/src/app/feature-modules/exa-drive/components/exa-drive-page/exa-drive-page.component';
import { NbButton, NbButtonModule, NbCardModule, NbDialogModule, NbTooltipModule } from '@commudle/theme';
import { CryptoCurrencyCardComponent } from 'apps/commudle-admin/src/app/feature-modules/exa-drive/components/crypto-currency-card/crypto-currency-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    ExaDriveRoutes,
    NbCardModule,
    NbTooltipModule,
    NbDialogModule,
    NbButtonModule,
    FontAwesomeModule,
  ],
  declarations: [ExaDrivePageComponent, CryptoCurrencyCardComponent],
})
export class ExaDriveModule {}
