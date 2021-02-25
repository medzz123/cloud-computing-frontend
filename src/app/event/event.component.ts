import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EVENT_URL } from 'src/app/urls';


export interface RefElement {
  name: string;
  username: string;
  events: object;
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(private http: HttpClient,
    public router: Router, ) {
      this.http = http;
     }
     
  createEventRequest: Observable<RefElement>;


  ngOnInit(): void {
  }

  createEvent(){
    let body;
    body = {name:"miri", location:"munich", emails:["miri", "noor", "mahedi"]}
    
    this.createEventRequest = this.http.post<RefElement>(
      EVENT_URL, body, {headers: {authorization: `Bearer ${localStorage.getItem('token')}`} }
    );
    this.createEventRequest.subscribe((data) => {
      console.log(data)
    });
    this.router.navigate(["/home"]);
  }
  invitePeople(){}

}
