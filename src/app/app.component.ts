import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RSVP Events';
  
  onActivate(event) {
    window.scroll(0,0);

}
}
