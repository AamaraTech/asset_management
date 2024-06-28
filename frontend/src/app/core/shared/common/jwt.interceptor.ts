import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, Injector, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedService, testServiceFactory } from '../services/shared.service';



export const jwtInterceptor = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  let w_id: string | null = '';
  let s_id: string | null = '';
  let requestParams = request.params;
  const currentUser = sessionStorage.getItem('user_id');
  const token = sessionStorage.getItem('accessToken');
  const is_superuser = sessionStorage.getItem('is_superuser');
  const location_type = sessionStorage.getItem('location_type');
  /* Custom request url */
  const currentDomain: string = window.location.hostname;
  const regex = /(.*?)\./;   // client.localhost.ams.com
  const match: any = currentDomain.match(regex);
  console.log("match", match)

  if (match && request.url.includes(environment.BASE_SERVICE_URL)) {
    // Modify the request URL
    request = modifyRequestUrl(request, match[1]);
  }
  if (currentUser && token) {
    if (location_type === 'warehouse') {
      w_id = sessionStorage.getItem('w_id');
      requestParams = requestParams.append('w_id', w_id);
    }
    if (location_type === 'store') {
      s_id = sessionStorage.getItem('s_id');
      requestParams = requestParams.append('s_id', s_id);
    }
    if (location_type === 'warehouses') {
      w_id = sessionStorage.getItem('w_id');
      requestParams = requestParams.append('id__in', w_id);
    }
    if (location_type === 'stores') {
      s_id = sessionStorage.getItem('s_id');
      requestParams = requestParams.append('id__in', s_id);
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      params: requestParams,
    });
  }
  return next(request).pipe(
    tap(async (event: HttpEvent<any>) => {
      if (event.type === HttpEventType.DownloadProgress) {
        const percentage = (100 / (event.total || 1)) * event.loaded;
        // const testsService =  testServiceFactory()
        // testsService.updateProgress(percentage);
        // sharedService.updateProgress(percentage);
        // return percentage
      }
      if (event.type === HttpEventType.Response) {
        return event.body;
      }
    }));
};


/**
 * Modify the request URL by replacing the base service URL with the base URL + domain name.
 *
 * @param request - The original HTTP request to be modified.
 * @param domain - The domain name to be appended to the URL.
 * @returns A modified HTTP request with the updated URL.
 */
function modifyRequestUrl(request: HttpRequest<any>, domain: string): HttpRequest<any> {
  const modifiedUrl = request.url.replace(environment.BASE_SERVICE_URL, `${environment.BASE_SERVICE_URL + domain}`);
  return request.clone({
    url: modifiedUrl,
  });
}