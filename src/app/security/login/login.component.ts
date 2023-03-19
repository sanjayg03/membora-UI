import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from "sweetalert2";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  BASE_URL = 'http://localhost:8090/rest/api/v1/'
  loginForm: any;

  constructor(private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  Responedata: any;
  userLoggedIn: boolean = false;
  login() {
    this.http.get(this.BASE_URL + "login/" + this.loginForm.value.emailId + "/" + this.loginForm.value.password).subscribe(
      Response => {
        console.log('hello!!!!!');
        this.Responedata = Response;
        console.log("id --> ", this.Responedata.userId);
        console.log("Response --> ", this.Responedata);
        localStorage.setItem('userId', this.Responedata.userId)
        this.userLoggedIn = true;
        console.log("true --> ", this.userLoggedIn);

        this.onLoginSuccess();

      },
      error => {
        alert("Login Failed....");
        this.userLoggedIn = false;
        console.log("false --> ", this.userLoggedIn);
        console.log('error', error);
      }
    );
  }

  // Login Succes Pop Up

  onLoginSuccess() {
    Swal.fire({
      text: 'Login Success.',
      confirmButtonColor: '#00af3a',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/dashboard']);
        setTimeout(() => {
          location.reload();
        }, 0);
      }

    });
  }

}
