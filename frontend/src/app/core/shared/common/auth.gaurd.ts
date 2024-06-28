import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export const authGuard = ():
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> => {
  const router = inject(Router);
  if (
    sessionStorage.getItem('accessToken') !== '' &&
    sessionStorage.getItem('accessToken') !== null
  ) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};

export const canLeaveGuard = ():
| boolean
| UrlTree
| Observable<boolean | UrlTree>
| Promise<boolean | UrlTree> => {
const router = inject(Router);
if (
  sessionStorage.getItem('accessToken') !== '' &&
  sessionStorage.getItem('accessToken') !== null
) {
  return router.createUrlTree(['/home']);
} else {
  return router.createUrlTree(['/login']);
}
};
