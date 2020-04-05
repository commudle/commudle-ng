import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiParserResponseInterceptor } from 'projects/shared-services/api-parser-response.interceptor';
import { AuthTokenInterceptor } from 'projects/shared-services/lib-authwatch-token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
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
  NbInputModule} from '@nebular/theme';
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
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NbInputModule,
    EditorModule,


    // external service modules
    LibErrorHandlerModule,

    // Nebula modules
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule,
    NbButtonModule,
    NbCardModule,
    NbRouteTabsetModule,

  ],
  providers: [
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
  bootstrap: [AppComponent]
})
export class AppModule { }
