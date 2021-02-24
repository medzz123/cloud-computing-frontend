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
import { AccountComponent } from './account/account.component';

import { AngularFireModule } from '@angular/fire';
import firebase from 'firebase/app';
import { FirebaseService } from './services/firebase.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EventComponent,
    PageNotFoundComponent,
    AccountComponent,
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCYhfQXK1hmDlp6af0JpxrQAKu3y3SzEjc",
      authDomain: "rsvp-events-9aec5.firebaseapp.com",
      projectId: "rsvp-events-9aec5",
      storageBucket: "rsvp-events-9aec5.appspot.com",
      messagingSenderId: "418546343899",
      appId: "1:418546343899:web:124dba61181f14052351fe",
      measurementId: "G-6F5ZNY9FEZ"
    }),
    RouterModule.forChild([{ path: "", component: LoginComponent }])
  ],
  providers: [],
  bootstrap: [AppComponent, FirebaseService]
})
export class AppModule { }
