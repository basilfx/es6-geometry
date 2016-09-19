'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Immutable line class.
 *
 * A line is defined by two points, `a` and `b`. It has no thickness and its
 * length is inifite (e.g. it extends beyond point `a` and `b`).
 */

var LineSegment = function () {
    /**
     * Construct a new immutable line out of two points.
     *
     * @param {Point} a The `A` point..
     * @param {Point} b The `B` point.
     * @return {void}
     */

    function LineSegment(a, b) {
        _classCallCheck(this, LineSegment);

        this._a = a;
        this._b = b;
    }

    /**
     * Return point `A`.
     *
     * @return {Point} Point `A`.
     */


    _createClass(LineSegment, [{
        key: 'intersection',


        /**
         * Calculate the intersection point of the two line segments. If there is
         * no intersection, this method returns null.
         *
         * Algorithm is based on http://stackoverflow.com/a/35457290/1423623.
         *
         * @param {LineSegment} other The other line segment.
         * @return {Point?} Point of intersection, if any.
         */
        value: function intersection(other) {
            var dx1 = this._b._x - this._a._x;
            var dy1 = this._b._y - this._a._y;

            var dx2 = other._b._x - other._a._x;
            var dy2 = other._b._y - other._a._y;

            var dx3 = this._a._x - other._a._x;
            var dy3 = this._a._y - other._a._y;

            var d = dx1 * dy2 - dx2 * dy1;

            if (d !== 0) {
                var s = dx1 * dy3 - dx3 * dy1;

                if (s <= 0 && d < 0 && s >= d || s >= 0 && d > 0 && s <= d) {
                    var t = dx2 * dy3 - dx3 * dy2;

                    if (t <= 0 && d < 0 && t > d || t >= 0 && d > 0 && t < d) {
                        var u = t / d;

                        return new _Point2.default(this._a._x + u * dx1, this._a._y + u * dy1);
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

    }, {
        key: 'clone',
        value: function clone() {
            return new LineSegment(this._a, this._b);
        }

        /**
         * Return true if the line segment is defined and finite.
         *
         * @return {Boolean} True if line segment is valid.
         */

    }, {
        key: 'isValid',
        value: function isValid() {
            return this._a.isValid() && this._b.isValid();
        }
    }, {
        key: 'a',
        get: function get() {
            return this._a;
        }

        /**
         * Return point `B`.
         *
         * @return {Point} Point `B`.
         */

    }, {
        key: 'b',
        get: function get() {
            return this._b;
        }

        /**
         * Return the length.
         *
         * @return {float} length of line, which is infinity, per definition.
         */

    }, {
        key: 'length',
        get: function get() {
            return this._a.distance(this._b);
        }
    }]);

    return LineSegment;
}();

exports.default = LineSegment;