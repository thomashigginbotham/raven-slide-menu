import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  menuIsOpen: boolean;
  position: 'top' | 'right' | 'bottom' | 'left';
  pushPercent: number;

  constructor() {
    this.menuIsOpen = false;
    this.position = 'left';
    this.pushPercent = 100;
  }

  closeMenu() {
    this.menuIsOpen = false;
  }
}
