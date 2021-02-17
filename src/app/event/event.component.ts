import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(public router: Router ) { }

  ngOnInit(): void {
  }

  createEvent(){
    this.router.navigate(["/"]);
  }
  invitePeople(){}

}
