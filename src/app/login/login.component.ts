import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
  @ViewChild("emailinput") emailinput: ElementRef;
  @ViewChild("passinput") passwordInput: ElementRef;
  constructor(public router: Router) { }
  

  ngOnInit(): void {
  }

  login(){
    console.log("LOGIN");
    this.message = "Trying to log in ...";
    var name = this.emailinput.nativeElement.value;
    var pass = this.passwordInput.nativeElement.value;

    console.log(name, pass)
    this.router.navigate(["/"]);

  }
}
