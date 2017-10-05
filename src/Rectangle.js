// @flow

import Point from './Point';
import LineSegment from './LineSegment';
import Vector from './Vector';
import Circle from './Circle';

/**
 * Immutable rectangle class.
 */
export default class Rectangle {
    /**
     * Construct a new immutable rectangle of two points.
     *
     * @param {Point} a The `A` point..
     * @param {Point} b The `B` point.
     * @return {void}
     */
    constructor(a, b) {
        this._a = a;
        this._b = b;
    }

    /**
     * Create a new rectangle from an array. The first index should be point
     * `A` and the second index should be point `B`.
     *
     * @param {Array} array Input array with at least two values.
     * @return {Rectangle} Resulting rectangle.
     */
    static fromArray(array) {
        if (process.env.NODE_ENV !== 'production') {
            if (!Array.isArray(array) || array.length < 2) {
                throw new Error('Expected an array with at least two values.');
            }
        }

        return new Rectangle(
            Point.fromArray(array[0]),
            Point.fromArray(array[1])
        );
    }

    /**
     * Create a new rectangle from an object. The object should have an `a` and
     * `b` property.
     *
     * @param {object} object Input object with `a` and `b` property.
     * @return {Rectangle} Resulting rectangle.
     */
    static fromObject(object) {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof(object) !== 'object') {
                throw new Error('Expected an object.');
            }
        }

        return new Rectangle(
            Point.fromObject(object.a),
            Point.fromObject(object.b)
        );
    }

    /**
     * Create a new rectangle from a (client) bounding rect from an element.
     * However, it accepts any object with a `left`, `top, `width` and `height`
     * property.
     *
     * @param {object} boundingRect Input bounding rectangle.
     * @return {Rectangle} Rectangle based on given bounding rectangle.
     */
    static fromBoundingRect(boundingRect) {
        return new Rectangle(
            new Point(boundingRect.left, boundingRect.top),
            new Point(
                boundingRect.left + boundingRect.width,
                boundingRect.top + boundingRect.height
            )
        );
    }

    /**
     * Return point `A`.
     *
     * @return {Point} Point `A`.
     */
    get a() {
        return this._a;
    }

    /**
     * Return point `B`.
     *
     * @return {Point} Point `B`.
     */
    get b() {
        return this._b;
    }

    /**
     * Return the left x coordinate.
     *
     * @return {number} Left x coordinate.
     */
    get left() {
        // return Math.min(this._a._x, this._b._x);
        return this._a._x;
    }

    /**
     * Return the right x coordinate.
     *
     * @return {number} Right x coordinate.
     */
    get right() {
        // return Math.max(this._a._x, this._b._x);
        return this._b._x;
    }

    /**
     * Return the top y coordinate.
     *
     * @return {number} Top y coordinate.
     */
    get top() {
        // return Math.min(this._a._y, this._b._y);
        return this._a._y;
    }

    /**
     * Return the bottom y coordinate.
     *
     * @return {number} Bottom y coordinate.
     */
    get bottom() {
        // return Math.max(this._a._y, this._b._y);
        return this._b._y;
    }

    /**
     * Return the width of this rectangle, which is the difference between
     * `this.right` and `this.left`.
     *
     * @return {number} Width of the rectangle.
     */
    get width() {
        return this.right - this.left;
    }

    /**
     * Return the height of this rectangle, which is the difference between
     * `this.bottom` and `this.top`.
     *
     * @return {number} Height of the rectangle.
     */
    get height() {
        return this.bottom - this.top;
    }

    /**
     * Calculate the center point of this rectangle.
     *
     * @return {Point} Center of this rectangle.
     */
    center() {
        const x = (this._a._x + this._b._x) / 2;
        const y = (this._a._y + this._b._y) / 2;

        return new Point(x, y);
    }

    /**
     * Calculate the center point offset.
     *
     * @return {Vector} Relative center point offset of this rectangle.
     */
    centerOffset() {
        return this.center().subtract(this._a);
    }

    /**
     * Merge two rectangles, taking the bouding box that contains both
     * rectangles.
     *
     * @param {Rectangle} rectangle Other rectangle to merge with.
     * @return {Rectangle} New rectangle containing both rectangles.
     */
    merge(rectangle) {
        if (process.env.NODE_ENV !== 'production') {
            if (!(rectangle instanceof Rectangle)) {
                throw new Error('Must merge with another rectangle.');
            }
        }

        const a = new Point(
            Math.min(this._a._x, this._b._x, rectangle._a._x, rectangle._b._x),
            Math.min(this._a._y, this._b._y, rectangle._a._y, rectangle._b._y)
        );
        const b = new Point(
            Math.max(this._a._x, this._b._x, rectangle._a._x, rectangle._b._x),
            Math.max(this._a._y, this._b._y, rectangle._a._y, rectangle._b._y)
        );

        return new Rectangle(a, b);
    }

    /**
     * Move the rectangle by applying an offset to the points `a` and `b`.
     *
     * @param {Vector} vector Offset vector.
     * @return {Rectangle} Moved rectangle.
     */
    move(vector) {
        if (process.env.NODE_ENV !== 'production') {
            if (!(vector instanceof Vector)) {
                throw new Error('Offset must be a vector.');
            }
        }

        return new Rectangle(this._a.add(vector), this._b.add(vector));
    }

    /**
     * Move the `a` point and `b` point of this rectangle individually.
     *
     * @param {Vector} vectorA Offset vector for `a` point.
     * @param {Vector} vectorB Offset vector for `b` point.
     * @return {Rectangle} Moved rectangle.
     */
    moveAB(vectorA, vectorB) {
        if (process.env.NODE_ENV !== 'production') {
            if (!(vectorA instanceof Vector) || !(vectorB instanceof Vector)) {
                throw new Error('Offset must be a vector.');
            }
        }

        return new Rectangle(this._a.add(vectorA), this._b.add(vectorB));
    }

    /**
     * Similar to move, but moves `a` and `b` in opposite directions by
     * inverting the vector for `a`.
     *
     * This method may shrink the rectangle if the vector is negative, or if
     * points `a` and `b` have been swapped. Normalize the
     *
     * @param {Vector} vector The offset vector to expand with.
     * @return {Rectangle} Expanded rectangle.
     */
    expand(vector) {
        return this.moveAB(vector.invert(), vector);
    }

    /**
     * Returns true if a given point is on this rectangle.
     *
     * @param {Point} point Point to test with.
     * @return {boolean} True if point is within rectangle.
     */
    containsPoint(point) {
        if (process.env.NODE_ENV !== 'production') {
            if (!(point instanceof Point)) {
                throw new Error('Must be a point.');
            }
        }

        return (
            (point._x >= this._a._x && point._x <= this._b._x) ||
            (point._x >= this._b._x && point._x <= this._a._x)
        ) && (
            (point._y >= this._a._y && point._y <= this._b._y) ||
            (point._y >= this._b._y && point._y <= this._a._y)
        );
    }

    /**
     * Returns true if a given rectangle is within this rectangle. That is,
     * both point `A` and `B` are within this rectangle.
     *
     * @param {Rectangle} rectangle The rectangle to check for.
     * @return {booleam} True if the rectangle is within this rectangle.
     */
    containsRectangle(rectangle) {
        if (process.env.NODE_ENV !== 'production') {
            if (!(rectangle instanceof Rectangle)) {
                throw new Error('Must be a rectangle.');
            }
        }

        return this.containsPoint(rectangle.a) &&
            this.containsPoint(rectangle.b);
    }

    /**
     * Returns true if a given rectangle collides with this rectangle.
     *
     * @param {Rectangle} rectangle Other rectangle to compare with.
     * @return {boolean} True if the given rectangle collides with this one.
     */
    collidesRectangle(rectangle) {
        if (process.env.NODE_ENV !== 'production') {
            if (!(rectangle instanceof Rectangle)) {
                throw new Error('Must be a rectangle.');
            }
        }

        return (this._a._x < rectangle._b._x && this._b._x > rectangle._a._x &&
            this._a._y < rectangle._b._y && this._b._y > rectangle._a._y);
    }

    /**
     * Returns true if a given circle collides with this rectangle.
     *
     * @param {Circle} circle Other circle to compare with.
     * @return {boolean} True if the given circles collides with this one.
     */
    collidesCircle(circle) {
        if (process.env.NODE_ENV !== 'production') {
            if (!(circle instanceof Circle)) {
                throw new Error('Must be a circle.');
            }
        }

        const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

        const closest = new Point(
            clamp(circle._a._x, this._a._x, this._b._x),
            clamp(circle._a._y, this._a._y, this._b._y)
        );

        return closest.distanceSq(circle._a) < (circle._r * circle._r);
    }

    /**
     * Calculate the area of the given rectangle.
     *
     * @return {number} The rectangle area.
     */
    area() {
        return (this._b._x - this._a._x) * (this._b._y - this._a._y);
    }

    /**
     * Return an array representation of this instance.
     *
     * @return {Array} Array representation [a, b].
     */
    toArray() {
        return [this._a.toArray(), this._b.toArray()];
    }

    /**
     * Return an object representation of this instance.
     *
     * @return {object} Object representation {a, b}.
     */
    toObject() {
        return {
            a: this._a.toObject(),
            b: this._b.toObject(),
        };
    }

    /**
     * Return an object representation of the bounding rectangle of this
     * instance.
     *
     * @return {object} Object representation { left, top, width, height }.
     */
    toBoundingRect() {
        return {
            left: this.left,
            top: this.top,
            width: this.width,
            height: this.height,
        };
    }

    /**
     * Return a string representation of this rectangle.
     *
     * @return {string} String representation.
     */
    toString() {
        return `(${this._a.toString()}, ${this._b.toString()})`;
    }

    /**
     * Return an array of line segments of the four edges of this rectangle.
     *
     * @return {Array<LineSegment>} Array of line segments.
     */
    toLineSegments() {
        const c = new Point(this._a._x, this._b._y);
        const d = new Point(this._b._x, this._a._y);

        return [
            new LineSegment(this._a, d),
            new LineSegment(d, this._b),
            new LineSegment(this._b, c),
            new LineSegment(c, this._a),
        ];
    }

    /**
     * Create a shallow copy of this instance.
     *
     * @return {Rectangle} Cloned instance.
     */
    clone() {
        return new Rectangle(this._a, this._b);
    }

    /**
     * Return a normalize rectangle, with the `A` point in the top-left
     * position and the `B` point in the bottom-right position.
     *
     * @return {Rectangle} The normalized rectangle.
     */
    normalize() {
        return new Rectangle(
            new Point(this.left, this.top),
            new Point(this.right, this.bottom)
        );
    }

    /**
     * Return true if this rectangle is equal to another rectangle. Two
     * rectangles are equal if and only if both points are equal. This means
     * if two rectangles have the same left, right, top and bottom, they
     * may not be equal, because they may have been defined from different
     * points.
     *
     * @param {object} that Other instance to compare to.
     * @return {boolean} True if both rectangles are equal, false otherwise.
     */
    equals(that) {
        return this.constructor.name === that.constructor.name &&
            this._a.equals(that._b) && this._b.equals(that._b);
    }

    /**
     * Return true if the rectangle is defined and finite.
     *
     * @return {Boolean} True if rectangle is valid.
     */
    isValid() {
        return this._a.isValid() && this._b.isValid();
    }
}
