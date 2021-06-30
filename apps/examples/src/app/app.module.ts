import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DialogConfirmModule } from './core/dialog-confirm/dialog-confirm.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'users'},
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
      { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule)}
    ]),
    DialogConfirmModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
