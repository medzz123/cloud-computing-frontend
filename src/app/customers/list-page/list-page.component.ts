import { Component, OnInit, Inject } from '@angular/core';
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

  openDialog(attendees): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      height: '400px',
      data: {attendees: this.events}
    });
    console.log(this.events[0]['attendees'][0]['email'])

    dialogRef.afterClosed().subscribe(result => {
      console.log(attendees)
      console.log('The dialog was closed');
    });
  }

  constructor(private http: HttpClient, public dialog: MatDialog) {}

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
  styleUrls: ["./list-page.component.scss"],
})

export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
