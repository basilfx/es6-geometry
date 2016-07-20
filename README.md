# ES6-Geometry
Collection of immutable ES6 classes for simple 2D geometric objects and calculations.

## Features
* Immutable classes
* Optional checking (zero overhead in production)
* Inspired by [Victor.js](http://victorjs.org/)

## Installation
`npm install --save git+https://github.com/basilfx/es6-geometry`

## Usage
As an example:

```es6
import { Point, Rectangle, Vector } from 'es6-geometry';

// A vector is an offset with a certain length (magnitude) and direction.
const vector = Vector.fromArray([100, 100]);

// A rectangle is defined by two points.
const rectangle = new Rectangle(
    new Point(10, 10),
    new Point(20, 20)
);

// Operations are immutable.
const newRectangle = rectangle.move(vector);
```

See the documentation for more information.

## License
See the `LICENSE.md` file (MIT).
