// @flow

import Vector from './Vector';

export type PointArray = Array<number>;
export type PointObject = { x: number, y: number };

/**
 * Immutable point class.
 *
 * A point is an absolute place in space, at a given x and y coordinate.
 *
 * The difference between a Point and a vector is explained in this source:
 * http://math.stackexchange.com/a/645827
 */
export default class Point {
    /**
     * The x coordinate.
     *
     * @type {number}
     */
    _x: number;

    /**
     * The y coordinate.
     *
     * @type {number}
     */
    _y: number;

    /**
     * Construct a new point, using a x and y coordinate.
     *
     * An point is immutable. All subsequent operations will return a new point
     * instance.
     *
     * @param {number} x The x coordinate.
     * @param {number} y The y coordinate.
     * @return {void}
     */
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    /**
     * Create a new point from an array. The first index is considered the x
     * coordinate, the second index is considered the y coordinate.
     *
     * @param {PointArray} array Input array with at least two values.
     * @return {Point} Resulting point.
     */
    static fromArray(array: PointArray): Point {
        if (process.env.NODE_ENV !== 'production') {
            if (!Array.isArray(array) || array.length < 2) {
                throw new Error('Expected an array with at least two values.');
            }
        }

        return new Point(array[0], array[1]);
    }

    /**
     * Create a new point from an object. The object should have an x and y
     * property.
     *
     * @param {PointObject} object Input object with x and y property.
     * @return {Point} Resulting point.
     */
    static fromObject(object: PointObject): Point {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof object !== 'object') {
                throw new Error('Expected an object.');
            }
        }

        return new Point(object.x, object.y);
    }

    /**
     * Get the x coordinate.
     *
     * @return {number} The x coordinate.
     */
    get x(): number {
        return this._x;
    }

    /**
     * Get the y coordinate.
     *
     * @return {number} The y coordinate.
     */
    get y(): number {
        return this._y;
    }

    /**
     * Add a vector to a point.
     *
     * Note that addition of two points is undefined.
     *
     * @param {Vector} vector Vector to add to this point.
     * @return {Point} Point with the vector added to it.
     */
    add(vector: Vector): Point {
        if (process.env.NODE_ENV !== 'production') {
            if (vector instanceof Point) {
                throw new Error('Addition of two points is undefined.');
            }
        }

        return new Point(this._x + vector._x, this._y + vector._y);
    }

    /**
     * Subtract a Point or a Vector.
     *
     * @param {Point | Vector} that Point or vector to subtract.
     * @return {Point} If `that` is a Vector, it will return the new point.
     * @return {Vector} If `that` is a Point, it will return the displacement.
     */
    subtract(that: Point | Vector) {
        if (that instanceof Point) {
            return this.toVector().subtract(that);
        }

        return new Point(this._x - that._x, this._y - that._y);
    }

    /**
     * Invert the x and y coordinate, relative to (0, 0).
     *
     * @return {Point} Inverted point.
     */
    invert(): Point {
        return new Point(-this._x, -this._y);
    }

    /**
     * @return {Point}
     */
    multiply(scalar: number): Point {
        return new Point(this._x * scalar, this._y * scalar);
    }

    /**
     * @return {Point}
     */
    multiplyXY(scalarX: number, scalarY: number): Point {
        return new Point(this._x * scalarX, this._y * scalarY);
    }

    /**
     * @return {Point}
     */
    divide(scalar: number): Point {
        return new Point(this._x / scalar, this._y / scalar);
    }

    /**
     * @return {Point}
     */
    divideXY(scalarX: number, scalarY: number): Point {
        return new Point(this._x / scalarX, this._y / scalarY);
    }

    /**
     * @return {Point}
     */
    mix(that: Point, amount: number = 0.5): Point {
        return this.multiply(1 - amount).add(that.multiply(amount));
    }

    /**
     * @return {Point}
     */
    perpendicular(): Point {
        return new Point(-this._y, this._x);
    }

    /**
     * @return {Point}
     */
    snap(to: number): Point {
        const round = (val) => Math.round(val / to) * to;

        return new Point(round(this._x), round(this._y));
    }

    /**
     * @return {number}
     */
    dot(that: Point): number {
        return this._x * that._x + this._y * that._y;
    }

    /**
     * @return {number}
     */
    angle(): number {
        return Math.atan2(this._y, this._x);
    }

    /**
     * @return {number}
     */
    angleDeg(): number {
        return Math.atan2(this._y, this._x) * 180 / Math.PI;
    }

    /**
     * @return {number}
     */
    slope(): number {
        return this._y / this._x;
    }

    /**
     * Calculate the squared distance between two points.
     *
     * If the exact distance doesn't matter, this method is slightly faster
     * than `this.distance`.
     *
     * @param {Point} point The other point.
     * @return {number} The distance between both points.
     */
    distanceSq(point: Point): number {
        if (process.env.NODE_ENV !== 'production') {
            if (!(point instanceof Point)) {
                throw new Error('Must be a point.');
            }
        }

        const dX = (this._x - point._x);
        const dY = (this._y - point._y);

        return dX * dX + dY * dY;
    }

    /**
     * Calculate the distance between two points.
     *
     * @param {Point} point The other point.
     * @return {number} The distance between both points.
     */
    distance(point: Point): number {
        return Math.sqrt(this.distanceSq(point));
    }

    /**
     * Convert point into a vector.
     *
     * Note: this is an utility method. A mathematical definition of a
     * conversion does not exist.
     *
     * @return {Vector} The point converted as vector.
     */
    toVector(): Vector {
        return new Vector(this._x, this._y);
    }

    /**
     * Convert this point into an array.
     *
     * @return {Array} Array representation (x, y).
     */
    toArray(): Array<number> {
        return [this._x, this._y];
    }

    /**
     * Convert this point into an object.
     *
     * @return {Object} Object representation (x, y).
     */
    toObject(): Object {
        return { x: this._x, y: this._y };
    }

    /**
     * Convert this point into a string representation.
     *
     * @return {string} String representation (x, y).
     */
    toString(): string {
        return `(${this._x}, ${this._y})`;
    }

    /**
     * Convert this point into a string representation, using a fixed number of
     * digits for displaying.
     *
     * @param {number} digits Number of digits to use for representation.
     * @return {string} String representation (x, y).
     */
    toFixed(digits: number): string {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof digits !== 'number') {
                throw new Error('Number of digits must be a number.');
            }
        }

        return `(${this._x.toFixed(digits)}, ${this._y.toFixed(digits)})`;
    }

    /**
     * Create a shallow copy of this instance.
     *
     * @return {Point} Cloned instance.
     */
    clone(): Point {
        return new Point(this._x, this._y);
    }

    /**
     * Return true if this point is equal to another point. Two points are
     * equal when both x and y coordinates are equal.
     *
     * @param {Object} that Other instance to compare to.
     * @return {boolean} True if both points are equal, false otherwise.
     */
    equals(that: Object): boolean {
        return this.constructor.name === that.constructor.name &&
            this._x === that._x && this._y === that._y;
    }

    /**
     * Return true if the point is defined and finite.
     *
     * @return {boolean} True if point is fully defined and valid.
     */
    isValid(): boolean {
        return typeof this._x === 'number' && isFinite(this._x) &&
            typeof this._y === 'number' && isFinite(this._y);
    }
}
