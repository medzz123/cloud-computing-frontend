import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  message: string;
  @ViewChild("nameinput") emailinput: ElementRef;
  @ViewChild("passinput") passwordInput: ElementRef;
  @ViewChild("repeatinput") repeatInput: ElementRef;

  modify(){
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
