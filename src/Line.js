// @flow

import Point from './Point';

import type { PointArray, PointObject } from './Point';

/**
 * Definition of an array representing a line.
 */
export type LineArray = [PointArray, PointArray];

/**
 * Definition of an object representing a line.
 */
export type LineObject = { a: PointObject, b: PointObject };

/**
 * Immutable line class.
 *
 * A line is defined by two points, `a` and `b`. It has no thickness and its
 * length is inifite (e.g. it extends beyond point `a` and `b`).
 */
export default class Line {
    /**
     * The `A` point.
     *
     * @type {Point}
     */
    _a: Point;

    /**
     * The `B` point.
     *
     * @type {Point}
     */
    _b: Point;

    /**
     * Construct a new immutable line out of two points.
     *
     * @param {Point} a The `A` point..
     * @param {Point} b The `B` point.
     * @return {void}
     */
    constructor(a: Point, b: Point) {
        this._a = a;
        this._b = b;
    }

    /**
     * Create a new line from an array. The first index should be point
     * `A` and the second index should be point `B`.
     *
     * @param {LineArray} array Input array with at least two values.
     * @return {Line} Resulting line.
     */
    static fromArray(array: LineArray): Line {
        if (process.env.NODE_ENV !== 'production') {
            if (!Array.isArray(array) || array.length < 2) {
                throw new Error('Expected an array with at least two values.');
            }
        }

        return new Line(
            Point.fromArray(array[0]),
            Point.fromArray(array[1])
        );
    }

    /**
     * Create a new line from an object. The object should have an `a` and
     * `b` property.
     *
     * @param {LineObject} object Input object with `a` and `b` property.
     * @return {Line} Resulting line.
     */
    static fromObject(object: LineObject): Line {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof object !== 'object') {
                throw new Error('Expected an object.');
            }
        }

        return new Line(
            Point.fromObject(object.a),
            Point.fromObject(object.b)
        );
    }

    /**
     * Return point `A`.
     *
     * @return {Point} Point `A`.
     */
    get a(): Point {
        return this._a;
    }

    /**
     * Return point `B`.
     *
     * @return {Point} Point `B`.
     */
    get b(): Point {
        return this._b;
    }

    /**
     * Return the length.
     *
     * @return {number} length of line, which is infinity, per definition.
     */
    get length(): number {
        return Infinity;
    }

    /**
     * Return an array representation of this instance.
     *
     * @return {LineArray} Array representation [a, b].
     */
    toArray(): LineArray {
        return [this._a.toArray(), this._b.toArray()];
    }

    /**
     * Return an object representation of this instance.
     *
     * @return {LineObject} Object representation {a, b}.
     */
    toObject(): LineObject {
        return {
            a: this._a.toObject(),
            b: this._b.toObject(),
        };
    }

    /**
     * Create a shallow copy of this instance.
     *
     * @return {Line} Cloned instance.
     */
    clone(): Line {
        return new Line(this._a, this._b);
    }

    /**
     * Return true if the line is defined and finite.
     *
     * @return {boolean} True if line is valid.
     */
    isValid(): boolean {
        return this._a.isValid() && this._b.isValid();
    }
}
