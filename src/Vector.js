import Point from './Point';

/**
 * Immutable vector class.
 */
export default class Vector {
    /**
     * Definition of the unit vector.
     */
    static Unit = new Vector(1, 1);

    /**
     * Construct a new vector, using an x and y component to represent the
     * length (magnitude) and direction relative to (0, 0).
     *
     * An vector is immutable. All subsequent operations will return a new
     * vector instance.
     *
     * @param {number} x The x component.
     * @param {number} y The y component.
     * @return {void}
     */
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    /**
     * Create a new vector from an array. The first index is considered the x
     * component, the second index is considered the y component.
     *
     * @param {Array} array Input array with at least two values.
     * @return {Vector} Resulting vector.
     */
    static fromArray(array) {
        if (process.env.NODE_ENV !== 'production') {
            if (!Array.isArray(array) || array.length < 2) {
                throw new Error('Expected an array with at least two values.');
            }
        }

        return new Vector(array[0], array[1]);
    }

    /**
     * Create a new vector from an object. The object should have an x and y
     * property.
     *
     * @param {object} object Input object with x and y property.
     * @return {Vector} Resulting vector.
     */
    static fromObject(object) {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof(object) !== 'object') {
                throw new Error('Expected an object.');
            }
        }

        return new Vector(object.x, object.y);
    }

    /**
     * Get the x component.
     *
     * @return {number} The x component.
     */
    get x() {
        return this._x;
    }

    /**
     * Get the y component.
     *
     * @return {number} The y component.
     */
    get y() {
        return this._y;
    }

    /**
     * Add another vector or point to this vector.
     *
     * If the input is a point, the result will be a point with this vector
     * as offset.
     *
     * @param {Point|Vector} that Point or vector to add.
     * @return {Point|Vector} New Vector if adding vector, point otherwise.
     */
    add(that) {
        if (that instanceof Point) {
            return that.add(this);
        }

        return new Vector(this._x + that._x, this._y + that._y);
    }

    subtract(that) {
        return new Vector(this._x - that._x, this._y - that._y);
    }

    invert() {
        return new Vector(-this._x, -this._y);
    }

    multiply(scalar) {
        return new Vector(this._x * scalar, this._y * scalar);
    }

    multiplyXY(scalarX, scalarY) {
        return new Vector(this._x * scalarX, this._y * scalarY);
    }

    divide(scalar) {
        return new Vector(this._x / scalar, this._y / scalar);
    }

    divideXY(scalarX, scalarY) {
        return new Vector(this._x / scalarX, this._y / scalarY);
    }

    mix(that, amount = 0.5) {
        return this.multiply(1 - amount).add(that.multiply(amount));
    }

    perpendicular() {
        return new Vector(-this._y, this._x);
    }

    snap(to) {
        const round = (val) => Math.round(val / to) * to;

        return new Vector(round(this._x), round(this._y));
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
     * Calculate the squared length of this vector.
     *
     * If the exact length doesn't matter, this method is slightly faster
     * than `this.length`.
     *
     * @return {number} The squared length of this vector.
     */
    lengthSq() {
        return this._x * this._x + this._y * this._y;
    }

    /**
     * Calculate the length (or magnitude) of the vector.
     *
     * @return {number} The length of the vector.
     */
    length() {
        return Math.sqrt(this.lengthSq());
    }

    /**
     * [minLength description]
     * @param {[type]} length [description]
     * @return {[type]}
     */
    minLength(length) {
        return this.length() < length ? this.normalize(length) : this;
    }

    maxLength(length) {
        return this.length() > length ? this.normalize(length) : this;
    }

    normalize(scalar = 1) {
        return this.divide(this.length()).multiply(scalar);
    }

    projectOnto(that) {
        return that.multiply(this.dot(that) / that.lengthSq());
    }

    /**
     * Convert vector into a point.
     *
     * Note: this is an utility method. A proper conversion does not exist.
     *
     * @return {Point} The vector converted as point.
     */
    toPoint() {
        return new Point(this._x, this._y);
    }

    /**
     * Convert this vector into an array.
     *
     * @return {Array} Array representation (x, y).
     */
    toArray() {
        return [this._x, this._y];
    }

    /**
     * Convert this vector into an object.
     *
     * @return {object} Object representation (x, y).
     */
    toObject() {
        return { x: this._x, y: this._y };
    }

    /**
     * Convert this vector into a string representation.
     *
     * @return {string} String representation (x, y).
     */
    toString() {
        return `(${this._x}, ${this._y})`;
    }

    /**
     * Convert this vector into a string representation, using a fixed number
     * of digits for displaying.
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
     * @return {Vector} Cloned instance.
     */
    clone() {
        return new Vector(this._x, this._y);
    }

    /**
     * Return true if this vector is equal to another vector. Two vectors are
     * equal when both x and y components are equal.
     *
     * @param {object} that Other instance to compare to.
     * @return {boolean} True if both points are equal, false otherwise.
     */
    equals(that) {
        return this.constructor.name === that.constructor.name &&
            this._x === that._x && this._y === that._y;
    }

    /**
     * Return true if the vector is defined and finite.
     *
     * @return {Boolean} True if vector is fully defined and valid.
     */
    isValid() {
        return typeof(this._x) === 'number' && isFinite(this._x) &&
            typeof(this._y) === 'number' && isFinite(this._y);
    }
}
