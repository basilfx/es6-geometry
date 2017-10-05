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
 * Immutable line class.
 *
 * A line is defined by two points, `a` and `b`. It has no thickness and its
 * length is inifite (e.g. it extends beyond point `a` and `b`).
 */


/**
 * Definition of an array representing a line.
 */


/**
 * Definition of an object representing a line.
 */
var Line = function () {

    /**
     * Construct a new immutable line out of two points.
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
    function Line(a, b) {
        _classCallCheck(this, Line);

        this._a = a;
        this._b = b;
    }

    /**
     * Create a new line from an array. The first index should be point
     * `A` and the second index should be point `B`.
     *
     * @param {LineArray} array Input array with at least two values.
     * @return {Line} Resulting line.
     */


    /**
     * The `B` point.
     *
     * @type {Point}
     */


    _createClass(Line, [{
        key: 'toArray',


        /**
         * Return an array representation of this instance.
         *
         * @return {LineArray} Array representation [a, b].
         */
        value: function toArray() {
            return [this._a.toArray(), this._b.toArray()];
        }

        /**
         * Return an object representation of this instance.
         *
         * @return {LineObject} Object representation {a, b}.
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
         * @return {Line} Cloned instance.
         */

    }, {
        key: 'clone',
        value: function clone() {
            return new Line(this._a, this._b);
        }

        /**
         * Return true if the line is defined and finite.
         *
         * @return {boolean} True if line is valid.
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
            return Infinity;
        }
    }], [{
        key: 'fromArray',
        value: function fromArray(array) {
            if (process.env.NODE_ENV !== 'production') {
                if (!Array.isArray(array) || array.length < 2) {
                    throw new Error('Expected an array with at least two values.');
                }
            }

            return new Line(_Point2.default.fromArray(array[0]), _Point2.default.fromArray(array[1]));
        }

        /**
         * Create a new line from an object. The object should have an `a` and
         * `b` property.
         *
         * @param {LineObject} object Input object with `a` and `b` property.
         * @return {Line} Resulting line.
         */

    }, {
        key: 'fromObject',
        value: function fromObject(object) {
            if (process.env.NODE_ENV !== 'production') {
                if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') {
                    throw new Error('Expected an object.');
                }
            }

            return new Line(_Point2.default.fromObject(object.a), _Point2.default.fromObject(object.b));
        }
    }]);

    return Line;
}();

exports.default = Line;