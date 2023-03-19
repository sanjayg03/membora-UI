import { Component, TemplateRef, ViewEncapsulation, OnInit } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pipe, PipeTransform } from '@angular/core'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host: { class: 'd-block' },
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {

  userID: any = localStorage.getItem("userId");

  profileForm: any;

  BASE_URL = 'http://localhost:8090/rest/api/v1/';

  closeResult: any;

  constructor(
    private offcanvasService: NgbOffcanvas,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private formbuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.queryAdminFNLN();

    // this.role = JSON.parse("userId");
    console.log("id-->", this.userID)



    this.profileForm = this.formbuilder.group({
      userId: [this.userID],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      businessName: ['', Validators.required],
      businessType: ['', Validators.required],
    });
  }

  openEnd(contentP: TemplateRef<any>) {
    this.queryAdminDetails();
    this.offcanvasService.open(contentP, { position: 'end' });
  }


  // QUERY DETAILS

  adminDetails: any;

  queryAdminDetails() {
    this.http.get(this.BASE_URL + "user/" + this.userID).subscribe(
      (data: any) => {
        this.adminDetails = data;
        this.profileForm.patchValue(data);
      },
      error => {
        alert("Login Failed....")
        console.log('error', error);
      }
    );
  }

  fnln: any;

  queryAdminFNLN() {
    this.http.get(this.BASE_URL + "user/" + this.userID).subscribe(
      (data: any) => {
        this.fnln = data;
        this.profileForm.patchValue(data);
      },
      error => {
        alert("Login Failed....")
        console.log('error', error);
      }
    );
  }

  updateProfileDetails: any;

  updateProfile() {
    let o = this.profileForm.value
    this.http.put(this.BASE_URL + "user", o).subscribe(
      (data: any) => {
        this.updateProfileDetails = data;
        let response = data;
        if (response.code == "0000") {
          console.log("success")
          this.updateSucess();
        }
      },
      error => {
        alert("Login Failed....")
        console.log('error', error);
      }
    );
  }


  // profile update Succes Pop Up

  updateSucess() {
    Swal.fire({
      text: 'Profile Update Success.',
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

  // logout Succes Pop Up

  logOutSucess() {
    Swal.fire({
      text: 'Log out Success.',
      confirmButtonColor: '#00af3a',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          this.auth.logout();
          window.location.reload();
        }, 0);
        this.router.navigate(['/login']);
        setTimeout(() => {
          window.location.reload();
        }, 0);
      }

    });
  }
}
