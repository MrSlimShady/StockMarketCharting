import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private companyService: CompanyService,private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
      
    this.router.navigate(['/login']);

  }

}
