import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsListComponent } from './components/blogs/blogs-list.component';
import { PublicBlogsRoutingModule } from './public-blogs-routing.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbCardModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
@NgModule({
  declarations: [BlogsListComponent],
  imports: [CommonModule, PublicBlogsRoutingModule, NbEvaIconsModule, NbCardModule, NbIconModule, NbSpinnerModule],
})
export class PublicBlogsModule {}
