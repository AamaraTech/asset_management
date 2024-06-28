import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import {
  CustomTokenObtainPair,
  TokenRefresh,
  User,
} from '../models/security.model';
import { ServiceUrlConstants } from '../utils/service-url-constants';
import { SharedService } from './shared.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly signinURL: string = ServiceUrlConstants.SIGN_IN;
  private readonly signupURL: string = ServiceUrlConstants.SIGN_UP;
  private readonly refreshTokenURL: string = ServiceUrlConstants.REFRESH_TOKEN;

  private username: any = {};
  private refreshTokenTimeout: any;

  private authenticationObs$: BehaviorSubject<any> = new BehaviorSubject(false);

  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);
  private readonly _sharedService = inject(SharedService);
  private readonly translate = inject(TranslateService);
  private readonly permissionsService = inject(NgxPermissionsService)

  loginUser(userInfo: CustomTokenObtainPair): Observable<any> {
    return this.apiService.post<any, any>(this.signinURL, userInfo).pipe(
      map((user) => {
        sessionStorage.setItem('accessToken', user.access);
        sessionStorage.setItem('user_id', user.user_id);
        localStorage.setItem('permissions', JSON.stringify(user.permission));
        sessionStorage.setItem('is_active', JSON.stringify(true));
        sessionStorage.setItem('accessToken', user.access);
        sessionStorage.setItem('refresh', user.refresh);
        sessionStorage.setItem('first_name', user.first_name);
        sessionStorage.setItem('email', userInfo.email);
        sessionStorage.setItem('user_id', user.user_id);
        sessionStorage.setItem('phone_number', user.phone_number);
        sessionStorage.setItem('location_type', user.location_type);

        if (user?.location_type === 'warehouse') {
          sessionStorage.setItem('w_id', user.w_id);
        }
        if (user?.location_type === 'warehouses') {
          sessionStorage.setItem('w_id', user.w_id.join(','));
        }
        if (user?.location_type === 'store') {
          sessionStorage.setItem('s_id', user.s_id);
        }
        if (user?.location_type === 'stores') {
          sessionStorage.setItem('s_id', user.s_id.join(','));
        }
        if (user?.is_superuser) {
          sessionStorage.setItem('is_superuser', user?.is_superuser);
        } else {
          sessionStorage.setItem('is_superuser', 'false');
        }
        this.username = user?.first_name;
        this.startRefreshTokenTimer();
        this.setAuthenticationObs(true);
        this.permissionsService.loadPermissions(user.permission);
        return user;
      }),
      catchError((error) => {
        console.log(error);
        throw this._sharedService.handleError(error);
      })
    );
  }

  registerUser(registerInfo: User): Observable<any> {
    return this.apiService.post<any, any>(this.signupURL, registerInfo);
  }

  checkLogin(): any {
    return sessionStorage.getItem('accessToken');
  }

  logout() {
    this.stopRefreshTokenTimer();
    sessionStorage.clear();
    localStorage.clear();
    this.setAuthenticationObs(false);
    this.router.navigate(['/login']);
    this._sharedService.handleSuccess(
      this.translate.instant('logoutSuccessTitle_TC')
    );
  }

  startRefreshTokenTimer() {
    const timeout = Date.now() + 10 * 60 * 1000 - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  refreshToken(): any {
    const tokenRefresh: TokenRefresh = {
      refresh: sessionStorage.getItem('refresh'),
    };
    return this.apiService.post<any, any>(this.refreshTokenURL, tokenRefresh);
  }

  stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  getToken() {
    return sessionStorage.getItem('accessToken');
  }
  isAunthenticated() {
    return sessionStorage.getItem('accessToken') != null;
  }
  getUserDetails() {
    return this.username;
  }
  getAuthenticationObs(): Observable<boolean> {
    return this.authenticationObs$.asObservable();
  }
  setAuthenticationObs(isAuthenticated: boolean) {
    this.authenticationObs$.next(isAuthenticated);
  }
}
