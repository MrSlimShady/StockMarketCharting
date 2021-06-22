import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from './model/tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly ROLE='ROLE';
  private loggedUser: string='';
  
  role!: string;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) { }

  // login(data:any):Observable<any>{
  //   return this.http.post('http://localhost:8080/authenticate',data);
  // }

  login(user: { username: string, password: string }): Observable<boolean> {
    
    return this.http.post<any>(`http://localhost:8080/api/auth/signin`, user)
      .pipe(
        tap(tokens => {this.doLoginUser(user.username, tokens);}),
        mapTo(true),
        catchError(error => {
          console.error();
          return of(false);
        }));
  }

  register(user: { username: string, password: string ,email: string,mobileNumber: string,role: string}): void {
    this.http.post<any>(`http://localhost:8080/api/auth/signup`, user).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => console.log(error)
      );
      
  }

  logout() {
    this.doLogoutUser();
    return true;
  }


  get checkLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  isLoggedIn() {
  
    if(!!this.getJwtToken()) this.loggedIn.next(true);
    else this.loggedIn.next(false); 
    return !!this.getJwtToken();
  }
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getRole(){
    return localStorage.getItem(this.ROLE);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    
    // console.log(tokens.username+' '+tokens.email+' '+tokens.roles+' '+tokens.accessToken);
    this.role = tokens.roles.toString();
    this.loggedIn.next(true);
    this.loggedUser = username;
    this.storeTokens(tokens);
    this.storeRole(this.role);
  }

  private doLogoutUser() {
    this.loggedIn.next(false);
    this.loggedUser = '';
    this.removeTokens();
    this.removeRole();
  }

  
  private storeTokens(tokens: Tokens) {
    console.log(tokens.token);
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
  }

  private storeRole(role: string){
    localStorage.setItem(this.ROLE, role);
  }
  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
  private removeRole() {
    localStorage.removeItem(this.ROLE);
  }

}
