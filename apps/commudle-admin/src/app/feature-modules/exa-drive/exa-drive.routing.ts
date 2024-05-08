import { Routes, RouterModule } from '@angular/router';
import { ExaDrivePageComponent } from 'apps/commudle-admin/src/app/feature-modules/exa-drive/components/exa-drive-page/exa-drive-page.component';

const routes: Routes = [
  {
    path: '',
    component: ExaDrivePageComponent,
  },
];

export const ExaDriveRoutes = RouterModule.forChild(routes);
