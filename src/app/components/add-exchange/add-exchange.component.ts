import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Exchange } from 'src/app/model/exchange';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-add-exchange',
  templateUrl: './add-exchange.component.html',
  styleUrls: ['./add-exchange.component.css']
})
export class AddExchangeComponent implements OnInit {
  exchangeForm: FormGroup = new FormGroup({});
  exchangeList: Exchange[]=[];

  constructor(private exchangeService: ExchangeService, private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.exchangeForm = this.formBuilder.group({
      stockExchange: [''],
      brief:[''],
      contactAddress:[''],
      remarks:[''],
    });
    this.exchangeService.getExchangeList();
  }

  get f() { return this.exchangeForm.controls; }

  add(){
    this.exchangeService.add(
      {
        stockExchange: this.f.stockExchange.value,
        brief: this.f.brief.value,
        contactAddress: this.f.contactAddress.value,
        remarks: this.f.remarks.value
      }
    )
    this.router.navigate(['/manage/exchange']);
  }

  getAll(){
    this.exchangeList=this.exchangeService.get();
    console.log(this.exchangeList);
  }
}
