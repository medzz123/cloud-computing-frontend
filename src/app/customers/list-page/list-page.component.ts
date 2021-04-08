import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import { environment } from 'src/environments/environment';

export interface Res {
  events: any;
}

export interface RefElement {
  attendees: object;
  data: object;

}

export interface DialogData {
  attendees: object;
}

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  events = [];
  subscription;

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

  ngOnInit(): void {

    this.subscription = this.http.get<Res>(`${environment.webServerUrl}/user`, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    this.subscription.subscribe((data) => {
      this.events = data.events;
      console.log(this.events)

    });
  }

  dispose() {
    this.subscription.unsubscribe();
    this.events = [];
  }

  viewAttendees(): void {
    const dialogRef = this.dialog.open(ViewAttendeesDialog, {
      width: '500px',
      height: '400px',
      data: {attendees: this.events}
    });
    console.log(this.events[0]['attendees'][0]['email'])

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  createEvent(): void {
    const dialogRef = this.dialog.open(CreateEventDialog, {
      width: '500px',
      height: '400px',
      data: {attendees: this.events}
    });
    console.log(this.events[0]['attendees'][0]['email'])

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  constructor(private http: HttpClient, public dialog: MatDialog) {}

}

@Component({
  selector: 'view-attendees-dialog',
  templateUrl: './view-attendees-dialog.html',
  styleUrls: ["./list-page.component.scss"],
})

export class ViewAttendeesDialog {

  constructor(
    public dialogRef: MatDialogRef<ViewAttendeesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'create-event-dialog',
  templateUrl: './create-event-dialog.html',
  styleUrls: ["./list-page.component.scss"],
})

export class CreateEventDialog {

  constructor(
    public dialogRef: MatDialogRef<CreateEventDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
