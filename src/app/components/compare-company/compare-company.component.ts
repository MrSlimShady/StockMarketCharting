
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Company } from 'src/app/model/company';
import { Exchange } from 'src/app/model/exchange';
import { StockPrice } from 'src/app/model/stockprice';
import { CompanyService } from 'src/app/services/company.service';


@Component({
  selector: 'app-compare-company',
  templateUrl: './compare-company.component.html',
  styleUrls: ['./compare-company.component.css']
})
export class CompareCompanyComponent implements OnInit {

  compareCompanyForm: FormGroup = new FormGroup({});
  companyList: Company[]=[];
  exchange: Exchange[]=[];

  companyname = new FormControl();

  stockexchange = new FormControl();

  chartType = new FormControl();

  charts = ["msline","msarea","msBar2D","mscolumn2d"];
  options: string[] = [];

  filteredOptions: Observable<string[]> | undefined;

  startdate = new FormControl(new Date());
  enddate = new FormControl(new Date());

  stockPrices: StockPrice[]=[];
  view:boolean = false;

  flag: boolean = true;
  dataFormat = "json"
  type= "msline";

  categoryData: Object[]=[];
  data1: Object[]=[];

  dataset1 = {
    seriesname: "",
    data: this.data1
  }
  
  dataSource1 = {
    chart: {
      caption: "Stock Price",
      yaxisname: "Price in INR",
      subcaption: "2012-2016",
      showhovereffect: "1",
      numbersuffix: " INR",
      drawcrossline: "1",
      plottooltext: "<b>$dataValue</b> share price of $seriesName",
      theme: "fusion"
    },
    categories: [
      {
        category: this.categoryData
      }
    ],
    dataset: [
      this.dataset1,
      
    ]
  };

  headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getJwtToken());
  httpOptions = {
    headers: this.headers_object
  };

  constructor(private authService:AuthServiceService,private companyService: CompanyService ,private http:HttpClient,private router: Router,private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.http.get(`http://localhost:8080/api/company/all`,this.httpOptions).subscribe(
      (response) => {
        this.companyList=<Company[]> response;
        this.companyList.forEach(company => this.options.push(company.companyName));
      },
      (error) => console.log(error)
    )
    
    this.filteredOptions = this.companyname.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

      

      this.companyname.valueChanges.subscribe(
        value => {
          const c = this.companyList.filter(company => company.companyName==this._filter(value)[0]);
          c.forEach(company => this.exchange = company.listedExchanges);
        }
      );
      
      
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }



  addchart(){

    let cid1 : number=0;
    this.type = this.chartType.value;

    // console.log(this.chartType.value);
    this.companyList.forEach(company =>{
      if(company.companyName == this.companyname.value){
        cid1 = company.id;
      }
      } )


    let data: Object[]=[];
    let dataSet= {
      seriesname: this.companyname.value,
      data: data
    };

    dataSet.data = this.getStockPrices({
      companyID:cid1,
      exchangeID:this.stockexchange.value,
      startDate:this.startdate.value,
      endDate:this.enddate.value
    },
    data,
    )
    
    this.dataSource1.dataset.push(dataSet);
    this.view = true;

  }

  getStockPrices(sp:{companyID: number, exchangeID:number, startDate: Date,endDate: Date},d:Object[]) :Object[] {
    
    this.companyService.getStocks(sp).subscribe((data:any) => {
      this.stockPrices = data;
      d = this.fill(d);
    });
   
    return d;

  }

  datefilter(date:Date){
    let s = date.toString();
    return s.slice(0,10);
  }


  fill(data:Object[]){
    this.stockPrices.forEach(s => {
      let x = {value:s.currentPrice};
      data.push(x);
    })

    if(this.flag==true){
    this.stockPrices.forEach(s => {
      let y = {label:this.datefilter(s.date)};
      this.categoryData.push(y);
      this.flag = false;
      }
    )}


    return data;

  }

}
