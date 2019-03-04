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
  deactivateAtWidth: number;
  deactivateQuery: string;

  constructor() {
    this.menuIsOpen = false;
    this.position = 'left';
    this.pushPercent = 100;
    this.deactivateAtWidth = 1200;
    this.deactivateQuery = `(min-width: ${this.deactivateAtWidth}px)`;
  }

  closeMenu() {
    this.menuIsOpen = false;
  }
}
