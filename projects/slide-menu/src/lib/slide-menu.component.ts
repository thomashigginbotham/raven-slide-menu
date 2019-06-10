import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
  HostListener,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'raven-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.css']
})
export class SlideMenuComponent implements OnInit, AfterViewInit {
  @Input('pushContainer')
  pushContainerSelector: string;

  @ViewChild('menu', { static: true })
  menuElementRef: ElementRef;

  menuIsActive: boolean;

  private _menuElement: HTMLDivElement;
  private _pushContainerElement: HTMLElement;
  private _pushContainerClassName: string;
  private _pushPercent: number;
  private _deactivateQuery: string;
  private _position: 'top' | 'right' | 'bottom' | 'left';
  private _menuIsOpen: boolean;

  constructor(
    private _elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.menuIsActive = false;

    this._menuIsOpen = true;
    this._pushContainerClassName = 'rsm-push-container';
    this._pushPercent = 100;
    this._deactivateQuery = '';

    this.position = 'left';
    this.pushContainerSelector = '';
    this.menuIsOpenChange = new EventEmitter();
  }

  get position(): 'top' | 'right' | 'bottom' | 'left' {
    return this._position;
  }

  @Input()
  set position(value: 'top' | 'right' | 'bottom' | 'left') {
    this._position = value;

    if (!this._menuElement) {
      return;
    }

    this.resetPosition();
    this.closeMenuWithoutTransition();
  }

  get pushPercent(): number {
    return this._pushPercent;
  }

  @Input()
  set pushPercent(value: number) {
    this._pushPercent = value;

    if (!this._menuElement) {
      return;
    }

    this.resetPosition();
    this.closeMenuWithoutTransition();
  }

  get deactivateQuery(): string {
    return this._deactivateQuery;
  }

  @Input()
  set deactivateQuery(value: string) {
    this._deactivateQuery = value;

    if (!this._menuElement) {
      return;
    }

    this.activateByMediaQuery();
    this.closeMenuWithoutTransition();
  }

  get menuIsOpen() {
    return this._menuIsOpen;
  }

  @Input('open')
  set menuIsOpen(value: boolean) {
    if (value === this._menuIsOpen) {
      return;
    }

    this._menuIsOpen = value;
    this.menuIsOpenChange.emit(value);

    if (!this._menuElement) {
      return;
    }

    if (value) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  @Output('openChange')
  menuIsOpenChange: EventEmitter<boolean>;

  ngOnInit() {
    this._menuElement = this.menuElementRef.nativeElement;

    // Set up push container
    if (this.pushContainerSelector !== '') {
      this._pushContainerElement = document
        .querySelector(this.pushContainerSelector);

      if (this._pushContainerElement) {
        this._pushContainerElement.classList.add(this._pushContainerClassName);
      }
    }

    // Recalc menu when content affects menu dimensions
    if (!('ResizeObserver' in window)) {
      return;
    }

    const resizeObserver = new (<any>window).ResizeObserver(entries => {
      if (!this.menuIsOpen) {
        this.closeMenuWithoutTransition();
      }
    });

    resizeObserver.observe(this._menuElement);
  }

  ngAfterViewInit() {
    if (!this.menuIsOpen) {
      this.closeMenuWithoutTransition();
    }

    this.activateByMediaQuery();
    this.addListeners();

    this._changeDetectorRef.detectChanges();
  }

  @HostListener('document:click', ['$event.target'])
  documentClick(target: HTMLElement) {
    if (!this._elementRef.nativeElement.contains(target)) {
      this.menuIsOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  keyPress() {
    // Close menu on esc key press
    this.menuIsOpen = false;
  }

  /**
   * Event handler for when menu toggle button is clicked.
   */
  menuButtonClick() {
    this.toggleMenu();
  }

  /**
   * Add event listeners.
   */
  addListeners() {
    // Activate/deactivate on window resize
    window.addEventListener('resize', () => {
      requestAnimationFrame(() => {
        this.activateByMediaQuery();
      });
    });
  }

  /**
   * Activates or deactivates the menu based on a media query.
   */
  activateByMediaQuery() {
    if (this.deactivateQuery === '') {
      this.menuIsActive = true;
    } else {
      this.menuIsActive = !matchMedia(this.deactivateQuery).matches;
    }
  }

  /**
   * Shows the menu.
   */
  openMenu() {
    this._menuElement.style[this.position] = '0';

    if (this._pushContainerElement) {
      const menuMeasure = (this.position === 'left' || this.position === 'right') ?
        this.getMenuWidth() :
        this.getMenuHeight();

      this._pushContainerElement.style[this.position] =
        (menuMeasure * this.pushPercent * .01) + 'px';
    }
  }

  /**
   * Hides the menu.
   */
  closeMenu() {
    const menuMeasure = (this.position === 'left' || this.position === 'right') ?
      this.getMenuWidth() :
      this.getMenuHeight();

    this._menuElement.style[this.position] = -menuMeasure + 'px';

    if (this._pushContainerElement) {
      this._pushContainerElement.style[this.position] = '0';
    }
  }

  /**
   * Hides the menu without showing the CSS transition.
   */
  closeMenuWithoutTransition() {
    this._menuElement.style.transition = 'none';
    this.closeMenu();

    requestAnimationFrame(() => {
      this._menuElement.style.transition = '';
    });
  }

  /**
   * Shows the menu if hidden or vice versa.
   */
  toggleMenu() {
    this.menuIsOpen = !this.menuIsOpen;
  }

  /**
   * Removes all position styles.
   */
  resetPosition() {
    this._menuElement.style.top = '';
    this._menuElement.style.right = '';
    this._menuElement.style.bottom = '';
    this._menuElement.style.left = '';

    if (this._pushContainerElement) {
      this._pushContainerElement.style.top = '';
      this._pushContainerElement.style.right = '';
      this._pushContainerElement.style.bottom = '';
      this._pushContainerElement.style.left = '';
    }
  }

  /**
   * Returns the width of the menu (px).
   */
  getMenuWidth(): number {
    return this._menuElement.offsetWidth;
  }

  /**
   * Returns the height of the menu (px).
   */
  getMenuHeight(): number {
    return this._menuElement.offsetHeight;
  }
}
