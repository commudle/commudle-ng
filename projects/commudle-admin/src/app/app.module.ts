import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiParserResponseInterceptor} from 'projects/shared-services/api-parser-response.interceptor';
import {AuthTokenInterceptor} from 'projects/shared-services/lib-authwatch-token.interceptor';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {
  NbAccordionModule,
  NbActionsModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbRadioModule,
  NbRouteTabsetModule,
  NbSelectModule,
  NbSidebarModule,
  NbSidebarService,
  NbSpinnerModule,
  NbTabsetModule,
  NbThemeModule,
  NbTimepickerModule,
  NbToastrModule,
  NbTooltipModule,
  NbUserModule,
  NbWindowModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {LibErrorHandlerModule} from 'projects/lib-error-handler/src/public-api';
import {CommunityComponent} from './components/organizer-communities-list/community/community.component';
import {OrganizerCommunitiesListComponent} from './components/organizer-communities-list/organizer-communities-list.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditorModule} from '@tinymce/tinymce-angular';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {Ng2CompleterModule} from 'ng2-completer';
import {HomeComponent} from './components/home/home.component';
import {FillDataFormComponent} from './components/fill-data-form/fill-data-form.component';
import {LogoutComponent} from './components/logout/logout.component';
import {SidebarMenuComponent} from './components/sidebar-menu/sidebar-menu.component';
import {CookieService} from 'ngx-cookie-service';
import {SpeakerResourceFormComponent} from './components/speaker-resource-form/speaker-resource-form.component';
import {AppInitService} from './services/app-init.service';
import {SharedComponentsModule} from 'projects/shared-components/shared-components.module';
import {AppSharedComponentsModule} from './app-shared-components/app-shared-components.module';
import {PrismJsHighlightCodeService} from 'projects/shared-services/prismjs-highlight-code.service';
import {ReusableComponentsModule} from './feature-modules/reusable-components/reusable-components.module';
import {AboutComponent} from './components/home/about/about.component';
import {FeaturesComponent} from './components/home/features/features.component';
import {CommunitiesComponent} from './components/home/communities/communities.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {SwUpdateComponent} from './components/sw-update/sw-update.component';
import {HomeCommunityCardComponent} from './components/home/communities/home-community-card/home-community-card.component';
import {SharedPipesModule} from 'projects/shared-pipes/pipes.module';
import {CommunityChannelsModule} from './feature-modules/community-channels/community-channels.module';
import {UserChatsModule} from './feature-modules/user-chats/user-chats.module';
import {UsersModule} from 'projects/commudle-admin/src/app/feature-modules/users/users.module';
import {HomeEventsComponent} from './components/home/components/home-events/home-events.component';
import {HomeEventsCardComponent} from './components/home/components/home-events/home-events-card/home-events-card.component';
import {HomeLabsComponent} from './components/home/components/home-labs/home-labs.component';
import {HomeCommunitiesComponent} from './components/home/components/home-communities/home-communities.component';
import {HomeBuildsComponent} from './components/home/components/home-builds/home-builds.component';
import {HomeBuildsCardComponent} from './components/home/components/home-builds/home-builds-card/home-builds-card.component';
import {HomeExpertsComponent} from './components/home/components/home-experts/home-experts.component';
import {HomePromotionsComponent} from './components/home/components/home-promotions/home-promotions.component';
import {NavbarMenuComponent} from './components/navbar-menu/navbar-menu.component';
import {SkeletonScreensModule} from './feature-modules/skeleton-screens/skeleton-screens.module';
import {PublicCommunityModule} from './feature-modules/public-community/public-community.module';
import {HomeHeadBannerComponent} from './components/home/components/home-head-banner/home-head-banner.component';
import {HomeExternalFeedLinksComponent} from './components/home/components/home-external-feed-links/home-external-feed-links.component';
import {LabsModule} from 'projects/commudle-admin/src/app/feature-modules/labs/labs.module';
import {SearchBarComponent} from 'projects/commudle-admin/src/app/components/search-bar/search-bar.component';
import {MainNewslettersModule} from './feature-modules/main-newsletters/main-newsletters.module';

export function initApp(appInitService: AppInitService) {
  return () => appInitService.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
    OrganizerCommunitiesListComponent,
    CommunityComponent,
    HomeComponent,
    FillDataFormComponent,
    LogoutComponent,
    SidebarMenuComponent,
    SpeakerResourceFormComponent,
    AboutComponent,
    FeaturesComponent,
    CommunitiesComponent,
    SwUpdateComponent,
    HomeCommunityCardComponent,
    HomeEventsComponent,
    HomeEventsCardComponent,
    HomeLabsComponent,
    HomeCommunitiesComponent,
    HomeBuildsComponent,
    HomeBuildsCardComponent,
    HomeExpertsComponent,
    HomePromotionsComponent,
    NavbarMenuComponent,
    HomeHeadBannerComponent,
    HomeExternalFeedLinksComponent,
    SearchBarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    AppSharedComponentsModule,
    SharedComponentsModule,
    ReusableComponentsModule,
    SharedPipesModule,
    UserChatsModule,
    UsersModule,
    LabsModule,
    CommunityChannelsModule,
    SkeletonScreensModule,
    PublicCommunityModule,
    MainNewslettersModule,

    // external service modules
    LibErrorHandlerModule,

    // Nebula modules
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule,
    NbButtonModule,
    NbCardModule,
    NbRouteTabsetModule,
    NbInputModule,
    NbCheckboxModule,
    NbSelectModule,
    NbDatepickerModule.forRoot(),
    NbRadioModule,
    NbUserModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbIconModule,
    NbListModule,
    NbTooltipModule,
    NbWindowModule.forRoot(),
    NbAccordionModule,
    NbBadgeModule,
    NbTabsetModule,
    NbToastrModule.forRoot(),
    NbFormFieldModule,
    NbDialogModule.forRoot(),
    NbSpinnerModule,
    NbTimepickerModule.forRoot(),
    NbActionsModule,

    // Other external npm modules
    Ng2CompleterModule,
    Ng2SmartTableModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    AppInitService,
    Title,
    CookieService,
    NbSidebarService,
    PrismJsHighlightCodeService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp, deps: [AppInitService],
      multi: true
    },
    {
      // TODO move the interceptors to a common barrel file if needed
      // https://angular.io/guide/http#provide-the-interceptor
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiParserResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
