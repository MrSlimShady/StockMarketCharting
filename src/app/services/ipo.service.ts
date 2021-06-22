import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { AuthServiceService } from '../auth-service.service';
import { Company } from '../model/company';
import { Ipo } from '../model/ipo';

@Injectable({
  providedIn: 'root'
})
export class IpoService {
  private IpoList: Ipo[] = [];
  private CompanyList: Company[]=[];

  headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getJwtToken());
  httpOptions = {
    headers: this.headers_object
  };

  constructor(private authService:AuthServiceService,private http:HttpClient) { }

  getCompanyList() :void{
    this.http.get(`http://localhost:8080/api/company/all`,this.httpOptions).subscribe(
      (response) => {
        this.CompanyList=<Company[]> response;
      },
      (error) => console.log(error)
    )
  }

  getIpoList() :void{
    this.http.get(`http://localhost:8080/api/ipo/all`,this.httpOptions).subscribe(
      (response) => {
        this.IpoList=<Ipo[]> response;
      },
      (error) => console.log(error)
    )
  }

  addIpo(ipo:{ 
    id: number,
    companyName: string,
    stockExchange: string,
    pricePerShare: number,
    totalShares: number,
    openingDate: Date,
    remarks: string}): void{
      console.log(ipo);
    this.http.post<any>(`http://localhost:8080/api/ipo/add`, ipo,this.httpOptions)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => console.log(error)
        )
  }

  view(): Company[] {
    return this.CompanyList;
  }


}
