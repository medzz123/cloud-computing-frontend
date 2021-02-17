import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventComponent } from './event/event.component';
import { AccountComponent } from './account/account.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "event", component: EventComponent },
  { path: "account", component: AccountComponent },


  { path: "page-not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: "page-not-found", pathMatch: "full" }];

@NgModule({
  imports: [RouterModule.forRoot(routes,
  {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
