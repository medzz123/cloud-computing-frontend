import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;

  constructor(public firebaseAuth : AngularFireAuth) { }

  async signin(email:string , password:string){
    // await this.firebaseAuth.signInWithEmailAndPassword(email,password).then(res=>{
    //   this.isLoggedIn = true

    //   console.log(res.user["za"])      
    //   localStorage.setItem('user', JSON.stringify(res.user))
    // })
  try{
    const auth = await this.firebaseAuth.signInWithEmailAndPassword(email,password);
    const token = await auth.user.getIdToken();
    localStorage.setItem('token', token)
    this.isLoggedIn = true

    console.log(token)
  } catch (error) {
    console.error(error);
  }
    
  }

  async signup(email:string, password:string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user', JSON.stringify(res.user))
      
    })
  }

  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('token')

  }
  
}
