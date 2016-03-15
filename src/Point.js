import Vector from './Vector';

/**
 * Immutable point class.
 */
export default class Point {
    /**
     * Construct a new point, using an x and y coordinate.
     *
     * An point is immutable. All subsequent operations will return a new point
     * instance.
     *
     * @param {number} x The x coordinate.
     * @param {number} y The y coordinate.
     * @return {void}
     */
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    /**
     * Create a new point from an array. The first index is considered the x
     * coordinate, the second index is considered the y coordinate.
     *
     * @param {Array} array Input array with at least two values.
     * @return {Point} Resulting point.
     */
    static fromArray(array) {
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
     * @param {object} object Input object with x and y property.
     * @return {Point} Resulting point.
     */
    static fromObject(object) {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof(object) !== 'object') {
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
    get x() {
        return this._x;
    }

    /**
     * Get the y coordinate.
     *
     * @return {number} The y coordinate.
     */
    get y() {
        return this._y;
    }

    add(that) {
        if (that instanceof Point) {
            throw new Error('Addition of two points is undefined.');
        }

        return new Point(this._x + that._x, this._y + that._y);
    }

    subtract(that) {
        if (that instanceof Point) {
            return this.toVector().subtract(that);
        }

        return new Point(this._x - that._x, this._y - that._y);
    }

    invert() {
        return new Point(-this._x, -this._y);
    }

    multiply(scalar) {
        return new Point(this._x * scalar, this._y * scalar);
    }

    multiplyXY(scalarX, scalarY) {
        return new Point(this._x * scalarX, this._y * scalarY);
    }

    divide(scalar) {
        return new Point(this._x / scalar, this._y / scalar);
    }

    divideXY(scalarX, scalarY) {
        return new Point(this._x / scalarX, this._y / scalarY);
    }

    mix(that, amount = 0.5) {
        return this.multiply(1 - amount).add(that.multiply(amount));
    }

    perpendicular() {
        return new Point(-this._y, this._x);
    }

    snap(to) {
        const round = (val) => Math.round(val / to) * to;

        return new Point(round(this._x), round(this._y));
    }

    dot(that) {
        return this._x * that._x + this._y * that._y;
    }

    angle() {
        return Math.atan2(this._y, this._x);
    }

    angleDeg() {
        return Math.atan2(this._y, this._x) * 180 / Math.PI;
    }

    slope() {
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
    distanceSq(point) {
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
    distance(point) {
        return Math.sqrt(this.distanceSq(point));
    }

    /**
     * Convert point into a vector.
     *
     * Note: this is an utility method. A proper conversion does not exist.
     *
     * @return {Vector} The point converted as vector.
     */
    toVector() {
        return new Vector(this._x, this._y);
    }

    /**
     * Convert this point into an array.
     *
     * @return {Array} Array representation (x, y).
     */
    toArray() {
        return [this._x, this._y];
    }

    /**
     * Convert this point into an object.
     *
     * @return {object} Object representation (x, y).
     */
    toObject() {
        return { x: this._x, y: this._y };
    }

    /**
     * Convert this point into a string representation.
     *
     * @return {string} String representation (x, y).
     */
    toString() {
        return `(${this._x}, ${this._y})`;
    }

    /**
     * Convert this point into a string representation, using a fixed number of
     * digits for displaying.
     *
     * @param {number} digits Number of digits to use for representation.
     * @return {string} String representation (x, y).
     */
    toFixed(digits) {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof(digits) !== 'number') {
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
    clone() {
        return new Point(this._x, this._y);
    }

    /**
     * Return true if this point is equal to another point. Two points are
     * equal when both x and y coordinates are equal.
     *
     * @param {object} that Other instance to compare to.
     * @return {boolean} True if both points are equal, false otherwise.
     */
    equals(that) {
        return this.constructor.name === that.constructor.name &&
            this._x === that._x && this._y === that._y;
    }

    /**
     * Return true if the point is defined and finite.
     *
     * @return {Boolean} True if point is fully defined and valid.
     */
    isValid() {
        return typeof(this._x) === 'number' && isFinite(this._x) &&
            typeof(this._y) === 'number' && isFinite(this._y);
    }
}
