import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private fireauth : AngularFireAuth,
    private router : Router
    ) { }

  login(email:string, password:string){

    this.fireauth.signInWithEmailAndPassword(email, password).then((response) => { 
      const user = response.user;         
      const accessToken = response.user?.getIdToken().then(restok=>{
        localStorage.setItem('accessToken', restok)
      });         
      const refreshToken = response.user?.refreshToken;         
      const expirationTime = response.user?.metadata.lastSignInTime;               
      localStorage.setItem('refreshToken', refreshToken ?? '');         
      localStorage.setItem('expirationTime', expirationTime ?? '')

    })       
    .catch((error) => {         
      console.log(error);       
    });

  }

  register(email:string, password:string){

    this.fireauth.createUserWithEmailAndPassword(email,password).then(()=>{
      alert("Registration successfull...")
      this.router.navigate(['']);

    }, err => {
      alert("Something went wrong...")
    }
    
    )
  }

  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expirationTime');
      this.router.navigate(['']);
    }, err =>{

      alert("logged out...")

    })
  }




}
