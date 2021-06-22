import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Company } from 'src/app/model/company';
import { Exchange } from 'src/app/model/exchange';
import { Sector } from 'src/app/model/sector';
import { CompanyService } from 'src/app/services/company.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  companyForm: FormGroup = new FormGroup({});
  exchangeList: Exchange[]=[];
  sectorList: Sector[]=[]; 
  codes: any[] = [{
    id: 1,
    code:'',
  }];
  company: Company = new Company;

  baseUrl= environment.baseUrl;

  headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getJwtToken());
  httpOptions = {
    headers: this.headers_object
  };

  
  constructor(private authService:AuthServiceService,private companyService:CompanyService, private http:HttpClient,private exchangeService: ExchangeService,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.http.get(`http://localhost:8080/api/exchange/all`,this.httpOptions).subscribe(
      (response) => {
        this.exchangeList=<Exchange[]> response;
      },
      (error) => console.log(error)
    )

    this.http.get(`http://localhost:8080/api/sector/all`,this.httpOptions).subscribe(
      (response) => {
        this.sectorList=<Sector[]> response;
      },
      (error) => console.log(error)
    )
    this.companyForm = this.formBuilder.group({
      companyName: [''],
      companyTurnover: [''],
      companyCEO: [''],
      boardOfDirectors: [''],
      companyDesc:[''],
      stockexchange:[''],
      sector:['']
    });
  }

  get f() { return this.companyForm.controls; }

  add(){
      let companyCode: string[]=[];
      let ex: Exchange[]=[];
      let sec: Sector;
      this.codes.map(code => companyCode.push(code.code));
      this.exchangeList.every((sid: any)=>this.f.stockexchange.value.map((i: any)=> {if(i==sid.id){ex.push(sid);}}));
      this.sectorList.forEach( s => {
        if(this.f.sector.value==s.id){
          sec = s;
          this.company.sector = sec; 
        }
      })

      

      this.company.companyName = this.f.companyName.value;
      this.company.companyCEO = this.f.companyCEO.value;
      this.company.boardOfDirectors = this.f.boardOfDirectors.value;
      this.company.companyTurnover = this.f.companyTurnover.value;
      this.company.companyDesc = this.f.companyDesc.value;
      this.company.listedExchanges = ex;
      this.companyService.add({company:this.company,companyCode:companyCode});

      this.router.navigate(['/manage/company']);

  }

  addCompanyCode(){
    this.codes.push({
      id: this.codes.length + 1,
      code:''
    });
  }

  removeCode(i:number){
    this.codes.splice(i, 1);
  }

}
