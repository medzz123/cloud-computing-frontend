import { Component, OnInit } from '@angular/core';
import { GET_REPLY_URL, EVENT_URL, REPLY_URL } from 'src/app/urls';
import { Observable } from 'rxjs';
import { RefElement } from '../home/home.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-invite-reply',
  templateUrl: './invite-reply.component.html',
  styleUrls: ['./invite-reply.component.css']
})
export class InviteReplyComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {this.http = http; }
  userEvents: Observable<RefElement>;
  reply: Observable<RefElement>;

  eventDetails = [];

  id: string;
  event: string;
  token: string;

  ngOnInit(): void {

    this.id = this.route.snapshot.queryParamMap.get('id');
    this.event  = this.route.snapshot.queryParamMap.get('event');
    this.token = this.route.snapshot.queryParamMap.get('token');

    let params = new HttpParams()
    .set('id', this.id)
    .set('event', this.event)
    .set('token', this.token);

    this.userEvents = this.http.get<RefElement>(
      GET_REPLY_URL, {params}
    );  
    this.userEvents.subscribe((data) => {
      console.log("subscription data");

      console.log(data)

      this.eventDetails.push(data)

      // for (let i = 0; i< Object.keys(data.events).length; i++){
      //   if(data.events[i]["id"] == this.eventId){
      //     this.eventDetails.push({title: data.events[i]["title"], date: data.events[i]["date"], startTime: data.events[i]["startTime"], endTime: data.events[i]["endTime"], location: data.events[i]["location"], description: "description"})
      //     console.log(data.events[i])
      //   }
      // }
      console.log(this.eventDetails)

    });

  }

  attend(){
    let body = {id: this.id, event: this.event, token : this.token, attending : true}

    try {
      this.reply = this.http.post<RefElement>(
        REPLY_URL, body,
      );
  
      this.reply.subscribe((data) => {
        console.log(data)
      });

    } catch(error){
      console.log(error)
    }


  }
  notAttend(){
    let body = {id: this.id, event: this.event, token : this.token, attending : false}

    try {
      this.reply = this.http.post<RefElement>(
        REPLY_URL, body,
      );
  
      this.reply.subscribe((data) => {
        console.log(data)
      });

    } catch(error){
      console.log(error)
    }
  }
}
