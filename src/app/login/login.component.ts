import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { FirebaseService } from '../services/firebase.service';
import { async } from '@angular/core/testing';
import { stringify } from 'querystring';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSignedIn = false;

  message: string;
  @ViewChild("emailinput") emailinput: ElementRef;
  @ViewChild("passinput") passwordInput: ElementRef;
  constructor(public router: Router, public firebaseService: FirebaseService) { }
  

  ngOnInit(): void {
    if(localStorage.getItem('user') !== null){
      this.isSignedIn = true
    }else{
      this.isSignedIn = false
    }
  }

  login() {
    console.log("LOGIN");
    this.message = "Trying to log in ...";
    var email = this.emailinput.nativeElement.value;
    var pass = this.passwordInput.nativeElement.value;

    
    this.firebaseService.signin(email, pass)
    console.log(this.firebaseService)

    if(this.firebaseService.isLoggedIn){

      this.isSignedIn = true
      console.log(name, pass)
      this.router.navigate(["/home"]);
    }
  }


}
