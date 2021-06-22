import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Company } from 'src/app/model/company';
import { Sector } from 'src/app/model/sector';
import { CompanyService } from 'src/app/services/company.service';
import { environment } from 'src/environments/environment.prod';
import { DialogBoxComponent} from '../dialog-box/dialog-box.component'



@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.css']
})
export class ManageCompanyComponent implements OnInit {
  companyList: Company[]=[];
  sector: Sector[]=[];
  displayedColumns: string[] = ['companyName', 'companyCEO', 'companyTurnover','boardOfDirectors','listedExchanges','sector','action'];

  baseUrl= environment.baseUrl;
  
  headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getJwtToken());
  httpOptions = {
    headers: this.headers_object
  };

  constructor(private authService:AuthServiceService,private companyService:CompanyService,private http:HttpClient,private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {

    this.http.get(`${this.baseUrl}/api/company/all`,this.httpOptions).subscribe(
      (response) => {
        this.companyList=<Company[]> response;
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
        console.log(result.data);
        this.http.post<any>(`${this.baseUrl}/api/company/delete`,result.data,this.httpOptions).subscribe(
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
    this.router.navigate(['/manage/company/add']);
  }



}


