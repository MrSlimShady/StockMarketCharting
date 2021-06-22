import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // formGroup: FormGroup = new FormGroup({});
  loginForm: FormGroup = new FormGroup({});
  constructor(private authService: AuthServiceService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    // this.initForm();
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }
  get f() { return this.loginForm.controls; }

  public hasError = (controlName: string, errorName: string) =>{
    if(controlName == "username")
    return this.loginForm.controls.username.hasError(errorName);
    if(controlName == "password")
    return this.loginForm.controls.password.hasError(errorName);
    else return ;
  }

  fail:boolean=false;

  login() {
    this.loginForm.valid
    this.authService.login(
      {
        username: this.f.username.value,
        password: this.f.password.value
      }
    )
    .subscribe(success => {
      if (success) {
        this.router.navigate(['/dashboard']);

      }else{
        this.fail=true;
      }
    });
  
  }

}
