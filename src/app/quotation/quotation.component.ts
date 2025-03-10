import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Quotation } from '../interfaces/quotations';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { QuotationService } from '../shared/services/quotation.service';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CreateDialogComponent } from '../dialogs/create-dialog/create-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common'; // Add NgIf here
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule,
    CurrencyPipe,
    DatePipe,
    NgIf // Add NgIf to imports
  ],
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.scss'
})
export class QuotationComponent implements OnInit {

  dataSource = new MatTableDataSource<Quotation>();
  isLoading = true;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  columnsToDisplay = ['no','quoteType','description','sales','dueDate','premium','action'];
  
  constructor(
    private quoteService: QuotationService, 
    private dialog: MatDialog, 
    private router: Router,
    private toastr: ToastrService
  ) {}
  
  ngOnInit(): void {
    this.loadQuotes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadQuotes() {
    this.isLoading = true;
    this.quoteService.getQuotes().subscribe({
      next: (quotes) => {
        this.dataSource.data = quotes;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching quotes', error);
        this.toastr.error('Failed to load quotes', 'Error');
        this.isLoading = false;
      }
    });
  }

  onAddTask() {
    let dialogRef = this.dialog.open(CreateDialogComponent, {
      height: '550px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.quoteService.createQuote(result).subscribe({
          next: () => {
            this.toastr.success('Quote created successfully', 'Success');
            this.loadQuotes();
          },
          error: (error) => {
            console.error('Error creating quote', error);
            this.toastr.error('Failed to create quote', 'Error');
          }
        });
      }
    });
  }

  editRow(quote: Quotation) {
    let dialogRef = this.dialog.open(CreateDialogComponent, {
      height: '550px',
      width: '600px',
      data: quote
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.quoteService.updateQuote(quote.no, result).subscribe({
          next: () => {
            this.toastr.success('Quote updated successfully', 'Success');
            this.loadQuotes();
          },
          error: (error) => {
            console.error('Error updating quote', error);
            this.toastr.error('Failed to update quote', 'Error');
          }
        });
      }
    });
  }

  viewRow(quote: Quotation) {
    this.router.navigate(['/details-page'], { queryParams: quote });
  }

  deleteRow(quote: Quotation) {
    if (confirm(`Are you sure you want to delete quote #${quote.no}?`)) {
      this.quoteService.deleteQuote(quote.no).subscribe({
        next: () => {
          this.toastr.success('Quote deleted successfully', 'Success');
          this.loadQuotes();
        },
        error: (error) => {
          console.error('Error deleting quote', error);
          this.toastr.error('Failed to delete quote', 'Error');
        }
      });
    }
  }

  onSearch(event: Event) {
    const srcValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = srcValue.trim().toLowerCase();
  }
}