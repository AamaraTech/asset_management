import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sanadi-sidebar',
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.scss'],
})
export class FloatingMenuComponent {
  @Input() display: boolean = false;
  @Output() closeSidebar: EventEmitter<any> = new EventEmitter<any>();
  @Output() openSidebar: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}



  closeMenu(eventData: Boolean) {
    // this.display = false;

    this.closeSidebar.emit(false);
  }
}
