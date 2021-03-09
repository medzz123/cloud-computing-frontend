import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { RefElement } from '../home/home.component';
import { EVENT_URL, CREATE_USER_URL } from '../urls';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;

  createUser: Observable<RefElement>;

  constructor(public firebaseAuth : AngularFireAuth, private http: HttpClient, public router: Router) {this.http = http; }

  async signin(email:string , password:string){
  try {
    const auth = await this.firebaseAuth.signInWithEmailAndPassword(email,password);
    const token = await auth.user.getIdToken();
    localStorage.setItem('token', token)
    this.isLoggedIn = true

  } catch (error) {
    console.error(error);
  }
    
  }

  async signup(name:string, email:string, password:string){

    try{
      let body = {name:name, email:email, password:password}
    
      this.createUser = this.http.post<RefElement>(
        CREATE_USER_URL, body,
      );
      this.createUser.subscribe((data) => {
        this.router.navigate(["/login"]);

        console.log(data)
      });
    } catch(error){
      console.error(error);
      
    }
  }

  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('token')

  }
  
}
