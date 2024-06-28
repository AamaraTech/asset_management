import { Component, ViewChild, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { MenuItem } from 'primeng/api/menuitem';
import { PanelModule } from 'primeng/panel';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { ApiService } from './core/services/api.service';
import { FooterComponent } from './core/shared/components/footer/footer.component';
import { TopbarComponent } from './core/shared/components/topbar/topbar.component';
import { ContextService } from './core/shared/state/context.service';
import { StaticURLConstants } from './core/shared/utils/static-url.constants';
import { PrimeNgUtil } from './core/shared/utils/primeng.util';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollComponent } from './sanadi-library/sanadi-components/scroll/scroll.component';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { MenuListComponent } from './core/shared/components/menu-list/menu-list.component';
import { SideMenuComponent } from './core/shared/components/side-menu/side-menu.component';
import { TableModule } from 'primeng/table';
import { FlexLayoutModule } from './sanadi-library/flex-layout/module';
@Component({
  selector: 'sanadi-ams',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    ToastModule,
    PanelModule,
    SpeedDialModule,
    TopbarComponent,
    FooterComponent,
    NgxPermissionsModule,
    ProgressSpinnerModule,
    ScrollComponent,
    SidebarModule,
    MenuListComponent,
    SideMenuComponent,
    TableModule,
    FlexLayoutModule
  ],
  providers: [NgxPermissionsService],
  standalone: true,
})
export class AppComponent {
  speedDialOptionsSignal = signal<MenuItem[]>(
    new PrimeNgUtil().getSpeedDialConfig()
  );
  isSidebarOpen: boolean = false

  private readonly apiService = inject(ApiService);
  private readonly _contextService = inject(ContextService);
  public readonly translate = inject(TranslateService);
  private readonly permissionsService = inject(NgxPermissionsService);
  customers: { id: number; name: string; country: { name: string; code: string; }; company: string; date: string; status: string; verified: boolean; activity: number; representative: { name: string; image: string; }; balance: number; }[];

  constructor() {
    this.initialiseAppliction();
  }

  ngOnInit(): void {
    this.permissionsService.loadPermissions(
      JSON.parse(localStorage.getItem('permissions'))
    );

    this.customers = 
    [{
      id: 1000,
      name: 'James Butt',
      country: {
          name: 'Algeria',
          code: 'dz'
      },
      company: 'Benton, John B Jr',
      date: '2015-09-13',
      status: 'unqualified',
      verified: true,
      activity: 17,
      representative: {
          name: 'Ioni Bowcher',
          image: 'ionibowcher.png'
      },
      balance: 70663
  }];
  }

  initialiseAppliction() {
    this.translateSetup();
    this.getApplicationConfig();
  }

  translateSetup() {
    this.translate.addLangs(['en']);
    if (localStorage.getItem('language')) {
      this.translate.setDefaultLang(localStorage.getItem('language'));
    } else {
      this.translate.setDefaultLang('en');
    }
  }

  getApplicationConfig() {
    this.apiService
      .getJson(StaticURLConstants.APPLICATION_CONFIG)
      .subscribe((response) => {
        if (response) {
          this.setApplicationContext(response);
        }
      });
  }

  setApplicationContext(appConfig: any) {
    if (appConfig) {
      this._contextService.setApplicationConfig(appConfig);
      if (appConfig?.LayerConfig) {
        this._contextService.setLayerConfig(appConfig?.LayerConfig);
      }
    }
  }

  toggleMenu(event) {
    this.isSidebarOpen = event;
  }

  formatCurrency(value: number) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
}
