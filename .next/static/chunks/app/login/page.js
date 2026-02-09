(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["app/login/page"],{

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2Fhome%2Fubuntu%2Fmake_estimate%2Fnextjs_space%2Fapp%2Flogin%2Fpage.tsx%22%2C%22ids%22%3A%5B%5D%7D&server=false!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2Fhome%2Fubuntu%2Fmake_estimate%2Fnextjs_space%2Fapp%2Flogin%2Fpage.tsx%22%2C%22ids%22%3A%5B%5D%7D&server=false! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(__webpack_require__, /*! ./app/login/page.tsx */ "(app-pages-browser)/./app/login/page.tsx"));


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/Icon.js":
/*!******************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/Icon.js ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Icon; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultAttributes.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/defaultAttributes.js");
/* harmony import */ var _shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/src/utils.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/shared/src/utils.js");
/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 


const Icon = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(_c = ({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>{
    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
        ref,
        ..._defaultAttributes_js__WEBPACK_IMPORTED_MODULE_1__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.mergeClasses)("lucide", className),
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]);
});
_c1 = Icon;
 //# sourceMappingURL=Icon.js.map
var _c, _c1;
$RefreshReg$(_c, "Icon$forwardRef");
$RefreshReg$(_c1, "Icon");


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/createLucideIcon.js":
/*!******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/createLucideIcon.js ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createLucideIcon; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/src/utils.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/shared/src/utils.js");
/* harmony import */ var _Icon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Icon.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/Icon.js");
/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 


const createLucideIcon = (iconName, iconNode)=>{
    const Component = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(({ className, ...props }, ref)=>/*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Icon_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
            ref,
            iconNode,
            className: (0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.mergeClasses)(`lucide-${(0,_shared_src_utils_js__WEBPACK_IMPORTED_MODULE_2__.toKebabCase)(iconName)}`, className),
            ...props
        }));
    Component.displayName = `${iconName}`;
    return Component;
};
 //# sourceMappingURL=createLucideIcon.js.map


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/defaultAttributes.js":
/*!*******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/defaultAttributes.js ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ defaultAttributes; }
/* harmony export */ });
/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
 //# sourceMappingURL=defaultAttributes.js.map


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/file-text.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/file-text.js ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ FileText; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const FileText = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("FileText", [
    [
        "path",
        {
            d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
            key: "1rqfz7"
        }
    ],
    [
        "path",
        {
            d: "M14 2v4a2 2 0 0 0 2 2h4",
            key: "tnqrlb"
        }
    ],
    [
        "path",
        {
            d: "M10 9H8",
            key: "b1mrlr"
        }
    ],
    [
        "path",
        {
            d: "M16 13H8",
            key: "t4e002"
        }
    ],
    [
        "path",
        {
            d: "M16 17H8",
            key: "z1uh3a"
        }
    ]
]);
 //# sourceMappingURL=file-text.js.map


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/loader-circle.js":
/*!*********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/loader-circle.js ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ LoaderCircle; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const LoaderCircle = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("LoaderCircle", [
    [
        "path",
        {
            d: "M21 12a9 9 0 1 1-6.219-8.56",
            key: "13zald"
        }
    ]
]);
 //# sourceMappingURL=loader-circle.js.map


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/menu.js":
/*!************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/menu.js ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Menu; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const Menu = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Menu", [
    [
        "line",
        {
            x1: "4",
            x2: "20",
            y1: "12",
            y2: "12",
            key: "1e0a9i"
        }
    ],
    [
        "line",
        {
            x1: "4",
            x2: "20",
            y1: "6",
            y2: "6",
            key: "1owob3"
        }
    ],
    [
        "line",
        {
            x1: "4",
            x2: "20",
            y1: "18",
            y2: "18",
            key: "yk5zj1"
        }
    ]
]);
 //# sourceMappingURL=menu.js.map


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/x.js":
/*!*********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/x.js ***!
  \*********************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ X; }
/* harmony export */ });
/* harmony import */ var _createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../createLucideIcon.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/createLucideIcon.js");
/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ 
const X = (0,_createLucideIcon_js__WEBPACK_IMPORTED_MODULE_0__["default"])("X", [
    [
        "path",
        {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }
    ],
    [
        "path",
        {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }
    ]
]);
 //# sourceMappingURL=x.js.map


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/shared/src/utils.js":
/*!******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/shared/src/utils.js ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeClasses: function() { return /* binding */ mergeClasses; },
/* harmony export */   toKebabCase: function() { return /* binding */ toKebabCase; }
/* harmony export */ });
/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && array.indexOf(className) === index;
    }).join(" ");
 //# sourceMappingURL=utils.js.map


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/client/_utils.js":
/*!***************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next-auth/client/_utils.js ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BroadcastChannel = BroadcastChannel;
exports.apiBaseUrl = apiBaseUrl;
exports.fetchData = fetchData;
exports.now = now;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/regenerator/index.js"));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/defineProperty.js"));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/asyncToGenerator.js"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function fetchData(_x, _x2, _x3) {
  return _fetchData.apply(this, arguments);
}
function _fetchData() {
  _fetchData = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(path, __NEXTAUTH, logger) {
    var _ref,
      ctx,
      _ref$req,
      req,
      url,
      _req$headers,
      options,
      res,
      data,
      _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _ref = _args.length > 3 && _args[3] !== undefined ? _args[3] : {}, ctx = _ref.ctx, _ref$req = _ref.req, req = _ref$req === void 0 ? ctx === null || ctx === void 0 ? void 0 : ctx.req : _ref$req;
          url = "".concat(apiBaseUrl(__NEXTAUTH), "/").concat(path);
          _context.prev = 2;
          options = {
            headers: _objectSpread({
              "Content-Type": "application/json"
            }, req !== null && req !== void 0 && (_req$headers = req.headers) !== null && _req$headers !== void 0 && _req$headers.cookie ? {
              cookie: req.headers.cookie
            } : {})
          };
          if (req !== null && req !== void 0 && req.body) {
            options.body = JSON.stringify(req.body);
            options.method = "POST";
          }
          _context.next = 7;
          return fetch(url, options);
        case 7:
          res = _context.sent;
          _context.next = 10;
          return res.json();
        case 10:
          data = _context.sent;
          if (res.ok) {
            _context.next = 13;
            break;
          }
          throw data;
        case 13:
          return _context.abrupt("return", Object.keys(data).length > 0 ? data : null);
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](2);
          logger.error("CLIENT_FETCH_ERROR", {
            error: _context.t0,
            url: url
          });
          return _context.abrupt("return", null);
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 16]]);
  }));
  return _fetchData.apply(this, arguments);
}
function apiBaseUrl(__NEXTAUTH) {
  if (typeof window === "undefined") {
    return "".concat(__NEXTAUTH.baseUrlServer).concat(__NEXTAUTH.basePathServer);
  }
  return __NEXTAUTH.basePath;
}
function now() {
  return Math.floor(Date.now() / 1000);
}
function BroadcastChannel() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "nextauth.message";
  return {
    receive: function receive(onReceive) {
      var handler = function handler(event) {
        var _event$newValue;
        if (event.key !== name) return;
        var message = JSON.parse((_event$newValue = event.newValue) !== null && _event$newValue !== void 0 ? _event$newValue : "{}");
        if ((message === null || message === void 0 ? void 0 : message.event) !== "session" || !(message !== null && message !== void 0 && message.data)) return;
        onReceive(message);
      };
      window.addEventListener("storage", handler);
      return function () {
        return window.removeEventListener("storage", handler);
      };
    },
    post: function post(message) {
      if (typeof window === "undefined") return;
      try {
        localStorage.setItem(name, JSON.stringify(_objectSpread(_objectSpread({}, message), {}, {
          timestamp: now()
        })));
      } catch (_unused) {}
    }
  };
}

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/core/errors.js":
/*!*************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next-auth/core/errors.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.UnsupportedStrategy = exports.UnknownError = exports.OAuthCallbackError = exports.MissingSecret = exports.MissingAuthorize = exports.MissingAdapterMethods = exports.MissingAdapter = exports.MissingAPIRoute = exports.InvalidCallbackUrl = exports.AccountNotLinkedError = void 0;
exports.adapterErrorHandler = adapterErrorHandler;
exports.capitalize = capitalize;
exports.eventsErrorHandler = eventsErrorHandler;
exports.upperSnake = upperSnake;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/regenerator/index.js"));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/asyncToGenerator.js"));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/defineProperty.js"));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/classCallCheck.js"));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/createClass.js"));
var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));
var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/getPrototypeOf.js"));
var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/inherits.js"));
var _wrapNativeSuper2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/wrapNativeSuper.js"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var UnknownError = exports.UnknownError = function (_Error) {
  function UnknownError(error) {
    var _message;
    var _this;
    (0, _classCallCheck2.default)(this, UnknownError);
    _this = _callSuper(this, UnknownError, [(_message = error === null || error === void 0 ? void 0 : error.message) !== null && _message !== void 0 ? _message : error]);
    _this.name = "UnknownError";
    _this.code = error.code;
    if (error instanceof Error) {
      _this.stack = error.stack;
    }
    return _this;
  }
  (0, _inherits2.default)(UnknownError, _Error);
  return (0, _createClass2.default)(UnknownError, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        name: this.name,
        message: this.message,
        stack: this.stack
      };
    }
  }]);
}((0, _wrapNativeSuper2.default)(Error));
var OAuthCallbackError = exports.OAuthCallbackError = function (_UnknownError) {
  function OAuthCallbackError() {
    var _this2;
    (0, _classCallCheck2.default)(this, OAuthCallbackError);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _callSuper(this, OAuthCallbackError, [].concat(args));
    (0, _defineProperty2.default)(_this2, "name", "OAuthCallbackError");
    return _this2;
  }
  (0, _inherits2.default)(OAuthCallbackError, _UnknownError);
  return (0, _createClass2.default)(OAuthCallbackError);
}(UnknownError);
var AccountNotLinkedError = exports.AccountNotLinkedError = function (_UnknownError2) {
  function AccountNotLinkedError() {
    var _this3;
    (0, _classCallCheck2.default)(this, AccountNotLinkedError);
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    _this3 = _callSuper(this, AccountNotLinkedError, [].concat(args));
    (0, _defineProperty2.default)(_this3, "name", "AccountNotLinkedError");
    return _this3;
  }
  (0, _inherits2.default)(AccountNotLinkedError, _UnknownError2);
  return (0, _createClass2.default)(AccountNotLinkedError);
}(UnknownError);
var MissingAPIRoute = exports.MissingAPIRoute = function (_UnknownError3) {
  function MissingAPIRoute() {
    var _this4;
    (0, _classCallCheck2.default)(this, MissingAPIRoute);
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    _this4 = _callSuper(this, MissingAPIRoute, [].concat(args));
    (0, _defineProperty2.default)(_this4, "name", "MissingAPIRouteError");
    (0, _defineProperty2.default)(_this4, "code", "MISSING_NEXTAUTH_API_ROUTE_ERROR");
    return _this4;
  }
  (0, _inherits2.default)(MissingAPIRoute, _UnknownError3);
  return (0, _createClass2.default)(MissingAPIRoute);
}(UnknownError);
var MissingSecret = exports.MissingSecret = function (_UnknownError4) {
  function MissingSecret() {
    var _this5;
    (0, _classCallCheck2.default)(this, MissingSecret);
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    _this5 = _callSuper(this, MissingSecret, [].concat(args));
    (0, _defineProperty2.default)(_this5, "name", "MissingSecretError");
    (0, _defineProperty2.default)(_this5, "code", "NO_SECRET");
    return _this5;
  }
  (0, _inherits2.default)(MissingSecret, _UnknownError4);
  return (0, _createClass2.default)(MissingSecret);
}(UnknownError);
var MissingAuthorize = exports.MissingAuthorize = function (_UnknownError5) {
  function MissingAuthorize() {
    var _this6;
    (0, _classCallCheck2.default)(this, MissingAuthorize);
    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }
    _this6 = _callSuper(this, MissingAuthorize, [].concat(args));
    (0, _defineProperty2.default)(_this6, "name", "MissingAuthorizeError");
    (0, _defineProperty2.default)(_this6, "code", "CALLBACK_CREDENTIALS_HANDLER_ERROR");
    return _this6;
  }
  (0, _inherits2.default)(MissingAuthorize, _UnknownError5);
  return (0, _createClass2.default)(MissingAuthorize);
}(UnknownError);
var MissingAdapter = exports.MissingAdapter = function (_UnknownError6) {
  function MissingAdapter() {
    var _this7;
    (0, _classCallCheck2.default)(this, MissingAdapter);
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }
    _this7 = _callSuper(this, MissingAdapter, [].concat(args));
    (0, _defineProperty2.default)(_this7, "name", "MissingAdapterError");
    (0, _defineProperty2.default)(_this7, "code", "EMAIL_REQUIRES_ADAPTER_ERROR");
    return _this7;
  }
  (0, _inherits2.default)(MissingAdapter, _UnknownError6);
  return (0, _createClass2.default)(MissingAdapter);
}(UnknownError);
var MissingAdapterMethods = exports.MissingAdapterMethods = function (_UnknownError7) {
  function MissingAdapterMethods() {
    var _this8;
    (0, _classCallCheck2.default)(this, MissingAdapterMethods);
    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }
    _this8 = _callSuper(this, MissingAdapterMethods, [].concat(args));
    (0, _defineProperty2.default)(_this8, "name", "MissingAdapterMethodsError");
    (0, _defineProperty2.default)(_this8, "code", "MISSING_ADAPTER_METHODS_ERROR");
    return _this8;
  }
  (0, _inherits2.default)(MissingAdapterMethods, _UnknownError7);
  return (0, _createClass2.default)(MissingAdapterMethods);
}(UnknownError);
var UnsupportedStrategy = exports.UnsupportedStrategy = function (_UnknownError8) {
  function UnsupportedStrategy() {
    var _this9;
    (0, _classCallCheck2.default)(this, UnsupportedStrategy);
    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }
    _this9 = _callSuper(this, UnsupportedStrategy, [].concat(args));
    (0, _defineProperty2.default)(_this9, "name", "UnsupportedStrategyError");
    (0, _defineProperty2.default)(_this9, "code", "CALLBACK_CREDENTIALS_JWT_ERROR");
    return _this9;
  }
  (0, _inherits2.default)(UnsupportedStrategy, _UnknownError8);
  return (0, _createClass2.default)(UnsupportedStrategy);
}(UnknownError);
var InvalidCallbackUrl = exports.InvalidCallbackUrl = function (_UnknownError9) {
  function InvalidCallbackUrl() {
    var _this10;
    (0, _classCallCheck2.default)(this, InvalidCallbackUrl);
    for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }
    _this10 = _callSuper(this, InvalidCallbackUrl, [].concat(args));
    (0, _defineProperty2.default)(_this10, "name", "InvalidCallbackUrl");
    (0, _defineProperty2.default)(_this10, "code", "INVALID_CALLBACK_URL_ERROR");
    return _this10;
  }
  (0, _inherits2.default)(InvalidCallbackUrl, _UnknownError9);
  return (0, _createClass2.default)(InvalidCallbackUrl);
}(UnknownError);
function upperSnake(s) {
  return s.replace(/([A-Z])/g, "_$1").toUpperCase();
}
function capitalize(s) {
  return "".concat(s[0].toUpperCase()).concat(s.slice(1));
}
function eventsErrorHandler(methods, logger) {
  return Object.keys(methods).reduce(function (acc, name) {
    acc[name] = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
      var method,
        _args = arguments;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            method = methods[name];
            _context.next = 4;
            return method.apply(void 0, _args);
          case 4:
            return _context.abrupt("return", _context.sent);
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            logger.error("".concat(upperSnake(name), "_EVENT_ERROR"), _context.t0);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }));
    return acc;
  }, {});
}
function adapterErrorHandler(adapter, logger) {
  if (!adapter) return;
  return Object.keys(adapter).reduce(function (acc, name) {
    acc[name] = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
      var _len10,
        args,
        _key10,
        method,
        e,
        _args2 = arguments;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            for (_len10 = _args2.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
              args[_key10] = _args2[_key10];
            }
            logger.debug("adapter_".concat(name), {
              args: args
            });
            method = adapter[name];
            _context2.next = 6;
            return method.apply(void 0, args);
          case 6:
            return _context2.abrupt("return", _context2.sent);
          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            logger.error("adapter_error_".concat(name), _context2.t0);
            e = new UnknownError(_context2.t0);
            e.name = "".concat(capitalize(name), "Error");
            throw e;
          case 15:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 9]]);
    }));
    return acc;
  }, {});
}

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/react/index.js":
/*!*************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next-auth/react/index.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/polyfills/process.js");


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js");
var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/typeof.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _exportNames = {
  SessionContext: true,
  useSession: true,
  getSession: true,
  getCsrfToken: true,
  getProviders: true,
  signIn: true,
  signOut: true,
  SessionProvider: true
};
exports.SessionContext = void 0;
exports.SessionProvider = SessionProvider;
exports.getCsrfToken = getCsrfToken;
exports.getProviders = getProviders;
exports.getSession = getSession;
exports.signIn = signIn;
exports.signOut = signOut;
exports.useSession = useSession;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/regenerator/index.js"));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/defineProperty.js"));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/asyncToGenerator.js"));
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/slicedToArray.js"));
var React = _interopRequireWildcard(__webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js"));
var _logger2 = _interopRequireWildcard(__webpack_require__(/*! ../utils/logger */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/utils/logger.js"));
var _parseUrl = _interopRequireDefault(__webpack_require__(/*! ../utils/parse-url */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/utils/parse-url.js"));
var _utils = __webpack_require__(/*! ../client/_utils */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/client/_utils.js");
var _jsxRuntime = __webpack_require__(/*! react/jsx-runtime */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/jsx-runtime.js");
var _types = __webpack_require__(/*! ./types */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/react/types.js");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});
var _process$env$NEXTAUTH, _ref, _process$env$NEXTAUTH2, _process$env$NEXTAUTH3, _React$createContext;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var __NEXTAUTH = {
  baseUrl: (0, _parseUrl.default)((_process$env$NEXTAUTH = process.env.NEXTAUTH_URL) !== null && _process$env$NEXTAUTH !== void 0 ? _process$env$NEXTAUTH : process.env.VERCEL_URL).origin,
  basePath: (0, _parseUrl.default)(process.env.NEXTAUTH_URL).path,
  baseUrlServer: (0, _parseUrl.default)((_ref = (_process$env$NEXTAUTH2 = process.env.NEXTAUTH_URL_INTERNAL) !== null && _process$env$NEXTAUTH2 !== void 0 ? _process$env$NEXTAUTH2 : process.env.NEXTAUTH_URL) !== null && _ref !== void 0 ? _ref : process.env.VERCEL_URL).origin,
  basePathServer: (0, _parseUrl.default)((_process$env$NEXTAUTH3 = process.env.NEXTAUTH_URL_INTERNAL) !== null && _process$env$NEXTAUTH3 !== void 0 ? _process$env$NEXTAUTH3 : process.env.NEXTAUTH_URL).path,
  _lastSync: 0,
  _session: undefined,
  _getSession: function _getSession() {}
};
var broadcast = (0, _utils.BroadcastChannel)();
var logger = (0, _logger2.proxyLogger)(_logger2.default, __NEXTAUTH.basePath);
function useOnline() {
  var _React$useState = React.useState(typeof navigator !== "undefined" ? navigator.onLine : false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    isOnline = _React$useState2[0],
    setIsOnline = _React$useState2[1];
  var setOnline = function setOnline() {
    return setIsOnline(true);
  };
  var setOffline = function setOffline() {
    return setIsOnline(false);
  };
  React.useEffect(function () {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);
    return function () {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);
  return isOnline;
}
var SessionContext = exports.SessionContext = (_React$createContext = React.createContext) === null || _React$createContext === void 0 ? void 0 : _React$createContext.call(React, undefined);
function useSession(options) {
  if (!SessionContext) {
    throw new Error("React Context is unavailable in Server Components");
  }
  var value = React.useContext(SessionContext);
  if (!value && "development" !== "production") {
    throw new Error("[next-auth]: `useSession` must be wrapped in a <SessionProvider />");
  }
  var _ref2 = options !== null && options !== void 0 ? options : {},
    required = _ref2.required,
    onUnauthenticated = _ref2.onUnauthenticated;
  var requiredAndNotLoading = required && value.status === "unauthenticated";
  React.useEffect(function () {
    if (requiredAndNotLoading) {
      var url = "/api/auth/signin?".concat(new URLSearchParams({
        error: "SessionRequired",
        callbackUrl: window.location.href
      }));
      if (onUnauthenticated) onUnauthenticated();else window.location.href = url;
    }
  }, [requiredAndNotLoading, onUnauthenticated]);
  if (requiredAndNotLoading) {
    return {
      data: value.data,
      update: value.update,
      status: "loading"
    };
  }
  return value;
}
function getSession(_x) {
  return _getSession2.apply(this, arguments);
}
function _getSession2() {
  _getSession2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(params) {
    var _params$broadcast;
    var session;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _utils.fetchData)("session", __NEXTAUTH, logger, params);
        case 2:
          session = _context3.sent;
          if ((_params$broadcast = params === null || params === void 0 ? void 0 : params.broadcast) !== null && _params$broadcast !== void 0 ? _params$broadcast : true) {
            broadcast.post({
              event: "session",
              data: {
                trigger: "getSession"
              }
            });
          }
          return _context3.abrupt("return", session);
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getSession2.apply(this, arguments);
}
function getCsrfToken(_x2) {
  return _getCsrfToken.apply(this, arguments);
}
function _getCsrfToken() {
  _getCsrfToken = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(params) {
    var response;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _utils.fetchData)("csrf", __NEXTAUTH, logger, params);
        case 2:
          response = _context4.sent;
          return _context4.abrupt("return", response === null || response === void 0 ? void 0 : response.csrfToken);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getCsrfToken.apply(this, arguments);
}
function getProviders() {
  return _getProviders.apply(this, arguments);
}
function _getProviders() {
  _getProviders = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5() {
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return (0, _utils.fetchData)("providers", __NEXTAUTH, logger);
        case 2:
          return _context5.abrupt("return", _context5.sent);
        case 3:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _getProviders.apply(this, arguments);
}
function signIn(_x3, _x4, _x5) {
  return _signIn.apply(this, arguments);
}
function _signIn() {
  _signIn = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(provider, options, authorizationParams) {
    var _ref5, _ref5$callbackUrl, callbackUrl, _ref5$redirect, redirect, baseUrl, providers, isCredentials, isEmail, isSupportingReturn, signInUrl, _signInUrl, res, data, _data$url, url, error;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _ref5 = options !== null && options !== void 0 ? options : {}, _ref5$callbackUrl = _ref5.callbackUrl, callbackUrl = _ref5$callbackUrl === void 0 ? window.location.href : _ref5$callbackUrl, _ref5$redirect = _ref5.redirect, redirect = _ref5$redirect === void 0 ? true : _ref5$redirect;
          baseUrl = (0, _utils.apiBaseUrl)(__NEXTAUTH);
          _context6.next = 4;
          return getProviders();
        case 4:
          providers = _context6.sent;
          if (providers) {
            _context6.next = 8;
            break;
          }
          window.location.href = "".concat(baseUrl, "/error");
          return _context6.abrupt("return");
        case 8:
          if (!(!provider || !(provider in providers))) {
            _context6.next = 11;
            break;
          }
          window.location.href = "".concat(baseUrl, "/signin?").concat(new URLSearchParams({
            callbackUrl: callbackUrl
          }));
          return _context6.abrupt("return");
        case 11:
          isCredentials = providers[provider].type === "credentials";
          isEmail = providers[provider].type === "email";
          isSupportingReturn = isCredentials || isEmail;
          signInUrl = "".concat(baseUrl, "/").concat(isCredentials ? "callback" : "signin", "/").concat(provider);
          _signInUrl = "".concat(signInUrl).concat(authorizationParams ? "?".concat(new URLSearchParams(authorizationParams)) : "");
          _context6.t0 = fetch;
          _context6.t1 = _signInUrl;
          _context6.t2 = {
            "Content-Type": "application/x-www-form-urlencoded"
          };
          _context6.t3 = URLSearchParams;
          _context6.t4 = _objectSpread;
          _context6.t5 = _objectSpread({}, options);
          _context6.t6 = {};
          _context6.next = 25;
          return getCsrfToken();
        case 25:
          _context6.t7 = _context6.sent;
          _context6.t8 = callbackUrl;
          _context6.t9 = {
            csrfToken: _context6.t7,
            callbackUrl: _context6.t8,
            json: true
          };
          _context6.t10 = (0, _context6.t4)(_context6.t5, _context6.t6, _context6.t9);
          _context6.t11 = new _context6.t3(_context6.t10);
          _context6.t12 = {
            method: "post",
            headers: _context6.t2,
            body: _context6.t11
          };
          _context6.next = 33;
          return (0, _context6.t0)(_context6.t1, _context6.t12);
        case 33:
          res = _context6.sent;
          _context6.next = 36;
          return res.json();
        case 36:
          data = _context6.sent;
          if (!(redirect || !isSupportingReturn)) {
            _context6.next = 42;
            break;
          }
          url = (_data$url = data.url) !== null && _data$url !== void 0 ? _data$url : callbackUrl;
          window.location.href = url;
          if (url.includes("#")) window.location.reload();
          return _context6.abrupt("return");
        case 42:
          error = new URL(data.url).searchParams.get("error");
          if (!res.ok) {
            _context6.next = 46;
            break;
          }
          _context6.next = 46;
          return __NEXTAUTH._getSession({
            event: "storage"
          });
        case 46:
          return _context6.abrupt("return", {
            error: error,
            status: res.status,
            ok: res.ok,
            url: error ? null : data.url
          });
        case 47:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _signIn.apply(this, arguments);
}
function signOut(_x6) {
  return _signOut.apply(this, arguments);
}
function _signOut() {
  _signOut = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(options) {
    var _options$redirect;
    var _ref6, _ref6$callbackUrl, callbackUrl, baseUrl, fetchOptions, res, data, _data$url2, url;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _ref6 = options !== null && options !== void 0 ? options : {}, _ref6$callbackUrl = _ref6.callbackUrl, callbackUrl = _ref6$callbackUrl === void 0 ? window.location.href : _ref6$callbackUrl;
          baseUrl = (0, _utils.apiBaseUrl)(__NEXTAUTH);
          _context7.t0 = {
            "Content-Type": "application/x-www-form-urlencoded"
          };
          _context7.t1 = URLSearchParams;
          _context7.next = 6;
          return getCsrfToken();
        case 6:
          _context7.t2 = _context7.sent;
          _context7.t3 = callbackUrl;
          _context7.t4 = {
            csrfToken: _context7.t2,
            callbackUrl: _context7.t3,
            json: true
          };
          _context7.t5 = new _context7.t1(_context7.t4);
          fetchOptions = {
            method: "post",
            headers: _context7.t0,
            body: _context7.t5
          };
          _context7.next = 13;
          return fetch("".concat(baseUrl, "/signout"), fetchOptions);
        case 13:
          res = _context7.sent;
          _context7.next = 16;
          return res.json();
        case 16:
          data = _context7.sent;
          broadcast.post({
            event: "session",
            data: {
              trigger: "signout"
            }
          });
          if (!((_options$redirect = options === null || options === void 0 ? void 0 : options.redirect) !== null && _options$redirect !== void 0 ? _options$redirect : true)) {
            _context7.next = 23;
            break;
          }
          url = (_data$url2 = data.url) !== null && _data$url2 !== void 0 ? _data$url2 : callbackUrl;
          window.location.href = url;
          if (url.includes("#")) window.location.reload();
          return _context7.abrupt("return");
        case 23:
          _context7.next = 25;
          return __NEXTAUTH._getSession({
            event: "storage"
          });
        case 25:
          return _context7.abrupt("return", data);
        case 26:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _signOut.apply(this, arguments);
}
function SessionProvider(props) {
  if (!SessionContext) {
    throw new Error("React Context is unavailable in Server Components");
  }
  var children = props.children,
    basePath = props.basePath,
    refetchInterval = props.refetchInterval,
    refetchWhenOffline = props.refetchWhenOffline;
  if (basePath) __NEXTAUTH.basePath = basePath;
  var hasInitialSession = props.session !== undefined;
  __NEXTAUTH._lastSync = hasInitialSession ? (0, _utils.now)() : 0;
  var _React$useState3 = React.useState(function () {
      if (hasInitialSession) __NEXTAUTH._session = props.session;
      return props.session;
    }),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    session = _React$useState4[0],
    setSession = _React$useState4[1];
  var _React$useState5 = React.useState(!hasInitialSession),
    _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
    loading = _React$useState6[0],
    setLoading = _React$useState6[1];
  React.useEffect(function () {
    __NEXTAUTH._getSession = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
      var _ref4,
        event,
        storageEvent,
        _args = arguments;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _ref4 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, event = _ref4.event;
            _context.prev = 1;
            storageEvent = event === "storage";
            if (!(storageEvent || __NEXTAUTH._session === undefined)) {
              _context.next = 10;
              break;
            }
            __NEXTAUTH._lastSync = (0, _utils.now)();
            _context.next = 7;
            return getSession({
              broadcast: !storageEvent
            });
          case 7:
            __NEXTAUTH._session = _context.sent;
            setSession(__NEXTAUTH._session);
            return _context.abrupt("return");
          case 10:
            if (!(!event || __NEXTAUTH._session === null || (0, _utils.now)() < __NEXTAUTH._lastSync)) {
              _context.next = 12;
              break;
            }
            return _context.abrupt("return");
          case 12:
            __NEXTAUTH._lastSync = (0, _utils.now)();
            _context.next = 15;
            return getSession();
          case 15:
            __NEXTAUTH._session = _context.sent;
            setSession(__NEXTAUTH._session);
            _context.next = 22;
            break;
          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](1);
            logger.error("CLIENT_SESSION_ERROR", _context.t0);
          case 22:
            _context.prev = 22;
            setLoading(false);
            return _context.finish(22);
          case 25:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 19, 22, 25]]);
    }));
    __NEXTAUTH._getSession();
    return function () {
      __NEXTAUTH._lastSync = 0;
      __NEXTAUTH._session = undefined;
      __NEXTAUTH._getSession = function () {};
    };
  }, []);
  React.useEffect(function () {
    var unsubscribe = broadcast.receive(function () {
      return __NEXTAUTH._getSession({
        event: "storage"
      });
    });
    return function () {
      return unsubscribe();
    };
  }, []);
  React.useEffect(function () {
    var _props$refetchOnWindo = props.refetchOnWindowFocus,
      refetchOnWindowFocus = _props$refetchOnWindo === void 0 ? true : _props$refetchOnWindo;
    var visibilityHandler = function visibilityHandler() {
      if (refetchOnWindowFocus && document.visibilityState === "visible") __NEXTAUTH._getSession({
        event: "visibilitychange"
      });
    };
    document.addEventListener("visibilitychange", visibilityHandler, false);
    return function () {
      return document.removeEventListener("visibilitychange", visibilityHandler, false);
    };
  }, [props.refetchOnWindowFocus]);
  var isOnline = useOnline();
  var shouldRefetch = refetchWhenOffline !== false || isOnline;
  React.useEffect(function () {
    if (refetchInterval && shouldRefetch) {
      var refetchIntervalTimer = setInterval(function () {
        if (__NEXTAUTH._session) {
          __NEXTAUTH._getSession({
            event: "poll"
          });
        }
      }, refetchInterval * 1000);
      return function () {
        return clearInterval(refetchIntervalTimer);
      };
    }
  }, [refetchInterval, shouldRefetch]);
  var value = React.useMemo(function () {
    return {
      data: session,
      status: loading ? "loading" : session ? "authenticated" : "unauthenticated",
      update: function update(data) {
        return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
          var newSession;
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                if (!(loading || !session)) {
                  _context2.next = 2;
                  break;
                }
                return _context2.abrupt("return");
              case 2:
                setLoading(true);
                _context2.t0 = _utils.fetchData;
                _context2.t1 = __NEXTAUTH;
                _context2.t2 = logger;
                _context2.next = 8;
                return getCsrfToken();
              case 8:
                _context2.t3 = _context2.sent;
                _context2.t4 = data;
                _context2.t5 = {
                  csrfToken: _context2.t3,
                  data: _context2.t4
                };
                _context2.t6 = {
                  body: _context2.t5
                };
                _context2.t7 = {
                  req: _context2.t6
                };
                _context2.next = 15;
                return (0, _context2.t0)("session", _context2.t1, _context2.t2, _context2.t7);
              case 15:
                newSession = _context2.sent;
                setLoading(false);
                if (newSession) {
                  setSession(newSession);
                  broadcast.post({
                    event: "session",
                    data: {
                      trigger: "getSession"
                    }
                  });
                }
                return _context2.abrupt("return", newSession);
              case 19:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      }
    };
  }, [session, loading]);
  return (0, _jsxRuntime.jsx)(SessionContext.Provider, {
    value: value,
    children: children
  });
}

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/react/types.js":
/*!*************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next-auth/react/types.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/utils/logger.js":
/*!**************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next-auth/utils/logger.js ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js");
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
exports.proxyLogger = proxyLogger;
exports.setLogger = setLogger;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/regenerator/index.js"));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/defineProperty.js"));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/asyncToGenerator.js"));
var _errors = __webpack_require__(/*! ../core/errors */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/core/errors.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function formatError(o) {
  if (o instanceof Error && !(o instanceof _errors.UnknownError)) {
    return {
      message: o.message,
      stack: o.stack,
      name: o.name
    };
  }
  if (hasErrorProperty(o)) {
    var _o$message;
    o.error = formatError(o.error);
    o.message = (_o$message = o.message) !== null && _o$message !== void 0 ? _o$message : o.error.message;
  }
  return o;
}
function hasErrorProperty(x) {
  return !!(x !== null && x !== void 0 && x.error);
}
var _logger = {
  error: function error(code, metadata) {
    metadata = formatError(metadata);
    console.error("[next-auth][error][".concat(code, "]"), "\nhttps://next-auth.js.org/errors#".concat(code.toLowerCase()), metadata.message, metadata);
  },
  warn: function warn(code) {
    console.warn("[next-auth][warn][".concat(code, "]"), "\nhttps://next-auth.js.org/warnings#".concat(code.toLowerCase()));
  },
  debug: function debug(code, metadata) {
    console.log("[next-auth][debug][".concat(code, "]"), metadata);
  }
};
function setLogger() {
  var newLogger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var debug = arguments.length > 1 ? arguments[1] : undefined;
  if (!debug) _logger.debug = function () {};
  if (newLogger.error) _logger.error = newLogger.error;
  if (newLogger.warn) _logger.warn = newLogger.warn;
  if (newLogger.debug) _logger.debug = newLogger.debug;
}
var _default = exports["default"] = _logger;
function proxyLogger() {
  var logger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _logger;
  var basePath = arguments.length > 1 ? arguments[1] : undefined;
  try {
    if (typeof window === "undefined") {
      return logger;
    }
    var clientLogger = {};
    var _loop = function _loop(level) {
      clientLogger[level] = function () {
        var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(code, metadata) {
          var url, body;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _logger[level](code, metadata);
                if (level === "error") {
                  metadata = formatError(metadata);
                }
                ;
                metadata.client = true;
                url = "".concat(basePath, "/_log");
                body = new URLSearchParams(_objectSpread({
                  level: level,
                  code: code
                }, metadata));
                if (!navigator.sendBeacon) {
                  _context.next = 8;
                  break;
                }
                return _context.abrupt("return", navigator.sendBeacon(url, body));
              case 8:
                _context.next = 10;
                return fetch(url, {
                  method: "POST",
                  body: body,
                  keepalive: true
                });
              case 10:
                return _context.abrupt("return", _context.sent);
              case 11:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }();
    };
    for (var level in logger) {
      _loop(level);
    }
    return clientLogger;
  } catch (_unused) {
    return _logger;
  }
}

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/utils/parse-url.js":
/*!*****************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next-auth/utils/parse-url.js ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = parseUrl;
function parseUrl(url) {
  var _url2;
  const defaultUrl = new URL("http://localhost:3000/api/auth");
  if (url && !url.startsWith("http")) {
    url = `https://${url}`;
  }
  const _url = new URL((_url2 = url) !== null && _url2 !== void 0 ? _url2 : defaultUrl);
  const path = (_url.pathname === "/" ? defaultUrl.pathname : _url.pathname).replace(/\/$/, "");
  const base = `${_url.origin}${path}`;
  return {
    origin: _url.origin,
    host: _url.host,
    path,
    base,
    toString: () => base
  };
}

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/api/link.js":
/*!**********************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/api/link.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport default from dynamic */ _client_link__WEBPACK_IMPORTED_MODULE_0___default.a; }
/* harmony export */ });
/* harmony import */ var _client_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client/link */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/link.js");
/* harmony import */ var _client_link__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_client_link__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _client_link__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _client_link__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);



