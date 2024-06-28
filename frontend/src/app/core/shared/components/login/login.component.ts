import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
  ],
  standalone: true,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showEyeIcon = true;

  private _authService = inject(AuthService);
  private router = inject(Router);
  private _sharedService = inject(SharedService);
  public translate = inject(TranslateService);

  ngOnInit(): void {
    this.loginForm =  new FormGroup({
      email: new FormControl('',   [Validators.email]),
      password: new FormControl("",[Validators.minLength(4), Validators.maxLength(16)])
    })
  }

  toggleIcon() {
    this.showEyeIcon = !this.showEyeIcon;
  }

  submitHandler() {
    const userInfo = {
      email: this.loginForm?.value?.email,
      password: this.loginForm?.value?.password,
    };
    this._authService.loginUser(userInfo).subscribe((data) => {
      this._sharedService.handleSuccess(
        this.translate.instant('loginSuccessTitle_TC'),
        this.translate.instant('loginSuccessText_TC', {
          name: data.first_name ? data.first_name : userInfo.email,
        })
      );

      if (data?.is_superuser) {
        this.router.navigateByUrl('wareshouse-list');
      } else {
        this.router.navigateByUrl('home');
      }
    });
  }
}
