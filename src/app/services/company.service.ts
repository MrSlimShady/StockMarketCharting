import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { from, Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';

import { Company } from '../model/company';
import { Sector } from '../model/sector';
import { StockPrice } from '../model/stockprice';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly SECTOR='SECTOR';

  private stockPriceList!: Observable<StockPrice[]>;
  sector: Sector[] = [];

  headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getJwtToken());
  httpOptions = {
    headers: this.headers_object
  };

  constructor(private authService:AuthServiceService,private http:HttpClient) { }

  add(newcompany: { company: Company, companyCode: string[]}): void {
    
    console.log(newcompany);
    this.http.post<any>(`http://localhost:8080/api/company/add`, newcompany,this.httpOptions)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => console.log(error)
        )
  }

  getStocks(sp:{companyID: number, exchangeID:number, startDate: Date,endDate: Date}){
    return this.http.post<any>(`http://localhost:8080/api/company/price`,sp,this.httpOptions).pipe(

      map((data: StockPrice[]) => {

        return data;

      }), catchError( error => {

        return throwError( 'Something went wrong!' );

      })

   )

   
    
    
  }

  getSectorList(){
    this.http.get(`http://localhost:8080/api/sector/all`,this.httpOptions).subscribe(
      (response) => {
        this.sector=<Sector[]> response;
        this.storeSector(this.sector);
      },
      (error) => console.log(error)
    )
  }

  getStockPrice(){
    return this.stockPriceList;
  }

  storeSector(sector: Sector[]){
    this.sector.forEach( s => {      

      if(localStorage.getItem(s.id.toString())===null){
        // localStorage.setItem(s.id.toString(), s.name);
      }
    })   
  }

  getSector(id:string){
    return localStorage.getItem(id.toString());
  }
}
