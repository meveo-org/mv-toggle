# mv-toggle

 MvToggle is a Meveo component (based on lit-element) that renders a toggle input.

## Quick Start

To experiment with the MvToggle component.

1. Clone this repo.
2. Serve the project from the root directory with some http server (best served with meveo itself)
3. Sample toggle usage is included in the `demo.js`

Includes 4 predefined sizes:
```
large, medium, small, tiny
default value: large
```

## Sample usage
```html
<mv-toggle
  .value="${{ isChecked: !this.checked }}"  // value to be passed into click-toggle event
  .checked="${!!this.checked}"              // boolean value to set whether toggle is on or off
  @click-toggle="${this.handleClickToggle}" // custom event dispatched when the toggle is clicked
  .label="${this.label}"                    // the label shown beside the toggle button
  size="large"                              // the size of the toggle button
></mv-toggle>
```

You can also check this [demo](https://toggle.meveo.org/)