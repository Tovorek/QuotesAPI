import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirstKeyPipe } from "../../shared/pipes/first-key.pipe";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, FirstKeyPipe,MatFormFieldModule,MatInputModule,MatButtonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
 constructor(public formBuilder: FormBuilder, private toastr:ToastrService,private router: Router){}
  isSubmitted:boolean = false;
  form =  this.formBuilder.group({
     userName : ['',Validators.required],
     password: ['',Validators.required]
   })
  hasDisplayableError(controlName:string): Boolean{
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) 
    && (this.isSubmitted || Boolean(control?.touched)|| Boolean(control?.dirty));
  }
  onSubmit(){
    this.isSubmitted=true
    this.toastr.success('Logged in successfully!','')
    this.router.navigateByUrl('/quotation');
  }
}
