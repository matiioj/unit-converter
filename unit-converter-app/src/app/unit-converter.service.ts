import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitConverterService {
  private apiUrl = 'http://localhost:5180/unitconverter'; // Adjust this URL to match your backend

  constructor(private http: HttpClient) {}

  convert(request: any): Observable<number> {
    return this.http.post<number>(this.apiUrl, request);
  }
}