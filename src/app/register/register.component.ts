import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router: Router,  public firebaseService: FirebaseService) { }
  message: string;
  @ViewChild("nameinput") nameinput: ElementRef;
  @ViewChild("emailinput") emailinput: ElementRef;
  @ViewChild("passinput") passwordInput: ElementRef;


  ngOnInit(): void {
  }

  register(){
    let name = this.nameinput.nativeElement.value
    let email = this.emailinput.nativeElement.value
    let pass = this.passwordInput.nativeElement.value

    this.firebaseService.signup(name,email,pass)
  }
}
