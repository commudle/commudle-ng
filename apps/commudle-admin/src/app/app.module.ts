import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthModule, AuthService, AuthServiceConfig, GoogleLoginProvider } from '@commudle/auth';
import { NbEvaIconsModule } from '@commudle/eva-icons';
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
  NbPopoverModule,
  NbRadioModule,
  NbRouteTabsetModule,
  NbSelectModule,
  NbSidebarModule,
  NbSidebarService,
  NbSpinnerModule,
  NbStepperModule,
  NbTabsetModule,
  NbTagModule,
  NbThemeModule,
  NbTimepickerModule,
  NbToastrModule,
  NbToggleModule,
  NbTooltipModule,
  NbUserModule,
  NbWindowModule,
  NbAutocompleteModule,
} from '@commudle/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { LibErrorHandlerModule } from 'apps/lib-error-handler/src/public-api';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { ApiParserResponseInterceptor } from 'apps/shared-interceptors/api-parser-response.interceptor';
import { AuthTokenInterceptor } from 'apps/shared-interceptors/lib-authwatch-token.interceptor';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { PageAdsModule } from 'apps/shared-modules/page-ads/page-ads.module';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { IsBrowserService } from 'apps/shared-services/is-browser.service';
import { PrismJsHighlightCodeService } from 'apps/shared-services/prismjs-highlight-code.service';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppSharedComponentsModule } from './app-shared-components/app-shared-components.module';
import { AppComponent } from './app.component';
import { AboutOldComponent } from './components/about-old/about-old.component';
import { AboutComponent } from './components/about/about.component';
import { CommunitiesAboutComponent } from './components/communities/communities-about/communities-about.component';
import { CommunitiesFeaturedComponent } from './components/communities/communities-featured/communities-featured.component';
import { CommunitiesListComponent } from './components/communities/communities-list/communities-list.component';
import { CommunitiesPostsComponent } from './components/communities/communities-posts/communities-posts.component';
import { CommunitiesComponent } from './components/communities/communities.component';
import { FillDataFormComponent } from './components/fill-data-form/fill-data-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeBuildsCardComponent } from './components/home/components/home-builds/home-builds-card/home-builds-card.component';
import { HomeBuildsComponent } from './components/home/components/home-builds/home-builds.component';
import { HomeCommunitiesComponent } from './components/home/components/home-communities/home-communities.component';
import { HomeEventsCardComponent } from './components/home/components/home-events/home-events-card/home-events-card.component';
import { HomeEventsComponent } from './components/home/components/home-events/home-events.component';
import { HomeExpertsComponent } from './components/home/components/home-experts/home-experts.component';
import { HomeExternalFeedLinksComponent } from './components/home/components/home-external-feed-links/home-external-feed-links.component';
import { HomeHeadBannerComponent } from './components/home/components/home-head-banner/home-head-banner.component';
import { HomeLabsComponent } from './components/home/components/home-labs/home-labs.component';
import { HomePromotionsComponent } from './components/home/components/home-promotions/home-promotions.component';
import { FeaturesComponent } from './components/home/features/features.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavbarMenuComponent } from './components/navbar-menu/navbar-menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommunityComponent } from './components/organizer-communities-list/community/community.component';
import { OrganizerCommunitiesListComponent } from './components/organizer-communities-list/organizer-communities-list.component';
import { CircularProgressiveBarComponent } from './components/profile-status-bar/circular-progressive-bar/circular-progressive-bar.component';
import { ProfileStatusBarComponent } from './components/profile-status-bar/profile-status-bar.component';
import { PushNotificationComponent } from './components/push-notification/push-notification.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { SpeakerResourceFormComponent } from './components/speaker-resource-form/speaker-resource-form.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { SwUpdateComponent } from './components/sw-update/sw-update.component';
import { CommunityChannelsModule } from './feature-modules/community-channels/community-channels.module';
import { LabsModule } from './feature-modules/labs/labs.module';
import { MainNewslettersModule } from './feature-modules/main-newsletters/main-newsletters.module';
import { NotificationsModule } from './feature-modules/notifications/notifications.module';
import { PublicCommunityModule } from './feature-modules/public-community/public-community.module';
import { RecommendationsModule } from './feature-modules/recommendations/recommendations.module';
import { ReusableComponentsModule } from './feature-modules/reusable-components/reusable-components.module';
import { SearchModule } from './feature-modules/search/search.module';
import { SkeletonScreensModule } from './feature-modules/skeleton-screens/skeleton-screens.module';
import { UserChatsModule } from './feature-modules/user-chats/user-chats.module';
import { UsersModule } from './feature-modules/users/users.module';
import { AppInitService } from './services/app-init.service';
import { CommunitiesCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/communities-card/communities-card.component';
import { LoginConsentPopupComponent } from './components/login-consent-popup/login-consent-popup.component';
import { ListingPagesLayoutComponent } from 'apps/commudle-admin/src/app/app-shared-components/listing-pages-layout/listing-pages-layout.component';
import { PublicHomeListSpeakersModule } from 'apps/commudle-admin/src/app/feature-modules/listing-pages/public-home-list-speakers/public-home-list-speakers.module';
import { PublicHomeListEventsModule } from 'apps/commudle-admin/src/app/feature-modules/listing-pages/public-home-list-events/public-home-list-events.module';
import { SkeletonVerticalCardsComponent } from './feature-modules/skeleton-screens/components/skeleton-vertical-cards/skeleton-vertical-cards.component';
import { InfiniteScrollModule } from 'apps/shared-modules/infinite-scroll/infinite-scroll.module';
import { FillDataFormPaidComponent } from './components/fill-data-form/fill-data-form-paid/fill-data-form-paid.component';
import { CheckFillDataFormComponent } from './components/fill-data-form/check-fill-data-form/check-fill-data-form.component';
import { NgxStripeModule } from 'ngx-stripe';
import { UserProfileComponent } from './app-shared-components/user-profile/user-profile.component';
import { UserprofileDetailsComponent } from 'apps/commudle-admin/src/app/feature-modules/homepage/components/homepage-dashboard/userprofile-details/userprofile-details.component';
import { HomepageModule } from 'apps/commudle-admin/src/app/feature-modules/homepage/homepage.module';

export function initApp(appInitService: AppInitService): () => Promise<any> {
  return () => appInitService.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
    OrganizerCommunitiesListComponent,
    CommunityComponent,
    CommunitiesAboutComponent,
    CommunitiesListComponent,
    CommunitiesPostsComponent,
    CommunitiesFeaturedComponent,
    HomeComponent,
    FillDataFormComponent,
    LogoutComponent,
    SidebarMenuComponent,
    SpeakerResourceFormComponent,
    AboutComponent,
    AboutOldComponent,
    FeaturesComponent,
    CommunitiesComponent,
    SwUpdateComponent,
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
    StepperComponent,
    ProfileStatusBarComponent,
    CircularProgressiveBarComponent,
    NavbarComponent,
    FooterComponent,
    PushNotificationComponent,
    LoginComponent,
    LoginConsentPopupComponent,
    FillDataFormPaidComponent,
    CheckFillDataFormComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
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
    PageAdsModule,
    SharedDirectivesModule,
    NotificationsModule,
    RecommendationsModule,
    SearchModule,
    MiniUserProfileModule,
    ListingPagesLayoutComponent,
    PublicHomeListSpeakersModule,
    PublicHomeListEventsModule,
    SkeletonVerticalCardsComponent,
    InfiniteScrollModule,
    HomepageModule,
    // external service modules
    LibErrorHandlerModule,
    AuthModule,
    // Nebula modules
    NbThemeModule.forRoot({ name: 'default' }),
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
    NbStepperModule,
    NbTagModule,
    NbPopoverModule,
    NbToggleModule,
    NbAutocompleteModule,

    // Other external npm modules
    Angular2SmartTableModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    //standalone component
    CommunitiesCardComponent,
    NgxStripeModule.forRoot(environment.stripe),
    UserProfileComponent,
  ],
  providers: [
    AppInitService,
    Title,
    CookieService,
    NbSidebarService,
    IsBrowserService,
    PrismJsHighlightCodeService,
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AppInitService],
      multi: true,
    },
    {
      // TODO move the interceptors to a common barrel file if needed
      // https://angular.io/guide/http#provide-the-interceptor
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiParserResponseInterceptor,
      multi: true,
    },
    {
      provide: 'AuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.google_client_id),
          },
        ],
      } as AuthServiceConfig,
    },
  ],
})
export class AppModule {}
