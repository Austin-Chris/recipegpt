import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  email : string ='';
  password : string ='';
  passworda : string = '';
  registerform : any;

  constructor(
    private router: Router,
    private auth : AuthService
  ) { }

  ngOnInit(): void {
    this.registerform = new FormGroup({
      email: new FormControl(this.email, [Validators.required]),
      passworda: new FormControl(this.passworda, [Validators.required]),
      password: new FormControl(this.password, [Validators.required])
    });
  }

  register() {

    if(this.registerform.value.email==''){
      alert('Please enter email id');
      return;
    }

    if(this.registerform.value.password==''){
      alert('Please enter password');
      return;
    }

    if(this.registerform.value.passworda === this.registerform.value.password) {

      this.auth.register(this.registerform.value.email, this.registerform.value.password);
      this.email='';
      this.password='';
    }

    else{
      alert('password mismatch')
    }

    
    let formData = {
      username: this.registerform.value.email,
      password: this.registerform.value.password,
    };

    console.log(formData);

    // if (formData.username === "admin" && formData.password === "YWRtaW4=")
    // {

    // this.router.navigate(['/findRecipe']);

    // }
  }

}
