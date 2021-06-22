import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { count } from 'rxjs/operators';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Company } from 'src/app/model/company';
import { Ipo } from 'src/app/model/ipo';
import { IpoService } from 'src/app/services/ipo.service';

@Component({
  selector: 'app-ipo-details',
  templateUrl: './ipo-details.component.html',
  styleUrls: ['./ipo-details.component.css']
})
export class IpoDetailsComponent implements OnInit {
  ipoList: Ipo[]=[];
  displayedColumns: string[] = ['companyName', 'stockExchange', 'pricePerShare','openingDate','remarks'];

  headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getJwtToken());
  httpOptions = {
    headers: this.headers_object
  };
  constructor(private authService:AuthServiceService,private http:HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.http.get(`http://localhost:8080/api/ipo/all`,this.httpOptions).subscribe(
      (response) => {
        this.ipoList=<Ipo[]> response;
      },
      (error) => console.log(error)
    )
  } 


}
