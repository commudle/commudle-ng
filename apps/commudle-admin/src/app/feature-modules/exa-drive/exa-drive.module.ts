import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExaDriveRoutes } from 'apps/commudle-admin/src/app/feature-modules/exa-drive/exa-drive.routing';
import { ExaDrivePageComponent } from 'apps/commudle-admin/src/app/feature-modules/exa-drive/exa-drive-page/exa-drive-page.component';
import { NbCardModule } from '@commudle/theme';

@NgModule({
  imports: [CommonModule, ExaDriveRoutes, NbCardModule],
  declarations: [ExaDrivePageComponent],
})
export class ExaDriveModule {}
