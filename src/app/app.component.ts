import { Component, OnInit } from "@angular/core";
import { TransactionService } from "./transaction-service";
import { Transaction } from "./Transaction";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  p: number = 1;
  asc: boolean = false;
  transactions: Transaction[];
  constructor(
    private transactionService: TransactionService,
    private spinner: NgxSpinnerService
  ) {}

  getAllTransactions() {
    this.transactionService.getAllTransaction().subscribe(data => {
      this.spinner.hide();
      this.transactions = this.jsonToTransactionObj(data);
    });
  }

  jsonToTransactionObj(data): Transaction[] {
    return data.map(item => {
      const transaction = new Transaction();
      transaction.accountNo = item["Account No"];
      transaction.date = item["Date"];
      transaction.valueDate = item["Value Date"];
      transaction.withdrawalAmt = item["Withdrawal AMT"];
      transaction.depositAmt = item["Deposit AMT"];
      transaction.balance = item["Balance AMT"];
      transaction.transactionDetails = item["Transaction Details"];
      return transaction;
    });
  }

  sortColumn(columnName) {
    if (columnName === "balance") {
      this.asc = !this.asc;
      this.transactions.sort(this.numCompare);
    }
  }

  numCompare = (a, b) => {
    let A = parseInt(a.balance.replace("/,/g", ""), 10);
    let B = parseInt(b.balance.replace("/,/g", ""), 10);
    if (this.asc) return A - B;
    return B - A;
  };

  ngOnInit() {
    this.spinner.show();
    this.getAllTransactions();
  }
}
