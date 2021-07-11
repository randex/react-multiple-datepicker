"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = _interopRequireDefault(require("./utils"));

var _Calendar = _interopRequireDefault(require("./Calendar"));

var _core = require("@material-ui/core");

var _styles = require("@material-ui/styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    dialogPaper: _defineProperty({
      minHeight: 520,
      maxHeight: 520,
      display: 'flex'
    }, theme.breakpoints.down('xs'), {
      margin: "".concat(theme.spacing(1), "px")
    })
  };
});

function initState(selectedDates) {
  return {
    selectedDates: selectedDates ? _toConsumableArray(selectedDates) : [],
    minDate: null,
    maxDate: null
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'setSelectedDates':
      return _objectSpread({}, state, {
        selectedDates: action.payload
      });

    default:
      return new Error('wrong action type in multiple date picker reducer');
  }
}

var DatePicker = function DatePicker(_ref) {
  var open = _ref.open,
      readOnly = _ref.readOnly,
      onCancel = _ref.onCancel,
      onSubmit = _ref.onSubmit,
      outerSelectedDates = _ref.selectedDates,
      disabledDates = _ref.disabledDates,
      cancelButtonText = _ref.cancelButtonText,
      _ref$submitButtonText = _ref.submitButtonText,
      submitButtonText = _ref$submitButtonText === void 0 ? 'Submit' : _ref$submitButtonText,
      _ref$selectedDatesTit = _ref.selectedDatesTitle,
      selectedDatesTitle = _ref$selectedDatesTit === void 0 ? 'Selected Dates' : _ref$selectedDatesTit,
      disabledDatesTitle = _ref.disabledDatesTitle,
      disableClock = _ref.disableClock,
      times = _ref.times,
      halfDisabledDates = _ref.halfDisabledDates;

  // Tekitame aegadest topelt halduse - Komponenti antakse kasutaja puhke kellaajad
  // Kui aga valitud päev on halfDisabledDate - siis näitame algus kella hoopis selle järgi
  var _useState = (0, _react.useState)(times || []),
      _useState2 = _slicedToArray(_useState, 2),
      timesInternal = _useState2[0],
      setTimesInternal = _useState2[1];

  if (cancelButtonText == null) {
    cancelButtonText = readOnly ? 'Dismiss' : 'Cancel';
  }

  var _useReducer = (0, _react.useReducer)(reducer, outerSelectedDates, initState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      _useReducer2$ = _useReducer2[0],
      selectedDates = _useReducer2$.selectedDates,
      minDate = _useReducer2$.minDate,
      maxDate = _useReducer2$.maxDate,
      dispatch = _useReducer2[1];

  var classes = useStyles();
  var onSelect = (0, _react.useCallback)(function (day) {
    if (readOnly) {
      return;
    } // RENDIFY LOGIC BEGIN
    // On toote kella ajad ning on ka renditud päevad


    if (times && halfDisabledDates) {
      var isHalfDisabledDate = halfDisabledDates.find(function (e) {
        return _utils["default"].isSameDay(day, e);
      });

      if (isHalfDisabledDate) {
        alert('see päev on renditud');
        var later = new Date().getTime() + 86400000;
        var earlier = new Date().getTime() + 82400000;
        var tomorrowLater = new Date(later);
        var tomorrowEarly = new Date(earlier);
        setTimesInternal([tomorrowEarly, tomorrowLater]);
      } else {
        setTimesInternal(times || []);
      } // RENDIFY END

    }

    if (_utils["default"].dateIn(selectedDates, day)) {
      dispatch({
        type: 'setSelectedDates',
        payload: selectedDates.filter(function (date) {
          return !_utils["default"].isSameDay(date, day);
        })
      });
    } else {
      dispatch({
        type: 'setSelectedDates',
        payload: [].concat(_toConsumableArray(selectedDates), [day])
      });
    }
  }, [selectedDates, dispatch, readOnly, halfDisabledDates, times]);
  var onRemoveAtIndex = (0, _react.useCallback)(function (index) {
    if (readOnly) {
      return;
    }

    var newDates = _toConsumableArray(selectedDates);

    if (index > -1) {
      newDates.splice(index, 1);
    }

    dispatch({
      type: 'setSelectedDates',
      payload: newDates
    });
  }, [selectedDates, dispatch, readOnly]);
  var dismiss = (0, _react.useCallback)(function () {
    dispatch({
      type: 'setSelectedDates',
      payload: []
    });
    onCancel();
  }, [dispatch, onCancel]);
  var handleCancel = (0, _react.useCallback)(function (e) {
    e.preventDefault();
    dismiss();
  }, [dismiss]);
  var handleOk = (0, _react.useCallback)(function (e) {
    e.preventDefault();

    if (readOnly) {
      return;
    }

    onSubmit(selectedDates);
  }, [onSubmit, selectedDates, readOnly]);
  (0, _react.useEffect)(function () {
    if (open) {
      dispatch({
        type: 'setSelectedDates',
        payload: outerSelectedDates != null ? outerSelectedDates : []
      });
    }
  }, [open, outerSelectedDates]);
  return _react["default"].createElement(_core.Dialog, {
    open: open,
    classes: {
      paper: classes.dialogPaper
    }
  }, _react["default"].createElement(_Calendar["default"], {
    selectedDates: selectedDates,
    disabledDates: disabledDates,
    disabledDatesTitle: disabledDatesTitle,
    onSelect: onSelect,
    onRemoveAtIndex: onRemoveAtIndex,
    minDate: minDate,
    maxDate: maxDate,
    onCancel: handleCancel,
    onOk: handleOk,
    readOnly: readOnly,
    disableClock: disableClock,
    cancelButtonText: cancelButtonText,
    submitButtonText: submitButtonText,
    selectedDatesTitle: selectedDatesTitle,
    times: timesInternal
  }));
};

DatePicker.propTypes = {
  open: _propTypes["default"].bool.isRequired,
  readOnly: _propTypes["default"].bool,
  onCancel: _propTypes["default"].func.isRequired,
  onSubmit: _propTypes["default"].func.isRequired,
  selectedDates: _propTypes["default"].array,
  cancelButtonText: _propTypes["default"].string,
  submitButtonText: _propTypes["default"].string,
  selectedDatesTitle: _propTypes["default"].string,
  disabledDatesTitle: _propTypes["default"].string,
  disableClock: _propTypes["default"].string,
  halfDisabledDates: _propTypes["default"].array,
  times: _propTypes["default"].array
};
var _default = DatePicker;
exports["default"] = _default;