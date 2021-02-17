import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EventComponent,
    PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule.forChild([{ path: "", component: HomeComponent }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
