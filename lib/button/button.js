"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

// ButtonProps组件的属性
var Button = function Button(props) {
  var children = props.children;
  return /*#__PURE__*/_react.default.createElement("button", {
    type: "button"
  }, children);
};

var _default = Button;
exports.default = _default;