//# sourceMappingURL=link.js.map

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/api/navigation.js":
/*!****************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/api/navigation.js ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client_components_navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client/components/navigation */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/navigation.js");
/* harmony import */ var _client_components_navigation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_client_components_navigation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _client_components_navigation__WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = function(key) { return _client_components_navigation__WEBPACK_IMPORTED_MODULE_0__[key]; }.bind(0, __WEBPACK_IMPORT_KEY__)
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


//# sourceMappingURL=navigation.js.map

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/polyfills/process.js":
/*!*************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/polyfills/process.js ***!
  \*************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var _global_process, _global_process1;
module.exports = ((_global_process = __webpack_require__.g.process) == null ? void 0 : _global_process.env) && typeof ((_global_process1 = __webpack_require__.g.process) == null ? void 0 : _global_process1.env) === "object" ? __webpack_require__.g.process : __webpack_require__(/*! next/dist/compiled/process */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/process/browser.js");

//# sourceMappingURL=process.js.map

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/process/browser.js":
/*!**************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/process/browser.js ***!
  \**************************************************************************************************/
/***/ (function(module) {

var __dirname = "/";
(function(){var e={229:function(e){var t=e.exports={};var r;var n;function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}(function(){try{if(typeof setTimeout==="function"){r=setTimeout}else{r=defaultSetTimout}}catch(e){r=defaultSetTimout}try{if(typeof clearTimeout==="function"){n=clearTimeout}else{n=defaultClearTimeout}}catch(e){n=defaultClearTimeout}})();function runTimeout(e){if(r===setTimeout){return setTimeout(e,0)}if((r===defaultSetTimout||!r)&&setTimeout){r=setTimeout;return setTimeout(e,0)}try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}function runClearTimeout(e){if(n===clearTimeout){return clearTimeout(e)}if((n===defaultClearTimeout||!n)&&clearTimeout){n=clearTimeout;return clearTimeout(e)}try{return n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}var i=[];var o=false;var u;var a=-1;function cleanUpNextTick(){if(!o||!u){return}o=false;if(u.length){i=u.concat(i)}else{a=-1}if(i.length){drainQueue()}}function drainQueue(){if(o){return}var e=runTimeout(cleanUpNextTick);o=true;var t=i.length;while(t){u=i;i=[];while(++a<t){if(u){u[a].run()}}a=-1;t=i.length}u=null;o=false;runClearTimeout(e)}t.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1){for(var r=1;r<arguments.length;r++){t[r-1]=arguments[r]}}i.push(new Item(e,t));if(i.length===1&&!o){runTimeout(drainQueue)}};function Item(e,t){this.fun=e;this.array=t}Item.prototype.run=function(){this.fun.apply(null,this.array)};t.title="browser";t.browser=true;t.env={};t.argv=[];t.version="";t.versions={};function noop(){}t.on=noop;t.addListener=noop;t.once=noop;t.off=noop;t.removeListener=noop;t.removeAllListeners=noop;t.emit=noop;t.prependListener=noop;t.prependOnceListener=noop;t.listeners=function(e){return[]};t.binding=function(e){throw new Error("process.binding is not supported")};t.cwd=function(){return"/"};t.chdir=function(e){throw new Error("process.chdir is not supported")};t.umask=function(){return 0}}};var t={};function __nccwpck_require__(r){var n=t[r];if(n!==undefined){return n.exports}var i=t[r]={exports:{}};var o=true;try{e[r](i,i.exports,__nccwpck_require__);o=false}finally{if(o)delete t[r]}return i.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var r=__nccwpck_require__(229);module.exports=r})();

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/lib/constants.js":
/*!***************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/lib/constants.js ***!
  \***************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ACTION_SUFFIX: function() {
        return ACTION_SUFFIX;
    },
    APP_DIR_ALIAS: function() {
        return APP_DIR_ALIAS;
    },
    CACHE_ONE_YEAR: function() {
        return CACHE_ONE_YEAR;
    },
    DOT_NEXT_ALIAS: function() {
        return DOT_NEXT_ALIAS;
    },
    ESLINT_DEFAULT_DIRS: function() {
        return ESLINT_DEFAULT_DIRS;
    },
    GSP_NO_RETURNED_VALUE: function() {
        return GSP_NO_RETURNED_VALUE;
    },
    GSSP_COMPONENT_MEMBER_ERROR: function() {
        return GSSP_COMPONENT_MEMBER_ERROR;
    },
    GSSP_NO_RETURNED_VALUE: function() {
        return GSSP_NO_RETURNED_VALUE;
    },
    INSTRUMENTATION_HOOK_FILENAME: function() {
        return INSTRUMENTATION_HOOK_FILENAME;
    },
    MIDDLEWARE_FILENAME: function() {
        return MIDDLEWARE_FILENAME;
    },
    MIDDLEWARE_LOCATION_REGEXP: function() {
        return MIDDLEWARE_LOCATION_REGEXP;
    },
    NEXT_BODY_SUFFIX: function() {
        return NEXT_BODY_SUFFIX;
    },
    NEXT_CACHE_IMPLICIT_TAG_ID: function() {
        return NEXT_CACHE_IMPLICIT_TAG_ID;
    },
    NEXT_CACHE_REVALIDATED_TAGS_HEADER: function() {
        return NEXT_CACHE_REVALIDATED_TAGS_HEADER;
    },
    NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function() {
        return NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER;
    },
    NEXT_CACHE_SOFT_TAGS_HEADER: function() {
        return NEXT_CACHE_SOFT_TAGS_HEADER;
    },
    NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function() {
        return NEXT_CACHE_SOFT_TAG_MAX_LENGTH;
    },
    NEXT_CACHE_TAGS_HEADER: function() {
        return NEXT_CACHE_TAGS_HEADER;
    },
    NEXT_CACHE_TAG_MAX_ITEMS: function() {
        return NEXT_CACHE_TAG_MAX_ITEMS;
    },
    NEXT_CACHE_TAG_MAX_LENGTH: function() {
        return NEXT_CACHE_TAG_MAX_LENGTH;
    },
    NEXT_DATA_SUFFIX: function() {
        return NEXT_DATA_SUFFIX;
    },
    NEXT_INTERCEPTION_MARKER_PREFIX: function() {
        return NEXT_INTERCEPTION_MARKER_PREFIX;
    },
    NEXT_META_SUFFIX: function() {
        return NEXT_META_SUFFIX;
    },
    NEXT_QUERY_PARAM_PREFIX: function() {
        return NEXT_QUERY_PARAM_PREFIX;
    },
    NON_STANDARD_NODE_ENV: function() {
        return NON_STANDARD_NODE_ENV;
    },
    PAGES_DIR_ALIAS: function() {
        return PAGES_DIR_ALIAS;
    },
    PRERENDER_REVALIDATE_HEADER: function() {
        return PRERENDER_REVALIDATE_HEADER;
    },
    PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function() {
        return PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER;
    },
    PUBLIC_DIR_MIDDLEWARE_CONFLICT: function() {
        return PUBLIC_DIR_MIDDLEWARE_CONFLICT;
    },
    ROOT_DIR_ALIAS: function() {
        return ROOT_DIR_ALIAS;
    },
    RSC_ACTION_CLIENT_WRAPPER_ALIAS: function() {
        return RSC_ACTION_CLIENT_WRAPPER_ALIAS;
    },
    RSC_ACTION_ENCRYPTION_ALIAS: function() {
        return RSC_ACTION_ENCRYPTION_ALIAS;
    },
    RSC_ACTION_PROXY_ALIAS: function() {
        return RSC_ACTION_PROXY_ALIAS;
    },
    RSC_ACTION_VALIDATE_ALIAS: function() {
        return RSC_ACTION_VALIDATE_ALIAS;
    },
    RSC_MOD_REF_PROXY_ALIAS: function() {
        return RSC_MOD_REF_PROXY_ALIAS;
    },
    RSC_PREFETCH_SUFFIX: function() {
        return RSC_PREFETCH_SUFFIX;
    },
    RSC_SUFFIX: function() {
        return RSC_SUFFIX;
    },
    SERVER_PROPS_EXPORT_ERROR: function() {
        return SERVER_PROPS_EXPORT_ERROR;
    },
    SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function() {
        return SERVER_PROPS_GET_INIT_PROPS_CONFLICT;
    },
    SERVER_PROPS_SSG_CONFLICT: function() {
        return SERVER_PROPS_SSG_CONFLICT;
    },
    SERVER_RUNTIME: function() {
        return SERVER_RUNTIME;
    },
    SSG_FALLBACK_EXPORT_ERROR: function() {
        return SSG_FALLBACK_EXPORT_ERROR;
    },
    SSG_GET_INITIAL_PROPS_CONFLICT: function() {
        return SSG_GET_INITIAL_PROPS_CONFLICT;
    },
    STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function() {
        return STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR;
    },
    UNSTABLE_REVALIDATE_RENAME_ERROR: function() {
        return UNSTABLE_REVALIDATE_RENAME_ERROR;
    },
    WEBPACK_LAYERS: function() {
        return WEBPACK_LAYERS;
    },
    WEBPACK_RESOURCE_QUERIES: function() {
        return WEBPACK_RESOURCE_QUERIES;
    }
});
const NEXT_QUERY_PARAM_PREFIX = "nxtP";
const NEXT_INTERCEPTION_MARKER_PREFIX = "nxtI";
const PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
const PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = "x-prerender-revalidate-if-generated";
const RSC_PREFETCH_SUFFIX = ".prefetch.rsc";
const RSC_SUFFIX = ".rsc";
const ACTION_SUFFIX = ".action";
const NEXT_DATA_SUFFIX = ".json";
const NEXT_META_SUFFIX = ".meta";
const NEXT_BODY_SUFFIX = ".body";
const NEXT_CACHE_TAGS_HEADER = "x-next-cache-tags";
const NEXT_CACHE_SOFT_TAGS_HEADER = "x-next-cache-soft-tags";
const NEXT_CACHE_REVALIDATED_TAGS_HEADER = "x-next-revalidated-tags";
const NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = "x-next-revalidate-tag-token";
const NEXT_CACHE_TAG_MAX_ITEMS = 128;
const NEXT_CACHE_TAG_MAX_LENGTH = 256;
const NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
const NEXT_CACHE_IMPLICIT_TAG_ID = "_N_T_";
const CACHE_ONE_YEAR = 31536000;
const MIDDLEWARE_FILENAME = "middleware";
const MIDDLEWARE_LOCATION_REGEXP = `(?:src/)?${MIDDLEWARE_FILENAME}`;
const INSTRUMENTATION_HOOK_FILENAME = "instrumentation";
const PAGES_DIR_ALIAS = "private-next-pages";
const DOT_NEXT_ALIAS = "private-dot-next";
const ROOT_DIR_ALIAS = "private-next-root-dir";
const APP_DIR_ALIAS = "private-next-app-dir";
const RSC_MOD_REF_PROXY_ALIAS = "private-next-rsc-mod-ref-proxy";
const RSC_ACTION_VALIDATE_ALIAS = "private-next-rsc-action-validate";
const RSC_ACTION_PROXY_ALIAS = "private-next-rsc-server-reference";
const RSC_ACTION_ENCRYPTION_ALIAS = "private-next-rsc-action-encryption";
const RSC_ACTION_CLIENT_WRAPPER_ALIAS = "private-next-rsc-action-client-wrapper";
const PUBLIC_DIR_MIDDLEWARE_CONFLICT = `You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`;
const SSG_GET_INITIAL_PROPS_CONFLICT = `You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`;
const SERVER_PROPS_GET_INIT_PROPS_CONFLICT = `You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`;
const SERVER_PROPS_SSG_CONFLICT = `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`;
const STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = `can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`;
const SERVER_PROPS_EXPORT_ERROR = `pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`;
const GSP_NO_RETURNED_VALUE = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?";
const GSSP_NO_RETURNED_VALUE = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?";
const UNSTABLE_REVALIDATE_RENAME_ERROR = "The `unstable_revalidate` property is available for general use.\n" + "Please use `revalidate` instead.";
const GSSP_COMPONENT_MEMBER_ERROR = `can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`;
const NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`;
const SSG_FALLBACK_EXPORT_ERROR = `Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`;
const ESLINT_DEFAULT_DIRS = [
    "app",
    "pages",
    "components",
    "lib",
    "src"
];
const SERVER_RUNTIME = {
    edge: "edge",
    experimentalEdge: "experimental-edge",
    nodejs: "nodejs"
};
/**
 * The names of the webpack layers. These layers are the primitives for the
 * webpack chunks.
 */ const WEBPACK_LAYERS_NAMES = {
    /**
   * The layer for the shared code between the client and server bundles.
   */ shared: "shared",
    /**
   * React Server Components layer (rsc).
   */ reactServerComponents: "rsc",
    /**
   * Server Side Rendering layer for app (ssr).
   */ serverSideRendering: "ssr",
    /**
   * The browser client bundle layer for actions.
   */ actionBrowser: "action-browser",
    /**
   * The layer for the API routes.
   */ api: "api",
    /**
   * The layer for the middleware code.
   */ middleware: "middleware",
    /**
   * The layer for the instrumentation hooks.
   */ instrument: "instrument",
    /**
   * The layer for assets on the edge.
   */ edgeAsset: "edge-asset",
    /**
   * The browser client bundle layer for App directory.
   */ appPagesBrowser: "app-pages-browser",
    /**
   * The server bundle layer for metadata routes.
   */ appMetadataRoute: "app-metadata-route",
    /**
   * The layer for the server bundle for App Route handlers.
   */ appRouteHandler: "app-route-handler"
};
const WEBPACK_LAYERS = {
    ...WEBPACK_LAYERS_NAMES,
    GROUP: {
        serverOnly: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.appMetadataRoute,
            WEBPACK_LAYERS_NAMES.appRouteHandler,
            WEBPACK_LAYERS_NAMES.instrument
        ],
        clientOnly: [
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser
        ],
        nonClientServerTarget: [
            // middleware and pages api
            WEBPACK_LAYERS_NAMES.middleware,
            WEBPACK_LAYERS_NAMES.api
        ],
        app: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.appMetadataRoute,
            WEBPACK_LAYERS_NAMES.appRouteHandler,
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser,
            WEBPACK_LAYERS_NAMES.shared,
            WEBPACK_LAYERS_NAMES.instrument
        ]
    }
};
const WEBPACK_RESOURCE_QUERIES = {
    edgeSSREntry: "__next_edge_ssr_entry__",
    metadata: "__next_metadata__",
    metadataRoute: "__next_metadata_route__",
    metadataImageMeta: "__next_metadata_image_meta__"
};

