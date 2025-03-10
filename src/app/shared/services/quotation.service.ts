import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Quotation } from '../../interfaces/quotations';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private apiUrl = `${environment.apiUrl}/Quotes`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  // Get all quotes
  getQuotes(): Observable<Quotation[]> {
    console.log('Calling API:', this.apiUrl);
    return this.http.get<Quotation[]>(this.apiUrl, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Get quote by ID
  getQuoteById(id: number): Observable<Quotation> {
    return this.http.get<Quotation>(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Create new quote
  createQuote(quote: Quotation): Observable<Quotation> {
    return this.http.post<Quotation>(this.apiUrl, quote, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update quote
  updateQuote(id: number, quote: Quotation): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, quote, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete quote
  deleteQuote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    
    if (error.status === 0) {
      console.error('A client-side or network error occurred:', error.error);
      console.error('Is the API running? Check CORS configuration and HTTPS certificates.');
    } else {
      console.error(
        `Backend returned code ${error.status}, body was:`, error.error);
    }
    
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}

