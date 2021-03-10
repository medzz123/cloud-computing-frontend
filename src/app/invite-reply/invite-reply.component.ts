import { Component, OnInit } from '@angular/core';
import { USER_URL, EVENT_URL } from 'src/app/urls';
import { Observable } from 'rxjs';
import { RefElement } from '../home/home.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invite-reply',
  templateUrl: './invite-reply.component.html',
  styleUrls: ['./invite-reply.component.css']
})
export class InviteReplyComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) {this.http = http; }
  userEvents: Observable<RefElement>;
  eventId;
  eventDetails = []

  ngOnInit(): void {
    this.userEvents = this.http.get<RefElement>(
      USER_URL, {headers: {authorization: `Bearer ${localStorage.getItem('token')}`} }
    );  
    this.userEvents.subscribe((data) => {
      console.log("subscription data");

      this.eventId = this.router.url.split("invite-reply/")[1]

      console.log(this.eventId)

      for (let i = 0; i< Object.keys(data.events).length; i++){
        if(data.events[i]["id"] == this.eventId){
          this.eventDetails.push({title: data.events[i]["title"], date: data.events[i]["date"], startTime: data.events[i]["startTime"], endTime: data.events[i]["endTime"], location: data.events[i]["location"], description: "description"})
          console.log(data.events[i])
        }
      }
      console.log(this.eventDetails)

    });
  }

  attend(){

  }
  notAttend(){}
}
