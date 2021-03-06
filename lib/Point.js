'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Immutable point class.
 *
 * A point is an absolute place in space, at a given x and y coordinate.
 *
 * The difference between a Point and a vector is explained in this source:
 * http://math.stackexchange.com/a/645827 and
 * http://geomalgorithms.com/points_and_vectors.html.
 */


/**
 * Definition of an array representing a point.
 */


/**
 * Definition of an object representing a point.
 */
var Point = function () {

    /**
     * Construct a new point, using a x and y coordinate.
     *
     * An point is immutable. All subsequent operations will return a new point
     * instance.
     *
     * @param {number} x The x coordinate.
     * @param {number} y The y coordinate.
     * @return {void}
     */

    /**
     * The x coordinate.
     *
     * @type {number}
     */
    function Point(x, y) {
        _classCallCheck(this, Point);

        this._x = x;
        this._y = y;
    }

    /**
     * Create a new point from an array. The first index is considered the x
     * coordinate, the second index is considered the y coordinate.
     *
     * @param {PointArray} array Input array with at least two values.
     * @return {Point} Resulting point.
     */


    /**
     * The y coordinate.
     *
     * @type {number}
     */


    _createClass(Point, [{
        key: 'add',


        /**
         * Add a vector to a point.
         *
         * Note that addition of two points is undefined.
         *
         * @param {Vector} vector Vector to add to this point.
         * @return {Point} Point with the vector added to it.
         */
        value: function add(vector) {
            if (process.env.NODE_ENV !== 'production') {
                // $FlowFixMe
                if (vector instanceof Point) {
                    throw new Error('Addition of two points is undefined.');
                }
            }

            return new Point(this._x + vector._x, this._y + vector._y);
        }

        /**
         * Subtract a Point from this point, to calculate the displacement.
         *
         * @param {Point} that Point to subtract.
         * @return {Vector} The displacement as a Vector.
         */

    }, {
        key: 'subtract',
        value: function subtract(that) {
            if (process.env.NODE_ENV !== 'production') {
                // $FlowFixMe
                if (that instanceof _Vector2.default) {
                    throw new Error('Cannot subract Vector. Use `subtractVector` instead.');
                }
            }

            return new _Vector2.default(this._x - that._x, this._y - that._y);
        }

        /**
         * Subtract a Vector from this Point.
         *
         * @param {Vector} vector Vector to subtract.
         * @return {Point} If `that` is a Vector, it will return the new point.
         */

    }, {
        key: 'subtractVector',
        value: function subtractVector(vector) {
            return new Point(this._x - vector._x, this._y - vector._y);
        }

        /**
         * Snap a point to a fixed number.
         *
         * @param {number} to The number to fix to.
         * @return {Point} New point snapped to the given number.
         */

    }, {
        key: 'snap',
        value: function snap(to) {
            var round = function round(val) {
                return Math.round(val / to) * to;
            };

            return new Point(round(this._x), round(this._y));
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

    }, {
        key: 'distanceSq',
        value: function distanceSq(point) {
            if (process.env.NODE_ENV !== 'production') {
                if (!(point instanceof Point)) {
                    throw new Error('Must be a point.');
                }
            }

            var dX = this._x - point._x;
            var dY = this._y - point._y;

            return dX * dX + dY * dY;
        }

        /**
         * Calculate the distance between two points.
         *
         * @param {Point} point The other point.
         * @return {number} The distance between both points.
         */

    }, {
        key: 'distance',
        value: function distance(point) {
            return Math.sqrt(this.distanceSq(point));
        }

        /**
         * Convert point into a vector.
         *
         * Note: this is an utility method. A mathematical definition of a
         * conversion does not exist.
         *
         * @return {Vector} The point converted as vector.
         */

    }, {
        key: 'toVector',
        value: function toVector() {
            return new _Vector2.default(this._x, this._y);
        }

        /**
         * Convert this point into an array.
         *
         * @return {PointArray} Array representation (x, y).
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            return [this._x, this._y];
        }

        /**
         * Convert this point into an object.
         *
         * @return {PointObject} Object representation (x, y).
         */

    }, {
        key: 'toObject',
        value: function toObject() {
            return { x: this._x, y: this._y };
        }

        /**
         * Convert this point into a string representation.
         *
         * @return {string} String representation (x, y).
         */

    }, {
        key: 'toString',
        value: function toString() {
            return '(' + this._x + ', ' + this._y + ')';
        }

        /**
         * Convert this point into a string representation, using a fixed number of
         * digits for displaying.
         *
         * @param {number} digits Number of digits to use for representation.
         * @return {string} String representation (x, y).
         */

    }, {
        key: 'toFixed',
        value: function toFixed(digits) {
            if (process.env.NODE_ENV !== 'production') {
                if (typeof digits !== 'number') {
                    throw new Error('Number of digits must be a number.');
                }
            }

            return '(' + this._x.toFixed(digits) + ', ' + this._y.toFixed(digits) + ')';
        }

        /**
         * Create a shallow copy of this instance.
         *
         * @return {Point} Cloned instance.
         */

    }, {
        key: 'clone',
        value: function clone() {
            return new Point(this._x, this._y);
        }

        /**
         * Return true if this point is equal to another point. Two points are
         * equal when both x and y coordinates are equal.
         *
         * @param {Object} that Other instance to compare to.
         * @return {boolean} True if both points are equal, false otherwise.
         */

    }, {
        key: 'equals',
        value: function equals(that) {
            return this.constructor.name === that.constructor.name && this._x === that._x && this._y === that._y;
        }

        /**
         * Return true if the point is defined and finite.
         *
         * @return {boolean} True if point is fully defined and valid.
         */

    }, {
        key: 'isValid',
        value: function isValid() {
            return typeof this._x === 'number' && isFinite(this._x) && typeof this._y === 'number' && isFinite(this._y);
        }
    }, {
        key: 'x',


        /**
         * Get the x coordinate.
         *
         * @return {number} The x coordinate.
         */
        get: function get() {
            return this._x;
        }

        /**
         * Get the y coordinate.
         *
         * @return {number} The y coordinate.
         */

    }, {
        key: 'y',
        get: function get() {
            return this._y;
        }
    }], [{
        key: 'fromArray',
        value: function fromArray(array) {
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
         * @param {PointObject} object Input object with x and y property.
         * @return {Point} Resulting point.
         */

    }, {
        key: 'fromObject',
        value: function fromObject(object) {
            if (process.env.NODE_ENV !== 'production') {
                if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') {
                    throw new Error('Expected an object.');
                }
            }

            return new Point(object.x, object.y);
        }
    }]);

    return Point;
}();

exports.default = Point;