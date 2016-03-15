'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Immutable vector class.
 */

var Vector = function () {

    /**
     * Construct a new vector, using an x and y component to represent the
     * length (magnitude) and direction relative to (0, 0).
     *
     * An vector is immutable. All subsequent operations will return a new
     * vector instance.
     *
     * @param {number} x The x component.
     * @param {number} y The y component.
     * @return {void}
     */

    function Vector(x, y) {
        _classCallCheck(this, Vector);

        this._x = x;
        this._y = y;
    }

    /**
     * Create a new vector from an array. The first index is considered the x
     * component, the second index is considered the y component.
     *
     * @param {Array} array Input array with at least two values.
     * @return {Vector} Resulting vector.
     */

    /**
     * Definition of the unit vector.
     */


    _createClass(Vector, [{
        key: 'add',


        /**
         * Add another vector or point to this vector.
         *
         * If the input is a point, the result will be a point with this vector
         * as offset.
         *
         * @param {Point|Vector} that Point or vector to add.
         * @return {Point|Vector} New Vector if adding vector, point otherwise.
         */
        value: function add(that) {
            if (that instanceof _Point2.default) {
                return that.add(this);
            }

            return new Vector(this._x + that._x, this._y + that._y);
        }
    }, {
        key: 'subtract',
        value: function subtract(that) {
            return new Vector(this._x - that._x, this._y - that._y);
        }
    }, {
        key: 'invert',
        value: function invert() {
            return new Vector(-this._x, -this._y);
        }
    }, {
        key: 'multiply',
        value: function multiply(scalar) {
            return new Vector(this._x * scalar, this._y * scalar);
        }
    }, {
        key: 'multiplyXY',
        value: function multiplyXY(scalarX, scalarY) {
            return new Vector(this._x * scalarX, this._y * scalarY);
        }
    }, {
        key: 'divide',
        value: function divide(scalar) {
            return new Vector(this._x / scalar, this._y / scalar);
        }
    }, {
        key: 'divideXY',
        value: function divideXY(scalarX, scalarY) {
            return new Vector(this._x / scalarX, this._y / scalarY);
        }
    }, {
        key: 'mix',
        value: function mix(that) {
            var amount = arguments.length <= 1 || arguments[1] === undefined ? 0.5 : arguments[1];

            return this.multiply(1 - amount).add(that.multiply(amount));
        }
    }, {
        key: 'perpendicular',
        value: function perpendicular() {
            return new Vector(-this._y, this._x);
        }
    }, {
        key: 'snap',
        value: function snap(to) {
            var round = function round(val) {
                return Math.round(val / to) * to;
            };

            return new Vector(round(this._x), round(this._y));
        }
    }, {
        key: 'dot',
        value: function dot(that) {
            return this._x * that._x + this._y * that._y;
        }
    }, {
        key: 'angle',
        value: function angle() {
            return Math.atan2(this._y, this._x);
        }
    }, {
        key: 'angleDeg',
        value: function angleDeg() {
            return Math.atan2(this._y, this._x) * 180 / Math.PI;
        }
    }, {
        key: 'slope',
        value: function slope() {
            return this._y / this._x;
        }

        /**
         * Calculate the squared length of this vector.
         *
         * If the exact length doesn't matter, this method is slightly faster
         * than `this.length`.
         *
         * @return {number} The squared length of this vector.
         */

    }, {
        key: 'lengthSq',
        value: function lengthSq() {
            return this._x * this._x + this._y * this._y;
        }

        /**
         * Calculate the length (or magnitude) of the vector.
         *
         * @return {number} The length of the vector.
         */

    }, {
        key: 'length',
        value: function length() {
            return Math.sqrt(this.lengthSq());
        }

        /**
         * [minLength description]
         * @param {[type]} length [description]
         * @return {[type]}
         */

    }, {
        key: 'minLength',
        value: function minLength(length) {
            return this.length() < length ? this.normalize(length) : this;
        }
    }, {
        key: 'maxLength',
        value: function maxLength(length) {
            return this.length() > length ? this.normalize(length) : this;
        }
    }, {
        key: 'normalize',
        value: function normalize() {
            var scalar = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

            return this.divide(this.length()).multiply(scalar);
        }
    }, {
        key: 'projectOnto',
        value: function projectOnto(that) {
            return that.multiply(this.dot(that) / that.lengthSq());
        }

        /**
         * Convert vector into a point.
         *
         * Note: this is an utility method. A proper conversion does not exist.
         *
         * @return {Point} The vector converted as point.
         */

    }, {
        key: 'toPoint',
        value: function toPoint() {
            return new _Point2.default(this._x, this._y);
        }

        /**
         * Convert this vector into an array.
         *
         * @return {Array} Array representation (x, y).
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            return [this._x, this._y];
        }

        /**
         * Convert this vector into an object.
         *
         * @return {object} Object representation (x, y).
         */

    }, {
        key: 'toObject',
        value: function toObject() {
            return { x: this._x, y: this._y };
        }

        /**
         * Convert this vector into a string representation.
         *
         * @return {string} String representation (x, y).
         */

    }, {
        key: 'toString',
        value: function toString() {
            return '(' + this._x + ', ' + this._y + ')';
        }

        /**
         * Convert this vector into a string representation, using a fixed number
         * of digits for displaying.
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
         * @return {Vector} Cloned instance.
         */

    }, {
        key: 'clone',
        value: function clone() {
            return new Vector(this._x, this._y);
        }

        /**
         * Return true if this vector is equal to another vector. Two vectors are
         * equal when both x and y components are equal.
         *
         * @param {object} that Other instance to compare to.
         * @return {boolean} True if both points are equal, false otherwise.
         */

    }, {
        key: 'equals',
        value: function equals(that) {
            return this.constructor.name === that.constructor.name && this._x === that._x && this._y === that._y;
        }

        /**
         * Return true if the vector is defined and finite.
         *
         * @return {Boolean} True if vector is fully defined and valid.
         */

    }, {
        key: 'isValid',
        value: function isValid() {
            return typeof this._x === 'number' && isFinite(this._x) && typeof this._y === 'number' && isFinite(this._y);
        }
    }, {
        key: 'x',


        /**
         * Get the x component.
         *
         * @return {number} The x component.
         */
        get: function get() {
            return this._x;
        }

        /**
         * Get the y component.
         *
         * @return {number} The y component.
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

            return new Vector(array[0], array[1]);
        }

        /**
         * Create a new vector from an object. The object should have an x and y
         * property.
         *
         * @param {object} object Input object with x and y property.
         * @return {Vector} Resulting vector.
         */

    }, {
        key: 'fromObject',
        value: function fromObject(object) {
            if (process.env.NODE_ENV !== 'production') {
                if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') {
                    throw new Error('Expected an object.');
                }
            }

            return new Vector(object.x, object.y);
        }
    }]);

    return Vector;
}();

Vector.Unit = new Vector(1, 1);
exports.default = Vector;