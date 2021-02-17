import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router: Router) { }
  message: string;
  @ViewChild("nameinput") emailinput: ElementRef;
  @ViewChild("passinput") passwordInput: ElementRef;
  @ViewChild("repeatinput") repeatInput: ElementRef;


  ngOnInit(): void {
  }

  register(){

    console.log(this.passwordInput.nativeElement.value, this.repeatInput.nativeElement.value)
    console.log(this.passwordInput.nativeElement.value == this.repeatInput.nativeElement.value)
      if (this.passwordInput.nativeElement.value == this.repeatInput.nativeElement.value){
        this.router.navigate(["/login"]);
      }
      else{
        this.message = "Passwords don't match"
      }
  }
}
