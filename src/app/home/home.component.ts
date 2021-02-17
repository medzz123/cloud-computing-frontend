import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router) { }
  modifyClicked = false;

  // date = "Some date";
  // location = "Some location";
  // description = "Some long description of the event will go here";
  // numberOfAttendees = 50;

  numberOfEvents = [
    { date : "Some date 1", location : "Some location 1", description : "Some long description of the event will go here 1", numberOfAttendees : 10}, 
    { date : "Some date 2", location : "Some location 2", description : "Some long description of the event will go here 2", numberOfAttendees : 20}, 
    { date : "Some date 3", location : "Some location 3", description : "Some long description of the event will go here 3", numberOfAttendees : 30}
  ];

  @ViewChild("dateInput") dateInput: ElementRef;
  @ViewChild("locationInput") locationInput: ElementRef;
  @ViewChild("descriptionInput") descriptionInput: ElementRef;

  ngOnInit(): void {
  }

  modifyAccount(){
    this.router.navigate(["/account"]);

  }

  createEvent(){
    this.router.navigate(["/event"]);

  }

  modifyEvent(){
    this.modifyClicked = true;
  }
  
  doneModifying(){
    this.modifyClicked = false;
  }

}
