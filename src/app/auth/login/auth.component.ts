import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  email : string = '';
  password : string = '';

  public loginform: any;

  constructor(
    private router: Router,
    private auth: AuthService) {}

  ngOnInit(): void {
    this.loginform = new FormGroup({
      email: new FormControl(this.email, [Validators.required]),
      password: new FormControl(this.password, [Validators.required]),
    });
  }

  loginClick() {

    if(this.loginform.value.email==''){
      alert('Please enter email id');
      return;
    }

    if(this.loginform.value.password==''){
      alert('Please enter password');
      return;
    }

    this.auth.login(this.loginform.value.email, this.loginform.value.password);
    this.email='';
    this.password='';

    let formData = {
      username: this.loginform.value.email,
      password: this.loginform.value.password,
    };

    console.log(formData);

    // if (formData.username === "admin" && formData.password === "YWRtaW4=")
    // {

    // this.router.navigate(['/findRecipe']);

    // }
  }
}
