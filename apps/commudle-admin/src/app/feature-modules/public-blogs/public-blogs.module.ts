import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsListComponent } from './components/blogs-list/blogs-list.component';
import { PublicBlogsRoutingModule } from './public-blogs-routing.module';
import { NbEvaIconsModule } from '@commudle/eva-icons';
import { NbButtonModule, NbCardModule, NbIconModule, NbSpinnerModule } from '@commudle/theme';
import { BlogComponent } from './components/blog/blog.component';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [BlogsListComponent, BlogComponent, BlogCardComponent],
  imports: [
    CommonModule,
    PublicBlogsRoutingModule,
    NbEvaIconsModule,
    NbCardModule,
    NbIconModule,
    NbSpinnerModule,
    NbButtonModule,
    MiniUserProfileModule,
    SharedComponentsModule,
    FontAwesomeModule,
  ],
})
export class PublicBlogsModule {}
