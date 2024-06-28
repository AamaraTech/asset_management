import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from '../api-url.token';
import { Observable, catchError, of } from 'rxjs';
import { SharedService } from '../shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly api_url = inject(API_URL);
  
  constructor(
    private _sharedService: SharedService) { }

  get<T>(url: string, queryParams?:any | HttpParams): Observable<T> {
    return this.http.get<T>(this.api_url + url, { params: queryParams,reportProgress: true }).pipe(
      catchError((error) => {
        this._sharedService.handleError(error);
        return of({} as T)
      })
    )
  }


  getJson<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  delete<T>(url: string, id): Observable<T> {
    let deleteUrl = `${this.api_url + url}${id}/`;
    return this.http.delete<T>(deleteUrl);
  }

  post<T, D>(url: string, data: D, params?:HttpParams): Observable<T> {
    let postUrl = `${this.api_url + url}`;
    return this.http.post<T>(postUrl, data,{params,reportProgress: true});
  }

  put<T, D>(url: string, data: D): Observable<T> {
    let postUrl = `${this.api_url + url}`;
    return this.http.put<T>(postUrl, data);
  }
}
