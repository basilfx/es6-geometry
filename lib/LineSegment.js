'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Immutable line segment class.
 *
 * A line is defined by two points, `a` and `b`. It has no thickness and its
 * length is defined by the absolute difference between `a` and `b`.
 */


/**
 * Definition of an array representing a line segment.
 */

/**
 * Definition of an object representing a line segment.
 */
var LineSegment = function () {

    /**
     * Construct a new immutable line segment out of two points.
     *
     * @param {Point} a The `A` point..
     * @param {Point} b The `B` point.
     * @return {void}
     */

    /**
     * The `A` point.
     *
     * @type {Point}
     */
    function LineSegment(a, b) {
        _classCallCheck(this, LineSegment);

        this._a = a;
        this._b = b;
    }

    /**
     * Create a new line segment from an array. The first index should be point
     * `A` and the second index should be point `B`.
     *
     * @param {LineSegmentArray} array Input array with at least two values.
     * @return {LineSegment} Resulting line segment.
     */


    /**
     * The `B` point.
     *
     * @type {Point}
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
         * @return {?Point} Point of intersection, if any.
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
         * Return an array representation of this instance.
         *
         * @return {LineSegmentArray} Array representation [a, b].
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            return [this._a.toArray(), this._b.toArray()];
        }

        /**
         * Return an object representation of this instance.
         *
         * @return {LineSegmentObject} Object representation {a, b}.
         */

    }, {
        key: 'toObject',
        value: function toObject() {
            return {
                a: this._a.toObject(),
                b: this._b.toObject()
            };
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
         * @return {boolean} True if line segment is valid.
         */

    }, {
        key: 'isValid',
        value: function isValid() {
            return this._a.isValid() && this._b.isValid();
        }
    }, {
        key: 'a',


        /**
         * Return point `A`.
         *
         * @return {Point} Point `A`.
         */
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
         * @return {number} length of line, which is infinity, per definition.
         */

    }, {
        key: 'length',
        get: function get() {
            return this._a.distance(this._b);
        }
    }], [{
        key: 'fromArray',
        value: function fromArray(array) {
            if (process.env.NODE_ENV !== 'production') {
                if (!Array.isArray(array) || array.length < 2) {
                    throw new Error('Expected an array with at least two values.');
                }
            }

            return new LineSegment(_Point2.default.fromArray(array[0]), _Point2.default.fromArray(array[1]));
        }

        /**
         * Create a new line segment from an object. The object should have an `a` and
         * `b` property.
         *
         * @param {LineSegmentObject} object Input object with `a` and `b`
         *                            property.
         * @return {LineSegment} Resulting line segment.
         */

    }, {
        key: 'fromObject',
        value: function fromObject(object) {
            if (process.env.NODE_ENV !== 'production') {
                if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') {
                    throw new Error('Expected an object.');
                }
            }

            return new LineSegment(_Point2.default.fromObject(object.a), _Point2.default.fromObject(object.b));
        }
    }]);

    return LineSegment;
}();

exports.default = LineSegment;