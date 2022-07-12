import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsListComponent } from './components/blogs-list/blogs-list.component';
import { PublicBlogsRoutingModule } from './public-blogs-routing.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { BlogComponent } from './components/blog/blog.component';
import { MiniUserProfileModule } from 'projects/shared-modules/mini-user-profile/mini-user-profile.module';
@NgModule({
  declarations: [BlogsListComponent, BlogComponent],
  imports: [
    CommonModule,
    PublicBlogsRoutingModule,
    NbEvaIconsModule,
    NbCardModule,
    NbIconModule,
    NbSpinnerModule,
    NbButtonModule,
    MiniUserProfileModule,
  ],
})
export class PublicBlogsModule {}
