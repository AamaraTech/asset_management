import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { MenuListComponent } from '../menu-list/menu-list.component';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'sanadi-side-menu',
  standalone: true,
  imports: [MenuListComponent, SidebarModule, ButtonModule,NgIf],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  @Input() isSidebarOpen: boolean = false;
  isBelow992: boolean = window.innerWidth < 992;
  @Output() onCloseSidebar = new EventEmitter();

  @ViewChild('sidebarRef', { static: false }) sidebarRef: Sidebar;

  constructor(private ngZone: NgZone) { }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isBelow992 = window.innerWidth < 992;
  }


  closeCallback(e): void {
    this.sidebarRef.close(e);
  }
  closeSideBar(event) {
    this.isSidebarOpen = false;
    this.onCloseSidebar.emit(false)
  }
}
