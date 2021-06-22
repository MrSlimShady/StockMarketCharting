import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockPrice } from 'src/app/model/stockprice';
import { CompanyService } from 'src/app/services/company.service';




@Component({
  selector: 'app-compare-form',
  templateUrl: './compare-form.component.html',
  styleUrls: ['./compare-form.component.css']
})
export class CompareFormComponent implements OnInit {

  category = [
    {
      label: "2012"
    },
    {
      label: "2013"
    },
    {
      label: "2014"
    },
    {
      label: "2015"
    },
    {
      label: "2016"
    },
    {
      label: "2010"
    }
  ]

  set1 = {
    seriesname: "RELIANCE",
    data: [
      {
        value: "62"
      },
      {
        value: "64"
      },
      {
        value: "64"
      },
      {
        value: "66"
      },
      {
        value: "78"
      }
    ]
  }
  set2 = {
    seriesname: "SBIN",
    data: [
      {
        value: "16"
      },
      {
        value: "28"
      },
      {
        value: "34"
      },
      {
        value: "42"
      },
      
    ]
  }

  data = {
    chart: {
      caption: "Reach of Social Media Platforms amoung youth",
      yaxisname: "% of youth on this platform",
      subcaption: "2012-2016",
      showhovereffect: "1",
      numbersuffix: "%",
      drawcrossline: "1",
      plottooltext: "<b>$dataValue</b> of youth were on $seriesName",
      theme: "fusion"
    },
    categories: [
      {
        category: this.category
      }
    ],
    dataset: [
      this.set1,
      
      this.set2
      
    ]
  };
  width = 600;
  height = 400;
  type = "msline";
  dataFormat = "json";
  dataSource = this.data;



  

  stockPrices: StockPrice[]=[];
  chartData: Object[]=[];

  constructor(private companyService:CompanyService ,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {


    this.fill();
    
  }


  fill(){
    console.log(this.stockPrices);
    console.log(this.companyService.getStockPrice());
    this.stockPrices.forEach(s => this.chartData.push(new Object({
      label: s.currentPrice,
    value: s.date
  })))
  // console.log(this.chartData);
  }

  addCompany(){
    this.router.navigate(['/compare/company']);
  }
  addSector(){
    this.router.navigate(['/compare/sector']);
  }
  

}
