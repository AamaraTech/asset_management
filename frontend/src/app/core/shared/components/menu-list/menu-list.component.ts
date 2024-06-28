import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { RouterLink } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',

  styleUrls: ['./menu-list.component.scss'],
  imports: [ButtonModule, MenuModule, PanelMenuModule, RouterLink, TranslateModule],
  standalone: true
})
export class MenuListComponent implements OnInit {

  @Input() isSideBarOptionsEnabled: boolean;
  @Output() emitter = new EventEmitter();
  medObjects: any = [];
  mastersObject: any = [];
  companyObjects: any = [];
  ppcObjects: any = [];
  mcoObjects: any = [];
  prodObjects: any = [];
  rIObjects: any = [];
  pscObjects: any = [];
  lpSecObjects: any = [];
  mssObjects: any = [];

  items: MenuItem[] = [
    // {
    //   label: 'Home',
    //   icon: 'pi pi-fw pi-home',
    //   routerLink: ["/home"],
    // },
    {
      label: 'Admin',
      // icon: 'pi pi-fw pi-calendar',
      items: [
        {
          label: 'Store',
          icon: 'pi pi-fw pi-pencil',
          routerLink: ["/store"],
          routerLinkActiveOptions: { exact: true }
    
        },
      ]},

    {
      label: 'Assets',
      // icon: 'pi pi-fw pi-calendar',
      items: [
        {
          label: 'Item Category',
          icon: 'pi pi-fw pi-pencil',
          routerLink: "/item-category",
          routerLinkActiveOptions: { exact: true }

        },
        {
          label: 'Item Sub-Category',
          icon: 'pi pi-fw pi-calendar-times',
          routerLink: "/item-subcategory",
          routerLinkActiveOptions: { exact: true }
        },
        ,
        {
          label: 'Item Creation',
          icon: 'pi pi-fw pi-calendar-times',
          routerLink: "/item-creation",
          routerLinkActiveOptions: { exact: true }
        },
        {
          label: 'Asset Location',
          icon: 'pi pi-fw pi-calendar-times',
          routerLink: "/location",
          routerLinkActiveOptions: { exact: true }
        }
      ]
    },
    {
      label: 'Master',
      // icon: 'pi pi-fw pi-calendar',
      items: [
        {
          label: 'Vendor Master',
          icon: 'pi pi-fw pi-box',
          routerLink: "/vendor-master",
          routerLinkActiveOptions: { exact: true }

        },
        {
          label: 'Employee Creation',
          icon: 'pi pi-fw pi-users',
          routerLink: ["/employee-creation"],
          routerLinkActiveOptions: { exact: true }

        }
      ]
    },
    {
      label: 'Purchase',
      // icon: 'pi pi-fw pi-calendar',
      items: [
        {
          label: 'Purchase Order',
          icon: 'pi pi-fw pi-box',
          routerLink: "/purchase-order",
          routerLinkActiveOptions: { exact: true }

        }
      ]
    },
    {
      label: 'Inventory',
      // icon: 'pi pi-fw pi-calendar',
      items: [
        {
          label: 'GRN',
          icon: 'pi pi-fw pi-box',
          routerLink: "/grn",
          routerLinkActiveOptions: { exact: true }

        }
      ]
    }
  ];


  constructor(private _authService: AuthService,
    private http: HttpClient, private permissionsService: NgxPermissionsService,) { }

  ngOnInit(): void {
    this.getMastersButtons();
    this.getCompanyButtons();
  }

  isUserLoggedIn() {
    return this._authService.checkLogin();
  }

  closeMenu() {
    this.emitter.emit(false);
  }


  getMastersButtons() {
    this.http.get('assets/appJson/masters.json').subscribe(
      list => {
        this.mastersObject = JSON.stringify(list['masters']);
        // console.log("med objects", this.mastersObject)
      }
    )
  }
  getCompanyButtons() {
    this.http.get('assets/appJson/company.json').subscribe(
      list => {
        this.companyObjects = JSON.stringify(list['company']);
        // console.log("med objects", this.companyObjects)
      }
    )
  }


}
