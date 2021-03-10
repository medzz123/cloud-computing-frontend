import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EVENT_URL } from 'src/app/urls';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';



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
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  invites = [];

  constructor(private http: HttpClient,
    public router: Router, ) {
      this.http = http;
     }
     
  createEventRequest: Observable<RefElement>;


  ngOnInit(): void {
  }


  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  emails = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.emails.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(email): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }


  onDate(event): void {
    this.dateInput = event.target.value;
    this.dateInput = (this.dateInput.getMonth() + 1).toString()  + "/" + this.dateInput.getDate() +  "/" +  this.dateInput.getFullYear()
    console.log(this.dateInput)

  }

  createEvent(){


    for (let i = 0; i < this.emails.length; i++){
      this.invites.push(this.emails[i]["name"])
    }
    console.log(this.invites)

    let body;
    let title = this.titleInput.nativeElement.value;
    let date = this.dateInput
    let location = this.locationInput.nativeElement.value;
    let description = this.descriptionInput.nativeElement.value;
    let startTime = this.startInput.nativeElement.value;
    let endTime = this.endInput.nativeElement.value;

    body = {title: title, name: title, date: date, startTime: startTime,endTime: endTime, location: location, description: description, emails: this.invites}
    
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
