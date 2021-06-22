import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';
import { Company } from '../model/company';
import { Exchange } from '../model/exchange';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
private exchangeList: Exchange[]=[];

headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getJwtToken());
  httpOptions = {
    headers: this.headers_object
  };

  constructor(private authService:AuthServiceService,private http:HttpClient) { }

  getExchangeList() :Exchange[] {
    this.http.get(`http://localhost:8080/api/exchange/all`,this.httpOptions).subscribe(
      (response) => {
        this.exchangeList=<Exchange[]> response;
      },
      (error) => console.log(error)
    )
    console.log(this.exchangeList);
    return this.exchangeList;
  }


  add(exchange: { stockExchange: string, brief: string ,contactAddress:string,remarks:string}): void {
    
    this.http.post<any>(`http://localhost:8080/api/exchange/add`, exchange,this.httpOptions)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => console.log(error)
        )
  }

  get(){
    return this.exchangeList;
  }

}
