import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FirstKeyPipe } from "../../shared/pipes/first-key.pipe";
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, FirstKeyPipe,RouterLink,MatFormFieldModule,MatInputModule,MatButtonModule],
  standalone:true,
  templateUrl: './register.component.html',
    styleUrl: './register.scss'
})
export class RegisterComponent {
  constructor(public formBuilder: FormBuilder){}
  isSubmitted:boolean = false;
  passwordMatchValidator: ValidatorFn = (control:AbstractControl):null =>{
    const password = control.get('password')
    const confirmPass = control.get('confirmPass')
    if(password && confirmPass && password.value!=confirmPass.value)
      confirmPass?.setErrors({passwordMismatch:true})
    else
      confirmPass?.setErrors(null)
    return null;
  }
  
  form =  this.formBuilder.group({
    userName : ['',Validators.required],
    password: ['',[
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/)
    ]],
    confirmPass:['']
  },{validators:this.passwordMatchValidator})

  onSubmit(){
    this.isSubmitted=true
    console.log(this.form.value);
  }
  hasDisplayableError(controlName:string): Boolean{
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) 
    && (this.isSubmitted || Boolean(control?.touched)|| Boolean(control?.dirty));
  }
}
