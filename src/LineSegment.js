import Point from './Point';

/**
 * Immutable line class.
 *
 * A line is defined by two points, `a` and `b`. It has no thickness and its
 * length is inifite (e.g. it extends beyond point `a` and `b`).
 */
export default class LineSegment {
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
        return this._a.distance(this._b);
    }

    /**
     * Calculate the intersection point of the two line segments. If there is
     * no intersection, this method returns null.
     *
     * Algorithm is based on http://stackoverflow.com/a/35457290/1423623.
     *
     * @param {LineSegment} other The other line segment.
     * @return {Point?} Point of intersection, if any.
     */
    intersection(other) {
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

        return null;
    }

    /**
     * Create a shallow copy of this instance.
     *
     * @return {LineSegment} Cloned instance.
     */
    clone() {
        return new LineSegment(this._a, this._b);
    }

    /**
     * Return true if the line segment is defined and finite.
     *
     * @return {Boolean} True if line segment is valid.
     */
    isValid() {
        return this._a.isValid() && this._b.isValid();
    }
}
