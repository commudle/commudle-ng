import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsListComponent } from './components/blogs/blogs-list.component';

const routes: Routes = [
  {
    path: '',
    component: BlogsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicBlogsRoutingModule {}
