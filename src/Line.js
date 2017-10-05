// @flow

import Point from './Point';

import type { PointArray, PointObject } from './Point';

export type LineArray = Array<PointArray>;
export type LineObject = { A: PointObject, y: PointObject }

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
