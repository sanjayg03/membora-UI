import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  searchCust: any;

  BASE_URL = 'http://localhost:8090/rest/api/v1/';

  customerForm: any;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private formbuilder: FormBuilder,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.queryCustomers();

    this.customerForm = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      joiningDate: ['', Validators.required]
    })
  }

  logout() {
    this.auth.logout();
  }

  customerData: any;

  queryCustomers() {
    this.http.get(this.BASE_URL + "customer").subscribe(
      data => {
        this.customerData = data;
        console.log("customerData --> ", data);
      },
      error => {
        alert("Login Failed....")
        console.log('error', error);
      }
    );
  }

  createCustomerValue: any;

  createCustomer() {
    this.http.post(this.BASE_URL + "customer", this.customerForm.value).subscribe(
      (data: any) => {
        this.createCustomerValue = data;
        let response = data;
        if (response.code == "0000") {
          console.log("Create Customer Data --> ", data);
          this.closeModal(event);
          this.custCreateSucess();
          this.queryCustomers();
        }
      },
      error => {
        alert("Login Failed....")
        console.log('error', error);
      }
    );
  }

  open(content: any) {
    this.modalService.open(content);
  }

  closeModal(content: any) {
    this.modalService.dismissAll(content);
    this.customerForm.reset();
  }

  // user creation Succes Pop Up

  custCreateSucess() {
    Swal.fire({
      text: 'Customer Created Successfully.',
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
