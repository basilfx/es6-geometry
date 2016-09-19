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

var Line = function () {
  /**
   * Construct a new immutable line out of two points.
   *
   * @param {Point} a The `A` point..
   * @param {Point} b The `B` point.
   * @return {void}
   */

  function Line(a, b) {
    _classCallCheck(this, Line);

    this._a = a;
    this._b = b;
  }

  /**
   * Return point `A`.
   *
   * @return {Point} Point `A`.
   */


  _createClass(Line, [{
    key: 'clone',


    /**
     * Create a shallow copy of this instance.
     *
     * @return {Line} Cloned instance.
     */
    value: function clone() {
      return new Line(this._a, this._b);
    }

    /**
     * Return true if the line is defined and finite.
     *
     * @return {Boolean} True if line is valid.
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
      return Infinity;
    }
  }]);

  return Line;
}();

exports.default = Line;