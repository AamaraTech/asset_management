import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, catchError, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private data = new Subject<any>();

  private myObservableSubject = new BehaviorSubject<any>(0);
  myObservable$ = this.myObservableSubject.asObservable();
  private readonly _httpClient = inject(HttpClient);
  private readonly _messageService = inject(MessageService);

  handleSuccess(title?: any, description?: any) {
    let successTitle = title ? title : 'SUCCESS';
    let successText = description ? description : '';
    this._messageService.add({
      key: 'toaster',
      severity: 'success',
      summary: successTitle,
      detail: successText,
      life: 1000,
    });
  }

  handleError(error?: any) {
    let errorTitle = 'ERROR';
    let errorText = 'Unable to process your request.';

    if (error) {
      var keyjson = 'Bad Request';
      for (var key in error?.detail) {
        keyjson = error?.detail;
      }
      errorTitle = error?.statusText;
      errorText = keyjson;
    }

    this._messageService.add({
      key: 'toaster',
      severity: 'error',
      summary: errorTitle,
      detail: errorText,
      life: 5000,
    });
  }

  handleWarning(error?: any) {
    let errorTitle = 'WARNING';
    let errorText = 'Unable to process your request.';

    if (error) {
      // errorTitle = error;
      errorText = error;
    }

    this._messageService.add({
      key: 'toaster',
      severity: 'warn',
      summary: errorTitle,
      detail: errorText,
      life: 5000,
    });
  }

  clear() {
    this._messageService.clear();
  }

  sendData(data: any) {
    this.data.next(data);
  }

  getData() {
    return this.data.asObservable();
  }

  reverseGeocode(lat: number, lng: number) {
    console.log('lat', lat, lng);
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    return this._httpClient.get(nominatimUrl).pipe(
      catchError((err) => {
        this.handleError();
        return err;
      })
    );
  }



  updateProgress(percentage: number) {
    this.myObservableSubject.next(percentage);
  }


}

export function testServiceFactory() {
  return inject(SharedService); 
}

