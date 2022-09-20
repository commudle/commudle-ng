import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedComponentsModule } from '@commudle/shared-components';
import { SharedDirectivesModule } from '@commudle/shared-directives';
import { environment } from '@commudle/shared-environments';
import { MiniUserProfileModule, PageAdsModule, SharedModulesModule } from '@commudle/shared-modules';
import { SharedPipesModule } from '@commudle/shared-pipes';
import { IsBrowserService, PrismJsHighlightCodeService } from '@commudle/shared-services';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbEvaIconsModule } from '@nebular/eva-icons';
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
  NbTooltipModule,
  NbUserModule,
  NbWindowModule,
} from '@nebular/theme';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppSharedComponentsModule } from './app-shared-components/app-shared-components.module';
import { AppComponent } from './app.component';
import { AboutOldComponent } from './components/about-old/about-old.component';
import { AboutComponent } from './components/about/about.component';
import { CommunitiesAboutComponent } from './components/communities/communities-about/communities-about.component';
import { CommunitiesFeaturedComponent } from './components/communities/communities-featured/communities-featured.component';
import { CommunitiesListCardComponent } from './components/communities/communities-list/communities-list-card/communities-list-card.component';
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
import { ErrorHandlerModule } from './feature-modules/error-handler/error-handler.module';
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
import { ApiParserResponseInterceptor } from './interceptors/api-parser-response.interceptor';
import { AuthTokenInterceptor } from './interceptors/lib-authwatch-token.interceptor';
import { AppInitService } from './services/app-init.service';

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
    CommunitiesListCardComponent,
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
  ],
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
    SharedDirectivesModule,
    NotificationsModule,
    RecommendationsModule,
    SearchModule,
    SharedModulesModule,
    ErrorHandlerModule,

    // Nebular modules
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

    // Other external npm modules
    Angular2SmartTableModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    PageAdsModule,
    MiniUserProfileModule,
  ],
  providers: [
    AppInitService,
    Title,
    CookieService,
    NbSidebarService,
    IsBrowserService,
    PrismJsHighlightCodeService,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
