import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  registerForm: FormGroup = new FormGroup({});
  
  constructor(private authService: AuthServiceService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username:new FormControl('', [
        Validators.required
      ]),
      password:new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      email:new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
    
    
      mobileNumber:new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)
      ]),
    
      role:['ROLE_USER']
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    if(controlName == "username")
    return this.registerForm.controls.username.hasError(errorName);
    if(controlName == "password")
    return this.registerForm.controls.password.hasError(errorName);
    if(controlName == "email")
    return this.registerForm.controls.email.hasError(errorName);
    if(controlName == "mobileNumber")
    return this.registerForm.controls.mobileNumber.hasError(errorName);
    else return ;
  }

  get f() { return this.registerForm.controls; }

  register() {
    if (this.registerForm.valid){


    this.authService.register(
      {
        username: this.f.username.value,
        password: this.f.password.value,
        email: this.f.email.value,
        mobileNumber: this.f.mobileNumber.value,
        role: this.f.role.value
      }
    )

    this.router.navigate(['/login']);
  }
}

}
