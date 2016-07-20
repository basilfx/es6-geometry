'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

var _Vector = require('./Vector');

var _Vector2 = _interopRequireDefault(_Vector);

var _Circle = require('./Circle');

var _Circle2 = _interopRequireDefault(_Circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Immutable rectangle class.
 */

var Rectangle = function () {
    /**
     * Construct a new immutable rectangle of two points.
     *
     * @param {Point} a The `A` point..
     * @param {Point} b The `B` point.
     * @return {void}
     */

    function Rectangle(a, b) {
        _classCallCheck(this, Rectangle);

        this._a = a;
        this._b = b;
    }

    /**
     * Create a new rectangle from an array. The first index should be point
     * `A` and the second index should be point `B`.
     *
     * @param {Array} array Input array with at least two values.
     * @return {Rectangle} Resulting rectangle.
     */


    _createClass(Rectangle, [{
        key: 'center',


        /**
         * Calculate the center point of this rectangle.
         *
         * @return {Point} Center of this rectangle.
         */
        value: function center() {
            var x = (this._a._x + this._b._x) / 2;
            var y = (this._a._y + this._b._y) / 2;

            return new _Point2.default(x, y);
        }

        /**
         * Calculate the center point offset.
         *
         * @return {Vector} Relative center point offset of this rectangle.
         */

    }, {
        key: 'centerOffset',
        value: function centerOffset() {
            return this.center().subtract(this._a);
        }

        /**
         * Merge two rectangles, taking the bouding box that contains both
         * rectangles.
         *
         * @param {Rectangle} rectangle Other rectangle to merge with.
         * @return {Rectangle} New rectangle containing both rectangles.
         */

    }, {
        key: 'merge',
        value: function merge(rectangle) {
            if (process.env.NODE_ENV !== 'production') {
                if (!(rectangle instanceof Rectangle)) {
                    throw new Error('Must merge with another rectangle.');
                }
            }

            var a = new _Point2.default(Math.min(this._a._x, this._b._x, rectangle._a._x, rectangle._b._x), Math.min(this._a._y, this._b._y, rectangle._a._y, rectangle._b._y));
            var b = new _Point2.default(Math.max(this._a._x, this._b._x, rectangle._a._x, rectangle._b._x), Math.max(this._a._y, this._b._y, rectangle._a._y, rectangle._b._y));

            return new Rectangle(a, b);
        }

        /**
         * Move the rectangle by applying an offset to the points `a` and `b`.
         *
         * @param {Vector} vector Offset vector.
         * @return {Rectangle} Moved rectangle.
         */

    }, {
        key: 'move',
        value: function move(vector) {
            if (process.env.NODE_ENV !== 'production') {
                if (!(vector instanceof _Vector2.default)) {
                    throw new Error('Offset must be a vector.');
                }
            }

            return new Rectangle(this._a.add(vector), this._b.add(vector));
        }

        /**
         * Move the `a` point and `b` point of this rectangle individually.
         *
         * @param {Vector} vectorA Offset vector for `a` point.
         * @param {Vector} vectorB Offset vector for `b` point.
         * @return {Rectangle} Moved rectangle.
         */

    }, {
        key: 'moveAB',
        value: function moveAB(vectorA, vectorB) {
            if (process.env.NODE_ENV !== 'production') {
                if (!(vectorA instanceof _Vector2.default) || !(vectorB instanceof _Vector2.default)) {
                    throw new Error('Offset must be a vector.');
                }
            }

            return new Rectangle(this._a.add(vectorA), this._b.add(vectorB));
        }

        /**
         * Similar to move, but moves `a` and `b` in opposite directions by
         * inverting the vector for `a`.
         *
         * This method may shrink the rectangle if the vector is negative, or if
         * points `a` and `b` have been swapped. Normalize the
         *
         * @param {Vector} vector The offset vector to expand with.
         * @return {Rectangle} Expanded rectangle.
         */

    }, {
        key: 'expand',
        value: function expand(vector) {
            return this.moveAB(vector.invert(), vector);
        }

        /**
         * Returns true if a given point is on this rectangle.
         *
         * @param {Point} point Point to test with.
         * @return {boolean} True if point is within rectangle.
         */

    }, {
        key: 'containsPoint',
        value: function containsPoint(point) {
            if (process.env.NODE_ENV !== 'production') {
                if (!(point instanceof _Point2.default)) {
                    throw new Error('Must be a point.');
                }
            }

            return (point._x >= this._a._x && point._x <= this._b._x || point._x >= this._b._x && point._x <= this._a._x) && (point._y >= this._a._y && point._y <= this._b._y || point._y >= this._b._y && point._y <= this._a._y);
        }

        /**
         * Returns true if a given rectangle is within this rectangle. That is,
         * both point `A` and `B` are within this rectangle.
         *
         * @param {Rectangle} rectangle The rectangle to check for.
         * @return {booleam} True if the rectangle is within this rectangle.
         */

    }, {
        key: 'containsRectangle',
        value: function containsRectangle(rectangle) {
            if (process.env.NODE_ENV !== 'production') {
                if (!(rectangle instanceof Rectangle)) {
                    throw new Error('Must be a rectangle.');
                }
            }

            return this.containsPoint(rectangle.a) && this.containsPoint(rectangle.b);
        }

        /**
         * Returns true if a given rectangle collides with this rectangle.
         *
         * @param {Rectangle} rectangle Other rectangle to compare with.
         * @return {boolean} True if the given rectangle collides with this one.
         */

    }, {
        key: 'collidesRectangle',
        value: function collidesRectangle(rectangle) {
            if (process.env.NODE_ENV !== 'production') {
                if (!(rectangle instanceof Rectangle)) {
                    throw new Error('Must be a rectangle.');
                }
            }

            return this._a._x < rectangle._b._x && this._b._x > rectangle._a._x && this._a._y < rectangle._b._y && this._b._y > rectangle._a._y;
        }

        /**
         * Returns true if a given circle collides with this rectangle.
         *
         * @param {Circle} circle Other circle to compare with.
         * @return {boolean} True if the given circles collides with this one.
         */

    }, {
        key: 'collidesCircle',
        value: function collidesCircle(circle) {
            if (process.env.NODE_ENV !== 'production') {
                if (!(circle instanceof _Circle2.default)) {
                    throw new Error('Must be a circle.');
                }
            }

            var clamp = function clamp(value, min, max) {
                return Math.max(min, Math.min(max, value));
            };

            var closest = new _Point2.default(clamp(circle._a._x, this._a._x, this._b._x), clamp(circle._a._y, this._a._y, this._b._y));

            return closest.distanceSq(circle._a) < circle._r * circle._r;
        }

        /**
         * Calculate the area of the given rectangle.
         *
         * @return {number} The rectangle area.
         */

    }, {
        key: 'area',
        value: function area() {
            return (this._b._x - this._a._x) * (this._b._y - this._a._y);
        }

        /**
         * Return an array representation of this instance.
         *
         * @return {Array} Array representation ([a, b]).
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            return [this._a.toArray(), this._b.toArray()];
        }

        /**
         * Return an object representation of this instance.
         *
         * @return {object} Object representation (a, b).
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
         * Return a string representation of this rectangle.
         *
         * @return {string} String representation.
         */

    }, {
        key: 'toString',
        value: function toString() {
            return '(' + this._a.toString() + ', ' + this._b.toString() + ')';
        }

        /**
         * Create a shallow copy of this instance.
         *
         * @return {Rectangle} Cloned instance.
         */

    }, {
        key: 'clone',
        value: function clone() {
            return new Rectangle(this._a, this._b);
        }

        /**
         * Return a normalize rectangle, with the `A` point in the top-left
         * position and the `B` point in the bottom-right position.
         *
         * @return {Rectangle} The normalized rectangle.
         */

    }, {
        key: 'normalize',
        value: function normalize() {
            return new Rectangle(new _Point2.default(this.left, this.top), new _Point2.default(this.right, this.bottom));
        }

        /**
         * Return true if this rectangle is equal to another rectangle. Two
         * rectangles are equal if and only if both points are equal. This means
         * if two rectangles have the same left, right, top and bottom, they
         * may not be equal, becaus they can be defined from different points.
         *
         * @param {object} that Other instance to compare to.
         * @return {boolean} True if both rectangles are equal, false otherwise.
         */

    }, {
        key: 'equals',
        value: function equals(that) {
            return this.constructor.name === that.constructor.name && this._a.equals(that._b) && this._b.equals(that._b);
        }

        /**
         * Return true if the rectangle is defined and finite.
         *
         * @return {Boolean} True if rectangle is valid.
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
         * Return the left x coordinate.
         *
         * @return {number} Left x coordinate.
         */

    }, {
        key: 'left',
        get: function get() {
            //return Math.min(this._a._x, this._b._x);
            return this._a._x;
        }

        /**
         * Return the right x coordinate.
         *
         * @return {number} Right x coordinate.
         */

    }, {
        key: 'right',
        get: function get() {
            //return Math.max(this._a._x, this._b._x);
            return this._b._x;
        }

        /**
         * Return the top y coordinate.
         *
         * @return {number} Top y coordinate.
         */

    }, {
        key: 'top',
        get: function get() {
            //return Math.min(this._a._y, this._b._y);
            return this._a._y;
        }

        /**
         * Return the bottom y coordinate.
         *
         * @return {number} Bottom y coordinate.
         */

    }, {
        key: 'bottom',
        get: function get() {
            //return Math.max(this._a._y, this._b._y);
            return this._b._y;
        }

        /**
         * Return the width of this rectangle, which is the difference between
         * `this.right` and `this.left`.
         *
         * @return {number} Width of the rectangle.
         */

    }, {
        key: 'width',
        get: function get() {
            return this.right - this.left;
        }

        /**
         * Return the height of this rectangle, which is the difference between
         * `this.bottom` and `this.top`.
         *
         * @return {number} Height of the rectangle.
         */

    }, {
        key: 'height',
        get: function get() {
            return this.bottom - this.top;
        }
    }], [{
        key: 'fromArray',
        value: function fromArray(array) {
            if (process.env.NODE_ENV !== 'production') {
                if (!Array.isArray(array) || array.length < 2) {
                    throw new Error('Expected an array with at least two values.');
                }
            }

            return new Rectangle(_Point2.default.fromArray(array[0]), _Point2.default.fromArray(array[1]));
        }

        /**
         * Create a new rectangle from an object. The object should have an `a` and
         * `b` property.
         *
         * @param {object} object Input object with `a` and `b` property.
         * @return {Rectangle} Resulting rectangle.
         */

    }, {
        key: 'fromObject',
        value: function fromObject(object) {
            if (process.env.NODE_ENV !== 'production') {
                if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') {
                    throw new Error('Expected an object.');
                }
            }

            return new Rectangle(_Point2.default.fromObject(object.a), _Point2.default.fromObject(object.b));
        }

        /**
         * Create a new rectangle from a (client) bounding rect from an element.
         * However, it accepts any object with a `left`, `top, `width` and `height`
         * property.
         *
         * @param {object} boundingRect Input bounding rectangle.
         * @return {Rectangle}
         */

    }, {
        key: 'fromBoundingRect',
        value: function fromBoundingRect(boundingRect) {
            return new Rectangle(new _Point2.default(boundingRect.left, boundingRect.top), new _Point2.default(boundingRect.left + boundingRect.width, boundingRect.top + boundingRect.height));
        }
    }]);

    return Rectangle;
}();

exports.default = Rectangle;