import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Exchange } from 'src/app/model/exchange';
import { environment } from '../../../environments/environment.prod';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-manage-exchange',
  templateUrl: './manage-exchange.component.html',
  styleUrls: ['./manage-exchange.component.css']
})
export class ManageExchangeComponent implements OnInit {
  exchangeList: Exchange[]=[];
  displayedColumns: string[] = ['stockExchange', 'brief', 'contactAddress','remarks','action'];
  baseUrl= environment.baseUrl;

  headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getJwtToken());
  httpOptions = {
    headers: this.headers_object
  };


  constructor(private authService:AuthServiceService,private http:HttpClient,private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.http.get(`${this.baseUrl}/api/exchange/all`).subscribe(
    //   (response) => {
    //     this.exchangeList=<Exchange[]> response;
    //   },
    //   (error) => console.log(error)
    // )
    this.http.get(`http://localhost:8080/api/exchange/all`,this.httpOptions).subscribe(
      (response) => {
        this.exchangeList=<Exchange[]> response;
      },
      (error) => console.log(error)
    )
  }


  openDialog(action: any,obj: { action: any; }) {
    obj.action = action;

    console.log(obj);
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Update'){
        console.log(result.data);
      }else if(result.event == 'Delete'){

        this.http.post<any>(`http://localhost:8080/api/exchange/delete`,result.data,this.httpOptions).subscribe(
      (response) => {
       console.log(response);
      },
      (error) => console.log(error)
    )
      this.ngOnInit();
      }
    });
  }

  add(){
    this.router.navigate(['/manage/exchange/add']);
  }

}
