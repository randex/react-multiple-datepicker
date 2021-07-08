"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useCircleStyles = (0, _core.makeStyles)(function (theme) {
  return {
    root: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'rgba(0, 0, 0, 0)' // marginLeft: theme.spacing(1.5)

    },
    rootText: {
      color: theme.palette.text.primary
    },
    rootTextDisabled: {
      color: theme.palette.text.disabled
    },
    todayRoot: {
      background: '#ecdfdf'
    },
    checkedRoot: {
      background: theme.palette.primary.main
    },
    checkedRootDisabled: {
      background: theme.palette.action.disabled
    },
    checkedText: {
      color: theme.palette.type === 'dark' ? theme.palette.getContrastText(theme.palette.primary.main) : theme.palette.common.white
    },
    text: {
      textAlign: 'center'
    }
  };
});

var Circle = function Circle(_ref) {
  var _classNames;

  var label = _ref.label,
      disabled = _ref.disabled,
      checked = _ref.checked,
      onCheck = _ref.onCheck,
      className = _ref.className,
      isToday = _ref.isToday;
  var classes = useCircleStyles();
  var handleClick = (0, _react.useCallback)(function () {
    if (!disabled) {
      onCheck(!checked);
    }
  }, [onCheck, disabled, checked]);
  return _react["default"].createElement(_core.ButtonBase, {
    className: (0, _classnames["default"])(classes.root, (_classNames = {}, _defineProperty(_classNames, classes.rootText, !checked && !disabled), _defineProperty(_classNames, classes.rootTextDisabled, disabled), _defineProperty(_classNames, classes.todayRoot, isToday), _defineProperty(_classNames, classes.checkedRoot, checked && !disabled), _defineProperty(_classNames, classes.checkedRootDisabled, checked && disabled), _classNames), className),
    disabled: disabled,
    onClick: handleClick
  }, _react["default"].createElement(_core.Typography, {
    color: "inherit",
    variant: "body1",
    className: (0, _classnames["default"])(classes.text, _defineProperty({}, classes.checkedText, checked))
  }, label));
};

Circle.propTypes = {
  classes: _propTypes["default"].object,
  label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  disabled: _propTypes["default"].bool,
  checked: _propTypes["default"].bool.isRequired,
  onCheck: _propTypes["default"].func.isRequired,
  className: _propTypes["default"].string
};
var _default = Circle;
exports["default"] = _default;