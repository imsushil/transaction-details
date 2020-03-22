import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TransactionService {
  url: string = environment.transactionUrl;

  constructor(private http: HttpClient) {}

  getAllTransaction(): Observable<any> {
    return this.http.get(this.url);
  }
}
