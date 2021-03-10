import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { USER_URL, EVENT_URL } from 'src/app/urls';
import { FirebaseService } from '../services/firebase.service';
export interface RefElement {
  name: string;
  username: string;
  events: object;
  attendees: object;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient,public firebaseService: FirebaseService,
    public router: Router, ) {
      this.http = http;
     }

  isSignedIn = false;


  // date = "Some date";
  // location = "Some location";
  // description = "Some long description of the event will go here";
  // numberOfAttendees = 50;

  numberOfEventsTemp = [];
  numberOfEvents = [];


  @ViewChild("dateInput") dateInput: ElementRef;
  @ViewChild("locationInput") locationInput: ElementRef;
  @ViewChild("descriptionInput") descriptionInput: ElementRef;

  userEvents: Observable<RefElement>;
  countAttendees = 0;
  numberOfAttendees = []

  ngOnInit(): void {

    this.userEvents = this.http.get<RefElement>(
      USER_URL, {headers: {authorization: `Bearer ${localStorage.getItem('token')}`} }
    );  
    this.userEvents.subscribe((data) => {
      console.log("subscription data");
      console.log(data.events)

      for (var key in data.events) {
        // check if the property/key is defined in the object itself, not in parent
        if (data.events.hasOwnProperty(key)) {     
            this.numberOfEventsTemp.push({"title": data.events[key]["title"], "date": data.events[key]["date"] , "startTime": data.events[key]["startTime"], "endTime": data.events[key]["endTime"],  "location": data.events[key]["location"] , "description": data.events[key]["description"], "id": data.events[key]["id"]})
        }
    }
    for(let i = 0; i < this.numberOfEventsTemp.length;i ++ ){
      console.log(this.numberOfEventsTemp[i].id)
      this.userEvents = this.http.get<RefElement>(
        EVENT_URL + "/" + this.numberOfEventsTemp[i].id, {headers: {authorization: `Bearer ${localStorage.getItem('token')}`} }
      );  
      this.userEvents.subscribe((data) => {
        console.log("subscription data");
        // console.log(data)

        for (var key in data.attendees) {
          // check if the property/key is defined in the object itself, not in parent
          if (data.attendees.hasOwnProperty(key)) {    
            // console.log(data.attendees[key]["attending"]) 
            if(data.attendees[key]["attending"] == true){
              this.countAttendees ++;
            }
              // this.numberOfEvents.push({"title": data.events[key]["title"], "date": data.events[key]["date"] , "location": data.events[key]["location"] , "description": data.events[key]["description"], "id": data.events[key]["id"]})
          }
        }
        // console.log(this.countAttendees, this.numberOfEventsTemp[i].id)
        this.numberOfEvents.push({"title": this.numberOfEventsTemp[i].title, "date": this.numberOfEventsTemp[i].date , "startTime": this.numberOfEventsTemp[i].startTime, "endTime": this.numberOfEventsTemp[i].endTime, "location": this.numberOfEventsTemp[i].location , "description": this.numberOfEventsTemp[i].description,  "numberOfAtendees": this.countAttendees})

      });
      console.log( this.numberOfEvents)
    }

    });



  }

  createEvent(){
    this.router.navigate(["/event"]);

  }

  logOut() {
    console.log("LOG OUT")
    this.firebaseService.logout()
    this.isSignedIn = false;
    this.router.navigate(["/"]);

    // if(this.firebaseService.isLoggedIn){
    //   console.log("not happening")

    //   this.isSignedIn = true
    // }else{
    //   console.log(" happening")
    //   this.router.navigate(["/"]);
    // }
  }
}
