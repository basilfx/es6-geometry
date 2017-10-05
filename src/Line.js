// @flow

import Point from './Point';

/**
 * Immutable line class.
 *
 * A line is defined by two points, `a` and `b`. It has no thickness and its
 * length is inifite (e.g. it extends beyond point `a` and `b`).
 */
export default class Line {
    /**
     * Construct a new immutable line out of two points.
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
     * Return the length.
     *
     * @return {float} length of line, which is infinity, per definition.
     */
    get length() {
        return Infinity;
    }

    /**
     * Create a shallow copy of this instance.
     *
     * @return {Line} Cloned instance.
     */
    clone() {
        return new Line(this._a, this._b);
    }

    /**
     * Return true if the line is defined and finite.
     *
     * @return {Boolean} True if line is valid.
     */
    isValid() {
        return this._a.isValid() && this._b.isValid();
    }
}
