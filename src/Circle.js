// @flow

import Point from './Point';
import Rectangle from './Rectangle';

/**
 * Immutable circle class.
 */
export default class Circle {
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
     * Get the circle center point.
     *
     * @return {Point} Center point.
     */
    get a() {
        return this._a;
    }

    /**
     * Get the circle center x coordinate. Shortcut for `this.a.x`.
     *
     * @return {number} Circle center x coordinate.
     */
    get x() {
        return this._a._x;
    }

    /**
     * Get the circle center y coordinate. Shortcut for `this.a.y`.
     *
     * @return {number} Circle center y coordinate.
     */
    get y() {
        return this._a._y;
    }

    /**
     * Get the circle radius.
     *
     * @return {number} Circle radius.
     */
    get r() {
        return this._r;
    }

    /**
     * Get the diameter. This is a shortcut for `this.r * 2`.
     *
     * @return {number} The circle diameter.
     */
    get d() {
        return this._r * 2;
    }

    /**
     * Convert this circle to a rectangle that contains this circle exactly.
     *
     * @return {Rectangle} Converted rectangle.
     */
    toRectangle() {
        const a = new Point(
            this._a._x - this.radius, this._a._y - this.radius);
        const b = new Point(
            this._a._x + this.radius, this._a._y + this.radius);

        return new Rectangle(a, b);
    }

    /**
     * Convert this circle into an object.
     *
     * @return {object} Object representation (x, y, r).
     */
    toObject() {
        return {
            x: this._a._x,
            y: this._a._y,
            r: this._r,
        };
    }

    /**
     * Convert this circle into an array.
     *
     * @return {Array} Array representation (x, y, r).
     */
    toArray() {
        return [this._a._x, this._a._y, this._r];
    }

    /**
     * Convert this circle into a string representation.
     *
     * @return {string} String representation (x, y, r).
     */
    toString() {
        return `(${this._a._x}, ${this._a._y}, ${this._r})`;
    }

    /**
     * Create a shallow copy of this instance.
     *
     * @return {Circle} Cloned instance.
     */
    clone() {
        return new Circle(this._a, this._r);
    }

    /**
     * Return true if this circle is equal to another circle. Two circles are
     * equal if and only if the center point and radius are equal.
     *
     * @param {object} that Other instance to compare to.
     * @return {boolean} True if both circles are equal, false otherwise.
     */
    equals(that) {
        return this.constructor.name === that.constructor.name &&
            this._a.equals(that._a) && this._r === that._r;
    }

    /**
     * Return true if the circle is defined, finite and valid.
     *
     * @return {Boolean} True if the circle is fully defined, finite and valid.
     */
    isValid() {
        return this._a.isValid() && typeof(this._r) === 'number' &&
            isFinite(this._r) && this._r >= 0;
    }
}
