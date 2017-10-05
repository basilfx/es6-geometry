// @flow

import Point from './Point';
import Rectangle from './Rectangle';

import type { PointArray, PointObject } from './Point';

/**
 * Definition of an array representing a circle.
 */
export type CircleArray = [PointArray, number];

/**
 * Definition of an object representing a circle.
 */
export type CircleObject = { a: PointObject, r: number };

/**
 * Immutable circle class.
 */
export default class Circle {
    /**
     * Circle center point.
     *
     * @type {Point}
     */
    _a: Point;

    /**
     * Circle radius.
     *
     * @type {number}
     */
    _r: number;

    /**
     * Construct a new circle using center point `A` and radius `r`.
     *
     * @param {Point} a Center point `A`.
     * @param {number} r The radius `r`.
     * @return {void}
     */
    constructor(a: Point, r: number) {
        this._a = a;
        this._r = r;
    }

    /**
     * Create a new circle from an array. The first index should be point
     * `A` and the second index should be the radius `r`.
     *
     * @param {CircleArray} array Input array with at least two values.
     * @return {Circle} Resulting circle.
     */
    static fromArray(array: CircleArray): Circle {
        if (process.env.NODE_ENV !== 'production') {
            if (!Array.isArray(array) || array.length < 2) {
                throw new Error(
                    'Expected an array with at least two values.'
                );
            }
        }

        return new Circle(
            Point.fromArray(array[0]),
            array[1]
        );
    }

    /**
     * Create a new circle from an object. The object should have an `a` and
     * `r` property.
     *
     * @param {CircleObject} object Input object with `a` and `b` property.
     * @return {Circle} Resulting circle.
     */
    static fromObject(object: CircleObject): Circle {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof object !== 'object') {
                throw new Error('Expected an object.');
            }
        }

        return new Circle(
            Point.fromObject(object.a),
            object.r
        );
    }

    /**
     * Get the circle center point.
     *
     * @return {Point} Center point.
     */
    get a(): Point {
        return this._a;
    }

    /**
     * Get the circle center x coordinate. Shortcut for `this.a.x`.
     *
     * @return {number} Circle center x coordinate.
     */
    get x(): number {
        return this._a._x;
    }

    /**
     * Get the circle center y coordinate. Shortcut for `this.a.y`.
     *
     * @return {number} Circle center y coordinate.
     */
    get y(): number {
        return this._a._y;
    }

    /**
     * Get the circle radius.
     *
     * @return {number} Circle radius.
     */
    get r(): number {
        return this._r;
    }

    /**
     * Get the diameter. This is a shortcut for `this.r * 2`.
     *
     * @return {number} The circle diameter.
     */
    get d(): number {
        return this._r * 2;
    }

    /**
     * Convert this circle to a rectangle that contains this circle exactly.
     *
     * @return {Rectangle} Converted rectangle.
     */
    toRectangle(): Rectangle {
        const a = new Point(this._a._x - this._r, this._a._y - this._r);
        const b = new Point(this._a._x + this._r, this._a._y + this._r);

        return new Rectangle(a, b);
    }

    /**
     * Convert this circle into an object.
     *
     * @return {CircleObject} Object representation (a, r).
     */
    toObject(): CircleObject {
        return {
            a: this._a.toObject(),
            r: this._r,
        };
    }

    /**
     * Convert this circle into an array.
     *
     * @return {CircleArray} Array representation (a, r).
     */
    toArray(): CircleArray {
        return [this._a.toArray(), this._r];
    }

    /**
     * Convert this circle into a string representation.
     *
     * @return {string} String representation (a, r).
     */
    toString(): string {
        return `(${this._a.toString()}, ${this._r})`;
    }

    /**
     * Create a shallow copy of this instance.
     *
     * @return {Circle} Cloned instance.
     */
    clone(): Circle {
        return new Circle(this._a, this._r);
    }

    /**
     * Return true if this circle is equal to another circle. Two circles are
     * equal if and only if the center point and radius are equal.
     *
     * @param {Object} that Other instance to compare to.
     * @return {boolean} True if both circles are equal, false otherwise.
     */
    equals(that: Object): boolean {
        return this.constructor.name === that.constructor.name &&
            this._a.equals(that._a) && this._r === that._r;
    }

    /**
     * Return true if the circle is defined, finite and valid.
     *
     * @return {boolean} True if the circle is fully defined, finite and valid.
     */
    isValid(): boolean {
        return this._a.isValid() && typeof this._r === 'number' &&
            isFinite(this._r) && this._r >= 0;
    }
}
