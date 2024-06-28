import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ContextService } from '../../state/context.service';
import { CommonConstants } from '../../utils/common.constants';
import { ThemeConsntant } from '../../utils/theme.enum';
import { MenuListComponent } from '../menu-list/menu-list.component';
import { TobarModel } from './topbar.model';
import { DropdownModule } from 'primeng/dropdown';
import { NgModel, NgModelGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sanadi-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  imports: [
    ToolbarModule,
    MenuModule,
    SidebarModule,
    ButtonModule,
    MenuListComponent,
    DropdownModule,
    TranslateModule,
    RouterLink,
    CommonModule,
  ],
  standalone: true,
})
export class TopbarComponent implements OnInit, OnDestroy {
  @Output() toggleMenu = new EventEmitter();
  vm: TobarModel = new TobarModel();
  @Input() isSidebarOpen: boolean = false;
  isUserLoggedIn = signal("");
  isSuperUser = signal(null);

  private langChangeSubscription: Subscription = new Subscription();

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  @Output() openSidebar: EventEmitter<any> = new EventEmitter();

  private readonly _contextService = inject(ContextService);
  private readonly translate = inject(TranslateService);
  private readonly _authService = inject(AuthService);
  private readonly router = inject(Router);

  cities = [
    { name: 'Warehouse', code: 'warehouse' },
    { name: 'Store', code: 'store' },
  ];

  selectedCity: any | undefined = 'warehouse';

  ngOnInit(): void {
    this._authService.getAuthenticationObs().subscribe((res)=>{
        this.isUserLoggedIn.set(this._authService.checkLogin());
        this.isSuperUser.set(sessionStorage.getItem('is_superuser') !== 'false')
    })

    this.vm.company_name = sessionStorage.getItem('companyName');
    this.vm.themeSelected =
      <ThemeConsntant>localStorage.getItem('theme') ??
      ThemeConsntant.LIGHT_THEME;
    this.vm.themeTitle = this.translate.instant('epicThemeTooltip_SC');
    this.onThemeChange(this.vm.themeSelected);
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.initialiseScaleFontList();
      this.setAvailableLocales();
      this.vm.themeTitle =
        this.vm.themeSelected === CommonConstants.LIGHT_THEME
          ? this.translate.instant('darkThemeTooltip_SC')
          : this.translate.instant('lightThemeTooltip_SC');
    });
    this.initialiseScaleFontList();
    this.initialiseLocaleList();
    this.initialiseTopBar();
    this.setAppTitle();
    this.initialiseThemeList();
  }

  initialiseTopBar() {
    this.setAvailableLocales();
  }

  initialiseScaleFontList() {
    this.vm.fontmenulist = [
      {
        label: this.translate.instant('scaleFont_TC'),
        items: [
          {
            label: this.translate.instant('sacalePlus_TC'),
            command: () => this.incrementScale(),
          },
          {
            label: this.translate.instant('sacaleMinus_TC'),
            command: () => this.decrementScale(),
          },
        ],
      },
    ];
  }

  initialiseLocaleList() {
    this.vm.langmenulist = [
      {
        label: 'Available Languages',
        items: [
          {
            label: 'English',
            command: () => this.switchLang('en'),
          },
        ],
      },
    ];
  }

  initialiseThemeList() {
    this.vm.thememenulist = [
      {
        label: 'Available Themes',
        items: [
          {
            label: 'Amigo-Epic',
            command: () => this.onThemeChange(ThemeConsntant.EPIC_THEME),
          },
          {
            label: 'Light',
            command: () => this.onThemeChange(ThemeConsntant.LIGHT_THEME),
          },
          {
            label: 'Dark',
            command: () => this.onThemeChange(ThemeConsntant.DARK_THEME),
          },
        ],
      },
    ];
  }

  setAvailableLocales() {
    const availableLocales = this._contextService
      .getApplicationConfig()
      ?.get(CommonConstants.AVAILABLE_LOCALES);
    if (availableLocales && availableLocales.length > 1) {
      this.vm.langmenulist[0].label = this.translate.instant(
        'availableLanguages_TC'
      );
      this.vm.langmenulist[0].items = [];
      availableLocales.forEach((locale: any) => {
        if (locale) {
          this.vm.langmenulist[0].items?.push({
            label: locale?.name,
            command: () => this.switchLang(locale?.id),
          });
        }
      });
    }
  }

  switchLang(lang: string) {
    localStorage.setItem('language', lang);
    this.translate.use(lang);
  }

  onThemeChange(theme: ThemeConsntant) {
    const linkTag: any = document.getElementById('themeSelected');

    this.vm.themeSelected = theme;
    this.vm.themeTitle = this.translate.instant(`${theme + 'ThemeTooltip_SC'}`);
    localStorage.setItem('theme', this.vm.themeSelected);

    switch (this.vm.themeSelected) {
      case ThemeConsntant.EPIC_THEME:
        this.vm.themeIcon = 'pi-slack';
        linkTag.href = 'assets/theme/sanadi-epic.css';
        break;
      case ThemeConsntant.LIGHT_THEME:
        this.vm.themeIcon = 'pi-sun';
        linkTag.href = 'assets/theme/light.css';
        break;
      case ThemeConsntant.DARK_THEME:
        this.vm.themeIcon = 'pi-moon';
        linkTag.href = 'assets/theme/dark.css';
        break;
      default:
        break;
    }
  }

  decrementScale() {
    if (this.vm.scaleIndex < this.vm.scales.length && this.vm.scaleIndex > 0) {
      this.vm.scaleIndex--;
      this.applyScale();
    }
  }

  incrementScale() {
    if (
      this.vm.scaleIndex < this.vm.scales.length - 1 &&
      this.vm.scaleIndex >= 0
    ) {
      this.vm.scaleIndex++;
      this.applyScale();
    }
  }

  applyScale() {
    document.documentElement.style.fontSize =
      this.vm.scales[this.vm.scaleIndex] + 'px';
  }

  logout() {
    this._authService.logout();
  }

  setAppTitle() {
    this.vm.appTitle = sessionStorage.getItem('companyName');
  }

  openSideBarEvent() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.toggleMenu.emit(this.isSidebarOpen);
  }

  closeSideBar($event) {
    this.toggleMenu.emit(false);
    this.isSidebarOpen = false;
  }

  closeCallback(e): void {
    this.sidebarRef.close(e);
  }

  onDropDownChange(e) {
    console.log(e.value);
    if (e.value?.code === 'store') {
      this.router.navigateByUrl('store-list');
    }
    if (e.value?.code === 'warehouse') {
      this.router.navigateByUrl('wareshouse-list');
    }
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
