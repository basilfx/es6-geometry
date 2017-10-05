'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

var _Rectangle = require('./Rectangle');

var _Rectangle2 = _interopRequireDefault(_Rectangle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Immutable circle class.
 */


/**
 * Definition of an array representing a circle.
 */


/**
 * Definition of an object representing a circle.
 */
var Circle = function () {

    /**
     * Construct a new circle using center point `A` and radius `r`.
     *
     * @param {Point} a Center point `A`.
     * @param {number} r The radius `r`.
     * @return {void}
     */

    /**
     * Circle center point.
     *
     * @type {Point}
     */
    function Circle(a, r) {
        _classCallCheck(this, Circle);

        this._a = a;
        this._r = r;
    }

    /**
     * Create a new circle from an array. The first index should be point
     * `A` and the second index should be the radius `r`.
     *
     * @param {CircleArray} array Input array with at least two values.
     * @return {Circle} Resulting circle.
     */


    /**
     * Circle radius.
     *
     * @type {number}
     */


    _createClass(Circle, [{
        key: 'toRectangle',


        /**
         * Convert this circle to a rectangle that contains this circle exactly.
         *
         * @return {Rectangle} Converted rectangle.
         */
        value: function toRectangle() {
            var a = new _Point2.default(this._a._x - this._r, this._a._y - this._r);
            var b = new _Point2.default(this._a._x + this._r, this._a._y + this._r);

            return new _Rectangle2.default(a, b);
        }

        /**
         * Convert this circle into an object.
         *
         * @return {CircleObject} Object representation (a, r).
         */

    }, {
        key: 'toObject',
        value: function toObject() {
            return {
                a: this._a.toObject(),
                r: this._r
            };
        }

        /**
         * Convert this circle into an array.
         *
         * @return {CircleArray} Array representation (a, r).
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            return [this._a.toArray(), this._r];
        }

        /**
         * Convert this circle into a string representation.
         *
         * @return {string} String representation (a, r).
         */

    }, {
        key: 'toString',
        value: function toString() {
            return '(' + this._a.toString() + ', ' + this._r + ')';
        }

        /**
         * Create a shallow copy of this instance.
         *
         * @return {Circle} Cloned instance.
         */

    }, {
        key: 'clone',
        value: function clone() {
            return new Circle(this._a, this._r);
        }

        /**
         * Return true if this circle is equal to another circle. Two circles are
         * equal if and only if the center point and radius are equal.
         *
         * @param {Object} that Other instance to compare to.
         * @return {boolean} True if both circles are equal, false otherwise.
         */

    }, {
        key: 'equals',
        value: function equals(that) {
            return this.constructor.name === that.constructor.name && this._a.equals(that._a) && this._r === that._r;
        }

        /**
         * Return true if the circle is defined, finite and valid.
         *
         * @return {boolean} True if the circle is fully defined, finite and valid.
         */

    }, {
        key: 'isValid',
        value: function isValid() {
            return this._a.isValid() && typeof this._r === 'number' && isFinite(this._r) && this._r >= 0;
        }
    }, {
        key: 'a',


        /**
         * Get the circle center point.
         *
         * @return {Point} Center point.
         */
        get: function get() {
            return this._a;
        }

        /**
         * Get the circle center x coordinate. Shortcut for `this.a.x`.
         *
         * @return {number} Circle center x coordinate.
         */

    }, {
        key: 'x',
        get: function get() {
            return this._a._x;
        }

        /**
         * Get the circle center y coordinate. Shortcut for `this.a.y`.
         *
         * @return {number} Circle center y coordinate.
         */

    }, {
        key: 'y',
        get: function get() {
            return this._a._y;
        }

        /**
         * Get the circle radius.
         *
         * @return {number} Circle radius.
         */

    }, {
        key: 'r',
        get: function get() {
            return this._r;
        }

        /**
         * Get the diameter. This is a shortcut for `this.r * 2`.
         *
         * @return {number} The circle diameter.
         */

    }, {
        key: 'd',
        get: function get() {
            return this._r * 2;
        }
    }], [{
        key: 'fromArray',
        value: function fromArray(array) {
            if (process.env.NODE_ENV !== 'production') {
                if (!Array.isArray(array) || array.length < 2) {
                    throw new Error('Expected an array with at least two values.');
                }
            }

            return new Circle(_Point2.default.fromArray(array[0]), array[1]);
        }

        /**
         * Create a new circle from an object. The object should have an `a` and
         * `r` property.
         *
         * @param {CircleObject} object Input object with `a` and `b` property.
         * @return {Circle} Resulting circle.
         */

    }, {
        key: 'fromObject',
        value: function fromObject(object) {
            if (process.env.NODE_ENV !== 'production') {
                if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') {
                    throw new Error('Expected an object.');
                }
            }

            return new Circle(_Point2.default.fromObject(object.a), object.r);
        }
    }]);

    return Circle;
}();

exports.default = Circle;