//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "(app-pages-browser)/./app/login/page.tsx":
/*!****************************!*\
  !*** ./app/login/page.tsx ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ LoginPage; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/react/index.js");
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/api/navigation.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/api/link.js");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/ui/button */ "(app-pages-browser)/./components/ui/button.tsx");
/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/ui/input */ "(app-pages-browser)/./components/ui/input.tsx");
/* harmony import */ var _components_ui_label__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/ui/label */ "(app-pages-browser)/./components/ui/label.tsx");
/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/components/ui/card */ "(app-pages-browser)/./components/ui/card.tsx");
/* harmony import */ var _components_marketing_navbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/components/marketing/navbar */ "(app-pages-browser)/./components/marketing/navbar.tsx");
/* harmony import */ var _barrel_optimize_names_FileText_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! __barrel_optimize__?names=FileText,Loader2!=!lucide-react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/loader-circle.js");
/* harmony import */ var _barrel_optimize_names_FileText_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! __barrel_optimize__?names=FileText,Loader2!=!lucide-react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/file-text.js");
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-hot-toast */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/react-hot-toast/dist/index.mjs");
/* __next_internal_client_entry_do_not_use__ default auto */ 
var _s = $RefreshSig$();











function LoginForm() {
    _s();
    const [email, setEmail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [checkingAdmin, setCheckingAdmin] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useSearchParams)();
    const { data: session, status } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession)() || {};
    const nextUrlParam = searchParams?.get("next");
    // Check if user is admin and redirect accordingly
    const checkAdminAndRedirect = async ()=>{
        setCheckingAdmin(true);
        try {
            const res = await fetch("/api/admin/check");
            if (res.ok) {
                const data = await res.json();
                if (data.isAdmin) {
                    // Admin users go directly to admin panel
                    router.replace("/app/glorand");
                    return;
                }
            }
        } catch (error) {
            console.error("Failed to check admin status:", error);
        }
        // Non-admin users go to dashboard or specified next URL
        router.replace(nextUrlParam || "/app/dashboard");
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (status === "authenticated" && !checkingAdmin) {
            checkAdminAndRedirect();
        }
    }, [
        status
    ]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const result = await (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.signIn)("credentials", {
                email,
                password,
                redirect: false
            });
            if (result?.error) {
                react_hot_toast__WEBPACK_IMPORTED_MODULE_10__["default"].error("Invalid email or password");
                setLoading(false);
            } else {
                // After successful login, check admin status and redirect
                await checkAdminAndRedirect();
            }
        } catch (error) {
            react_hot_toast__WEBPACK_IMPORTED_MODULE_10__["default"].error("An error occurred. Please try again.");
            setLoading(false);
        }
    };
    if (status === "loading") {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: "min-h-screen flex items-center justify-center gradient-hero",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FileText_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], {
                className: "h-8 w-8 animate-spin text-purple-500"
            }, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                lineNumber: 79,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
            lineNumber: 78,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: "min-h-screen gradient-hero",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_marketing_navbar__WEBPACK_IMPORTED_MODULE_9__.MarketingNavbar, {}, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "pt-24 pb-12 px-4 flex items-center justify-center",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__.Card, {
                    className: "w-full max-w-md shadow-xl border border-purple-100/50",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__.CardHeader, {
                            className: "text-center pb-2",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                    className: "flex justify-center mb-4",
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                        className: "w-14 h-14 bg-gradient-to-br from-purple-500 to-lavender-500 rounded-xl flex items-center justify-center shadow-lg",
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FileText_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"], {
                                            className: "w-8 h-8 text-white"
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                            lineNumber: 93,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__.CardTitle, {
                                    className: "text-2xl font-bold gradient-text",
                                    children: "Welcome Back"
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__.CardDescription, {
                                    className: "text-muted-foreground",
                                    children: "Sign in to your MakeEstimate account"
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_8__.CardContent, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("form", {
                                    onSubmit: handleSubmit,
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_label__WEBPACK_IMPORTED_MODULE_7__.Label, {
                                                    htmlFor: "email",
                                                    children: "Email"
                                                }, void 0, false, {
                                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_6__.Input, {
                                                    id: "email",
                                                    type: "email",
                                                    placeholder: "Enter your email",
                                                    value: email,
                                                    onChange: (e)=>setEmail(e.target.value),
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                            lineNumber: 105,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_label__WEBPACK_IMPORTED_MODULE_7__.Label, {
                                                    htmlFor: "password",
                                                    children: "Password"
                                                }, void 0, false, {
                                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_6__.Input, {
                                                    id: "password",
                                                    type: "password",
                                                    placeholder: "Enter your password",
                                                    value: password,
                                                    onChange: (e)=>setPassword(e.target.value),
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                            lineNumber: 116,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_5__.Button, {
                                            type: "submit",
                                            className: "w-full",
                                            disabled: loading,
                                            children: loading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FileText_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], {
                                                        className: "mr-2 h-4 w-4 animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                                        lineNumber: 130,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Signing in..."
                                                ]
                                            }, void 0, true) : "Sign In"
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                            lineNumber: 127,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                    className: "mt-6 text-center text-sm",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                            className: "text-muted-foreground",
                                            children: "Don't have an account? "
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                            lineNumber: 139,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_4__["default"], {
                                            href: "/register",
                                            className: "text-primary font-medium hover:underline",
                                            children: "Sign up"
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(LoginForm, "G4l/NpreVL1x7COlsUQCOHLSFa0=", false, function() {
    return [
        next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter,
        next_navigation__WEBPACK_IMPORTED_MODULE_3__.useSearchParams,
        next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession
    ];
});
_c = LoginForm;
function LoginPage() {
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, {
        fallback: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: "min-h-screen flex items-center justify-center gradient-hero",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FileText_Loader2_lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"], {
                className: "h-8 w-8 animate-spin text-purple-500"
            }, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
                lineNumber: 155,
                columnNumber: 9
            }, void 0)
        }, void 0, false, {
            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
            lineNumber: 154,
            columnNumber: 7
        }, void 0),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LoginForm, {}, void 0, false, {
            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
            lineNumber: 158,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/login/page.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
_c1 = LoginPage;
var _c, _c1;
$RefreshReg$(_c, "LoginForm");
$RefreshReg$(_c1, "LoginPage");


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/./components/marketing/navbar.tsx":
/*!*****************************************!*\
  !*** ./components/marketing/navbar.tsx ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarketingNavbar: function() { return /* binding */ MarketingNavbar; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/api/link.js");
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/react/index.js");
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/button */ "(app-pages-browser)/./components/ui/button.tsx");
/* harmony import */ var _barrel_optimize_names_FileText_Menu_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=FileText,Menu,X!=!lucide-react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/file-text.js");
/* harmony import */ var _barrel_optimize_names_FileText_Menu_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=FileText,Menu,X!=!lucide-react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/x.js");
/* harmony import */ var _barrel_optimize_names_FileText_Menu_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! __barrel_optimize__?names=FileText,Menu,X!=!lucide-react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/menu.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/utils */ "(app-pages-browser)/./lib/utils.ts");
/* __next_internal_client_entry_do_not_use__ MarketingNavbar auto */ 
var _s = $RefreshSig$();






const navLinks = [
    {
        name: "Features",
        href: "/#features"
    },
    {
        name: "Pricing",
        href: "/pricing"
    }
];
function MarketingNavbar() {
    _s();
    const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession)() || {};
    const [mobileMenuOpen, setMobileMenuOpen] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    const [scrolled, setScrolled] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{
        const handleScroll = ()=>{
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return ()=>window.removeEventListener("scroll", handleScroll);
    }, []);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("header", {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.cn)("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "bg-white/90 backdrop-blur-lg border-b border-purple-100/50 shadow-sm" : "bg-transparent"),
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("nav", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    className: "flex items-center justify-between h-16",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                            href: "/",
                            className: "flex items-center space-x-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                    className: "w-10 h-10 bg-gradient-to-br from-purple-500 to-lavender-500 rounded-xl flex items-center justify-center shadow-md",
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FileText_Menu_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__["default"], {
                                        className: "w-5 h-5 text-white"
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                        lineNumber: 40,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                    lineNumber: 39,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                    className: "text-lg font-bold gradient-text",
                                    children: "MakeEstimate"
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                            className: "hidden md:flex items-center space-x-8",
                            children: navLinks.map((link)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                    href: link.href,
                                    className: "text-gray-600 hover:text-purple-600 transition-colors duration-200 font-medium",
                                    children: link.name
                                }, link.name, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                            className: "hidden md:flex items-center space-x-4",
                            children: session ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                href: "/app/dashboard",
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                    children: "Go to Dashboard"
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                    lineNumber: 64,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                lineNumber: 63,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                        href: "/login",
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                            variant: "ghost",
                                            className: "text-gray-700",
                                            children: "Login"
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                            lineNumber: 69,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                        lineNumber: 68,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                        href: "/register",
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                            children: "Get Started"
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                            lineNumber: 72,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                        lineNumber: 71,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                            className: "md:hidden p-2 rounded-xl hover:bg-purple-50 transition-colors",
                            onClick: ()=>setMobileMenuOpen(!mobileMenuOpen),
                            children: mobileMenuOpen ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FileText_Menu_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"], {
                                className: "h-6 w-6 text-gray-600"
                            }, void 0, false, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FileText_Menu_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"], {
                                className: "h-6 w-6 text-gray-600"
                            }, void 0, false, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.cn)("md:hidden overflow-hidden transition-all duration-300", mobileMenuOpen ? "max-h-96 pb-4" : "max-h-0"),
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "flex flex-col space-y-3 pt-4",
                        children: [
                            navLinks.map((link)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                    href: link.href,
                                    className: "text-gray-600 hover:text-purple-600 transition-colors font-medium py-2",
                                    onClick: ()=>setMobileMenuOpen(false),
                                    children: link.name
                                }, link.name, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                    lineNumber: 100,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                className: "pt-4 flex flex-col space-y-3",
                                children: session ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                    href: "/app/dashboard",
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                        className: "w-full",
                                        children: "Go to Dashboard"
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                        lineNumber: 112,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                    lineNumber: 111,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                            href: "/login",
                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                                variant: "outline",
                                                className: "w-full",
                                                children: "Login"
                                            }, void 0, false, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                                lineNumber: 117,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                            lineNumber: 116,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                            href: "/register",
                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
                                                className: "w-full",
                                                children: "Get Started"
                                            }, void 0, false, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                                lineNumber: 120,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                            lineNumber: 119,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/navbar.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(MarketingNavbar, "cFwyGvRv0shBPMfiV62SWctVK5g=", false, function() {
    return [
        next_auth_react__WEBPACK_IMPORTED_MODULE_2__.useSession
    ];
});
_c = MarketingNavbar;
var _c;
$RefreshReg$(_c, "MarketingNavbar");


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/./components/ui/button.tsx":
/*!**********************************!*\
  !*** ./components/ui/button.tsx ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: function() { return /* binding */ Button; },
/* harmony export */   buttonVariants: function() { return /* binding */ buttonVariants; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-slot */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-slot/dist/index.mjs");
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-variance-authority */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/class-variance-authority/dist/index.mjs");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/utils */ "(app-pages-browser)/./lib/utils.ts");





const buttonVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__.cva)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-gradient-to-r from-purple-500 to-lavender-500 text-white shadow-md hover:shadow-lg hover:from-purple-600 hover:to-lavender-600 active:scale-[0.98]",
            destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:scale-[0.98]",
            outline: "border-2 border-purple-200 bg-white text-purple-700 hover:bg-purple-50 hover:border-purple-300 active:scale-[0.98]",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:scale-[0.98]",
            ghost: "text-foreground hover:bg-purple-100/50 hover:text-purple-700 active:scale-[0.98]",
            link: "text-purple-600 underline-offset-4 hover:underline hover:text-purple-700",
            success: "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-sm hover:from-emerald-600 hover:to-green-600 active:scale-[0.98]"
        },
        size: {
            default: "h-10 px-5 py-2",
            sm: "h-9 rounded-lg px-4 text-xs",
            lg: "h-12 rounded-xl px-8 text-base",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_4__.Slot : "button";
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Comp, {
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/ui/button.tsx",
        lineNumber: 49,
        columnNumber: 7
    }, undefined);
});
_c1 = Button;
Button.displayName = "Button";

var _c, _c1;
$RefreshReg$(_c, "Button$React.forwardRef");
$RefreshReg$(_c1, "Button");


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/./components/ui/card.tsx":
/*!********************************!*\
  !*** ./components/ui/card.tsx ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Card: function() { return /* binding */ Card; },
/* harmony export */   CardContent: function() { return /* binding */ CardContent; },
/* harmony export */   CardDescription: function() { return /* binding */ CardDescription; },
/* harmony export */   CardFooter: function() { return /* binding */ CardFooter; },
/* harmony export */   CardHeader: function() { return /* binding */ CardHeader; },
/* harmony export */   CardTitle: function() { return /* binding */ CardTitle; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/utils */ "(app-pages-browser)/./lib/utils.ts");



const Card = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("rounded-2xl border border-purple-100/50 bg-white shadow-card transition-all duration-200", "hover:shadow-card-hover", className),
        ...props
    }, void 0, false, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/ui/card.tsx",
        lineNumber: 8,
        columnNumber: 3
    }, undefined));
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/ui/card.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, undefined));
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h3", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("text-xl font-semibold leading-none tracking-tight text-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/ui/card.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, undefined));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/ui/card.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, undefined));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/ui/card.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, undefined));
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/ui/card.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, undefined));
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";

var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
$RefreshReg$(_c, "Card$React.forwardRef");
$RefreshReg$(_c1, "Card");
$RefreshReg$(_c2, "CardHeader$React.forwardRef");
$RefreshReg$(_c3, "CardHeader");
$RefreshReg$(_c4, "CardTitle$React.forwardRef");
$RefreshReg$(_c5, "CardTitle");
$RefreshReg$(_c6, "CardDescription$React.forwardRef");
$RefreshReg$(_c7, "CardDescription");
$RefreshReg$(_c8, "CardContent$React.forwardRef");
$RefreshReg$(_c9, "CardContent");
$RefreshReg$(_c10, "CardFooter$React.forwardRef");
$RefreshReg$(_c11, "CardFooter");


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/./components/ui/input.tsx":
/*!*********************************!*\
  !*** ./components/ui/input.tsx ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Input: function() { return /* binding */ Input; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/utils */ "(app-pages-browser)/./lib/utils.ts");



const Input = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(_c = ({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
        type: type,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex h-11 w-full rounded-xl border-2 border-purple-100 bg-white px-4 py-2 text-sm text-foreground transition-all duration-200", "placeholder:text-muted-foreground", "hover:border-purple-200", "focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100", "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted", "file:border-0 file:bg-transparent file:text-sm file:font-medium", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/ui/input.tsx",
        lineNumber: 10,
        columnNumber: 7
    }, undefined);
});
_c1 = Input;
Input.displayName = "Input";

var _c, _c1;
$RefreshReg$(_c, "Input$React.forwardRef");
$RefreshReg$(_c1, "Input");


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/./components/ui/label.tsx":
/*!*********************************!*\
  !*** ./components/ui/label.tsx ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Label: function() { return /* binding */ Label; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_label__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-label */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-label/dist/index.mjs");
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-variance-authority */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/class-variance-authority/dist/index.mjs");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/utils */ "(app-pages-browser)/./lib/utils.ts");
/* __next_internal_client_entry_do_not_use__ Label auto */ 




const labelVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__.cva)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_radix_ui_react_label__WEBPACK_IMPORTED_MODULE_4__.Root, {
        ref: ref,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(labelVariants(), className),
        ...props
    }, void 0, false, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/ui/label.tsx",
        lineNumber: 17,
        columnNumber: 3
    }, undefined));
_c1 = Label;
Label.displayName = _radix_ui_react_label__WEBPACK_IMPORTED_MODULE_4__.Root.displayName;

var _c, _c1;
$RefreshReg$(_c, "Label$React.forwardRef");
$RefreshReg$(_c1, "Label");


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/./lib/utils.ts":
/*!**********************!*\
  !*** ./lib/utils.ts ***!
  \**********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cn: function() { return /* binding */ cn; },
/* harmony export */   formatDuration: function() { return /* binding */ formatDuration; }
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tailwind-merge */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/tailwind-merge/dist/bundle-mjs.mjs");


