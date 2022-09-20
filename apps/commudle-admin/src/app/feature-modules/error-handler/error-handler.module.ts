import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule } from "@nebular/theme";
import { ErrorComponent } from './components/error/error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent, ErrorComponent],
  imports: [CommonModule, RouterModule, NbCardModule, NbButtonModule],
  exports: [NotFoundComponent, ErrorComponent],
})
export class ErrorHandlerModule {}
