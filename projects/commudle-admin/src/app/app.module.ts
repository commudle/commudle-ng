import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiParserResponseInterceptor } from 'projects/shared-services/api-parser-response.interceptor';
import { AuthTokenInterceptor } from 'projects/shared-services/lib-authwatch-token.interceptor';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
  NbSidebarService,
  NbCardModule,
  NbRouteTabsetModule,
  NbInputModule,
  NbCheckboxModule,
  NbSelectModule,
  NbDatepickerModule,
  NbRadioModule,
  NbUserModule,
  NbMenuModule,
  NbContextMenuModule,
  NbIconModule,
  NbListModule,
  NbTooltipModule,
  NbWindowModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgModule } from '@angular/core';
import { LibErrorHandlerModule } from 'projects/lib-error-handler/src/public-api';
import { CommunityComponent } from './components/organizer-communities-list/community/community.component';
import { OrganizerCommunitiesListComponent } from './components/organizer-communities-list/organizer-communities-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommunityControlPanelComponent } from './components/community-control-panel/community-control-panel.component';
import { CommunityFormsListComponent } from './components/community-control-panel/community-forms-list/community-forms-list.component';
import { CommunityEventsListComponent } from './components/community-control-panel/community-events-list/community-events-list.component';
import { CommunityEditDetailsComponent } from './components/community-control-panel/community-edit-details/community-edit-details.component';
import { CommunityTeamComponent } from './components/community-control-panel/community-team/community-team.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Ng2SmartTableModule } from "ng2-smart-table";
import { Ng2CompleterModule } from 'ng2-completer';
import { CommunityFormsListStatsComponent } from './components/community-control-panel/community-forms-list/community-forms-list-stats/community-forms-list-stats.component';
import { CommunityFormsListActionsComponent } from './components/community-control-panel/community-forms-list/community-forms-list-actions/community-forms-list-actions.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { EmailerComponent } from './components/emailer/emailer.component';
import { HomeComponent } from './components/home/home.component';
import { HomeCommunityComponent } from './components/home-community/home-community.component';
import { FillDataFormComponent } from './components/fill-data-form/fill-data-form.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { CookieService } from 'ngx-cookie-service';
import { BasicUserProfileComponent } from './components/common/basic-user-profile/basic-user-profile.component';
import { FillableFormComponent } from './components/common/fillable-form/fillable-form.component';
import { SpeakerResourceFormComponent } from './components/speaker-resource-form/speaker-resource-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OrganizerCommunitiesListComponent,
    CommunityComponent,
    CommunityControlPanelComponent,
    CommunityFormsListComponent,
    CommunityEventsListComponent,
    CommunityEditDetailsComponent,
    CommunityTeamComponent,
    CommunityFormsListStatsComponent,
    CommunityFormsListActionsComponent,
    EmailerComponent,
    HomeComponent,
    HomeCommunityComponent,
    FillDataFormComponent,
    LogoutComponent,
    SidebarMenuComponent,
    BasicUserProfileComponent,
    FillableFormComponent,
    SpeakerResourceFormComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    EditorModule,


    // external service modules
    LibErrorHandlerModule,
    NgxMaterialTimepickerModule,


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

    //other external npm modules
    Ng2CompleterModule,
    Ng2SmartTableModule,

  ],
  providers: [
    Title,
    CookieService,
    NbSidebarService,
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
  entryComponents: [
    CommunityFormsListStatsComponent,
    CommunityFormsListActionsComponent,
    EmailerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
