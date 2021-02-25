<h1 align="center">PositionInput</h1>

<p align="center">
    <a href="src/react-chayns-position_input/component/PositionInput.jsx">Source</a>
</p>

A location input with a map and text input.

This requires the Google Maps JavaScript API with the places library enabled.
You can find more information about the Maps API
[here](https://developers.google.com/maps/documentation/javascript/overview).

## Usage

You should have the `chayns-components` package installed. If that is not the
case already, run

```bash
yarn add chayns-components
```

or

```bash
npm i chayns-components
```

After the `chayns-components` package is installed, you can import the component
and use it with React:

```jsx
import React from 'react'
import { PositionInput } from 'chayns-components';

// ...

<PositionInput {...} />
```

## Props

The `PositionInput`-component takes the following props:

| Name                                  | Type                           | Default                                                                                                                                                           | Required |
| ------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| [defaultPosition](#defaultposition)   | `{ lat: number, lng: number }` |                                                                                                                                                                   |    ✓     |
| [onPositionChange](#onpositionchange) | `function`                     | `() => {}`                                                                                                                                                        |          |
| [mapOptions](#mapoptions)             | `object`                       | `{ zoom: 15, gestureHandling: 'greedy', disableDefaultUI: true, styles: [ { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }], }, ], }` |          |
| [children](#children)                 | `function`                     | `(value, onChange) => ( <Input placeholder="Position" value={value} onChange={onChange} /> )`                                                                     |          |
| [parent](#parent)                     | `ReactNode`                    |                                                                                                                                                                   |          |

### `defaultPosition`

```ts
defaultPosition: { lat: number, lng: number }
```

The position that will be used as a starting point.

---

### `onPositionChange`

```ts
onPositionChange?: function
```

This will be called when the position selection changes.

---

### `mapOptions`

```ts
mapOptions?: object
```

An object with options for the Google Map. These options are documented
[here](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions).

---

### `children`

```ts
children?: function
```

A render function for creating a custom input overlay. It receives the currently
selected position as its first argument and an onChange-method as its second
argument.

---

### `parent`

```ts
parent?: ReactNode
```

A DOM element that the overlay should be rendered into.
