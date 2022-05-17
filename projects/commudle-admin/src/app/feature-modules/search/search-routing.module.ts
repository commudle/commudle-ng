import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchPageComponent } from './components/search-page/search-page.component';

const routes = [
  {
    path: '',
    component: SearchPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
