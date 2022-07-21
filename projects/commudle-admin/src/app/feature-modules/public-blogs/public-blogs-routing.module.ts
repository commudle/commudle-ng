import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { BlogsListComponent } from './components/blogs-list/blogs-list.component';

const routes: Routes = [
  {
    path: '',
    component: BlogsListComponent,
  },
  {
    path: ':id',
    component: BlogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicBlogsRoutingModule {}
