import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Ipo } from 'src/app/model/ipo';
import { IpoService } from 'src/app/services/ipo.service';

@Component({
  selector: 'app-add-ipo',
  templateUrl: './add-ipo.component.html',
  styleUrls: ['./add-ipo.component.css']
})
export class AddIpoComponent implements OnInit {
  ipoForm: FormGroup = new FormGroup({});
  date = new FormControl(new Date());
  ipoList: Ipo[]=[];

  headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getJwtToken());
  httpOptions = {
    headers: this.headers_object
  };

  constructor(private authService:AuthServiceService,private ipoService: IpoService,private http:HttpClient, private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {

    this.http.get(`http://localhost:8080/api/ipo/all`,this.httpOptions).subscribe(
      (response) => {
        this.ipoList=<Ipo[]> response;
      },
      (error) => console.log(error)
    )
    this.ipoForm = this.formBuilder.group({
      id: [''],
      companyName: [''],
      stockExchange:[''],
      pricePerShare:[''],
      totalShares:[''],
      remarks:['']
    }); 
  }

  get f() { return this.ipoForm.controls; }

  add(){
    this.ipoService.addIpo(
      {
        id: this.f.id.value,
        companyName: this.f.companyName.value,
        stockExchange: this.f.stockExchange.value, 
        pricePerShare: this.f.pricePerShare.value,
        totalShares: this.f.totalShares.value,
        openingDate: this.date.value,
        remarks:this.f.remarks.value
      }
    )
    this.ngOnInit()


  }

  edit(ipo:Ipo){

    this.f.id.setValue(ipo.id)
    this.f.companyName.setValue( ipo.companyName)
    this.f.stockExchange.setValue( ipo.stockExchange)
    this.f.pricePerShare.setValue( ipo.pricePerShare)
    this.f.totalShares.setValue( ipo.totalShares)
    this.date.setValue( ipo.openingDate)
    this.f.remarks.setValue( ipo.remarks)

  }

  delist(ipo:Ipo){
    this.http.post<any>(`http://localhost:8080/api/ipo/delete`,ipo,this.httpOptions).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
    )
    this.ngOnInit();

  }

}
