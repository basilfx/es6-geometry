# ES6-Geometry
Collection of immutable ES6 classes for simple 2D geometric objects and calculations.

[![Build Status](https://travis-ci.org/basilfx/babel-plugin-transform-react-pure-components.svg?branch=master)](https://travis-ci.org/basilfx/babel-plugin-transform-react-pure-components)

## Features
* Immutable classes.
* Arguments checking (zero overhead in production).
* Inspired by [Victor.js](http://victorjs.org/).

## Installation
`npm install --save es6-geometry`

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

// Operations are immutable: rectangle remains untouched.
const newRectangle = rectangle.move(vector);
```

See the documentation for more information.

## Development
To (re)compile, run `npm run compile`. If you prefer to have a Webpack bundle, run `npm run bundle`.

Tests can be invoked using `npm run test`. Karma is used as a test runner.

## License
See the `LICENSE.md` file (MIT).
