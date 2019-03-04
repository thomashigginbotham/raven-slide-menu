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

### Can I remove or customize the hamburger menu button?

Yes, you can hide or style the button using CSS.

```css
.rsm-button-wrapper {
  display: none;
}
```

If you hide the button, you can create your own, fully customizable button anywhere you like. Just set your custom button's `(click)` handler so that it opens/closes the menu (e.g. `<button (click)="isOpened === !isOpened">Menu</button>`).


## Development

To contribute to the development of this component, clone its repository and run `npm install`. Then run `ng serve -o` to start a development server and to open a sample page in your browser.

## License.

MIT license.
