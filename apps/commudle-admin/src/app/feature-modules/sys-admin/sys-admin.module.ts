import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTagModule,
  NbToggleModule,
  NbWindowModule,
} from '@commudle/theme';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { AdminBadgesAssignComponent } from './components/admin-badges/admin-badges-assign/admin-badges-assign.component';
import { AdminBadgesFormComponent } from './components/admin-badges/admin-badges-form/admin-badges-form.component';
import { AdminBadgesListComponent } from './components/admin-badges/admin-badges-list/admin-badges-list.component';
import { AdminBadgesComponent } from './components/admin-badges/admin-badges.component';
import { AdminFeaturedCommunitiesComponent } from './components/admin-featured-communities/admin-featured-communities.component';
import { AdminPageAdsFormComponent } from './components/admin-page-ads/admin-page-ads-form/admin-page-ads-form.component';
import { AdminPageAdsListComponent } from './components/admin-page-ads/admin-page-ads-list/admin-page-ads-list.component';
import { AdminPageAdsComponent } from './components/admin-page-ads/admin-page-ads.component';
import { AdminStaticAssetsListComponent } from './components/admin-static-assets/admin-static-assets-list/admin-static-assets-list.component';
import { AdminStaticAssetsComponent } from './components/admin-static-assets/admin-static-assets.component';
import { AdminSurveysComponent } from './components/admin-surveys/admin-surveys.component';
import { CommunityBuildsComponent } from './components/community-builds/community-builds.component';
import { CommunityControlsComponent } from './components/community-controls/community-controls.component';
import { LabsComponent } from './components/labs/labs.component';
import { SysAdminRoutingModule } from './sys-admin-routing.module';
import { SysAdminComponent } from './sys-admin.component';
import { AdminStaticAssetFormComponent } from './components/admin-static-assets/admin-static-asset-form/admin-static-asset-form.component';

@NgModule({
  declarations: [
    SysAdminComponent,
    AdminSurveysComponent,
    CommunityBuildsComponent,
    LabsComponent,
    CommunityControlsComponent,
    AdminFeaturedCommunitiesComponent,
    AdminPageAdsComponent,
    AdminPageAdsListComponent,
    AdminPageAdsFormComponent,
    AdminBadgesComponent,
    AdminBadgesListComponent,
    AdminBadgesFormComponent,
    AdminBadgesAssignComponent,
    AdminStaticAssetsComponent,
    AdminStaticAssetsListComponent,
    AdminStaticAssetFormComponent,
  ],
  imports: [
    CommonModule,
    SysAdminRoutingModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedDirectivesModule,
    SharedPipesModule,
    MiniUserProfileModule,

    // Nebular
    NbCardModule,
    NbWindowModule,
    NbIconModule,
    NbButtonModule,
    NbListModule,
    NbSelectModule,
    NbTabsetModule,
    NbToggleModule,
    NbInputModule,
    NbAutocompleteModule,
    NbSpinnerModule,
    NbInputModule,
    NbTagModule,
  ],
})
export class SysAdminModule {}
