"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _WeekHeader = _interopRequireDefault(require("./WeekHeader"));

var _Month = _interopRequireDefault(require("./Month"));

var _dateUtils = require("./dateUtils");

var _CalendarToolbar = _interopRequireDefault(require("./CalendarToolbar"));

var _CalendarButtons = _interopRequireDefault(require("./CalendarButtons"));

var _DateDisplay = _interopRequireDefault(require("./DateDisplay"));

var _core = require("@material-ui/core");

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// const Root = styled.div`
//   color: rgba(0, 0, 0, 0.87);
//   user-select: none;
//   overflow: auto;
//   max-width: 479px:
// `
// const CalendarContainer = styled.div`
//   display: flex;
//   justify-items: space-between;
//   flex-direction: column;
//   font-size: 12px;
//   font-weight: 400;
//   padding: 0px 8px;
//   transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
// `
var useStyles = (0, _core.makeStyles)(function (theme) {
  return {
    root: {
      flex: '1',
      display: 'flex',
      maxHeight: '100%',
      overflow: 'hidden'
    },
    selectorContainer: {
      // marginTop: theme.spacing(2)
      // boxShadow: 'inset 0 0 10px #000000'
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    calendarContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      padding: "0 ".concat(theme.spacing(1), "px")
    }
  };
}); // const StyledCalendar = styled.div`
//   display: flex;
//   flex-direction: column;
// `

var Calendar = function Calendar(_ref) {
  var initialDate = _ref.initialDate,
      maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      selectedDates = _ref.selectedDates,
      disabledDates = _ref.disabledDates,
      onSelect = _ref.onSelect,
      onCancel = _ref.onCancel,
      onOk = _ref.onOk,
      readOnly = _ref.readOnly,
      onRemoveAtIndex = _ref.onRemoveAtIndex,
      cancelButtonText = _ref.cancelButtonText,
      submitButtonText = _ref.submitButtonText,
      selectedDatesTitle = _ref.selectedDatesTitle,
      disabledDatesTitle = _ref.disabledDatesTitle;
  var calendar = (0, _react.useRef)(null);
  var classes = useStyles();

  var _useState = (0, _react.useState)(function () {
    return _dateUtils.defaultUtils.getFirstDayOfMonth(initialDate || new Date());
  }),
      _useState2 = _slicedToArray(_useState, 2),
      displayDate = _useState2[0],
      setDisplayDate = _useState2[1];

  var handleMonthChange = (0, _react.useCallback)(function (months) {
    setDisplayDate(function (displayDate) {
      return _dateUtils.defaultUtils.addMonths(displayDate, months);
    });
  }, [setDisplayDate]);
  (0, _react.useEffect)(function () {
    setDisplayDate(_dateUtils.defaultUtils.getFirstDayOfMonth(initialDate || new Date()));
  }, [initialDate]);
  maxDate = maxDate || _dateUtils.defaultUtils.addYears(new Date(), 100);
  minDate = minDate || _dateUtils.defaultUtils.addYears(new Date(), -100);
  var toolbarInteractions = {
    prevMonth: _dateUtils.defaultUtils.monthDiff(displayDate, minDate) > 0,
    nextMonth: _dateUtils.defaultUtils.monthDiff(displayDate, maxDate) < 0
  };
  return _react["default"].createElement("div", {
    className: classes.root
  }, _react["default"].createElement("div", {
    className: classes.selectorContainer
  }, _react["default"].createElement("div", {
    className: classes.calendarContainer
  }, _react["default"].createElement(_CalendarToolbar["default"], {
    displayDate: displayDate,
    onMonthChange: handleMonthChange,
    prevMonth: toolbarInteractions.prevMonth,
    nextMonth: toolbarInteractions.nextMonth
  }), _react["default"].createElement(_WeekHeader["default"], null), _react["default"].createElement(_Month["default"], {
    displayDate: displayDate,
    key: displayDate.toDateString(),
    selectedDates: selectedDates,
    disabledDates: disabledDates,
    minDate: minDate,
    maxDate: maxDate,
    onSelect: onSelect,
    readOnly: readOnly,
    ref: calendar
  }), _react["default"].createElement(_TextField["default"], {
    id: "datetime-local",
    label: "Rendi algus",
    type: "datetime-local",
    defaultValue: "2017-05-24T10:30",
    InputLabelProps: {
      shrink: true
    }
  }), _react["default"].createElement(_TextField["default"], {
    id: "datetime-local",
    label: "Rendi l\xF5pp",
    type: "datetime-local",
    defaultValue: "2017-05-24T10:30",
    InputLabelProps: {
      shrink: true
    }
  })), _react["default"].createElement(_CalendarButtons["default"], {
    readOnly: readOnly,
    onCancel: onCancel,
    onOk: onOk,
    cancelButtonText: cancelButtonText,
    submitButtonText: submitButtonText
  })), _react["default"].createElement(_DateDisplay["default"], {
    selectedDatesTitle: selectedDatesTitle,
    disabledDatesTitle: disabledDatesTitle,
    selectedDates: selectedDates,
    readOnly: readOnly,
    disabledDates: disabledDates || [],
    onRemoveAtIndex: onRemoveAtIndex
  }));
};

var _default = Calendar;
exports["default"] = _default;