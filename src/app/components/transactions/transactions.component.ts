import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addTrans() {
    alert("Add Transaction is working fine...")
  }

  addEntry() {
    alert("Add Entry is working fine...")
  }
}
