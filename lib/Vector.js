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
 * Immutable vector class.
 *
 * A vector represents a displacement, using a x an `y` component to represent
 * the length (magnitude) and direction.
 *
 * The difference between a Vector and a Point is explained in this source:
 * http://math.stackexchange.com/a/645827 and
 * http://geomalgorithms.com/points_and_vectors.html.
 */


/**
 * Definition of an array representing a vector.
 */


/**
 * Definition of an object representing a vector.
 */
var Vector = function () {

    /**
     * Construct a new vector, using a x and `y` component to represent the
     * length (magnitude) and direction relative to (0, 0).
     *
     * An vector is immutable. All subsequent operations will return a new
     * vector instance.
     *
     * @param {number} x The `x` component.
     * @param {number} y The `y` component.
     * @return {void}
     */


    /**
     * The y coordinate.
     *
     * @type {number}
     */
    function Vector(x, y) {
        _classCallCheck(this, Vector);

        this._x = x;
        this._y = y;
    }

    /**
     * Create a new vector from an array. The first index is considered the x
     * component, the second index is considered the `y` component.
     *
     * @param {VectorArray} array Input array with at least two values.
     * @return {Vector} Resulting vector.
     */


    /**
     * Definition of the unit vector.
     */

    /**
     * The x coordinate.
     *
     * @type {number}
     */


    _createClass(Vector, [{
        key: 'add',


        /**
         * Add another vector to this vector.
         *
         * @param {Vector} vector Vector to add.
         * @return {Vector} A new Vector if adding vector.
         */
        value: function add(vector) {
            if (process.env.NODE_ENV !== 'production') {
                // $FlowFixMe
                if (vector instanceof _Point2.default) {
                    throw new Error('Addition of point to a vector is undefined.');
                }
            }

            return new Vector(this._x + vector._x, this._y + vector._y);
        }

        /**
         * Subtract another vector from this vector.
         *
         * @param {Vector} that Vector to subtract.
         * @return {Vector} New vector with other vector subtracted from this.
         */

    }, {
        key: 'subtract',
        value: function subtract(that) {
            return new Vector(this._x - that._x, this._y - that._y);
        }

        /**
         * Invert a vector, returning a copy with inverted magnitude and direction.
         *
         * @return {Vector} Inverted vector
         */

    }, {
        key: 'invert',
        value: function invert() {
            return new Vector(-this._x, -this._y);
        }

        /**
         * Scale a vector by a scalar value.
         *
         * @param {number} scalar The scalar value.
         * @return {Vector} New vector multiplied by the scalar.
         */

    }, {
        key: 'multiply',
        value: function multiply(scalar) {
            return new Vector(this._x * scalar, this._y * scalar);
        }

        /**
         * Scale a vector by a `x` and `y` scalar value.
         *
         * @param {number} scalarX The scalar value for the `x` component.
         * @param {number} scalarY The scalar value for the `y` component.
         * @return {Vector} New vector multiplied by both scalars.
         */

    }, {
        key: 'multiplyXY',
        value: function multiplyXY(scalarX, scalarY) {
            return new Vector(this._x * scalarX, this._y * scalarY);
        }

        /**
         * Divide a vector by a scalar value.
         *
         * @param {number} scalar The scalar value.
         * @return {Vector} New vector divided by the scalar.
         */

    }, {
        key: 'divide',
        value: function divide(scalar) {
            return new Vector(this._x / scalar, this._y / scalar);
        }

        /**
         * Divide a vector by a `x` and `y` scalar value.
         *
         * @param {number} scalarX The scalar value for the `x` component.
         * @param {number} scalarY The scalar value for the `y` component.
         * @return {Vector} New vector divided by both scalars.
         */

    }, {
        key: 'divideXY',
        value: function divideXY(scalarX, scalarY) {
            return new Vector(this._x / scalarX, this._y / scalarY);
        }

        /**
         * Mix this vector with another vector, with a given weight.
         *
         * @param {Vector} that The other vector to mix with.
         * @param {number} amount The weight (between 0 and 1).
         * @return {Vector} A new vector with a mix of both this vector and the
         *                  given vector.
         */

    }, {
        key: 'mix',
        value: function mix(that) {
            var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;

            if (process.env.NODE_ENV !== 'production') {
                if (amount < 0 || amount > 1) {
                    throw new Error('Amount must be between 0 and 1.');
                }
            }

            return this.multiply(1 - amount).add(that.multiply(amount));
        }

        /**
         * Calculate the vector that is perpendicular to this vector.
         *
         * @return {Vector} The perpendicular vector.
         */

    }, {
        key: 'perpendicular',
        value: function perpendicular() {
            return new Vector(-this._y, this._x);
        }

        /**
         * Snap a vector to a fixed number.
         *
         * @param {number} to The number to fix to.
         * @return {Point} New vector snapped to the given number.
         */

    }, {
        key: 'snap',
        value: function snap(to) {
            var round = function round(val) {
                return Math.round(val / to) * to;
            };

            return new Vector(round(this._x), round(this._y));
        }

        /**
         * Calculate the dot value.
         *
         * @param {Vector} that The other vector.
         * @return {number} The dot value of both vectors.
         */

    }, {
        key: 'dot',
        value: function dot(that) {
            return this._x * that._x + this._y * that._y;
        }

        /**
         * Return the angle of this vector.
         *
         * @return {number} Angle of the vector.
         */

    }, {
        key: 'angle',
        value: function angle() {
            return Math.atan2(this._y, this._x);
        }

        /**
         * Return the angle (in degrees) of this vector.
         *
         * @return {number} Angle of the vector (in degrees).
         */

    }, {
        key: 'angleDeg',
        value: function angleDeg() {
            return Math.atan2(this._y, this._x) * 180 / Math.PI;
        }

        /**
         * Calculate the slope of this vector.
         *
         * @return {number} The slope of the vector.
         */

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
         * Calculate the length (magnitude) of the vector.
         *
         * @return {number} The length of the vector.
         */

    }, {
        key: 'length',
        value: function length() {
            return Math.sqrt(this.lengthSq());
        }

        /**
         * Return a vector with a minimum length of the given number. If the length
         * is less, normalize it. Otherwise this instance is returned.
         *
         * @param {number} length The minimum length.
         * @return {Vector} The normalized vector.
         */

    }, {
        key: 'minLength',
        value: function minLength(length) {
            return this.length() < length ? this.normalize(length) : this;
        }

        /**
         * Return a vector with a maximum length of the given number. If the length
         * is less, normalize it. Otherwise this instance is returned.
         *
         * @param {number} length The maximum length.
         * @return {Vector} The normalized vector.
         */

    }, {
        key: 'maxLength',
        value: function maxLength(length) {
            return this.length() > length ? this.normalize(length) : this;
        }

        /**
         * Normalize the vector to a given scalar.
         *
         * @param {number} scalar The number to scale this vector to.
         * @return {Vector} The normalized vector
         */

    }, {
        key: 'normalize',
        value: function normalize() {
            var scalar = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            return this.divide(this.length()).multiply(scalar);
        }

        /**
         * Project this vector onto another vector.
         *
         * @param {Vector} that The other vector to project onto.
         * @return {Vector} The projected vector.
         */

    }, {
        key: 'projectOnto',
        value: function projectOnto(that) {
            return that.multiply(this.dot(that) / that.lengthSq());
        }

        /**
         * Convert vector into a point.
         *
         * Note: this is an utility method. A mathematical definition of a
         * conversion does not exist.
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
         * @return {VectorArray} Array representation (x, y).
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            return [this._x, this._y];
        }

        /**
         * Convert this vector into an object.
         *
         * @return {Object} Object representation (x, y).
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
         * equal when both x and `y` components are equal.
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
         * Return true if the vector is defined and finite.
         *
         * @return {boolean} True if vector is fully defined and valid.
         */

    }, {
        key: 'isValid',
        value: function isValid() {
            return typeof this._x === 'number' && isFinite(this._x) && typeof this._y === 'number' && isFinite(this._y);
        }
    }, {
        key: 'x',


        /**
         * Get the `x` component.
         *
         * @return {number} The `x` component.
         */
        get: function get() {
            return this._x;
        }

        /**
         * Get the `y` component.
         *
         * @return {number} The `y` component.
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
         * @param {VectorObject} object Input object with x and y property.
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

        /**
         * Create a new vector form a single value. In that case, both the x and y
         * property will have the same value.
         *
         * @param {number} number Input number for x and y property.
         * @return {Vector} Resulting vector.
         */

    }, {
        key: 'fromNumber',
        value: function fromNumber(number) {
            return new Vector(number, number);
        }
    }]);

    return Vector;
}();

Vector.Unit = new Vector(1, 1);
exports.default = Vector;