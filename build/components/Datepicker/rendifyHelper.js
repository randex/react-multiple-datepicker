"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortDate = sortDate;
exports.getListForStartAndEndTs = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getListForStartAndEndTs = function getListForStartAndEndTs(startTs, endTs) {
  debugger;
  var start = (0, _moment["default"])(startTs);
  var end = (0, _moment["default"])(endTs);
  var diffHour = end.diff(start, 'hours');
  var listOfTimes = [start]; // starting from 1 as we already have first element

  for (var i = 1; i <= diffHour; i++) {
    var previousHour = (0, _moment["default"])(listOfTimes[i - 1]).add(1, 'hours');
    listOfTimes.push(previousHour);
  }

  return listOfTimes;
};

exports.getListForStartAndEndTs = getListForStartAndEndTs;

function sortDate(dates) {
  return dates.sort(function (a, b) {
    return (0, _moment["default"])(a).diff((0, _moment["default"])(b));
  });
}