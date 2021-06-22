import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from 'src/app/auth-service.service';
import { StockPrice } from 'src/app/model/stockprice';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-form',
  templateUrl: './import-form.component.html',
  styleUrls: ['./import-form.component.css']
})
export class ImportFormComponent implements OnInit {
  file!: File;
  SERVER_URL = "http://localhost:8080/api/excel/upload";
  uploadForm: FormGroup = new FormGroup({});
  fileName: any;

  headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getJwtToken());
  httpOptions = {
    headers: this.headers_object
  };

  hasData: boolean = false;
  stockPrice:StockPrice[]=[];
  // displayedColumns: string[] = ['companyCode', 'stockExchange', 'pricePerShare','date','time'];


  constructor(private _snackBar: MatSnackBar,private authService:AuthServiceService,private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
  get f() { return this.uploadForm.controls; }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


  onFileSelect(event:any) {
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.f.profile.setValue(file);
      this.fileName = file.name;

      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = (e: any) => {
        const binarystr = e.target.result;

        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary',cellText:false,cellDates:true});

        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws, { header:1,raw:false,dateNF:'yyyy-mm-dd'});

        const importData = <String[][]>data.slice(1,-1);
        // console.log(importData);
        importData.forEach( i => {
          var sp = new StockPrice;
          sp.companyCode = i[0].trim();
          sp.stockExchange = i[1].trim();
          sp.currentPrice = i[2].trim();
          sp.date = this.stringToDate( i[3].trim());
          sp.time = i[4].trim();
          this.stockPrice.push(sp);
        });

        // console.log(this.stockPrice);
        this.hasData = true;
      }


    }


  }

  stringToDate(date : string): Date{
      var parts =date.split('-');
      var day=parseInt(parts[2]);
      var year=parseInt(parts[0]);
      var month=parseInt(parts[1]);
          month-=1;
      return new Date(year, month, day);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.f.profile.value);



    this.httpClient.post<any>(this.SERVER_URL, formData,this.httpOptions).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.openSnackBar("excel file uploaded","success");
  }
}
