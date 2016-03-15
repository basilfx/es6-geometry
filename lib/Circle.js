'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var Circle = function () {
    /**
     * Construct a new circle using center point `A` and radius `r`.
     *
     * @param {Point} a Center point `A`.
     * @param {number} r The radius `r`.
     * @return {void}
     */

    function Circle(a, r) {
        _classCallCheck(this, Circle);

        this._a = a;
        this._r = r;
    }

    /**
     * Get the circle center point.
     *
     * @return {Point} Center point.
     */


    _createClass(Circle, [{
        key: 'toRectangle',


        /**
         * Convert this circle to a rectangle that contains this circle exactly.
         *
         * @return {Rectangle} Converted rectangle.
         */
        value: function toRectangle() {
            var a = new _Point2.default(this._a._x - this.radius, this._a._y - this.radius);
            var b = new _Point2.default(this._a._x + this.radius, this._a._y + this.radius);

            return new _Rectangle2.default(a, b);
        }

        /**
         * Convert this circle into an object.
         *
         * @return {object} Object representation (x, y, r).
         */

    }, {
        key: 'toObject',
        value: function toObject() {
            return {
                x: this._a._x,
                y: this._a._y,
                r: this._r
            };
        }

        /**
         * Convert this circle into an array.
         *
         * @return {Array} Array representation (x, y, r).
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            return [this._a._x, this._a._y, this._r];
        }

        /**
         * Convert this circle into a string representation.
         *
         * @return {string} String representation (x, y, r).
         */

    }, {
        key: 'toString',
        value: function toString() {
            return '(' + this._a._x + ', ' + this._a._y + ', ' + this._r + ')';
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
         * @param {object} that Other instance to compare to.
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
         * @return {Boolean} True if the circle is fully defined, finite and valid.
         */

    }, {
        key: 'isValid',
        value: function isValid() {
            return this._a.isValid() && typeof this._r === 'number' && isFinite(this._r) && this._r >= 0;
        }
    }, {
        key: 'a',
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
    }]);

    return Circle;
}();

exports.default = Circle;