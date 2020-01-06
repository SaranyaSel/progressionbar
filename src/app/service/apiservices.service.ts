import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bar } from '../bar';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {
  public url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://pb-api.herokuapp.com/bars';
  }
  getData(): Observable<Bar[]> {
    const url = this.url;
    const httpObservable = this.http.get<Bar[]>(url)
      .pipe(map(response => response));
    // console.log(httpObservable);
    return httpObservable;
  }
}
