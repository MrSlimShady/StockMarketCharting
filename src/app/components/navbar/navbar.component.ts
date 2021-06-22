import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedin!: boolean;
  isLoggedIn$: Observable<boolean> | undefined;   
  isAdmin!: boolean;

  constructor(private authService:AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    
    this.isLoggedIn$ = this.authService.checkLoggedIn;
    this.isLoggedIn$.subscribe(success => {
      if (success) {
        this.isLoggedin=true;
        if(this.authService.getRole()==="[ROLE_ADMIN]"){
          this.isAdmin=true;
        }else{
          this.isAdmin=false;
        }
      }else{
        this.isLoggedin=false;
        if(this.authService.getRole()==="[ROLE_ADMIN]"){
          this.isAdmin=true;
        }else{
          this.isAdmin=false;
        }
      }
    });    
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
