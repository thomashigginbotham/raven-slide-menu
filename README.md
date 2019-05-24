# Raven Slide Menu for Angular

An Angular component for making menus that slide in from one of the four sides of the browser.

![Demo](https://raw.githubusercontent.com/thomashigginbotham/raven-slide-menu/HEAD/screenshots/sample.png)

## Features

* Fully stylable with CSS
* Menu can remain visible on small/large viewports (controlled by media query)
* Menu can push or overlay content

## Installation

Install into your Angular project using NPM.

```shell
npm install raven-slide-menu --save
```

Import the **SlideMenuModule** into your module.

```ts
import { SlideMenuModule } from 'raven-slide-menu';

@NgModule({
  imports: [
    SlideMenuModule,
    // ...
  ],
  // ...
})
export class AppModule { }
```

## Usage

Add a &lt;raven-slide-menu&gt; element to your template, and add menu content inside it.

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <raven-slide-menu [(open)]="isOpened">
      <!-- Content to appear in menu -->
    </raven-slide-menu>
  `,
  styles: []
})
export class AppComponent { }
```

### Options

| Option          | Type    | Description                                                       | Default Value
| :-------------- | :------ | :---------------------------------------------------------------- | :------------
| open            | boolean | Whether the menu is open or closed.                               | false
| position        | string  | Set to "top", "right", "bottom" or "left".                        | "left"
| pushContainer   | string  | A CSS selector for an element that will be "pushed" by the menu.  | ""
| pushPercent     | number  | The percentage amount an element will be "pushed" by the menu.    | 100
| deactivateQuery | string  | A CSS query that when matched will deactivate the slide menu.     | ""

## FAQ

### Why is the pushContainer not being pushed?

The element used as the push container needs to use relative or absolute positioning. It also needs to have its transition properties set appropriately. Because the push container exists outside of the component, and we don't want to risk overriding your styles, we leave it to you to apply the following styles.

```css
.rsm-push-container {
  position: relative;
  transition-property: top, right, bottom, left;
  transition-timing-function: ease-out;
  transition-duration: 200ms;
}
```

### Can I remove or customize the hamburger menu button?

Yes, you can hide or style the button using CSS.

```css
.rsm-button-wrapper {
  display: none;
}
```

If you hide the button, you can create your own, fully customizable button anywhere you like. Just set your custom button's `(click)` handler so that it opens/closes the menu and stops the event from propagating.

```html
<button (click)="toggleMenu($event)">Toggle Menu</button>
```

```ts
toggleMenu(e) {
  this.isOpened = !this.isOpened;
  e.stopPropagation();
}
```

### How can I reset the menu when it has dynamic content?

If the content inside the menu changes, it can affect the calculations that determine how it is positioned, causing it to be partly visible when it should be closed.

To fix this, close the menu after the content changes are complete. For example:

```ts
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <raven-slide-menu #slideMenu [(open)]="isOpened">
      <div>{{ someDynamicContent }}</div>
    </raven-slide-menu>
  `,
  styles: []
})
export class AppComponent {
  @ViewChild('slideMenu')
  slideMenu: SlideMenuComponent;

  someFuncThatUpdatesContent() {
    // Update content in menu
    // ...

    // Reset menu
    setTimeout(() => this.slideMenu.closeMenuWithoutTransition());
  }
}
```

## Development

To contribute to the development of this component, clone its repository and run `npm install`. Then run `ng serve -o` to start a development server and to open a sample page in your browser.

## License.

MIT license.
