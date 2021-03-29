import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

export interface Res {
  events: any;
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
    });
  }

  dispose() {
    this.subscription.unsubscribe();
    this.events = [];
  }

  constructor(private http: HttpClient) {}
}
