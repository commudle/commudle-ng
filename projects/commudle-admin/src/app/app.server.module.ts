import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ServerStateInterceptor } from 'projects/shared-interceptors/server-state.interceptor';
import { AppComponent } from './app.component';

import { AppModule } from './app.module';

@NgModule({
  imports: [AppModule, ServerModule, ServerTransferStateModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerStateInterceptor,
      multi: true,
    },
  ],
})
export class AppServerModule {}
