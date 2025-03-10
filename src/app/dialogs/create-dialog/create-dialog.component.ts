import { Component, Inject, OnInit } from '@angular/core';
import { Quotation } from '../../interfaces/quotations';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { QuotationService } from '../../shared/services/quotation.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.css',
})
export class CreateDialogComponent implements OnInit {
  isEditMode = false;
  
  quoteUpdateForm = new FormGroup({
    no: new FormControl({ value: '0', disabled: true }),
    quoteType: new FormControl('', Validators.required),
    sales: new FormControl('', Validators.required),
    premium: new FormControl('', [Validators.required, Validators.min(0)]),
    dueDate: new FormControl(new Date(), Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Quotation, 
    private datePipe: DatePipe, 
    private quoteService: QuotationService
  ) {}

  ngOnInit() {
    // If data exists, we're in edit mode
    if (this.data) {
      this.isEditMode = true;
      this.quoteUpdateForm.patchValue({
        no: this.data.no.toString(),
        quoteType: this.data.quoteType.toLowerCase(), // Convert to lowercase to match mat-option values
        sales: this.data.sales,
        premium: this.data.premium.toString(),
        dueDate: new Date(this.data.dueDate),
        description: this.data.description
      });
    }
  }

  OnCreate() {
    if (this.quoteUpdateForm.valid) {
      console.log('Form submitted:', this.quoteUpdateForm.value);
      
      // Prepare the quote data
      const formValues = this.quoteUpdateForm.getRawValue();
      
      const quoteData: Quotation = {
        no: parseInt(formValues.no || '0'),
        quoteType: formValues.quoteType || '', // Capitalize first letter
        sales: formValues.sales || '',
        premium: parseFloat(formValues.premium || '0'),
        dueDate: formValues.dueDate ? this.datePipe.transform(formValues.dueDate, 'yyyy-MM-dd') || '' : '',
        description: formValues.description || ''
      };
      
      // Close the dialog and pass the data back to the parent component
      this.dialogRef.close(quoteData);
    } else {
      // Mark all fields as touched to trigger validation messages
      this.quoteUpdateForm.markAllAsTouched();
      console.error('Form validation failed');
    }
  }
}