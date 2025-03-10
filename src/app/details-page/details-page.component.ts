import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuotationService } from '../shared/services/quotation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-details-page',
  standalone:true,
  imports: [CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatIconModule,
      MatButtonModule],
  templateUrl: './details-page.component.html',
  styles: ``
})
export class DetailsPageComponent implements OnInit{
  
  quoteDetailForm = new FormGroup({
      no: new FormControl(''),
      quoteType: new FormControl(''),
      sales: new FormControl(''),
      premium: new FormControl(''),
      dueDate: new FormControl(''),
      description: new FormControl(''),
    });
    constructor(private quoteService : QuotationService,private router: ActivatedRoute) {
        
      }

  picName:string = '';
  quoteNo:string = '';
  quoteType:string = '';
  sales:string = '';
  premium:string = '';
  dueDate:string = '';
  description:string = '';
  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      console.log(params);
      if(params['quoteType'] === 'Auto')
        this.picName = 'auto'
      else if(params['quoteType'] === 'Boat')
        this.picName = 'boat'
      else if(params['quoteType'] === 'House')
        this.picName = 'house'
      else
        this.picName=''

      this.quoteDetailForm.controls['no'].setValue(params['no']);
      this.quoteDetailForm.controls['quoteType'].setValue(params['quoteType']);
      this.quoteDetailForm.controls['sales'].setValue(params['sales']);
      this.quoteDetailForm.controls['premium'].setValue(params['premium']);
      this.quoteDetailForm.controls['dueDate'].setValue(params['dueDate']);
      this.quoteDetailForm.controls['description'].setValue(params['description']);

      this.quoteNo = params['no'];
      this.quoteType = params['quoteType'];
      this.sales= params['sales'];
      this.premium=params['premium'];
      this.dueDate = params['dueDate'];
      this.description = params['description'];
    });
  }

}
