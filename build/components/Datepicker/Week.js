"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = _interopRequireDefault(require("./utils"));

var _dateUtils = require("./dateUtils");

var _styles = require("@material-ui/styles");

var _Circle = _interopRequireDefault(require("./Circle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = function styles(theme) {
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 34,
      marginBottom: theme.spacing(2)
    },
    day: _defineProperty({
      margin: "0 ".concat(theme.spacing(1), "px")
    }, theme.breakpoints.down('xs'), {
      margin: "0 2px"
    }),
    blank: _defineProperty({
      width: 36,
      height: 36,
      margin: "0 ".concat(theme.spacing(1), "px")
    }, theme.breakpoints.down('xs'), {
      margin: "0 2px"
    })
  };
};

var Week =
/*#__PURE__*/
function (_Component) {
  _inherits(Week, _Component);

  function Week() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Week);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Week)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (day) {
      if (!_this.isDisabled(day)) _this.props.onSelect(day);
    });

    _defineProperty(_assertThisInitialized(_this), "isDisabled", function (day) {
      var disabledDate = _this.props.disabledDates && _this.props.disabledDates.find(function (d) {
        return _utils["default"].isSameDay(d, day);
      });

      if (disabledDate != null) return true;
      var minDate = _this.props.minDate;
      var maxDate = _this.props.maxDate;
      return minDate && _utils["default"].isBefore(day, minDate) || maxDate && _utils["default"].isAfter(day, maxDate);
    });

    _defineProperty(_assertThisInitialized(_this), "isSelected", function (day) {
      return _this.props.selectedDates && _utils["default"].dateIn(_this.props.selectedDates, day);
    });

    return _this;
  }

  _createClass(Week, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var classes = this.props.classes;
      var dateInNumberic = new _dateUtils.dateTimeFormat('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      });
      var dateToday = dateInNumberic.format(new Date());
      var dayInNumeric = new _dateUtils.dateTimeFormat('en-US', {
        day: 'numeric'
      });
      return _react["default"].createElement("div", {
        className: classes.root
      }, this.props.week.map(function (day, i) {
        if (day) {
          var isToday = day && dateToday === dateInNumberic.format(day);

          var isDisabled = _this2.isDisabled(day);

          var isSelected = _this2.isSelected(day);

          return _react["default"].createElement(_Circle["default"], {
            key: "day-".concat(day),
            label: dayInNumeric.format(day),
            disabled: isDisabled,
            checked: isSelected,
            onCheck: function onCheck(e) {
              _this2.onSelect(day);
            },
            isToday: isToday,
            className: classes.day
          }); // return (
          //   <DayButton
          //     key={`day-${day}`}
          //     onClick={e => {
          //       e.preventDefault()
          //       this.onSelect(day)
          //     }}
          //     disabled={isDisabled}
          //     selected={isSelected}
          //   >
          //     <DayBackdrop selected={isSelected} />
          //     <Day selected={isSelected} disabled={isDisabled} today={isToday}>
          //       {dayInNumeric.format(day)}
          //     </Day>
          //   </DayButton>
          // )
        }

        return _react["default"].createElement("div", {
          className: classes.blank,
          key: "blank-".concat(i)
        });
      }));
    }
  }]);

  return Week;
}(_react.Component);

var _default = (0, _styles.withStyles)(styles)(Week);

exports["default"] = _default;