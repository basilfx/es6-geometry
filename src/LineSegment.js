// @flow

import Point from './Point';

import type { PointArray, PointObject } from './Point';

export type LineSegmentArray = Array<PointArray>;
export type LineSegmentObject = { A: PointObject, y: PointObject }

/**
 * Immutable line segment class.
 *
 * A line is defined by two points, `a` and `b`. It has no thickness and its
 * length is defined by the absolute difference between `a` and `b`.
 */
export default class LineSegment {
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
     * Construct a new immutable line segment out of two points.
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
        return this._a.distance(this._b);
    }

    /**
     * Calculate the intersection point of the two line segments. If there is
     * no intersection, this method returns null.
     *
     * Algorithm is based on http://stackoverflow.com/a/35457290/1423623.
     *
     * @param {LineSegment} other The other line segment.
     * @return {?Point} Point of intersection, if any.
     */
    intersection(other: LineSegment): ?Point {
        const dx1 = this._b._x - this._a._x;
        const dy1 = this._b._y - this._a._y;

        const dx2 = other._b._x - other._a._x;
        const dy2 = other._b._y - other._a._y;

        const dx3 = this._a._x - other._a._x;
        const dy3 = this._a._y - other._a._y;

        const d = dx1 * dy2 - dx2 * dy1;

        if (d !== 0) {
            const s = dx1 * dy3 - dx3 * dy1;

            if ((s <= 0 && d < 0 && s >= d) || (s >= 0 && d > 0 && s <= d)) {
                const t = dx2 * dy3 - dx3 * dy2;

                if ((t <= 0 && d < 0 && t > d) || (t >= 0 && d > 0 && t < d)) {
                    const u = t / d;

                    return new Point(
                        this._a._x + u * dx1,
                        this._a._y + u * dy1
                    );
                }
            }
        }
    }

    /**
     * Create a shallow copy of this instance.
     *
     * @return {LineSegment} Cloned instance.
     */
    clone(): LineSegment {
        return new LineSegment(this._a, this._b);
    }

    /**
     * Return true if the line segment is defined and finite.
     *
     * @return {boolean} True if line segment is valid.
     */
    isValid(): boolean {
        return this._a.isValid() && this._b.isValid();
    }
}
