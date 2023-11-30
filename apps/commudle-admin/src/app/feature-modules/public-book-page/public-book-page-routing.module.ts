import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookPageComponent } from 'apps/commudle-admin/src/app/feature-modules/public-book-page/components/book-page/book-page.component';

const routes: Routes = [{ path: '', component: BookPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicBookPageRoutingModule {}
