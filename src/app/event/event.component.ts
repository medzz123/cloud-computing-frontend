import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EVENT_URL } from 'src/app/urls';
import {MatDatepickerModule} from '@angular/material/datepicker';


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
  @ViewChild("titleInput") titleInput: ElementRef;
  @ViewChild("locationInput") locationInput: ElementRef;
  @ViewChild("startInput") startInput: ElementRef;
  @ViewChild("endInput") endInput: ElementRef;
  @ViewChild("descriptionInput") descriptionInput: ElementRef;

  dateInput;
  date = new Date();

  constructor(private http: HttpClient,
    public router: Router, ) {
      this.http = http;
     }
     
  createEventRequest: Observable<RefElement>;


  ngOnInit(): void {
  }

  onDate(event): void {
    this.dateInput = event.target.value;
    this.dateInput = (this.dateInput.getMonth() + 1).toString()  + "/" + this.dateInput.getDate() +  "/" +  this.dateInput.getFullYear()
    console.log(this.dateInput)

  }

  tommddyyyy(date) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  createEvent(){
    let body;
    let title = this.titleInput.nativeElement.value;
    let date = this.dateInput
    let location = this.locationInput.nativeElement.value;
    let description = this.descriptionInput.nativeElement.value;
    let startTime = this.startInput.nativeElement.value;
    let endTime = this.endInput.nativeElement.value;

    let emails = []

    body = {title: title, name: title, date: date, startTime: startTime,endTime: endTime, location: location, description: description, emails: emails}
    
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