function cn(...inputs) {
    return (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_1__.twMerge)((0,clsx__WEBPACK_IMPORTED_MODULE_0__.clsx)(inputs));
}
function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/add-locale.js":
/*!*******************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/add-locale.js ***!
  \*******************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "addLocale", ({
    enumerable: true,
    get: function() {
        return addLocale;
    }
}));
const _normalizetrailingslash = __webpack_require__(/*! ./normalize-trailing-slash */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/normalize-trailing-slash.js");
const addLocale = function(path) {
    for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        args[_key - 1] = arguments[_key];
    }
    if (false) {}
    return path;
};
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=add-locale.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/get-domain-locale.js":
/*!**************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/get-domain-locale.js ***!
  \**************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getDomainLocale", ({
    enumerable: true,
    get: function() {
        return getDomainLocale;
    }
}));
const _normalizetrailingslash = __webpack_require__(/*! ./normalize-trailing-slash */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/normalize-trailing-slash.js");
const basePath =  false || "";
function getDomainLocale(path, locale, locales, domainLocales) {
    if (false) {} else {
        return false;
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=get-domain-locale.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/link.js":
/*!*************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/link.js ***!
  \*************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
var _s = $RefreshSig$();
"use strict";
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return _default;
    }
}));
const _interop_require_default = __webpack_require__(/*! @swc/helpers/_/_interop_require_default */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@swc/helpers/esm/_interop_require_default.js");
const _jsxruntime = __webpack_require__(/*! react/jsx-runtime */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/jsx-runtime.js");
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js"));
const _resolvehref = __webpack_require__(/*! ./resolve-href */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/resolve-href.js");
const _islocalurl = __webpack_require__(/*! ../shared/lib/router/utils/is-local-url */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/is-local-url.js");
const _formaturl = __webpack_require__(/*! ../shared/lib/router/utils/format-url */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/format-url.js");
const _utils = __webpack_require__(/*! ../shared/lib/utils */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/utils.js");
const _addlocale = __webpack_require__(/*! ./add-locale */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/add-locale.js");
const _routercontextsharedruntime = __webpack_require__(/*! ../shared/lib/router-context.shared-runtime */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router-context.shared-runtime.js");
const _approutercontextsharedruntime = __webpack_require__(/*! ../shared/lib/app-router-context.shared-runtime */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js");
const _useintersection = __webpack_require__(/*! ./use-intersection */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/use-intersection.js");
const _getdomainlocale = __webpack_require__(/*! ./get-domain-locale */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/get-domain-locale.js");
const _addbasepath = __webpack_require__(/*! ./add-base-path */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/add-base-path.js");
const _routerreducertypes = __webpack_require__(/*! ./components/router-reducer/router-reducer-types */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/router-reducer/router-reducer-types.js");
const prefetched = new Set();
function prefetch(router, href, as, options, appOptions, isAppRouter) {
    if (typeof window === "undefined") {
        return;
    }
    // app-router supports external urls out of the box so it shouldn't short-circuit here as support for e.g. `replace` is added in the app-router.
    if (!isAppRouter && !(0, _islocalurl.isLocalURL)(href)) {
        return;
    }
    // We should only dedupe requests when experimental.optimisticClientCache is
    // disabled.
    if (!options.bypassPrefetchedCheck) {
        const locale = typeof options.locale !== "undefined" ? options.locale : "locale" in router ? router.locale : undefined;
        const prefetchedKey = href + "%" + as + "%" + locale;
        // If we've already fetched the key, then don't prefetch it again!
        if (prefetched.has(prefetchedKey)) {
            return;
        }
        // Mark this URL as prefetched.
        prefetched.add(prefetchedKey);
    }
    const doPrefetch = async ()=>{
        if (isAppRouter) {
            // note that `appRouter.prefetch()` is currently sync,
            // so we have to wrap this call in an async function to be able to catch() errors below.
            return router.prefetch(href, appOptions);
        } else {
            return router.prefetch(href, as, options);
        }
    };
    // Prefetch the JSON page if asked (only in the client)
    // We need to handle a prefetch error here since we may be
    // loading with priority which can reject but we don't
    // want to force navigation since this is only a prefetch
    doPrefetch().catch((err)=>{
        if (true) {
            // rethrow to show invalid URL errors
            throw err;
        }
    });
}
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute("target");
    return target && target !== "_self" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, router, href, as, replace, shallow, scroll, locale, isAppRouter) {
    const { nodeName } = e.currentTarget;
    // anchors inside an svg have a lowercase nodeName
    const isAnchorNodeName = nodeName.toUpperCase() === "A";
    if (isAnchorNodeName && (isModifiedEvent(e) || // app-router supports external urls out of the box so it shouldn't short-circuit here as support for e.g. `replace` is added in the app-router.
    !isAppRouter && !(0, _islocalurl.isLocalURL)(href))) {
        // ignore click for browser’s default behavior
        return;
    }
    e.preventDefault();
    const navigate = ()=>{
        // If the router is an NextRouter instance it will have `beforePopState`
        const routerScroll = scroll != null ? scroll : true;
        if ("beforePopState" in router) {
            router[replace ? "replace" : "push"](href, as, {
                shallow,
                locale,
                scroll: routerScroll
            });
        } else {
            router[replace ? "replace" : "push"](as || href, {
                scroll: routerScroll
            });
        }
    };
    if (isAppRouter) {
        _react.default.startTransition(navigate);
    } else {
        navigate();
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === "string") {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
/**
 * A React component that extends the HTML `<a>` element to provide [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation between routes.
 *
 * It is the primary way to navigate between routes in Next.js.
 *
 * Read more: [Next.js docs: `<Link>`](https://nextjs.org/docs/app/api-reference/components/link)
 */ const Link = /*#__PURE__*/ _s(_react.default.forwardRef(_c = _s(function LinkComponent(props, forwardedRef) {
    _s();
    let children;
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, locale, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === "string" || typeof children === "number")) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const pagesRouter = _react.default.useContext(_routercontextsharedruntime.RouterContext);
    const appRouter = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const router = pagesRouter != null ? pagesRouter : appRouter;
    // We're in the app directory if there is no pages router.
    const isAppRouter = !pagesRouter;
    const prefetchEnabled = prefetchProp !== false;
    /**
     * The possible states for prefetch are:
     * - null: this is the default "auto" mode, where we will prefetch partially if the link is in the viewport
     * - true: we will prefetch if the link is visible and prefetch the full page, not just partially
     * - false: we will not prefetch if in the viewport at all
     */ const appPrefetchKind = prefetchProp === null ? _routerreducertypes.PrefetchKind.AUTO : _routerreducertypes.PrefetchKind.FULL;
    if (true) {
        function createPropError(args) {
            return new Error("Failed prop type: The prop `" + args.key + "` expects a " + args.expected + " in `<Link>`, but got `" + args.actual + "` instead." + (typeof window !== "undefined" ? "\nOpen your browser's console to view the Component stack trace." : ""));
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === "href") {
                if (props[key] == null || typeof props[key] !== "string" && typeof props[key] !== "object") {
                    throw createPropError({
                        key,
                        expected: "`string` or `object`",
                        actual: props[key] === null ? "null" : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            locale: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === "as") {
                if (props[key] && valType !== "string" && valType !== "object") {
                    throw createPropError({
                        key,
                        expected: "`string` or `object`",
                        actual: valType
                    });
                }
            } else if (key === "locale") {
                if (props[key] && valType !== "string") {
                    throw createPropError({
                        key,
                        expected: "`string`",
                        actual: valType
                    });
                }
            } else if (key === "onClick" || key === "onMouseEnter" || key === "onTouchStart") {
                if (props[key] && valType !== "function") {
                    throw createPropError({
                        key,
                        expected: "`function`",
                        actual: valType
                    });
                }
            } else if (key === "replace" || key === "scroll" || key === "shallow" || key === "passHref" || key === "prefetch" || key === "legacyBehavior") {
                if (props[key] != null && valType !== "boolean") {
                    throw createPropError({
                        key,
                        expected: "`boolean`",
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const _ = key;
            }
        });
        // This hook is in a conditional but that is ok because `process.env.NODE_ENV` never changes
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const hasWarned = _react.default.useRef(false);
        if (props.prefetch && !hasWarned.current && !isAppRouter) {
            hasWarned.current = true;
            console.warn("Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://nextjs.org/docs/messages/prefetch-true-deprecated");
        }
    }
    if (true) {
        if (isAppRouter && !asProp) {
            let href;
            if (typeof hrefProp === "string") {
                href = hrefProp;
            } else if (typeof hrefProp === "object" && typeof hrefProp.pathname === "string") {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split("/").some((segment)=>segment.startsWith("[") && segment.endsWith("]"));
                if (hasDynamicSegment) {
                    throw new Error("Dynamic href `" + href + "` found in <Link> while using the `/app` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href");
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo(()=>{
        if (!pagesRouter) {
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
        const [resolvedHref, resolvedAs] = (0, _resolvehref.resolveHref)(pagesRouter, hrefProp, true);
        return {
            href: resolvedHref,
            as: asProp ? (0, _resolvehref.resolveHref)(pagesRouter, asProp) : resolvedAs || resolvedHref
        };
    }, [
        pagesRouter,
        hrefProp,
        asProp
    ]);
    const previousHref = _react.default.useRef(href);
    const previousAs = _react.default.useRef(as);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (true) {
            if (onClick) {
                console.warn('"onClick" was passed to <Link> with `href` of `' + hrefProp + '` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link');
            }
            if (onMouseEnterProp) {
                console.warn('"onMouseEnter" was passed to <Link> with `href` of `' + hrefProp + '` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link');
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw new Error("No children were passed to <Link> with `href` of `" + hrefProp + "` but one child is required https://nextjs.org/docs/messages/link-no-children");
                }
                throw new Error("Multiple children were passed to <Link> with `href` of `" + hrefProp + "` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children" + (typeof window !== "undefined" ? " \nOpen your browser's console to view the Component stack trace." : ""));
            }
        } else {}
    } else {
        if (true) {
            if ((children == null ? void 0 : children.type) === "a") {
                throw new Error("Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor");
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === "object" && child.ref : forwardedRef;
    const [setIntersectionRef, isVisible, resetVisible] = (0, _useintersection.useIntersection)({
        rootMargin: "200px"
    });
    const setRef = _react.default.useCallback((el)=>{
        // Before the link getting observed, check if visible state need to be reset
        if (previousAs.current !== as || previousHref.current !== href) {
            resetVisible();
            previousAs.current = as;
            previousHref.current = href;
        }
        setIntersectionRef(el);
        if (childRef) {
            if (typeof childRef === "function") childRef(el);
            else if (typeof childRef === "object") {
                childRef.current = el;
            }
        }
    }, [
        as,
        childRef,
        href,
        resetVisible,
        setIntersectionRef
    ]);
    // Prefetch the URL if we haven't already and it's visible.
    _react.default.useEffect(()=>{
        // in dev, we only prefetch on hover to avoid wasting resources as the prefetch will trigger compiling the page.
        if (true) {
            return;
        }
        if (!router) {
            return;
        }
        // If we don't need to prefetch the URL, don't do prefetch.
        if (!isVisible || !prefetchEnabled) {
            return;
        }
        // Prefetch the URL.
        prefetch(router, href, as, {
            locale
        }, {
            kind: appPrefetchKind
        }, isAppRouter);
    }, [
        as,
        href,
        isVisible,
        locale,
        prefetchEnabled,
        pagesRouter == null ? void 0 : pagesRouter.locale,
        router,
        isAppRouter,
        appPrefetchKind
    ]);
    const childProps = {
        ref: setRef,
        onClick (e) {
            if (true) {
                if (!e) {
                    throw new Error('Component rendered inside next/link has to pass click event to "onClick" prop.');
                }
            }
            if (!legacyBehavior && typeof onClick === "function") {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === "function") {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, router, href, as, replace, shallow, scroll, locale, isAppRouter);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === "function") {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === "function") {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ((!prefetchEnabled || "development" === "development") && isAppRouter) {
                return;
            }
            prefetch(router, href, as, {
                locale,
                priority: true,
                // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
                bypassPrefetchedCheck: true
            }, {
                kind: appPrefetchKind
            }, isAppRouter);
        },
        onTouchStart:  false ? 0 : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === "function") {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === "function") {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled && isAppRouter) {
                return;
            }
            prefetch(router, href, as, {
                locale,
                priority: true,
                // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
                bypassPrefetchedCheck: true
            }, {
                kind: appPrefetchKind
            }, isAppRouter);
        }
    };
    // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user.
    // If the url is absolute, we can bypass the logic to prepend the domain and locale.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === "a" && !("href" in child.props)) {
        const curLocale = typeof locale !== "undefined" ? locale : pagesRouter == null ? void 0 : pagesRouter.locale;
        // we only render domain locales if we are currently on a domain locale
        // so that locale links are still visitable in development/preview envs
        const localeDomain = (pagesRouter == null ? void 0 : pagesRouter.isLocaleDomain) && (0, _getdomainlocale.getDomainLocale)(as, curLocale, pagesRouter == null ? void 0 : pagesRouter.locales, pagesRouter == null ? void 0 : pagesRouter.domainLocales);
        childProps.href = localeDomain || (0, _addbasepath.addBasePath)((0, _addlocale.addLocale)(as, curLocale, pagesRouter == null ? void 0 : pagesRouter.defaultLocale));
    }
    return legacyBehavior ? /*#__PURE__*/ _react.default.cloneElement(child, childProps) : /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
        ...restProps,
        ...childProps,
        children: children
    });
}, "wKD5mb5mk47bkaStGb/Fvd6RWZE=")), "wKD5mb5mk47bkaStGb/Fvd6RWZE=");
_c1 = Link;
const _default = Link;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
var _c, _c1;
$RefreshReg$(_c, "Link$_react.default.forwardRef");
$RefreshReg$(_c1, "Link");


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/request-idle-callback.js":
/*!******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/request-idle-callback.js ***!
  \******************************************************************************************************/
/***/ (function(module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    cancelIdleCallback: function() {
        return cancelIdleCallback;
    },
    requestIdleCallback: function() {
        return requestIdleCallback;
    }
});
const requestIdleCallback = typeof self !== "undefined" && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
    let start = Date.now();
    return self.setTimeout(function() {
        cb({
            didTimeout: false,
            timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - start));
            }
        });
    }, 1);
};
const cancelIdleCallback = typeof self !== "undefined" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
    return clearTimeout(id);
};
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=request-idle-callback.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/resolve-href.js":
/*!*********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/resolve-href.js ***!
  \*********************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "resolveHref", ({
    enumerable: true,
    get: function() {
        return resolveHref;
    }
}));
const _querystring = __webpack_require__(/*! ../shared/lib/router/utils/querystring */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/querystring.js");
const _formaturl = __webpack_require__(/*! ../shared/lib/router/utils/format-url */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/format-url.js");
const _omit = __webpack_require__(/*! ../shared/lib/router/utils/omit */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/omit.js");
const _utils = __webpack_require__(/*! ../shared/lib/utils */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/utils.js");
const _normalizetrailingslash = __webpack_require__(/*! ./normalize-trailing-slash */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/normalize-trailing-slash.js");
const _islocalurl = __webpack_require__(/*! ../shared/lib/router/utils/is-local-url */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/is-local-url.js");
const _utils1 = __webpack_require__(/*! ../shared/lib/router/utils */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/index.js");
const _interpolateas = __webpack_require__(/*! ../shared/lib/router/utils/interpolate-as */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/interpolate-as.js");
function resolveHref(router, href, resolveAs) {
    // we use a dummy base url for relative urls
    let base;
    let urlAsString = typeof href === "string" ? href : (0, _formaturl.formatWithValidation)(href);
    // repeated slashes and backslashes in the URL are considered
    // invalid and will never match a Next.js page/file
    const urlProtoMatch = urlAsString.match(/^[a-zA-Z]{1,}:\/\//);
    const urlAsStringNoProto = urlProtoMatch ? urlAsString.slice(urlProtoMatch[0].length) : urlAsString;
    const urlParts = urlAsStringNoProto.split("?", 1);
    if ((urlParts[0] || "").match(/(\/\/|\\)/)) {
        console.error("Invalid href '" + urlAsString + "' passed to next/router in page: '" + router.pathname + "'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.");
        const normalizedUrl = (0, _utils.normalizeRepeatedSlashes)(urlAsStringNoProto);
        urlAsString = (urlProtoMatch ? urlProtoMatch[0] : "") + normalizedUrl;
    }
    // Return because it cannot be routed by the Next.js router
    if (!(0, _islocalurl.isLocalURL)(urlAsString)) {
        return resolveAs ? [
            urlAsString
        ] : urlAsString;
    }
    try {
        base = new URL(urlAsString.startsWith("#") ? router.asPath : router.pathname, "http://n");
    } catch (_) {
        // fallback to / for invalid asPath values e.g. //
        base = new URL("/", "http://n");
    }
    try {
        const finalUrl = new URL(urlAsString, base);
        finalUrl.pathname = (0, _normalizetrailingslash.normalizePathTrailingSlash)(finalUrl.pathname);
        let interpolatedAs = "";
        if ((0, _utils1.isDynamicRoute)(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
            const query = (0, _querystring.searchParamsToUrlQuery)(finalUrl.searchParams);
            const { result, params } = (0, _interpolateas.interpolateAs)(finalUrl.pathname, finalUrl.pathname, query);
            if (result) {
                interpolatedAs = (0, _formaturl.formatWithValidation)({
                    pathname: result,
                    hash: finalUrl.hash,
                    query: (0, _omit.omit)(query, params)
                });
            }
        }
        // if the origin didn't change, it means we received a relative href
        const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
        return resolveAs ? [
            resolvedHref,
            interpolatedAs || resolvedHref
        ] : resolvedHref;
    } catch (_) {
        return resolveAs ? [
            urlAsString
        ] : urlAsString;
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=resolve-href.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/use-intersection.js":
/*!*************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/use-intersection.js ***!
  \*************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "useIntersection", ({
    enumerable: true,
    get: function() {
        return useIntersection;
    }
}));
const _react = __webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js");
const _requestidlecallback = __webpack_require__(/*! ./request-idle-callback */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/request-idle-callback.js");
const hasIntersectionObserver = typeof IntersectionObserver === "function";
const observers = new Map();
const idList = [];
function createObserver(options) {
    const id = {
        root: options.root || null,
        margin: options.rootMargin || ""
    };
    const existing = idList.find((obj)=>obj.root === id.root && obj.margin === id.margin);
    let instance;
    if (existing) {
        instance = observers.get(existing);
        if (instance) {
            return instance;
        }
    }
    const elements = new Map();
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            const callback = elements.get(entry.target);
            const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
            if (callback && isVisible) {
                callback(isVisible);
            }
        });
    }, options);
    instance = {
        id,
        observer,
        elements
    };
    idList.push(id);
    observers.set(id, instance);
    return instance;
}
function observe(element, callback, options) {
    const { id, observer, elements } = createObserver(options);
    elements.set(element, callback);
    observer.observe(element);
    return function unobserve() {
        elements.delete(element);
        observer.unobserve(element);
        // Destroy observer when there's nothing left to watch:
        if (elements.size === 0) {
            observer.disconnect();
            observers.delete(id);
            const index = idList.findIndex((obj)=>obj.root === id.root && obj.margin === id.margin);
            if (index > -1) {
                idList.splice(index, 1);
            }
        }
    };
}
function useIntersection(param) {
    let { rootRef, rootMargin, disabled } = param;
    const isDisabled = disabled || !hasIntersectionObserver;
    const [visible, setVisible] = (0, _react.useState)(false);
    const elementRef = (0, _react.useRef)(null);
    const setElement = (0, _react.useCallback)((element)=>{
        elementRef.current = element;
    }, []);
    (0, _react.useEffect)(()=>{
        if (hasIntersectionObserver) {
            if (isDisabled || visible) return;
            const element = elementRef.current;
            if (element && element.tagName) {
                const unobserve = observe(element, (isVisible)=>isVisible && setVisible(isVisible), {
                    root: rootRef == null ? void 0 : rootRef.current,
                    rootMargin
                });
                return unobserve;
            }
        } else {
            if (!visible) {
                const idleCallback = (0, _requestidlecallback.requestIdleCallback)(()=>setVisible(true));
                return ()=>(0, _requestidlecallback.cancelIdleCallback)(idleCallback);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isDisabled,
        rootMargin,
        rootRef,
        visible,
        elementRef.current
    ]);
    const resetVisible = (0, _react.useCallback)(()=>{
        setVisible(false);
    }, []);
    return [
        setElement,
        visible,
        resetVisible
    ];
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-intersection.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/escape-regexp.js":
/*!**************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/escape-regexp.js ***!
  \**************************************************************************************************/
/***/ (function(module, exports) {

"use strict";
// regexp is based on https://github.com/sindresorhus/escape-string-regexp

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "escapeStringRegexp", ({
    enumerable: true,
    get: function() {
        return escapeStringRegexp;
    }
}));
const reHasRegExp = /[|\\{}()[\]^$+*?.-]/;
const reReplaceRegExp = /[|\\{}()[\]^$+*?.-]/g;
function escapeStringRegexp(str) {
    // see also: https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/escapeRegExp.js#L23
    if (reHasRegExp.test(str)) {
        return str.replace(reReplaceRegExp, "\\$&");
    }
    return str;
} //# sourceMappingURL=escape-regexp.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router-context.shared-runtime.js":
/*!******************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router-context.shared-runtime.js ***!
  \******************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "RouterContext", ({
    enumerable: true,
    get: function() {
        return RouterContext;
    }
}));
const _interop_require_default = __webpack_require__(/*! @swc/helpers/_/_interop_require_default */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@swc/helpers/esm/_interop_require_default.js");
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js"));
const RouterContext = _react.default.createContext(null);
if (true) {
    RouterContext.displayName = "RouterContext";
} //# sourceMappingURL=router-context.shared-runtime.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/format-url.js":
/*!************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/format-url.js ***!
  \************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __webpack_require__(/*! @swc/helpers/_/_interop_require_wildcard */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@swc/helpers/esm/_interop_require_wildcard.js");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(/*! ./querystring */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/querystring.js"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || "";
    let pathname = urlObj.pathname || "";
    let hash = urlObj.hash || "";
    let query = urlObj.query || "";
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ":") + "@" : "";
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(":") ? "[" + hostname + "]" : hostname);
        if (urlObj.port) {
            host += ":" + urlObj.port;
        }
    }
    if (query && typeof query === "object") {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && "?" + query || "";
    if (protocol && !protocol.endsWith(":")) protocol += ":";
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = "//" + (host || "");
        if (pathname && pathname[0] !== "/") pathname = "/" + pathname;
    } else if (!host) {
        host = "";
    }
    if (hash && hash[0] !== "#") hash = "#" + hash;
    if (search && search[0] !== "?") search = "?" + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace("#", "%23");
    return "" + protocol + host + pathname + search + hash;
}
const urlObjectKeys = [
    "auth",
    "hash",
    "host",
    "hostname",
    "href",
    "path",
    "pathname",
    "port",
    "protocol",
    "query",
    "search",
    "slashes"
];
function formatWithValidation(url) {
    if (true) {
        if (url !== null && typeof url === "object") {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn("Unknown key passed via urlObject into url.format: " + key);
                }
            });
        }
    }
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/index.js":
/*!*******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/index.js ***!
  \*******************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getSortedRoutes: function() {
        return _sortedroutes.getSortedRoutes;
    },
    isDynamicRoute: function() {
        return _isdynamic.isDynamicRoute;
    }
});
const _sortedroutes = __webpack_require__(/*! ./sorted-routes */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/sorted-routes.js");
const _isdynamic = __webpack_require__(/*! ./is-dynamic */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js"); //# sourceMappingURL=index.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/interpolate-as.js":
/*!****************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/interpolate-as.js ***!
  \****************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "interpolateAs", ({
    enumerable: true,
    get: function() {
        return interpolateAs;
    }
}));
const _routematcher = __webpack_require__(/*! ./route-matcher */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/route-matcher.js");
const _routeregex = __webpack_require__(/*! ./route-regex */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/route-regex.js");
function interpolateAs(route, asPathname, query) {
    let interpolatedRoute = "";
    const dynamicRegex = (0, _routeregex.getRouteRegex)(route);
    const dynamicGroups = dynamicRegex.groups;
    const dynamicMatches = (asPathname !== route ? (0, _routematcher.getRouteMatcher)(dynamicRegex)(asPathname) : "") || // Fall back to reading the values from the href
    // TODO: should this take priority; also need to change in the router.
    query;
    interpolatedRoute = route;
    const params = Object.keys(dynamicGroups);
    if (!params.every((param)=>{
        let value = dynamicMatches[param] || "";
        const { repeat, optional } = dynamicGroups[param];
        // support single-level catch-all
        // TODO: more robust handling for user-error (passing `/`)
        let replaced = "[" + (repeat ? "..." : "") + param + "]";
        if (optional) {
            replaced = (!value ? "/" : "") + "[" + replaced + "]";
        }
        if (repeat && !Array.isArray(value)) value = [
            value
        ];
        return (optional || param in dynamicMatches) && // Interpolate group into data URL if present
        (interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map(// path delimiter escaped since they are being inserted
        // into the URL and we expect URL encoded segments
        // when parsing dynamic route params
        (segment)=>encodeURIComponent(segment)).join("/") : encodeURIComponent(value)) || "/");
    })) {
        interpolatedRoute = "" // did not satisfy all requirements
        ;
    // n.b. We ignore this error because we handle warning for this case in
    // development in the `<Link>` component directly.
    }
    return {
        params,
        result: interpolatedRoute
    };
} //# sourceMappingURL=interpolate-as.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js":
/*!************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/is-dynamic.js ***!
  \************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isDynamicRoute", ({
    enumerable: true,
    get: function() {
        return isDynamicRoute;
    }
}));
const _interceptionroutes = __webpack_require__(/*! ../../../../server/future/helpers/interception-routes */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/helpers/interception-routes.js");
// Identify /[param]/ in route string
const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;
function isDynamicRoute(route) {
    if ((0, _interceptionroutes.isInterceptionRouteAppPath)(route)) {
        route = (0, _interceptionroutes.extractInterceptionRouteInformation)(route).interceptedRoute;
    }
    return TEST_ROUTE.test(route);
} //# sourceMappingURL=is-dynamic.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/is-local-url.js":
/*!**************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/is-local-url.js ***!
  \**************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isLocalURL", ({
    enumerable: true,
    get: function() {
        return isLocalURL;
    }
}));
const _utils = __webpack_require__(/*! ../../utils */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/utils.js");
const _hasbasepath = __webpack_require__(/*! ../../../../client/has-base-path */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/has-base-path.js");
function isLocalURL(url) {
    // prevent a hydration mismatch on href for url with anchor refs
    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
    try {
        // absolute urls can be local if they are on the same origin
        const locationOrigin = (0, _utils.getLocationOrigin)();
        const resolved = new URL(url, locationOrigin);
        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
        return false;
    }
} //# sourceMappingURL=is-local-url.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/omit.js":
/*!******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/omit.js ***!
  \******************************************************************************************************/
/***/ (function(module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "omit", ({
    enumerable: true,
    get: function() {
        return omit;
    }
}));
function omit(object, keys) {
    const omitted = {};
    Object.keys(object).forEach((key)=>{
        if (!keys.includes(key)) {
            omitted[key] = object[key];
        }
    });
    return omitted;
} //# sourceMappingURL=omit.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/querystring.js":
/*!*************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/querystring.js ***!
  \*************************************************************************************************************/
/***/ (function(module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    searchParams.forEach((value, key)=>{
        if (typeof query[key] === "undefined") {
            query[key] = value;
        } else if (Array.isArray(query[key])) {
            query[key].push(value);
        } else {
            query[key] = [
                query[key],
                value
            ];
        }
    });
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === "string" || typeof param === "number" && !isNaN(param) || typeof param === "boolean") {
        return String(param);
    } else {
        return "";
    }
}
function urlQueryToSearchParams(urlQuery) {
    const result = new URLSearchParams();
    Object.entries(urlQuery).forEach((param)=>{
        let [key, value] = param;
        if (Array.isArray(value)) {
            value.forEach((item)=>result.append(key, stringifyUrlQueryParam(item)));
        } else {
            result.set(key, stringifyUrlQueryParam(value));
        }
    });
    return result;
}
function assign(target) {
    for(var _len = arguments.length, searchParamsList = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        searchParamsList[_key - 1] = arguments[_key];
    }
    searchParamsList.forEach((searchParams)=>{
        Array.from(searchParams.keys()).forEach((key)=>target.delete(key));
        searchParams.forEach((value, key)=>target.append(key, value));
    });
    return target;
} //# sourceMappingURL=querystring.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/route-matcher.js":
/*!***************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/route-matcher.js ***!
  \***************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getRouteMatcher", ({
    enumerable: true,
    get: function() {
        return getRouteMatcher;
    }
}));
const _utils = __webpack_require__(/*! ../../utils */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/utils.js");
function getRouteMatcher(param) {
    let { re, groups } = param;
    return (pathname)=>{
        const routeMatch = re.exec(pathname);
        if (!routeMatch) {
            return false;
        }
        const decode = (param)=>{
            try {
                return decodeURIComponent(param);
            } catch (_) {
                throw new _utils.DecodeError("failed to decode param");
            }
        };
        const params = {};
        Object.keys(groups).forEach((slugName)=>{
            const g = groups[slugName];
            const m = routeMatch[g.pos];
            if (m !== undefined) {
                params[slugName] = ~m.indexOf("/") ? m.split("/").map((entry)=>decode(entry)) : g.repeat ? [
                    decode(m)
                ] : decode(m);
            }
        });
        return params;
    };
} //# sourceMappingURL=route-matcher.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/route-regex.js":
/*!*************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/route-regex.js ***!
  \*************************************************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getNamedMiddlewareRegex: function() {
        return getNamedMiddlewareRegex;
    },
    getNamedRouteRegex: function() {
        return getNamedRouteRegex;
    },
    getRouteRegex: function() {
        return getRouteRegex;
    },
    parseParameter: function() {
        return parseParameter;
    }
});
const _constants = __webpack_require__(/*! ../../../../lib/constants */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/lib/constants.js");
const _interceptionroutes = __webpack_require__(/*! ../../../../server/future/helpers/interception-routes */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/helpers/interception-routes.js");
const _escaperegexp = __webpack_require__(/*! ../../escape-regexp */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/escape-regexp.js");
const _removetrailingslash = __webpack_require__(/*! ./remove-trailing-slash */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js");
function parseParameter(param) {
    const optional = param.startsWith("[") && param.endsWith("]");
    if (optional) {
        param = param.slice(1, -1);
    }
    const repeat = param.startsWith("...");
    if (repeat) {
        param = param.slice(3);
    }
    return {
        key: param,
        repeat,
        optional
    };
}
function getParametrizedRoute(route) {
    const segments = (0, _removetrailingslash.removeTrailingSlash)(route).slice(1).split("/");
    const groups = {};
    let groupIndex = 1;
    return {
        parameterizedRoute: segments.map((segment)=>{
            const markerMatch = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
            const paramMatches = segment.match(/\[((?:\[.*\])|.+)\]/) // Check for parameters
            ;
            if (markerMatch && paramMatches) {
                const { key, optional, repeat } = parseParameter(paramMatches[1]);
                groups[key] = {
                    pos: groupIndex++,
                    repeat,
                    optional
                };
                return "/" + (0, _escaperegexp.escapeStringRegexp)(markerMatch) + "([^/]+?)";
            } else if (paramMatches) {
                const { key, repeat, optional } = parseParameter(paramMatches[1]);
                groups[key] = {
                    pos: groupIndex++,
                    repeat,
                    optional
                };
                return repeat ? optional ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)";
            } else {
                return "/" + (0, _escaperegexp.escapeStringRegexp)(segment);
            }
        }).join(""),
        groups
    };
}
function getRouteRegex(normalizedRoute) {
    const { parameterizedRoute, groups } = getParametrizedRoute(normalizedRoute);
    return {
        re: new RegExp("^" + parameterizedRoute + "(?:/)?$"),
        groups: groups
    };
}
/**
 * Builds a function to generate a minimal routeKey using only a-z and minimal
 * number of characters.
 */ function buildGetSafeRouteKey() {
    let i = 0;
    return ()=>{
        let routeKey = "";
        let j = ++i;
        while(j > 0){
            routeKey += String.fromCharCode(97 + (j - 1) % 26);
            j = Math.floor((j - 1) / 26);
        }
        return routeKey;
    };
}
function getSafeKeyFromSegment(param) {
    let { interceptionMarker, getSafeRouteKey, segment, routeKeys, keyPrefix } = param;
    const { key, optional, repeat } = parseParameter(segment);
    // replace any non-word characters since they can break
    // the named regex
    let cleanedKey = key.replace(/\W/g, "");
    if (keyPrefix) {
        cleanedKey = "" + keyPrefix + cleanedKey;
    }
    let invalidKey = false;
    // check if the key is still invalid and fallback to using a known
    // safe key
    if (cleanedKey.length === 0 || cleanedKey.length > 30) {
        invalidKey = true;
    }
    if (!isNaN(parseInt(cleanedKey.slice(0, 1)))) {
        invalidKey = true;
    }
    if (invalidKey) {
        cleanedKey = getSafeRouteKey();
    }
    if (keyPrefix) {
        routeKeys[cleanedKey] = "" + keyPrefix + key;
    } else {
        routeKeys[cleanedKey] = key;
    }
    // if the segment has an interception marker, make sure that's part of the regex pattern
    // this is to ensure that the route with the interception marker doesn't incorrectly match
    // the non-intercepted route (ie /app/(.)[username] should not match /app/[username])
    const interceptionPrefix = interceptionMarker ? (0, _escaperegexp.escapeStringRegexp)(interceptionMarker) : "";
    return repeat ? optional ? "(?:/" + interceptionPrefix + "(?<" + cleanedKey + ">.+?))?" : "/" + interceptionPrefix + "(?<" + cleanedKey + ">.+?)" : "/" + interceptionPrefix + "(?<" + cleanedKey + ">[^/]+?)";
}
function getNamedParametrizedRoute(route, prefixRouteKeys) {
    const segments = (0, _removetrailingslash.removeTrailingSlash)(route).slice(1).split("/");
    const getSafeRouteKey = buildGetSafeRouteKey();
    const routeKeys = {};
    return {
        namedParameterizedRoute: segments.map((segment)=>{
            const hasInterceptionMarker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some((m)=>segment.startsWith(m));
            const paramMatches = segment.match(/\[((?:\[.*\])|.+)\]/) // Check for parameters
            ;
            if (hasInterceptionMarker && paramMatches) {
                const [usedMarker] = segment.split(paramMatches[0]);
                return getSafeKeyFromSegment({
                    getSafeRouteKey,
                    interceptionMarker: usedMarker,
                    segment: paramMatches[1],
                    routeKeys,
                    keyPrefix: prefixRouteKeys ? _constants.NEXT_INTERCEPTION_MARKER_PREFIX : undefined
                });
            } else if (paramMatches) {
                return getSafeKeyFromSegment({
                    getSafeRouteKey,
                    segment: paramMatches[1],
                    routeKeys,
                    keyPrefix: prefixRouteKeys ? _constants.NEXT_QUERY_PARAM_PREFIX : undefined
                });
            } else {
                return "/" + (0, _escaperegexp.escapeStringRegexp)(segment);
            }
        }).join(""),
        routeKeys
    };
}
function getNamedRouteRegex(normalizedRoute, prefixRouteKey) {
    const result = getNamedParametrizedRoute(normalizedRoute, prefixRouteKey);
    return {
        ...getRouteRegex(normalizedRoute),
        namedRegex: "^" + result.namedParameterizedRoute + "(?:/)?$",
        routeKeys: result.routeKeys
    };
}
function getNamedMiddlewareRegex(normalizedRoute, options) {
    const { parameterizedRoute } = getParametrizedRoute(normalizedRoute);
    const { catchAll = true } = options;
    if (parameterizedRoute === "/") {
        let catchAllRegex = catchAll ? ".*" : "";
        return {
            namedRegex: "^/" + catchAllRegex + "$"
        };
    }
    const { namedParameterizedRoute } = getNamedParametrizedRoute(normalizedRoute, false);
    let catchAllGroupedRegex = catchAll ? "(?:(/.*)?)" : "";
    return {
        namedRegex: "^" + namedParameterizedRoute + catchAllGroupedRegex + "$"
    };
} //# sourceMappingURL=route-regex.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/sorted-routes.js":
/*!***************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/router/utils/sorted-routes.js ***!
  \***************************************************************************************************************/
/***/ (function(module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getSortedRoutes", ({
    enumerable: true,
    get: function() {
        return getSortedRoutes;
    }
}));
class UrlNode {
    insert(urlPath) {
        this._insert(urlPath.split("/").filter(Boolean), [], false);
    }
    smoosh() {
        return this._smoosh();
    }
    _smoosh(prefix) {
        if (prefix === void 0) prefix = "/";
        const childrenPaths = [
            ...this.children.keys()
        ].sort();
        if (this.slugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf("[]"), 1);
        }
        if (this.restSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf("[...]"), 1);
        }
        if (this.optionalRestSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf("[[...]]"), 1);
        }
        const routes = childrenPaths.map((c)=>this.children.get(c)._smoosh("" + prefix + c + "/")).reduce((prev, curr)=>[
                ...prev,
                ...curr
            ], []);
        if (this.slugName !== null) {
            routes.push(...this.children.get("[]")._smoosh(prefix + "[" + this.slugName + "]/"));
        }
        if (!this.placeholder) {
            const r = prefix === "/" ? "/" : prefix.slice(0, -1);
            if (this.optionalRestSlugName != null) {
                throw new Error('You cannot define a route with the same specificity as a optional catch-all route ("' + r + '" and "' + r + "[[..." + this.optionalRestSlugName + ']]").');
            }
            routes.unshift(r);
        }
        if (this.restSlugName !== null) {
            routes.push(...this.children.get("[...]")._smoosh(prefix + "[..." + this.restSlugName + "]/"));
        }
        if (this.optionalRestSlugName !== null) {
            routes.push(...this.children.get("[[...]]")._smoosh(prefix + "[[..." + this.optionalRestSlugName + "]]/"));
        }
        return routes;
    }
    _insert(urlPaths, slugNames, isCatchAll) {
        if (urlPaths.length === 0) {
            this.placeholder = false;
            return;
        }
        if (isCatchAll) {
            throw new Error("Catch-all must be the last part of the URL.");
        }
        // The next segment in the urlPaths list
        let nextSegment = urlPaths[0];
        // Check if the segment matches `[something]`
        if (nextSegment.startsWith("[") && nextSegment.endsWith("]")) {
            // Strip `[` and `]`, leaving only `something`
            let segmentName = nextSegment.slice(1, -1);
            let isOptional = false;
            if (segmentName.startsWith("[") && segmentName.endsWith("]")) {
                // Strip optional `[` and `]`, leaving only `something`
                segmentName = segmentName.slice(1, -1);
                isOptional = true;
            }
            if (segmentName.startsWith("...")) {
                // Strip `...`, leaving only `something`
                segmentName = segmentName.substring(3);
                isCatchAll = true;
            }
            if (segmentName.startsWith("[") || segmentName.endsWith("]")) {
                throw new Error("Segment names may not start or end with extra brackets ('" + segmentName + "').");
            }
            if (segmentName.startsWith(".")) {
                throw new Error("Segment names may not start with erroneous periods ('" + segmentName + "').");
            }
            function handleSlug(previousSlug, nextSlug) {
                if (previousSlug !== null) {
                    // If the specific segment already has a slug but the slug is not `something`
                    // This prevents collisions like:
                    // pages/[post]/index.js
                    // pages/[id]/index.js
                    // Because currently multiple dynamic params on the same segment level are not supported
                    if (previousSlug !== nextSlug) {
                        // TODO: This error seems to be confusing for users, needs an error link, the description can be based on above comment.
                        throw new Error("You cannot use different slug names for the same dynamic path ('" + previousSlug + "' !== '" + nextSlug + "').");
                    }
                }
                slugNames.forEach((slug)=>{
                    if (slug === nextSlug) {
                        throw new Error('You cannot have the same slug name "' + nextSlug + '" repeat within a single dynamic path');
                    }
                    if (slug.replace(/\W/g, "") === nextSegment.replace(/\W/g, "")) {
                        throw new Error('You cannot have the slug names "' + slug + '" and "' + nextSlug + '" differ only by non-word symbols within a single dynamic path');
                    }
                });
                slugNames.push(nextSlug);
            }
            if (isCatchAll) {
                if (isOptional) {
                    if (this.restSlugName != null) {
                        throw new Error('You cannot use both an required and optional catch-all route at the same level ("[...' + this.restSlugName + ']" and "' + urlPaths[0] + '" ).');
                    }
                    handleSlug(this.optionalRestSlugName, segmentName);
                    // slugName is kept as it can only be one particular slugName
                    this.optionalRestSlugName = segmentName;
                    // nextSegment is overwritten to [[...]] so that it can later be sorted specifically
                    nextSegment = "[[...]]";
                } else {
                    if (this.optionalRestSlugName != null) {
                        throw new Error('You cannot use both an optional and required catch-all route at the same level ("[[...' + this.optionalRestSlugName + ']]" and "' + urlPaths[0] + '").');
                    }
                    handleSlug(this.restSlugName, segmentName);
                    // slugName is kept as it can only be one particular slugName
                    this.restSlugName = segmentName;
                    // nextSegment is overwritten to [...] so that it can later be sorted specifically
                    nextSegment = "[...]";
                }
            } else {
                if (isOptional) {
                    throw new Error('Optional route parameters are not yet supported ("' + urlPaths[0] + '").');
                }
                handleSlug(this.slugName, segmentName);
                // slugName is kept as it can only be one particular slugName
                this.slugName = segmentName;
                // nextSegment is overwritten to [] so that it can later be sorted specifically
                nextSegment = "[]";
            }
        }
        // If this UrlNode doesn't have the nextSegment yet we create a new child UrlNode
        if (!this.children.has(nextSegment)) {
            this.children.set(nextSegment, new UrlNode());
        }
        this.children.get(nextSegment)._insert(urlPaths.slice(1), slugNames, isCatchAll);
    }
    constructor(){
        this.placeholder = true;
        this.children = new Map();
        this.slugName = null;
        this.restSlugName = null;
        this.optionalRestSlugName = null;
    }
}
function getSortedRoutes(normalizedPages) {
    // First the UrlNode is created, and every UrlNode can have only 1 dynamic segment
    // Eg you can't have pages/[post]/abc.js and pages/[hello]/something-else.js
    // Only 1 dynamic segment per nesting level
    // So in the case that is test/integration/dynamic-routing it'll be this:
    // pages/[post]/comments.js
    // pages/blog/[post]/comment/[id].js
    // Both are fine because `pages/[post]` and `pages/blog` are on the same level
    // So in this case `UrlNode` created here has `this.slugName === 'post'`
    // And since your PR passed through `slugName` as an array basically it'd including it in too many possibilities
    // Instead what has to be passed through is the upwards path's dynamic names
    const root = new UrlNode();
    // Here the `root` gets injected multiple paths, and insert will break them up into sublevels
    normalizedPages.forEach((pagePath)=>root.insert(pagePath));
    // Smoosh will then sort those sublevels up to the point where you get the correct route definition priority
    return root.smoosh();
} //# sourceMappingURL=sorted-routes.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/utils.js":
/*!******************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/shared/lib/utils.js ***!
  \******************************************************************************************/
/***/ (function(module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    "CLS",
    "FCP",
    "FID",
    "INP",
    "LCP",
    "TTFB"
];
function execOnce(fn) {
    let used = false;
    let result;
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return protocol + "//" + hostname + (port ? ":" + port : "");
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === "string" ? Component : Component.displayName || Component.name || "Unknown";
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split("?");
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, "/").replace(/\/\/+/g, "/") + (urlParts[1] ? "?" + urlParts.slice(1).join("?") : "");
}
async function loadGetInitialProps(App, ctx) {
    if (true) {
        var _App_prototype;
        if ((_App_prototype = App.prototype) == null ? void 0 : _App_prototype.getInitialProps) {
            const message = '"' + getDisplayName(App) + '.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.';
            throw new Error(message);
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = '"' + getDisplayName(App) + '.getInitialProps()" should resolve to an object. But found "' + props + '" instead.';
        throw new Error(message);
    }
    if (true) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn("" + getDisplayName(App) + " returned an empty object from `getInitialProps`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps");
        }
    }
    return props;
}
const SP = typeof performance !== "undefined";
const ST = SP && [
    "mark",
    "measure",
    "getEntriesByName"
].every((method)=>typeof performance[method] === "function");
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = "ENOENT";
        this.name = "PageNotFoundError";
        this.message = "Cannot find module for page: " + page;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = "Failed to load static file for page: " + page + " " + message;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = "ENOENT";
        this.message = "Cannot find the middleware module";
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js":
/*!******************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js ***!
  \******************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var React = __webpack_require__(/*! next/dist/compiled/react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js");

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_PORTAL_TYPE = Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider'); // TODO: Delete with enableRenderableContext

var REACT_CONSUMER_TYPE = Symbol.for('react.consumer');
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE = Symbol.for('react.memo');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
var REACT_CACHE_TYPE = Symbol.for('react.cache');
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

// -----------------------------------------------------------------------------

var enableScopeAPI = false; // Experimental Create Event Handle API.
var enableCacheElement = false;
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
var enableRenderableContext = false;
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false;

function getWrappedName(outerType, innerType, wrapperName) {
  var displayName = outerType.displayName;

  if (displayName) {
    return displayName;
  }

  var functionName = innerType.displayName || innerType.name || '';
  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
} // Keep in sync with react-reconciler/getComponentNameFromFiber


function getContextName(type) {
  return type.displayName || 'Context';
}

var REACT_CLIENT_REFERENCE$2 = Symbol.for('react.client.reference'); // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.

function getComponentNameFromType(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  if (typeof type === 'function') {
    if (type.$$typeof === REACT_CLIENT_REFERENCE$2) {
      // TODO: Create a convention for naming client references with debug info.
      return null;
    }

    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

    case REACT_CACHE_TYPE:
      {
        return 'Cache';
      }

  }

  if (typeof type === 'object') {
    {
      if (typeof type.tag === 'number') {
        error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
      }
    }

    switch (type.$$typeof) {
      case REACT_PROVIDER_TYPE:
        {
          var provider = type;
          return getContextName(provider._context) + '.Provider';
        }

      case REACT_CONTEXT_TYPE:
        var context = type;

        {
          return getContextName(context) + '.Consumer';
        }

      case REACT_CONSUMER_TYPE:
        {
          return null;
        }

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        var outerName = type.displayName || null;

        if (outerName !== null) {
          return outerName;
        }

        return getComponentNameFromType(type.type) || 'Memo';

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentNameFromType(init(payload));
          } catch (x) {
            return null;
          }
        }
    }
  }

  return null;
}

// $FlowFixMe[method-unbinding]
var hasOwnProperty = Object.prototype.hasOwnProperty;

var assign = Object.assign;

/*
 * The `'' + value` pattern (used in perf-sensitive code) throws for Symbol
 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
 *
 * The functions in this module will throw an easier-to-understand,
 * easier-to-debug exception with a clear errors message message explaining the
 * problem. (Instead of a confusing exception thrown inside the implementation
 * of the `value` object).
 */
// $FlowFixMe[incompatible-return] only called in DEV, so void return is not possible.
function typeName(value) {
  {
    // toStringTag is needed for namespaced types like Temporal.Instant
    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object'; // $FlowFixMe[incompatible-return]

    return type;
  }
} // $FlowFixMe[incompatible-return] only called in DEV, so void return is not possible.


function willCoercionThrow(value) {
  {
    try {
      testStringCoercion(value);
      return false;
    } catch (e) {
      return true;
    }
  }
}

function testStringCoercion(value) {
  // If you ended up here by following an exception call stack, here's what's
  // happened: you supplied an object or symbol value to React (as a prop, key,
  // DOM attribute, CSS property, string ref, etc.) and when React tried to
  // coerce it to a string using `'' + value`, an exception was thrown.
  //
  // The most common types that will cause this exception are `Symbol` instances
  // and Temporal objects like `Temporal.Instant`. But any object that has a
  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
  // exception. (Library authors do this to prevent users from using built-in
  // numeric operators like `+` or comparison operators like `>=` because custom
  // methods are needed to perform accurate arithmetic or comparison.)
  //
  // To fix the problem, coerce this object or symbol value to a string before
  // passing it to React. The most reliable way is usually `String(value)`.
  //
  // To find which value is throwing, check the browser or debugger console.
  // Before this exception was thrown, there should be `console.error` output
  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
  // problem and how that type was used: key, atrribute, input value prop, etc.
  // In most cases, this console output also shows the component and its
  // ancestor components where the exception happened.
  //
  // eslint-disable-next-line react-internal/safe-string-coercion
  return '' + value;
}
function checkKeyStringCoercion(value) {
  {
    if (willCoercionThrow(value)) {
      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before using it here.', typeName(value));

      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
    }
  }
}

var REACT_CLIENT_REFERENCE$1 = Symbol.for('react.client.reference');
function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || enableRenderableContext  || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    type.$$typeof === REACT_CLIENT_REFERENCE$1 || type.getModuleId !== undefined) {
      return true;
    }
  }

  return false;
}

var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      }; // $FlowFixMe[cannot-write] Flow thinks console is immutable.

      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;

    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      }; // $FlowFixMe[cannot-write] Flow thinks console is immutable.

      Object.defineProperties(console, {
        log: assign({}, props, {
          value: prevLog
        }),
        info: assign({}, props, {
          value: prevInfo
        }),
        warn: assign({}, props, {
          value: prevWarn
        }),
        error: assign({}, props, {
          value: prevError
        }),
        group: assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: assign({}, props, {
          value: prevGroupEnd
        })
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;

{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}
/**
 * Leverages native browser/VM stack frames to get proper details (e.g.
 * filename, line + col number) for a single component in a component stack. We
 * do this by:
 *   (1) throwing and catching an error in the function - this will be our
 *       control error.
 *   (2) calling the component which will eventually throw an error that we'll
 *       catch - this will be our sample error.
 *   (3) diffing the control and sample error stacks to find the stack frame
 *       which represents our component.
 */


function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if (!fn || reentry) {
    return '';
  }

  {
    var frame = componentFrameCache.get(fn);

    if (frame !== undefined) {
      return frame;
    }
  }

  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe[incompatible-type] It does accept undefined.

  Error.prepareStackTrace = undefined;
  var previousDispatcher;

  {
    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
    // for warnings.

    ReactCurrentDispatcher.current = null;
    disableLogs();
  }
  /**
   * Finding a common stack frame between sample and control errors can be
   * tricky given the different types and levels of stack trace truncation from
   * different JS VMs. So instead we'll attempt to control what that common
   * frame should be through this object method:
   * Having both the sample and control errors be in the function under the
   * `DescribeNativeComponentFrameRoot` property, + setting the `name` and
   * `displayName` properties of the function ensures that a stack
   * frame exists that has the method name `DescribeNativeComponentFrameRoot` in
   * it for both control and sample stacks.
   */


  var RunInRootFrame = {
    DetermineComponentFrameRoot: function () {
      var control;

      try {
        // This should throw.
        if (construct) {
          // Something should be setting the props in the constructor.
          var Fake = function () {
            throw Error();
          }; // $FlowFixMe[prop-missing]


          Object.defineProperty(Fake.prototype, 'props', {
            set: function () {
              // We use a throwing setter instead of frozen or non-writable props
              // because that won't throw in a non-strict mode function.
              throw Error();
            }
          });

          if (typeof Reflect === 'object' && Reflect.construct) {
            // We construct a different control for this case to include any extra
            // frames added by the construct call.
            try {
              Reflect.construct(Fake, []);
            } catch (x) {
              control = x;
            }

            Reflect.construct(fn, [], Fake);
          } else {
            try {
              Fake.call();
            } catch (x) {
              control = x;
            } // $FlowFixMe[prop-missing] found when upgrading Flow


            fn.call(Fake.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (x) {
            control = x;
          } // TODO(luna): This will currently only throw if the function component
          // tries to access React/ReactDOM/props. We should probably make this throw
          // in simple components too


          var maybePromise = fn(); // If the function component returns a promise, it's likely an async
          // component, which we don't yet support. Attach a noop catch handler to
          // silence the error.
          // TODO: Implement component stacks for async client components?

          if (maybePromise && typeof maybePromise.catch === 'function') {
            maybePromise.catch(function () {});
          }
        }
      } catch (sample) {
        // This is inlined manually because closure doesn't do it for us.
        if (sample && control && typeof sample.stack === 'string') {
          return [sample.stack, control.stack];
        }
      }

      return [null, null];
    }
  }; // $FlowFixMe[prop-missing]

  RunInRootFrame.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
  var namePropDescriptor = Object.getOwnPropertyDescriptor(RunInRootFrame.DetermineComponentFrameRoot, 'name'); // Before ES6, the `name` property was not configurable.

  if (namePropDescriptor && namePropDescriptor.configurable) {
    // V8 utilizes a function's `name` property when generating a stack trace.
    Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot, // Configurable properties can be updated even if its writable descriptor
    // is set to `false`.
    // $FlowFixMe[cannot-write]
    'name', {
      value: 'DetermineComponentFrameRoot'
    });
  }

  try {
    var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(),
        sampleStack = _RunInRootFrame$Deter[0],
        controlStack = _RunInRootFrame$Deter[1];

    if (sampleStack && controlStack) {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sampleStack.split('\n');
      var controlLines = controlStack.split('\n');
      var s = 0;
      var c = 0;

      while (s < sampleLines.length && !sampleLines[s].includes('DetermineComponentFrameRoot')) {
        s++;
      }

      while (c < controlLines.length && !controlLines[c].includes('DetermineComponentFrameRoot')) {
        c++;
      } // We couldn't find our intentionally injected common root frame, attempt
      // to find another common root frame by search from the bottom of the
      // control stack...


      if (s === sampleLines.length || c === controlLines.length) {
        s = sampleLines.length - 1;
        c = controlLines.length - 1;

        while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
          // We expect at least one stack frame to be shared.
          // Typically this will be the root most one. However, stack frames may be
          // cut off due to maximum stack limits. In this case, one maybe cut off
          // earlier than the other. We assume that the sample is longer or the same
          // and there for cut off earlier. So we should find the root most frame in
          // the sample somewhere in the control.
          c--;
        }
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                // but we have a user-provided "displayName"
                // splice it in to make the stack more readable.


                if (fn.displayName && _frame.includes('<anonymous>')) {
                  _frame = _frame.replace('<anonymous>', fn.displayName);
                }

                if (true) {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                } // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    {
      ReactCurrentDispatcher.current = previousDispatcher;
      reenableLogs();
    }

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }

  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function describeUnknownElementTypeFrameInDEV(type, ownerFn) {

  if (type == null) {
    return '';
  }

  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }

  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }

  switch (type) {
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame('Suspense');

    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);

      case REACT_MEMO_TYPE:
        // Memo may contain any component type so we recursively resolve it.
        return describeUnknownElementTypeFrameInDEV(type.type, ownerFn);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(init(payload), ownerFn);
          } catch (x) {}
        }
    }
  }

  return '';
}

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
var REACT_CLIENT_REFERENCE = Symbol.for('react.client.reference');
var specialPropKeyWarningShown;
var specialPropRefWarningShown;
var didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function warnIfStringRefCannotBeAutoConverted(config, self) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}

function defineKeyPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
}

function defineRefPropWarningGetter(props, displayName) {
  {
    {
      var warnAboutAccessingRef = function () {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;

          error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
        }
      };

      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


function ReactElement(type, key, _ref, self, source, owner, props) {
  var ref;

  {
    ref = _ref;
  }

  var element;

  {
    // In prod, `ref` is a regular property. It will be removed in a
    // future release.
    element = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: REACT_ELEMENT_TYPE,
      // Built-in properties that belong on the element
      type: type,
      key: key,
      ref: ref,
      props: props,
      // Record the component responsible for creating this element.
      _owner: owner
    };
  }

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // debugInfo contains Server Component debug information.

    Object.defineProperty(element, '_debugInfo', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: null
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
}
var didWarnAboutKeySpread = {};
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */

function jsxDEV$1(type, config, maybeKey, isStaticChildren, source, self) {
  {
    if (!isValidElementType(type)) {
      // This is an invalid element type.
      //
      // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    } else {
      // This is a valid element type.
      // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing
      // errors. We don't want exception behavior to differ between dev and
      // prod. (Rendering will throw with a helpful message and as soon as the
      // type is fixed, the key warnings will appear.)
      var children = config.children;

      if (children !== undefined) {
        if (isStaticChildren) {
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              validateChildKeys(children[i], type);
            }

            if (Object.freeze) {
              Object.freeze(children);
            }
          } else {
            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
          }
        } else {
          validateChildKeys(children, type);
        }
      }
    } // Warn about key spread regardless of whether the type is valid.


    if (hasOwnProperty.call(config, 'key')) {
      var componentName = getComponentNameFromType(type);
      var keys = Object.keys(config).filter(function (k) {
        return k !== 'key';
      });
      var beforeExample = keys.length > 0 ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}';

      if (!didWarnAboutKeySpread[componentName + beforeExample]) {
        var afterExample = keys.length > 0 ? '{' + keys.join(': ..., ') + ': ...}' : '{}';

        error('A props object containing a "key" prop is being spread into JSX:\n' + '  let props = %s;\n' + '  <%s {...props} />\n' + 'React keys must be passed directly to JSX without using spread:\n' + '  let props = %s;\n' + '  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);

        didWarnAboutKeySpread[componentName + beforeExample] = true;
      }
    }

    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
    // but as an intermediary step, we will use jsxDEV for everything except
    // <div {...props} key="Hi" />, because we aren't currently able to tell if
    // key is explicitly declared to be undefined or not.

    if (maybeKey !== undefined) {
      {
        checkKeyStringCoercion(maybeKey);
      }

      key = '' + maybeKey;
    }

    if (hasValidKey(config)) {
      {
        checkKeyStringCoercion(config.key);
      }

      key = '' + config.key;
    }

    if (hasValidRef(config)) {
      {
        ref = config.ref;
      }

      warnIfStringRefCannotBeAutoConverted(config, self);
    } // Remaining properties are added to a new props object


    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && // Skip over reserved prop names
      propName !== 'key' && (propName !== 'ref')) {
        props[propName] = config[propName];
      }
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }

    var element = ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);

    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    }

    return element;
  }
}

function getDeclarationErrorAddendum() {
  {
    if (ReactCurrentOwner.current) {
      var name = getComponentNameFromType(ReactCurrentOwner.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  {
    if (typeof node !== 'object' || !node) {
      return;
    }

    if (node.$$typeof === REACT_CLIENT_REFERENCE) ; else if (isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */


function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
var ownerHasKeyUseWarning = {};
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */

function validateExplicitKey(element, parentType) {
  {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement(null);
  }
}

function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, owner ? owner.type : null);
      ReactDebugCurrentFrame.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame.setExtraStackFrame(null);
    }
  }
}

function getCurrentComponentErrorInfo(parentType) {
  {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = getComponentNameFromType(parentType);

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  // TODO: Move this to render phase instead of at element creation.
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement(null);
    }
  }
}

var jsxDEV = jsxDEV$1 ;

exports.Fragment = REACT_FRAGMENT_TYPE;
exports.jsxDEV = jsxDEV;
  })();
}


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js":
/*!********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js ***!
  \********************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-jsx-dev-runtime.development.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js");
}


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/OverloadYield.js":
/*!****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/OverloadYield.js ***!
  \****************************************************************************************************/
/***/ (function(module) {

function _OverloadYield(e, d) {
  this.v = e, this.k = d;
}
module.exports = _OverloadYield, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*******************************************************************************************************/
/***/ (function(module) {

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \*****************************************************************************************************/
/***/ (function(module) {

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \************************************************************************************************************/
/***/ (function(module) {

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*******************************************************************************************************/
/***/ (function(module) {

function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \*****************************************************************************************************/
/***/ (function(module) {

function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/construct.js":
/*!************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/construct.js ***!
  \************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js");
var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/setPrototypeOf.js");
function _construct(t, e, r) {
  if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && setPrototypeOf(p, r.prototype), p;
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/createClass.js":
/*!**************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/createClass.js ***!
  \**************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/toPropertyKey.js");
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/defineProperty.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \*****************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/toPropertyKey.js");
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \*****************************************************************************************************/
/***/ (function(module) {

function _getPrototypeOf(t) {
  return module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _getPrototypeOf(t);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/inherits.js":
/*!***********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/inherits.js ***!
  \***********************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/setPrototypeOf.js");
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && setPrototypeOf(t, e);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \************************************************************************************************************/
/***/ (function(module) {

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/isNativeFunction.js":
/*!*******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/isNativeFunction.js ***!
  \*******************************************************************************************************/
/***/ (function(module) {

function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf("[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}
module.exports = _isNativeFunction, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js":
/*!***************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \***************************************************************************************************************/
/***/ (function(module) {

function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (module.exports = _isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!***********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \***********************************************************************************************************/
/***/ (function(module) {

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \******************************************************************************************************/
/***/ (function(module) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!****************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \****************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/typeof.js")["default"]);
var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/assertThisInitialized.js");
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return assertThisInitialized(t);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regenerator.js":
/*!**************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regenerator.js ***!
  \**************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var regeneratorDefine = __webpack_require__(/*! ./regeneratorDefine.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorDefine.js");
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function d(t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), regeneratorDefine(u), regeneratorDefine(u, o, "Generator"), regeneratorDefine(u, n, function () {
    return this;
  }), regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (module.exports = _regenerator = function _regenerator() {
    return {
      w: i,
      m: f
    };
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _regenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorAsync.js":
/*!*******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorAsync.js ***!
  \*******************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var regeneratorAsyncGen = __webpack_require__(/*! ./regeneratorAsyncGen.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js");
function _regeneratorAsync(n, e, r, t, o) {
  var a = regeneratorAsyncGen(n, e, r, t, o);
  return a.next().then(function (n) {
    return n.done ? n.value : a.next();
  });
}
module.exports = _regeneratorAsync, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js":
/*!**********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js ***!
  \**********************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var regenerator = __webpack_require__(/*! ./regenerator.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regenerator.js");
var regeneratorAsyncIterator = __webpack_require__(/*! ./regeneratorAsyncIterator.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js");
function _regeneratorAsyncGen(r, e, t, o, n) {
  return new regeneratorAsyncIterator(regenerator().w(r, e, t, o), n || Promise);
}
module.exports = _regeneratorAsyncGen, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js":
/*!***************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js ***!
  \***************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var OverloadYield = __webpack_require__(/*! ./OverloadYield.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/OverloadYield.js");
var regeneratorDefine = __webpack_require__(/*! ./regeneratorDefine.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorDefine.js");
function AsyncIterator(t, e) {
  function n(r, o, i, f) {
    try {
      var c = t[r](o),
        u = c.value;
      return u instanceof OverloadYield ? e.resolve(u.v).then(function (t) {
        n("next", t, i, f);
      }, function (t) {
        n("throw", t, i, f);
      }) : e.resolve(u).then(function (t) {
        c.value = t, i(c);
      }, function (t) {
        return n("throw", t, i, f);
      });
    } catch (t) {
      f(t);
    }
  }
  var r;
  this.next || (regeneratorDefine(AsyncIterator.prototype), regeneratorDefine(AsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () {
    return this;
  })), regeneratorDefine(this, "_invoke", function (t, o, i) {
    function f() {
      return new e(function (e, r) {
        n(t, i, e, r);
      });
    }
    return r = r ? r.then(f, f) : f();
  }, !0);
}
module.exports = AsyncIterator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorDefine.js":
/*!********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorDefine.js ***!
  \********************************************************************************************************/
/***/ (function(module) {

function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  module.exports = _regeneratorDefine = function regeneratorDefine(e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _regeneratorDefine(e, r, n, t);
}
module.exports = _regeneratorDefine, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorKeys.js":
/*!******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorKeys.js ***!
  \******************************************************************************************************/
/***/ (function(module) {

function _regeneratorKeys(e) {
  var n = Object(e),
    r = [];
  for (var t in n) r.unshift(t);
  return function e() {
    for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e;
    return e.done = !0, e;
  };
}
module.exports = _regeneratorKeys, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*********************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var OverloadYield = __webpack_require__(/*! ./OverloadYield.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/OverloadYield.js");
var regenerator = __webpack_require__(/*! ./regenerator.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regenerator.js");
var regeneratorAsync = __webpack_require__(/*! ./regeneratorAsync.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorAsync.js");
var regeneratorAsyncGen = __webpack_require__(/*! ./regeneratorAsyncGen.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js");
var regeneratorAsyncIterator = __webpack_require__(/*! ./regeneratorAsyncIterator.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js");
var regeneratorKeys = __webpack_require__(/*! ./regeneratorKeys.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorKeys.js");
var regeneratorValues = __webpack_require__(/*! ./regeneratorValues.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorValues.js");
function _regeneratorRuntime() {
  "use strict";

  var r = regenerator(),
    e = r.m(_regeneratorRuntime),
    t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
  function n(r) {
    var e = "function" == typeof r && r.constructor;
    return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name));
  }
  var o = {
    "throw": 1,
    "return": 2,
    "break": 3,
    "continue": 3
  };
  function a(r) {
    var e, t;
    return function (n) {
      e || (e = {
        stop: function stop() {
          return t(n.a, 2);
        },
        "catch": function _catch() {
          return n.v;
        },
        abrupt: function abrupt(r, e) {
          return t(n.a, o[r], e);
        },
        delegateYield: function delegateYield(r, o, a) {
          return e.resultName = o, t(n.d, regeneratorValues(r), a);
        },
        finish: function finish(r) {
          return t(n.f, r);
        }
      }, t = function t(r, _t, o) {
        n.p = e.prev, n.n = e.next;
        try {
          return r(_t, o);
        } finally {
          e.next = n.n;
        }
      }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n;
      try {
        return r.call(this, e);
      } finally {
        n.p = e.prev, n.n = e.next;
      }
    };
  }
  return (module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return {
      wrap: function wrap(e, t, n, o) {
        return r.w(a(e), t, n, o && o.reverse());
      },
      isGeneratorFunction: n,
      mark: r.m,
      awrap: function awrap(r, e) {
        return new OverloadYield(r, e);
      },
      AsyncIterator: regeneratorAsyncIterator,
      async: function async(r, e, t, o, u) {
        return (n(e) ? regeneratorAsyncGen : regeneratorAsync)(a(r), e, t, o, u);
      },
      keys: regeneratorKeys,
      values: regeneratorValues
    };
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorValues.js":
/*!********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorValues.js ***!
  \********************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorValues(e) {
  if (null != e) {
    var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"],
      r = 0;
    if (t) return t.call(e);
    if ("function" == typeof e.next) return e;
    if (!isNaN(e.length)) return {
      next: function next() {
        return e && r >= e.length && (e = void 0), {
          value: e && e[r++],
          done: !e
        };
      }
    };
  }
  throw new TypeError(_typeof(e) + " is not iterable");
}
module.exports = _regeneratorValues, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \*****************************************************************************************************/
/***/ (function(module) {

function _setPrototypeOf(t, e) {
  return module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _setPrototypeOf(t, e);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \****************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/arrayWithHoles.js");
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/nonIterableRest.js");
function _slicedToArray(r, e) {
  return arrayWithHoles(r) || iterableToArrayLimit(r, e) || unsupportedIterableToArray(r, e) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/toPrimitive.js":
/*!**************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \**************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/toPropertyKey.js":
/*!****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \****************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/typeof.js")["default"]);
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/toPrimitive.js");
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/typeof.js":
/*!*********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/typeof.js ***!
  \*********************************************************************************************/
/***/ (function(module) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!*****************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \*****************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/arrayLikeToArray.js");
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
  }
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/wrapNativeSuper.js":
/*!******************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/wrapNativeSuper.js ***!
  \******************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/getPrototypeOf.js");
var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/setPrototypeOf.js");
var isNativeFunction = __webpack_require__(/*! ./isNativeFunction.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/isNativeFunction.js");
var construct = __webpack_require__(/*! ./construct.js */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/construct.js");
function _wrapNativeSuper(t) {
  var r = "function" == typeof Map ? new Map() : void 0;
  return module.exports = _wrapNativeSuper = function _wrapNativeSuper(t) {
    if (null === t || !isNativeFunction(t)) return t;
    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r) {
      if (r.has(t)) return r.get(t);
      r.set(t, Wrapper);
    }
    function Wrapper() {
      return construct(t, arguments, getPrototypeOf(this).constructor);
    }
    return Wrapper.prototype = Object.create(t.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), setPrototypeOf(Wrapper, t);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _wrapNativeSuper(t);
}
module.exports = _wrapNativeSuper, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/regenerator/index.js":
/*!************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/regenerator/index.js ***!
  \************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-compose-refs/dist/index.mjs":
/*!********************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-compose-refs/dist/index.mjs ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   composeRefs: function() { return /* binding */ composeRefs; },
/* harmony export */   useComposedRefs: function() { return /* binding */ useComposedRefs; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js");
// packages/react/compose-refs/src/composeRefs.tsx

function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => refs.forEach((ref) => setRef(ref, node));
}
function useComposedRefs(...refs) {
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(composeRefs(...refs), refs);
}

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-label/dist/index.mjs":
/*!*************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-label/dist/index.mjs ***!
  \*************************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Label: function() { return /* binding */ Label; },
/* harmony export */   Root: function() { return /* binding */ Root; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js");
/* harmony import */ var _radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-primitive */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-primitive/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/jsx-runtime.js");
/* __next_internal_client_entry_do_not_use__ Label,Root auto */ // packages/react/label/src/Label.tsx



var NAME = "Label";
var Label = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(_c = (props, forwardedRef)=>{
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_radix_ui_react_primitive__WEBPACK_IMPORTED_MODULE_2__.Primitive.label, {
        ...props,
        ref: forwardedRef,
        onMouseDown: (event)=>{
            const target = event.target;
            if (target.closest("button, input, select, textarea")) return;
            props.onMouseDown?.(event);
            if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
        }
    });
});
_c1 = Label;
Label.displayName = NAME;
var Root = Label;
 //# sourceMappingURL=index.mjs.map
var _c, _c1;
$RefreshReg$(_c, "Label$React.forwardRef");
$RefreshReg$(_c1, "Label");


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-primitive/dist/index.mjs":
/*!*****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-primitive/dist/index.mjs ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Primitive: function() { return /* binding */ Primitive; },
/* harmony export */   Root: function() { return /* binding */ Root; },
/* harmony export */   dispatchDiscreteCustomEvent: function() { return /* binding */ dispatchDiscreteCustomEvent; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react-dom/index.js");
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-slot */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-slot/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/jsx-runtime.js");
// packages/react/primitive/src/Primitive.tsx




var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Node = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__.Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
  if (target) react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync(() => target.dispatchEvent(event));
}
var Root = Primitive;

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-slot/dist/index.mjs":
/*!************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-slot/dist/index.mjs ***!
  \************************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Root: function() { return /* binding */ Root; },
/* harmony export */   Slot: function() { return /* binding */ Slot; },
/* harmony export */   Slottable: function() { return /* binding */ Slottable; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js");
/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-compose-refs/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/jsx-runtime.js");
// packages/react/slot/src/Slot.tsx



var Slot = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = react__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);
  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (react__WEBPACK_IMPORTED_MODULE_0__.Children.count(newElement) > 1) return react__WEBPACK_IMPORTED_MODULE_0__.Children.only(null);
        return react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(newElement) ? newElement.props.children : null;
      } else {
        return child;
      }
    });
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children: react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(newElement) ? react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(newElement, void 0, newChildren) : null });
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(SlotClone, { ...slotProps, ref: forwardedRef, children });
});
Slot.displayName = "Slot";
var SlotClone = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  if (react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(children)) {
    const childrenRef = getElementRef(children);
    return react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(children, {
      ...mergeProps(slotProps, children.props),
      // @ts-ignore
      ref: forwardedRef ? (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_2__.composeRefs)(forwardedRef, childrenRef) : childrenRef
    });
  }
  return react__WEBPACK_IMPORTED_MODULE_0__.Children.count(children) > 1 ? react__WEBPACK_IMPORTED_MODULE_0__.Children.only(null) : null;
});
SlotClone.displayName = "SlotClone";
var Slottable = ({ children }) => {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, { children });
};
function isSlottable(child) {
  return react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(child) && child.type === Slottable;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var Root = Slot;

//# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/class-variance-authority/dist/index.mjs":
/*!****************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/class-variance-authority/dist/index.mjs ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cva: function() { return /* binding */ cva; },
/* harmony export */   cx: function() { return /* binding */ cx; }
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/class-variance-authority/node_modules/clsx/dist/clsx.mjs");

const falsyToString = (value)=>typeof value === "boolean" ? "".concat(value) : value === 0 ? "0" : value;
const cx = clsx__WEBPACK_IMPORTED_MODULE_0__.clsx;
const cva = (base, config)=>{
    return (props)=>{
        var ref;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants , defaultVariants  } = config;
        const getVariantClassNames = Object.keys(variants).map((variant)=>{
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param)=>{
            let [key, value] = param;
            if (value === undefined) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (ref = config.compoundVariants) === null || ref === void 0 ? void 0 : ref.reduce((acc, param1)=>{
            let { class: cvClass , className: cvClassName , ...compoundVariantOptions } = param1;
            return Object.entries(compoundVariantOptions).every((param)=>{
                let [key, value] = param;
                return Array.isArray(value) ? value.includes({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                }[key]) : ({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                })[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };
};


//# sourceMappingURL=index.mjs.map

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/class-variance-authority/node_modules/clsx/dist/clsx.mjs":
/*!*********************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/class-variance-authority/node_modules/clsx/dist/clsx.mjs ***!
  \*********************************************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clsx: function() { return /* binding */ clsx; }
/* harmony export */ });
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ __webpack_exports__["default"] = (clsx);

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/clsx/dist/clsx.mjs":
/*!*******************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/clsx/dist/clsx.mjs ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clsx: function() { return /* binding */ clsx; }
/* harmony export */ });
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ __webpack_exports__["default"] = (clsx);

/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/goober/dist/goober.modern.js":
/*!*****************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/goober/dist/goober.modern.js ***!
  \*****************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   css: function() { return /* binding */ u; },
/* harmony export */   extractCss: function() { return /* binding */ r; },
/* harmony export */   glob: function() { return /* binding */ b; },
/* harmony export */   keyframes: function() { return /* binding */ h; },
/* harmony export */   setup: function() { return /* binding */ m; },
/* harmony export */   styled: function() { return /* binding */ w; }
/* harmony export */ });
let e={data:""},t=t=>{if("object"==typeof window){let e=(t?t.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return e.nonce=window.__nonce__,e.parentNode||(t||document.head).appendChild(e),e.firstChild}return t||e},r=e=>{let r=t(e),l=r.data;return r.data="",l},l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,a=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,o=(e,t)=>{let r="",l="",a="";for(let n in e){let c=e[n];"@"==n[0]?"i"==n[1]?r=n+" "+c+";":l+="f"==n[1]?o(c,n):n+"{"+o(c,"k"==n[1]?"":t)+"}":"object"==typeof c?l+=o(c,t?t.replace(/([^,])+/g,e=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):n):null!=c&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=o.p?o.p(n,c):n+":"+c+";")}return r+(t&&a?t+"{"+a+"}":a)+l},c={},s=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+s(e[r]);return t}return e},i=(e,t,r,i,p)=>{let u=s(e),d=c[u]||(c[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(u));if(!c[d]){let t=u!==e?e:(e=>{let t,r,o=[{}];for(;t=l.exec(e.replace(a,""));)t[4]?o.shift():t[3]?(r=t[3].replace(n," ").trim(),o.unshift(o[0][r]=o[0][r]||{})):o[0][t[1]]=t[2].replace(n," ").trim();return o[0]})(e);c[d]=o(p?{["@keyframes "+d]:t}:t,r?"":"."+d)}let f=r&&c.g?c.g:null;return r&&(c.g=c[d]),((e,t,r,l)=>{l?t.data=t.data.replace(l,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(c[d],t,i,f),d},p=(e,t,r)=>e.reduce((e,l,a)=>{let n=t[a];if(n&&n.call){let e=n(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;n=t?"."+t:e&&"object"==typeof e?e.props?"":o(e,""):!1===e?"":e}return e+l+(null==n?"":n)},"");function u(e){let r=this||{},l=e.call?e(r.p):e;return i(l.unshift?l.raw?p(l,[].slice.call(arguments,1),r.p):l.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):l,t(r.target),r.g,r.o,r.k)}let d,f,g,b=u.bind({g:1}),h=u.bind({k:1});function m(e,t,r,l){o.p=t,d=e,f=r,g=l}function w(e,t){let r=this||{};return function(){let l=arguments;function a(n,o){let c=Object.assign({},n),s=c.className||a.className;r.p=Object.assign({theme:f&&f()},c),r.o=/ *go\d+/.test(s),c.className=u.apply(r,l)+(s?" "+s:""),t&&(c.ref=o);let i=e;return e[0]&&(i=c.as||e,delete c.as),g&&i[0]&&g(c),d(i,c)}return t?t(a):a}}


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/react-hot-toast/dist/index.mjs":
/*!*******************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/react-hot-toast/dist/index.mjs ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckmarkIcon: function() { return /* binding */ w; },
/* harmony export */   ErrorIcon: function() { return /* binding */ _; },
/* harmony export */   LoaderIcon: function() { return /* binding */ V; },
/* harmony export */   ToastBar: function() { return /* binding */ F; },
/* harmony export */   ToastIcon: function() { return /* binding */ M; },
/* harmony export */   Toaster: function() { return /* binding */ Ie; },
/* harmony export */   "default": function() { return /* binding */ _t; },
/* harmony export */   resolveValue: function() { return /* binding */ T; },
/* harmony export */   toast: function() { return /* binding */ n; },
/* harmony export */   useToaster: function() { return /* binding */ D; },
/* harmony export */   useToasterStore: function() { return /* binding */ I; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/compiled/react/index.js");
/* harmony import */ var goober__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! goober */ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/goober/dist/goober.modern.js");
/* __next_internal_client_entry_do_not_use__ CheckmarkIcon,ErrorIcon,LoaderIcon,ToastBar,ToastIcon,Toaster,default,resolveValue,toast,useToaster,useToasterStore auto */ var _s = $RefreshSig$();
var W = (e)=>typeof e == "function", T = (e, t)=>W(e) ? e(t) : e;
var U = (()=>{
    let e = 0;
    return ()=>(++e).toString();
})(), b = (()=>{
    let e;
    return ()=>{
        if (e === void 0 && typeof window < "u") {
            let t = matchMedia("(prefers-reduced-motion: reduce)");
            e = !t || t.matches;
        }
        return e;
    };
})();

var Q = 20;
var S = new Map, X = 1e3, $ = (e)=>{
    if (S.has(e)) return;
    let t = setTimeout(()=>{
        S.delete(e), u({
            type: 4,
            toastId: e
        });
    }, X);
    S.set(e, t);
}, J = (e)=>{
    let t = S.get(e);
    t && clearTimeout(t);
}, v = (e, t)=>{
    switch(t.type){
        case 0:
            return {
                ...e,
                toasts: [
                    t.toast,
                    ...e.toasts
                ].slice(0, Q)
            };
        case 1:
            return t.toast.id && J(t.toast.id), {
                ...e,
                toasts: e.toasts.map((r)=>r.id === t.toast.id ? {
                        ...r,
                        ...t.toast
                    } : r)
            };
        case 2:
            let { toast: o } = t;
            return e.toasts.find((r)=>r.id === o.id) ? v(e, {
                type: 1,
                toast: o
            }) : v(e, {
                type: 0,
                toast: o
            });
        case 3:
            let { toastId: s } = t;
            return s ? $(s) : e.toasts.forEach((r)=>{
                $(r.id);
            }), {
                ...e,
                toasts: e.toasts.map((r)=>r.id === s || s === void 0 ? {
                        ...r,
                        visible: !1
                    } : r)
            };
        case 4:
            return t.toastId === void 0 ? {
                ...e,
                toasts: []
            } : {
                ...e,
                toasts: e.toasts.filter((r)=>r.id !== t.toastId)
            };
        case 5:
            return {
                ...e,
                pausedAt: t.time
            };
        case 6:
            let a = t.time - (e.pausedAt || 0);
            return {
                ...e,
                pausedAt: void 0,
                toasts: e.toasts.map((r)=>({
                        ...r,
                        pauseDuration: r.pauseDuration + a
                    }))
            };
    }
}, A = [], P = {
    toasts: [],
    pausedAt: void 0
}, u = (e)=>{
    P = v(P, e), A.forEach((t)=>{
        t(P);
    });
}, Y = {
    blank: 4e3,
    error: 4e3,
    success: 2e3,
    loading: 1 / 0,
    custom: 4e3
}, I = (e = {})=>{
    let [t, o] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(P);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>(A.push(o), ()=>{
            let a = A.indexOf(o);
            a > -1 && A.splice(a, 1);
        }), [
        t
    ]);
    let s = t.toasts.map((a)=>{
        var r, c;
        return {
            ...e,
            ...e[a.type],
            ...a,
            duration: a.duration || ((r = e[a.type]) == null ? void 0 : r.duration) || (e == null ? void 0 : e.duration) || Y[a.type],
            style: {
                ...e.style,
                ...(c = e[a.type]) == null ? void 0 : c.style,
                ...a.style
            }
        };
    });
    return {
        ...t,
        toasts: s
    };
};
var G = (e, t = "blank", o)=>({
        createdAt: Date.now(),
        visible: !0,
        type: t,
        ariaProps: {
            role: "status",
            "aria-live": "polite"
        },
        message: e,
        pauseDuration: 0,
        ...o,
        id: (o == null ? void 0 : o.id) || U()
    }), h = (e)=>(t, o)=>{
        let s = G(t, e, o);
        return u({
            type: 2,
            toast: s
        }), s.id;
    }, n = (e, t)=>h("blank")(e, t);
n.error = h("error");
n.success = h("success");
n.loading = h("loading");
n.custom = h("custom");
n.dismiss = (e)=>{
    u({
        type: 3,
        toastId: e
    });
};
n.remove = (e)=>u({
        type: 4,
        toastId: e
    });
n.promise = (e, t, o)=>{
    let s = n.loading(t.loading, {
        ...o,
        ...o == null ? void 0 : o.loading
    });
    return e.then((a)=>(n.success(T(t.success, a), {
            id: s,
            ...o,
            ...o == null ? void 0 : o.success
        }), a)).catch((a)=>{
        n.error(T(t.error, a), {
            id: s,
            ...o,
            ...o == null ? void 0 : o.error
        });
    }), e;
};

var Z = (e, t)=>{
    u({
        type: 1,
        toast: {
            id: e,
            height: t
        }
    });
}, ee = ()=>{
    u({
        type: 5,
        time: Date.now()
    });
}, D = (e)=>{
    let { toasts: t, pausedAt: o } = I(e);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (o) return;
        let r = Date.now(), c = t.map((i)=>{
            if (i.duration === 1 / 0) return;
            let d = (i.duration || 0) + i.pauseDuration - (r - i.createdAt);
            if (d < 0) {
                i.visible && n.dismiss(i.id);
                return;
            }
            return setTimeout(()=>n.dismiss(i.id), d);
        });
        return ()=>{
            c.forEach((i)=>i && clearTimeout(i));
        };
    }, [
        t,
        o
    ]);
    let s = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        o && u({
            type: 6,
            time: Date.now()
        });
    }, [
        o
    ]), a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((r, c)=>{
        let { reverseOrder: i = !1, gutter: d = 8, defaultPosition: p } = c || {}, g = t.filter((m)=>(m.position || p) === (r.position || p) && m.height), E = g.findIndex((m)=>m.id === r.id), x = g.filter((m, R)=>R < E && m.visible).length;
        return g.filter((m)=>m.visible).slice(...i ? [
            x + 1
        ] : [
            0,
            x
        ]).reduce((m, R)=>m + (R.height || 0) + d, 0);
    }, [
        t
    ]);
    return {
        toasts: t,
        handlers: {
            updateHeight: Z,
            startPause: ee,
            endPause: s,
            calculateOffset: a
        }
    };
};





var oe = (0,goober__WEBPACK_IMPORTED_MODULE_1__.keyframes)`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`, re = (0,goober__WEBPACK_IMPORTED_MODULE_1__.keyframes)`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`, se = (0,goober__WEBPACK_IMPORTED_MODULE_1__.keyframes)`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`, _ = (0,goober__WEBPACK_IMPORTED_MODULE_1__.styled)("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e)=>e.primary || "#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${oe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${re} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${(e)=>e.secondary || "#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${se} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`;

var ne = (0,goober__WEBPACK_IMPORTED_MODULE_1__.keyframes)`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`, V = (0,goober__WEBPACK_IMPORTED_MODULE_1__.styled)("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(e)=>e.secondary || "#e0e0e0"};
  border-right-color: ${(e)=>e.primary || "#616161"};
  animation: ${ne} 1s linear infinite;
`;

var pe = (0,goober__WEBPACK_IMPORTED_MODULE_1__.keyframes)`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`, de = (0,goober__WEBPACK_IMPORTED_MODULE_1__.keyframes)`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`, w = (0,goober__WEBPACK_IMPORTED_MODULE_1__.styled)("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e)=>e.primary || "#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${pe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${de} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(e)=>e.secondary || "#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`;
var ue = (0,goober__WEBPACK_IMPORTED_MODULE_1__.styled)("div")`
  position: absolute;
`, le = (0,goober__WEBPACK_IMPORTED_MODULE_1__.styled)("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`, Te = (0,goober__WEBPACK_IMPORTED_MODULE_1__.keyframes)`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`, fe = (0,goober__WEBPACK_IMPORTED_MODULE_1__.styled)("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Te} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`, M = ({ toast: e })=>{
    let { icon: t, type: o, iconTheme: s } = e;
    return t !== void 0 ? typeof t == "string" ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(fe, null, t) : t : o === "blank" ? null : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(le, null, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(V, {
        ...s
    }), o !== "loading" && /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ue, null, o === "error" ? /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_, {
        ...s
    }) : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(w, {
        ...s
    })));
};
var ye = (e)=>`
0% {transform: translate3d(0,${e * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`, ge = (e)=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e * -150}%,-1px) scale(.6); opacity:0;}
`, he = "0%{opacity:0;} 100%{opacity:1;}", xe = "0%{opacity:1;} 100%{opacity:0;}", be = (0,goober__WEBPACK_IMPORTED_MODULE_1__.styled)("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`, Se = (0,goober__WEBPACK_IMPORTED_MODULE_1__.styled)("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`, Ae = (e, t)=>{
    let s = e.includes("top") ? 1 : -1, [a, r] = b() ? [
        he,
        xe
    ] : [
        ye(s),
        ge(s)
    ];
    return {
        animation: t ? `${(0,goober__WEBPACK_IMPORTED_MODULE_1__.keyframes)(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards` : `${(0,goober__WEBPACK_IMPORTED_MODULE_1__.keyframes)(r)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`
    };
}, F = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.memo(({ toast: e, position: t, style: o, children: s })=>{
    let a = e.height ? Ae(e.position || t || "top-center", e.visible) : {
        opacity: 0
    }, r = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(M, {
        toast: e
    }), c = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Se, {
        ...e.ariaProps
    }, T(e.message, e));
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(be, {
        className: e.className,
        style: {
            ...a,
            ...o,
            ...e.style
        }
    }, typeof s == "function" ? s({
        icon: r,
        message: c
    }) : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, r, c));
});


(0,goober__WEBPACK_IMPORTED_MODULE_1__.setup)(react__WEBPACK_IMPORTED_MODULE_0__.createElement);
var Ee = ({ id: e, className: t, style: o, onHeightUpdate: s, children: a })=>{
    _s();
    let r = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((c)=>{
        if (c) {
            let i = ()=>{
                let d = c.getBoundingClientRect().height;
                s(e, d);
            };
            i(), new MutationObserver(i).observe(c, {
                subtree: !0,
                childList: !0,
                characterData: !0
            });
        }
    }, [
        e,
        s
    ]);
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        ref: r,
        className: t,
        style: o
    }, a);
}, Re = (e, t)=>{
    let o = e.includes("top"), s = o ? {
        top: 0
    } : {
        bottom: 0
    }, a = e.includes("center") ? {
        justifyContent: "center"
    } : e.includes("right") ? {
        justifyContent: "flex-end"
    } : {};
    return {
        left: 0,
        right: 0,
        display: "flex",
        position: "absolute",
        transition: b() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)",
        transform: `translateY(${t * (o ? 1 : -1)}px)`,
        ...s,
        ...a
    };
}, ve = (0,goober__WEBPACK_IMPORTED_MODULE_1__.css)`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`, O = 16, Ie = ({ reverseOrder: e, position: t = "top-center", toastOptions: o, gutter: s, children: a, containerStyle: r, containerClassName: c })=>{
    let { toasts: i, handlers: d } = D(o);
    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        style: {
            position: "fixed",
            zIndex: 9999,
            top: O,
            left: O,
            right: O,
            bottom: O,
            pointerEvents: "none",
            ...r
        },
        className: c,
        onMouseEnter: d.startPause,
        onMouseLeave: d.endPause
    }, i.map((p)=>{
        let g = p.position || t, E = d.calculateOffset(p, {
            reverseOrder: e,
            gutter: s,
            defaultPosition: t
        }), x = Re(g, E);
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Ee, {
            id: p.id,
            key: p.id,
            onHeightUpdate: d.updateHeight,
            className: p.visible ? ve : "",
            style: x
        }, p.type === "custom" ? T(p.message, p) : a ? a(p) : /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(F, {
            toast: p,
            position: g
        }));
    }));
};
_s(Ee, "fkjAOlWVa9KjVLoOEmLo+ckqzCw=");
var _t = n;
 //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ "(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/tailwind-merge/dist/bundle-mjs.mjs":
/*!***********************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/tailwind-merge/dist/bundle-mjs.mjs ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTailwindMerge: function() { return /* binding */ createTailwindMerge; },
/* harmony export */   extendTailwindMerge: function() { return /* binding */ extendTailwindMerge; },
/* harmony export */   fromTheme: function() { return /* binding */ fromTheme; },
/* harmony export */   getDefaultConfig: function() { return /* binding */ getDefaultConfig; },
/* harmony export */   mergeConfigs: function() { return /* binding */ mergeConfigs; },
/* harmony export */   twJoin: function() { return /* binding */ twJoin; },
/* harmony export */   twMerge: function() { return /* binding */ twMerge; },
/* harmony export */   validators: function() { return /* binding */ validators; }
/* harmony export */ });
const CLASS_PART_SEPARATOR = '-';
const createClassGroupUtils = config => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = className => {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    // Classes like `-inset-1` produce an empty string as first classPart. We assume that classes for negative values are used correctly and remove it from classParts.
    if (classParts[0] === '' && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
const getGroupRecursive = (classParts, classPartObject) => {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : undefined;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return undefined;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({
    validator
  }) => validator(classRest))?.classGroupId;
};
const arbitraryPropertyRegex = /^\[(.+)\]$/;
const getGroupIdForArbitraryProperty = className => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(':'));
    if (property) {
      // I use two dots here because one dot is used as prefix for class groups in plugins
      return 'arbitrary..' + property;
    }
  }
};
/**
 * Exported for testing only
 */
const createClassMap = config => {
  const {
    theme,
    prefix
  } = config;
  const classMap = {
    nextPart: new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  classGroup.forEach(classDefinition => {
    if (typeof classDefinition === 'string') {
      const classPartObjectToEdit = classDefinition === '' ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === 'function') {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup]) => {
      processClassesRecursively(classGroup, getPart(classPartObject, key), classGroupId, theme);
    });
  });
};
const getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach(pathPart => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
};
const isThemeGetter = func => func.isThemeGetter;
const getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map(classDefinition => {
      if (typeof classDefinition === 'string') {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === 'object') {
        return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
};

// LRU cache inspired from hashlru (https://github.com/dominictarr/hashlru/blob/v1.0.4/index.js) but object replaced with Map to improve performance
const createLruCache = maxCacheSize => {
  if (maxCacheSize < 1) {
    return {
      get: () => undefined,
      set: () => {}
    };
  }
  let cacheSize = 0;
  let cache = new Map();
  let previousCache = new Map();
  const update = (key, value) => {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = new Map();
    }
  };
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== undefined) {
        return value;
      }
      if ((value = previousCache.get(key)) !== undefined) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
};
const IMPORTANT_MODIFIER = '!';
const createParseClassName = config => {
  const {
    separator,
    experimentalParseClassName
  } = config;
  const isSeparatorSingleCharacter = separator.length === 1;
  const firstSeparatorCharacter = separator[0];
  const separatorLength = separator.length;
  // parseClassName inspired by https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
  const parseClassName = className => {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === '/') {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === '[') {
        bracketDepth++;
      } else if (currentCharacter === ']') {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : undefined;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
  if (experimentalParseClassName) {
    return className => experimentalParseClassName({
      className,
      parseClassName
    });
  }
  return parseClassName;
};
/**
 * Sorts modifiers according to following schema:
 * - Predefined modifiers are sorted alphabetically
 * - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
 */
const sortModifiers = modifiers => {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach(modifier => {
    const isArbitraryVariant = modifier[0] === '[';
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
};
const createConfigUtils = config => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  ...createClassGroupUtils(config)
});
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds
  } = configUtils;
  /**
   * Set of classGroupIds in following format:
   * `{importantModifier}{variantModifiers}{classGroupId}`
   * @example 'float'
   * @example 'hover:focus:bg-color'
   * @example 'md:!pr'
   */
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = '';
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        // Not a Tailwind class
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        // Not a Tailwind class
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(':');
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.includes(classId)) {
      // Tailwind class omitted due to conflict
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    // Tailwind class not in conflict
    result = originalClassName + (result.length > 0 ? ' ' + result : result);
  }
  return result;
};

/**
 * The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
 *
 * Specifically:
 * - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
 * - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
 *
 * Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 */
function twJoin() {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = '';
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
}
const toValue = mix => {
  if (typeof mix === 'string') {
    return mix;
  }
  let resolvedValue;
  let string = '';
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
const fromTheme = key => {
  const themeGetter = theme => theme[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
const arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
const fractionRegex = /^\d+\/\d+$/;
const stringLengths = /*#__PURE__*/new Set(['px', 'full', 'screen']);
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
// Shadow always begins with x and y offset separated by underscore optionally prepended by inset
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isLength = value => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
const isArbitraryLength = value => getIsArbitraryValue(value, 'length', isLengthOnly);
const isNumber = value => Boolean(value) && !Number.isNaN(Number(value));
const isArbitraryNumber = value => getIsArbitraryValue(value, 'number', isNumber);
const isInteger = value => Boolean(value) && Number.isInteger(Number(value));
const isPercent = value => value.endsWith('%') && isNumber(value.slice(0, -1));
const isArbitraryValue = value => arbitraryValueRegex.test(value);
const isTshirtSize = value => tshirtUnitRegex.test(value);
const sizeLabels = /*#__PURE__*/new Set(['length', 'size', 'percentage']);
const isArbitrarySize = value => getIsArbitraryValue(value, sizeLabels, isNever);
const isArbitraryPosition = value => getIsArbitraryValue(value, 'position', isNever);
const imageLabels = /*#__PURE__*/new Set(['image', 'url']);
const isArbitraryImage = value => getIsArbitraryValue(value, imageLabels, isImage);
const isArbitraryShadow = value => getIsArbitraryValue(value, '', isShadow);
const isAny = () => true;
const getIsArbitraryValue = (value, label, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return typeof label === 'string' ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
const isLengthOnly = value =>
// `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
// For example, `hsl(0 0% 0%)` would be classified as a length without this check.
// I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
const isNever = () => false;
const isShadow = value => shadowRegex.test(value);
const isImage = value => imageRegex.test(value);
const validators = /*#__PURE__*/Object.defineProperty({
  __proto__: null,
  isAny,
  isArbitraryImage,
  isArbitraryLength,
  isArbitraryNumber,
  isArbitraryPosition,
  isArbitraryShadow,
  isArbitrarySize,
  isArbitraryValue,
  isInteger,
  isLength,
  isNumber,
  isPercent,
  isTshirtSize
}, Symbol.toStringTag, {
  value: 'Module'
});
const getDefaultConfig = () => {
  const colors = fromTheme('colors');
  const spacing = fromTheme('spacing');
  const blur = fromTheme('blur');
  const brightness = fromTheme('brightness');
  const borderColor = fromTheme('borderColor');
  const borderRadius = fromTheme('borderRadius');
  const borderSpacing = fromTheme('borderSpacing');
  const borderWidth = fromTheme('borderWidth');
  const contrast = fromTheme('contrast');
  const grayscale = fromTheme('grayscale');
  const hueRotate = fromTheme('hueRotate');
  const invert = fromTheme('invert');
  const gap = fromTheme('gap');
  const gradientColorStops = fromTheme('gradientColorStops');
  const gradientColorStopPositions = fromTheme('gradientColorStopPositions');
  const inset = fromTheme('inset');
  const margin = fromTheme('margin');
  const opacity = fromTheme('opacity');
  const padding = fromTheme('padding');
  const saturate = fromTheme('saturate');
  const scale = fromTheme('scale');
  const sepia = fromTheme('sepia');
  const skew = fromTheme('skew');
  const space = fromTheme('space');
  const translate = fromTheme('translate');
  const getOverscroll = () => ['auto', 'contain', 'none'];
  const getOverflow = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'];
  const getSpacingWithAutoAndArbitrary = () => ['auto', isArbitraryValue, spacing];
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
  const getLengthWithEmptyAndArbitrary = () => ['', isLength, isArbitraryLength];
  const getNumberWithAutoAndArbitrary = () => ['auto', isNumber, isArbitraryValue];
  const getPositions = () => ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top'];
  const getLineStyles = () => ['solid', 'dashed', 'dotted', 'double', 'none'];
  const getBlendModes = () => ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
  const getAlign = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'];
  const getZeroAndEmpty = () => ['', '0', isArbitraryValue];
  const getBreaks = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'];
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
  return {
    cacheSize: 500,
    separator: ':',
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ['none', '', isTshirtSize, isArbitraryValue],
      brightness: getNumberAndArbitrary(),
      borderColor: [colors],
      borderRadius: ['none', '', 'full', isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumberAndArbitrary(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumberAndArbitrary(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumberAndArbitrary(),
      scale: getNumberAndArbitrary(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ['auto', 'square', 'video', isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ['container'],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      'break-after': [{
        'break-after': getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      'break-before': [{
        'break-before': getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      'break-inside': [{
        'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column']
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      'box-decoration': [{
        'box-decoration': ['slice', 'clone']
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ['border', 'content']
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid', 'contents', 'list-item', 'hidden'],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ['right', 'left', 'none', 'start', 'end']
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ['left', 'right', 'both', 'none', 'start', 'end']
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ['isolate', 'isolation-auto'],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      'object-fit': [{
        object: ['contain', 'cover', 'fill', 'none', 'scale-down']
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      'object-position': [{
        object: [...getPositions(), isArbitraryValue]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-x': [{
        'overflow-x': getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-y': [{
        'overflow-y': getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-x': [{
        'overscroll-x': getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-y': [{
        'overscroll-y': getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-x': [{
        'inset-x': [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-y': [{
        'inset-y': [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ['visible', 'invisible', 'collapse'],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ['auto', isInteger, isArbitraryValue]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      'flex-direction': [{
        flex: ['row', 'row-reverse', 'col', 'col-reverse']
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      'flex-wrap': [{
        flex: ['wrap', 'wrap-reverse', 'nowrap']
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ['1', 'auto', 'initial', 'none', isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ['first', 'last', 'none', isInteger, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      'grid-cols': [{
        'grid-cols': [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start-end': [{
        col: ['auto', {
          span: ['full', isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start': [{
        'col-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-end': [{
        'col-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      'grid-rows': [{
        'grid-rows': [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start-end': [{
        row: ['auto', {
          span: [isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start': [{
        'row-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-end': [{
        'row-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      'grid-flow': [{
        'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense']
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      'auto-cols': [{
        'auto-cols': ['auto', 'min', 'max', 'fr', isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      'auto-rows': [{
        'auto-rows': ['auto', 'min', 'max', 'fr', isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-x': [{
        'gap-x': [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-y': [{
        'gap-y': [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      'justify-content': [{
        justify: ['normal', ...getAlign()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      'justify-items': [{
        'justify-items': ['start', 'end', 'center', 'stretch']
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      'justify-self': [{
        'justify-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      'align-content': [{
        content: ['normal', ...getAlign(), 'baseline']
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      'align-items': [{
        items: ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      'align-self': [{
        self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline']
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      'place-content': [{
        'place-content': [...getAlign(), 'baseline']
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      'place-items': [{
        'place-items': ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      'place-self': [{
        'place-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      'space-x': [{
        'space-x': [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-x-reverse': ['space-x-reverse'],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      'space-y': [{
        'space-y': [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-y-reverse': ['space-y-reverse'],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      'min-w': [{
        'min-w': [isArbitraryValue, spacing, 'min', 'max', 'fit']
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      'max-w': [{
        'max-w': [isArbitraryValue, spacing, 'none', 'full', 'min', 'max', 'fit', 'prose', {
          screen: [isTshirtSize]
        }, isTshirtSize]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      'min-h': [{
        'min-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      'max-h': [{
        'max-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit']
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      'font-size': [{
        text: ['base', isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      'font-smoothing': ['antialiased', 'subpixel-antialiased'],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      'font-style': ['italic', 'not-italic'],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      'font-weight': [{
        font: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black', isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      'font-family': [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-normal': ['normal-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-ordinal': ['ordinal'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-slashed-zero': ['slashed-zero'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-figure': ['lining-nums', 'oldstyle-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-spacing': ['proportional-nums', 'tabular-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-fraction': ['diagonal-fractions', 'stacked-fractons'],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      'line-clamp': [{
        'line-clamp': ['none', isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', isLength, isArbitraryValue]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      'list-image': [{
        'list-image': ['none', isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      'list-style-type': [{
        list: ['none', 'disc', 'decimal', isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      'list-style-position': [{
        list: ['inside', 'outside']
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      'placeholder-color': [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      'placeholder-opacity': [{
        'placeholder-opacity': [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      'text-alignment': [{
        text: ['left', 'center', 'right', 'justify', 'start', 'end']
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      'text-color': [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      'text-opacity': [{
        'text-opacity': [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      'text-decoration-style': [{
        decoration: [...getLineStyles(), 'wavy']
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      'text-decoration-thickness': [{
        decoration: ['auto', 'from-font', isLength, isArbitraryLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      'underline-offset': [{
        'underline-offset': ['auto', isLength, isArbitraryValue]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      'text-decoration-color': [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      'text-wrap': [{
        text: ['wrap', 'nowrap', 'balance', 'pretty']
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      'vertical-align': [{
        align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces']
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ['normal', 'words', 'all', 'keep']
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ['none', 'manual', 'auto']
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ['none', isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      'bg-attachment': [{
        bg: ['fixed', 'local', 'scroll']
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      'bg-clip': [{
        'bg-clip': ['border', 'padding', 'content', 'text']
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      'bg-opacity': [{
        'bg-opacity': [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      'bg-origin': [{
        'bg-origin': ['border', 'padding', 'content']
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      'bg-position': [{
        bg: [...getPositions(), isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      'bg-repeat': [{
        bg: ['no-repeat', {
          repeat: ['', 'x', 'y', 'round', 'space']
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      'bg-size': [{
        bg: ['auto', 'cover', 'contain', isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      'bg-image': [{
        bg: ['none', {
          'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']
        }, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      'bg-color': [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from-pos': [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via-pos': [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to-pos': [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from': [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via': [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to': [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-s': [{
        'rounded-s': [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-e': [{
        'rounded-e': [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-t': [{
        'rounded-t': [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-r': [{
        'rounded-r': [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-b': [{
        'rounded-b': [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-l': [{
        'rounded-l': [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ss': [{
        'rounded-ss': [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-se': [{
        'rounded-se': [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ee': [{
        'rounded-ee': [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-es': [{
        'rounded-es': [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tl': [{
        'rounded-tl': [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tr': [{
        'rounded-tr': [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-br': [{
        'rounded-br': [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-bl': [{
        'rounded-bl': [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w': [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-x': [{
        'border-x': [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-y': [{
        'border-y': [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-s': [{
        'border-s': [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-e': [{
        'border-e': [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-t': [{
        'border-t': [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-r': [{
        'border-r': [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-b': [{
        'border-b': [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-l': [{
        'border-l': [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      'border-opacity': [{
        'border-opacity': [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      'border-style': [{
        border: [...getLineStyles(), 'hidden']
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x': [{
        'divide-x': [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x-reverse': ['divide-x-reverse'],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y': [{
        'divide-y': [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y-reverse': ['divide-y-reverse'],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      'divide-opacity': [{
        'divide-opacity': [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      'divide-style': [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color': [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-x': [{
        'border-x': [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-y': [{
        'border-y': [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-t': [{
        'border-t': [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-r': [{
        'border-r': [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-b': [{
        'border-b': [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-l': [{
        'border-l': [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      'divide-color': [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      'outline-style': [{
        outline: ['', ...getLineStyles()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      'outline-offset': [{
        'outline-offset': [isLength, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      'outline-w': [{
        outline: [isLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      'outline-color': [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w': [{
        ring: getLengthWithEmptyAndArbitrary()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w-inset': ['ring-inset'],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      'ring-color': [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      'ring-opacity': [{
        'ring-opacity': [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      'ring-offset-w': [{
        'ring-offset': [isLength, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      'ring-offset-color': [{
        'ring-offset': [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ['', 'inner', 'none', isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      'shadow-color': [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      'mix-blend': [{
        'mix-blend': [...getBlendModes(), 'plus-lighter', 'plus-darker']
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      'bg-blend': [{
        'bg-blend': getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ['', 'none']
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      'drop-shadow': [{
        'drop-shadow': ['', 'none', isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      'hue-rotate': [{
        'hue-rotate': [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      'backdrop-filter': [{
        'backdrop-filter': ['', 'none']
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      'backdrop-blur': [{
        'backdrop-blur': [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      'backdrop-brightness': [{
        'backdrop-brightness': [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      'backdrop-contrast': [{
        'backdrop-contrast': [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      'backdrop-grayscale': [{
        'backdrop-grayscale': [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      'backdrop-hue-rotate': [{
        'backdrop-hue-rotate': [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      'backdrop-invert': [{
        'backdrop-invert': [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      'backdrop-opacity': [{
        'backdrop-opacity': [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      'backdrop-saturate': [{
        'backdrop-saturate': [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      'backdrop-sepia': [{
        'backdrop-sepia': [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      'border-collapse': [{
        border: ['collapse', 'separate']
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing': [{
        'border-spacing': [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-x': [{
        'border-spacing-x': [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-y': [{
        'border-spacing-y': [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      'table-layout': [{
        table: ['auto', 'fixed']
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ['top', 'bottom']
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ['none', 'all', '', 'colors', 'opacity', 'shadow', 'transform', isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ['linear', 'in', 'out', 'in-out', isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ['none', 'spin', 'ping', 'pulse', 'bounce', isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ['', 'gpu', 'none']
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-x': [{
        'scale-x': [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-y': [{
        'scale-y': [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-x': [{
        'translate-x': [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-y': [{
        'translate-y': [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-x': [{
        'skew-x': [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-y': [{
        'skew-y': [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      'transform-origin': [{
        origin: ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ['auto', colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ['none', 'auto']
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'none', 'context-menu', 'progress', 'cell', 'crosshair', 'vertical-text', 'alias', 'copy', 'no-drop', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out', isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      'caret-color': [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      'pointer-events': [{
        'pointer-events': ['none', 'auto']
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ['none', 'y', 'x', '']
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      'scroll-behavior': [{
        scroll: ['auto', 'smooth']
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-m': [{
        'scroll-m': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mx': [{
        'scroll-mx': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-my': [{
        'scroll-my': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ms': [{
        'scroll-ms': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-me': [{
        'scroll-me': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mt': [{
        'scroll-mt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mr': [{
        'scroll-mr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mb': [{
        'scroll-mb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ml': [{
        'scroll-ml': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-p': [{
        'scroll-p': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-px': [{
        'scroll-px': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-py': [{
        'scroll-py': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-ps': [{
        'scroll-ps': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pe': [{
        'scroll-pe': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pt': [{
        'scroll-pt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pr': [{
        'scroll-pr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pb': [{
        'scroll-pb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pl': [{
        'scroll-pl': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      'snap-align': [{
        snap: ['start', 'end', 'center', 'align-none']
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      'snap-stop': [{
        snap: ['normal', 'always']
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-type': [{
        snap: ['none', 'x', 'y', 'both']
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-strictness': [{
        snap: ['mandatory', 'proximity']
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ['auto', 'none', 'manipulation']
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-x': [{
        'touch-pan': ['x', 'left', 'right']
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-y': [{
        'touch-pan': ['y', 'up', 'down']
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-pz': ['touch-pinch-zoom'],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ['none', 'text', 'all', 'auto']
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      'will-change': [{
        'will-change': ['auto', 'scroll', 'contents', 'transform', isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, 'none']
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      'stroke-w': [{
        stroke: [isLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, 'none']
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ['sr-only', 'not-sr-only'],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      'forced-color-adjust': [{
        'forced-color-adjust': ['auto', 'none']
      }]
    },
    conflictingClassGroups: {
      overflow: ['overflow-x', 'overflow-y'],
      overscroll: ['overscroll-x', 'overscroll-y'],
      inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
      'inset-x': ['right', 'left'],
      'inset-y': ['top', 'bottom'],
      flex: ['basis', 'grow', 'shrink'],
      gap: ['gap-x', 'gap-y'],
      p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
      px: ['pr', 'pl'],
      py: ['pt', 'pb'],
      m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
      mx: ['mr', 'ml'],
      my: ['mt', 'mb'],
      size: ['w', 'h'],
      'font-size': ['leading'],
      'fvn-normal': ['fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction'],
      'fvn-ordinal': ['fvn-normal'],
      'fvn-slashed-zero': ['fvn-normal'],
      'fvn-figure': ['fvn-normal'],
      'fvn-spacing': ['fvn-normal'],
      'fvn-fraction': ['fvn-normal'],
      'line-clamp': ['display', 'overflow'],
      rounded: ['rounded-s', 'rounded-e', 'rounded-t', 'rounded-r', 'rounded-b', 'rounded-l', 'rounded-ss', 'rounded-se', 'rounded-ee', 'rounded-es', 'rounded-tl', 'rounded-tr', 'rounded-br', 'rounded-bl'],
      'rounded-s': ['rounded-ss', 'rounded-es'],
      'rounded-e': ['rounded-se', 'rounded-ee'],
      'rounded-t': ['rounded-tl', 'rounded-tr'],
      'rounded-r': ['rounded-tr', 'rounded-br'],
      'rounded-b': ['rounded-br', 'rounded-bl'],
      'rounded-l': ['rounded-tl', 'rounded-bl'],
      'border-spacing': ['border-spacing-x', 'border-spacing-y'],
      'border-w': ['border-w-s', 'border-w-e', 'border-w-t', 'border-w-r', 'border-w-b', 'border-w-l'],
      'border-w-x': ['border-w-r', 'border-w-l'],
      'border-w-y': ['border-w-t', 'border-w-b'],
      'border-color': ['border-color-t', 'border-color-r', 'border-color-b', 'border-color-l'],
      'border-color-x': ['border-color-r', 'border-color-l'],
      'border-color-y': ['border-color-t', 'border-color-b'],
      'scroll-m': ['scroll-mx', 'scroll-my', 'scroll-ms', 'scroll-me', 'scroll-mt', 'scroll-mr', 'scroll-mb', 'scroll-ml'],
      'scroll-mx': ['scroll-mr', 'scroll-ml'],
      'scroll-my': ['scroll-mt', 'scroll-mb'],
      'scroll-p': ['scroll-px', 'scroll-py', 'scroll-ps', 'scroll-pe', 'scroll-pt', 'scroll-pr', 'scroll-pb', 'scroll-pl'],
      'scroll-px': ['scroll-pr', 'scroll-pl'],
      'scroll-py': ['scroll-pt', 'scroll-pb'],
      touch: ['touch-x', 'touch-y', 'touch-pz'],
      'touch-x': ['touch'],
      'touch-y': ['touch'],
      'touch-pz': ['touch']
    },
    conflictingClassGroupModifiers: {
      'font-size': ['leading']
    }
  };
};

/**
 * @param baseConfig Config where other config will be merged into. This object will be mutated.
 * @param configExtension Partial config to merge into the `baseConfig`.
 */
const mergeConfigs = (baseConfig, {
  cacheSize,
  prefix,
  separator,
  experimentalParseClassName,
  extend = {},
  override = {}
}) => {
  overrideProperty(baseConfig, 'cacheSize', cacheSize);
  overrideProperty(baseConfig, 'prefix', prefix);
  overrideProperty(baseConfig, 'separator', separator);
  overrideProperty(baseConfig, 'experimentalParseClassName', experimentalParseClassName);
  for (const configKey in override) {
    overrideConfigProperties(baseConfig[configKey], override[configKey]);
  }
  for (const key in extend) {
    mergeConfigProperties(baseConfig[key], extend[key]);
  }
  return baseConfig;
};
const overrideProperty = (baseObject, overrideKey, overrideValue) => {
  if (overrideValue !== undefined) {
    baseObject[overrideKey] = overrideValue;
  }
};
const overrideConfigProperties = (baseObject, overrideObject) => {
  if (overrideObject) {
    for (const key in overrideObject) {
      overrideProperty(baseObject, key, overrideObject[key]);
    }
  }
};
const mergeConfigProperties = (baseObject, mergeObject) => {
  if (mergeObject) {
    for (const key in mergeObject) {
      const mergeValue = mergeObject[key];
      if (mergeValue !== undefined) {
        baseObject[key] = (baseObject[key] || []).concat(mergeValue);
      }
    }
  }
};
const extendTailwindMerge = (configExtension, ...createConfig) => typeof configExtension === 'function' ? createTailwindMerge(getDefaultConfig, configExtension, ...createConfig) : createTailwindMerge(() => mergeConfigs(getDefaultConfig(), configExtension), ...createConfig);
const twMerge = /*#__PURE__*/createTailwindMerge(getDefaultConfig);

//# sourceMappingURL=bundle-mjs.mjs.map


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["main-app"], function() { return __webpack_exec__("(app-pages-browser)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2Fhome%2Fubuntu%2Fmake_estimate%2Fnextjs_space%2Fapp%2Flogin%2Fpage.tsx%22%2C%22ids%22%3A%5B%5D%7D&server=false!"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);