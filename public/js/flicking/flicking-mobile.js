/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@egjs/agent/dist/agent.esm.js":
/*!****************************************************!*\
  !*** ./node_modules/@egjs/agent/dist/agent.esm.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getAccurateAgent": () => (/* binding */ getAccurateAgent)
/* harmony export */ });
/*
Copyright (c) 2015 NAVER Corp.
name: @egjs/agent
license: MIT
author: NAVER Corp.
repository: git+https://github.com/naver/agent.git
version: 2.3.0
*/
function some(arr, callback) {
  var length = arr.length;

  for (var i = 0; i < length; ++i) {
    if (callback(arr[i], i)) {
      return true;
    }
  }

  return false;
}
function find(arr, callback) {
  var length = arr.length;

  for (var i = 0; i < length; ++i) {
    if (callback(arr[i], i)) {
      return arr[i];
    }
  }

  return null;
}
function getUserAgent(agent) {
  var userAgent = agent;

  if (typeof userAgent === "undefined") {
    if (typeof navigator === "undefined" || !navigator) {
      return "";
    }

    userAgent = navigator.userAgent || "";
  }

  return userAgent.toLowerCase();
}
function execRegExp(pattern, text) {
  try {
    return new RegExp(pattern, "g").exec(text);
  } catch (e) {
    return null;
  }
}
function hasUserAgentData() {
  if (typeof navigator === "undefined" || !navigator || !navigator.userAgentData) {
    return false;
  }

  var userAgentData = navigator.userAgentData;
  var brands = userAgentData.brands || userAgentData.uaList;
  return !!(brands && brands.length);
}
function findVersion(versionTest, userAgent) {
  var result = execRegExp("(" + versionTest + ")((?:\\/|\\s|:)([0-9|\\.|_]+))", userAgent);
  return result ? result[3] : "";
}
function convertVersion(text) {
  return text.replace(/_/g, ".");
}
function findPreset(presets, userAgent) {
  var userPreset = null;
  var version = "-1";
  some(presets, function (preset) {
    var result = execRegExp("(" + preset.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", userAgent);

    if (!result || preset.brand) {
      return false;
    }

    userPreset = preset;
    version = result[3] || "-1";

    if (preset.versionAlias) {
      version = preset.versionAlias;
    } else if (preset.versionTest) {
      version = findVersion(preset.versionTest.toLowerCase(), userAgent) || version;
    }

    version = convertVersion(version);
    return true;
  });
  return {
    preset: userPreset,
    version: version
  };
}
function findPresetBrand(presets, brands) {
  var brandInfo = {
    brand: "",
    version: "-1"
  };
  some(presets, function (preset) {
    var result = findBrand(brands, preset);

    if (!result) {
      return false;
    }

    brandInfo.brand = preset.id;
    brandInfo.version = preset.versionAlias || result.version;
    return brandInfo.version !== "-1";
  });
  return brandInfo;
}
function findBrand(brands, preset) {
  return find(brands, function (_a) {
    var brand = _a.brand;
    return execRegExp("" + preset.test, brand.toLowerCase());
  });
}

var BROWSER_PRESETS = [{
  test: "phantomjs",
  id: "phantomjs"
}, {
  test: "whale",
  id: "whale"
}, {
  test: "edgios|edge|edg",
  id: "edge"
}, {
  test: "msie|trident|windows phone",
  id: "ie",
  versionTest: "iemobile|msie|rv"
}, {
  test: "miuibrowser",
  id: "miui browser"
}, {
  test: "samsungbrowser",
  id: "samsung internet"
}, {
  test: "samsung",
  id: "samsung internet",
  versionTest: "version"
}, {
  test: "chrome|crios",
  id: "chrome"
}, {
  test: "firefox|fxios",
  id: "firefox"
}, {
  test: "android",
  id: "android browser",
  versionTest: "version"
}, {
  test: "safari|iphone|ipad|ipod",
  id: "safari",
  versionTest: "version"
}]; // chromium's engine(blink) is based on applewebkit 537.36.

var CHROMIUM_PRESETS = [{
  test: "(?=.*applewebkit/(53[0-7]|5[0-2]|[0-4]))(?=.*\\schrome)",
  id: "chrome",
  versionTest: "chrome"
}, {
  test: "chromium",
  id: "chrome"
}, {
  test: "whale",
  id: "chrome",
  versionAlias: "-1",
  brand: true
}];
var WEBKIT_PRESETS = [{
  test: "applewebkit",
  id: "webkit",
  versionTest: "applewebkit|safari"
}];
var WEBVIEW_PRESETS = [{
  test: "(?=(iphone|ipad))(?!(.*version))",
  id: "webview"
}, {
  test: "(?=(android|iphone|ipad))(?=.*(naver|daum|; wv))",
  id: "webview"
}, {
  // test webview
  test: "webview",
  id: "webview"
}];
var OS_PRESETS = [{
  test: "windows phone",
  id: "windows phone"
}, {
  test: "windows 2000",
  id: "window",
  versionAlias: "5.0"
}, {
  test: "windows nt",
  id: "window"
}, {
  test: "iphone|ipad|ipod",
  id: "ios",
  versionTest: "iphone os|cpu os"
}, {
  test: "mac os x",
  id: "mac"
}, {
  test: "android",
  id: "android"
}, {
  test: "tizen",
  id: "tizen"
}, {
  test: "webos|web0s",
  id: "webos"
}];

function parseUserAgentData(osData) {
  var userAgentData = navigator.userAgentData;
  var brands = (userAgentData.uaList || userAgentData.brands).slice();
  var isMobile = userAgentData.mobile || false;
  var firstBrand = brands[0];
  var browser = {
    name: firstBrand.brand,
    version: firstBrand.version,
    majorVersion: -1,
    webkit: false,
    webkitVersion: "-1",
    chromium: false,
    chromiumVersion: "-1",
    webview: !!findPresetBrand(WEBVIEW_PRESETS, brands).brand
  };
  var os = {
    name: "unknown",
    version: "-1",
    majorVersion: -1
  };
  browser.webkit = !browser.chromium && some(WEBKIT_PRESETS, function (preset) {
    return findBrand(brands, preset);
  });
  var chromiumBrand = findPresetBrand(CHROMIUM_PRESETS, brands);
  browser.chromium = !!chromiumBrand.brand;
  browser.chromiumVersion = chromiumBrand.version;

  if (!browser.chromium) {
    var webkitBrand = findPresetBrand(WEBKIT_PRESETS, brands);
    browser.webkit = !!webkitBrand.brand;
    browser.webkitVersion = webkitBrand.version;
  }

  if (osData) {
    var platform_1 = osData.platform.toLowerCase();
    var result = find(OS_PRESETS, function (preset) {
      return new RegExp("" + preset.test, "g").exec(platform_1);
    });
    os.name = result ? result.id : platform_1;
    os.version = osData.platformVersion;
  }

  var browserBrand = findPresetBrand(BROWSER_PRESETS, brands);

  if (browserBrand.brand) {
    browser.name = browserBrand.brand;
    browser.version = osData ? osData.uaFullVersion : browserBrand.version;
  }

  if (navigator.platform === "Linux armv8l") {
    os.name = "android";
  } else if (browser.webkit) {
    os.name = isMobile ? "ios" : "mac";
  }

  if (os.name === "ios" && browser.webview) {
    browser.version = "-1";
  }

  os.version = convertVersion(os.version);
  browser.version = convertVersion(browser.version);
  os.majorVersion = parseInt(os.version, 10);
  browser.majorVersion = parseInt(browser.version, 10);
  return {
    browser: browser,
    os: os,
    isMobile: isMobile,
    isHints: true
  };
}

function parseUserAgent(userAgent) {
  var nextAgent = getUserAgent(userAgent);
  var isMobile = !!/mobi/g.exec(nextAgent);
  var browser = {
    name: "unknown",
    version: "-1",
    majorVersion: -1,
    webview: !!findPreset(WEBVIEW_PRESETS, nextAgent).preset,
    chromium: false,
    chromiumVersion: "-1",
    webkit: false,
    webkitVersion: "-1"
  };
  var os = {
    name: "unknown",
    version: "-1",
    majorVersion: -1
  };

  var _a = findPreset(BROWSER_PRESETS, nextAgent),
      browserPreset = _a.preset,
      browserVersion = _a.version;

  var _b = findPreset(OS_PRESETS, nextAgent),
      osPreset = _b.preset,
      osVersion = _b.version;

  var chromiumPreset = findPreset(CHROMIUM_PRESETS, nextAgent);
  browser.chromium = !!chromiumPreset.preset;
  browser.chromiumVersion = chromiumPreset.version;

  if (!browser.chromium) {
    var webkitPreset = findPreset(WEBKIT_PRESETS, nextAgent);
    browser.webkit = !!webkitPreset.preset;
    browser.webkitVersion = webkitPreset.version;
  }

  if (osPreset) {
    os.name = osPreset.id;
    os.version = osVersion;
    os.majorVersion = parseInt(osVersion, 10);
  }

  if (browserPreset) {
    browser.name = browserPreset.id;
    browser.version = browserVersion;

    if (browser.webview && os.name === "ios" && browser.name !== "safari") {
      browser.webview = false;
    }
  }

  browser.majorVersion = parseInt(browser.version, 10);
  return {
    browser: browser,
    os: os,
    isMobile: isMobile,
    isHints: false
  };
}

/**
 * @namespace eg.agent
 */

/**
* Extracts accuate browser and operating system information from the user agent string or client hints.
* @ko ?????? ???????????? ????????? ?????? client hints?????? ????????? ??????????????? ???????????? ????????? ????????????.
* @function eg.agent#getAccurateAgent
* @param - Callback function to get the accuate agent <ko>????????? ??????????????? ???????????? ?????? callback ??????</ko>
* @return - get the accuate agent promise. If Promise are not supported, null is returned. <ko> ????????? ???????????? promise??? ????????????. Promise??? ?????? ?????? ?????? ??????, null??? ????????????. </ko>
* @example
import { getAccurateAgent } from "@egjs/agent";
// eg.agent.getAccurateAgent()
getAccurateAgent().then(agent => {
   const { os, browser, isMobile } = agent;
});
getAccurateAgent(agent => {
    const { os, browser, isMobile } = agent;
});
*/

function getAccurateAgent(callback) {
  if (hasUserAgentData()) {
    return navigator.userAgentData.getHighEntropyValues(["architecture", "model", "platform", "platformVersion", "uaFullVersion"]).then(function (info) {
      var agentInfo = parseUserAgentData(info);
      callback && callback(agentInfo);
      return agentInfo;
    });
  }

  callback && callback(agent());

  if (typeof Promise === "undefined" || !Promise) {
    return null;
  }

  return Promise.resolve(agent());
}
/**
 * Extracts browser and operating system information from the user agent string.
 * @ko ?????? ???????????? ??????????????? ??????????????? ???????????? ????????? ????????????.
 * @function eg.agent#agent
 * @param - user agent string to parse <ko>????????? ?????????????????? ?????????</ko>
 * @return - agent Info <ko> ???????????? ?????? </ko>
 * @example
import agent from "@egjs/agent";
// eg.agent();
const { os, browser, isMobile } = agent();
 */

function agent(userAgent) {
  if (typeof userAgent === "undefined" && hasUserAgentData()) {
    return parseUserAgentData();
  } else {
    return parseUserAgent(userAgent);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (agent);

//# sourceMappingURL=agent.esm.js.map


/***/ }),

/***/ "./node_modules/@egjs/axes/dist/axes.esm.js":
/*!**************************************************!*\
  !*** ./node_modules/@egjs/axes/dist/axes.esm.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "PanInput": () => (/* binding */ PanInput),
/* harmony export */   "RotatePanInput": () => (/* binding */ RotatePanInput),
/* harmony export */   "PinchInput": () => (/* binding */ PinchInput),
/* harmony export */   "WheelInput": () => (/* binding */ WheelInput),
/* harmony export */   "MoveKeyInput": () => (/* binding */ MoveKeyInput)
/* harmony export */ });
/* harmony import */ var _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @egjs/hammerjs */ "./node_modules/@egjs/hammerjs/dist/hammer.esm.js");
/* harmony import */ var _egjs_agent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @egjs/agent */ "./node_modules/@egjs/agent/dist/agent.esm.js");
/* harmony import */ var _egjs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @egjs/component */ "./node_modules/@egjs/axes/node_modules/@egjs/component/dist/component.esm.js");
/*
Copyright (c) 2015 NAVER Corp.
name: @egjs/axes
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-axes
version: 2.8.0
*/




/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

function getInsidePosition(destPos, range, circular, bounce) {
  var toDestPos = destPos;
  var targetRange = [circular[0] ? range[0] : bounce ? range[0] - bounce[0] : range[0], circular[1] ? range[1] : bounce ? range[1] + bounce[1] : range[1]];
  toDestPos = Math.max(targetRange[0], toDestPos);
  toDestPos = Math.min(targetRange[1], toDestPos);
  return toDestPos;
} // determine outside

function isOutside(pos, range) {
  return pos < range[0] || pos > range[1];
}
function getDuration(distance, deceleration) {
  var duration = Math.sqrt(distance / deceleration * 2); // when duration is under 100, then value is zero

  return duration < 100 ? 0 : duration;
}
function isCircularable(destPos, range, circular) {
  return circular[1] && destPos > range[1] || circular[0] && destPos < range[0];
}
function getCirculatedPos(pos, range, circular) {
  var toPos = pos;
  var min = range[0];
  var max = range[1];
  var length = max - min;

  if (circular[1] && pos > max) {
    // right
    toPos = (toPos - max) % length + min;
  }

  if (circular[0] && pos < min) {
    // left
    toPos = (toPos - min) % length + max;
  }

  return toPos;
}

/* eslint-disable no-new-func, no-nested-ternary */
var win;

if (typeof window === "undefined") {
  // window is undefined in node.js
  win = {
    navigator: {
      userAgent: ""
    }
  };
} else {
  win = window;
}

function toArray(nodes) {
  // const el = Array.prototype.slice.call(nodes);
  // for IE8
  var el = [];

  for (var i = 0, len = nodes.length; i < len; i++) {
    el.push(nodes[i]);
  }

  return el;
}
function $(param, multi) {
  if (multi === void 0) {
    multi = false;
  }

  var el;

  if (typeof param === "string") {
    // String (HTML, Selector)
    // check if string is HTML tag format
    var match = param.match(/^<([a-z]+)\s*([^>]*)>/); // creating element

    if (match) {
      // HTML
      var dummy = document.createElement("div");
      dummy.innerHTML = param;
      el = toArray(dummy.childNodes);
    } else {
      // Selector
      el = toArray(document.querySelectorAll(param));
    }

    if (!multi) {
      el = el.length >= 1 ? el[0] : undefined;
    }
  } else if (param === win) {
    // window
    el = param;
  } else if (param.nodeName && (param.nodeType === 1 || param.nodeType === 9)) {
    // HTMLElement, Document
    el = param;
  } else if ("jQuery" in win && param instanceof jQuery || param.constructor.prototype.jquery) {
    // jQuery
    el = multi ? param.toArray() : param.get(0);
  } else if (Array.isArray(param)) {
    el = param.map(function (v) {
      return $(v);
    });

    if (!multi) {
      el = el.length >= 1 ? el[0] : undefined;
    }
  }

  return el;
}
var raf = win.requestAnimationFrame || win.webkitRequestAnimationFrame;
var caf = win.cancelAnimationFrame || win.webkitCancelAnimationFrame;

if (raf && !caf) {
  var keyInfo_1 = {};
  var oldraf_1 = raf;

  raf = function (callback) {
    function wrapCallback(timestamp) {
      if (keyInfo_1[key]) {
        callback(timestamp);
      }
    }

    var key = oldraf_1(wrapCallback);
    keyInfo_1[key] = true;
    return key;
  };

  caf = function (key) {
    delete keyInfo_1[key];
  };
} else if (!(raf && caf)) {
  raf = function (callback) {
    return win.setTimeout(function () {
      callback(win.performance && win.performance.now && win.performance.now() || new Date().getTime());
    }, 16);
  };

  caf = win.clearTimeout;
}
/**
 * A polyfill for the window.requestAnimationFrame() method.
 * @see  https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * @private
 */


function requestAnimationFrame(fp) {
  return raf(fp);
}
/**
* A polyfill for the window.cancelAnimationFrame() method. It cancels an animation executed through a call to the requestAnimationFrame() method.
* @param {Number} key ???	The ID value returned through a call to the requestAnimationFrame() method. <ko>requestAnimationFrame() ???????????? ????????? ????????? ???</ko>
* @see  https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame
* @private
*/

function cancelAnimationFrame(key) {
  caf(key);
}
function map(obj, callback) {
  var tranformed = {};

  for (var k in obj) {
    k && (tranformed[k] = callback(obj[k], k));
  }

  return tranformed;
}
function filter(obj, callback) {
  var filtered = {};

  for (var k in obj) {
    k && callback(obj[k], k) && (filtered[k] = obj[k]);
  }

  return filtered;
}
function every(obj, callback) {
  for (var k in obj) {
    if (k && !callback(obj[k], k)) {
      return false;
    }
  }

  return true;
}
function equal(target, base) {
  return every(target, function (v, k) {
    return v === base[k];
  });
}
var roundNumFunc = {};
function roundNumber(num, roundUnit) {
  // Cache for performance
  if (!roundNumFunc[roundUnit]) {
    roundNumFunc[roundUnit] = getRoundFunc(roundUnit);
  }

  return roundNumFunc[roundUnit](num);
}
function roundNumbers(num, roundUnit) {
  if (!num || !roundUnit) {
    return num;
  }

  var isNumber = typeof roundUnit === "number";
  return map(num, function (value, key) {
    return roundNumber(value, isNumber ? roundUnit : roundUnit[key]);
  });
}
function getDecimalPlace(val) {
  if (!isFinite(val)) {
    return 0;
  }

  var v = val + "";

  if (v.indexOf("e") >= 0) {
    // Exponential Format
    // 1e-10, 1e-12
    var p = 0;
    var e = 1;

    while (Math.round(val * e) / e !== val) {
      e *= 10;
      p++;
    }

    return p;
  } // In general, following has performance benefit.
  // https://jsperf.com/precision-calculation


  return v.indexOf(".") >= 0 ? v.length - v.indexOf(".") - 1 : 0;
}
function inversePow(n) {
  // replace Math.pow(10, -n) to solve floating point issue.
  // eg. Math.pow(10, -4) => 0.00009999999999999999
  return 1 / Math.pow(10, n);
}
function getRoundFunc(v) {
  var p = v < 1 ? Math.pow(10, getDecimalPlace(v)) : 1;
  return function (n) {
    if (v === 0) {
      return 0;
    }

    return Math.round(Math.round(n / v) * v * p) / p;
  };
}

function minMax(value, min, max) {
  return Math.max(Math.min(value, max), min);
}

var AnimationManager =
/*#__PURE__*/
function () {
  function AnimationManager(_a) {
    var options = _a.options,
        itm = _a.itm,
        em = _a.em,
        axm = _a.axm;
    this.options = options;
    this.itm = itm;
    this.em = em;
    this.axm = axm;
    this.animationEnd = this.animationEnd.bind(this);
  }

  var __proto = AnimationManager.prototype;

  __proto.getDuration = function (depaPos, destPos, wishDuration) {
    var _this = this;

    var duration;

    if (typeof wishDuration !== "undefined") {
      duration = wishDuration;
    } else {
      var durations_1 = map(destPos, function (v, k) {
        return getDuration(Math.abs(v - depaPos[k]), _this.options.deceleration);
      });
      duration = Object.keys(durations_1).reduce(function (max, v) {
        return Math.max(max, durations_1[v]);
      }, -Infinity);
    }

    return minMax(duration, this.options.minimumDuration, this.options.maximumDuration);
  };

  __proto.createAnimationParam = function (pos, duration, option) {
    var depaPos = this.axm.get();
    var destPos = pos;
    var inputEvent = option && option.event || null;
    return {
      depaPos: depaPos,
      destPos: destPos,
      duration: minMax(duration, this.options.minimumDuration, this.options.maximumDuration),
      delta: this.axm.getDelta(depaPos, destPos),
      inputEvent: inputEvent,
      input: option && option.input || null,
      isTrusted: !!inputEvent,
      done: this.animationEnd
    };
  };

  __proto.grab = function (axes, option) {
    if (this._animateParam && axes.length) {
      var orgPos_1 = this.axm.get(axes);
      var pos = this.axm.map(orgPos_1, function (v, opt) {
        return getCirculatedPos(v, opt.range, opt.circular);
      });

      if (!every(pos, function (v, k) {
        return orgPos_1[k] === v;
      })) {
        this.em.triggerChange(pos, false, orgPos_1, option, !!option);
      }

      this._animateParam = null;
      this._raf && cancelAnimationFrame(this._raf);
      this._raf = null;
      this.em.triggerAnimationEnd(!!(option && option.event));
    }
  };

  __proto.getEventInfo = function () {
    if (this._animateParam && this._animateParam.input && this._animateParam.inputEvent) {
      return {
        input: this._animateParam.input,
        event: this._animateParam.inputEvent
      };
    } else {
      return null;
    }
  };

  __proto.restore = function (option) {
    var pos = this.axm.get();
    var destPos = this.axm.map(pos, function (v, opt) {
      return Math.min(opt.range[1], Math.max(opt.range[0], v));
    });
    this.animateTo(destPos, this.getDuration(pos, destPos), option);
  };

  __proto.animationEnd = function () {
    var beforeParam = this.getEventInfo();
    this._animateParam = null; // for Circular

    var circularTargets = this.axm.filter(this.axm.get(), function (v, opt) {
      return isCircularable(v, opt.range, opt.circular);
    });
    Object.keys(circularTargets).length > 0 && this.setTo(this.axm.map(circularTargets, function (v, opt) {
      return getCirculatedPos(v, opt.range, opt.circular);
    }));
    this.itm.setInterrupt(false);
    this.em.triggerAnimationEnd(!!beforeParam);

    if (this.axm.isOutside()) {
      this.restore(beforeParam);
    } else {
      this.finish(!!beforeParam);
    }
  };

  __proto.finish = function (isTrusted) {
    this._animateParam = null;
    this.itm.setInterrupt(false);
    this.em.triggerFinish(isTrusted);
  };

  __proto.animateLoop = function (param, complete) {
    if (param.duration) {
      this._animateParam = __assign({}, param);
      var info_1 = this._animateParam;
      var self_1 = this;
      var destPos_1 = info_1.destPos;
      var prevPos_1 = info_1.depaPos;
      var prevEasingPer_1 = 0;
      var directions_1 = map(prevPos_1, function (value, key) {
        return value <= destPos_1[key] ? 1 : -1;
      });
      var originalIntendedPos_1 = map(destPos_1, function (v) {
        return v;
      });
      var prevTime_1 = new Date().getTime();
      info_1.startTime = prevTime_1;

      (function loop() {
        self_1._raf = null;
        var currentTime = new Date().getTime();
        var ratio = (currentTime - info_1.startTime) / param.duration;
        var easingPer = self_1.easing(ratio);
        var toPos = self_1.axm.map(prevPos_1, function (pos, options, key) {
          var nextPos = ratio >= 1 ? destPos_1[key] : pos + info_1.delta[key] * (easingPer - prevEasingPer_1); // Subtract distance from distance already moved.
          // Recalculate the remaining distance.
          // Fix the bouncing phenomenon by changing the range.

          var circulatedPos = getCirculatedPos(nextPos, options.range, options.circular);

          if (nextPos !== circulatedPos) {
            // circular
            var rangeOffset = directions_1[key] * (options.range[1] - options.range[0]);
            destPos_1[key] -= rangeOffset;
            prevPos_1[key] -= rangeOffset;
          }

          return circulatedPos;
        });
        var isCanceled = !self_1.em.triggerChange(toPos, false, prevPos_1);
        prevPos_1 = toPos;
        prevTime_1 = currentTime;
        prevEasingPer_1 = easingPer;

        if (easingPer >= 1) {
          destPos_1 = self_1.getFinalPos(destPos_1, originalIntendedPos_1);

          if (!equal(destPos_1, self_1.axm.get(Object.keys(destPos_1)))) {
            self_1.em.triggerChange(destPos_1, true, prevPos_1);
          }

          complete();
          return;
        } else if (isCanceled) {
          self_1.finish(false);
        } else {
          // animationEnd
          self_1._raf = requestAnimationFrame(loop);
        }
      })();
    } else {
      this.em.triggerChange(param.destPos, true);
      complete();
    }
  };
  /**
   * Get estimated final value.
   *
   * If destPos is within the 'error range' of the original intended position, the initial intended position is returned.
   *   - eg. original intended pos: 100, destPos: 100.0000000004 ==> return 100;
   * If dest Pos is outside the 'range of error' compared to the originally intended pos, it is returned rounded based on the originally intended pos.
   *   - eg. original intended pos: 100.123 destPos: 50.12345 => return 50.123
   *
   * @param originalIntendedPos
   * @param destPos
   */


  __proto.getFinalPos = function (destPos, originalIntendedPos) {
    var _this = this; // compare destPos and originalIntendedPos


    var ERROR_LIMIT = 0.000001;
    var finalPos = map(destPos, function (value, key) {
      if (value >= originalIntendedPos[key] - ERROR_LIMIT && value <= originalIntendedPos[key] + ERROR_LIMIT) {
        // In error range, return original intended
        return originalIntendedPos[key];
      } else {
        // Out of error range, return rounded pos.
        var roundUnit = _this.getRoundUnit(value, key);

        var result = roundNumber(value, roundUnit);
        return result;
      }
    });
    return finalPos;
  };

  __proto.getRoundUnit = function (val, key) {
    var roundUnit = this.options.round; // manual mode

    var minRoundUnit = null; // auto mode
    // auto mode

    if (!roundUnit) {
      // Get minimum round unit
      var options = this.axm.getAxisOptions(key);
      minRoundUnit = inversePow(Math.max(getDecimalPlace(options.range[0]), getDecimalPlace(options.range[1]), getDecimalPlace(val)));
    }

    return minRoundUnit || roundUnit;
  };

  __proto.getUserControll = function (param) {
    var userWish = param.setTo();
    userWish.destPos = this.axm.get(userWish.destPos);
    userWish.duration = minMax(userWish.duration, this.options.minimumDuration, this.options.maximumDuration);
    return userWish;
  };

  __proto.animateTo = function (destPos, duration, option) {
    var _this = this;

    var param = this.createAnimationParam(destPos, duration, option);

    var depaPos = __assign({}, param.depaPos);

    var retTrigger = this.em.triggerAnimationStart(param); // to control

    var userWish = this.getUserControll(param); // You can't stop the 'animationStart' event when 'circular' is true.

    if (!retTrigger && this.axm.every(userWish.destPos, function (v, opt) {
      return isCircularable(v, opt.range, opt.circular);
    })) {
      console.warn("You can't stop the 'animation' event when 'circular' is true.");
    }

    if (retTrigger && !equal(userWish.destPos, depaPos)) {
      var inputEvent = option && option.event || null;
      this.animateLoop({
        depaPos: depaPos,
        destPos: userWish.destPos,
        duration: userWish.duration,
        delta: this.axm.getDelta(depaPos, userWish.destPos),
        isTrusted: !!inputEvent,
        inputEvent: inputEvent,
        input: option && option.input || null
      }, function () {
        return _this.animationEnd();
      });
    }
  };

  __proto.easing = function (p) {
    return p > 1 ? 1 : this.options.easing(p);
  };

  __proto.setTo = function (pos, duration) {
    if (duration === void 0) {
      duration = 0;
    }

    var axes = Object.keys(pos);
    this.grab(axes);
    var orgPos = this.axm.get(axes);

    if (equal(pos, orgPos)) {
      return this;
    }

    this.itm.setInterrupt(true);
    var movedPos = filter(pos, function (v, k) {
      return orgPos[k] !== v;
    });

    if (!Object.keys(movedPos).length) {
      return this;
    }

    movedPos = this.axm.map(movedPos, function (v, opt) {
      var range = opt.range,
          circular = opt.circular;

      if (circular && (circular[0] || circular[1])) {
        return v;
      } else {
        return getInsidePosition(v, range, circular);
      }
    });

    if (equal(movedPos, orgPos)) {
      return this;
    }

    if (duration > 0) {
      this.animateTo(movedPos, duration);
    } else {
      this.em.triggerChange(movedPos);
      this.finish(false);
    }

    return this;
  };

  __proto.setBy = function (pos, duration) {
    if (duration === void 0) {
      duration = 0;
    }

    return this.setTo(map(this.axm.get(Object.keys(pos)), function (v, k) {
      return v + pos[k];
    }), duration);
  };

  return AnimationManager;
}();

var EventManager =
/*#__PURE__*/
function () {
  function EventManager(axes) {
    this.axes = axes;
  }
  /**
   * This event is fired when a user holds an element on the screen of the device.
   * @ko ???????????? ????????? ????????? ?????? ?????? ?????? ??? ???????????? ?????????
   * @name eg.Axes#hold
   * @event
   * @type {object}
   * @property {Object.<string, number>} pos coordinate <ko>?????? ??????</ko>
   * @property {Object} input The instance of inputType where the event occurred<ko>???????????? ????????? inputType ????????????</ko>
   * @property {Object} inputEvent The event object received from inputType <ko>inputType?????? ?????? ?????? ????????? ??????</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>???????????? ????????? ?????? ???????????? ?????????????????? true, ??????????????? API????????? ?????? ??????????????? ???????????? false??? ????????????.</ko>
   *
   * @example
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("hold", function(event) {
   *   // event.pos
   *   // event.input
   *   // event.inputEvent
   *   // isTrusted
   * });
   */


  var __proto = EventManager.prototype;

  __proto.triggerHold = function (pos, option) {
    var roundPos = this.getRoundPos(pos).roundPos;
    this.axes.trigger("hold", {
      pos: roundPos,
      input: option.input || null,
      inputEvent: option.event || null,
      isTrusted: true
    });
  };
  /**
   * Specifies the coordinates to move after the 'change' event. It works when the holding value of the change event is true.
   * @ko 'change' ????????? ?????? ????????? ????????? ????????????. change???????????? holding ?????? true??? ????????? ????????????
   * @name set
  * @function
   * @param {Object.<string, number>} pos The coordinate to move to <ko>????????? ??????</ko>
   * @example
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("change", function(event) {
   *   event.holding && event.set({x: 10});
   * });
   */

  /** Specifies the animation coordinates to move after the 'release' or 'animationStart' events.
   * @ko 'release' ?????? 'animationStart' ????????? ?????? ????????? ????????? ????????????.
   * @name setTo
  * @function
   * @param {Object.<string, number>} pos The coordinate to move to <ko>????????? ??????</ko>
   * @param {Number} [duration] Duration of the animation (unit: ms) <ko>??????????????? ?????? ??????(??????: ms)</ko>
   * @example
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("animationStart", function(event) {
   *   event.setTo({x: 10}, 2000);
   * });
   */

  /**
   * This event is fired when a user release an element on the screen of the device.
   * @ko ???????????? ????????? ???????????? ?????? ?????? ??? ???????????? ?????????
   * @name eg.Axes#release
   * @event
   * @type {object}
   * @property {Object.<string, number>} depaPos The coordinates when releasing an element<ko>?????? ?????? ?????? ?????? </ko>
   * @property {Object.<string, number>} destPos The coordinates to move to after releasing an element<ko>?????? ??? ?????? ????????? ??????</ko>
   * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>????????? ?????????</ko>
   * @property {Object} inputEvent The event object received from inputType <ko>inputType?????? ?????? ?????? ????????? ??????</ko>
   * @property {Object} input The instance of inputType where the event occurred<ko>???????????? ????????? inputType ????????????</ko>
   * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>????????? ?????? ????????? ??????????????? ????????? ????????????</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>???????????? ????????? ?????? ???????????? ?????????????????? true, ??????????????? API????????? ?????? ??????????????? ???????????? false??? ????????????.</ko>
   *
   * @example
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("release", function(event) {
   *   // event.depaPos
   *   // event.destPos
   *   // event.delta
   *   // event.input
   *   // event.inputEvent
   *   // event.setTo
   *   // event.isTrusted
   *
   *   // if you want to change the animation coordinates to move after the 'release' event.
   *   event.setTo({x: 10}, 2000);
   * });
   */


  __proto.triggerRelease = function (param) {
    var _a = this.getRoundPos(param.destPos, param.depaPos),
        roundPos = _a.roundPos,
        roundDepa = _a.roundDepa;

    param.destPos = roundPos;
    param.depaPos = roundDepa;
    param.setTo = this.createUserControll(param.destPos, param.duration);
    this.axes.trigger("release", param);
  };
  /**
   * This event is fired when coordinate changes.
   * @ko ????????? ???????????? ??? ???????????? ?????????
   * @name eg.Axes#change
   * @event
   * @type {object}
   * @property {Object.<string, number>} pos  The coordinate <ko>??????</ko>
   * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>????????? ?????????</ko>
   * @property {Boolean} holding Indicates whether a user holds an element on the screen of the device.<ko>???????????? ????????? ????????? ????????? ????????? ??????</ko>
   * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>???????????? ????????? inputType ????????????. ?????????????????? ?????? ?????? ????????? ???????????? 'null'??? ????????????.</ko>
   * @property {Object} inputEvent The event object received from inputType. If the value is changed by animation, it returns 'null'.<ko>inputType?????? ?????? ?????? ????????? ??????. ?????????????????? ?????? ?????? ????????? ???????????? 'null'??? ????????????.</ko>
   * @property {set} set Specifies the coordinates to move after the event. It works when the holding value is true <ko>????????? ?????? ????????? ????????? ????????????. holding ?????? true??? ????????? ????????????.</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>???????????? ????????? ?????? ???????????? ?????????????????? true, ??????????????? API????????? ?????? ??????????????? ???????????? false??? ????????????.</ko>
   *
   * @example
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("change", function(event) {
   *   // event.pos
   *   // event.delta
   *   // event.input
   *   // event.inputEvent
   *   // event.holding
   *   // event.set
   *   // event.isTrusted
   *
   *   // if you want to change the coordinates to move after the 'change' event.
   *   // it works when the holding value of the change event is true.
   *   event.holding && event.set({x: 10});
   * });
   */


  __proto.triggerChange = function (pos, isAccurate, depaPos, option, holding) {
    if (holding === void 0) {
      holding = false;
    }

    var am = this.am;
    var axm = am.axm;
    var eventInfo = am.getEventInfo();

    var _a = this.getRoundPos(pos, depaPos),
        roundPos = _a.roundPos,
        roundDepa = _a.roundDepa;

    var moveTo = axm.moveTo(roundPos, roundDepa);
    var inputEvent = option && option.event || eventInfo && eventInfo.event || null;
    var param = {
      pos: moveTo.pos,
      delta: moveTo.delta,
      holding: holding,
      inputEvent: inputEvent,
      isTrusted: !!inputEvent,
      input: option && option.input || eventInfo && eventInfo.input || null,
      set: inputEvent ? this.createUserControll(moveTo.pos) : function () {}
    };
    var result = this.axes.trigger("change", param);
    inputEvent && axm.set(param.set()["destPos"]);
    return result;
  };
  /**
   * This event is fired when animation starts.
   * @ko ?????????????????? ????????? ??? ????????????.
   * @name eg.Axes#animationStart
   * @event
   * @type {object}
   * @property {Object.<string, number>} depaPos The coordinates when animation starts<ko>?????????????????? ?????? ????????? ?????? ?????? </ko>
   * @property {Object.<string, number>} destPos The coordinates to move to. If you change this value, you can run the animation<ko>????????? ??????. ????????? ???????????? ?????????????????? ??????????????? ??????</ko>
   * @property {Object.<string, number>} delta  The movement variation of coordinate <ko>????????? ?????????</ko>
   * @property {Number} duration Duration of the animation (unit: ms). If you change this value, you can control the animation duration time.<ko>??????????????? ?????? ??????(??????: ms). ????????? ???????????? ?????????????????? ??????????????? ????????? ??? ??????.</ko>
   * @property {Object} input The instance of inputType where the event occurred. If the value is changed by animation, it returns 'null'.<ko>???????????? ????????? inputType ????????????. ?????????????????? ?????? ?????? ????????? ???????????? 'null'??? ????????????.</ko>
   * @property {Object} inputEvent The event object received from inputType <ko>inputType?????? ?????? ?????? ????????? ??????</ko>
   * @property {setTo} setTo Specifies the animation coordinates to move after the event <ko>????????? ?????? ????????? ??????????????? ????????? ????????????</ko>
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>???????????? ????????? ?????? ???????????? ?????????????????? true, ??????????????? API????????? ?????? ??????????????? ???????????? false??? ????????????.</ko>
   *
   * @example
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("release", function(event) {
   *   // event.depaPos
   *   // event.destPos
   *   // event.delta
   *   // event.input
   *   // event.inputEvent
   *   // event.setTo
   *   // event.isTrusted
   *
   *   // if you want to change the animation coordinates to move after the 'animationStart' event.
   *   event.setTo({x: 10}, 2000);
   * });
   */


  __proto.triggerAnimationStart = function (param) {
    var _a = this.getRoundPos(param.destPos, param.depaPos),
        roundPos = _a.roundPos,
        roundDepa = _a.roundDepa;

    param.destPos = roundPos;
    param.depaPos = roundDepa;
    param.setTo = this.createUserControll(param.destPos, param.duration);
    return this.axes.trigger("animationStart", param);
  };
  /**
   * This event is fired when animation ends.
   * @ko ?????????????????? ????????? ??? ????????????.
   * @name eg.Axes#animationEnd
   * @event
   * @type {object}
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>???????????? ????????? ?????? ???????????? ?????????????????? true, ??????????????? API????????? ?????? ??????????????? ???????????? false??? ????????????.</ko>
   *
   * @example
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("animationEnd", function(event) {
   *   // event.isTrusted
   * });
   */


  __proto.triggerAnimationEnd = function (isTrusted) {
    if (isTrusted === void 0) {
      isTrusted = false;
    }

    this.axes.trigger("animationEnd", {
      isTrusted: isTrusted
    });
  };
  /**
   * This event is fired when all actions have been completed.
   * @ko ?????????????????? ????????? ??? ????????????.
   * @name eg.Axes#finish
   * @event
   * @type {object}
   * @property {Boolean} isTrusted Returns true if an event was generated by the user action, or false if it was caused by a script or API call <ko>???????????? ????????? ?????? ???????????? ?????????????????? true, ??????????????? API????????? ?????? ??????????????? ???????????? false??? ????????????.</ko>
   *
   * @example
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "zoom": {
   *      range: [50, 30]
   *   }
   * }).on("finish", function(event) {
   *   // event.isTrusted
   * });
   */


  __proto.triggerFinish = function (isTrusted) {
    if (isTrusted === void 0) {
      isTrusted = false;
    }

    this.axes.trigger("finish", {
      isTrusted: isTrusted
    });
  };

  __proto.createUserControll = function (pos, duration) {
    if (duration === void 0) {
      duration = 0;
    } // to controll


    var userControl = {
      destPos: __assign({}, pos),
      duration: duration
    };
    return function (toPos, userDuration) {
      toPos && (userControl.destPos = __assign({}, toPos));
      userDuration !== undefined && (userControl.duration = userDuration);
      return userControl;
    };
  };

  __proto.setAnimationManager = function (am) {
    this.am = am;
  };

  __proto.destroy = function () {
    this.axes.off();
  };

  __proto.getRoundPos = function (pos, depaPos) {
    // round value if round exist
    var roundUnit = this.axes.options.round; // if (round == null) {
    // 	return {pos, depaPos}; // undefined, undefined
    // }

    return {
      roundPos: roundNumbers(pos, roundUnit),
      roundDepa: roundNumbers(depaPos, roundUnit)
    };
  };

  return EventManager;
}();

var InterruptManager =
/*#__PURE__*/
function () {
  function InterruptManager(options) {
    this.options = options;
    this._prevented = false; //  check whether the animation event was prevented
  }

  var __proto = InterruptManager.prototype;

  __proto.isInterrupting = function () {
    // when interruptable is 'true', return value is always 'true'.
    return this.options.interruptable || this._prevented;
  };

  __proto.isInterrupted = function () {
    return !this.options.interruptable && this._prevented;
  };

  __proto.setInterrupt = function (prevented) {
    !this.options.interruptable && (this._prevented = prevented);
  };

  return InterruptManager;
}();

var AxisManager =
/*#__PURE__*/
function () {
  function AxisManager(axis, options) {
    var _this = this;

    this.axis = axis;
    this.options = options;

    this._complementOptions();

    this._pos = Object.keys(this.axis).reduce(function (acc, v) {
      acc[v] = _this.axis[v].range[0];
      return acc;
    }, {});
  }
  /**
     * set up 'css' expression
     * @private
     */


  var __proto = AxisManager.prototype;

  __proto._complementOptions = function () {
    var _this = this;

    Object.keys(this.axis).forEach(function (axis) {
      _this.axis[axis] = __assign({
        range: [0, 100],
        bounce: [0, 0],
        circular: [false, false]
      }, _this.axis[axis]);
      ["bounce", "circular"].forEach(function (v) {
        var axisOption = _this.axis;
        var key = axisOption[axis][v];

        if (/string|number|boolean/.test(typeof key)) {
          axisOption[axis][v] = [key, key];
        }
      });
    });
  };

  __proto.getDelta = function (depaPos, destPos) {
    var fullDepaPos = this.get(depaPos);
    return map(this.get(destPos), function (v, k) {
      return v - fullDepaPos[k];
    });
  };

  __proto.get = function (axes) {
    var _this = this;

    if (axes && Array.isArray(axes)) {
      return axes.reduce(function (acc, v) {
        if (v && v in _this._pos) {
          acc[v] = _this._pos[v];
        }

        return acc;
      }, {});
    } else {
      return __assign(__assign({}, this._pos), axes || {});
    }
  };

  __proto.moveTo = function (pos, depaPos) {
    if (depaPos === void 0) {
      depaPos = this._pos;
    }

    var delta = map(this._pos, function (v, key) {
      return key in pos && key in depaPos ? pos[key] - depaPos[key] : 0;
    });
    this.set(this.map(pos, function (v, opt) {
      return opt ? getCirculatedPos(v, opt.range, opt.circular) : 0;
    }));
    return {
      pos: __assign({}, this._pos),
      delta: delta
    };
  };

  __proto.set = function (pos) {
    for (var k in pos) {
      if (k && k in this._pos) {
        this._pos[k] = pos[k];
      }
    }
  };

  __proto.every = function (pos, callback) {
    var axisOptions = this.axis;
    return every(pos, function (value, key) {
      return callback(value, axisOptions[key], key);
    });
  };

  __proto.filter = function (pos, callback) {
    var axisOptions = this.axis;
    return filter(pos, function (value, key) {
      return callback(value, axisOptions[key], key);
    });
  };

  __proto.map = function (pos, callback) {
    var axisOptions = this.axis;
    return map(pos, function (value, key) {
      return callback(value, axisOptions[key], key);
    });
  };

  __proto.isOutside = function (axes) {
    return !this.every(axes ? this.get(axes) : this._pos, function (v, opt) {
      return !isOutside(v, opt.range);
    });
  };

  __proto.getAxisOptions = function (key) {
    return this.axis[key];
  };

  return AxisManager;
}();

var InputObserver =
/*#__PURE__*/
function () {
  function InputObserver(_a) {
    var options = _a.options,
        itm = _a.itm,
        em = _a.em,
        axm = _a.axm,
        am = _a.am;
    this.isOutside = false;
    this.moveDistance = null;
    this.isStopped = false;
    this.options = options;
    this.itm = itm;
    this.em = em;
    this.axm = axm;
    this.am = am;
  } // when move pointer is held in outside


  var __proto = InputObserver.prototype;

  __proto.atOutside = function (pos) {
    var _this = this;

    if (this.isOutside) {
      return this.axm.map(pos, function (v, opt) {
        var tn = opt.range[0] - opt.bounce[0];
        var tx = opt.range[1] + opt.bounce[1];
        return v > tx ? tx : v < tn ? tn : v;
      });
    } else {
      // when start pointer is held in inside
      // get a initialization slope value to prevent smooth animation.
      var initSlope_1 = this.am.easing(0.00001) / 0.00001;
      return this.axm.map(pos, function (v, opt) {
        var min = opt.range[0];
        var max = opt.range[1];
        var out = opt.bounce;
        var circular = opt.circular;

        if (circular && (circular[0] || circular[1])) {
          return v;
        } else if (v < min) {
          // left
          return min - _this.am.easing((min - v) / (out[0] * initSlope_1)) * out[0];
        } else if (v > max) {
          // right
          return max + _this.am.easing((v - max) / (out[1] * initSlope_1)) * out[1];
        }

        return v;
      });
    }
  };

  __proto.get = function (input) {
    return this.axm.get(input.axes);
  };

  __proto.hold = function (input, event) {
    if (this.itm.isInterrupted() || !input.axes.length) {
      return;
    }

    var changeOption = {
      input: input,
      event: event
    };
    this.isStopped = false;
    this.itm.setInterrupt(true);
    this.am.grab(input.axes, changeOption);
    !this.moveDistance && this.em.triggerHold(this.axm.get(), changeOption);
    this.isOutside = this.axm.isOutside(input.axes);
    this.moveDistance = this.axm.get(input.axes);
  };

  __proto.change = function (input, event, offset) {
    if (this.isStopped || !this.itm.isInterrupting() || this.axm.every(offset, function (v) {
      return v === 0;
    })) {
      return;
    }

    var depaPos = this.moveDistance || this.axm.get(input.axes);
    var destPos; // for outside logic

    destPos = map(depaPos, function (v, k) {
      return v + (offset[k] || 0);
    });
    this.moveDistance && (this.moveDistance = destPos); // from outside to inside

    if (this.isOutside && this.axm.every(depaPos, function (v, opt) {
      return !isOutside(v, opt.range);
    })) {
      this.isOutside = false;
    }

    depaPos = this.atOutside(depaPos);
    destPos = this.atOutside(destPos);
    var isCanceled = !this.em.triggerChange(destPos, false, depaPos, {
      input: input,
      event: event
    }, true);

    if (isCanceled) {
      this.isStopped = true;
      this.moveDistance = null;
      this.am.finish(false);
    }
  };

  __proto.release = function (input, event, offset, inputDuration) {
    if (this.isStopped || !this.itm.isInterrupting() || !this.moveDistance) {
      return;
    }

    var pos = this.axm.get(input.axes);
    var depaPos = this.axm.get();
    var destPos = this.axm.get(this.axm.map(offset, function (v, opt, k) {
      if (opt.circular && (opt.circular[0] || opt.circular[1])) {
        return pos[k] + v;
      } else {
        return getInsidePosition(pos[k] + v, opt.range, opt.circular, opt.bounce);
      }
    }));
    var duration = this.am.getDuration(destPos, pos, inputDuration);

    if (duration === 0) {
      destPos = __assign({}, depaPos);
    } // prepare params


    var param = {
      depaPos: depaPos,
      destPos: destPos,
      duration: duration,
      delta: this.axm.getDelta(depaPos, destPos),
      inputEvent: event,
      input: input,
      isTrusted: true
    };
    this.em.triggerRelease(param);
    this.moveDistance = null; // to contol

    var userWish = this.am.getUserControll(param);
    var isEqual = equal(userWish.destPos, depaPos);
    var changeOption = {
      input: input,
      event: event
    };

    if (isEqual || userWish.duration === 0) {
      !isEqual && this.em.triggerChange(userWish.destPos, false, depaPos, changeOption, true);
      this.itm.setInterrupt(false);

      if (this.axm.isOutside()) {
        this.am.restore(changeOption);
      } else {
        this.em.triggerFinish(true);
      }
    } else {
      this.am.animateTo(userWish.destPos, userWish.duration, changeOption);
    }
  };

  return InputObserver;
}();

// export const DIRECTION_NONE = 1;
var IOS_EDGE_THRESHOLD = 30;
var IS_IOS_SAFARI = "ontouchstart" in win && (0,_egjs_agent__WEBPACK_IMPORTED_MODULE_1__.default)().browser.name === "safari";
var TRANSFORM = function () {
  if (typeof document === "undefined") {
    return "";
  }

  var bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
  var target = ["transform", "webkitTransform", "msTransform", "mozTransform"];

  for (var i = 0, len = target.length; i < len; i++) {
    if (target[i] in bodyStyle) {
      return target[i];
    }
  }

  return "";
}();

/**
 * @typedef {Object} AxisOption The Axis information. The key of the axis specifies the name to use as the logical virtual coordinate system.
 * @ko ??? ??????. ?????? ?????? ???????????? ?????? ???????????? ????????? ????????? ????????????.
 * @property {Number[]} [range] The coordinate of range <ko>?????? ??????</ko>
 * @property {Number} [range.0=0] The coordinate of the minimum <ko>?????? ??????</ko>
 * @property {Number} [range.1=0] The coordinate of the maximum <ko>?????? ??????</ko>
 * @property {Number[]} [bounce] The size of bouncing area. The coordinates can exceed the coordinate area as much as the bouncing area based on user action. If the coordinates does not exceed the bouncing area when an element is dragged, the coordinates where bouncing effects are applied are retuned back into the coordinate area<ko>????????? ????????? ??????. ???????????? ????????? ?????? ????????? ?????? ????????? ?????? ????????? ????????? ???????????? ??? ????????? ??? ??????. ???????????? ????????? ?????? ????????? ?????? ??? ????????? ????????? ????????? ?????????, ????????? ????????? ????????? ????????? ?????? ?????? ?????? ????????? ????????????</ko>
 * @property {Number} [bounce.0=0] The size of coordinate of the minimum area <ko>?????? ?????? ????????? ????????? ??????</ko>
 * @property {Number} [bounce.1=0] The size of coordinate of the maximum area <ko>?????? ?????? ????????? ????????? ??????</ko>
 * @property {Boolean[]} [circular] Indicates whether a circular element is available. If it is set to "true" and an element is dragged outside the coordinate area, the element will appear on the other side.<ko>?????? ??????. 'true'??? ????????? ????????? ?????? ?????? ????????? ??????????????? ???????????? ?????? ???????????? ??????????????? ????????????</ko>
 * @property {Boolean} [circular.0=false] Indicates whether to circulate to the coordinate of the minimum <ko>?????? ?????? ????????? ?????? ??????</ko>
 * @property {Boolean} [circular.1=false] Indicates whether to circulate to the coordinate of the maximum <ko>?????? ?????? ????????? ?????? ??????</ko>
**/

/**
 * @typedef {Object} AxesOption The option object of the eg.Axes module
 * @ko eg.Axes ????????? ?????? ??????
 * @property {Function} [easing=easing.easeOutCubic] The easing function to apply to an animation <ko>?????????????????? ????????? easing ??????</ko>
 * @property {Number} [maximumDuration=Infinity] Maximum duration of the animation <ko>???????????? ?????? ?????????????????? ????????? ?????? ?????? ?????? ?????? ??????</ko>
 * @property {Number} [minimumDuration=0] Minimum duration of the animation <ko>???????????? ?????? ?????????????????? ????????? ?????? ?????? ?????? ?????? ??????</ko>
 * @property {Number} [deceleration=0.0006] Deceleration of the animation where acceleration is manually enabled by user. A higher value indicates shorter running time. <ko>???????????? ???????????? ???????????? ????????? ?????????????????? ?????????. ?????? ???????????? ??????????????? ?????? ????????? ????????????</ko>
 * @property {Boolean} [interruptable=true] Indicates whether an animation is interruptible.<br>- true: It can be paused or stopped by user action or the API.<br>- false: It cannot be paused or stopped by user action or the API while it is running.<ko>?????? ?????? ??????????????? ?????? ?????? ??????.<br>- true: ???????????? ???????????? API??? ?????????????????? ????????? ??? ??????.<br>- false: ?????????????????? ?????? ?????? ?????? ???????????? ???????????? API??? ???????????? ?????????</ko>
 * @property {Number} [round = null] Rounding unit. For example, 0.1 rounds to 0.1 decimal point(6.1234 => 6.1), 5 rounds to 5 (93 => 95) <br>[Details](https://github.com/naver/egjs-axes/wiki/round-option)<ko>????????? ??????. ?????? ?????? 0.1 ??? ????????? 0.1 ?????? ?????????(6.1234 => 6.1), 5 ??? 5 ????????? ?????????(93 => 95).<br>[????????????](https://github.com/naver/egjs-axes/wiki/round-option)</ko>
**/

/**
 * @class eg.Axes
 * @classdesc A module used to change the information of user action entered by various input devices such as touch screen or mouse into the logical virtual coordinates. You can easily create a UI that responds to user actions.
 * @ko ?????? ?????? ????????? ???????????? ?????? ????????? ?????? ????????? ?????? ?????? ?????? ???????????? ????????? ???????????? ?????? ????????? ???????????? ????????????. ????????? ????????? ???????????? UI??? ????????? ????????? ??????.
 * @extends eg.Component
 *
 * @param {Object.<string, AxisOption>} axis Axis information managed by eg.Axes. The key of the axis specifies the name to use as the logical virtual coordinate system.  <ko>eg.Axes??? ???????????? ??? ??????. ?????? ?????? ???????????? ?????? ???????????? ????????? ????????? ????????????.</ko>
 * @param {AxesOption} [options] The option object of the eg.Axes module<ko>eg.Axes ????????? ?????? ??????</ko>
 * @param {Object.<string, number>} [startPos] The coordinates to be moved when creating an instance. not triggering change event.<ko>???????????? ????????? ????????? ??????, change ???????????? ???????????? ??????.</ko>
 *
 * @support {"ie": "10+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.3+ (except 3.x)"}
 * @example
 *
 * // 1. Initialize eg.Axes
 * const axes = new eg.Axes({
 *	something1: {
 *		range: [0, 150],
 *		bounce: 50
 *	},
 *	something2: {
 *		range: [0, 200],
 *		bounce: 100
 *	},
 *	somethingN: {
 *		range: [1, 10],
 *	}
 * }, {
 *  deceleration : 0.0024
 * });
 *
 * // 2. attach event handler
 * axes.on({
 *	"hold" : function(evt) {
 *	},
 *	"release" : function(evt) {
 *	},
 *	"animationStart" : function(evt) {
 *	},
 *	"animationEnd" : function(evt) {
 *	},
 *	"change" : function(evt) {
 *	}
 * });
 *
 * // 3. Initialize inputTypes
 * const panInputArea = new eg.Axes.PanInput("#area", {
 *	scale: [0.5, 1]
 * });
 * const panInputHmove = new eg.Axes.PanInput("#hmove");
 * const panInputVmove = new eg.Axes.PanInput("#vmove");
 * const pinchInputArea = new eg.Axes.PinchInput("#area", {
 *	scale: 1.5
 * });
 *
 * // 4. Connect eg.Axes and InputTypes
 * // [PanInput] When the mouse or touchscreen is down and moved.
 * // Connect the 'something2' axis to the mouse or touchscreen x position and
 * // connect the 'somethingN' axis to the mouse or touchscreen y position.
 * axes.connect(["something2", "somethingN"], panInputArea); // or axes.connect("something2 somethingN", panInputArea);
 *
 * // Connect only one 'something1' axis to the mouse or touchscreen x position.
 * axes.connect(["something1"], panInputHmove); // or axes.connect("something1", panInputHmove);
 *
 * // Connect only one 'something2' axis to the mouse or touchscreen y position.
 * axes.connect(["", "something2"], panInputVmove); // or axes.connect(" something2", panInputVmove);
 *
 * // [PinchInput] Connect 'something2' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * axes.connect("something2", pinchInputArea);
 */

var Axes =
/*#__PURE__*/
function (_super) {
  __extends(Axes, _super);

  function Axes(axis, options, startPos) {
    if (axis === void 0) {
      axis = {};
    }

    if (options === void 0) {
      options = {};
    }

    var _this = _super.call(this) || this;

    _this.axis = axis;
    _this._inputs = [];
    _this.options = __assign({
      easing: function easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
      },
      interruptable: true,
      maximumDuration: Infinity,
      minimumDuration: 0,
      deceleration: 0.0006,
      round: null
    }, options);
    _this.itm = new InterruptManager(_this.options);
    _this.axm = new AxisManager(_this.axis, _this.options);
    _this.em = new EventManager(_this);
    _this.am = new AnimationManager(_this);
    _this.io = new InputObserver(_this);

    _this.em.setAnimationManager(_this.am);

    startPos && _this.em.triggerChange(startPos);
    return _this;
  }
  /**
   * Connect the axis of eg.Axes to the inputType.
   * @ko eg.Axes??? ?????? inputType??? ????????????
   * @method eg.Axes#connect
   * @param {(String[]|String)} axes The name of the axis to associate with inputType <ko>inputType??? ????????? ?????? ??????</ko>
   * @param {Object} inputType The inputType instance to associate with the axis of eg.Axes <ko>eg.Axes??? ?????? ????????? inputType ????????????<ko>
   * @return {eg.Axes} An instance of a module itself <ko>?????? ????????? ????????????</ko>
   * @example
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   }
   * });
   *
   * axes.connect("x", new eg.Axes.PanInput("#area1"))
   *    .connect("x xOther", new eg.Axes.PanInput("#area2"))
   *    .connect(" xOther", new eg.Axes.PanInput("#area3"))
   *    .connect(["x"], new eg.Axes.PanInput("#area4"))
   *    .connect(["xOther", "x"], new eg.Axes.PanInput("#area5"))
   *    .connect(["", "xOther"], new eg.Axes.PanInput("#area6"));
   */


  var __proto = Axes.prototype;

  __proto.connect = function (axes, inputType) {
    var mapped;

    if (typeof axes === "string") {
      mapped = axes.split(" ");
    } else {
      mapped = axes.concat();
    } // check same instance


    if (~this._inputs.indexOf(inputType)) {
      this.disconnect(inputType);
    } // check same element in hammer type for share


    if ("hammer" in inputType) {
      var targets = this._inputs.filter(function (v) {
        return v.hammer && v.element === inputType.element;
      });

      if (targets.length) {
        inputType.hammer = targets[0].hammer;
      }
    }

    inputType.mapAxes(mapped);
    inputType.connect(this.io);

    this._inputs.push(inputType);

    return this;
  };
  /**
   * Disconnect the axis of eg.Axes from the inputType.
   * @ko eg.Axes??? ?????? inputType??? ????????? ?????????.
   * @method eg.Axes#disconnect
   * @param {Object} [inputType] An inputType instance associated with the axis of eg.Axes <ko>eg.Axes??? ?????? ????????? inputType ????????????<ko>
   * @return {eg.Axes} An instance of a module itself <ko>?????? ????????? ????????????</ko>
   * @example
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   }
   * });
   *
   * const input1 = new eg.Axes.PanInput("#area1");
   * const input2 = new eg.Axes.PanInput("#area2");
   * const input3 = new eg.Axes.PanInput("#area3");
   *
   * axes.connect("x", input1);
   *    .connect("x xOther", input2)
   *    .connect(["xOther", "x"], input3);
   *
   * axes.disconnect(input1); // disconnects input1
   * axes.disconnect(); // disconnects all of them
   */


  __proto.disconnect = function (inputType) {
    if (inputType) {
      var index = this._inputs.indexOf(inputType);

      if (index >= 0) {
        this._inputs[index].disconnect();

        this._inputs.splice(index, 1);
      }
    } else {
      this._inputs.forEach(function (v) {
        return v.disconnect();
      });

      this._inputs = [];
    }

    return this;
  };
  /**
   * Returns the current position of the coordinates.
   * @ko ????????? ?????? ????????? ????????????
   * @method eg.Axes#get
   * @param {Object} [axes] The names of the axis <ko>??? ?????????</ko>
   * @return {Object.<string, number>} Axis coordinate information <ko>??? ?????? ??????</ko>
   * @example
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   },
   * 	 "zoom": {
   *      range: [50, 30]
   *   }
   * });
   *
   * axes.get(); // {"x": 0, "xOther": -100, "zoom": 50}
   * axes.get(["x", "zoom"]); // {"x": 0, "zoom": 50}
   */


  __proto.get = function (axes) {
    return this.axm.get(axes);
  };
  /**
   * Moves an axis to specific coordinates.
   * @ko ????????? ????????????.
   * @method eg.Axes#setTo
   * @param {Object.<string, number>} pos The coordinate to move to <ko>????????? ??????</ko>
   * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>??????????????? ?????? ??????(??????: ms)</ko>
   * @return {eg.Axes} An instance of a module itself <ko>?????? ????????? ????????????</ko>
   * @example
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   },
   * 	 "zoom": {
   *      range: [50, 30]
   *   }
   * });
   *
   * axes.setTo({"x": 30, "zoom": 60});
   * axes.get(); // {"x": 30, "xOther": -100, "zoom": 60}
   *
   * axes.setTo({"x": 100, "xOther": 60}, 1000); // animatation
   *
   * // after 1000 ms
   * axes.get(); // {"x": 100, "xOther": 60, "zoom": 60}
   */


  __proto.setTo = function (pos, duration) {
    if (duration === void 0) {
      duration = 0;
    }

    this.am.setTo(pos, duration);
    return this;
  };
  /**
   * Moves an axis from the current coordinates to specific coordinates.
   * @ko ?????? ????????? ???????????? ????????? ????????????.
   * @method eg.Axes#setBy
   * @param {Object.<string, number>} pos The coordinate to move to <ko>????????? ??????</ko>
   * @param {Number} [duration=0] Duration of the animation (unit: ms) <ko>??????????????? ?????? ??????(??????: ms)</ko>
   * @return {eg.Axes} An instance of a module itself <ko>?????? ????????? ????????????</ko>
   * @example
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   },
   * 	 "zoom": {
   *      range: [50, 30]
   *   }
   * });
   *
   * axes.setBy({"x": 30, "zoom": 10});
   * axes.get(); // {"x": 30, "xOther": -100, "zoom": 60}
   *
   * axes.setBy({"x": 70, "xOther": 60}, 1000); // animatation
   *
   * // after 1000 ms
   * axes.get(); // {"x": 100, "xOther": -40, "zoom": 60}
   */


  __proto.setBy = function (pos, duration) {
    if (duration === void 0) {
      duration = 0;
    }

    this.am.setBy(pos, duration);
    return this;
  };
  /**
   * Returns whether there is a coordinate in the bounce area of ??????the target axis.
   * @ko ?????? ??? ??? bounce????????? ????????? ?????????????????? ????????????
   * @method eg.Axes#isBounceArea
   * @param {Object} [axes] The names of the axis <ko>??? ?????????</ko>
   * @return {Boolen} Whether the bounce area exists. <ko>bounce ?????? ?????? ??????</ko>
   * @example
   * const axes = new eg.Axes({
   *   "x": {
   *      range: [0, 100]
   *   },
   *   "xOther": {
   *      range: [-100, 100]
   *   },
   * 	 "zoom": {
   *      range: [50, 30]
   *   }
   * });
   *
   * axes.isBounceArea(["x"]);
   * axes.isBounceArea(["x", "zoom"]);
   * axes.isBounceArea();
   */


  __proto.isBounceArea = function (axes) {
    return this.axm.isOutside(axes);
  };
  /**
  * Destroys properties, and events used in a module and disconnect all connections to inputTypes.
  * @ko ????????? ????????? ??????, ???????????? ????????????. ?????? inputType?????? ????????? ?????????.
  * @method eg.Axes#destroy
  */


  __proto.destroy = function () {
    this.disconnect();
    this.em.destroy();
  };
  /**
   * Version info string
   * @ko ???????????? ?????????
   * @name VERSION
   * @static
   * @type {String}
   * @example
   * eg.Axes.VERSION;  // ex) 3.3.3
   * @memberof eg.Axes
   */


  Axes.VERSION = "2.8.0";
  /**
   * @name eg.Axes.TRANSFORM
   * @desc Returns the transform attribute with CSS vendor prefixes.
   * @ko CSS vendor prefixes??? ?????? transform ????????? ????????????.
   *
   * @constant
   * @type {String}
   * @example
   * eg.Axes.TRANSFORM; // "transform" or "webkitTransform"
   */

  Axes.TRANSFORM = TRANSFORM;
  /**
   * @name eg.Axes.DIRECTION_NONE
   * @constant
   * @type {Number}
   */

  Axes.DIRECTION_NONE = _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_NONE;
  /**
   * @name eg.Axes.DIRECTION_LEFT
   * @constant
   * @type {Number}
  */

  Axes.DIRECTION_LEFT = _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_LEFT;
  /**
   * @name eg.Axes.DIRECTION_RIGHT
   * @constant
   * @type {Number}
  */

  Axes.DIRECTION_RIGHT = _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_RIGHT;
  /**
   * @name eg.Axes.DIRECTION_UP
   * @constant
   * @type {Number}
  */

  Axes.DIRECTION_UP = _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_UP;
  /**
   * @name eg.Axes.DIRECTION_DOWN
   * @constant
   * @type {Number}
  */

  Axes.DIRECTION_DOWN = _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_DOWN;
  /**
   * @name eg.Axes.DIRECTION_HORIZONTAL
   * @constant
   * @type {Number}
  */

  Axes.DIRECTION_HORIZONTAL = _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_HORIZONTAL;
  /**
   * @name eg.Axes.DIRECTION_VERTICAL
   * @constant
   * @type {Number}
  */

  Axes.DIRECTION_VERTICAL = _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_VERTICAL;
  /**
   * @name eg.Axes.DIRECTION_ALL
   * @constant
   * @type {Number}
  */

  Axes.DIRECTION_ALL = _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_ALL;
  return Axes;
}(_egjs_component__WEBPACK_IMPORTED_MODULE_0__.default);

var SUPPORT_POINTER_EVENTS = "PointerEvent" in win || "MSPointerEvent" in win;
var SUPPORT_TOUCH = ("ontouchstart" in win);
var UNIQUEKEY = "_EGJS_AXES_INPUTTYPE_";
function toAxis(source, offset) {
  return offset.reduce(function (acc, v, i) {
    if (source[i]) {
      acc[source[i]] = v;
    }

    return acc;
  }, {});
}
function createHammer(element, options) {
  try {
    // create Hammer
    return new _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.Manager(element, __assign({}, options));
  } catch (e) {
    return null;
  }
}
function convertInputType(inputType) {
  if (inputType === void 0) {
    inputType = [];
  }

  var hasTouch = false;
  var hasMouse = false;
  var hasPointer = false;
  inputType.forEach(function (v) {
    switch (v) {
      case "mouse":
        hasMouse = true;
        break;

      case "touch":
        hasTouch = SUPPORT_TOUCH;
        break;

      case "pointer":
        hasPointer = SUPPORT_POINTER_EVENTS;
      // no default
    }
  });

  if (hasPointer) {
    return _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.PointerEventInput;
  } else if (hasTouch && hasMouse) {
    return _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.TouchMouseInput;
  } else if (hasTouch) {
    return _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.TouchInput;
  } else if (hasMouse) {
    return _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.MouseInput;
  }

  return null;
}

function getDirectionByAngle(angle, thresholdAngle) {
  if (thresholdAngle < 0 || thresholdAngle > 90) {
    return _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_NONE;
  }

  var toAngle = Math.abs(angle);
  return toAngle > thresholdAngle && toAngle < 180 - thresholdAngle ? _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_VERTICAL : _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_HORIZONTAL;
}
function getNextOffset(speeds, deceleration) {
  var normalSpeed = Math.sqrt(speeds[0] * speeds[0] + speeds[1] * speeds[1]);
  var duration = Math.abs(normalSpeed / -deceleration);
  return [speeds[0] / 2 * duration, speeds[1] / 2 * duration];
}
function useDirection(checkType, direction, userDirection) {
  if (userDirection) {
    return !!(direction === _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_ALL || direction & checkType && userDirection & checkType);
  } else {
    return !!(direction & checkType);
  }
}
/**
 * @typedef {Object} PanInputOption The option object of the eg.Axes.PanInput module.
 * @ko eg.Axes.PanInput ????????? ?????? ??????
 * @property {String[]} [inputType=["touch","mouse", "pointer"]] Types of input devices.<br>- touch: Touch screen<br>- mouse: Mouse <ko>?????? ?????? ??????.<br>- touch: ?????? ?????? ??????<br>- mouse: ?????????</ko>
 * @property {Number[]} [scale] Coordinate scale that a user can move<ko>???????????? ???????????? ???????????? ????????? ??????</ko>
 * @property {Number} [scale.0=1] horizontal axis scale <ko>????????? ??????</ko>
 * @property {Number} [scale.1=1] vertical axis scale <ko>????????? ??????</ko>
 * @property {Number} [thresholdAngle=45] The threshold value that determines whether user action is horizontal or vertical (0~90) <ko>???????????? ????????? ?????? ???????????? ?????? ???????????? ???????????? ?????? ??????(0~90)</ko>
 * @property {Number} [threshold=0] Minimal pan distance required before recognizing <ko>???????????? Pan ????????? ???????????? ????????? ???????????? ??????</ko>
 * @property {Number} [iOSEdgeSwipeThreshold=30] Area (px) that can go to the next page when swiping the right edge in iOS safari <ko>iOS Safari?????? ????????? ????????? ???????????? ?????? ?????? ?????? ???????????? ????????? ??? ?????? ??????(px)</ko>
 * @property {Object} [hammerManagerOptions={cssProps: {userSelect: "none",touchSelect: "none",touchCallout: "none",userDrag: "none"}] Options of Hammer.Manager <ko>Hammer.Manager??? ??????</ko>
**/

/**
 * @class eg.Axes.PanInput
 * @classdesc A module that passes the amount of change to eg.Axes when the mouse or touchscreen is down and moved. use less than two axes.
 * @ko ???????????? ?????? ???????????? ????????? ??????????????? ???????????? eg.Axes??? ???????????? ??????. ?????? ????????? ?????? ????????????.
 *
 * @example
 * const pan = new eg.Axes.PanInput("#area", {
 * 		inputType: ["touch"],
 * 		scale: [1, 1.3],
 * });
 *
 * // Connect the 'something2' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
 * // Connect the 'somethingN' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
 * axes.connect(["something2", "somethingN"], pan); // or axes.connect("something2 somethingN", pan);
 *
 * // Connect only one 'something1' axis to the mouse or touchscreen x position when the mouse or touchscreen is down and moved.
 * axes.connect(["something1"], pan); // or axes.connect("something1", pan);
 *
 * // Connect only one 'something2' axis to the mouse or touchscreen y position when the mouse or touchscreen is down and moved.
 * axes.connect(["", "something2"], pan); // or axes.connect(" something2", pan);
 *
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.PanInput module <ko>eg.Axes.PanInput ????????? ????????? ????????????</ko>
 * @param {PanInputOption} [options] The option object of the eg.Axes.PanInput module<ko>eg.Axes.PanInput ????????? ?????? ??????</ko>
 */

var PanInput =
/*#__PURE__*/
function () {
  function PanInput(el, options) {
    this.axes = [];
    this.hammer = null;
    this.element = null;
    this.panRecognizer = null;
    this.isRightEdge = false;
    this.rightEdgeTimer = 0;
    this.panFlag = false;
    /**
     * Hammer helps you add support for touch gestures to your page
     *
     * @external Hammer
     * @see {@link http://hammerjs.github.io|Hammer.JS}
     * @see {@link http://hammerjs.github.io/jsdoc/Hammer.html|Hammer.JS API documents}
     * @see Hammer.JS applies specific CSS properties by {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html|default} when creating an instance. The eg.Axes module removes all default CSS properties provided by Hammer.JS
     */

    if (typeof _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.Manager === "undefined") {
      throw new Error("The Hammerjs must be loaded before eg.Axes.PanInput.\nhttp://hammerjs.github.io/");
    }

    this.element = $(el);
    this.options = __assign({
      inputType: ["touch", "mouse", "pointer"],
      scale: [1, 1],
      thresholdAngle: 45,
      threshold: 0,
      iOSEdgeSwipeThreshold: IOS_EDGE_THRESHOLD,
      releaseOnScroll: false,
      hammerManagerOptions: {
        // css properties were removed due to usablility issue
        // http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
        cssProps: {
          userSelect: "none",
          touchSelect: "none",
          touchCallout: "none",
          userDrag: "none"
        }
      }
    }, options);
    this.onHammerInput = this.onHammerInput.bind(this);
    this.onPanmove = this.onPanmove.bind(this);
    this.onPanend = this.onPanend.bind(this);
  }

  var __proto = PanInput.prototype;

  __proto.mapAxes = function (axes) {
    var useHorizontal = !!axes[0];
    var useVertical = !!axes[1];

    if (useHorizontal && useVertical) {
      this._direction = _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_ALL;
    } else if (useHorizontal) {
      this._direction = _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_HORIZONTAL;
    } else if (useVertical) {
      this._direction = _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_VERTICAL;
    } else {
      this._direction = _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_NONE;
    }

    this.axes = axes;
  };

  __proto.connect = function (observer) {
    var hammerOption = {
      direction: this._direction,
      threshold: this.options.threshold
    };

    if (this.hammer) {
      // for sharing hammer instance.
      // hammer remove previous PanRecognizer.
      this.removeRecognizer();
      this.dettachEvent();
    } else {
      var keyValue = this.element[UNIQUEKEY];

      if (!keyValue) {
        keyValue = String(Math.round(Math.random() * new Date().getTime()));
      }

      var inputClass = convertInputType(this.options.inputType);

      if (!inputClass) {
        throw new Error("Wrong inputType parameter!");
      }

      this.hammer = createHammer(this.element, __assign({
        inputClass: inputClass
      }, this.options.hammerManagerOptions));
      this.element[UNIQUEKEY] = keyValue;
    }

    this.panRecognizer = new _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.Pan(hammerOption);
    this.hammer.add(this.panRecognizer);
    this.attachEvent(observer);
    return this;
  };

  __proto.disconnect = function () {
    this.removeRecognizer();

    if (this.hammer) {
      this.dettachEvent();
    }

    this._direction = _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_NONE;
    return this;
  };
  /**
  * Destroys elements, properties, and events used in a module.
  * @ko ????????? ????????? ??????????????? ??????, ???????????? ????????????.
  * @method eg.Axes.PanInput#destroy
  */


  __proto.destroy = function () {
    this.disconnect();

    if (this.hammer && this.hammer.recognizers.length === 0) {
      this.hammer.destroy();
    }

    delete this.element[UNIQUEKEY];
    this.element = null;
    this.hammer = null;
  };
  /**
   * Enables input devices
   * @ko ?????? ????????? ????????? ??? ?????? ??????
   * @method eg.Axes.PanInput#enable
   * @return {eg.Axes.PanInput} An instance of a module itself <ko>?????? ????????? ????????????</ko>
   */


  __proto.enable = function () {
    this.hammer && (this.hammer.get("pan").options.enable = true);
    return this;
  };
  /**
   * Disables input devices
   * @ko ?????? ????????? ????????? ??? ?????? ??????.
   * @method eg.Axes.PanInput#disable
   * @return {eg.Axes.PanInput} An instance of a module itself <ko>?????? ????????? ????????????</ko>
   */


  __proto.disable = function () {
    this.hammer && (this.hammer.get("pan").options.enable = false);
    return this;
  };
  /**
   * Returns whether to use an input device
   * @ko ?????? ????????? ?????? ????????? ????????????.
   * @method eg.Axes.PanInput#isEnable
   * @return {Boolean} Whether to use an input device <ko>???????????? ????????????</ko>
   */


  __proto.isEnable = function () {
    return !!(this.hammer && this.hammer.get("pan").options.enable);
  };

  __proto.removeRecognizer = function () {
    if (this.hammer && this.panRecognizer) {
      this.hammer.remove(this.panRecognizer);
      this.panRecognizer = null;
    }
  };

  __proto.onHammerInput = function (event) {
    if (this.isEnable()) {
      if (event.isFirst) {
        this.panFlag = false;

        if (event.srcEvent.cancelable !== false) {
          var edgeThreshold = this.options.iOSEdgeSwipeThreshold;
          this.observer.hold(this, event);
          this.isRightEdge = IS_IOS_SAFARI && event.center.x > window.innerWidth - edgeThreshold;
          this.panFlag = true;
        }
      } else if (event.isFinal) {
        this.onPanend(event);
      }
    }
  };

  __proto.onPanmove = function (event) {
    var _this = this;

    if (!this.panFlag) {
      return;
    }

    var _a = this.options,
        iOSEdgeSwipeThreshold = _a.iOSEdgeSwipeThreshold,
        releaseOnScroll = _a.releaseOnScroll;
    var userDirection = getDirectionByAngle(event.angle, this.options.thresholdAngle); // not support offset properties in Hammerjs - start

    var prevInput = this.hammer.session.prevInput;

    if (releaseOnScroll && !event.srcEvent.cancelable) {
      this.onPanend(__assign(__assign({}, event), {
        velocityX: 0,
        velocityY: 0,
        offsetX: 0,
        offsetY: 0
      }));
      return;
    }

    if (prevInput && IS_IOS_SAFARI) {
      var swipeLeftToRight = event.center.x < 0;

      if (swipeLeftToRight) {
        // iOS swipe left => right
        this.onPanend(__assign(__assign({}, prevInput), {
          velocityX: 0,
          velocityY: 0,
          offsetX: 0,
          offsetY: 0
        }));
        return;
      } else if (this.isRightEdge) {
        clearTimeout(this.rightEdgeTimer); // - is right to left

        var swipeRightToLeft = event.deltaX < -iOSEdgeSwipeThreshold;

        if (swipeRightToLeft) {
          this.isRightEdge = false;
        } else {
          // iOS swipe right => left
          this.rightEdgeTimer = window.setTimeout(function () {
            _this.onPanend(__assign(__assign({}, prevInput), {
              velocityX: 0,
              velocityY: 0,
              offsetX: 0,
              offsetY: 0
            }));
          }, 100);
        }
      }
    }
    /* eslint-disable no-param-reassign */


    if (prevInput) {
      event.offsetX = event.deltaX - prevInput.deltaX;
      event.offsetY = event.deltaY - prevInput.deltaY;
    } else {
      event.offsetX = 0;
      event.offsetY = 0;
    }

    var offset = this.getOffset([event.offsetX, event.offsetY], [useDirection(_egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_HORIZONTAL, this._direction, userDirection), useDirection(_egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_VERTICAL, this._direction, userDirection)]);
    var prevent = offset.some(function (v) {
      return v !== 0;
    });

    if (prevent) {
      var srcEvent = event.srcEvent;

      if (srcEvent.cancelable !== false) {
        srcEvent.preventDefault();
      }

      srcEvent.stopPropagation();
    }

    event.preventSystemEvent = prevent;
    prevent && this.observer.change(this, event, toAxis(this.axes, offset));
  };

  __proto.onPanend = function (event) {
    if (!this.panFlag) {
      return;
    }

    clearTimeout(this.rightEdgeTimer);
    this.panFlag = false;
    var offset = this.getOffset([Math.abs(event.velocityX) * (event.deltaX < 0 ? -1 : 1), Math.abs(event.velocityY) * (event.deltaY < 0 ? -1 : 1)], [useDirection(_egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_HORIZONTAL, this._direction), useDirection(_egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.DIRECTION_VERTICAL, this._direction)]);
    offset = getNextOffset(offset, this.observer.options.deceleration);
    this.observer.release(this, event, toAxis(this.axes, offset));
  };

  __proto.attachEvent = function (observer) {
    this.observer = observer;
    this.hammer.on("hammer.input", this.onHammerInput).on("panstart panmove", this.onPanmove);
  };

  __proto.dettachEvent = function () {
    this.hammer.off("hammer.input", this.onHammerInput).off("panstart panmove", this.onPanmove);
    this.observer = null;
  };

  __proto.getOffset = function (properties, direction) {
    var offset = [0, 0];
    var scale = this.options.scale;

    if (direction[0]) {
      offset[0] = properties[0] * scale[0];
    }

    if (direction[1]) {
      offset[1] = properties[1] * scale[1];
    }

    return offset;
  };

  return PanInput;
}();

/**
 * @class eg.Axes.RotatePanInput
 * @classdesc A module that passes the angle moved by touch to Axes and uses one axis of rotation.<br>[Details](https://github.com/naver/egjs-axes/wiki/RotatePanInput)
 * @ko ????????? ?????? ????????? ????????? Axes ??? ???????????? 1?????? ???????????? ????????????.<br>[????????????](https://github.com/naver/egjs-axes/wiki/RotatePanInput-%7C-%ED%95%9C%EA%B5%AD%EC%96%B4)
 *
 * @example
 * const input = new eg.Axes.RotatePanInput("#area");
 *
 * var axes = new eg.Axes({
 *	// property name('angle') could be anything you want (eg. x, y, z...)
 * 	angle: {
 * 		range: [-180, 180] // from -180deg to 180deg
 * 	}
 * });
 *
 * axes.connect("angle", input)
 *
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.RotatePanInput module <ko>eg.Axes.RotatePanInput ????????? ????????? ????????????</ko>
 * @param {PanInputOption} [options] The option object of the eg.Axes.PanInput module<ko>eg.Axes.PanInput ????????? ?????? ??????</ko>
 * @extends eg.Axes.PanInput
 */

var RotatePanInput =
/*#__PURE__*/
function (_super) {
  __extends(RotatePanInput, _super);

  function RotatePanInput(el, options) {
    var _this = _super.call(this, el, options) || this;

    _this.prevQuadrant = null;
    _this.lastDiff = 0;
    return _this;
  }

  var __proto = RotatePanInput.prototype;

  __proto.mapAxes = function (axes) {
    this._direction = Axes.DIRECTION_ALL;
    this.axes = axes;
  };

  __proto.onHammerInput = function (event) {
    if (this.isEnable()) {
      if (event.isFirst) {
        this.observer.hold(this, event);
        this.onPanstart(event);
      } else if (event.isFinal) {
        this.onPanend(event);
      }
    }
  };

  __proto.onPanstart = function (event) {
    var rect = this.element.getBoundingClientRect();
    /**
     * Responsive
     */
    // TODO: how to do if element is ellipse not circle.

    this.coefficientForDistanceToAngle = 360 / (rect.width * Math.PI); // from 2*pi*r * x / 360
    // TODO: provide a way to set origin like https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin

    this.rotateOrigin = [rect.left + (rect.width - 1) / 2, rect.top + (rect.height - 1) / 2]; // init angle.

    this.prevAngle = null;
    this.triggerChange(event);
  };

  __proto.onPanmove = function (event) {
    this.triggerChange(event);
  };

  __proto.onPanend = function (event) {
    this.triggerChange(event);
    this.triggerAnimation(event);
  };

  __proto.triggerChange = function (event) {
    var angle = this.getAngle(event.center.x, event.center.y);
    var quadrant = this.getQuadrant(event.center.x, event.center.y);
    var diff = this.getDifference(this.prevAngle, angle, this.prevQuadrant, quadrant);
    this.prevAngle = angle;
    this.prevQuadrant = quadrant;

    if (diff === 0) {
      return;
    }

    this.lastDiff = diff;
    this.observer.change(this, event, toAxis(this.axes, [-diff])); // minus for clockwise
  };

  __proto.triggerAnimation = function (event) {
    var vx = event.velocityX;
    var vy = event.velocityY;
    var velocity = Math.sqrt(vx * vx + vy * vy) * (this.lastDiff > 0 ? -1 : 1); // clockwise

    var duration = Math.abs(velocity / -this.observer.options.deceleration);
    var distance = velocity / 2 * duration;
    this.observer.release(this, event, toAxis(this.axes, [distance * this.coefficientForDistanceToAngle]));
  };

  __proto.getDifference = function (prevAngle, angle, prevQuadrant, quadrant) {
    var diff;

    if (prevAngle === null) {
      diff = 0;
    } else if (prevQuadrant === 1 && quadrant === 4) {
      diff = -prevAngle - (360 - angle);
    } else if (prevQuadrant === 4 && quadrant === 1) {
      diff = 360 - prevAngle + angle;
    } else {
      diff = angle - prevAngle;
    }

    return diff;
  };

  __proto.getPosFromOrigin = function (posX, posY) {
    return {
      x: posX - this.rotateOrigin[0],
      y: this.rotateOrigin[1] - posY
    };
  };

  __proto.getAngle = function (posX, posY) {
    var _a = this.getPosFromOrigin(posX, posY),
        x = _a.x,
        y = _a.y;

    var angle = Math.atan2(y, x) * 180 / Math.PI; // console.log(angle, x, y);

    return angle < 0 ? 360 + angle : angle;
  };
  /**
   * Quadrant
   *       y(+)
   *       |
   *   2   |    1
   * --------------->x(+)
   *   3   |    4
   *       |
   */


  __proto.getQuadrant = function (posX, posY) {
    var _a = this.getPosFromOrigin(posX, posY),
        x = _a.x,
        y = _a.y;

    var q = 0;

    if (x >= 0 && y >= 0) {
      q = 1;
    } else if (x < 0 && y >= 0) {
      q = 2;
    } else if (x < 0 && y < 0) {
      q = 3;
    } else if (x >= 0 && y < 0) {
      q = 4;
    }

    return q;
  };

  return RotatePanInput;
}(PanInput);

/**
 * @typedef {Object} PinchInputOption The option object of the eg.Axes.PinchInput module
 * @ko eg.Axes.PinchInput ????????? ?????? ??????
 * @property {Number} [scale=1] Coordinate scale that a user can move<ko>???????????? ???????????? ???????????? ????????? ??????</ko>
 * @property {Number} [threshold=0] Minimal scale before recognizing <ko>???????????? Pinch ????????? ???????????? ????????? ???????????? ??????</ko>
 * @property {Object} [hammerManagerOptions={cssProps: {userSelect: "none",touchSelect: "none",touchCallout: "none",userDrag: "none"}] Options of Hammer.Manager <ko>Hammer.Manager??? ??????</ko>
**/

/**
 * @class eg.Axes.PinchInput
 * @classdesc A module that passes the amount of change to eg.Axes when two pointers are moving toward (zoom-in) or away from each other (zoom-out). use one axis.
 * @ko 2?????? pointer??? ???????????? zoom-in????????? zoom-out ?????? ????????? ???????????? eg.Axes??? ???????????? ??????. ??? ??? ??? ?????? ????????????.
 * @example
 * const pinch = new eg.Axes.PinchInput("#area", {
 * 		scale: 1
 * });
 *
 * // Connect 'something' axis when two pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * axes.connect("something", pinch);
 *
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.PinchInput module <ko>eg.Axes.PinchInput ????????? ????????? ????????????</ko>
 * @param {PinchInputOption} [options] The option object of the eg.Axes.PinchInput module<ko>eg.Axes.PinchInput ????????? ?????? ??????</ko>
 */

var PinchInput =
/*#__PURE__*/
function () {
  function PinchInput(el, options) {
    this.axes = [];
    this.hammer = null;
    this.element = null;
    this._base = null;
    this._prev = null;
    this.pinchRecognizer = null;
    /**
     * Hammer helps you add support for touch gestures to your page
     *
     * @external Hammer
     * @see {@link http://hammerjs.github.io|Hammer.JS}
     * @see {@link http://hammerjs.github.io/jsdoc/Hammer.html|Hammer.JS API documents}
     * @see Hammer.JS applies specific CSS properties by {@link http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html|default} when creating an instance. The eg.Axes module removes all default CSS properties provided by Hammer.JS
     */

    if (typeof _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.Manager === "undefined") {
      throw new Error("The Hammerjs must be loaded before eg.Axes.PinchInput.\nhttp://hammerjs.github.io/");
    }

    this.element = $(el);
    this.options = __assign({
      scale: 1,
      threshold: 0,
      inputType: ["touch", "pointer"],
      hammerManagerOptions: {
        // css properties were removed due to usablility issue
        // http://hammerjs.github.io/jsdoc/Hammer.defaults.cssProps.html
        cssProps: {
          userSelect: "none",
          touchSelect: "none",
          touchCallout: "none",
          userDrag: "none"
        }
      }
    }, options);
    this.onPinchStart = this.onPinchStart.bind(this);
    this.onPinchMove = this.onPinchMove.bind(this);
    this.onPinchEnd = this.onPinchEnd.bind(this);
  }

  var __proto = PinchInput.prototype;

  __proto.mapAxes = function (axes) {
    this.axes = axes;
  };

  __proto.connect = function (observer) {
    var hammerOption = {
      threshold: this.options.threshold
    };

    if (this.hammer) {
      // for sharing hammer instance.
      // hammer remove previous PinchRecognizer.
      this.removeRecognizer();
      this.dettachEvent();
    } else {
      var keyValue = this.element[UNIQUEKEY];

      if (!keyValue) {
        keyValue = String(Math.round(Math.random() * new Date().getTime()));
      }

      var inputClass = convertInputType(this.options.inputType);

      if (!inputClass) {
        throw new Error("Wrong inputType parameter!");
      }

      this.hammer = createHammer(this.element, __assign({
        inputClass: inputClass
      }, this.options.hammerManagerOptions));
      this.element[UNIQUEKEY] = keyValue;
    }

    this.pinchRecognizer = new _egjs_hammerjs__WEBPACK_IMPORTED_MODULE_2__.Pinch(hammerOption);
    this.hammer.add(this.pinchRecognizer);
    this.attachEvent(observer);
    return this;
  };

  __proto.disconnect = function () {
    this.removeRecognizer();

    if (this.hammer) {
      this.hammer.remove(this.pinchRecognizer);
      this.pinchRecognizer = null;
      this.dettachEvent();
    }

    return this;
  };
  /**
  * Destroys elements, properties, and events used in a module.
  * @ko ????????? ????????? ??????????????? ??????, ???????????? ????????????.
  * @method eg.Axes.PinchInput#destroy
  */


  __proto.destroy = function () {
    this.disconnect();

    if (this.hammer && this.hammer.recognizers.length === 0) {
      this.hammer.destroy();
    }

    delete this.element[UNIQUEKEY];
    this.element = null;
    this.hammer = null;
  };

  __proto.removeRecognizer = function () {
    if (this.hammer && this.pinchRecognizer) {
      this.hammer.remove(this.pinchRecognizer);
      this.pinchRecognizer = null;
    }
  };

  __proto.onPinchStart = function (event) {
    this._base = this.observer.get(this)[this.axes[0]];
    var offset = this.getOffset(event.scale);
    this.observer.hold(this, event);
    this.observer.change(this, event, toAxis(this.axes, [offset]));
    this._prev = event.scale;
  };

  __proto.onPinchMove = function (event) {
    var offset = this.getOffset(event.scale, this._prev);
    this.observer.change(this, event, toAxis(this.axes, [offset]));
    this._prev = event.scale;
  };

  __proto.onPinchEnd = function (event) {
    var offset = this.getOffset(event.scale, this._prev);
    this.observer.change(this, event, toAxis(this.axes, [offset]));
    this.observer.release(this, event, toAxis(this.axes, [0]), 0);
    this._base = null;
    this._prev = null;
  };

  __proto.getOffset = function (pinchScale, prev) {
    if (prev === void 0) {
      prev = 1;
    }

    return this._base * (pinchScale - prev) * this.options.scale;
  };

  __proto.attachEvent = function (observer) {
    this.observer = observer;
    this.hammer.on("pinchstart", this.onPinchStart).on("pinchmove", this.onPinchMove).on("pinchend", this.onPinchEnd);
  };

  __proto.dettachEvent = function () {
    this.hammer.off("pinchstart", this.onPinchStart).off("pinchmove", this.onPinchMove).off("pinchend", this.onPinchEnd);
    this.observer = null;
    this._prev = null;
  };
  /**
   * Enables input devices
   * @ko ?????? ????????? ????????? ??? ?????? ??????
   * @method eg.Axes.PinchInput#enable
   * @return {eg.Axes.PinchInput} An instance of a module itself <ko>?????? ????????? ????????????</ko>
   */


  __proto.enable = function () {
    this.hammer && (this.hammer.get("pinch").options.enable = true);
    return this;
  };
  /**
   * Disables input devices
   * @ko ?????? ????????? ????????? ??? ?????? ??????.
   * @method eg.Axes.PinchInput#disable
   * @return {eg.Axes.PinchInput} An instance of a module itself <ko>?????? ????????? ????????????</ko>
   */


  __proto.disable = function () {
    this.hammer && (this.hammer.get("pinch").options.enable = false);
    return this;
  };
  /**
   * Returns whether to use an input device
   * @ko ?????? ????????? ?????? ????????? ????????????.
   * @method eg.Axes.PinchInput#isEnable
   * @return {Boolean} Whether to use an input device <ko>???????????? ????????????</ko>
   */


  __proto.isEnable = function () {
    return !!(this.hammer && this.hammer.get("pinch").options.enable);
  };

  return PinchInput;
}();

/**
 * @typedef {Object} WheelInputOption The option object of the eg.Axes.WheelInput module
 * @ko eg.Axes.WheelInput ????????? ?????? ??????
 * @property {Number} [scale=1] Coordinate scale that a user can move<ko>???????????? ???????????? ???????????? ????????? ??????</ko>
**/

/**
 * @class eg.Axes.WheelInput
 * @classdesc A module that passes the amount of change to eg.Axes when the mouse wheel is moved. use one axis.
 * @ko ????????? ?????? ??????????????? ???????????? eg.Axes??? ???????????? ??????. ??? ??? ??? ?????? ????????????.
 *
 * @example
 * const wheel = new eg.Axes.WheelInput("#area", {
 * 		scale: 1
 * });
 *
 * // Connect 'something' axis when the mousewheel is moved.
 * axes.connect("something", wheel);
 *
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.WheelInput module <ko>eg.Axes.WheelInput ????????? ????????? ????????????</ko>
 * @param {WheelInputOption} [options] The option object of the eg.Axes.WheelInput module<ko>eg.Axes.WheelInput ????????? ?????? ??????</ko>
 */

var WheelInput =
/*#__PURE__*/
function () {
  function WheelInput(el, options) {
    this.axes = [];
    this.element = null;
    this._isEnabled = false;
    this._isHolded = false;
    this._timer = null;
    this.element = $(el);
    this.options = __assign({
      scale: 1,
      useNormalized: true
    }, options);
    this.onWheel = this.onWheel.bind(this);
  }

  var __proto = WheelInput.prototype;

  __proto.mapAxes = function (axes) {
    this.axes = axes;
  };

  __proto.connect = function (observer) {
    this.dettachEvent();
    this.attachEvent(observer);
    return this;
  };

  __proto.disconnect = function () {
    this.dettachEvent();
    return this;
  };
  /**
  * Destroys elements, properties, and events used in a module.
  * @ko ????????? ????????? ??????????????? ??????, ???????????? ????????????.
  * @method eg.Axes.WheelInput#destroy
  */


  __proto.destroy = function () {
    this.disconnect();
    this.element = null;
  };

  __proto.onWheel = function (event) {
    var _this = this;

    if (!this._isEnabled) {
      return;
    }

    event.preventDefault();

    if (event.deltaY === 0) {
      return;
    }

    if (!this._isHolded) {
      this.observer.hold(this, event);
      this._isHolded = true;
    }

    var offset = (event.deltaY > 0 ? -1 : 1) * this.options.scale * (this.options.useNormalized ? 1 : Math.abs(event.deltaY));
    this.observer.change(this, event, toAxis(this.axes, [offset]));
    clearTimeout(this._timer);
    this._timer = setTimeout(function () {
      if (_this._isHolded) {
        _this._isHolded = false;

        _this.observer.release(_this, event, toAxis(_this.axes, [0]));
      }
    }, 50);
  };

  __proto.attachEvent = function (observer) {
    this.observer = observer;
    this.element.addEventListener("wheel", this.onWheel);
    this._isEnabled = true;
  };

  __proto.dettachEvent = function () {
    this.element.removeEventListener("wheel", this.onWheel);
    this._isEnabled = false;
    this.observer = null;

    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  };
  /**
   * Enables input devices
   * @ko ?????? ????????? ????????? ??? ?????? ??????
   * @method eg.Axes.WheelInput#enable
   * @return {eg.Axes.WheelInput} An instance of a module itself <ko>?????? ????????? ????????????</ko>
   */


  __proto.enable = function () {
    this._isEnabled = true;
    return this;
  };
  /**
   * Disables input devices
   * @ko ?????? ????????? ????????? ??? ?????? ??????.
   * @method eg.Axes.WheelInput#disable
   * @return {eg.Axes.WheelInput} An instance of a module itself <ko>?????? ????????? ????????????</ko>
   */


  __proto.disable = function () {
    this._isEnabled = false;
    return this;
  };
  /**
   * Returns whether to use an input device
   * @ko ?????? ????????? ?????? ????????? ????????????.
   * @method eg.Axes.WheelInput#isEnable
   * @return {Boolean} Whether to use an input device <ko>???????????? ????????????</ko>
   */


  __proto.isEnable = function () {
    return this._isEnabled;
  };

  return WheelInput;
}();

var KEY_LEFT_ARROW = 37;
var KEY_A = 65;
var KEY_UP_ARROW = 38;
var KEY_W = 87;
var KEY_RIGHT_ARROW = 39;
var KEY_D = 68;
var KEY_DOWN_ARROW = 40;
var KEY_S = 83;
var DIRECTION_REVERSE = -1;
var DIRECTION_FORWARD = 1;
var DIRECTION_HORIZONTAL$1 = -1;
var DIRECTION_VERTICAL$1 = 1;
var DELAY = 80;
/**
 * @typedef {Object} MoveKeyInputOption The option object of the eg.Axes.MoveKeyInput module
 * @ko eg.Axes.MoveKeyInput ????????? ?????? ??????
 * @property {Array<Number>} [scale] Coordinate scale that a user can move<ko>???????????? ???????????? ???????????? ????????? ??????</ko>
 * @property {Number} [scale[0]=1] Coordinate scale for the first axis<ko>????????? ?????? ??????</ko>
 * @property {Number} [scale[1]=1] Coordinate scale for the decond axis<ko>????????? ?????? ??????</ko>
**/

/**
 * @class eg.Axes.MoveKeyInput
 * @classdesc A module that passes the amount of change to eg.Axes when the move key stroke is occured. use two axis.
 * @ko ????????? ????????? ???????????? ?????? ???????????? eg.Axes??? ???????????? ??????. ??? ??? ??? ?????? ????????????.
 *
 * @example
 * const moveKey = new eg.Axes.MoveKeyInput("#area", {
 * 		scale: [1, 1]
 * });
 *
 * // Connect 'x', 'y' axes when the moveKey is pressed.
 * axes.connect(["x", "y"], moveKey);
 *
 * @param {HTMLElement|String|jQuery} element An element to use the eg.Axes.MoveKeyInput module <ko>eg.Axes.MoveKeyInput ????????? ????????? ????????????</ko>
 * @param {MoveKeyInputOption} [options] The option object of the eg.Axes.MoveKeyInput module<ko>eg.Axes.MoveKeyInput ????????? ?????? ??????</ko>
 */

var MoveKeyInput =
/*#__PURE__*/
function () {
  function MoveKeyInput(el, options) {
    this.axes = [];
    this.element = null;
    this._isEnabled = false;
    this._isHolded = false;
    this._timer = null;
    this.element = $(el);
    this.options = __assign({
      scale: [1, 1]
    }, options);
    this.onKeydown = this.onKeydown.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
  }

  var __proto = MoveKeyInput.prototype;

  __proto.mapAxes = function (axes) {
    this.axes = axes;
  };

  __proto.connect = function (observer) {
    this.dettachEvent(); // add tabindex="0" to the container for making it focusable

    if (this.element.getAttribute("tabindex") !== "0") {
      this.element.setAttribute("tabindex", "0");
    }

    this.attachEvent(observer);
    return this;
  };

  __proto.disconnect = function () {
    this.dettachEvent();
    return this;
  };
  /**
  * Destroys elements, properties, and events used in a module.
  * @ko ????????? ????????? ??????????????? ??????, ???????????? ????????????.
  * @method eg.Axes.MoveKeyInput#destroy
  */


  __proto.destroy = function () {
    this.disconnect();
    this.element = null;
  };

  __proto.onKeydown = function (e) {
    if (!this._isEnabled) {
      return;
    }

    var isMoveKey = true;
    var direction = DIRECTION_FORWARD;
    var move = DIRECTION_HORIZONTAL$1;

    switch (e.keyCode) {
      case KEY_LEFT_ARROW:
      case KEY_A:
        direction = DIRECTION_REVERSE;
        break;

      case KEY_RIGHT_ARROW:
      case KEY_D:
        break;

      case KEY_DOWN_ARROW:
      case KEY_S:
        direction = DIRECTION_REVERSE;
        move = DIRECTION_VERTICAL$1;
        break;

      case KEY_UP_ARROW:
      case KEY_W:
        move = DIRECTION_VERTICAL$1;
        break;

      default:
        isMoveKey = false;
    }

    if (move === DIRECTION_HORIZONTAL$1 && !this.axes[0] || move === DIRECTION_VERTICAL$1 && !this.axes[1]) {
      isMoveKey = false;
    }

    if (!isMoveKey) {
      return;
    }

    var offsets = move === DIRECTION_HORIZONTAL$1 ? [+this.options.scale[0] * direction, 0] : [0, +this.options.scale[1] * direction];

    if (!this._isHolded) {
      this.observer.hold(this, event);
      this._isHolded = true;
    }

    clearTimeout(this._timer);
    this.observer.change(this, event, toAxis(this.axes, offsets));
  };

  __proto.onKeyup = function (e) {
    var _this = this;

    if (!this._isHolded) {
      return;
    }

    clearTimeout(this._timer);
    this._timer = setTimeout(function () {
      _this.observer.release(_this, e, toAxis(_this.axes, [0, 0]));

      _this._isHolded = false;
    }, DELAY);
  };

  __proto.attachEvent = function (observer) {
    this.observer = observer;
    this.element.addEventListener("keydown", this.onKeydown, false);
    this.element.addEventListener("keypress", this.onKeydown, false);
    this.element.addEventListener("keyup", this.onKeyup, false);
    this._isEnabled = true;
  };

  __proto.dettachEvent = function () {
    this.element.removeEventListener("keydown", this.onKeydown, false);
    this.element.removeEventListener("keypress", this.onKeydown, false);
    this.element.removeEventListener("keyup", this.onKeyup, false);
    this._isEnabled = false;
    this.observer = null;
  };
  /**
   * Enables input devices
   * @ko ?????? ????????? ????????? ??? ?????? ??????
   * @method eg.Axes.MoveKeyInput#enable
   * @return {eg.Axes.MoveKeyInput} An instance of a module itself <ko>?????? ????????? ????????????</ko>
   */


  __proto.enable = function () {
    this._isEnabled = true;
    return this;
  };
  /**
   * Disables input devices
   * @ko ?????? ????????? ????????? ??? ?????? ??????.
   * @method eg.Axes.MoveKeyInput#disable
   * @return {eg.Axes.MoveKeyInput} An instance of a module itself <ko>?????? ????????? ????????????</ko>
   */


  __proto.disable = function () {
    this._isEnabled = false;
    return this;
  };
  /**
   * Returns whether to use an input device
   * @ko ?????? ????????? ?????? ????????? ????????????.
   * @method eg.Axes.MoveKeyInput#isEnable
   * @return {Boolean} Whether to use an input device <ko>???????????? ????????????</ko>
   */


  __proto.isEnable = function () {
    return this._isEnabled;
  };

  return MoveKeyInput;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Axes);

//# sourceMappingURL=axes.esm.js.map


/***/ }),

/***/ "./node_modules/@egjs/axes/node_modules/@egjs/component/dist/component.esm.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@egjs/axes/node_modules/@egjs/component/dist/component.esm.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
Copyright (c) NAVER Corp.
name: @egjs/component
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-component
version: 2.2.2
*/
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

function isUndefined(value) {
  return typeof value === "undefined";
}
/**
 * A class used to manage events in a component
 * @ko ??????????????? ???????????? ????????? ??? ?????? ?????? ?????????
 * @alias eg.Component
 */


var Component =
/*#__PURE__*/
function () {
  /**
   * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
   */
  function Component() {
    /**
     * @deprecated
     * @private
     */
    this.options = {};
    this._eventHandler = {};
  }
  /**
   * Triggers a custom event.
   * @ko ????????? ???????????? ???????????????
   * @param {string} eventName The name of the custom event to be triggered <ko>????????? ????????? ???????????? ??????</ko>
   * @param {object} customEvent Event data to be sent when triggering a custom event <ko>????????? ???????????? ????????? ??? ????????? ?????????</ko>
   * @param {any[]} restParam Additional parameters when triggering a custom event <ko>????????? ???????????? ????????? ??? ????????? ??????????????? ????????? ?????????</ko>
   * @return Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">Ref</a> <ko>????????? ?????? ??????. ????????? ????????? ??????????????? stop() ???????????? ???????????? 'false'??? ???????????? ????????? ????????? ????????????. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">??????</a></ko>
   * @example
   * ```
   * class Some extends eg.Component {
   *   some(){
   *     if(this.trigger("beforeHi")){ // When event call to stop return false.
   *       this.trigger("hi");// fire hi event.
   *     }
   *   }
   * }
   *
   * const some = new Some();
   * some.on("beforeHi", (e) => {
   *   if(condition){
   *     e.stop(); // When event call to stop, `hi` event not call.
   *   }
   * });
   * some.on("hi", (e) => {
   *   // `currentTarget` is component instance.
   *   console.log(some === e.currentTarget); // true
   * });
   * // If you want to more know event design. You can see article.
   * // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
   * ```
   */


  var __proto = Component.prototype;

  __proto.trigger = function (eventName) {
    var _this = this;

    var params = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      params[_i - 1] = arguments[_i];
    }

    var handlerList = this._eventHandler[eventName] || [];
    var hasHandlerList = handlerList.length > 0;

    if (!hasHandlerList) {
      return true;
    }

    var customEvent = params[0] || {};
    var restParams = params.slice(1); // If detach method call in handler in first time then handler list calls.

    handlerList = handlerList.concat();
    var isCanceled = false; // This should be done like this to pass previous tests

    customEvent.eventType = eventName;

    customEvent.stop = function () {
      isCanceled = true;
    };

    customEvent.currentTarget = this;
    var arg = [customEvent];

    if (restParams.length >= 1) {
      arg = arg.concat(restParams);
    }

    handlerList.forEach(function (handler) {
      handler.apply(_this, arg);
    });
    return !isCanceled;
  };
  /**
   * Executed event just one time.
   * @ko ???????????? ????????? ????????????.
   * @param {string} eventName The name of the event to be attached <ko>????????? ???????????? ??????</ko>
   * @param {function} handlerToAttach The handler function of the event to be attached <ko>????????? ???????????? ????????? ??????</ko>
   * @return An instance of a component itself<ko>???????????? ????????? ????????????</ko>
   * @example
   * ```
   * class Some extends eg.Component {
   * hi() {
   *   alert("hi");
   * }
   * thing() {
   *   this.once("hi", this.hi);
   * }
   *
   * var some = new Some();
   * some.thing();
   * some.trigger("hi");
   * // fire alert("hi");
   * some.trigger("hi");
   * // Nothing happens
   * ```
   */


  __proto.once = function (eventName, handlerToAttach) {
    var _this = this;

    if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
      var eventHash = eventName;

      for (var key in eventHash) {
        this.once(key, eventHash[key]);
      }

      return this;
    } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
      var listener_1 = function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        handlerToAttach.apply(_this, args);

        _this.off(eventName, listener_1);
      };

      this.on(eventName, listener_1);
    }

    return this;
  };
  /**
   * Checks whether an event has been attached to a component.
   * @ko ??????????????? ???????????? ??????????????? ????????????.
   * @param {string} eventName The name of the event to be attached <ko>?????? ????????? ????????? ???????????? ??????</ko>
   * @return {boolean} Indicates whether the event is attached. <ko>????????? ?????? ??????</ko>
   * @example
   * ```
   * class Some extends eg.Component {
   *   some() {
   *     this.hasOn("hi");// check hi event.
   *   }
   * }
   * ```
   */


  __proto.hasOn = function (eventName) {
    return !!this._eventHandler[eventName];
  };
  /**
   * Attaches an event to a component.
   * @ko ??????????????? ???????????? ????????????.
   * @param {string} eventName The name of the event to be attached <ko>????????? ???????????? ??????</ko>
   * @param {function} handlerToAttach The handler function of the event to be attached <ko>????????? ???????????? ????????? ??????</ko>
   * @return An instance of a component itself<ko>???????????? ????????? ????????????</ko>
   * @example
   * ```
   * class Some extends eg.Component {
   *   hi() {
   *     console.log("hi");
   *   }
   *   some() {
   *     this.on("hi",this.hi); //attach event
   *   }
   * }
   * ```
   */


  __proto.on = function (eventName, handlerToAttach) {
    if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
      var eventHash = eventName;

      for (var name in eventHash) {
        this.on(name, eventHash[name]);
      }

      return this;
    } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
      var handlerList = this._eventHandler[eventName];

      if (isUndefined(handlerList)) {
        this._eventHandler[eventName] = [];
        handlerList = this._eventHandler[eventName];
      }

      handlerList.push(handlerToAttach);
    }

    return this;
  };
  /**
   * Detaches an event from the component.
   * @ko ??????????????? ????????? ???????????? ????????????
   * @param {string} eventName The name of the event to be detached <ko>????????? ???????????? ??????</ko>
   * @param {function} handlerToDetach The handler function of the event to be detached <ko>????????? ???????????? ????????? ??????</ko>
   * @return An instance of a component itself <ko>???????????? ????????? ????????????</ko>
   * @example
   * ```
   * class Some extends eg.Component {
   *   hi() {
   *     console.log("hi");
   *   }
   *   some() {
   *     this.off("hi",this.hi); //detach event
   *   }
   * }
   * ```
   */


  __proto.off = function (eventName, handlerToDetach) {
    var e_1, _a; // Detach all event handlers.


    if (isUndefined(eventName)) {
      this._eventHandler = {};
      return this;
    } // Detach all handlers for eventname or detach event handlers by object.


    if (isUndefined(handlerToDetach)) {
      if (typeof eventName === "string") {
        delete this._eventHandler[eventName];
        return this;
      } else {
        var eventHash = eventName;

        for (var name in eventHash) {
          this.off(name, eventHash[name]);
        }

        return this;
      }
    } // Detach single event handler


    var handlerList = this._eventHandler[eventName];

    if (handlerList) {
      var idx = 0;

      try {
        for (var handlerList_1 = __values(handlerList), handlerList_1_1 = handlerList_1.next(); !handlerList_1_1.done; handlerList_1_1 = handlerList_1.next()) {
          var handlerFunction = handlerList_1_1.value;

          if (handlerFunction === handlerToDetach) {
            handlerList.splice(idx, 1);
            break;
          }

          idx++;
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (handlerList_1_1 && !handlerList_1_1.done && (_a = handlerList_1.return)) _a.call(handlerList_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }

    return this;
  };
  /**
   * Version info string
   * @ko ???????????? ?????????
   * @name VERSION
   * @static
   * @example
   * eg.Component.VERSION;  // ex) 2.0.0
   * @memberof eg.Component
   */


  Component.VERSION = "2.2.2";
  return Component;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);
//# sourceMappingURL=component.esm.js.map


/***/ }),

/***/ "./node_modules/@egjs/component/dist/component.esm.js":
/*!************************************************************!*\
  !*** ./node_modules/@egjs/component/dist/component.esm.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "ComponentEvent": () => (/* binding */ ComponentEvent$1)
/* harmony export */ });
/*
Copyright (c) NAVER Corp.
name: @egjs/component
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-component
version: 3.0.1
*/
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
var isUndefined = function (value) {
  return typeof value === "undefined";
};

/**
 * Event class to provide additional properties
 * @ko Component?????? ???????????? ??????????????? ???????????? ????????? ?????????
 */

var ComponentEvent =
/*#__PURE__*/
function () {
  /**
   * Create a new instance of ComponentEvent.
   * @ko ComponentEvent??? ????????? ??????????????? ????????????.
   * @param eventType The name of the event.<ko>????????? ??????.</ko>
   * @param props An object that contains additional event properties.<ko>???????????? ????????? ???????????? ????????????.</ko>
   */
  function ComponentEvent(eventType, props) {
    var e_1, _a;

    this.eventType = eventType;
    this._canceled = false;
    if (!props) return;

    try {
      for (var _b = __values(Object.keys(props)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var key = _c.value; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

        this[key] = props[key];
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
  }
  /**
   * Stop the event. {@link ComponentEvent#isCanceled} will return `true` after.
   * @ko ???????????? ????????????. ?????? {@link ComponentEvent#isCanceled}??? `true`??? ????????????.
   */


  var __proto = ComponentEvent.prototype;

  __proto.stop = function () {
    this._canceled = true;
  };
  /**
   * Returns a boolean value that indicates whether {@link ComponentEvent#stop} is called before.
   * @ko {@link ComponentEvent#stop}??? ?????????????????? ????????? ????????????.
   * @return {boolean} A boolean value that indicates whether {@link ComponentEvent#stop} is called before.<ko>????????? {@link ComponentEvent#stop}??? ??????????????? ????????? ????????????.</ko>
   */


  __proto.isCanceled = function () {
    return this._canceled;
  };

  return ComponentEvent;
}();

/**
 * A class used to manage events in a component
 * @ko ??????????????? ???????????? ????????? ??? ?????? ?????? ?????????
 */

var Component =
/*#__PURE__*/
function () {
  /**
   * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
   */
  function Component() {
    this._eventHandler = {};
  }
  /**
   * Trigger a custom event.
   * @ko ????????? ???????????? ???????????????
   * @param {string | ComponentEvent} event The name of the custom event to be triggered or an instance of the ComponentEvent<ko>????????? ????????? ???????????? ?????? ?????? ComponentEvent??? ????????????</ko>
   * @param {any[]} params Event data to be sent when triggering a custom event <ko>????????? ???????????? ????????? ??? ????????? ?????????</ko>
   * @return An instance of the component itself<ko>???????????? ????????? ????????????</ko>
   * @example
   * ```ts
   * import Component, { ComponentEvent } from "@egjs/component";
   *
   * class Some extends Component<{
   *   beforeHi: ComponentEvent<{ foo: number; bar: string }>;
   *   hi: { foo: { a: number; b: boolean } };
   *   someEvent: (foo: number, bar: string) => void;
   *   someOtherEvent: void; // When there's no event argument
   * }> {
   *   some(){
   *     if(this.trigger("beforeHi")){ // When event call to stop return false.
   *       this.trigger("hi");// fire hi event.
   *     }
   *   }
   * }
   *
   * const some = new Some();
   * some.on("beforeHi", e => {
   *   if(condition){
   *     e.stop(); // When event call to stop, `hi` event not call.
   *   }
   *   // `currentTarget` is component instance.
   *   console.log(some === e.currentTarget); // true
   *
   *   typeof e.foo; // number
   *   typeof e.bar; // string
   * });
   * some.on("hi", e => {
   *   typeof e.foo.b; // boolean
   * });
   * // If you want to more know event design. You can see article.
   * // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
   * ```
   */


  var __proto = Component.prototype;

  __proto.trigger = function (event) {
    var params = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      params[_i - 1] = arguments[_i];
    }

    var eventName = event instanceof ComponentEvent ? event.eventType : event;

    var handlers = __spread(this._eventHandler[eventName] || []);

    if (handlers.length <= 0) {
      return this;
    }

    if (event instanceof ComponentEvent) {
      event.currentTarget = this;
      handlers.forEach(function (handler) {
        handler(event);
      });
    } else {
      handlers.forEach(function (handler) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        handler.apply(void 0, __spread(params));
      });
    }

    return this;
  };
  /**
   * Executed event just one time.
   * @ko ???????????? ????????? ????????????.
   * @param {string} eventName The name of the event to be attached or an event name - event handler mapped object.<ko>????????? ???????????? ?????? ?????? ????????? ??????-????????? ????????????</ko>
   * @param {function} handlerToAttach The handler function of the event to be attached <ko>????????? ???????????? ????????? ??????</ko>
   * @return An instance of the component itself<ko>???????????? ????????? ????????????</ko>
   * @example
   * ```ts
   * import Component, { ComponentEvent } from "@egjs/component";
   *
   * class Some extends Component<{
   *   hi: ComponentEvent;
   * }> {
   *   hi() {
   *     alert("hi");
   *   }
   *   thing() {
   *     this.once("hi", this.hi);
   *   }
   * }
   *
   * var some = new Some();
   * some.thing();
   * some.trigger(new ComponentEvent("hi"));
   * // fire alert("hi");
   * some.trigger(new ComponentEvent("hi"));
   * // Nothing happens
   * ```
   */


  __proto.once = function (eventName, handlerToAttach) {
    var _this = this;

    if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
      var eventHash = eventName;

      for (var key in eventHash) {
        this.once(key, eventHash[key]);
      }

      return this;
    } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
      var listener_1 = function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        } // eslint-disable-next-line @typescript-eslint/no-unsafe-call


        handlerToAttach.apply(void 0, __spread(args));

        _this.off(eventName, listener_1);
      };

      this.on(eventName, listener_1);
    }

    return this;
  };
  /**
   * Checks whether an event has been attached to a component.
   * @ko ??????????????? ???????????? ??????????????? ????????????.
   * @param {string} eventName The name of the event to be attached <ko>?????? ????????? ????????? ???????????? ??????</ko>
   * @return {boolean} Indicates whether the event is attached. <ko>????????? ?????? ??????</ko>
   * @example
   * ```ts
   * import Component from "@egjs/component";
   *
   * class Some extends Component<{
   *   hi: void;
   * }> {
   *   some() {
   *     this.hasOn("hi");// check hi event.
   *   }
   * }
   * ```
   */


  __proto.hasOn = function (eventName) {
    return !!this._eventHandler[eventName];
  };
  /**
   * Attaches an event to a component.
   * @ko ??????????????? ???????????? ????????????.
   * @param {string} eventName The name of the event to be attached or an event name - event handler mapped object.<ko>????????? ???????????? ?????? ?????? ????????? ??????-????????? ????????????</ko>
   * @param {function} handlerToAttach The handler function of the event to be attached <ko>????????? ???????????? ????????? ??????</ko>
   * @return An instance of a component itself<ko>???????????? ????????? ????????????</ko>
   * @example
   * ```ts
   * import Component, { ComponentEvent } from "@egjs/component";
   *
   * class Some extends Component<{
   *   hi: void;
   * }> {
   *   hi() {
   *     console.log("hi");
   *   }
   *   some() {
   *     this.on("hi",this.hi); //attach event
   *   }
   * }
   * ```
   */


  __proto.on = function (eventName, handlerToAttach) {
    if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
      var eventHash = eventName;

      for (var name in eventHash) {
        this.on(name, eventHash[name]);
      }

      return this;
    } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
      var handlerList = this._eventHandler[eventName];

      if (isUndefined(handlerList)) {
        this._eventHandler[eventName] = [];
        handlerList = this._eventHandler[eventName];
      }

      handlerList.push(handlerToAttach);
    }

    return this;
  };
  /**
   * Detaches an event from the component.<br/>If the `eventName` is not given this will detach all event handlers attached.<br/>If the `handlerToDetach` is not given, this will detach all event handlers for `eventName`.
   * @ko ??????????????? ????????? ???????????? ????????????.<br/>`eventName`??? ???????????? ????????? ?????? ?????? ????????? ???????????? ????????????.<br/>`handlerToAttach`??? ???????????? ????????? ?????? `eventName`??? ???????????? ?????? ????????? ???????????? ????????????.
   * @param {string?} eventName The name of the event to be detached <ko>????????? ???????????? ??????</ko>
   * @param {function?} handlerToDetach The handler function of the event to be detached <ko>????????? ???????????? ????????? ??????</ko>
   * @return An instance of a component itself <ko>???????????? ????????? ????????????</ko>
   * @example
   * ```ts
   * import Component, { ComponentEvent } from "@egjs/component";
   *
   * class Some extends Component<{
   *   hi: void;
   * }> {
   *   hi() {
   *     console.log("hi");
   *   }
   *   some() {
   *     this.off("hi",this.hi); //detach event
   *   }
   * }
   * ```
   */


  __proto.off = function (eventName, handlerToDetach) {
    var e_1, _a; // Detach all event handlers.


    if (isUndefined(eventName)) {
      this._eventHandler = {};
      return this;
    } // Detach all handlers for eventname or detach event handlers by object.


    if (isUndefined(handlerToDetach)) {
      if (typeof eventName === "string") {
        delete this._eventHandler[eventName];
        return this;
      } else {
        var eventHash = eventName;

        for (var name in eventHash) {
          this.off(name, eventHash[name]);
        }

        return this;
      }
    } // Detach single event handler


    var handlerList = this._eventHandler[eventName];

    if (handlerList) {
      var idx = 0;

      try {
        for (var handlerList_1 = __values(handlerList), handlerList_1_1 = handlerList_1.next(); !handlerList_1_1.done; handlerList_1_1 = handlerList_1.next()) {
          var handlerFunction = handlerList_1_1.value;

          if (handlerFunction === handlerToDetach) {
            handlerList.splice(idx, 1);

            if (handlerList.length <= 0) {
              delete this._eventHandler[eventName];
            }

            break;
          }

          idx++;
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (handlerList_1_1 && !handlerList_1_1.done && (_a = handlerList_1.return)) _a.call(handlerList_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }

    return this;
  };
  /**
   * Version info string
   * @ko ???????????? ?????????
   * @name VERSION
   * @static
   * @example
   * Component.VERSION;  // ex) 3.0.0
   * @memberof Component
   */


  Component.VERSION = "3.0.1";
  return Component;
}();

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

var ComponentEvent$1 = ComponentEvent;

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Component);

//# sourceMappingURL=component.esm.js.map


/***/ }),

/***/ "./node_modules/@egjs/flicking-plugins/dist/plugins.esm.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@egjs/flicking-plugins/dist/plugins.esm.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ARROW": () => (/* binding */ ARROW),
/* harmony export */   "Arrow": () => (/* binding */ Arrow),
/* harmony export */   "AutoPlay": () => (/* binding */ AutoPlay),
/* harmony export */   "Fade": () => (/* binding */ Fade),
/* harmony export */   "PAGINATION": () => (/* binding */ PAGINATION),
/* harmony export */   "Pagination": () => (/* binding */ Pagination),
/* harmony export */   "Parallax": () => (/* binding */ Parallax),
/* harmony export */   "SYNC": () => (/* binding */ SYNC),
/* harmony export */   "Sync": () => (/* binding */ Sync)
/* harmony export */ });
/* harmony import */ var _egjs_flicking__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @egjs/flicking */ "./node_modules/@egjs/flicking/dist/flicking.esm.js");
/*
Copyright (c) 2019-present NAVER Corp.
name: @egjs/flicking-plugins
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-flicking-plugins
version: 4.2.1
*/


/**
 * You can apply parallax effect while panel is moving.
 * @ko ???????????? ??????????????? parallax ????????? ????????? ??? ????????????.
 * @memberof Flicking.Plugins
 */

var Parallax =
/*#__PURE__*/
function () {
  /**
   * @param {string} selector Selector of the element to apply parallax effect<ko> Parallax ????????? ????????? ??????????????? ????????? </ko>
   * @param {number} scale Effect amplication scale<ko>?????? ?????????</ko>
   * @example
   * ```ts
   * flicking.addPlugins(new Parallax("img", 1));
   * ```
   */
  function Parallax(selector, scale) {
    var _this = this;

    if (selector === void 0) {
      selector = "";
    }

    if (scale === void 0) {
      scale = 1;
    }

    this.update = function () {
      _this._onMove();
    };

    this._onMove = function () {
      var flicking = _this._flicking;
      if (!flicking) return;
      var panels = flicking.visiblePanels;
      panels.forEach(function (panel) {
        var progress = panel.outsetProgress;
        var el = panel.element;
        var target = _this._selector ? el.querySelector(_this._selector) : el;
        var parentTarget = target.parentNode;
        var rect = target.getBoundingClientRect();
        var parentRect = parentTarget.getBoundingClientRect();
        var position = (parentRect.width - rect.width) / 2 * progress * _this._scale;
        var transform = "translate(-50%) translate(" + position + "px)";
        var style = target.style;
        style.cssText += "transform: " + transform + ";-webkit-transform: " + transform + ";-ms-transform:" + transform;
      });
    };

    this._flicking = null;
    this._selector = selector;
    this._scale = scale;
  }

  var __proto = Parallax.prototype;
  Object.defineProperty(__proto, "selector", {
    get: function () {
      return this._selector;
    },
    set: function (val) {
      this._selector = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "scale", {
    get: function () {
      return this._scale;
    },
    set: function (val) {
      this._scale = val;
    },
    enumerable: false,
    configurable: true
  });

  __proto.init = function (flicking) {
    if (this._flicking) {
      this.destroy();
    }

    this._flicking = flicking;
    flicking.on(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MOVE, this._onMove);
    flicking.on(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.AFTER_RESIZE, this.update);

    this._onMove();
  };

  __proto.destroy = function () {
    if (!this._flicking) return;

    this._flicking.off(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MOVE, this._onMove);

    this._flicking = null;
  };

  return Parallax;
}();

/**
 * You can apply fade in / out effect while panel is moving.
 * @ko ???????????? ??????????????? fade in / out ????????? ????????? ??? ????????????.
 * @memberof Flicking.Plugins
 */

var Fade =
/*#__PURE__*/
function () {
  /**
   * @param - The selector of the element to which the fade effect is to be applied. If the selector is blank, it applies to panel element. <ko>Fade ????????? ????????? ????????? ?????????. ???????????? ???????????? ?????? ??????????????? ????????????.</ko>
   * @param - Effect amplication scale<ko>?????? ?????????</ko>
   * @example
   * ```ts
   * flicking.addPlugins(new Fade("p", 1));
   * ```
   */
  function Fade(selector, scale) {
    var _this = this;

    if (selector === void 0) {
      selector = "";
    }

    if (scale === void 0) {
      scale = 1;
    }

    this.update = function () {
      _this._onMove();
    };

    this._onMove = function () {
      var flicking = _this._flicking;
      var selector = _this._selector;
      var scale = _this._scale;
      if (!flicking) return;
      var panels = flicking.visiblePanels;
      panels.forEach(function (panel) {
        var progress = panel.outsetProgress;
        var el = panel.element;
        var target = selector ? el.querySelector(selector) : el;
        var opacity = Math.min(1, Math.max(0, 1 - Math.abs(progress * scale)));
        target.style.opacity = "" + opacity;
      });
    };

    this._flicking = null;
    this._selector = selector;
    this._scale = scale;
  }

  var __proto = Fade.prototype;
  Object.defineProperty(__proto, "selector", {
    get: function () {
      return this._selector;
    },
    set: function (val) {
      this._selector = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "scale", {
    get: function () {
      return this._scale;
    },
    set: function (val) {
      this._scale = val;
    },
    enumerable: false,
    configurable: true
  });

  __proto.init = function (flicking) {
    if (this._flicking) {
      this.destroy();
    }

    this._flicking = flicking;
    flicking.on(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MOVE, this._onMove);
    flicking.on(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.AFTER_RESIZE, this.update);

    this._onMove();
  };

  __proto.destroy = function () {
    if (!this._flicking) return;

    this._flicking.off(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MOVE, this._onMove);

    this._flicking = null;
  };

  return Fade;
}();

/**
 * Plugin that allow you to automatically move to the next/previous panel, on a specific time basis
 * @ko ?????? ????????????, ???????????? ??????/?????? ????????? ??????????????? ??? ??? ?????? ????????????
 * @memberof Flicking.Plugins
 */

var AutoPlay =
/*#__PURE__*/
function () {
  /**
   * @param {AutoPlayOptions} options Options for the AutoPlay instance.<ko>AutoPlay ??????</ko>
   * @param {number} options.duration Time to wait before moving on to the next panel.<ko>?????? ????????? ?????????????????? ?????? ??????</ko>
   * @param {"PREV" | "NEXT"} options.direction The direction in which the panel moves.<ko>????????? ???????????? ??????</ko>
   * @param {boolean} options.stopOnHover Whether to stop when mouse hover upon the element.<ko>??????????????? ???????????? ????????? ??? AutoPlay??? ???????????? ??????</ko>
   * @example
   * ```ts
   * flicking.addPlugins(new AutoPlay({ duration: 2000, direction: "NEXT" }));
   * ```
   */
  function AutoPlay(_a) {
    var _this = this;

    var _b = _a === void 0 ? {} : _a,
        _c = _b.duration,
        duration = _c === void 0 ? 2000 : _c,
        _d = _b.direction,
        direction = _d === void 0 ? _egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NEXT : _d,
        _e = _b.stopOnHover,
        stopOnHover = _e === void 0 ? false : _e;
    /* Internal Values */


    this._flicking = null;
    this._timerId = 0;
    this._mouseEntered = false;

    this.play = function () {
      var flicking = _this._flicking;
      var direction = _this._direction;

      if (!flicking) {
        return;
      }

      _this.stop();

      if (_this._mouseEntered || flicking.animating) {
        return;
      }

      _this._timerId = window.setTimeout(function () {
        if (direction === _egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NEXT) {
          flicking.next().catch(function () {
            return void 0;
          });
        } else {
          flicking.prev().catch(function () {
            return void 0;
          });
        }

        _this.play();
      }, _this._duration);
    };

    this.stop = function () {
      clearTimeout(_this._timerId);
    };

    this._onMouseEnter = function () {
      _this._mouseEntered = true;

      _this.stop();
    };

    this._onMouseLeave = function () {
      _this._mouseEntered = false;

      _this.play();
    };

    this._duration = duration;
    this._direction = direction;
    this._stopOnHover = stopOnHover;
  }

  var __proto = AutoPlay.prototype;
  Object.defineProperty(__proto, "duration", {
    get: function () {
      return this._duration;
    },
    set: function (val) {
      this._duration = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "direction", {
    get: function () {
      return this._direction;
    },
    set: function (val) {
      this._direction = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "stopOnHover", {
    get: function () {
      return this._stopOnHover;
    },
    set: function (val) {
      this._stopOnHover = val;
    },
    enumerable: false,
    configurable: true
  });

  __proto.init = function (flicking) {
    var _a;

    if (this._flicking) {
      this.destroy();
    }

    flicking.on((_a = {}, _a[_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MOVE_START] = this.stop, _a[_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.HOLD_START] = this.stop, _a[_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MOVE_END] = this.play, _a[_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.SELECT] = this.play, _a));
    this._flicking = flicking;

    if (this._stopOnHover) {
      var targetEl = this._flicking.element;
      targetEl.addEventListener("mouseenter", this._onMouseEnter, false);
      targetEl.addEventListener("mouseleave", this._onMouseLeave, false);
    }

    this.play();
  };

  __proto.destroy = function () {
    var flicking = this._flicking;
    this._mouseEntered = false;
    this.stop();

    if (!flicking) {
      return;
    }

    flicking.off(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MOVE_START, this.stop);
    flicking.off(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.HOLD_START, this.stop);
    flicking.off(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MOVE_END, this.play);
    flicking.off(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.SELECT, this.play);
    var targetEl = flicking.element;
    targetEl.removeEventListener("mouseenter", this._onMouseEnter, false);
    targetEl.removeEventListener("mouseleave", this._onMouseLeave, false);
    this._flicking = null;
  };

  __proto.update = function () {// DO-NOTHING
  };

  return AutoPlay;
}();

var BROWSER = {
  CLICK: "click",
  MOUSE_DOWN: "mousedown",
  TOUCH_START: "touchstart"
};

var ARROW = {
  PREV_SELECTOR: ".flicking-arrow-prev",
  NEXT_SELECTOR: ".flicking-arrow-next",
  DISABLED_CLASS: "flicking-arrow-disabled"
};
var PAGINATION = {
  SELECTOR: ".flicking-pagination",
  PREFIX: "flicking-pagination",
  BULLET_WRAPPER_SUFFIX: "bullets",
  BULLET_SUFFIX: "bullet",
  BULLET_ACTIVE_SUFFIX: "bullet-active",
  FRACTION_WRAPPER_SUFFIX: "fraction",
  FRACTION_CURRENT_SUFFIX: "fraction-current",
  FRACTION_TOTAL_SUFFIX: "fraction-total",
  SCROLL_UNINIT_SUFFIX: "uninitialized",
  SCROLL_WRAPPER_SUFFIX: "scroll",
  SCROLL_SLIDER_SUFFIX: "slider",
  SCROLL_PREV_SUFFIX: "bullet-prev",
  SCROLL_NEXT_SUFFIX: "bullet-next",
  TYPE: {
    BULLET: "bullet",
    FRACTION: "fraction",
    SCROLL: "scroll"
  }
};
var SYNC = {
  TYPE: {
    CAMERA: "camera",
    INDEX: "index"
  }
};

var addClass = function (el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    var classes = el.className.split(" ");

    if (classes.indexOf(className) < 0) {
      el.className = el.className + " " + className;
    }
  }
};
var removeClass = function (el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    var classRegex = new RegExp("( |^)" + className + "( |$)", "g");
    el.className.replace(classRegex, " ");
  }
};
var getElement = function (selector, parent, pluginName) {
  var el = parent.querySelector(selector);

  if (!el) {
    throw new Error("[Flicking-" + pluginName + "] Couldn't find element with the given selector: " + selector);
  }

  return el;
};

/**
 * A plugin to easily create prev/right arrow button of Flicking
 * @ko ??????/?????? ????????? ?????? ?????? ??? ?????? ????????????
 * @memberof Flicking.Plugins
 */

var Arrow =
/*#__PURE__*/
function () {
  function Arrow(_a) {
    var _this = this;

    var _b = _a === void 0 ? {} : _a,
        _c = _b.parentEl,
        parentEl = _c === void 0 ? null : _c,
        _d = _b.prevElSelector,
        prevElSelector = _d === void 0 ? ARROW.PREV_SELECTOR : _d,
        _e = _b.nextElSelector,
        nextElSelector = _e === void 0 ? ARROW.NEXT_SELECTOR : _e,
        _f = _b.disabledClass,
        disabledClass = _f === void 0 ? ARROW.DISABLED_CLASS : _f,
        _g = _b.moveCount,
        moveCount = _g === void 0 ? 1 : _g,
        _h = _b.moveByViewportSize,
        moveByViewportSize = _h === void 0 ? false : _h;
    /* Internal Values */


    this._flicking = null;

    this._preventInputPropagation = function (e) {
      e.stopPropagation();
    };

    this._onPrevClick = function () {
      var flicking = _this._flicking;
      var camera = flicking.camera;
      var anchorPoints = camera.anchorPoints;
      if (flicking.animating || anchorPoints.length <= 0) return;
      var firstAnchor = anchorPoints[0];
      var moveCount = _this._moveCount;

      if (_this._moveByViewportSize) {
        flicking.control.moveToPosition(camera.position - camera.size, flicking.duration).catch(_this._onCatch);
      } else {
        if (flicking.circularEnabled) {
          var targetPanel = flicking.currentPanel;

          for (var i = 0; i < moveCount; i++) {
            targetPanel = targetPanel.prev();
          }

          targetPanel.focus().catch(_this._onCatch);
        } else if (flicking.index > firstAnchor.panel.index) {
          flicking.moveTo(Math.max(flicking.index - moveCount, firstAnchor.panel.index)).catch(_this._onCatch);
        } else if (camera.position > camera.range.min) {
          flicking.moveTo(flicking.index).catch(_this._onCatch);
        }
      }
    };

    this._onNextClick = function () {
      var flicking = _this._flicking;
      var camera = flicking.camera;
      var anchorPoints = camera.anchorPoints;
      if (flicking.animating || anchorPoints.length <= 0) return;
      var lastAnchor = anchorPoints[anchorPoints.length - 1];
      var moveCount = _this._moveCount;

      if (_this._moveByViewportSize) {
        flicking.control.moveToPosition(camera.position + camera.size, flicking.duration).catch(_this._onCatch);
      } else {
        if (flicking.circularEnabled) {
          var targetPanel = flicking.currentPanel;

          for (var i = 0; i < moveCount; i++) {
            targetPanel = targetPanel.next();
          }

          targetPanel.focus().catch(_this._onCatch);
        } else if (flicking.index < lastAnchor.panel.index) {
          flicking.moveTo(Math.min(flicking.index + moveCount, lastAnchor.panel.index)).catch(_this._onCatch);
        } else if (camera.position > camera.range.min) {
          flicking.moveTo(flicking.index).catch(_this._onCatch);
        }
      }
    };

    this._onAnimation = function () {
      var flicking = _this._flicking;
      var camera = flicking.camera;
      var controller = flicking.control.controller;

      if (flicking.holding) {
        _this._updateClass(camera.position);
      } else {
        _this._updateClass(controller.animatingContext.end);
      }
    };

    this._onCatch = function (err) {
      if (err instanceof _egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.FlickingError) return;
      throw err;
    };

    this._parentEl = parentEl;
    this._prevElSelector = prevElSelector;
    this._nextElSelector = nextElSelector;
    this._disabledClass = disabledClass;
    this._moveCount = moveCount;
    this._moveByViewportSize = moveByViewportSize;
  }

  var __proto = Arrow.prototype;
  Object.defineProperty(__proto, "prevEl", {
    get: function () {
      return this._prevEl;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "nextEl", {
    get: function () {
      return this._nextEl;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "parentEl", {
    get: function () {
      return this._parentEl;
    },
    set: function (val) {
      this._parentEl = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "prevElSelector", {
    get: function () {
      return this._prevElSelector;
    },
    set: function (val) {
      this._prevElSelector = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "nextElSelector", {
    get: function () {
      return this._nextElSelector;
    },
    set: function (val) {
      this._nextElSelector = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "disabledClass", {
    get: function () {
      return this._disabledClass;
    },
    set: function (val) {
      this._disabledClass = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "moveCount", {
    get: function () {
      return this._moveCount;
    },
    set: function (val) {
      this._moveCount = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "moveByViewportSize", {
    get: function () {
      return this._moveByViewportSize;
    },
    set: function (val) {
      this._moveByViewportSize = val;
    },
    enumerable: false,
    configurable: true
  });

  __proto.init = function (flicking) {
    var _this = this;

    if (this._flicking) {
      this.destroy();
    }

    this._flicking = flicking;
    flicking.on(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MOVE, this._onAnimation);
    var parentEl = this._parentEl ? this._parentEl : flicking.element;
    var prevEl = getElement(this._prevElSelector, parentEl, "Arrow");
    var nextEl = getElement(this._nextElSelector, parentEl, "Arrow");
    [BROWSER.MOUSE_DOWN, BROWSER.TOUCH_START].forEach(function (evt) {
      prevEl.addEventListener(evt, _this._preventInputPropagation);
      nextEl.addEventListener(evt, _this._preventInputPropagation);
    });
    prevEl.addEventListener(BROWSER.CLICK, this._onPrevClick);
    nextEl.addEventListener(BROWSER.CLICK, this._onNextClick);
    this._prevEl = prevEl;
    this._nextEl = nextEl;
    this.update();
  };

  __proto.destroy = function () {
    var _this = this;

    var flicking = this._flicking;

    if (!flicking) {
      return;
    }

    flicking.off(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MOVE, this._onAnimation);
    var prevEl = this._prevEl;
    var nextEl = this._nextEl;
    [BROWSER.MOUSE_DOWN, BROWSER.TOUCH_START].forEach(function (evt) {
      prevEl.removeEventListener(evt, _this._preventInputPropagation);
      nextEl.removeEventListener(evt, _this._preventInputPropagation);
    });
    prevEl.removeEventListener(BROWSER.CLICK, this._onPrevClick);
    nextEl.removeEventListener(BROWSER.CLICK, this._onNextClick);
    this._flicking = null;
  };

  __proto.update = function () {
    this._updateClass(this._flicking.camera.position);
  };

  __proto._updateClass = function (pos) {
    var flicking = this._flicking;
    var disabledClass = this._disabledClass;
    var prevEl = this._prevEl;
    var nextEl = this._nextEl;
    var cameraRange = flicking.camera.range;
    var stopAtPrevEdge = flicking.circularEnabled ? false : pos <= cameraRange.min;
    var stopAtNextEdge = flicking.circularEnabled ? false : pos >= cameraRange.max;

    if (stopAtPrevEdge) {
      addClass(prevEl, disabledClass);
    } else {
      removeClass(prevEl, disabledClass);
    }

    if (stopAtNextEdge) {
      addClass(nextEl, disabledClass);
    } else {
      removeClass(nextEl, disabledClass);
    }
  };

  return Arrow;
}();

/**
 * Plugin for synchronizing multiple flickings
 * @ko ????????? ????????? Flicking?????? ?????? ???????????? ??? ??? ????????????.
 * @memberof Flicking.Plugins
 */

var Sync =
/*#__PURE__*/
function () {
  /** */
  function Sync(_a) {
    var _this = this;

    var _b = _a === void 0 ? {} : _a,
        _c = _b.type,
        type = _c === void 0 ? SYNC.TYPE.CAMERA : _c,
        _d = _b.synchronizedFlickingOptions,
        synchronizedFlickingOptions = _d === void 0 ? [] : _d;
    /* Internal Values */


    this._flicking = null;

    this._addEvents = function (synchronizedFlickingOptions) {
      synchronizedFlickingOptions.forEach(function (_a) {
        var flicking = _a.flicking,
            isSlidable = _a.isSlidable,
            isClickable = _a.isClickable;

        if (_this._type === "camera") {
          flicking.on(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MOVE, _this._onMove);
          flicking.on(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MOVE_START, _this._onMoveStart);
          flicking.on(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MOVE_END, _this._onMoveEnd);
        }

        if (_this._type === "index" && isSlidable) {
          flicking.on(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.WILL_CHANGE, _this._onIndexChange);
        }

        if (isClickable) {
          flicking.on(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.SELECT, _this._onIndexChange);
        }
      });
    };

    this._removeEvents = function (synchronizedFlickingOptions) {
      synchronizedFlickingOptions.forEach(function (_a) {
        var flicking = _a.flicking,
            isSlidable = _a.isSlidable,
            isClickable = _a.isClickable;

        if (_this._type === "camera") {
          flicking.off(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MOVE, _this._onMove);
          flicking.off(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MOVE_START, _this._onMoveStart);
          flicking.off(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.MOVE_END, _this._onMoveEnd);
        }

        if (_this._type === "index" && isSlidable) {
          flicking.off(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.WILL_CHANGE, _this._onIndexChange);
        }

        if (isClickable) {
          flicking.off(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.SELECT, _this._onIndexChange);
        }
      });
    };

    this._onIndexChange = function (e) {
      var flicking = e.currentTarget;

      if (!flicking.initialized) {
        return;
      }

      _this._synchronizeByIndex(flicking, e.index);
    };

    this._onMove = function (e) {
      var camera = e.currentTarget.camera;
      var progress = (camera.position - camera.range.min) / camera.rangeDiff;

      _this._synchronizedFlickingOptions.forEach(function (_a) {
        var flicking = _a.flicking;

        if (flicking !== e.currentTarget) {
          if (camera.position < camera.range.min) {
            void flicking.camera.lookAt(camera.position);
          } else if (camera.position > camera.range.max) {
            void flicking.camera.lookAt(flicking.camera.range.max + camera.position - camera.range.max);
          } else {
            void flicking.camera.lookAt(flicking.camera.range.min + flicking.camera.rangeDiff * progress);
          }
        }
      });
    };

    this._onMoveStart = function (e) {
      _this._synchronizedFlickingOptions.forEach(function (_a) {
        var flicking = _a.flicking;

        if (flicking !== e.currentTarget) {
          flicking.disableInput();
        }
      });
    };

    this._onMoveEnd = function (e) {
      _this._synchronizedFlickingOptions.forEach(function (_a) {
        var flicking = _a.flicking;

        if (flicking !== e.currentTarget) {
          flicking.enableInput();
          flicking.control.updateInput();
        }
      });
    };

    this._synchronizeByIndex = function (activeFlicking, index) {
      var synchronizedFlickingOptions = _this._synchronizedFlickingOptions;
      var activePanel = activeFlicking.panels.find(function (panel) {
        return panel.index === index;
      });
      var lastPanel = activeFlicking.panels[activeFlicking.panels.length - 1];

      if (!activePanel) {
        return;
      }

      _this._preventEvent(function () {
        synchronizedFlickingOptions.forEach(function (_a) {
          var flicking = _a.flicking,
              activeClass = _a.activeClass; // calculate new target flicking position with active flicking size and target flicking size

          var targetLastPanel = flicking.panels[flicking.panels.length - 1];
          var targetPos = activePanel.position / (lastPanel.position + lastPanel.size / 2) * (targetLastPanel.position + targetLastPanel.size / 2);
          flicking.control.moveToPosition(targetPos, 500).catch(function () {
            return void 0;
          });

          if (activeClass) {
            _this._updateClass({
              flicking: flicking,
              activeClass: activeClass
            }, targetPos);
          }
        });
      });
    };

    this._updateClass = function (synchronizedFlickingOption, pos) {
      var target = _this._findNearsetPanel(synchronizedFlickingOption.flicking, pos);

      synchronizedFlickingOption.flicking.panels.forEach(function (panel) {
        return panel.index === target.index ? addClass(panel.element, synchronizedFlickingOption.activeClass) : removeClass(panel.element, synchronizedFlickingOption.activeClass);
      });
    };

    this._findNearsetPanel = function (flicking, pos) {
      var nearsetIndex = flicking.panels.reduce(function (nearest, panel, index) {
        return Math.abs(panel.position - pos) <= nearest.range ? {
          index: index,
          range: Math.abs(panel.position - pos)
        } : nearest;
      }, {
        index: 0,
        range: Infinity
      }).index;
      return flicking.panels[nearsetIndex];
    };

    this._type = type;
    this._synchronizedFlickingOptions = synchronizedFlickingOptions;
  }

  var __proto = Sync.prototype;
  Object.defineProperty(__proto, "type", {
    get: function () {
      return this._type;
    },
    set: function (val) {
      var _this = this;

      this._preventEvent(function () {
        _this._type = val;
      });
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "synchronizedFlickingOptions", {
    get: function () {
      return this._synchronizedFlickingOptions;
    },
    set: function (val) {
      var _this = this;

      this._preventEvent(function () {
        _this._synchronizedFlickingOptions = val;
      });
    },
    enumerable: false,
    configurable: true
  });

  __proto.init = function (flicking) {
    var _this = this;

    if (this._flicking) {
      this.destroy();
    }

    this._flicking = flicking;

    this._addEvents(this._synchronizedFlickingOptions);

    this._synchronizedFlickingOptions.forEach(function (synchronizedFlickingOption) {
      _this._updateClass(synchronizedFlickingOption, 0);
    });
  };

  __proto.destroy = function () {
    var flicking = this._flicking;

    if (!flicking) {
      return;
    }

    this._removeEvents(this._synchronizedFlickingOptions);

    this._flicking = null;
  };

  __proto.update = function () {
    var _this = this;

    this._synchronizedFlickingOptions.forEach(function (_a) {
      var flicking = _a.flicking,
          activeClass = _a.activeClass;

      _this._updateClass({
        flicking: flicking,
        activeClass: activeClass
      }, flicking.camera.position);
    });
  };

  __proto._preventEvent = function (fn) {
    this._removeEvents(this._synchronizedFlickingOptions);

    fn();

    this._addEvents(this._synchronizedFlickingOptions);
  };

  return Sync;
}();

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || from);
}

var Renderer =
/*#__PURE__*/
function () {
  function Renderer(_a) {
    var flicking = _a.flicking,
        pagination = _a.pagination,
        wrapper = _a.wrapper;
    this._flicking = flicking;
    this._pagination = pagination;
    this._wrapper = wrapper;
  }

  return Renderer;
}();

var BulletRenderer =
/*#__PURE__*/
function (_super) {
  __extends(BulletRenderer, _super);

  function BulletRenderer() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this._childs = [];
    return _this;
  }

  var __proto = BulletRenderer.prototype;

  __proto.render = function () {
    var flicking = this._flicking;
    var pagination = this._pagination;
    var renderBullet = pagination.renderBullet;
    var bulletWrapperClass = pagination.classPrefix + "-" + PAGINATION.BULLET_WRAPPER_SUFFIX;
    var bulletClass = pagination.classPrefix + "-" + PAGINATION.BULLET_SUFFIX;
    var bulletActiveClass = pagination.classPrefix + "-" + PAGINATION.BULLET_ACTIVE_SUFFIX;
    var anchorPoints = flicking.camera.anchorPoints;
    var wrapper = this._wrapper;
    addClass(wrapper, bulletWrapperClass);
    wrapper.innerHTML = anchorPoints.map(function (_, index) {
      return renderBullet(bulletClass, index);
    }).join("\n");
    var bullets = [].slice.call(wrapper.children);
    bullets.forEach(function (bullet, index) {
      var anchorPoint = anchorPoints[index];

      if (anchorPoint.panel.index === flicking.index) {
        addClass(bullet, bulletActiveClass);
      }

      bullet.addEventListener(BROWSER.MOUSE_DOWN, function (e) {
        e.stopPropagation();
      });
      bullet.addEventListener(BROWSER.TOUCH_START, function (e) {
        e.stopPropagation();
      });
      bullet.addEventListener(BROWSER.CLICK, function () {
        flicking.moveTo(anchorPoint.panel.index).catch(function (err) {
          if (err instanceof _egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.FlickingError) return;
          throw err;
        });
      });
    });
    this._childs = bullets;
  };

  __proto.update = function (index) {
    var flicking = this._flicking;
    var pagination = this._pagination;
    var bullets = this._childs;
    var activeClass = pagination.classPrefix + "-" + PAGINATION.BULLET_ACTIVE_SUFFIX;
    var anchorPoints = flicking.camera.anchorPoints;
    if (anchorPoints.length <= 0) return;
    bullets.forEach(function (bullet) {
      removeClass(bullet, activeClass);
    });
    var anchorOffset = anchorPoints[0].panel.index;
    var activeBullet = bullets[index - anchorOffset];
    addClass(activeBullet, activeClass);
  };

  return BulletRenderer;
}(Renderer);

var FractionRenderer =
/*#__PURE__*/
function (_super) {
  __extends(FractionRenderer, _super);

  function FractionRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  var __proto = FractionRenderer.prototype;

  __proto.render = function () {
    var flicking = this._flicking;
    var wrapper = this._wrapper;
    var pagination = this._pagination;
    var fractionWrapperClass = pagination.classPrefix + "-" + PAGINATION.FRACTION_WRAPPER_SUFFIX;
    var fractionCurrentClass = pagination.classPrefix + "-" + PAGINATION.FRACTION_CURRENT_SUFFIX;
    var fractionTotalClass = pagination.classPrefix + "-" + PAGINATION.FRACTION_TOTAL_SUFFIX;
    addClass(wrapper, fractionWrapperClass);
    wrapper.innerHTML = pagination.renderFraction(fractionCurrentClass, fractionTotalClass);
    this.update(flicking.index);
  };

  __proto.update = function (index) {
    var flicking = this._flicking;
    var wrapper = this._wrapper;
    var pagination = this._pagination;
    var fractionCurrentClass = pagination.classPrefix + "-" + PAGINATION.FRACTION_CURRENT_SUFFIX;
    var fractionTotalClass = pagination.classPrefix + "-" + PAGINATION.FRACTION_TOTAL_SUFFIX;
    var currentWrapper = wrapper.querySelector("." + fractionCurrentClass);
    var totalWrapper = wrapper.querySelector("." + fractionTotalClass);
    var anchorPoints = flicking.camera.anchorPoints;
    var currentIndex = anchorPoints.length > 0 ? index - anchorPoints[0].panel.index + 1 : 0;
    currentWrapper.innerHTML = pagination.fractionCurrentFormat(currentIndex);
    totalWrapper.innerHTML = pagination.fractionTotalFormat(anchorPoints.length);
  };

  return FractionRenderer;
}(Renderer);

var ScrollBulletRenderer =
/*#__PURE__*/
function (_super) {
  __extends(ScrollBulletRenderer, _super);

  function ScrollBulletRenderer() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this._bullets = [];
    _this._bulletSize = 0;
    _this._previousIndex = -1;
    _this._sliderIndex = -1;

    _this.moveTo = function (index) {
      var pagination = _this._pagination;
      var sliderEl = _this._wrapper.firstElementChild;
      var bulletSize = _this._bulletSize;
      var wrapperSize = bulletSize * pagination.bulletCount;
      sliderEl.style.transform = "translate(" + (wrapperSize / 2 - (index + 0.5) * bulletSize) + "px)";
      _this._sliderIndex = index;
    };

    return _this;
  }

  var __proto = ScrollBulletRenderer.prototype;

  __proto.render = function () {
    var wrapper = this._wrapper;
    var flicking = this._flicking;
    var pagination = this._pagination;
    var renderBullet = pagination.renderBullet;
    var anchorPoints = flicking.camera.anchorPoints;
    var dynamicWrapperClass = pagination.classPrefix + "-" + PAGINATION.SCROLL_WRAPPER_SUFFIX;
    var bulletClass = pagination.classPrefix + "-" + PAGINATION.BULLET_SUFFIX;
    var sliderClass = pagination.classPrefix + "-" + PAGINATION.SCROLL_SLIDER_SUFFIX;
    var uninitClass = pagination.classPrefix + "-" + PAGINATION.SCROLL_UNINIT_SUFFIX;
    var sliderEl = document.createElement("div");
    addClass(sliderEl, sliderClass);
    addClass(wrapper, uninitClass);
    addClass(wrapper, dynamicWrapperClass);
    wrapper.appendChild(sliderEl);
    sliderEl.innerHTML = anchorPoints.map(function (_, index) {
      return renderBullet(bulletClass, index);
    }).join("\n");
    var bullets = [].slice.call(sliderEl.children);
    bullets.forEach(function (bullet, index) {
      var anchorPoint = anchorPoints[index];
      bullet.addEventListener(BROWSER.MOUSE_DOWN, function (e) {
        e.stopPropagation();
      });
      bullet.addEventListener(BROWSER.TOUCH_START, function (e) {
        e.stopPropagation();
      });
      bullet.addEventListener(BROWSER.CLICK, function () {
        flicking.moveTo(anchorPoint.panel.index).catch(function (err) {
          if (err instanceof _egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.FlickingError) return;
          throw err;
        });
      });
    });
    if (bullets.length <= 0) return;
    var bulletStyle = getComputedStyle(bullets[0]);
    var bulletSize = bullets[0].clientWidth + parseFloat(bulletStyle.marginLeft) + parseFloat(bulletStyle.marginRight);
    wrapper.style.width = bulletSize * pagination.bulletCount + "px";
    this._bullets = bullets;
    this._bulletSize = bulletSize;
    this.update(this._flicking.index);
    window.requestAnimationFrame(function () {
      removeClass(wrapper, uninitClass);
    });
  };

  __proto.update = function (index) {
    var pagination = this._pagination;
    var flicking = this._flicking;
    var bullets = this._bullets;
    var prevIndex = this._previousIndex;
    var anchorPoints = flicking.camera.anchorPoints;
    var anchorOffset = anchorPoints[0].panel.index;
    var activeIndex = index - anchorOffset;
    if (anchorPoints.length <= 0) return;
    var bulletActiveClass = pagination.classPrefix + "-" + PAGINATION.BULLET_ACTIVE_SUFFIX;
    var prevClassPrefix = pagination.classPrefix + "-" + PAGINATION.SCROLL_PREV_SUFFIX;
    var nextClassPrefix = pagination.classPrefix + "-" + PAGINATION.SCROLL_NEXT_SUFFIX;

    var bulletPrevClass = function (offset) {
      return "" + prevClassPrefix + (offset > 1 ? offset : "");
    };

    var bulletNextClass = function (offset) {
      return "" + nextClassPrefix + (offset > 1 ? offset : "");
    };

    var prevClassRegex = new RegExp("^" + prevClassPrefix);
    var nextClassRegex = new RegExp("^" + nextClassPrefix);
    bullets.forEach(function (bullet, idx) {
      var indexOffset = idx - activeIndex;
      var classList = bullet.className.split(" ");

      for (var _i = 0, classList_1 = classList; _i < classList_1.length; _i++) {
        var className = classList_1[_i];

        if (className === bulletActiveClass || prevClassRegex.test(className) || nextClassRegex.test(className)) {
          removeClass(bullet, className);
        }
      }

      if (indexOffset === 0) {
        addClass(bullet, bulletActiveClass);
      } else if (indexOffset > 0) {
        addClass(bullet, bulletNextClass(Math.abs(indexOffset)));
      } else {
        addClass(bullet, bulletPrevClass(Math.abs(indexOffset)));
      }
    });
    pagination.scrollOnChange(activeIndex, {
      total: bullets.length,
      prevIndex: prevIndex,
      sliderIndex: this._sliderIndex,
      direction: activeIndex > prevIndex ? _egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NEXT : _egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.PREV,
      bullets: __spreadArray([], bullets),
      moveTo: this.moveTo
    });
    this._previousIndex = activeIndex;
  };

  return ScrollBulletRenderer;
}(Renderer);

/**
 * @memberof Flicking.Plugins
 */

var Pagination =
/*#__PURE__*/
function () {
  function Pagination(_a) {
    var _this = this;

    var _b = _a === void 0 ? {} : _a,
        _c = _b.parentEl,
        parentEl = _c === void 0 ? null : _c,
        _d = _b.selector,
        selector = _d === void 0 ? PAGINATION.SELECTOR : _d,
        _e = _b.type,
        type = _e === void 0 ? PAGINATION.TYPE.BULLET : _e,
        _f = _b.classPrefix,
        classPrefix = _f === void 0 ? PAGINATION.PREFIX : _f,
        _g = _b.bulletCount,
        bulletCount = _g === void 0 ? 5 : _g,
        _h = _b.renderBullet,
        renderBullet = _h === void 0 ? function (className) {
      return "<span class=\"" + className + "\"></span>";
    } : _h,
        _j = _b.renderFraction,
        renderFraction = _j === void 0 ? function (currentClass, totalClass) {
      return "<span class=\"" + currentClass + "\"></span>/<span class=\"" + totalClass + "\"></span>";
    } : _j,
        _k = _b.fractionCurrentFormat,
        fractionCurrentFormat = _k === void 0 ? function (index) {
      return index.toString();
    } : _k,
        _l = _b.fractionTotalFormat,
        fractionTotalFormat = _l === void 0 ? function (index) {
      return index.toString();
    } : _l,
        _m = _b.scrollOnChange,
        scrollOnChange = _m === void 0 ? function (index, ctx) {
      return ctx.moveTo(index);
    } : _m;
    /* Internal Values */


    this._flicking = null;

    this.update = function () {
      _this._removeAllChilds();

      _this._renderer.render();
    };

    this._onIndexChange = function (evt) {
      _this._renderer.update(evt.index);
    };

    this._parentEl = parentEl;
    this._selector = selector;
    this._type = type;
    this._classPrefix = classPrefix;
    this._bulletCount = bulletCount;
    this._renderBullet = renderBullet;
    this._renderFraction = renderFraction;
    this._fractionCurrentFormat = fractionCurrentFormat;
    this._fractionTotalFormat = fractionTotalFormat;
    this._scrollOnChange = scrollOnChange;
  }

  var __proto = Pagination.prototype;
  Object.defineProperty(__proto, "parentEl", {
    get: function () {
      return this._parentEl;
    },
    set: function (val) {
      this._parentEl = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "selector", {
    get: function () {
      return this._selector;
    },
    set: function (val) {
      this._selector = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "type", {
    get: function () {
      return this._type;
    },
    set: function (val) {
      this._type = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "classPrefix", {
    get: function () {
      return this._classPrefix;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "bulletCount", {
    get: function () {
      return this._bulletCount;
    },
    set: function (val) {
      this._bulletCount = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "renderBullet", {
    get: function () {
      return this._renderBullet;
    },
    set: function (val) {
      this._renderBullet = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "renderFraction", {
    get: function () {
      return this._renderFraction;
    },
    set: function (val) {
      this._renderFraction = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "fractionCurrentFormat", {
    get: function () {
      return this._fractionCurrentFormat;
    },
    set: function (val) {
      this._fractionCurrentFormat = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "fractionTotalFormat", {
    get: function () {
      return this._fractionTotalFormat;
    },
    set: function (val) {
      this._fractionTotalFormat = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "scrollOnChange", {
    get: function () {
      return this._scrollOnChange;
    },
    set: function (val) {
      this._scrollOnChange = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "bulletWrapperclassPrefixClass", {
    set: function (val) {
      this._classPrefix = val;
    },
    enumerable: false,
    configurable: true
  });

  __proto.init = function (flicking) {
    if (this._flicking) {
      this.destroy();
    }

    this._flicking = flicking;
    var type = this._type;
    var selector = this._selector;
    var parentEl = this._parentEl ? this._parentEl : flicking.element;
    var wrapper = parentEl.querySelector(selector);

    if (!wrapper) {
      throw new Error("[Flicking-Pagination] Couldn't find element with the given selector: " + selector);
    }

    this._wrapper = wrapper;
    this._renderer = this._createRenderer(type);
    flicking.on(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.WILL_CHANGE, this._onIndexChange);
    flicking.on(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.WILL_RESTORE, this._onIndexChange);
    flicking.on(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.PANEL_CHANGE, this.update);
    this.update();
  };

  __proto.destroy = function () {
    var flicking = this._flicking;

    if (!flicking) {
      return;
    }

    flicking.off(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.WILL_CHANGE, this._onIndexChange);
    flicking.off(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.WILL_RESTORE, this._onIndexChange);
    flicking.off(_egjs_flicking__WEBPACK_IMPORTED_MODULE_0__.EVENTS.PANEL_CHANGE, this.update);

    this._removeAllChilds();

    this._flicking = null;
  };

  __proto._createRenderer = function (type) {
    var options = {
      flicking: this._flicking,
      pagination: this,
      wrapper: this._wrapper
    };

    switch (type) {
      case PAGINATION.TYPE.BULLET:
        return new BulletRenderer(options);

      case PAGINATION.TYPE.FRACTION:
        return new FractionRenderer(options);

      case PAGINATION.TYPE.SCROLL:
        return new ScrollBulletRenderer(options);

      default:
        throw new Error("[Flicking-Pagination] type \"" + type + "\" is not supported.");
    }
  };

  __proto._removeAllChilds = function () {
    var wrapper = this._wrapper;

    while (wrapper.firstChild) {
      wrapper.removeChild(wrapper.firstChild);
    }
  };

  return Pagination;
}();

/**
 * @namespace Flicking
 */


//# sourceMappingURL=plugins.esm.js.map


/***/ }),

/***/ "./node_modules/@egjs/flicking/dist/flicking.esm.js":
/*!**********************************************************!*\
  !*** ./node_modules/@egjs/flicking/dist/flicking.esm.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ALIGN": () => (/* binding */ ALIGN),
/* harmony export */   "AnchorPoint": () => (/* binding */ AnchorPoint),
/* harmony export */   "AnimatingState": () => (/* binding */ AnimatingState),
/* harmony export */   "AxesController": () => (/* binding */ AxesController),
/* harmony export */   "BoundCamera": () => (/* binding */ BoundCamera),
/* harmony export */   "Camera": () => (/* binding */ Camera),
/* harmony export */   "CircularCamera": () => (/* binding */ CircularCamera),
/* harmony export */   "Control": () => (/* binding */ Control),
/* harmony export */   "DIRECTION": () => (/* binding */ DIRECTION),
/* harmony export */   "DisabledState": () => (/* binding */ DisabledState),
/* harmony export */   "DraggingState": () => (/* binding */ DraggingState),
/* harmony export */   "ERROR_CODE": () => (/* binding */ CODE),
/* harmony export */   "EVENTS": () => (/* binding */ EVENTS),
/* harmony export */   "ElementPanel": () => (/* binding */ ElementPanel),
/* harmony export */   "ExternalPanel": () => (/* binding */ ExternalPanel),
/* harmony export */   "ExternalRenderer": () => (/* binding */ ExternalRenderer),
/* harmony export */   "FlickingError": () => (/* binding */ FlickingError),
/* harmony export */   "FreeControl": () => (/* binding */ FreeControl),
/* harmony export */   "HoldingState": () => (/* binding */ HoldingState),
/* harmony export */   "IdleState": () => (/* binding */ IdleState),
/* harmony export */   "LinearCamera": () => (/* binding */ LinearCamera),
/* harmony export */   "MOVE_TYPE": () => (/* binding */ MOVE_TYPE),
/* harmony export */   "Panel": () => (/* binding */ Panel),
/* harmony export */   "Renderer": () => (/* binding */ Renderer),
/* harmony export */   "SnapControl": () => (/* binding */ SnapControl),
/* harmony export */   "State": () => (/* binding */ State),
/* harmony export */   "StateMachine": () => (/* binding */ StateMachine),
/* harmony export */   "StrictControl": () => (/* binding */ StrictControl),
/* harmony export */   "VanillaRenderer": () => (/* binding */ VanillaRenderer),
/* harmony export */   "Viewport": () => (/* binding */ Viewport),
/* harmony export */   "default": () => (/* binding */ Flicking),
/* harmony export */   "getDefaultCameraTransform": () => (/* binding */ getDefaultCameraTransform),
/* harmony export */   "getRenderingPanels": () => (/* binding */ getRenderingPanels),
/* harmony export */   "sync": () => (/* binding */ sync),
/* harmony export */   "withFlickingMethods": () => (/* binding */ withFlickingMethods)
/* harmony export */ });
/* harmony import */ var _egjs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @egjs/component */ "./node_modules/@egjs/component/dist/component.esm.js");
/* harmony import */ var _egjs_axes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @egjs/axes */ "./node_modules/@egjs/axes/dist/axes.esm.js");
/*
Copyright (c) 2015-present NAVER Corp.
name: @egjs/flicking
license: MIT
author: NAVER Corp.
repository: https://github.com/naver/egjs-flicking
version: 4.2.3
*/



/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var __assign = function () {
  __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
function __spreadArray(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];

  return to;
}

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */

/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Error codes of {@link FlickingError}. Below are the conditions where each error code occurs.
 * @ko {@link FlickingError}??? ?????? ??????. ????????? ????????? ?????? ????????? ???????????? ???????????????.
 * @name ERROR_CODE
 * @constant
 * @type object
 * @property {number} WRONG_TYPE Parameter type is wrong<ko>??????????????? ????????? ??????????????? ??????</ko>
 * @property {number} ELEMENT_NOT_FOUND Element is not found inside page with the given CSS selector<ko>????????? CSS selector??? ????????? ????????? ?????? ??????????????? ?????? ????????? ??????</ko>
 * @property {number} VAL_MUST_NOT_NULL Expected non-null value, but given `null` or `undefined`<ko>?????? ???????????????, `null`?????? `undefined`??? ?????? ??????</ko>
 * @property {number} NOT_ATTACHED_TO_FLICKING When Flicking's component is not initialized (i.e. {@link Flicking#init} is not called)<ko>Flicking ?????? ??????????????? ??????????????? ?????? ?????? ({@link Flicking#init}??? ???????????? ?????? ??????)</ko>
 * @property {number} WRONG_OPTION One of the options is wrong<ko>????????? ??? ????????? ?????? ?????? ???</ko>
 * @property {number} INDEX_OUT_OF_RANGE When the given index is out of possible range<ko>???????????? ????????? ????????? ????????? ??????</ko>
 * @property {number} POSITION_NOT_REACHABLE When {@link Control#moveToPosition}'s position parameter is out of possible range.<ko>{@link Control#moveToPosition}??? `position` ??????????????? ?????? ????????? ????????? ????????? ??????</ko>
 * @property {number} TRANSFORM_NOT_SUPPORTED CSS `transform` property is not available(<=IE8) <ko>CSS `transform` ????????? ????????? ??? ?????? ??????(<=IE8)</ko>
 * @property {number} STOP_CALLED_BY_USER When the event's `stop()` is called by user.<ko>???????????? ?????? ???????????? `stop()`??? ????????? ??????</ko>
 * @property {number} ANIMATION_INTERRUPTED When the animation is interrupted by user.<ko>???????????? ?????? ?????????????????? ????????? ??????</ko>
 * @property {number} ANIMATION_ALREADY_PLAYING When the animation is already playing.<ko>?????? ?????????????????? ?????? ???????????? ??????</ko>
 * @property {number} NOT_ALLOWED_IN_FRAMEWORK When the non-allowed method is called from frameworks (React, Angular, Vue...)
 * <ko>???????????????(React, Angular, Vue ...)?????? ?????? ???????????? ???????????? ???????????? ??????</ko>
 * @property {number} NOT_INITIALIZED When the {@link Flicking#init} is not called before but is needed<ko>{@link Flicking#init}??? ????????? ????????????, ?????? ???????????? ????????? ??????</ko>
 * @property {number} NO_ACTIVE When there're no active panel that flicking has selected. This may be due to the absence of any panels<ko>?????? Flicking??? ????????? ????????? ?????? ??????. ??????????????? ????????? ????????? ?????? ????????? ????????? ??? ????????????</ko>
 */
var CODE = {
  WRONG_TYPE: 0,
  ELEMENT_NOT_FOUND: 1,
  VAL_MUST_NOT_NULL: 2,
  NOT_ATTACHED_TO_FLICKING: 3,
  WRONG_OPTION: 4,
  INDEX_OUT_OF_RANGE: 5,
  POSITION_NOT_REACHABLE: 6,
  TRANSFORM_NOT_SUPPORTED: 7,
  STOP_CALLED_BY_USER: 8,
  ANIMATION_INTERRUPTED: 9,
  ANIMATION_ALREADY_PLAYING: 10,
  NOT_ALLOWED_IN_FRAMEWORK: 11,
  NOT_INITIALIZED: 12,
  NO_ACTIVE: 13
};
var MESSAGE = {
  WRONG_TYPE: function (wrongVal, correctTypes) {
    return wrongVal + "(" + typeof wrongVal + ") is not a " + correctTypes.map(function (type) {
      return "\"" + type + "\"";
    }).join(" or ") + ".";
  },
  ELEMENT_NOT_FOUND: function (selector) {
    return "Element with selector \"" + selector + "\" not found.";
  },
  VAL_MUST_NOT_NULL: function (val, name) {
    return name + " should be provided. Given: " + val;
  },
  NOT_ATTACHED_TO_FLICKING: function (name) {
    return name + " is not attached to the Flicking instance. \"init()\" should be called first.";
  },
  WRONG_OPTION: function (optionName, val) {
    return "Option \"" + optionName + "\" is not in correct format, given: " + val;
  },
  INDEX_OUT_OF_RANGE: function (val, min, max) {
    return "Index \"" + val + "\" is out of range: should be between " + min + " and " + max + ".";
  },
  POSITION_NOT_REACHABLE: function (position) {
    return "Position \"" + position + "\" is not reachable.";
  },
  TRANSFORM_NOT_SUPPORTED: "Browser does not support CSS transform.",
  STOP_CALLED_BY_USER: "Event stop() is called by user.",
  ANIMATION_INTERRUPTED: "Animation is interrupted by user input.",
  ANIMATION_ALREADY_PLAYING: "Animation is already playing.",
  NOT_ALLOWED_IN_FRAMEWORK: "This behavior is not allowed in the frameworks like React, Vue, or Angular.",
  NOT_INITIALIZED: "Flicking is not initialized yet, call init() first.",
  NO_ACTIVE: "There's no active panel that Flicking has selected. This may be due to the absence of any panels."
};

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/**
 * Event type object with event name strings of {@link Flicking}
 * @ko {@link Flicking}??? ????????? ?????? ??????????????? ?????? ??????
 * @type {object}
 * @property {"holdStart"} HOLD_START holdStart event<ko>holdStart ?????????</ko>
 * @property {"holdEnd"} HOLD_END holdEnd event<ko>holdEnd ?????????</ko>
 * @property {"moveStart"} MOVE_START moveStart event<ko>moveStart ?????????</ko>
 * @property {"move"} MOVE move event<ko>move ?????????</ko>
 * @property {"moveEnd"} MOVE_END moveEnd event<ko>moveEnd ?????????</ko>
 * @property {"willChange"} WILL_CHANGE willChange event<ko>willChange ?????????</ko>
 * @property {"changed"} CHANGED changed event<ko>changed ?????????</ko>
 * @property {"willRestore"} WILL_RESTORE willRestore event<ko>willRestore ?????????</ko>
 * @property {"restored"} RESTORED restored event<ko>restored ?????????</ko>
 * @property {"select"} SELECT select event<ko>select ?????????</ko>
 * @property {"needPanel"} NEED_PANEL needPanel event<ko>needPanel ?????????</ko>
 * @property {"panelChange"} PANEL_CHANGE panelChange event<ko>panelChange ?????????</ko>
 * @example
 * ```ts
 * import { EVENTS } from "@egjs/flicking";
 * EVENTS.MOVE_START; // "moveStart"
 * ```
 */

var EVENTS = {
  READY: "ready",
  BEFORE_RESIZE: "beforeResize",
  AFTER_RESIZE: "afterResize",
  HOLD_START: "holdStart",
  HOLD_END: "holdEnd",
  MOVE_START: "moveStart",
  MOVE: "move",
  MOVE_END: "moveEnd",
  WILL_CHANGE: "willChange",
  CHANGED: "changed",
  WILL_RESTORE: "willRestore",
  RESTORED: "restored",
  SELECT: "select",
  NEED_PANEL: "needPanel",
  VISIBLE_CHANGE: "visibleChange",
  REACH_EDGE: "reachEdge",
  PANEL_CHANGE: "panelChange"
};
/**
 * An object with all possible predefined literal string for the {@link Flicking#align align} option
 * @ko {@link Flicking#align align} ????????? ???????????? ?????? ????????? ????????? ???????????? ?????? ?????? ??????
 * @type {object}
 * @property {"prev"} PREV left/top align<ko>???/??? ??????</ko>
 * @property {"center"} CENTER center align<ko>?????? ??????</ko>
 * @property {"next"} NEXT right/bottom align<ko>???/??? ??????</ko>
 */

var ALIGN = {
  PREV: "prev",
  CENTER: "center",
  NEXT: "next"
};
/**
 * An object of directions
 * @ko ????????? ???????????? ????????? ?????? ?????? ??????
 * @type {object}
 * @property {"PREV"} PREV "left" when {@link Flicking#horizontal horizontal} is true, and "top" when {@link Flicking#horizontal horizontal} is false
 * <ko>{@link Flicking#horizontal horizontal}??? `true`??? ?????? ??????, {@link Flicking#horizontal horizontal}??? `false`??? ?????? ????????? ???????????????</ko>
 * @property {"NEXT"} NEXT "right" when {@link Flicking#horizontal horizontal} is true, and "bottom" when {@link Flicking#horizontal horizontal} is false
 * <ko>{@link Flicking#horizontal horizontal}??? `true`??? ?????? ?????????, {@link Flicking#horizontal horizontal}??? `false`??? ?????? ???????????? ???????????????</ko>
 * @property {null} NONE This value usually means it's the same position<ko>?????? ???????????? ????????? ???????????????</ko>
 */

var DIRECTION = {
  PREV: "PREV",
  NEXT: "NEXT",
  NONE: null
};
/**
 * An object with all possible {@link Flicking#moveType moveType}s
 * @ko Flicking??? ???????????? {@link Flicking#moveType moveType}?????? ?????? ?????? ??????
 * @type {object}
 * @property {"snap"} SNAP Flicking's {@link Flicking#moveType moveType} that enables {@link SnapControl} as a Flicking's {@link Flicking#control control}
 * <ko>Flicking??? {@link Flicking#control control}??? {@link SnapControl}??? ???????????? ?????? {@link Flicking#moveType moveType}</ko>
 * @property {"freeScroll"} FREE_SCROLL Flicking's {@link Flicking#moveType moveType} that enables {@link FreeControl} as a Flicking's {@link Flicking#control control}
 * <ko>Flicking??? {@link Flicking#control control}??? {@link FreeControl}??? ???????????? ?????? {@link Flicking#moveType moveType}</ko>
 * @property {"strict"} STRICT Flicking's {@link Flicking#moveType moveType} that enables {@link StrictControl} as a Flicking's {@link Flicking#control control}
 * <ko>Flicking??? {@link Flicking#control control}??? {@link StrictControl}??? ???????????? ?????? {@link Flicking#moveType moveType}</ko>
 */

var MOVE_TYPE = {
  SNAP: "snap",
  FREE_SCROLL: "freeScroll",
  STRICT: "strict"
};

var getElement = function (el, parent) {
  var targetEl = null;

  if (isString(el)) {
    var parentEl = parent ? parent : document;
    var queryResult = parentEl.querySelector(el);

    if (!queryResult) {
      throw new FlickingError(MESSAGE.ELEMENT_NOT_FOUND(el), CODE.ELEMENT_NOT_FOUND);
    }

    targetEl = queryResult;
  } else if (el && el.nodeType === Node.ELEMENT_NODE) {
    targetEl = el;
  }

  if (!targetEl) {
    throw new FlickingError(MESSAGE.WRONG_TYPE(el, ["HTMLElement", "string"]), CODE.WRONG_TYPE);
  }

  return targetEl;
};
var checkExistence = function (value, nameOnErrMsg) {
  if (value == null) {
    throw new FlickingError(MESSAGE.VAL_MUST_NOT_NULL(value, nameOnErrMsg), CODE.VAL_MUST_NOT_NULL);
  }
};
var clamp = function (x, min, max) {
  return Math.max(Math.min(x, max), min);
};
var getFlickingAttached = function (val, nameToThrowOnError) {
  if (!val) {
    throw new FlickingError(MESSAGE.NOT_ATTACHED_TO_FLICKING(nameToThrowOnError), CODE.NOT_ATTACHED_TO_FLICKING);
  }

  return val;
};
var toArray = function (iterable) {
  return [].slice.call(iterable);
};
var parseAlign$1 = function (align, size) {
  var alignPoint;

  if (isString(align)) {
    switch (align) {
      case ALIGN.PREV:
        alignPoint = 0;
        break;

      case ALIGN.CENTER:
        alignPoint = 0.5 * size;
        break;

      case ALIGN.NEXT:
        alignPoint = size;
        break;

      default:
        alignPoint = parseArithmeticSize(align, size);

        if (alignPoint == null) {
          throw new FlickingError(MESSAGE.WRONG_OPTION("align", align), CODE.WRONG_OPTION);
        }

    }
  } else {
    alignPoint = align;
  }

  return alignPoint;
};
var parseBounce = function (bounce, size) {
  var parsedBounce;

  if (Array.isArray(bounce)) {
    parsedBounce = bounce.map(function (val) {
      return parseArithmeticSize(val, size);
    });
  } else {
    var parsedVal = parseArithmeticSize(bounce, size);
    parsedBounce = [parsedVal, parsedVal];
  }

  return parsedBounce.map(function (val) {
    if (val == null) {
      throw new FlickingError(MESSAGE.WRONG_OPTION("bounce", bounce), CODE.WRONG_OPTION);
    }

    return val;
  });
};
var parseArithmeticSize = function (cssValue, base) {
  var parsed = parseArithmeticExpression(cssValue);
  if (parsed == null) return null;
  return parsed.percentage * base + parsed.absolute;
};
var parseArithmeticExpression = function (cssValue) {
  var cssRegex = /(?:(\+|\-)\s*)?(\d+(?:\.\d+)?(%|px)?)/g;

  if (typeof cssValue === "number") {
    return {
      percentage: 0,
      absolute: cssValue
    };
  }

  var parsed = {
    percentage: 0,
    absolute: 0
  };
  var idx = 0;
  var matchResult = cssRegex.exec(cssValue);

  while (matchResult != null) {
    var sign = matchResult[1];
    var value = matchResult[2];
    var unit = matchResult[3];
    var parsedValue = parseFloat(value);

    if (idx <= 0) {
      sign = sign || "+";
    } // Return default value for values not in good form


    if (!sign) {
      return null;
    }

    var signMultiplier = sign === "+" ? 1 : -1;

    if (unit === "%") {
      parsed.percentage += signMultiplier * (parsedValue / 100);
    } else {
      parsed.absolute += signMultiplier * parsedValue;
    } // Match next occurrence


    ++idx;
    matchResult = cssRegex.exec(cssValue);
  } // None-matched


  if (idx === 0) {
    return null;
  }

  return parsed;
};
var getDirection = function (start, end) {
  if (start === end) return DIRECTION.NONE;
  return start < end ? DIRECTION.NEXT : DIRECTION.PREV;
};
var parseElement = function (element) {
  if (!Array.isArray(element)) {
    element = [element];
  }

  var elements = [];
  element.forEach(function (el) {
    if (isString(el)) {
      var tempDiv = document.createElement("div");
      tempDiv.innerHTML = el;
      elements.push.apply(elements, __spreadArray([], __read(toArray(tempDiv.children))));

      while (tempDiv.firstChild) {
        tempDiv.removeChild(tempDiv.firstChild);
      }
    } else if (el && el.nodeType === Node.ELEMENT_NODE) {
      elements.push(el);
    } else {
      throw new FlickingError(MESSAGE.WRONG_TYPE(el, ["HTMLElement", "string"]), CODE.WRONG_TYPE);
    }
  });
  return elements;
};
var getMinusCompensatedIndex = function (idx, max) {
  return idx < 0 ? clamp(idx + max, 0, max) : clamp(idx, 0, max);
};
var includes = function (array, target) {
  var e_1, _a;

  try {
    for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
      var val = array_1_1.value;
      if (val === target) return true;
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }

  return false;
};
var isString = function (val) {
  return typeof val === "string";
};
var circulatePosition = function (pos, min, max) {
  var size = max - min;

  if (pos < min) {
    var offset = (min - pos) % size;
    pos = max - offset;
  } else if (pos > max) {
    var offset = (pos - max) % size;
    pos = min + offset;
  }

  return pos;
};
var find = function (array, checker) {
  var e_2, _a;

  try {
    for (var array_2 = __values(array), array_2_1 = array_2.next(); !array_2_1.done; array_2_1 = array_2.next()) {
      var val = array_2_1.value;

      if (checker(val)) {
        return val;
      }
    }
  } catch (e_2_1) {
    e_2 = {
      error: e_2_1
    };
  } finally {
    try {
      if (array_2_1 && !array_2_1.done && (_a = array_2.return)) _a.call(array_2);
    } finally {
      if (e_2) throw e_2.error;
    }
  }

  return null;
};
var findIndex = function (array, checker) {
  for (var idx = 0; idx < array.length; idx++) {
    if (checker(array[idx])) {
      return idx;
    }
  }

  return -1;
};
var getProgress = function (pos, prev, next) {
  return (pos - prev) / (next - prev);
}; // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

var getStyle = function (el) {
  return window.getComputedStyle(el) || el.currentStyle;
};
var isBetween = function (val, min, max) {
  return val >= min && val <= max;
};
var circulateIndex = function (index, max) {
  if (index >= max) {
    return index % max;
  } else if (index < 0) {
    return getMinusCompensatedIndex((index + 1) % max - 1, max);
  } else {
    return index;
  }
};
var setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
};

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/**
 * Special type of known error that {@link Flicking} throws.
 * @ko Flicking ???????????? ????????? ?????? ????????? throw?????? ??????
 * @property {number} code Error code<ko>?????? ??????</ko>
 * @property {string} message Error message<ko>?????? ?????????</ko>
 * @see {@link Constants.ERROR_CODE ERROR_CODE}
 * @example
 * ```ts
 * import Flicking, { FlickingError, ERROR_CODES } from "@egjs/flicking";
 * try {
 *   const flicking = new Flicking(".flicking-viewport")
 * } catch (e) {
 *   if (e instanceof FlickingError && e.code === ERROR_CODES.ELEMENT_NOT_FOUND) {
 *     console.error("Element not found")
 *   }
 * }
 * ```
 */

var FlickingError = function (_super) {
  __extends(FlickingError, _super);
  /**
   * @param message Error message<ko>?????? ?????????</ko>
   * @param code Error code<ko>?????? ??????</ko>
   */


  function FlickingError(message, code) {
    var _this = _super.call(this, message) || this;

    setPrototypeOf(_this, FlickingError.prototype);
    _this.name = "FlickingError";
    _this.code = code;
    return _this;
  }

  return FlickingError;
}(Error);

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/**
 * A component that manages viewport size
 * @ko ????????? ?????? ????????? ???????????? ????????????
 */

var Viewport = function () {
  /**
   * @param el A viewport element<ko>????????? ????????????</ko>
   */
  function Viewport(el) {
    this._el = el;
    this._width = 0;
    this._height = 0;
    this._padding = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    this._isBorderBoxSizing = false;
  }

  var __proto = Viewport.prototype;
  Object.defineProperty(__proto, "element", {
    /**
     * A viewport(root) element
     * @ko ?????????(root) ????????????
     * @type {HTMLElement}
     * @readonly
     */
    get: function () {
      return this._el;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "width", {
    /**
     * Viewport width, without paddings
     * @ko ????????? ??????
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._width - this._padding.left - this._padding.right;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "height", {
    /**
     * Viewport height, without paddings
     * @ko ????????? ??????
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._height - this._padding.top - this._padding.bottom;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "padding", {
    /**
     * Viewport paddings
     * @ko ????????? CSS padding ???
     * @type {object}
     * @property {number} left CSS `padding-left`
     * @property {number} right CSS `padding-right`
     * @property {number} top CSS `padding-top`
     * @property {number} bottom CSS `padding-bottom`
     * @readonly
     */
    get: function () {
      return this._padding;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Change viewport's size.
   * This will change the actual size of `.flicking-viewport` element by changing its CSS width/height property
   * @ko ????????? ????????? ???????????????.
   * `.flicking-viewport` ??????????????? ?????? ????????? CSS width/height??? ???????????????
   * @param {object} [size] New viewport size<ko>??? ????????? ??????</ko>
   * @param {number|string} [size.width] CSS string or number(in px)<ko>CSS ????????? ?????? ??????(px)</ko>
   * @param {number|string} [size.height] CSS string or number(in px)<ko>CSS ????????? ?????? ??????(px)</ko>
   */

  __proto.setSize = function (_a) {
    var width = _a.width,
        height = _a.height;
    var el = this._el;
    var padding = this._padding;
    var isBorderBoxSizing = this._isBorderBoxSizing;

    if (width != null) {
      if (isString(width)) {
        el.style.width = width;
      } else {
        var newWidth = isBorderBoxSizing ? width + padding.left + padding.right : width;
        el.style.width = newWidth + "px";
      }
    }

    if (height != null) {
      if (isString(height)) {
        el.style.height = height;
      } else {
        var newHeight = isBorderBoxSizing ? height + padding.top + padding.bottom : height;
        el.style.height = newHeight + "px";
      }
    }

    this.resize();
  };
  /**
   * Update width/height to the current viewport element's size
   * @ko ?????? ????????? ??????????????? ????????? ??????/????????? ?????????????????????
   */


  __proto.resize = function () {
    var el = this._el;
    var elStyle = getStyle(el);
    this._width = el.clientWidth;
    this._height = el.clientHeight;
    this._padding = {
      left: parseFloat(elStyle.paddingLeft),
      right: parseFloat(elStyle.paddingRight),
      top: parseFloat(elStyle.paddingTop),
      bottom: parseFloat(elStyle.paddingBottom)
    };
    this._isBorderBoxSizing = elStyle.boxSizing === "border-box";
  };

  return Viewport;
}();

/**
 * All possible @egjs/axes event keys
 * @internal
 */
var EVENT = {
  HOLD: "hold",
  CHANGE: "change",
  RELEASE: "release",
  ANIMATION_END: "animationEnd",
  FINISH: "finish"
};
/**
 * An Axis key that Flicking uses
 * @internal
 */

var POSITION_KEY = "flick";

var STATE_TYPE;

(function (STATE_TYPE) {
  STATE_TYPE[STATE_TYPE["IDLE"] = 0] = "IDLE";
  STATE_TYPE[STATE_TYPE["HOLDING"] = 1] = "HOLDING";
  STATE_TYPE[STATE_TYPE["DRAGGING"] = 2] = "DRAGGING";
  STATE_TYPE[STATE_TYPE["ANIMATING"] = 3] = "ANIMATING";
  STATE_TYPE[STATE_TYPE["DISABLED"] = 4] = "DISABLED";
})(STATE_TYPE || (STATE_TYPE = {}));
/**
 * A component that shows the current status of the user input or the animation
 * @ko ?????? ????????? ?????? ?????? ??????????????? ????????? ???????????? ????????????
 * @internal
 */


var State = function () {
  function State() {
    this._delta = 0;
  }

  var __proto = State.prototype;
  Object.defineProperty(__proto, "delta", {
    /**
     * A sum of delta values of change events from the last hold event of Axes
     * @ko ?????? hold??????????????? change??? ?????? ????????? ?????? delta?????? ??????
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._delta;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * An callback which is called when state has changed to this state
   * @ko ?????? ????????? ??????????????? ???????????? ?????? ??????
   * @param {State} prevState An previous state<ko>?????? ?????????</ko>
   * @return {void}
   */

  __proto.onEnter = function (prevState) {
    this._delta = prevState._delta;
  };
  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} event
   * @ko Axes??? {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} ????????? ?????????
   * @param {object} [ctx] Event context<ko>????????? ????????????</ko>
   * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking ????????????</ko>
   * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} event of Axes
   * <ko>Axes??? {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:hold hold} ?????????</ko>
   * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>?????? ????????? ???????????? ?????? ??????</ko>
   * @return {void}
   */


  __proto.onHold = function (ctx) {// DO NOTHING
  };
  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} event
   * @ko Axes??? {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} ????????? ?????????
   * @param {object} [ctx] Event context<ko>????????? ????????????</ko>
   * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking ????????????</ko>
   * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} event of Axes
   * <ko>Axes??? {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:change change} ?????????</ko>
   * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>?????? ????????? ???????????? ?????? ??????</ko>
   * @return {void}
   */


  __proto.onChange = function (ctx) {// DO NOTHING
  };
  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event
   * @ko Axes??? {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} ????????? ?????????
   * @param {object} [ctx] Event context<ko>????????? ????????????</ko>
   * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking ????????????</ko>
   * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of Axes
   * <ko>Axes??? {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} ?????????</ko>
   * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>?????? ????????? ???????????? ?????? ??????</ko>
   * @return {void}
   */


  __proto.onRelease = function (ctx) {// DO NOTHING
  };
  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} event
   * @ko Axes??? {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} ????????? ?????????
   * @param {object} [ctx] Event context<ko>????????? ????????????</ko>
   * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking ????????????</ko>
   * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} event of Axes
   * <ko>Axes??? {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:animationEnd animationEnd} ?????????</ko>
   * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>?????? ????????? ???????????? ?????? ??????</ko>
   * @return {void}
   */


  __proto.onAnimationEnd = function (ctx) {// DO NOTHING
  };
  /**
   * An event handler for Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} event
   * @ko Axes??? {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} ????????? ?????????
   * @param {object} [ctx] Event context<ko>????????? ????????????</ko>
   * @param {Flicking} [ctx.flicking] An instance of Flicking<ko>Flicking ????????????</ko>
   * @param {object} [ctx.axesEvent] A {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} event of Axes<ko>Axes??? {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:finish finish} ?????????</ko>
   * @param {function} [ctx.transitTo] A function for changing current state to other state<ko>?????? ????????? ???????????? ?????? ??????</ko>
   * @return {void}
   */


  __proto.onFinish = function (ctx) {// DO NOTHING
  };

  __proto._moveToChangedPosition = function (ctx) {
    var flicking = ctx.flicking,
        axesEvent = ctx.axesEvent,
        transitTo = ctx.transitTo;
    var delta = axesEvent.delta[POSITION_KEY];

    if (!delta) {
      return;
    }

    this._delta += delta;
    var camera = flicking.camera;
    var prevPosition = camera.position;
    var position = axesEvent.pos[POSITION_KEY];
    var newPosition = flicking.circularEnabled ? circulatePosition(position, camera.range.min, camera.range.max) : position;
    void camera.lookAt(newPosition);
    var moveEvent = new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.MOVE, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: getDirection(0, axesEvent.delta[POSITION_KEY]),
      axesEvent: axesEvent
    });
    flicking.trigger(moveEvent);

    if (moveEvent.isCanceled()) {
      // Return to previous position
      void camera.lookAt(prevPosition);
      transitTo(STATE_TYPE.DISABLED);
    }
  };

  return State;
}();

/**
 * A default state when there's no user input and no animation's playing
 * @ko ???????????? ????????? ??????, ?????????????????? ?????????????????? ?????? ?????? ??????
 * @internal
 */

var IdleState = function (_super) {
  __extends(IdleState, _super);

  function IdleState() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     * Whether user is clicking or touching
     * @ko ?????? ???????????? ??????/??????????????? ??????
     * @type {false}
     * @readonly
     */


    _this.holding = false;
    /**
     * Whether Flicking's animating
     * @ko ?????? ??????????????? ?????? ??????
     * @type {false}
     * @readonly
     */

    _this.animating = false;
    return _this;
  }

  var __proto = IdleState.prototype;

  __proto.onEnter = function () {
    this._delta = 0;
  };

  __proto.onHold = function (ctx) {
    // Shouldn't do any action until any panels on flicking area
    var flicking = ctx.flicking,
        axesEvent = ctx.axesEvent,
        transitTo = ctx.transitTo;

    if (flicking.renderer.panelCount <= 0) {
      transitTo(STATE_TYPE.DISABLED);
      return;
    }

    var holdStartEvent = new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.HOLD_START, {
      axesEvent: axesEvent
    });
    flicking.trigger(holdStartEvent);

    if (holdStartEvent.isCanceled()) {
      transitTo(STATE_TYPE.DISABLED);
    } else {
      transitTo(STATE_TYPE.HOLDING);
    }
  }; // By methods call


  __proto.onChange = function (ctx) {
    var flicking = ctx.flicking,
        axesEvent = ctx.axesEvent,
        transitTo = ctx.transitTo;
    var controller = flicking.control.controller;
    var animatingContext = controller.animatingContext;
    var moveStartEvent = new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.MOVE_START, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: getDirection(animatingContext.start, animatingContext.end),
      axesEvent: axesEvent
    });
    flicking.trigger(moveStartEvent);

    if (moveStartEvent.isCanceled()) {
      transitTo(STATE_TYPE.DISABLED);
    } else {
      // Trigger AnimatingState's onChange, to trigger "move" event immediately
      transitTo(STATE_TYPE.ANIMATING).onChange(ctx);
    }
  };

  return IdleState;
}(State);

/**
 * A state that activates when user's holding the Flicking area, but not moved a single pixel yet
 * @ko ???????????? ????????? ??????????????????, ?????? ??????????????? ?????? ??????
 * @internal
 */

var HoldingState = function (_super) {
  __extends(HoldingState, _super);

  function HoldingState() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     * Whether user is clicking or touching
     * @ko ?????? ???????????? ??????/??????????????? ??????
     * @type {true}
     * @readonly
     */


    _this.holding = true;
    /**
     * Whether Flicking's animating
     * @ko ?????? ??????????????? ?????? ??????
     * @type {false}
     * @readonly
     */

    _this.animating = false;
    _this._releaseEvent = null;
    return _this;
  }

  var __proto = HoldingState.prototype;

  __proto.onChange = function (ctx) {
    var flicking = ctx.flicking,
        axesEvent = ctx.axesEvent,
        transitTo = ctx.transitTo;
    var inputEvent = axesEvent.inputEvent;
    var offset = flicking.horizontal ? inputEvent.offsetX : inputEvent.offsetY;
    var moveStartEvent = new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.MOVE_START, {
      isTrusted: axesEvent.isTrusted,
      holding: this.holding,
      direction: getDirection(0, -offset),
      axesEvent: axesEvent
    });
    flicking.trigger(moveStartEvent);

    if (moveStartEvent.isCanceled()) {
      transitTo(STATE_TYPE.DISABLED);
    } else {
      // Trigger DraggingState's onChange, to trigger "move" event immediately
      transitTo(STATE_TYPE.DRAGGING).onChange(ctx);
    }
  };

  __proto.onRelease = function (ctx) {
    var flicking = ctx.flicking,
        axesEvent = ctx.axesEvent,
        transitTo = ctx.transitTo;
    flicking.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.HOLD_END, {
      axesEvent: axesEvent
    }));

    if (axesEvent.delta.flick !== 0) {
      // Sometimes "release" event on axes triggered before "change" event
      // Especially if user flicked panel fast in really short amount of time
      // if delta is not zero, that means above case happened.
      // Event flow should be HOLD_START -> MOVE_START -> MOVE -> HOLD_END
      // At least one move event should be included between holdStart and holdEnd
      axesEvent.setTo({
        flick: flicking.camera.position
      }, 0);
      transitTo(STATE_TYPE.IDLE);
      return;
    } // Can't handle select event here,
    // As "finish" axes event happens


    this._releaseEvent = axesEvent;
  };

  __proto.onFinish = function (ctx) {
    var e_1, _a;

    var flicking = ctx.flicking,
        transitTo = ctx.transitTo; // Should transite to IDLE state before select event
    // As user expects hold is already finished

    transitTo(STATE_TYPE.IDLE);

    if (!this._releaseEvent) {
      return;
    } // Handle release event here
    // To prevent finish event called twice


    var releaseEvent = this._releaseEvent; // Static click

    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

    var srcEvent = releaseEvent.inputEvent.srcEvent;
    var clickedElement;

    if (srcEvent.type === "touchend") {
      var touchEvent = srcEvent;
      var touch = touchEvent.changedTouches[0];
      clickedElement = document.elementFromPoint(touch.clientX, touch.clientY);
    } else {
      clickedElement = srcEvent.target;
    }
    /* eslint-enable */


    var panels = flicking.renderer.panels;
    var clickedPanel = null;

    try {
      for (var panels_1 = __values(panels), panels_1_1 = panels_1.next(); !panels_1_1.done; panels_1_1 = panels_1.next()) {
        var panel = panels_1_1.value;

        if (panel.contains(clickedElement)) {
          clickedPanel = panel;
          break;
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (panels_1_1 && !panels_1_1.done && (_a = panels_1.return)) _a.call(panels_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    if (clickedPanel) {
      var cameraPosition = flicking.camera.position;
      var clickedPanelPosition = clickedPanel.position;
      flicking.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.SELECT, {
        index: clickedPanel.index,
        panel: clickedPanel,
        // Direction to the clicked panel
        direction: getDirection(cameraPosition, clickedPanelPosition)
      }));
    }
  };

  return HoldingState;
}(State);

/**
 * A state that activates when user's dragging the Flicking area
 * @ko ???????????? ??????????????? ??????
 * @internal
 */

var DraggingState = function (_super) {
  __extends(DraggingState, _super);

  function DraggingState() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     * Whether user is clicking or touching
     * @ko ?????? ???????????? ??????/??????????????? ??????
     * @type {true}
     * @readonly
     */


    _this.holding = true;
    /**
     * Whether Flicking's animating
     * @ko ?????? ??????????????? ?????? ??????
     * @type {true}
     * @readonly
     */

    _this.animating = true;
    return _this;
  }

  var __proto = DraggingState.prototype;

  __proto.onChange = function (ctx) {
    this._moveToChangedPosition(ctx);
  };

  __proto.onRelease = function (ctx) {
    var flicking = ctx.flicking,
        axesEvent = ctx.axesEvent,
        transitTo = ctx.transitTo; // Update last position to cope with Axes's animating behavior
    // Axes uses start position when animation start

    flicking.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.HOLD_END, {
      axesEvent: axesEvent
    }));

    if (flicking.renderer.panelCount <= 0) {
      // There're no panels
      transitTo(STATE_TYPE.IDLE);
      return;
    }

    transitTo(STATE_TYPE.ANIMATING);
    var control = flicking.control;
    var position = axesEvent.destPos[POSITION_KEY];
    var duration = Math.max(axesEvent.duration, flicking.duration);
    void control.moveToPosition(position, duration, axesEvent);
  };

  return DraggingState;
}(State);

/**
 * A state that activates when Flicking's animating by user input or method call
 * @ko ????????? ???????????? ????????? ????????? ?????? Flicking??? ?????????????????? ???????????? ??????
 * @internal
 */

var AnimatingState = function (_super) {
  __extends(AnimatingState, _super);

  function AnimatingState() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     * Whether user is clicking or touching
     * @ko ?????? ???????????? ??????/??????????????? ??????
     * @type {false}
     * @readonly
     */


    _this.holding = false;
    /**
     * Whether Flicking's animating
     * @ko ?????? ??????????????? ?????? ??????
     * @type {true}
     * @readonly
     */

    _this.animating = true;
    return _this;
  }

  var __proto = AnimatingState.prototype;

  __proto.onHold = function (ctx) {
    var flicking = ctx.flicking,
        axesEvent = ctx.axesEvent,
        transitTo = ctx.transitTo;
    this._delta = 0;
    flicking.control.updateInput();
    var holdStartEvent = new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.HOLD_START, {
      axesEvent: axesEvent
    });
    flicking.trigger(holdStartEvent);

    if (holdStartEvent.isCanceled()) {
      transitTo(STATE_TYPE.DISABLED);
    } else {
      transitTo(STATE_TYPE.DRAGGING);
    }
  };

  __proto.onChange = function (ctx) {
    this._moveToChangedPosition(ctx);
  };

  __proto.onFinish = function (ctx) {
    var flicking = ctx.flicking,
        axesEvent = ctx.axesEvent,
        transitTo = ctx.transitTo;
    transitTo(STATE_TYPE.IDLE);
    var controller = flicking.control.controller;
    var animatingContext = controller.animatingContext;
    flicking.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.MOVE_END, {
      isTrusted: axesEvent.isTrusted,
      direction: getDirection(animatingContext.start, animatingContext.end),
      axesEvent: axesEvent
    }));
  };

  return AnimatingState;
}(State);

/**
 * A state that activates when Flicking is stopped by event's `stop` method
 * @ko ???????????? `stop`????????? ?????? Flicking??? ????????? ??????
 * @internal
 */

var DisabledState = function (_super) {
  __extends(DisabledState, _super);

  function DisabledState() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     * Whether user is clicking or touching
     * @ko ?????? ???????????? ??????/??????????????? ??????
     * @type {false}
     * @readonly
     */


    _this.holding = false;
    /**
     * Whether Flicking's animating
     * @ko ?????? ??????????????? ?????? ??????
     * @type {true}
     * @readonly
     */

    _this.animating = true;
    return _this;
  }

  var __proto = DisabledState.prototype;

  __proto.onAnimationEnd = function (ctx) {
    var transitTo = ctx.transitTo;
    transitTo(STATE_TYPE.IDLE);
  };

  __proto.onChange = function (ctx) {
    var axesEvent = ctx.axesEvent,
        transitTo = ctx.transitTo; // Can stop Axes's change event

    axesEvent.stop();
    transitTo(STATE_TYPE.IDLE);
  };

  __proto.onRelease = function (ctx) {
    var axesEvent = ctx.axesEvent,
        transitTo = ctx.transitTo; // This is needed when stopped hold start event

    if (axesEvent.delta.flick === 0) {
      transitTo(STATE_TYPE.IDLE);
    }
  };

  return DisabledState;
}(State);

/**
 * @internal
 */

var StateMachine = function () {
  function StateMachine() {
    var _this = this;

    this.transitTo = function (nextStateType) {
      var nextState;

      switch (nextStateType) {
        case STATE_TYPE.IDLE:
          nextState = new IdleState();
          break;

        case STATE_TYPE.HOLDING:
          nextState = new HoldingState();
          break;

        case STATE_TYPE.DRAGGING:
          nextState = new DraggingState();
          break;

        case STATE_TYPE.ANIMATING:
          nextState = new AnimatingState();
          break;

        case STATE_TYPE.DISABLED:
          nextState = new DisabledState();
          break;
      }

      nextState.onEnter(_this._state);
      _this._state = nextState;
      return _this._state;
    };

    this._state = new IdleState();
  }

  var __proto = StateMachine.prototype;
  Object.defineProperty(__proto, "state", {
    get: function () {
      return this._state;
    },
    enumerable: false,
    configurable: true
  });

  __proto.fire = function (eventType, externalCtx) {
    var currentState = this._state;

    var ctx = __assign(__assign({}, externalCtx), {
      transitTo: this.transitTo
    });

    switch (eventType) {
      case EVENT.HOLD:
        currentState.onHold(ctx);
        break;

      case EVENT.CHANGE:
        currentState.onChange(ctx);
        break;

      case EVENT.RELEASE:
        currentState.onRelease(ctx);
        break;

      case EVENT.ANIMATION_END:
        currentState.onAnimationEnd(ctx);
        break;

      case EVENT.FINISH:
        currentState.onFinish(ctx);
        break;
    }
  };

  return StateMachine;
}();

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */
/**
 * A controller that handles the {@link https://naver.github.io/egjs-axes/ @egjs/axes} events
 * @ko {@link https://naver.github.io/egjs-axes/ @egjs/axes}??? ???????????? ???????????? ???????????? ????????????
 * @internal
 */

var AxesController = function () {
  /** */
  function AxesController() {
    var _this = this;

    this._onAxesHold = function () {
      _this._dragged = false;
    };

    this._onAxesChange = function () {
      _this._dragged = true;
    };

    this._preventClickWhenDragged = function (e) {
      if (_this._dragged) {
        e.preventDefault();
        e.stopPropagation();
      }

      _this._dragged = false;
    };

    this._resetInternalValues();

    this._stateMachine = new StateMachine();
  }

  var __proto = AxesController.prototype;
  Object.defineProperty(__proto, "axes", {
    /**
     * An {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} instance
     * @ko {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes}??? ????????????
     * @type {Axes}
     * @see https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html
     * @readonly
     */
    get: function () {
      return this._axes;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "state", {
    /**
     * A activated {@link State} that shows the current status of the user input or the animation
     * @ko ?????? ???????????? {@link State} ??????????????? ????????? ?????? ?????? ??????????????? ????????? ???????????????
     * @type {State}
     */
    get: function () {
      return this._stateMachine.state;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "animatingContext", {
    /**
     * A context of the current animation playing
     * @ko ?????? ???????????? ??????????????? ??????
     * @type {object}
     * @property {number} start A start position of the animation<ko>??????????????? ?????? ??????</ko>
     * @property {number} end A end position of the animation<ko>??????????????? ??? ??????</ko>
     * @property {number} offset camera offset<ko>????????? ?????????</ko>
     * @readonly
     */
    get: function () {
      return this._animatingContext;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "controlParams", {
    /**
     * A current control parameters of the Axes instance
     * @ko ???????????? ?????? Axes ???????????????
     * @type {ControlParams}
     */
    get: function () {
      var axes = this._axes;

      if (!axes) {
        return {
          range: {
            min: 0,
            max: 0
          },
          position: 0,
          circular: false
        };
      }

      var axis = axes.axis[POSITION_KEY];
      return {
        range: {
          min: axis.range[0],
          max: axis.range[1]
        },
        circular: axis.circular[0],
        position: this.position
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "enabled", {
    /**
     * A Boolean indicating whether the user input is enabled
     * @ko ?????? ????????? ????????? ???????????????????????? ???????????? ???
     * @type {boolean}
     * @readonly
     */
    get: function () {
      var _a, _b;

      return (_b = (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.isEnable()) !== null && _b !== void 0 ? _b : false;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "position", {
    /**
     * Current position value in {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} instance
     * @ko {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} ???????????? ????????? ?????? ?????? ???
     * @type {number}
     * @readonly
     */
    get: function () {
      var _a, _b;

      return (_b = (_a = this._axes) === null || _a === void 0 ? void 0 : _a.get([POSITION_KEY])[POSITION_KEY]) !== null && _b !== void 0 ? _b : 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "range", {
    /**
     * Current range value in {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} instance
     * @ko {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html Axes} ???????????? ????????? ?????? ?????? ?????? ???
     * @type {number[]}
     * @readonly
     */
    get: function () {
      var _a, _b;

      return (_b = (_a = this._axes) === null || _a === void 0 ? void 0 : _a.axis[POSITION_KEY].range) !== null && _b !== void 0 ? _b : [0, 0];
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "bounce", {
    /**
     * Actual bounce size(px)
     * @ko ????????? bounce ??????(px ??????)
     * @type {number[]}
     * @readonly
     */
    get: function () {
      var _a;

      return (_a = this._axes) === null || _a === void 0 ? void 0 : _a.axis[POSITION_KEY].bounce;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Initialize AxesController
   * @ko AxesController??? ??????????????????
   * @param {Flicking} flicking An instance of Flicking
   * @chainable
   * @return {this}
   */

  __proto.init = function (flicking) {
    var _a;

    var _this = this;

    this._flicking = flicking;
    this._axes = new _egjs_axes__WEBPACK_IMPORTED_MODULE_1__.default((_a = {}, _a[POSITION_KEY] = {
      range: [0, 0],
      circular: false,
      bounce: [0, 0]
    }, _a), {
      deceleration: flicking.deceleration,
      interruptable: flicking.interruptable,
      easing: flicking.easing
    });
    this._panInput = new _egjs_axes__WEBPACK_IMPORTED_MODULE_1__.PanInput(flicking.viewport.element, {
      inputType: flicking.inputType,
      iOSEdgeSwipeThreshold: flicking.iOSEdgeSwipeThreshold,
      scale: flicking.horizontal ? [-1, 0] : [0, -1],
      releaseOnScroll: true
    });
    var axes = this._axes;
    axes.connect(flicking.horizontal ? [POSITION_KEY, ""] : ["", POSITION_KEY], this._panInput);

    var _loop_1 = function (key) {
      var eventType = EVENT[key];
      axes.on(eventType, function (e) {
        _this._stateMachine.fire(eventType, {
          flicking: flicking,
          axesEvent: e
        });
      });
    };

    for (var key in EVENT) {
      _loop_1(key);
    }

    return this;
  };
  /**
   * Destroy AxesController and return to initial state
   * @ko AxesController??? ?????? ????????? ???????????????
   * @return {void}
   */


  __proto.destroy = function () {
    var _a, _b;

    this.removePreventClickHandler();
    (_a = this._axes) === null || _a === void 0 ? void 0 : _a.destroy();
    (_b = this._panInput) === null || _b === void 0 ? void 0 : _b.destroy();

    this._resetInternalValues();
  };
  /**
   * Enable input from the user (mouse/touch)
   * @ko ???????????? ??????(?????????/??????)??? ??????????????????
   * @chainable
   * @return {this}
   */


  __proto.enable = function () {
    var _a;

    (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.enable();
    return this;
  };
  /**
   * Disable input from the user (mouse/touch)
   * @ko ???????????? ??????(?????????/??????)??? ????????????
   * @chainable
   * @return {this}
   */


  __proto.disable = function () {
    var _a;

    (_a = this._panInput) === null || _a === void 0 ? void 0 : _a.disable();
    return this;
  };
  /**
   * Update {@link https://naver.github.io/egjs-axes/ @egjs/axes}'s state
   * @ko {@link https://naver.github.io/egjs-axes/ @egjs/axes}??? ????????? ???????????????
   * @chainable
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link AxesController#init init} is not called before
   * <ko>{@link AxesController#init init}??? ????????? ???????????? ?????? ??????</ko>
   * @return {this}
   */


  __proto.update = function (controlParams) {
    var _a;

    var flicking = getFlickingAttached(this._flicking, "Control");
    var camera = flicking.camera;
    var axes = this._axes;
    var axis = axes.axis[POSITION_KEY];
    axis.circular = [controlParams.circular, controlParams.circular];
    axis.range = [controlParams.range.min, controlParams.range.max];
    axis.bounce = parseBounce(flicking.bounce, camera.size);
    axes.axm.set((_a = {}, _a[POSITION_KEY] = controlParams.position, _a));
    return this;
  };
  /**
   * Attach a handler to the camera element to prevent click events during animation
   * @ko ????????? ??????????????? ??????????????? ????????? ?????? ???????????? ???????????? ???????????? ???????????????
   * @return {this}
   */


  __proto.addPreventClickHandler = function () {
    var flicking = getFlickingAttached(this._flicking, "Control");
    var axes = this._axes;
    var cameraEl = flicking.camera.element;
    axes.on(EVENT.HOLD, this._onAxesHold);
    axes.on(EVENT.CHANGE, this._onAxesChange);
    cameraEl.addEventListener("click", this._preventClickWhenDragged, true);
    return this;
  };
  /**
   * Detach a handler to the camera element to prevent click events during animation
   * @ko ????????? ??????????????? ??????????????? ????????? ?????? ???????????? ???????????? ???????????? ???????????????
   * @return {this}
   */


  __proto.removePreventClickHandler = function () {
    var flicking = getFlickingAttached(this._flicking, "Control");
    var axes = this._axes;
    var cameraEl = flicking.camera.element;
    axes.off(EVENT.HOLD, this._onAxesHold);
    axes.off(EVENT.CHANGE, this._onAxesChange);
    cameraEl.removeEventListener("click", this._preventClickWhenDragged, true);
    return this;
  };
  /**
   * Run Axes's {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#setTo setTo} using the given position
   * @ko Axes??? {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#setTo setTo} ???????????? ????????? ????????? ???????????? ???????????????
   * @param {number} position A position to move<ko>????????? ??????</ko>
   * @param {number} duration Duration of the animation (unit: ms)<ko>??????????????? ?????? ?????? (??????: ms)</ko>
   * @param {number} [axesEvent] If provided, it'll use its {@link https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#setTo setTo} method instead<ko>??? ?????? ???????????? ??????, ?????? ???????????? {@link https://naver#github#io/egjs-axes/release/latest/doc/eg#Axes#html#setTo setTo} ???????????? ???????????? ???????????????.</ko>
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}??? ????????? ???????????? ?????? ??????|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|????????? ????????? ?????? ?????????????????? ????????? ??????|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>?????? ?????? ???????????? resolve?????? Promise</ko>
   */


  __proto.animateTo = function (position, duration, axesEvent) {
    var _a;

    var _this = this;

    var axes = this._axes;

    if (!axes) {
      return Promise.reject(new FlickingError(MESSAGE.NOT_ATTACHED_TO_FLICKING("Control"), CODE.NOT_ATTACHED_TO_FLICKING));
    }

    var startPos = axes.get([POSITION_KEY])[POSITION_KEY];

    if (startPos === position) {
      var flicking = getFlickingAttached(this._flicking, "Control");
      return flicking.camera.lookAt(position);
    }

    this._animatingContext = {
      start: startPos,
      end: position,
      offset: 0
    };

    var animate = function () {
      var _a, _b;

      var resetContext = function () {
        _this._animatingContext = {
          start: 0,
          end: 0,
          offset: 0
        };
      };

      axes.once(EVENT.FINISH, resetContext);

      if (axesEvent) {
        axesEvent.setTo((_a = {}, _a[POSITION_KEY] = position, _a), duration);
      } else {
        axes.setTo((_b = {}, _b[POSITION_KEY] = position, _b), duration);
      }
    };

    if (duration === 0) {
      var flicking = getFlickingAttached(this._flicking, "Control");
      var camera = flicking.camera;
      animate();
      var newPos = flicking.circularEnabled ? circulatePosition(position, camera.range.min, camera.range.max) : position;
      axes.axm.set((_a = {}, _a[POSITION_KEY] = newPos, _a));
      return Promise.resolve();
    } else {
      return new Promise(function (resolve, reject) {
        var animationFinishHandler = function () {
          axes.off(EVENT.HOLD, interruptionHandler);
          resolve();
        };

        var interruptionHandler = function () {
          axes.off(EVENT.FINISH, animationFinishHandler);
          reject(new FlickingError(MESSAGE.ANIMATION_INTERRUPTED, CODE.ANIMATION_INTERRUPTED));
        };

        axes.once(EVENT.FINISH, animationFinishHandler);
        axes.once(EVENT.HOLD, interruptionHandler);
        animate();
      });
    }
  };

  __proto._resetInternalValues = function () {
    this._flicking = null;
    this._axes = null;
    this._panInput = null;
    this._animatingContext = {
      start: 0,
      end: 0,
      offset: 0
    };
    this._dragged = false;
  };

  return AxesController;
}();

/**
 * A component that manages inputs and animation of Flicking
 * @ko Flicking??? ?????? ?????? & ?????????????????? ???????????? ????????????
 */

var Control = function () {
  /** */
  function Control() {
    this._flicking = null;
    this._controller = new AxesController();
    this._activePanel = null;
  }

  var __proto = Control.prototype;
  Object.defineProperty(__proto, "controller", {
    /**
     * A controller that handles the {@link https://naver.github.io/egjs-axes/ @egjs/axes} events
     * @ko {@link https://naver.github.io/egjs-axes/ @egjs/axes}??? ???????????? ???????????? ???????????? ????????????
     * @type {AxesController}
     * @readonly
     */
    get: function () {
      return this._controller;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "activeIndex", {
    /**
     * Index number of the {@link Flicking#currentPanel currentPanel}
     * @ko {@link Flicking#currentPanel currentPanel}??? ????????? ??????
     * @type {number}
     * @default 0
     * @readonly
     */
    get: function () {
      var _a, _b;

      return (_b = (_a = this._activePanel) === null || _a === void 0 ? void 0 : _a.index) !== null && _b !== void 0 ? _b : -1;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "activePanel", {
    /**
     * An active panel
     * @ko ?????? ????????? ??????
     * @type {Panel | null}
     * @readonly
     */
    get: function () {
      return this._activePanel;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "animating", {
    /**
     * Whether Flicking's animating
     * @ko ?????? ??????????????? ?????? ??????
     * @type {boolean}
     * @readonly
     */
    get: function () {
      return this._controller.state.animating;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "holding", {
    /**
     * Whether user is clicking or touching
     * @ko ?????? ???????????? ??????/??????????????? ??????
     * @type {boolean}
     * @readonly
     */
    get: function () {
      return this._controller.state.holding;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Initialize Control
   * @ko Control??? ??????????????????
   * @param {Flicking} flicking An instance of {@link Flicking}<ko>Flicking??? ????????????</ko>
   * @chainable
   * @return {this}
   */

  __proto.init = function (flicking) {
    this._flicking = flicking;

    this._controller.init(flicking);

    return this;
  };
  /**
   * Destroy Control and return to initial state
   * @ko Control??? ?????? ????????? ???????????????
   * @return {void}
   */


  __proto.destroy = function () {
    this._controller.destroy();

    this._flicking = null;
    this._activePanel = null;
  };
  /**
   * Enable input from the user (mouse/touch)
   * @ko ???????????? ??????(?????????/??????)??? ??????????????????
   * @chainable
   * @return {this}
   */


  __proto.enable = function () {
    this._controller.enable();

    return this;
  };
  /**
   * Disable input from the user (mouse/touch)
   * @ko ???????????? ??????(?????????/??????)??? ????????????
   * @chainable
   * @return {this}
   */


  __proto.disable = function () {
    this._controller.disable();

    return this;
  };
  /**
   * Update position after resizing
   * @ko resize ????????? position??? ?????????????????????
   * @param {number} progressInPanel Previous camera's progress in active panel before resize<ko>Resize ?????? ?????? ????????? ?????? ???????????? ????????? progress ???</ko>
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}??? ????????? ???????????? ?????? ??????</ko>
   * @chainable
   * @return {Promise<void>}
   */


  __proto.updatePosition = function (_progressInPanel) {
    return __awaiter(this, void 0, void 0, function () {
      var flicking, camera, activePanel;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            flicking = getFlickingAttached(this._flicking, "Control");
            camera = flicking.camera;
            activePanel = this._activePanel;
            if (!activePanel) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , camera.lookAt(camera.clampToReachablePosition(activePanel.position))];

          case 1:
            _a.sent();

            _a.label = 2;

          case 2:
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * Update {@link Control#controller controller}'s state
   * @ko {@link Control#controller controller}??? ?????? ????????? ???????????????
   * @chainable
   * @return {this}
   */


  __proto.updateInput = function () {
    var flicking = getFlickingAttached(this._flicking, "Control");
    var camera = flicking.camera;

    this._controller.update(camera.controlParams);

    return this;
  };
  /**
   * Reset {@link Control#activePanel activePanel} to `null`
   * @ko {@link Control#activePanel activePanel}??? `null`??? ??????????????????
   * @chainable
   * @return {this}
   */


  __proto.resetActive = function () {
    this._activePanel = null;
    return this;
  };
  /**
   * Move {@link Camera} to the given panel
   * @ko {@link Camera}??? ?????? ?????? ?????? ???????????????
   * @param {Panel} panel The target panel to move<ko>????????? ??????</ko>
   * @param {object} options An options object<ko>?????? ????????????</ko>
   * @param {number} duration Duration of the animation (unit: ms)<ko>??????????????? ?????? ?????? (??????: ms)</ko>
   * @param {object} [axesEvent] {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of {@link https://naver.github.io/egjs-axes/ Axes}
   * <ko>{@link https://naver.github.io/egjs-axes/ Axes}??? {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} ?????????</ko>
   * @param {DIRECTION} [direction=DIRECTION.NONE] Direction to move, only available in the {@link Flicking#circular circular} mode<ko>????????? ??????. {@link Flicking#circular circular} ?????? ?????????????????? ?????? ???????????????</ko>
   * @fires Flicking#moveStart
   * @fires Flicking#move
   * @fires Flicking#moveEnd
   * @fires Flicking#willChange
   * @fires Flicking#changed
   * @fires Flicking#willRestore
   * @fires Flicking#restored
   * @fires Flicking#needPanel
   * @fires Flicking#visibleChange
   * @fires Flicking#reachEdge
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|????????? ????????? ??????????????????, Camera??? {@link Camera#range range} ?????? ?????? ??????|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}??? ????????? ???????????? ?????? ??????|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|????????? ????????? ?????? ?????????????????? ????????? ??????|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|????????? ???????????? ??? ???????????? `stop()`??? ????????? ??????|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target panel<ko>?????? ?????? ???????????? resolve?????? Promise</ko>
   */


  __proto.moveToPanel = function (panel, _a) {
    var duration = _a.duration,
        _b = _a.direction,
        direction = _b === void 0 ? DIRECTION.NONE : _b,
        axesEvent = _a.axesEvent;
    return __awaiter(this, void 0, void 0, function () {
      var flicking, camera, position, nearestAnchor, camPos_1, camRangeDiff, possiblePositions;
      return __generator(this, function (_c) {
        flicking = getFlickingAttached(this._flicking, "Control");
        camera = flicking.camera;
        position = panel.position;
        nearestAnchor = camera.findNearestAnchor(position);

        if (panel.removed || !nearestAnchor) {
          return [2
          /*return*/
          , Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(panel.position), CODE.POSITION_NOT_REACHABLE))];
        }

        if (!camera.canReach(panel)) {
          // Override position & panel if that panel is not reachable
          position = nearestAnchor.position;
          panel = nearestAnchor.panel;
        } else if (flicking.circularEnabled) {
          camPos_1 = this._controller.position;
          camRangeDiff = camera.rangeDiff;
          possiblePositions = [position, position + camRangeDiff, position - camRangeDiff].filter(function (pos) {
            if (direction === DIRECTION.NONE) return true;
            return direction === DIRECTION.PREV ? pos <= camPos_1 : pos >= camPos_1;
          });
          position = possiblePositions.reduce(function (nearestPosition, pos) {
            if (Math.abs(camPos_1 - pos) < Math.abs(camPos_1 - nearestPosition)) {
              return pos;
            } else {
              return nearestPosition;
            }
          }, Infinity);
        }

        this._triggerIndexChangeEvent(panel, panel.position, axesEvent);

        return [2
        /*return*/
        , this._animateToPosition({
          position: position,
          duration: duration,
          newActivePanel: panel,
          axesEvent: axesEvent
        })];
      });
    });
  };

  __proto._triggerIndexChangeEvent = function (panel, position, axesEvent) {
    var _a;

    var flicking = getFlickingAttached(this._flicking, "Control");
    var triggeringEvent = panel !== this._activePanel ? EVENTS.WILL_CHANGE : EVENTS.WILL_RESTORE;
    var camera = flicking.camera;
    var activePanel = this._activePanel;
    var event = new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(triggeringEvent, {
      index: panel.index,
      panel: panel,
      isTrusted: (axesEvent === null || axesEvent === void 0 ? void 0 : axesEvent.isTrusted) || false,
      direction: getDirection((_a = activePanel === null || activePanel === void 0 ? void 0 : activePanel.position) !== null && _a !== void 0 ? _a : camera.position, position)
    });
    flicking.trigger(event);

    if (event.isCanceled()) {
      throw new FlickingError(MESSAGE.STOP_CALLED_BY_USER, CODE.STOP_CALLED_BY_USER);
    }
  };

  __proto._animateToPosition = function (_a) {
    var position = _a.position,
        duration = _a.duration,
        newActivePanel = _a.newActivePanel,
        axesEvent = _a.axesEvent;
    return __awaiter(this, void 0, void 0, function () {
      var flicking, currentPanel, animate, isTrusted, animation;

      var _this = this;

      return __generator(this, function (_b) {
        flicking = getFlickingAttached(this._flicking, "Control");
        currentPanel = this._activePanel;

        animate = function () {
          return _this._controller.animateTo(position, duration, axesEvent);
        };

        isTrusted = (axesEvent === null || axesEvent === void 0 ? void 0 : axesEvent.isTrusted) || false;

        if (duration <= 0) {
          animation = animate();

          this._setActive(newActivePanel, currentPanel, isTrusted);

          return [2
          /*return*/
          , animation];
        } else {
          return [2
          /*return*/
          , animate().then(function () {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    this._setActive(newActivePanel, currentPanel, isTrusted);

                    return [4
                    /*yield*/
                    , flicking.renderer.render()];

                  case 1:
                    _a.sent();

                    return [2
                    /*return*/
                    ];
                }
              });
            });
          }).catch(function (err) {
            if (axesEvent && err instanceof FlickingError && err.code === CODE.ANIMATION_INTERRUPTED) return;
            throw err;
          })];
        }
      });
    });
  };

  __proto._setActive = function (newActivePanel, prevActivePanel, isTrusted) {
    var _a;

    var flicking = getFlickingAttached(this._flicking, "Control");
    this._activePanel = newActivePanel;
    flicking.camera.updateAdaptiveHeight();

    if (newActivePanel !== prevActivePanel) {
      flicking.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.CHANGED, {
        index: newActivePanel.index,
        panel: newActivePanel,
        prevIndex: (_a = prevActivePanel === null || prevActivePanel === void 0 ? void 0 : prevActivePanel.index) !== null && _a !== void 0 ? _a : -1,
        prevPanel: prevActivePanel,
        isTrusted: isTrusted,
        direction: prevActivePanel ? getDirection(prevActivePanel.position, newActivePanel.position) : DIRECTION.NONE
      }));
    } else {
      flicking.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.RESTORED, {
        isTrusted: isTrusted
      }));
    }
  };

  return Control;
}();

/**
 * A data component that has actual position where the camera should be stopped at
 * @ko ???????????? ?????????????????? ?????? ????????? ?????? ?????? ????????? ????????????
 */
var AnchorPoint = function () {
  /**
   * @param {object} options An options object<ko>?????? ??????</ko>
   * @param {number} [options.index] Index of AnchorPoint<ko>AnchorPoint??? ?????????</ko>
   * @param {number} [options.position] Position of AnchorPoint<ko>AnchorPoint??? ??????</ko>
   * @param {Panel} [options.panel] A {@link Panel} instance AnchorPoint is referencing to<ko>AnchorPoint??? ???????????? ?????? {@link Panel}</ko>
   */
  function AnchorPoint(_a) {
    var index = _a.index,
        position = _a.position,
        panel = _a.panel;
    this._index = index;
    this._pos = position;
    this._panel = panel;
  }

  var __proto = AnchorPoint.prototype;
  Object.defineProperty(__proto, "index", {
    /**
     * Index of AnchorPoint
     * @ko AnchorPoint??? ?????????
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._index;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "position", {
    /**
     * Position of AnchorPoint
     * @ko AnchorPoint??? ??????
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._pos;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "panel", {
    /**
     * A {@link Panel} instance AnchorPoint is referencing to
     * @ko AnchorPoint??? ???????????? ?????? {@link Panel}
     * @type {Panel}
     * @readonly
     */
    get: function () {
      return this._panel;
    },
    enumerable: false,
    configurable: true
  });
  return AnchorPoint;
}();

/**
 * A {@link Control} that uses a release momentum to choose destination panel
 * @ko ????????? ????????? ????????? ???????????? ???????????? ????????? ????????? ???????????? ?????? ????????? ???????????? {@link Control}
 */

var SnapControl = function (_super) {
  __extends(SnapControl, _super);
  /** */


  function SnapControl(_a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.count,
        count = _c === void 0 ? Infinity : _c;

    var _this = _super.call(this) || this;

    _this._count = count;
    return _this;
  }

  var __proto = SnapControl.prototype;
  Object.defineProperty(__proto, "count", {
    /**
     * Maximum number of panels can go after release
     * @ko ?????? ?????? ?????? ???????????? ????????? ??? ?????? ????????? ?????? ??????
     * @type {number}
     * @default Infinity
     */
    get: function () {
      return this._count;
    },
    set: function (val) {
      this._count = val;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Move {@link Camera} to the given position
   * @ko {@link Camera}??? ????????? ????????? ???????????????
   * @param {number} position The target position to move<ko>????????? ??????</ko>
   * @param {number} duration Duration of the panel movement animation (unit: ms).<ko>?????? ?????? ??????????????? ?????? ?????? (??????: ms)</ko>
   * @param {object} [axesEvent] {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of {@link https://naver.github.io/egjs-axes/ Axes}
   * <ko>{@link https://naver.github.io/egjs-axes/ Axes}??? {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} ?????????</ko>
   * @fires Flicking#moveStart
   * @fires Flicking#move
   * @fires Flicking#moveEnd
   * @fires Flicking#willChange
   * @fires Flicking#changed
   * @fires Flicking#willRestore
   * @fires Flicking#restored
   * @fires Flicking#needPanel
   * @fires Flicking#visibleChange
   * @fires Flicking#reachEdge
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|????????? ????????? ??????????????????, Camera??? {@link Camera#range range} ?????? ?????? ??????|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}??? ????????? ???????????? ?????? ??????|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|????????? ????????? ?????? ?????????????????? ????????? ??????|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|????????? ???????????? ??? ???????????? `stop()`??? ????????? ??????|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>?????? ?????? ???????????? resolve?????? Promise</ko>
   */

  __proto.moveToPosition = function (position, duration, axesEvent) {
    return __awaiter(this, void 0, void 0, function () {
      var flicking, camera, activeAnchor, anchorAtCamera, state, snapThreshold, posDelta, absPosDelta, snapDelta, targetAnchor;
      return __generator(this, function (_a) {
        flicking = getFlickingAttached(this._flicking, "Control");
        camera = flicking.camera;
        activeAnchor = camera.findActiveAnchor();
        anchorAtCamera = camera.findNearestAnchor(camera.position);
        state = flicking.control.controller.state;

        if (!activeAnchor || !anchorAtCamera) {
          return [2
          /*return*/
          , Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(position), CODE.POSITION_NOT_REACHABLE))];
        }

        snapThreshold = this._calcSnapThreshold(position, activeAnchor);
        posDelta = flicking.animating ? state.delta : position - camera.position;
        absPosDelta = Math.abs(posDelta);
        snapDelta = axesEvent && axesEvent.delta[POSITION_KEY] !== 0 ? Math.abs(axesEvent.delta[POSITION_KEY]) : absPosDelta;

        if (snapDelta >= snapThreshold && snapDelta > 0) {
          // Move to anchor at position
          targetAnchor = this._findSnappedAnchor(position, anchorAtCamera);
        } else if (absPosDelta >= flicking.threshold && absPosDelta > 0) {
          // Move to the adjacent panel
          targetAnchor = this._findAdjacentAnchor(posDelta, anchorAtCamera);
        } else {
          // Restore to active panel
          targetAnchor = anchorAtCamera;
        }

        this._triggerIndexChangeEvent(targetAnchor.panel, position, axesEvent);

        return [2
        /*return*/
        , this._animateToPosition({
          position: camera.clampToReachablePosition(targetAnchor.position),
          duration: duration,
          newActivePanel: targetAnchor.panel,
          axesEvent: axesEvent
        })];
      });
    });
  };

  __proto._findSnappedAnchor = function (position, anchorAtCamera) {
    var flicking = getFlickingAttached(this._flicking, "Control");
    var camera = flicking.camera;
    var count = this._count;
    var currentPos = camera.position;
    var clampedPosition = camera.clampToReachablePosition(position);
    var anchorAtPosition = camera.findAnchorIncludePosition(clampedPosition);

    if (!anchorAtCamera || !anchorAtPosition) {
      throw new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(position), CODE.POSITION_NOT_REACHABLE);
    }

    if (!isFinite(count)) {
      return anchorAtPosition;
    }

    var panelCount = flicking.panelCount;
    var anchors = camera.anchorPoints;
    var loopCount = Math.sign(position - currentPos) * Math.floor(Math.abs(position - currentPos) / camera.rangeDiff);

    if (position > currentPos && anchorAtPosition.index < anchorAtCamera.index || anchorAtPosition.position > anchorAtCamera.position && anchorAtPosition.index === anchorAtCamera.index) {
      loopCount += 1;
    } else if (position < currentPos && anchorAtPosition.index > anchorAtCamera.index || anchorAtPosition.position < anchorAtCamera.position && anchorAtPosition.index === anchorAtCamera.index) {
      loopCount -= 1;
    }

    var circularIndexOffset = loopCount * panelCount;
    var anchorAtPositionIndex = anchorAtPosition.index + circularIndexOffset;

    if (Math.abs(anchorAtPositionIndex - anchorAtCamera.index) <= count) {
      var anchor = anchors[anchorAtPosition.index];
      return new AnchorPoint({
        index: anchor.index,
        position: anchor.position + loopCount * camera.rangeDiff,
        panel: anchor.panel
      });
    }

    if (flicking.circularEnabled) {
      var targetAnchor = anchors[circulateIndex(anchorAtCamera.index + Math.sign(position - currentPos) * count, panelCount)];
      var loop = Math.floor(count / panelCount);

      if (position > currentPos && targetAnchor.index < anchorAtCamera.index) {
        loop += 1;
      } else if (position < currentPos && targetAnchor.index > anchorAtCamera.index) {
        loop -= 1;
      }

      return new AnchorPoint({
        index: targetAnchor.index,
        position: targetAnchor.position + loop * camera.rangeDiff,
        panel: targetAnchor.panel
      });
    } else {
      return anchors[clamp(anchorAtCamera.index + Math.sign(position - currentPos) * count, 0, anchors.length - 1)];
    }
  };

  __proto._findAdjacentAnchor = function (posDelta, anchorAtCamera) {
    var _a;

    var flicking = getFlickingAttached(this._flicking, "Control");
    var camera = flicking.camera;
    var adjacentAnchor = (_a = posDelta > 0 ? camera.getNextAnchor(anchorAtCamera) : camera.getPrevAnchor(anchorAtCamera)) !== null && _a !== void 0 ? _a : anchorAtCamera;
    return adjacentAnchor;
  };

  __proto._calcSnapThreshold = function (position, activeAnchor) {
    var isNextDirection = position > activeAnchor.position;
    var panel = activeAnchor.panel;
    var panelSize = panel.size;
    var alignPos = panel.alignPosition; // Minimum distance needed to decide prev/next panel as nearest

    /*
     * |  Prev  |     Next     |
     * |<------>|<------------>|
     * [        |<-Anchor      ]
     */

    return isNextDirection ? panelSize - alignPos + panel.margin.next : alignPos + panel.margin.prev;
  };

  return SnapControl;
}(Control);

/**
 * A {@link Control} that can be scrolled freely without alignment
 * @ko ????????? ????????? ????????? ???????????? ??????, ???????????? ???????????? ??? ?????? ?????? ????????? ???????????? {@link Control}
 */

var FreeControl = function (_super) {
  __extends(FreeControl, _super);
  /** */


  function FreeControl(_a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.stopAtEdge,
        stopAtEdge = _c === void 0 ? true : _c;

    var _this = _super.call(this) || this;

    _this._stopAtEdge = stopAtEdge;
    return _this;
  }

  var __proto = FreeControl.prototype;
  Object.defineProperty(__proto, "stopAtEdge", {
    /**
     * Make scroll animation to stop at the start/end of the scroll area, not going out the bounce area
     * @ko ????????? ?????????????????? ????????? ????????? ????????? ??????????????? ???????????? ??????, ????????? ????????? ???????????? ????????? ?????????
     * @type {boolean}
     * @default true
     */
    get: function () {
      return this._stopAtEdge;
    },
    set: function (val) {
      this._stopAtEdge = val;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Update position after resizing
   * @ko resize ????????? position??? ?????????????????????
   * @param {number} progressInPanel Previous camera's progress in active panel before resize<ko>Resize ?????? ?????? ????????? ?????? ???????????? ????????? progress ???</ko>
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}??? ????????? ???????????? ?????? ??????</ko>
   * @chainable
   * @return {Promise<void>}
   */

  __proto.updatePosition = function (progressInPanel) {
    return __awaiter(this, void 0, void 0, function () {
      var flicking, camera, activePanel, panelRange, newPosition;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            flicking = getFlickingAttached(this._flicking, "Control");
            camera = flicking.camera;
            activePanel = this._activePanel;
            if (!activePanel) return [3
            /*break*/
            , 2];
            panelRange = activePanel.range;
            newPosition = panelRange.min + (panelRange.max - panelRange.min) * progressInPanel;
            return [4
            /*yield*/
            , camera.lookAt(camera.clampToReachablePosition(newPosition))];

          case 1:
            _a.sent();

            _a.label = 2;

          case 2:
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * Move {@link Camera} to the given position
   * @ko {@link Camera}??? ????????? ????????? ???????????????
   * @param {number} position The target position to move<ko>????????? ??????</ko>
   * @param {number} duration Duration of the panel movement animation (unit: ms).<ko>?????? ?????? ??????????????? ?????? ?????? (??????: ms)</ko>
   * @param {object} [axesEvent] {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of {@link https://naver.github.io/egjs-axes/ Axes}
   * <ko>{@link https://naver.github.io/egjs-axes/ Axes}??? {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} ?????????</ko>
   * @fires Flicking#moveStart
   * @fires Flicking#move
   * @fires Flicking#moveEnd
   * @fires Flicking#willChange
   * @fires Flicking#changed
   * @fires Flicking#willRestore
   * @fires Flicking#restored
   * @fires Flicking#needPanel
   * @fires Flicking#visibleChange
   * @fires Flicking#reachEdge
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|????????? ????????? ??????????????????, Camera??? {@link Camera#range range} ?????? ?????? ??????|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}??? ????????? ???????????? ?????? ??????|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|????????? ????????? ?????? ?????????????????? ????????? ??????|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|????????? ???????????? ??? ???????????? `stop()`??? ????????? ??????|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>?????? ?????? ???????????? resolve?????? Promise</ko>
   */


  __proto.moveToPosition = function (position, duration, axesEvent) {
    return __awaiter(this, void 0, void 0, function () {
      var flicking, camera, targetPos, anchorAtPosition, targetPanel;
      return __generator(this, function (_a) {
        flicking = getFlickingAttached(this._flicking, "Control");
        camera = flicking.camera;
        targetPos = camera.clampToReachablePosition(position);
        anchorAtPosition = camera.findAnchorIncludePosition(targetPos);

        if (!anchorAtPosition) {
          return [2
          /*return*/
          , Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(position), CODE.POSITION_NOT_REACHABLE))];
        }

        targetPanel = anchorAtPosition.panel; // Trigger only change event

        if (targetPanel !== this._activePanel) {
          this._triggerIndexChangeEvent(targetPanel, position, axesEvent);
        }

        return [2
        /*return*/
        , this._animateToPosition({
          position: this._stopAtEdge ? targetPos : position,
          duration: duration,
          newActivePanel: targetPanel,
          axesEvent: axesEvent
        })];
      });
    });
  };

  return FreeControl;
}(Control);

/**
 * A {@link Control} that allow you to select the maximum number of panels to move at a time
 * @ko ????????? ????????? ????????? ????????? ????????? ?????? ????????? {@link Control}
 */

var StrictControl = function (_super) {
  __extends(StrictControl, _super);
  /** */


  function StrictControl(_a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.count,
        count = _c === void 0 ? 1 : _c;

    var _this = _super.call(this) || this;

    _this._setActive = function (newActivePanel, prevActivePanel, isTrusted) {
      _super.prototype._setActive.call(_this, newActivePanel, prevActivePanel, isTrusted);

      _this.updateInput();
    };

    _this._count = count;

    _this._resetIndexRange();

    return _this;
  }

  var __proto = StrictControl.prototype;
  Object.defineProperty(__proto, "count", {
    /**
     * Maximum number of panels that can be moved at a time
     * @ko ????????? ????????? ??? ?????? ????????? ??????
     * @type {number}
     * @default 1
     */
    get: function () {
      return this._count;
    },
    set: function (val) {
      this._count = val;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Destroy Control and return to initial state
   * @ko Control??? ?????? ????????? ???????????????
   * @return {void}
   */

  __proto.destroy = function () {
    _super.prototype.destroy.call(this);

    this._resetIndexRange();
  };
  /**
   * Update {@link Control#controller controller}'s state
   * @ko {@link Control#controller controller}??? ?????? ????????? ???????????????
   * @chainable
   * @return {this}
   */


  __proto.updateInput = function () {
    var _a;

    var flicking = getFlickingAttached(this._flicking, "Control");
    var camera = flicking.camera;
    var renderer = flicking.renderer;
    var controller = this._controller;
    var controlParams = camera.controlParams;
    var count = this._count;
    var activePanel = controller.state.animating ? (_a = camera.findNearestAnchor(camera.position)) === null || _a === void 0 ? void 0 : _a.panel : this._activePanel;

    if (!activePanel) {
      controller.update(controlParams);

      this._resetIndexRange();

      return this;
    }

    var cameraRange = controlParams.range;
    var currentPos = activePanel.position;
    var currentIndex = activePanel.index;
    var panelCount = renderer.panelCount;
    var prevPanelIndex = currentIndex - count;
    var nextPanelIndex = currentIndex + count;

    if (prevPanelIndex < 0) {
      prevPanelIndex = flicking.circularEnabled ? getMinusCompensatedIndex((prevPanelIndex + 1) % panelCount - 1, panelCount) : clamp(prevPanelIndex, 0, panelCount - 1);
    }

    if (nextPanelIndex >= panelCount) {
      nextPanelIndex = flicking.circularEnabled ? nextPanelIndex % panelCount : clamp(nextPanelIndex, 0, panelCount - 1);
    }

    var prevPanel = renderer.panels[prevPanelIndex];
    var nextPanel = renderer.panels[nextPanelIndex];
    var prevPos = Math.max(prevPanel.position, cameraRange.min);
    var nextPos = Math.min(nextPanel.position, cameraRange.max);

    if (prevPos > currentPos) {
      prevPos -= camera.rangeDiff;
    }

    if (nextPos < currentPos) {
      nextPos += camera.rangeDiff;
    }

    controlParams.range = {
      min: prevPos,
      max: nextPos
    };

    if (controlParams.circular) {
      if (controlParams.position < prevPos) {
        controlParams.position += camera.rangeDiff;
      }

      if (controlParams.position > nextPos) {
        controlParams.position -= camera.rangeDiff;
      }
    }

    controlParams.circular = false;
    controller.update(controlParams);
    this._indexRange = {
      min: prevPanel.index,
      max: nextPanel.index
    };
    return this;
  };
  /**
   * Move {@link Camera} to the given position
   * @ko {@link Camera}??? ????????? ????????? ???????????????
   * @param {number} position The target position to move<ko>????????? ??????</ko>
   * @param {number} duration Duration of the panel movement animation (unit: ms).<ko>?????? ?????? ??????????????? ?????? ?????? (??????: ms)</ko>
   * @param {object} [axesEvent] {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} event of {@link https://naver.github.io/egjs-axes/ Axes}
   * <ko>{@link https://naver.github.io/egjs-axes/ Axes}??? {@link https://naver.github.io/egjs-axes/release/latest/doc/eg.Axes.html#event:release release} ?????????</ko>
   * @fires Flicking#moveStart
   * @fires Flicking#move
   * @fires Flicking#moveEnd
   * @fires Flicking#willChange
   * @fires Flicking#changed
   * @fires Flicking#willRestore
   * @fires Flicking#restored
   * @fires Flicking#needPanel
   * @fires Flicking#visibleChange
   * @fires Flicking#reachEdge
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|When the given panel is already removed or not in the Camera's {@link Camera#range range}|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|When {@link Control#init init} is not called before|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the animation is interrupted by user input|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE POSITION_NOT_REACHABLE}|????????? ????????? ??????????????????, Camera??? {@link Camera#range range} ?????? ?????? ??????|
   * |{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING}|{@link Control#init init}??? ????????? ???????????? ?????? ??????|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|????????? ????????? ?????? ?????????????????? ????????? ??????|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|????????? ???????????? ??? ???????????? `stop()`??? ????????? ??????|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target position<ko>?????? ?????? ???????????? resolve?????? Promise</ko>
   */


  __proto.moveToPosition = function (position, duration, axesEvent) {
    return __awaiter(this, void 0, void 0, function () {
      var flicking, camera, activePanel, axesRange, indexRange, cameraRange, clampedPosition, anchorAtPosition, prevPos, isOverThreshold, adjacentAnchor, targetPos, targetPanel, anchors, firstAnchor, lastAnchor, shouldBounceToFirst, shouldBounceToLast, targetAnchor;
      return __generator(this, function (_a) {
        flicking = getFlickingAttached(this._flicking, "Control");
        camera = flicking.camera;
        activePanel = this._activePanel;
        axesRange = this._controller.range;
        indexRange = this._indexRange;
        cameraRange = camera.range;
        clampedPosition = clamp(camera.clampToReachablePosition(position), axesRange[0], axesRange[1]);
        anchorAtPosition = camera.findAnchorIncludePosition(clampedPosition);

        if (!anchorAtPosition || !activePanel) {
          return [2
          /*return*/
          , Promise.reject(new FlickingError(MESSAGE.POSITION_NOT_REACHABLE(position), CODE.POSITION_NOT_REACHABLE))];
        }

        prevPos = activePanel.position;
        isOverThreshold = Math.abs(position - prevPos) >= flicking.threshold;
        adjacentAnchor = position > prevPos ? camera.getNextAnchor(anchorAtPosition) : camera.getPrevAnchor(anchorAtPosition);
        anchors = camera.anchorPoints;
        firstAnchor = anchors[0];
        lastAnchor = anchors[anchors.length - 1];
        shouldBounceToFirst = position <= cameraRange.min && isBetween(firstAnchor.panel.index, indexRange.min, indexRange.max);
        shouldBounceToLast = position >= cameraRange.max && isBetween(lastAnchor.panel.index, indexRange.min, indexRange.max);

        if (shouldBounceToFirst || shouldBounceToLast) {
          targetAnchor = position < cameraRange.min ? firstAnchor : lastAnchor;
          targetPanel = targetAnchor.panel;
          targetPos = targetAnchor.position;
        } else if (isOverThreshold && anchorAtPosition.position !== activePanel.position) {
          // Move to anchor at position
          targetPanel = anchorAtPosition.panel;
          targetPos = anchorAtPosition.position;
        } else if (isOverThreshold && adjacentAnchor && isBetween(adjacentAnchor.index, indexRange.min, indexRange.max)) {
          // Move to adjacent anchor
          targetPanel = adjacentAnchor.panel;
          targetPos = adjacentAnchor.position;
        } else {
          // Restore to active panel
          targetPos = camera.clampToReachablePosition(activePanel.position);
          targetPanel = activePanel;
        }

        this._triggerIndexChangeEvent(targetPanel, position, axesEvent);

        return [2
        /*return*/
        , this._animateToPosition({
          position: targetPos,
          duration: duration,
          newActivePanel: targetPanel,
          axesEvent: axesEvent
        })];
      });
    });
  };

  __proto._resetIndexRange = function () {
    this._indexRange = {
      min: 0,
      max: 0
    };
  };

  return StrictControl;
}(Control);

/**
 * A component that manages actual movement inside the viewport
 * @ko ????????? ???????????? ?????? ???????????? ???????????? ????????????
 */

var Camera = function () {
  /** */
  function Camera(_a) {
    var _this = this;

    var _b = _a === void 0 ? {} : _a,
        _c = _b.align,
        align = _c === void 0 ? ALIGN.CENTER : _c;

    this._checkTranslateSupport = function () {
      var e_1, _a;

      var transforms = ["webkitTransform", "msTransform", "MozTransform", "OTransform", "transform"];
      var supportedStyle = document.documentElement.style;
      var transformName = "";

      try {
        for (var transforms_1 = __values(transforms), transforms_1_1 = transforms_1.next(); !transforms_1_1.done; transforms_1_1 = transforms_1.next()) {
          var prefixedTransform = transforms_1_1.value;

          if (prefixedTransform in supportedStyle) {
            transformName = prefixedTransform;
          }
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (transforms_1_1 && !transforms_1_1.done && (_a = transforms_1.return)) _a.call(transforms_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }

      if (!transformName) {
        throw new FlickingError(MESSAGE.TRANSFORM_NOT_SUPPORTED, CODE.TRANSFORM_NOT_SUPPORTED);
      }

      _this._transform = transformName;
    };

    this._flicking = null;

    this._resetInternalValues(); // Options


    this._align = align;
  }

  var __proto = Camera.prototype;
  Object.defineProperty(__proto, "element", {
    // Internal states getter

    /**
     * The camera(`.flicking-camera`) element
     * @ko ?????????(`.flicking-camera`) ????????????
     * @type {HTMLElement}
     * @readonly
     */
    get: function () {
      return this._el;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "position", {
    /**
     * Current position of the camera
     * @ko Camera??? ?????? ??????
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._position;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "alignPosition", {
    /**
     * Align position inside the viewport where {@link Panel}'s {@link Panel#alignPosition alignPosition} should be located at
     * @ko ????????? ?????? ?????? ??????. ????????? ????????? {@link Panel}??? {@link Panel#alignPosition alignPosition}??? ???????????? ?????? ????????????
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._alignPos;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "offset", {
    /**
     * Position offset, used for the {@link Flicking#renderOnlyVisible renderOnlyVisible} option
     * @ko Camera??? ?????? ?????????. {@link Flicking#renderOnlyVisible renderOnlyVisible} ????????? ?????? ???????????????.
     * @type {number}
     * @default 0
     * @readonly
     */
    get: function () {
      return this._offset;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "range", {
    /**
     * A range that Camera's {@link Camera#position position} can reach
     * @ko Camera??? {@link Camera#position position}??? ?????? ????????? ??????
     * @type {object}
     * @property {number} min A minimum position<ko>?????? ??????</ko>
     * @property {number} min A maximum position<ko>?????? ??????</ko>
     * @readonly
     */
    get: function () {
      return this._range;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "rangeDiff", {
    /**
     * A difference between Camera's minimum and maximum position that can reach
     * @ko Camera??? ?????? ????????? ??????/?????? ????????? ??????
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._range.max - this._range.min;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "visiblePanels", {
    /**
     * An array of visible panels from the current position
     * @ko ?????? ????????? ???????????? ??????
     * @type {Panel[]}
     * @readonly
     */
    get: function () {
      return this._visiblePanels;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "visibleRange", {
    /**
     * A range of the visible area from the current position
     * @ko ?????? ???????????? ????????? ??????
     * @type {object}
     * @property {number} min A minimum position<ko>?????? ??????</ko>
     * @property {number} min A maximum position<ko>?????? ??????</ko>
     * @readonly
     */
    get: function () {
      return {
        min: this._position - this._alignPos,
        max: this._position - this._alignPos + this.size
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "anchorPoints", {
    /**
     * An array of {@link AnchorPoint}s that Camera can be stopped at
     * @ko ???????????? ?????? ????????? {@link AnchorPoint}??? ??????
     * @type {AnchorPoint[]}
     * @readonly
     */
    get: function () {
      return this._anchors;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "controlParams", {
    /**
     * A current parameters of the Camera for updating {@link AxesController}
     * @ko {@link AxesController}??? ?????????????????? ?????? ?????? Camera ???????????????
     * @type {ControlParams}
     * @readonly
     */
    get: function () {
      return {
        range: this._range,
        position: this._position,
        circular: false
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "atEdge", {
    /**
     * A Boolean value indicating whether Camera's over the minimum or maximum position reachable
     * @ko ?????? ???????????? ?????? ????????? ????????? ?????? ?????? ???????????? ?????????????????? ???????????????
     * @type {boolean}
     * @readonly
     */
    get: function () {
      return this._position <= this._range.min || this._position >= this._range.max;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "size", {
    /**
     * Return the size of the viewport
     * @ko ????????? ????????? ???????????????
     * @type {number}
     * @readonly
     */
    get: function () {
      var flicking = this._flicking;
      return flicking ? flicking.horizontal ? flicking.viewport.width : flicking.viewport.height : 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "progress", {
    /**
     * Return the camera's position progress from the first panel to last panel
     * Range is from 0 to last panel's index
     * @ko ????????? ??????????????? ????????? ??????????????? ????????? ????????? ???????????? ???????????????
     * ????????? 0?????? ????????? ????????? ????????????????????????
     * @type {number}
     * @readonly
     */
    get: function () {
      var flicking = this._flicking;
      var position = this._position + this._offset;
      var nearestAnchor = this.findNearestAnchor(this._position);

      if (!flicking || !nearestAnchor) {
        return NaN;
      }

      var nearestPanel = nearestAnchor.panel;
      var panelPos = nearestPanel.position + nearestPanel.offset;
      var bounceSize = flicking.control.controller.bounce;
      var _a = this.range,
          prevRange = _a.min,
          nextRange = _a.max;
      var rangeDiff = this.rangeDiff;

      if (position === panelPos) {
        return nearestPanel.index;
      }

      if (position < panelPos) {
        var prevPanel = nearestPanel.prev();
        var prevPosition = prevPanel ? prevPanel.position + prevPanel.offset : prevRange - bounceSize[0]; // Looped

        if (prevPosition > panelPos) {
          prevPosition -= rangeDiff;
        }

        return nearestPanel.index - 1 + getProgress(position, prevPosition, panelPos);
      } else {
        var nextPanel = nearestPanel.next();
        var nextPosition = nextPanel ? nextPanel.position + nextPanel.offset : nextRange + bounceSize[1]; // Looped

        if (nextPosition < panelPos) {
          nextPosition += rangeDiff;
        }

        return nearestPanel.index + getProgress(position, panelPos, nextPosition);
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "align", {
    // Options Getter

    /**
     * A value indicating where the {@link Camera#alignPosition alignPosition} should be located at inside the viewport element
     * @ko {@link Camera#alignPosition alignPosition}??? ????????? ???????????? ?????? ????????? ???????????? ???????????? ???????????? ???
     * @type {ALIGN | string | number}
     */
    get: function () {
      return this._align;
    },
    // Options Setter
    set: function (val) {
      this._align = val;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Initialize Camera
   * @ko Camera??? ??????????????????
   * @param {Flicking} flicking An instance of {@link Flicking}<ko>Flicking??? ????????????</ko>
   * @chainable
   * @throws {FlickingError}
   * {@link ERROR_CODE VAL_MUST_NOT_NULL} If the camera element(`.flicking-camera`) does not exist inside viewport element
   * <ko>{@link ERROR_CODE VAL_MUST_NOT_NULL} ????????? ???????????? ????????? ????????? ????????????(`.flicking-camera`)??? ???????????? ?????? ??????</ko>
   * @return {this}
   */

  __proto.init = function (flicking) {
    this._flicking = flicking;
    var viewportEl = flicking.viewport.element;
    checkExistence(viewportEl.firstElementChild, "First element child of the viewport element");
    this._el = viewportEl.firstElementChild;

    this._checkTranslateSupport();

    return this;
  };
  /**
   * Destroy Camera and return to initial state
   * @ko Camera??? ?????? ????????? ???????????????
   * @return {void}
   */


  __proto.destroy = function () {
    this._flicking = null;

    this._resetInternalValues();

    return this;
  };
  /**
   * Move to the given position and apply CSS transform
   * @ko ?????? ????????? ????????????, CSS transform??? ???????????????
   * @param {number} pos A new position<ko>????????? ??????</ko>
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}??? ????????? ???????????? ?????? ??????</ko>
   * @return {this}
   */


  __proto.lookAt = function (pos) {
    return __awaiter(this, void 0, void 0, function () {
      var prevPos;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            prevPos = this._position;
            this._position = pos;
            return [4
            /*yield*/
            , this._refreshVisiblePanels()];

          case 1:
            _a.sent();

            this._checkNeedPanel();

            this._checkReachEnd(prevPos, pos);

            this._applyTransform();

            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * Return a previous {@link AnchorPoint} of given {@link AnchorPoint}
   * If it does not exist, return `null` instead
   * @ko ????????? {@link AnchorPoint}??? ?????? {@link AnchorPoint}??? ???????????????
   * ???????????? ?????? ?????? `null`??? ???????????????
   * @param {AnchorPoint} anchor A reference {@link AnchorPoint}<ko>?????? {@link AnchorPoint}</ko>
   * @return {AnchorPoint | null} The previous {@link AnchorPoint}<ko>?????? {@link AnchorPoint}</ko>
   */


  __proto.getPrevAnchor = function (anchor) {
    return this._anchors[anchor.index - 1] || null;
  };
  /**
   * Return a next {@link AnchorPoint} of given {@link AnchorPoint}
   * If it does not exist, return `null` instead
   * @ko ????????? {@link AnchorPoint}??? ?????? {@link AnchorPoint}??? ???????????????
   * ???????????? ?????? ?????? `null`??? ???????????????
   * @param {AnchorPoint} anchor A reference {@link AnchorPoint}<ko>?????? {@link AnchorPoint}</ko>
   * @return {AnchorPoint | null} The next {@link AnchorPoint}<ko>?????? {@link AnchorPoint}</ko>
   */


  __proto.getNextAnchor = function (anchor) {
    return this._anchors[anchor.index + 1] || null;
  };
  /**
   * Return the camera's position progress in the panel below
   * Value is from 0 to 1 when the camera's inside panel
   * Value can be lower than 0 or bigger than 1 when it's in the margin area
   * @ko ?????? ????????? ?????? ??????????????? ?????? ???????????? ???????????????
   * ???????????? ???????????? ?????? ????????? ?????? ?????? 0?????? 1????????? ?????? ????????????
   * ????????? margin ????????? ?????? ?????? 0?????? ????????? 1?????? ??? ?????? ????????? ??? ????????????
   */


  __proto.getProgressInPanel = function (panel) {
    var panelRange = panel.range;
    return (this._position - panelRange.min) / (panelRange.max - panelRange.min);
  };
  /**
   * Return {@link AnchorPoint} that includes given position
   * If there's no {@link AnchorPoint} that includes the given position, return `null` instead
   * @ko ????????? ????????? ???????????? {@link AnchorPoint}??? ???????????????
   * ????????? ????????? ???????????? {@link AnchorPoint}??? ?????? ?????? `null`??? ???????????????
   * @param {number} position A position to check<ko>????????? ??????</ko>
   * @return {AnchorPoint | null} The {@link AnchorPoint} that includes the given position<ko>?????? ????????? ???????????? {@link AnchorPoint}</ko>
   */


  __proto.findAnchorIncludePosition = function (position) {
    var anchors = this._anchors;
    var anchorsIncludingPosition = anchors.filter(function (anchor) {
      return anchor.panel.includePosition(position, true);
    });
    return anchorsIncludingPosition.reduce(function (nearest, anchor) {
      if (!nearest) return anchor;
      return Math.abs(nearest.position - position) < Math.abs(anchor.position - position) ? nearest : anchor;
    }, null);
  };
  /**
   * Return {@link AnchorPoint} nearest to given position
   * If there're no {@link AnchorPoint}s, return `null` instead
   * @ko ?????? ???????????? ?????? ????????? {@link AnchorPoint}??? ???????????????
   * {@link AnchorPoint}??? ????????? ?????? ?????? `null`??? ???????????????
   * @param {number} position A position to check<ko>????????? ??????</ko>
   * @return {AnchorPoint | null} The {@link AnchorPoint} nearest to the given position<ko>?????? ????????? ?????? ????????? {@link AnchorPoint}</ko>
   */


  __proto.findNearestAnchor = function (position) {
    var anchors = this._anchors;
    if (anchors.length <= 0) return null;
    var prevDist = Infinity;

    for (var anchorIdx = 0; anchorIdx < anchors.length; anchorIdx++) {
      var anchor = anchors[anchorIdx];
      var dist = Math.abs(anchor.position - position);

      if (dist > prevDist) {
        // Return previous anchor
        return anchors[anchorIdx - 1];
      }

      prevDist = dist;
    } // Return last anchor


    return anchors[anchors.length - 1];
  };
  /**
   * Return {@link AnchorPoint} that matches {@link Flicking#currentPanel}
   * @ko ?????? {@link Flicking#currentPanel}??? ???????????? {@link AnchorPoint}??? ???????????????
   * @return {AnchorPoint | null}
   */


  __proto.findActiveAnchor = function () {
    var flicking = getFlickingAttached(this._flicking, "Camera");
    var activeIndex = flicking.control.activeIndex;
    return find(this._anchors, function (anchor) {
      return anchor.panel.index === activeIndex;
    });
  };
  /**
   * Clamp the given position between camera's range
   * @ko ????????? ????????? Camera??? ?????? ????????? ?????? ????????? ????????? ????????????
   * @param {number} position A position to clamp<ko>????????? ????????? ??????</ko>
   * @return {number} A clamped position<ko>?????? ????????? ??????</ko>
   */


  __proto.clampToReachablePosition = function (position) {
    var range = this._range;
    return clamp(position, range.min, range.max);
  };
  /**
   * Check whether the given panel is inside of the Camera's range
   * @ko ?????? {@link Panel}??? Camera??? ?????? ????????? ?????? ?????? ???????????? ???????????????
   * @param panel An instance of {@link Panel} to check<ko>????????? {@link Panel}??? ????????????</ko>
   * @return {boolean} Whether the panel's inside Camera's range<ko>?????? ????????? ?????? ?????? ?????? ????????? ??????????????? ??????</ko>
   */


  __proto.canReach = function (panel) {
    var range = this._range;
    if (panel.removed) return false;
    var panelPos = panel.position;
    return panelPos >= range.min && panelPos <= range.max;
  };
  /**
   * Check whether the given panel element is visible at the current position
   * @ko ?????? ???????????? ?????? ?????? ??????????????? ??? ??? ????????? ????????? ???????????????
   * @param panel An instance of {@link Panel} to check<ko>????????? {@link Panel}??? ????????????</ko>
   * @return Whether the panel element is visible at the current position<ko>?????? ???????????? ?????? ?????? ??????????????? ???????????? ??????</ko>
   */


  __proto.canSee = function (panel) {
    var visibleRange = this.visibleRange; // Should not include margin, as we don't declare what the margin is visible as what the panel is visible.

    return panel.includeRange(visibleRange.min, visibleRange.max, false);
  };
  /**
   * Update Camera's {@link Camera#alignPosition alignPosition}
   * @ko Camera??? {@link Camera#alignPosition alignPosition}??? ?????????????????????
   * @chainable
   * @return {this}
   */


  __proto.updateAlignPos = function () {
    var align = this._align;
    var alignVal = typeof align === "object" ? align.camera : align;
    this._alignPos = parseAlign$1(alignVal, this.size);
    return this;
  };
  /**
   * Update Camera's {@link Camera#anchorPoints anchorPoints}
   * @ko Camera??? {@link Camera#anchorPoints anchorPoints}??? ?????????????????????
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}??? ????????? ???????????? ?????? ??????</ko>
   * @chainable
   * @return {this}
   */


  __proto.updateAnchors = function () {
    var flicking = getFlickingAttached(this._flicking, "Camera");
    var panels = flicking.renderer.panels;
    this._anchors = panels.map(function (panel, index) {
      return new AnchorPoint({
        index: index,
        position: panel.position,
        panel: panel
      });
    });
    return this;
  };
  /**
   * Update Viewport's height to active panel's height
   * @ko ?????? ????????? ????????? ????????? ??????????????? ???????????? ????????? ?????????????????????
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}??? ????????? ???????????? ?????? ??????</ko>
   * @chainable
   * @return {this}
   */


  __proto.updateAdaptiveHeight = function () {
    var flicking = getFlickingAttached(this._flicking, "Camera");
    var activePanel = flicking.control.activePanel;
    if (!flicking.horizontal || !flicking.adaptive || !activePanel) return;
    flicking.viewport.setSize({
      height: activePanel.height
    });
  };

  __proto.updateOffset = function () {
    var flicking = getFlickingAttached(this._flicking, "Camera");
    var unRenderedPanels = flicking.panels.filter(function (panel) {
      return !panel.rendered;
    });
    var position = this._position;
    this._offset = unRenderedPanels.filter(function (panel) {
      return panel.position + panel.offset < position;
    }).reduce(function (offset, panel) {
      return offset + panel.sizeIncludingMargin;
    }, 0);

    this._applyTransform();
  };
  /**
   * Reset the history of {@link Flicking#event:needPanel needPanel} events so it can be triggered again
   * @ko ????????? {@link Flicking#event:needPanel needPanel} ??????????????? ??????????????? ?????? ????????? ??? ????????? ?????????
   * @chainable
   * @return {this}
   */


  __proto.resetNeedPanelHistory = function () {
    this._needPanelTriggered = {
      prev: false,
      next: false
    };
    return this;
  };

  __proto._resetInternalValues = function () {
    this._position = 0;
    this._alignPos = 0;
    this._offset = 0;
    this._range = {
      min: 0,
      max: 0
    };
    this._visiblePanels = [];
    this._anchors = [];
    this._needPanelTriggered = {
      prev: false,
      next: false
    };
  };

  __proto._refreshVisiblePanels = function () {
    return __awaiter(this, void 0, void 0, function () {
      var flicking, panels, newVisiblePanels, prevVisiblePanels, added, removed;

      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            flicking = getFlickingAttached(this._flicking, "Camera");
            panels = flicking.renderer.panels;
            newVisiblePanels = panels.filter(function (panel) {
              return _this.canSee(panel);
            });
            prevVisiblePanels = this._visiblePanels;
            this._visiblePanels = newVisiblePanels;
            added = newVisiblePanels.filter(function (panel) {
              return !includes(prevVisiblePanels, panel);
            });
            removed = prevVisiblePanels.filter(function (panel) {
              return !includes(newVisiblePanels, panel);
            });
            if (!(added.length > 0 || removed.length > 0)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , flicking.renderer.render()];

          case 1:
            _a.sent();

            flicking.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.VISIBLE_CHANGE, {
              added: added,
              removed: removed,
              visiblePanels: newVisiblePanels
            }));
            _a.label = 2;

          case 2:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  __proto._checkNeedPanel = function () {
    var needPanelTriggered = this._needPanelTriggered;
    if (needPanelTriggered.prev && needPanelTriggered.next) return;
    var flicking = getFlickingAttached(this._flicking, "Camera");
    var panels = flicking.renderer.panels;

    if (panels.length <= 0) {
      if (!needPanelTriggered.prev) {
        flicking.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.NEED_PANEL, {
          direction: DIRECTION.PREV
        }));
        needPanelTriggered.prev = true;
      }

      if (!needPanelTriggered.next) {
        flicking.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.NEED_PANEL, {
          direction: DIRECTION.NEXT
        }));
        needPanelTriggered.next = true;
      }

      return;
    }

    var cameraPosition = this._position;
    var cameraSize = this.size;
    var cameraRange = this._range;
    var needPanelThreshold = flicking.needPanelThreshold;
    var cameraPrev = cameraPosition - this._alignPos;
    var cameraNext = cameraPrev + cameraSize;
    var firstPanel = panels[0];
    var lastPanel = panels[panels.length - 1];

    if (!needPanelTriggered.prev) {
      var firstPanelPrev = firstPanel.range.min;

      if (cameraPrev <= firstPanelPrev + needPanelThreshold || cameraPosition <= cameraRange.min + needPanelThreshold) {
        flicking.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.NEED_PANEL, {
          direction: DIRECTION.PREV
        }));
        needPanelTriggered.prev = true;
      }
    }

    if (!needPanelTriggered.next) {
      var lastPanelNext = lastPanel.range.max;

      if (cameraNext >= lastPanelNext - needPanelThreshold || cameraPosition >= cameraRange.max - needPanelThreshold) {
        flicking.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.NEED_PANEL, {
          direction: DIRECTION.NEXT
        }));
        needPanelTriggered.next = true;
      }
    }
  };

  __proto._checkReachEnd = function (prevPos, newPos) {
    var flicking = getFlickingAttached(this._flicking, "Camera");
    var range = this._range;
    var wasBetweenRange = prevPos > range.min && prevPos < range.max;
    var isBetweenRange = newPos > range.min && newPos < range.max;
    if (!wasBetweenRange || isBetweenRange) return;
    var direction = newPos <= range.min ? DIRECTION.PREV : DIRECTION.NEXT;
    flicking.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.REACH_EDGE, {
      direction: direction
    }));
  };

  __proto._applyTransform = function () {
    var el = this._el;
    var flicking = getFlickingAttached(this._flicking, "Camera");
    var actualPosition = this._position - this._alignPos - this._offset;
    el.style[this._transform] = flicking.horizontal ? "translate(" + -actualPosition + "px)" : "translate(0, " + -actualPosition + "px)";
  };

  return Camera;
}();

/**
 * A {@link Camera} that can move from the position of the first panel to the position of the last panel
 * @ko ????????? ????????? ??????????????? ????????? ????????? ??????????????? ????????? ??? ?????? ????????? {@link Camera}
 */

var LinearCamera = function (_super) {
  __extends(LinearCamera, _super);

  function LinearCamera() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Update {@link Camera#range range} of Camera
   * @ko Camera??? {@link Camera#range range}??? ?????????????????????
   * @chainable
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}??? ????????? ???????????? ?????? ??????</ko>
   * @return {this}
   */


  var __proto = LinearCamera.prototype;

  __proto.updateRange = function () {
    var _a, _b;

    var flicking = getFlickingAttached(this._flicking, "Camera");
    var renderer = flicking.renderer;
    var firstPanel = renderer.getPanel(0);
    var lastPanel = renderer.getPanel(renderer.panelCount - 1);
    this._range = {
      min: (_a = firstPanel === null || firstPanel === void 0 ? void 0 : firstPanel.position) !== null && _a !== void 0 ? _a : 0,
      max: (_b = lastPanel === null || lastPanel === void 0 ? void 0 : lastPanel.position) !== null && _b !== void 0 ? _b : 0
    };
    return this;
  };

  return LinearCamera;
}(Camera);

/**
 * A {@link Camera} that connects the last panel and the first panel, enabling continuous loop
 * @ko ????????? ????????? ????????? ????????? ????????? ?????????, ????????? ????????? ??? ?????? ????????? {@link Camera}
 */

var CircularCamera = function (_super) {
  __extends(CircularCamera, _super);

  function CircularCamera() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this._circularOffset = 0;
    _this._circularEnabled = false;
    return _this;
  }

  var __proto = CircularCamera.prototype;
  Object.defineProperty(__proto, "offset", {
    get: function () {
      return this._offset - this._circularOffset;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "controlParams", {
    get: function () {
      return {
        range: this._range,
        position: this._position,
        circular: this._circularEnabled
      };
    },
    enumerable: false,
    configurable: true
  });

  __proto.getPrevAnchor = function (anchor) {
    if (!this._circularEnabled || anchor.index !== 0) return _super.prototype.getPrevAnchor.call(this, anchor);
    var anchors = this._anchors;
    var rangeDiff = this.rangeDiff;
    var lastAnchor = anchors[anchors.length - 1];
    return new AnchorPoint({
      index: lastAnchor.index,
      position: lastAnchor.position - rangeDiff,
      panel: lastAnchor.panel
    });
  };

  __proto.getNextAnchor = function (anchor) {
    var anchors = this._anchors;
    if (!this._circularEnabled || anchor.index !== anchors.length - 1) return _super.prototype.getNextAnchor.call(this, anchor);
    var rangeDiff = this.rangeDiff;
    var firstAnchor = anchors[0];
    return new AnchorPoint({
      index: firstAnchor.index,
      position: firstAnchor.position + rangeDiff,
      panel: firstAnchor.panel
    });
  };

  __proto.findAnchorIncludePosition = function (position) {
    if (!this._circularEnabled) return _super.prototype.findAnchorIncludePosition.call(this, position);
    var range = this._range;
    var positionInRange = circulatePosition(position, range.min, range.max);

    var anchorInRange = _super.prototype.findAnchorIncludePosition.call(this, positionInRange);

    if (!anchorInRange) return null;
    var rangeDiff = this.rangeDiff;

    if (position < range.min) {
      var loopCount = -Math.floor((range.min - position) / rangeDiff) - 1;
      return new AnchorPoint({
        index: anchorInRange.index,
        position: anchorInRange.position + rangeDiff * loopCount,
        panel: anchorInRange.panel
      });
    } else if (position > range.max) {
      var loopCount = Math.floor((position - range.max) / rangeDiff) + 1;
      return new AnchorPoint({
        index: anchorInRange.index,
        position: anchorInRange.position + rangeDiff * loopCount,
        panel: anchorInRange.panel
      });
    }

    return anchorInRange;
  };

  __proto.clampToReachablePosition = function (position) {
    // Basically all position is reachable for circular camera
    return this._circularEnabled ? position : _super.prototype.clampToReachablePosition.call(this, position);
  };

  __proto.canReach = function (panel) {
    if (panel.removed) return false;
    return this._circularEnabled // Always reachable on circular mode
    ? true : _super.prototype.canReach.call(this, panel);
  };

  __proto.canSee = function (panel) {
    var range = this._range;
    var rangeDiff = this.rangeDiff;
    var visibleRange = this.visibleRange;

    var visibleInCurrentRange = _super.prototype.canSee.call(this, panel);

    if (!this._circularEnabled) {
      return visibleInCurrentRange;
    } // Check looped visible area for circular case


    if (visibleRange.min < range.min) {
      return visibleInCurrentRange || panel.includeRange(visibleRange.min + rangeDiff, visibleRange.max + rangeDiff, false);
    } else if (visibleRange.max > range.max) {
      return visibleInCurrentRange || panel.includeRange(visibleRange.min - rangeDiff, visibleRange.max - rangeDiff, false);
    }

    return visibleInCurrentRange;
  };
  /**
   * Update {@link Camera#range range} of Camera
   * @ko Camera??? {@link Camera#range range}??? ?????????????????????
   * @chainable
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}??? ????????? ???????????? ?????? ??????</ko>
   * @return {this}
   */


  __proto.updateRange = function () {
    var flicking = getFlickingAttached(this._flicking, "Camera");
    var renderer = flicking.renderer;
    var panels = renderer.panels;

    if (panels.length <= 0) {
      this._resetInternalValues();

      return this;
    }

    var firstPanel = panels[0];
    var lastPanel = panels[panels.length - 1];
    var firstPanelPrev = firstPanel.range.min - firstPanel.margin.prev;
    var lastPanelNext = lastPanel.range.max + lastPanel.margin.next;
    var visibleSize = this.size;
    var panelSizeSum = lastPanelNext - firstPanelPrev;
    var canSetCircularMode = panels.every(function (panel) {
      return panelSizeSum - panel.size >= visibleSize;
    });
    this._circularEnabled = canSetCircularMode;

    if (canSetCircularMode) {
      this._range = {
        min: firstPanelPrev,
        max: lastPanelNext
      };
      panels.forEach(function (panel) {
        return panel.updateCircularToggleDirection();
      });
    } else {
      this._range = {
        min: firstPanel.position,
        max: lastPanel.position
      };
    }

    this._updateCircularOffset();

    return this;
  };

  __proto.lookAt = function (pos) {
    return __awaiter(this, void 0, void 0, function () {
      var flicking, prevPos, panels, toggled;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            flicking = getFlickingAttached(this._flicking, "Camera");
            prevPos = this._position;
            if (!(pos === prevPos)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , _super.prototype.lookAt.call(this, pos)];

          case 1:
            return [2
            /*return*/
            , _a.sent()];

          case 2:
            panels = flicking.renderer.panels;
            toggled = panels.map(function (panel) {
              return panel.toggle(prevPos, pos);
            });
            this._position = pos;
            if (!toggled.some(function (isToggled) {
              return isToggled;
            })) return [3
            /*break*/
            , 4];

            this._updateCircularOffset();

            return [4
            /*yield*/
            , flicking.renderer.render()];

          case 3:
            _a.sent();

            _a.label = 4;

          case 4:
            return [4
            /*yield*/
            , _super.prototype.lookAt.call(this, pos)];

          case 5:
            return [2
            /*return*/
            , _a.sent()];
        }
      });
    });
  };

  __proto._applyTransform = function () {
    var el = this._el;
    var flicking = getFlickingAttached(this._flicking, "Camera");
    var actualPosition = this._position - this._alignPos - this._offset + this._circularOffset;
    el.style[this._transform] = flicking.horizontal ? "translate(" + -actualPosition + "px)" : "translate(0, " + -actualPosition + "px)";
  };

  __proto._resetInternalValues = function () {
    _super.prototype._resetInternalValues.call(this);

    this._circularOffset = 0;
    this._circularEnabled = false;
  };

  __proto._calcPanelAreaSum = function (panels) {
    return panels.reduce(function (sum, panel) {
      return sum + panel.sizeIncludingMargin;
    }, 0);
  };

  __proto._updateCircularOffset = function () {
    if (!this._circularEnabled) {
      this._circularOffset = 0;
      return;
    }

    var flicking = getFlickingAttached(this._flicking, "Camera");
    var toggledPrev = [];
    var toggledNext = [];
    flicking.panels.filter(function (panel) {
      return panel.toggled;
    }).forEach(function (panel) {
      if (panel.toggleDirection === DIRECTION.PREV) {
        toggledPrev.push(panel);
      } else {
        toggledNext.push(panel);
      }
    });
    this._circularOffset = this._calcPanelAreaSum(toggledPrev) - this._calcPanelAreaSum(toggledNext);
  };

  return CircularCamera;
}(Camera);

/**
 * A {@link Camera} that set range not to go out of the first/last panel, so it won't show empty spaces before/after the first/last panel
 * @ko ???????????? ????????? ?????? ????????? ???????????? ???????????? ????????? ????????????, ?????????/????????? ?????? ???/?????? ??? ????????? ????????? ????????? ?????? ????????? {@link Camera}
 */

var BoundCamera = function (_super) {
  __extends(BoundCamera, _super);

  function BoundCamera() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Update {@link Camera#range range} of Camera
   * @ko Camera??? {@link Camera#range range}??? ?????????????????????
   * @chainable
   * @throws {FlickingError}
   * {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before
   * <ko>{@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} {@link Camera#init init}??? ????????? ???????????? ?????? ??????</ko>
   * @return {this}
   */


  var __proto = BoundCamera.prototype;

  __proto.updateRange = function () {
    var flicking = getFlickingAttached(this._flicking, "Camera");
    var renderer = flicking.renderer;
    var alignPos = this._alignPos;
    var firstPanel = renderer.getPanel(0);
    var lastPanel = renderer.getPanel(renderer.panelCount - 1);

    if (!firstPanel || !lastPanel) {
      this._range = {
        min: 0,
        max: 0
      };
      return this;
    }

    var viewportSize = this.size;
    var firstPanelPrev = firstPanel.range.min;
    var lastPanelNext = lastPanel.range.max;
    var panelAreaSize = lastPanelNext - firstPanelPrev;
    var isBiggerThanViewport = viewportSize < panelAreaSize;
    var firstPos = firstPanelPrev + alignPos;
    var lastPos = lastPanelNext - viewportSize + alignPos;

    if (isBiggerThanViewport) {
      this._range = {
        min: firstPos,
        max: lastPos
      };
    } else {
      var align = this._align;
      var alignVal = typeof align === "object" ? align.camera : align;
      var pos = firstPos + parseAlign$1(alignVal, lastPos - firstPos);
      this._range = {
        min: pos,
        max: pos
      };
    }

    return this;
  };

  __proto.updateAnchors = function () {
    var _this = this;

    var flicking = getFlickingAttached(this._flicking, "Camera");
    var panels = flicking.renderer.panels;

    if (panels.length <= 0) {
      this._anchors = [];
      return this;
    }

    var range = this._range;
    var reachablePanels = panels.filter(function (panel) {
      return _this.canReach(panel);
    });

    if (reachablePanels.length > 0) {
      var shouldPrependBoundAnchor = reachablePanels[0].position !== range.min;
      var shouldAppendBoundAnchor = reachablePanels[reachablePanels.length - 1].position !== range.max;
      var indexOffset_1 = shouldPrependBoundAnchor ? 1 : 0;
      var newAnchors = reachablePanels.map(function (panel, idx) {
        return new AnchorPoint({
          index: idx + indexOffset_1,
          position: panel.position,
          panel: panel
        });
      });

      if (shouldPrependBoundAnchor) {
        newAnchors.splice(0, 0, new AnchorPoint({
          index: 0,
          position: range.min,
          panel: panels[reachablePanels[0].index - 1]
        }));
      }

      if (shouldAppendBoundAnchor) {
        newAnchors.push(new AnchorPoint({
          index: newAnchors.length,
          position: range.max,
          panel: panels[reachablePanels[reachablePanels.length - 1].index + 1]
        }));
      }

      this._anchors = newAnchors;
    } else if (range.min !== range.max) {
      // There're more than 2 panels
      var nearestPanelAtMin = this._findNearestPanel(range.min, panels);

      var panelAtMin = nearestPanelAtMin.index === panels.length - 1 ? nearestPanelAtMin.prev() : nearestPanelAtMin;
      var panelAtMax = panelAtMin.next();
      this._anchors = [new AnchorPoint({
        index: 0,
        position: range.min,
        panel: panelAtMin
      }), new AnchorPoint({
        index: 1,
        position: range.max,
        panel: panelAtMax
      })];
    } else {
      this._anchors = [new AnchorPoint({
        index: 0,
        position: range.min,
        panel: this._findNearestPanel(range.min, panels)
      })];
    }

    return this;
  };

  __proto.findAnchorIncludePosition = function (position) {
    var range = this._range;
    var anchors = this._anchors;
    if (anchors.length <= 0) return null;

    if (position <= range.min) {
      return anchors[0];
    } else if (position >= range.max) {
      return anchors[anchors.length - 1];
    } else {
      return _super.prototype.findAnchorIncludePosition.call(this, position);
    }
  };

  __proto._findNearestPanel = function (pos, panels) {
    var prevDist = Infinity;

    for (var panelIdx = 0; panelIdx < panels.length; panelIdx++) {
      var panel = panels[panelIdx];
      var dist = Math.abs(panel.position - pos);

      if (dist > prevDist) {
        // Return previous anchor
        return panels[panelIdx - 1];
      }

      prevDist = dist;
    } // Return last anchor


    return panels[panels.length - 1];
  };

  return BoundCamera;
}(Camera);

/**
 * A component that manages {@link Panel} and its elements
 * @ko {@link Panel}??? ??? ?????????????????? ???????????? ????????????
 */

var Renderer = function () {
  /**
   * @param {object} options An options object<ko>?????? ????????????</ko>
   * @param {Constants.ALIGN | string | number} [options.align] An {@link Flicking#align align} value that will be applied to all panels<ko>?????? ????????? ????????? {@link Flicking#align align} ???</ko>
   */
  function Renderer(_a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.align,
        align = _c === void 0 ? ALIGN.CENTER : _c;

    this._flicking = null;
    this._panels = []; // Bind options

    this._align = align;
  }

  var __proto = Renderer.prototype;
  Object.defineProperty(__proto, "panels", {
    // Internal states Getter

    /**
     * Array of panels
     * @ko ?????? ???????????? ??????
     * @type {Panel[]}
     * @readonly
     * @see Panel
     */
    get: function () {
      return this._panels;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "panelCount", {
    /**
     * Count of panels
     * @ko ?????? ????????? ??????
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._panels.length;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "align", {
    // Options Getter

    /**
     * A {@link Panel}'s {@link Panel#align align} value that applied to all panels
     * @ko {@link Panel}??? ??????????????? ????????? {@link Panel#align align} ???
     * @type {Constants.ALIGN | string | number}
     */
    get: function () {
      return this._align;
    },
    // Options Setter
    set: function (val) {
      this._align = val;

      var panelAlign = this._getPanelAlign();

      this._panels.forEach(function (panel) {
        panel.align = panelAlign;
      });
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Initialize Renderer
   * @ko Renderer??? ??????????????????
   * @param {Flicking} flicking An instance of {@link Flicking}<ko>Flicking??? ????????????</ko>
   * @chainable
   * @return {this}
   */

  __proto.init = function (flicking) {
    this._flicking = flicking;

    this._collectPanels();

    return this;
  };
  /**
   * Destroy Renderer and return to initial state
   * @ko Renderer??? ?????? ????????? ???????????????
   * @return {void}
   */


  __proto.destroy = function () {
    this._flicking = null;
    this._panels = [];
  };
  /**
   * Return the {@link Panel} at the given index. `null` if it doesn't exists.
   * @ko ????????? ???????????? ???????????? {@link Panel}??? ???????????????. ????????? ???????????? ???????????? ????????? ???????????? ?????? ?????? `null`??? ???????????????.
   * @return {Panel | null} Panel at the given index<ko>????????? ???????????? ???????????? ??????</ko>
   * @see Panel
   */


  __proto.getPanel = function (index) {
    return this._panels[index] || null;
  };
  /**
   * Update all panel sizes
   * @ko ?????? ????????? ????????? ?????????????????????
   * @chainable
   * @return {this}
   */


  __proto.updatePanelSize = function () {
    var flicking = getFlickingAttached(this._flicking, "Renderer");

    if (flicking.panelsPerView > 0) {
      this._updatePanelSizeByGrid(flicking);
    } else {
      flicking.panels.forEach(function (panel) {
        return panel.resize();
      });
    }

    return this;
  };
  /**
   * Insert new panels at given index
   * This will increase index of panels after by the number of panels added
   * @ko ????????? ???????????? ????????? ???????????? ???????????????
   * ?????? ??????????????? ????????? ??? ???????????? ?????? ?????? ???????????? ????????? ????????? ???????????? ???????????? ???????????????.
   * @param {number} index Index to insert new panels at<ko>?????? ???????????? ????????? ?????????</ko>
   * @param {any[]} elements An array of element or framework component with element in it<ko>??????????????? ?????? ?????? ????????????????????? ??????????????? ????????? ?????????????????? ??????</ko>
   * @return {Panel[]} An array of prepended panels<ko>????????? ???????????? ??????</ko>
   */


  __proto.batchInsert = function () {
    var _this = this;

    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    var panels = this._panels;
    var flicking = getFlickingAttached(this._flicking, "Renderer");
    var control = flicking.control;

    var align = this._getPanelAlign();

    var allPanelsInserted = items.reduce(function (addedPanels, item) {
      var _a;

      var insertingIdx = getMinusCompensatedIndex(item.index, panels.length);
      var panelsPushed = panels.slice(insertingIdx);
      var panelsInserted = item.elements.map(function (el) {
        return _this._createPanel(el, {
          index: insertingIdx,
          align: align,
          flicking: flicking
        });
      });
      panels.splice.apply(panels, __spreadArray([insertingIdx, 0], __read(panelsInserted))); // Resize the newly added panels

      panelsInserted.forEach(function (panel) {
        return panel.resize();
      });

      var insertedSize = _this._getPanelSizeSum(panelsInserted); // Update panel indexes & positions


      panelsPushed.forEach(function (panel) {
        panel.increaseIndex(panelsInserted.length);
        panel.increasePosition(insertedSize);
      }); // Insert the actual elements as camera element's children

      _this._insertPanelElements(panelsInserted, (_a = panelsPushed[0]) !== null && _a !== void 0 ? _a : null);

      return __spreadArray(__spreadArray([], __read(addedPanels)), __read(panelsInserted));
    }, []);
    if (allPanelsInserted.length <= 0) return []; // Update camera & control

    this._updateCameraAndControl();

    void this.render(); // Move to the first panel added if no panels existed
    // FIXME: fix for animating case

    if (allPanelsInserted.length > 0 && !control.animating) {
      void control.moveToPanel(control.activePanel || allPanelsInserted[0], {
        duration: 0
      }).catch(function () {
        return void 0;
      });
    }

    flicking.camera.updateOffset();
    flicking.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.PANEL_CHANGE, {
      added: allPanelsInserted,
      removed: []
    }));
    return allPanelsInserted;
  };
  /**
   * Remove the panel at the given index
   * This will decrease index of panels after by the number of panels removed
   * @ko ????????? ???????????? ????????? ???????????????
   * ?????? ??????????????? ??? ???????????? ?????? ?????? ???????????? ????????? ????????? ???????????? ???????????? ???????????????
   * @param {number} index Index of panel to remove<ko>????????? ????????? ?????????</ko>
   * @param {number} [deleteCount=1] Number of panels to remove from index<ko>`index` ????????? ????????? ????????? ??????</ko>
   * @return An array of removed panels<ko>????????? ???????????? ??????</ko>
   */


  __proto.batchRemove = function () {
    var _this = this;

    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    var panels = this._panels;
    var flicking = getFlickingAttached(this._flicking, "Renderer");
    var camera = flicking.camera,
        control = flicking.control;
    var activePanel = control.activePanel;
    var activeIndex = control.activeIndex;
    var allPanelsRemoved = items.reduce(function (removed, item) {
      var index = item.index,
          deleteCount = item.deleteCount;
      var removingIdx = getMinusCompensatedIndex(index, panels.length);
      var panelsPulled = panels.slice(removingIdx + deleteCount);
      var panelsRemoved = panels.splice(removingIdx, deleteCount);
      if (panelsRemoved.length <= 0) return []; // Update panel indexes & positions

      var removedSize = _this._getPanelSizeSum(panelsRemoved);

      panelsPulled.forEach(function (panel) {
        panel.decreaseIndex(panelsRemoved.length);
        panel.decreasePosition(removedSize);
      });

      _this._removePanelElements(panelsRemoved); // Remove panel elements


      panelsRemoved.forEach(function (panel) {
        return panel.destroy();
      }); // Update camera & control

      _this._updateCameraAndControl();

      if (includes(panelsRemoved, activePanel)) {
        control.resetActive();
      }

      return __spreadArray(__spreadArray([], __read(removed)), __read(panelsRemoved));
    }, []);
    void this.render(); // FIXME: fix for animating case

    if (allPanelsRemoved.length > 0 && !control.animating) {
      var targetPanel = includes(allPanelsRemoved, activePanel) ? panels[activeIndex] || panels[panels.length - 1] : activePanel;

      if (targetPanel) {
        void control.moveToPanel(targetPanel, {
          duration: 0
        }).catch(function () {
          return void 0;
        });
      } else {
        // All panels removed
        void camera.lookAt(0);
      }
    }

    flicking.camera.updateOffset();
    flicking.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.PANEL_CHANGE, {
      added: [],
      removed: allPanelsRemoved
    }));
    return allPanelsRemoved;
  };

  __proto._getPanelAlign = function () {
    var align = this._align;
    return typeof align === "object" ? align.panel : align;
  };

  __proto._getPanelSizeSum = function (panels) {
    var firstPanel = panels[0];
    var lastPanel = panels[panels.length - 1];
    var marginDiff = lastPanel.margin.next - firstPanel.margin.prev;
    return lastPanel.range.max - firstPanel.range.min + marginDiff;
  };

  __proto._updateCameraAndControl = function () {
    var flicking = getFlickingAttached(this._flicking, "Renderer");
    var camera = flicking.camera,
        control = flicking.control;
    camera.updateRange();
    camera.updateAnchors();
    camera.resetNeedPanelHistory();
    control.updateInput();
  };

  __proto._updateRenderingPanels = function () {
    var flicking = getFlickingAttached(this._flicking, "Renderer");

    if (flicking.renderOnlyVisible) {
      this._showOnlyVisiblePanels(flicking);
    } else {
      flicking.panels.forEach(function (panel) {
        return panel.markForShow();
      });
    }
  };

  __proto._showOnlyVisiblePanels = function (flicking) {
    var panels = flicking.renderer.panels;
    var camera = flicking.camera;
    var visibleIndexes = camera.visiblePanels.reduce(function (visibles, panel) {
      visibles[panel.index] = true;
      return visibles;
    }, {});
    panels.forEach(function (panel) {
      if (panel.index in visibleIndexes) {
        panel.markForShow();
      } else if (!flicking.holding) {
        // During the input sequence,
        // Do not remove panel elements as it won't trigger touchend event.
        panel.markForHide();
      }
    });
    camera.updateOffset();
  };

  __proto._updatePanelSizeByGrid = function (flicking) {
    var panels = flicking.panels;
    var panelsPerView = flicking.panelsPerView;

    if (panelsPerView <= 0) {
      throw new FlickingError(MESSAGE.WRONG_OPTION("panelsPerView", panelsPerView), CODE.WRONG_OPTION);
    }

    if (panels.length <= 0) return; // resize only the first panel

    var firstPanel = panels[0];
    firstPanel.resize();
    var viewportSize = flicking.camera.size;
    var gap = firstPanel.margin.prev + firstPanel.margin.next;
    var panelSize = (viewportSize - gap * (panelsPerView - 1)) / panelsPerView;
    var panelSizeObj = flicking.horizontal ? {
      width: panelSize
    } : {
      height: panelSize
    };
    var firstPanelSizeObj = {
      size: panelSize,
      height: firstPanel.height,
      margin: firstPanel.margin
    };

    if (!flicking.noPanelStyleOverride) {
      flicking.panels.forEach(function (panel) {
        return panel.setSize(panelSizeObj);
      });
    }

    flicking.panels.forEach(function (panel) {
      return panel.resize(firstPanelSizeObj);
    });
  };

  return Renderer;
}();

var Panel = function () {
  /**
   * @param {object} options An options object<ko>?????? ????????????</ko>
   * @param {number} [options.index] An initial index of the panel<ko>????????? ?????? ?????????</ko>
   * @param {Constants.ALIGN | string | number} [options.align] An initial {@link Flicking#align align} value of the panel<ko>????????? ?????? {@link Flicking#align align}???</ko>
   * @param {Flicking} [options.flicking] A Flicking instance panel's referencing<ko>????????? ???????????? {@link Flicking} ????????????</ko>
   */
  function Panel(_a) {
    var index = _a.index,
        align = _a.align,
        flicking = _a.flicking;
    this._index = index;
    this._flicking = flicking;
    this._align = align;
    this._removed = false;

    this._resetInternalStates();
  }

  var __proto = Panel.prototype;
  Object.defineProperty(__proto, "index", {
    /**
     * Index of the panel
     * @ko ????????? ?????????
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._index;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "position", {
    /**
     * Position of the panel, including {@link Panel#alignPosition alignPosition}
     * @ko ????????? ?????? ??????, {@link Panel#alignPosition alignPosition}??? ???????????? ????????????
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._pos + this._alignPos;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "size", {
    /**
     * Cached size of the panel element
     * This is equal to {@link Panel#element element}'s `offsetWidth` if {@link Flicking#horizontal horizontal} is `true`, and `offsetHeight` else
     * @ko ?????? ??????????????? ????????? ??????
     * ??? ?????? {@link Flicking#horizontal horizontal}??? `true`??? ?????? {@link Panel#element element}??? `offsetWidth`??? ????????????, `false`??? ?????? `offsetHeight`??? ???????????????
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._size;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "sizeIncludingMargin", {
    /**
     * Panel's size including CSS `margin`
     * This value includes {@link Panel#element element}'s margin left/right if {@link Flicking#horizontal horizontal} is `true`, and margin top/bottom else
     * @ko CSS `margin`??? ????????? ????????? ??????
     * ??? ?????? {@link Flicking#horizontal horizontal}??? `true`??? ?????? margin left/right??? ????????????, `false`??? ?????? margin top/bottom??? ???????????????
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._size + this._margin.prev + this._margin.next;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "height", {
    /**
     * Height of the panel element
     * @ko ?????? ??????????????? ??????
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._height;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "margin", {
    /**
     * Cached CSS `margin` value of the panel element
     * @ko ?????? ??????????????? CSS `margin` ???
     * @type {object}
     * @property {number} prev CSS `margin-left` when the {@link Flicking#horizontal horizontal} is `true`, and `margin-top` else
     * <ko>{@link Flicking#horizontal horizontal}??? `true`??? ?????? `margin-left`, `false`??? ?????? `margin-top`??? ???????????? ???</ko>
     * @property {number} next CSS `margin-right` when the {@link Flicking#horizontal horizontal} is `true`, and `margin-bottom` else
     * <ko>{@link Flicking#horizontal horizontal}??? `true`??? ?????? `margin-right`, `false`??? ?????? `margin-bottom`??? ???????????? ???</ko>
     * @readonly
     */
    get: function () {
      return this._margin;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "alignPosition", {
    /**
     * Align position inside the panel where {@link Camera}'s {@link Camera#alignPosition alignPosition} inside viewport should be located at
     * @ko ????????? ?????? ?????? ??????. {@link Camera}??? ????????? ???????????? {@link Camera#alignPosition alignPosition}??? ???????????? ?????? ????????????
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._alignPos;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "removed", {
    /**
     * A value indicating whether the panel's {@link Flicking#remove remove}d
     * @ko ????????? {@link Flicking#remove remove}???????????? ????????? ???????????? ???
     * @type {boolean}
     * @readonly
     */
    get: function () {
      return this._removed;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "range", {
    /**
     * Panel element's range of the bounding box
     * @ko ?????? ??????????????? Bounding box ??????
     * @type {object}
     * @property {number} [min] Bounding box's left({@link Flicking#horizontal horizontal}: true) / top({@link Flicking#horizontal horizontal}: false)
     * @property {number} [max] Bounding box's right({@link Flicking#horizontal horizontal}: true) / bottom({@link Flicking#horizontal horizontal}: false)
     * @readonly
     */
    get: function () {
      return {
        min: this._pos,
        max: this._pos + this._size
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "toggled", {
    /**
     * A value indicating whether the panel's position is toggled by circular behavior
     * @ko ????????? ????????? circular ????????? ?????? ?????????????????? ????????? ???????????? ???
     * @type {boolean}
     * @readonly
     */
    get: function () {
      return this._toggled;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "toggleDirection", {
    /**
     * A direction where the panel's position is toggled
     * @ko ????????? ????????? circular ????????? ?????? ???????????? ??????
     * @type {DIRECTION}
     * @readonly
     */
    get: function () {
      return this._toggleDirection;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "offset", {
    /**
     * Actual position offset determined by {@link Panel#order}
     * @ko {@link Panel#order}??? ?????? ?????? ?????? ?????????
     * @type {number}
     * @readonly
     */
    get: function () {
      var toggleDirection = this._toggleDirection;
      var cameraRangeDiff = this._flicking.camera.rangeDiff;
      return toggleDirection === DIRECTION.NONE || !this._toggled ? 0 : toggleDirection === DIRECTION.PREV ? -cameraRangeDiff : cameraRangeDiff;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "progress", {
    /**
     * Progress of movement between previous or next panel relative to current panel
     * @ko ??? ??????????????? ??????/?????? ??????????????? ?????? ?????????
     * @type {number}
     * @readonly
     */
    get: function () {
      var flicking = this._flicking;
      return this.index - flicking.camera.progress;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "outsetProgress", {
    /**
     * Progress of movement between points that panel is completely invisible outside of viewport(prev direction: -1, selected point: 0, next direction: 1)
     * @ko ?????? ????????? ????????? ?????? ????????? ????????? ???????????? ????????? ???????????? ?????? ?????????(prev??????: -1, ?????? ??????: 0, next??????: 1)
     * @type {number}
     * @readonly
     */
    get: function () {
      var position = this.position + this.offset;
      var alignPosition = this._alignPos;
      var camera = this._flicking.camera;
      var camPos = camera.position;

      if (camPos === position) {
        return 0;
      }

      if (camPos < position) {
        var disappearPosNext = position + (camera.size - camera.alignPosition) + alignPosition;
        return -getProgress(camPos, position, disappearPosNext);
      } else {
        var disappearPosPrev = position - (camera.alignPosition + this._size - alignPosition);
        return 1 - getProgress(camPos, disappearPosPrev, position);
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "visibleRatio", {
    /**
     * Percentage of area where panel is visible in the viewport
     * @ko ????????? ????????? ????????? ????????? ????????? ??????
     * @type {number}
     * @readonly
     */
    get: function () {
      var range = this.range;
      var size = this._size;
      var offset = this.offset;
      var visibleRange = this._flicking.camera.visibleRange;
      var checkingRange = {
        min: range.min + offset,
        max: range.max + offset
      };

      if (checkingRange.max <= visibleRange.min || checkingRange.min >= visibleRange.max) {
        return 0;
      }

      var visibleSize = size;

      if (visibleRange.min > checkingRange.min) {
        visibleSize -= visibleRange.min - checkingRange.min;
      }

      if (visibleRange.max < checkingRange.max) {
        visibleSize -= checkingRange.max - visibleRange.max;
      }

      return visibleSize / size;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "align", {
    // Options Getter

    /**
     * A value indicating where the {@link Panel#alignPosition alignPosition} should be located at inside the panel element
     * @ko {@link Panel#alignPosition alignPosition}??? ?????? ?????? ????????? ???????????? ???????????? ???????????? ???
     * @type {Constants.ALIGN | string | number}
     */
    get: function () {
      return this._align;
    },
    // Options Getter
    set: function (val) {
      this._align = val;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Update size of the panel
   * @ko ????????? ????????? ???????????????
   * @param {object} cached Predefined cached size of the panel<ko>????????? ????????? ????????? ?????? ??????</ko>
   * @chainable
   * @return {this}
   */

  __proto.resize = function (cached) {
    var el = this.element;
    var elStyle = getStyle(el);
    var flicking = this._flicking;
    var horizontal = flicking.horizontal;
    var prevPanel = flicking.renderer.panels[this._index - 1];

    if (cached) {
      this._size = cached.size;
      this._margin = __assign({}, cached.margin);
      this._height = cached.height;
    } else {
      this._size = horizontal ? el.offsetWidth : el.offsetHeight;
      this._margin = horizontal ? {
        prev: parseFloat(elStyle.marginLeft || "0"),
        next: parseFloat(elStyle.marginRight || "0")
      } : {
        prev: parseFloat(elStyle.marginTop || "0"),
        next: parseFloat(elStyle.marginBottom || "0")
      };
      this._height = horizontal ? el.offsetHeight : this._size;
    }

    this._pos = prevPanel ? prevPanel.range.max + prevPanel.margin.next + this._margin.prev : this._margin.prev;

    this._updateAlignPos();

    return this;
  };
  /**
   * Change panel's size. This will change the actual size of the panel element by changing its CSS width/height property
   * @ko ?????? ????????? ???????????????. ?????? ??????????????? ?????? ????????? CSS width/height??? ???????????????
   * @param {object} [size] New panel size<ko>??? ?????? ??????</ko>
   * @param {number|string} [size.width] CSS string or number(in px)<ko>CSS ????????? ?????? ??????(px)</ko>
   * @param {number|string} [size.height] CSS string or number(in px)<ko>CSS ????????? ?????? ??????(px)</ko>
   * @chainable
   * @return {this}
   */


  __proto.setSize = function (_a) {
    var width = _a.width,
        height = _a.height;
    var el = this.element;

    if (width != null) {
      if (isString(width)) {
        el.style.width = width;
      } else {
        el.style.width = width + "px";
      }
    }

    if (height != null) {
      if (isString(height)) {
        el.style.height = height;
      } else {
        el.style.height = height + "px";
      }
    }

    return this;
  };
  /**
   * Check whether the given element is inside of this panel's {@link Panel#element element}
   * @ko ?????? ??????????????? ??? ????????? {@link Panel#element element} ?????? ???????????? ???????????? ???????????????
   * @param {HTMLElement} element The HTMLElement to check<ko>??????????????? ?????? HTMLElement</ko>
   * @return {boolean} A Boolean value indicating the element is inside of this panel {@link Panel#element element}<ko>????????? {@link Panel#element element}?????? ?????? ???????????? ?????? ??????</ko>
   */


  __proto.contains = function (element) {
    var _a;

    return !!((_a = this.element) === null || _a === void 0 ? void 0 : _a.contains(element));
  };
  /**
   * Reset internal state and set {@link Panel#removed removed} to `true`
   * @ko ?????? ????????? ??????????????? {@link Panel#removed removed}??? `true`??? ???????????????.
   * @return {void}
   */


  __proto.destroy = function () {
    this._resetInternalStates();

    this._removed = true;
  };
  /**
   * Check whether the given position is inside of this panel's {@link Panel#range range}
   * @ko ????????? ????????? ?????? ????????? {@link Panel#range range}?????? ?????????????????? ???????????????.
   * @param {number} pos A position to check<ko>??????????????? ?????? ??????</ko>
   * @param {boolean} [includeMargin=false] Include {@link Panel#margin margin} to the range<ko>?????? ????????? {@link Panel#margin margin}?????? ??????????????????</ko>
   * @return {boolean} A Boolean value indicating whether the given position is included in the panel range<ko>?????? ????????? ?????? ?????? ?????? ??????????????? ??????</ko>
   */


  __proto.includePosition = function (pos, includeMargin) {
    if (includeMargin === void 0) {
      includeMargin = false;
    }

    return this.includeRange(pos, pos, includeMargin);
  };
  /**
   * Check whether the given range is fully included in this panel's area
   * @ko ????????? ????????? ??? ?????? ????????? ????????? ?????????????????? ???????????????
   * @param {number} min Minimum value of the range to check<ko>??????????????? ?????? ?????? ??????</ko>
   * @param {number} max Maximum value of the range to check<ko>??????????????? ?????? ?????? ??????</ko>
   * @param {boolean} [includeMargin=false] Include {@link Panel#margin margin} to the range<ko>?????? ????????? {@link Panel#margin margin}?????? ??????????????????</ko>
   * @returns {boolean} A Boolean value indicating whether the given range is fully included in the panel range<ko>?????? ????????? ?????? ?????? ?????? ????????? ??????????????? ??????</ko>
   */


  __proto.includeRange = function (min, max, includeMargin) {
    if (includeMargin === void 0) {
      includeMargin = false;
    }

    var margin = this._margin;
    var panelRange = this.range;

    if (includeMargin) {
      panelRange.min -= margin.prev;
      panelRange.max += margin.next;
    }

    return max >= panelRange.min && min <= panelRange.max;
  };
  /**
   * Move {@link Camera} to this panel
   * @ko {@link Camera}??? ??? ????????? ???????????????
   * @param {number} [duration] Duration of the animation (unit: ms)<ko>??????????????? ?????? ?????? (??????: ms)</ko>
   * @returns {Promise<void>} A Promise which will be resolved after reaching the panel<ko>?????? ???????????? resolve?????? Promise</ko>
   */


  __proto.focus = function (duration) {
    return this._flicking.moveTo(this._index, duration);
  };
  /**
   * Get previous(`index - 1`) panel. When the previous panel does not exist, this will return `null` instead
   * If the {@link Flicking#circularEnabled circular} is enabled, this will return the last panel if called from the first panel
   * @ko ??????(`index - 1`) ????????? ???????????????. ?????? ????????? ?????? ?????? `null`??? ???????????????
   * {@link Flicking#circularEnabled circular} ????????? ?????????????????? ??? ????????? ???????????? ??? ???????????? ????????? ?????? ????????? ????????? ???????????????
   * @returns {Panel | null} The previous panel<ko>?????? ??????</ko>
   */


  __proto.prev = function () {
    var index = this._index;
    var flicking = this._flicking;
    var renderer = flicking.renderer;
    var panelCount = renderer.panelCount;
    if (panelCount === 1) return null;
    return flicking.circularEnabled ? renderer.getPanel(index === 0 ? panelCount - 1 : index - 1) : renderer.getPanel(index - 1);
  };
  /**
   * Get next(`index + 1`) panel. When the next panel does not exist, this will return `null` instead
   * If the {@link Flicking#circularEnabled circular} is enabled, this will return the first panel if called from the last panel
   * @ko ??????(`index + 1`) ????????? ???????????????. ?????? ????????? ?????? ?????? `null`??? ???????????????
   * {@link Flicking#circularEnabled circular} ????????? ?????????????????? ??? ????????? ???????????? ??? ???????????? ????????? ?????? ????????? ????????? ???????????????
   * @returns {Panel | null} The previous panel<ko>?????? ??????</ko>
   */


  __proto.next = function () {
    var index = this._index;
    var flicking = this._flicking;
    var renderer = flicking.renderer;
    var panelCount = renderer.panelCount;
    if (panelCount === 1) return null;
    return flicking.circularEnabled ? renderer.getPanel(index === panelCount - 1 ? 0 : index + 1) : renderer.getPanel(index + 1);
  };
  /**
   * Increase panel's index by the given value
   * @ko ????????? ???????????? ????????? ????????? ??????????????????
   * @internal
   * @chainable
   * @param val An integer greater than or equal to 0<ko>0?????? ????????? ??? ??????</ko>
   * @returns {this}
   */


  __proto.increaseIndex = function (val) {
    this._index += Math.max(val, 0);
    return this;
  };
  /**
   * Decrease panel's index by the given value
   * @ko ????????? ???????????? ????????? ????????? ??????????????????
   * @internal
   * @chainable
   * @param val An integer greater than or equal to 0<ko>0?????? ????????? ??? ??????</ko>
   * @returns {this}
   */


  __proto.decreaseIndex = function (val) {
    this._index -= Math.max(val, 0);
    return this;
  };
  /**
   * Increase panel's position by the given value
   * @ko ????????? ????????? ????????? ????????? ??????????????????
   * @internal
   * @chainable
   * @param val An integer greater than or equal to 0<ko>0?????? ????????? ??? ??????</ko>
   * @returns {this}
   */


  __proto.increasePosition = function (val) {
    this._moveBy(Math.max(val, 0));

    return this;
  };
  /**
   * Decrease panel's position by the given value
   * @ko ?????????????????? ????????? ????????? ??????????????????
   * @internal
   * @chainable
   * @param val An integer greater than or equal to 0<ko>0?????? ????????? ??? ??????</ko>
   * @returns {this}
   */


  __proto.decreasePosition = function (val) {
    this._moveBy(-Math.max(val, 0));

    return this;
  };
  /**
   * @internal
   * @return {boolean} toggled
   */


  __proto.toggle = function (prevPos, newPos) {
    var toggleDirection = this._toggleDirection;
    var togglePosition = this._togglePosition;
    if (toggleDirection === DIRECTION.NONE || newPos === prevPos) return false;
    var prevToggled = this._toggled;

    if (newPos > prevPos) {
      if (togglePosition >= prevPos && togglePosition <= newPos) {
        this._toggled = toggleDirection === DIRECTION.NEXT;
      }
    } else {
      if (togglePosition <= prevPos && togglePosition >= newPos) {
        this._toggled = toggleDirection !== DIRECTION.NEXT;
      }
    }

    return prevToggled !== this._toggled;
  };
  /**
   * @internal
   */


  __proto.updateCircularToggleDirection = function () {
    var flicking = this._flicking;

    if (!flicking.circularEnabled) {
      this._toggleDirection = DIRECTION.NONE;
      this._toggled = false;
      return this;
    }

    var camera = flicking.camera;
    var camRange = camera.range;
    var camAlignPosition = camera.alignPosition;
    var camVisibleRange = camera.visibleRange;
    var camVisibleSize = camVisibleRange.max - camVisibleRange.min;
    var minimumVisible = camRange.min - camAlignPosition;
    var maximumVisible = camRange.max - camAlignPosition + camVisibleSize;
    var shouldBeVisibleAtMin = this.includeRange(maximumVisible - camVisibleSize, maximumVisible, false);
    var shouldBeVisibleAtMax = this.includeRange(minimumVisible, minimumVisible + camVisibleSize, false);
    this._toggled = false;

    if (shouldBeVisibleAtMin) {
      this._toggleDirection = DIRECTION.PREV;
      this._togglePosition = this.range.max + camRange.min - camRange.max + camAlignPosition;
      this.toggle(Infinity, camera.position);
    } else if (shouldBeVisibleAtMax) {
      this._toggleDirection = DIRECTION.NEXT;
      this._togglePosition = this.range.min + camRange.max - camVisibleSize + camAlignPosition;
      this.toggle(-Infinity, camera.position);
    } else {
      this._toggleDirection = DIRECTION.NONE;
      this._togglePosition = 0;
    }

    return this;
  };

  __proto._moveBy = function (val) {
    this._pos += val;
    return this;
  };

  __proto._updateAlignPos = function () {
    this._alignPos = parseAlign$1(this._align, this._size);
  };

  __proto._resetInternalStates = function () {
    this._size = 0;
    this._pos = 0;
    this._margin = {
      prev: 0,
      next: 0
    };
    this._height = 0;
    this._alignPos = 0;
    this._toggled = false;
    this._togglePosition = 0;
    this._toggleDirection = DIRECTION.NONE;
  };

  return Panel;
}();

/**
 * An slide data component that holds information of a single HTMLElement
 * @ko ???????????? ????????? ???????????????, ?????? HTMLElement??? ????????? ?????? ????????????
 */

var ElementPanel = function (_super) {
  __extends(ElementPanel, _super);
  /**
   * @param {object} options An options object<ko>?????? ????????????</ko>
   * @param {HTMLElement} [options.el] A `HTMLElement` panel's referencing<ko>????????? ???????????? `HTMLElement`</ko>
   * @param {number} [options.index] An initial index of the panel<ko>????????? ?????? ?????????</ko>
   * @param {Constants.ALIGN | string | number} [options.align] An initial {@link Flicking#align align} value of the panel<ko>????????? ?????? {@link Flicking#align align}???</ko>
   * @param {Flicking} [options.flicking] A Flicking instance panel's referencing<ko>????????? ???????????? {@link Flicking} ????????????</ko>
   */


  function ElementPanel(options) {
    var _this = _super.call(this, options) || this;

    _this._el = options.el;
    _this._rendered = true;
    return _this;
  }

  var __proto = ElementPanel.prototype;
  Object.defineProperty(__proto, "element", {
    /**
     * `HTMLElement` that panel's referencing
     * @ko ????????? ???????????? ?????? `HTMLElement`
     * @type {HTMLElement}
     * @readonly
     */
    get: function () {
      return this._el;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "rendered", {
    get: function () {
      return this._rendered;
    },
    enumerable: false,
    configurable: true
  });

  __proto.markForShow = function () {
    this._rendered = true;
  };

  __proto.markForHide = function () {
    this._rendered = false;
  };

  return ElementPanel;
}(Panel);

/**
 *
 */

var VanillaRenderer = function (_super) {
  __extends(VanillaRenderer, _super);

  function VanillaRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  } // eslint-disable-next-line @typescript-eslint/require-await


  var __proto = VanillaRenderer.prototype;

  __proto.render = function () {
    return __awaiter(this, void 0, void 0, function () {
      var flicking, cameraEl, wasRenderedPanels, renderingPanels;
      return __generator(this, function (_a) {
        flicking = getFlickingAttached(this._flicking, "Renderer");
        cameraEl = flicking.camera.element;
        wasRenderedPanels = this._panels.filter(function (panel) {
          return panel.element.parentElement === cameraEl;
        });

        this._updateRenderingPanels();

        renderingPanels = this._getRenderingPanelsByOrder();

        this._removePanelElements(wasRenderedPanels.filter(function (panel) {
          return !panel.rendered;
        }));

        this._insertPanelElements(renderingPanels.filter(function (panel) {
          return panel.element.parentElement !== cameraEl;
        }), null);

        this._resetPanelElementOrder(renderingPanels);

        return [2
        /*return*/
        ];
      });
    });
  }; // eslint-disable-next-line @typescript-eslint/require-await


  __proto.forceRenderAllPanels = function () {
    return __awaiter(this, void 0, void 0, function () {
      var flicking, camera, cameraElement, fragment;
      return __generator(this, function (_a) {
        flicking = getFlickingAttached(this._flicking, "Renderer");
        camera = flicking.camera;
        cameraElement = camera.element;
        fragment = document.createDocumentFragment();

        this._panels.forEach(function (panel) {
          return fragment.appendChild(panel.element);
        });

        this._removeAllChildsFromCamera();

        cameraElement.appendChild(fragment);
        return [2
        /*return*/
        ];
      });
    });
  };

  __proto._collectPanels = function () {
    var flicking = getFlickingAttached(this._flicking, "Renderer");
    var cameraElement = flicking.camera.element; // Remove all text nodes in the camera element

    toArray(cameraElement.childNodes).forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        cameraElement.removeChild(node);
      }
    });

    var align = this._getPanelAlign();

    var cameraChilds = toArray(cameraElement.children);
    this._panels = cameraChilds.map(function (el, index) {
      return new ElementPanel({
        flicking: flicking,
        el: el,
        index: index,
        align: align
      });
    });
  };

  __proto._createPanel = function (el, options) {
    return new ElementPanel(__assign({
      el: el
    }, options));
  };

  __proto._insertPanelElements = function (panels, nextSibling) {
    var flicking = getFlickingAttached(this._flicking, "Renderer");
    var camera = flicking.camera;
    var cameraElement = camera.element;
    var nextSiblingElement = (nextSibling === null || nextSibling === void 0 ? void 0 : nextSibling.element) || null;
    var fragment = document.createDocumentFragment();
    panels.forEach(function (panel) {
      return fragment.appendChild(panel.element);
    });
    cameraElement.insertBefore(fragment, nextSiblingElement);
    return this;
  };

  __proto._removePanelElements = function (panels) {
    var flicking = getFlickingAttached(this._flicking, "Renderer");
    var cameraElement = flicking.camera.element;
    panels.forEach(function (panel) {
      cameraElement.removeChild(panel.element);
    });
    return this;
  };

  __proto._resetPanelElementOrder = function (panels) {
    var flicking = getFlickingAttached(this._flicking, "Renderer");
    var cameraEl = flicking.camera.element; // We're using reversed panels here as last panel should be the last element of camera element

    var reversedPanels = __spreadArray([], __read(panels)).reverse();

    reversedPanels.forEach(function (panel, idx) {
      var nextPanel = reversedPanels[idx - 1];
      var nextPanelEl = nextPanel ? nextPanel.element : null;

      if (panel.element.nextElementSibling !== nextPanelEl) {
        cameraEl.insertBefore(panel.element, nextPanelEl);
      }
    });
  };

  __proto._removeAllChildsFromCamera = function () {
    var flicking = getFlickingAttached(this._flicking, "Renderer");
    var cameraElement = flicking.camera.element; // Remove other elements

    while (cameraElement.firstChild) {
      cameraElement.removeChild(cameraElement.firstChild);
    }
  };

  __proto._getRenderingPanelsByOrder = function () {
    var flicking = getFlickingAttached(this._flicking, "Renderer");
    var panels = flicking.renderer.panels;
    return panels.filter(function (panel) {
      return panel.rendered;
    }).sort(function (a, b) {
      return a.position + a.offset - (b.position + b.offset);
    });
  };

  return VanillaRenderer;
}(Renderer);

/**
 *
 */

var ExternalRenderer = function (_super) {
  __extends(ExternalRenderer, _super);

  function ExternalRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  var __proto = ExternalRenderer.prototype;

  __proto._insertPanelElements = function (panels, nextSibling) {// DO NOTHING
  }; // eslint-disable-next-line @typescript-eslint/no-unused-vars


  __proto._removePanelElements = function (panels) {// DO NOTHING
  };

  return ExternalRenderer;
}(Renderer);

/**
 * @extends Component
 * @support {"ie": "9+(with polyfill)", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "4.X+"}
 * @requires {@link https://github.com/naver/egjs-component|@egjs/component}
 * @requires {@link https://github.com/naver/egjs-axes|@egjs/axes}
 */

var Flicking = function (_super) {
  __extends(Flicking, _super);
  /**
   * @param root A root HTMLElement to initialize Flicking on it. When it's a typeof `string`, it should be a css selector string
   * <ko>Flicking??? ???????????? HTMLElement???, `string` ???????????? ????????? css ????????? ???????????? ???????????? ?????????.</ko>
   * @param {object} [options={}] An options object for Flicking.<ko>Flicking??? ????????? ?????? ????????????</ko>
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE WRONG_TYPE}|When the root is not either string or HTMLElement|
   * |{@link ERROR_CODE ELEMENT_NOT_FOUND}|When the element with given CSS selector does not exist|
   * <ko>
   *
   * |code|??????|
   * |---|---|
   * |{@link ERROR_CODE WRONG_TYPE}|?????? ??????????????? string?????? HTMLElement??? ?????? ??????|
   * |{@link ERROR_CODE ELEMENT_NOT_FOUND}|????????? CSS selector??? ??????????????? ?????? ????????? ??????|
   *
   * </ko>
   * @example
   * ```ts
   * import Flicking from "@egjs/flicking";
   *
   * // Creating new instance of Flicking with HTMLElement
   * const flicking = new Flicking(document.querySelector(".flicking-viewport"), { circular: true });
   *
   * // Creating new instance of Flicking with CSS selector
   * const flicking2 = new Flicking(".flicking-viewport", { circular: true });
   * ```
   */


  function Flicking(root, _a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.align,
        align = _c === void 0 ? ALIGN.CENTER : _c,
        _d = _b.defaultIndex,
        defaultIndex = _d === void 0 ? 0 : _d,
        _e = _b.horizontal,
        horizontal = _e === void 0 ? true : _e,
        _f = _b.circular,
        circular = _f === void 0 ? false : _f,
        _g = _b.bound,
        bound = _g === void 0 ? false : _g,
        _h = _b.adaptive,
        adaptive = _h === void 0 ? false : _h,
        _j = _b.panelsPerView,
        panelsPerView = _j === void 0 ? -1 : _j,
        _k = _b.noPanelStyleOverride,
        noPanelStyleOverride = _k === void 0 ? false : _k,
        _l = _b.needPanelThreshold,
        needPanelThreshold = _l === void 0 ? 0 : _l,
        _m = _b.preventEventsBeforeInit,
        preventEventsBeforeInit = _m === void 0 ? true : _m,
        _o = _b.deceleration,
        deceleration = _o === void 0 ? 0.0075 : _o,
        _p = _b.duration,
        duration = _p === void 0 ? 500 : _p,
        _q = _b.easing,
        easing = _q === void 0 ? function (x) {
      return 1 - Math.pow(1 - x, 3);
    } : _q,
        _r = _b.inputType,
        inputType = _r === void 0 ? ["mouse", "touch"] : _r,
        _s = _b.moveType,
        moveType = _s === void 0 ? "snap" : _s,
        _t = _b.threshold,
        threshold = _t === void 0 ? 40 : _t,
        _u = _b.interruptable,
        interruptable = _u === void 0 ? true : _u,
        _v = _b.bounce,
        bounce = _v === void 0 ? "20%" : _v,
        _w = _b.iOSEdgeSwipeThreshold,
        iOSEdgeSwipeThreshold = _w === void 0 ? 30 : _w,
        _x = _b.preventClickOnDrag,
        preventClickOnDrag = _x === void 0 ? true : _x,
        _y = _b.disableOnInit,
        disableOnInit = _y === void 0 ? false : _y,
        _z = _b.renderOnlyVisible,
        renderOnlyVisible = _z === void 0 ? false : _z,
        _0 = _b.autoInit,
        autoInit = _0 === void 0 ? true : _0,
        _1 = _b.autoResize,
        autoResize = _1 === void 0 ? true : _1,
        _2 = _b.renderExternal,
        renderExternal = _2 === void 0 ? null : _2;

    var _this = _super.call(this) || this; // Internal states


    _this._initialized = false;
    _this._plugins = []; // Bind options

    _this._align = align;
    _this._defaultIndex = defaultIndex;
    _this._horizontal = horizontal;
    _this._circular = circular;
    _this._bound = bound;
    _this._adaptive = adaptive;
    _this._panelsPerView = panelsPerView;
    _this._noPanelStyleOverride = noPanelStyleOverride;
    _this._needPanelThreshold = needPanelThreshold;
    _this._preventEventsBeforeInit = preventEventsBeforeInit;
    _this._deceleration = deceleration;
    _this._duration = duration;
    _this._easing = easing;
    _this._inputType = inputType;
    _this._moveType = moveType;
    _this._threshold = threshold;
    _this._interruptable = interruptable;
    _this._bounce = bounce;
    _this._iOSEdgeSwipeThreshold = iOSEdgeSwipeThreshold;
    _this._preventClickOnDrag = preventClickOnDrag;
    _this._disableOnInit = disableOnInit;
    _this._renderOnlyVisible = renderOnlyVisible;
    _this._autoResize = autoResize;
    _this._autoInit = autoInit;
    _this._renderExternal = renderExternal; // Create core components

    _this._viewport = new Viewport(getElement(root));
    _this._renderer = _this._createRenderer();
    _this._camera = _this._createCamera();
    _this._control = _this._createControl();
    _this.resize = _this.resize.bind(_this);

    if (_this._autoInit) {
      void _this.init();
    }

    return _this;
  }

  var __proto = Flicking.prototype;
  Object.defineProperty(__proto, "control", {
    // Components

    /**
     * {@link Control} instance of the Flicking
     * @ko ?????? Flicking??? ???????????? {@link Control} ????????????
     * @type {Control}
     * @default SnapControl
     * @readonly
     * @see Control
     * @see SnapControl
     * @see FreeControl
     */
    get: function () {
      return this._control;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "camera", {
    /**
     * {@link Camera} instance of the Flicking
     * @ko ?????? Flicking??? ???????????? {@link Camera} ????????????
     * @type {Camera}
     * @default LinearCamera
     * @readonly
     * @see Camera
     * @see LinearCamera
     * @see BoundCamera
     * @see CircularCamera
     */
    get: function () {
      return this._camera;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "renderer", {
    /**
     * {@link Renderer} instance of the Flicking
     * @ko ?????? Flicking??? ???????????? {@link Renderer} ????????????
     * @type {Renderer}
     * @default VanillaRenderer
     * @readonly
     * @see Renderer
     * @see VanillaRenderer
     * @see ExternalRenderer
     */
    get: function () {
      return this._renderer;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "viewport", {
    /**
     * A component that manages viewport size
     * @ko ????????? ?????? ????????? ???????????? ????????????
     * @type {Viewport}
     * @readonly
     * @see Viewport
     */
    get: function () {
      return this._viewport;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "initialized", {
    // Internal States

    /**
     * Whether Flicking's {@link Flicking#init init()} is called.
     * This is `true` when {@link Flicking#init init()} is called, and is `false` after calling {@link Flicking#destroy destroy()}.
     * @ko Flicking??? {@link Flicking#init init()}??? ????????????????????? ???????????? ?????? ??????.
     * ??? ?????? {@link Flicking#init init()}??? ?????????????????? `true`??? ?????????, {@link Flicking#destroy destroy()}?????? ????????? ?????? `false`??? ???????????????.
     * @type {boolean}
     * @default false
     * @readonly
     */
    get: function () {
      return this._initialized;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "circularEnabled", {
    /**
     * Whether the `circular` option is enabled.
     * The {@link Flicking#circular circular} option can't be enabled when sum of the panel sizes are too small.
     * @ko {@link Flicking#circular circular} ????????? ????????????????????? ????????? ???????????? ?????? ??????.
     * {@link Flicking#circular circular} ????????? ????????? ????????? ?????? ???????????? ?????? ?????? ?????????????????????.
     * @type {boolean}
     * @default false
     * @readonly
     */
    get: function () {
      return this._camera.controlParams.circular;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "index", {
    /**
     * Index number of the {@link Flicking#currentPanel currentPanel}
     * @ko {@link Flicking#currentPanel currentPanel}??? ????????? ??????
     * @type {number}
     * @default 0
     * @readonly
     */
    get: function () {
      return this._control.activeIndex;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "element", {
    /**
     * The root(`.flicking-viewport`) element
     * @ko root(`.flicking-viewport`) ????????????
     * @type {HTMLElement}
     * @readonly
     */
    get: function () {
      return this._viewport.element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "currentPanel", {
    /**
     * Currently active panel
     * @ko ?????? ????????? ??????
     * @type {Panel}
     * @readonly
     * @see Panel
     */
    get: function () {
      return this._control.activePanel;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "panels", {
    /**
     * Array of panels
     * @ko ?????? ???????????? ??????
     * @type {Panel[]}
     * @readonly
     * @see Panel
     */
    get: function () {
      return this._renderer.panels;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "panelCount", {
    /**
     * Count of panels
     * @ko ?????? ????????? ??????
     * @type {number}
     * @readonly
     */
    get: function () {
      return this._renderer.panelCount;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "visiblePanels", {
    /**
     * Array of panels that is visible at the current position
     * @ko ?????? ????????? ????????? ??????
     * @type {Panel[]}
     * @readonly
     * @see Panel
     */
    get: function () {
      return this._camera.visiblePanels;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "animating", {
    /**
     * Whether Flicking's animating
     * @ko ?????? ??????????????? ?????? ??????
     * @type {boolean}
     * @readonly
     */
    get: function () {
      return this._control.animating;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "holding", {
    /**
     * Whether user is clicking or touching
     * @ko ?????? ???????????? ??????/??????????????? ??????
     * @type {boolean}
     * @readonly
     */
    get: function () {
      return this._control.holding;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "activePlugins", {
    /**
     * A current list of activated plugins
     * @ko ?????? ???????????? ???????????? ??????
     * @type {Plugin[]}
     * @readonly
     */
    get: function () {
      return this._plugins;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "align", {
    // Options Getter
    // UI / LAYOUT

    /**
     * Align position of the panels within viewport. You can set different values each for the panel and camera
     * @ko ????????? ????????? ?????? ??????????????? ???????????? ??????. ???????????? ?????? ????????? ????????? ????????? ?????? ????????????
     * @type {ALIGN | string | number | { panel: string | number, camera: string | number }}
     * @property {ALIGN | string | number} panel The align value for each {@link Panel}s<ko>????????? {@link Panel}??? ????????? ???</ko>
     * @property {ALIGN | string | number} camera The align value for {@link Camera}<ko>{@link Camera}??? ????????? ???</ko>
     * @default "center"
     * @example
     * ```ts
     * const possibleOptions = [
     *   // Literal strings
     *   "prev", "center", "next",
     *   // % values, applied to both panel & camera
     *   "0%", "25%", "42%",
     *   // px values, arithmetic calculation with (+/-) is also allowed.
     *   "0px", "100px", "50% - 25px",
     *   // numbers, same to number + px ("0px", "100px")
     *   0, 100, 1000,
     *   // Setting a different value for panel & camera
     *   { panel: "10%", camera: "25%" }
     * ];
     *
     * possibleOptions.forEach(align => {
     *   new Flicking("#el", { align });
     * });
     * ```
     */
    get: function () {
      return this._align;
    },
    // Options Setter
    // UI / LAYOUT
    set: function (val) {
      this._align = val;
      this._renderer.align = val;
      this._camera.align = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "defaultIndex", {
    /**
     * Index of the panel to move when Flicking's {@link Flicking#init init()} is called. A zero-based integer
     * @ko Flicking??? {@link Flicking#init init()}??? ????????? ??? ????????? ????????? ????????? ????????????, 0?????? ???????????? ???????????????
     * @type {number}
     * @default 0
     */
    get: function () {
      return this._defaultIndex;
    },
    set: function (val) {
      this._defaultIndex = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "horizontal", {
    /**
     * Direction of panel movement (true: horizontal, false: vertical)
     * @ko ?????? ?????? ?????? (true: ????????????, false: ????????????)
     * @type {boolean}
     * @default true
     */
    get: function () {
      return this._horizontal;
    },
    set: function (val) {
      this._horizontal = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "circular", {
    /**
     * Enables circular(continuous loop) mode, which connects first/last panel for continuous scrolling.
     * @ko ?????? ????????? ??????????????????. ?????? ??????????????? ??? ?????? ????????? ?????? ???????????? ???????????? ???????????? ???????????????.
     * @type {boolean}
     * @default false
     */
    get: function () {
      return this._circular;
    },
    set: function (val) {
      this._circular = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "bound", {
    /**
     * Prevent the view(camera element) from going out of the first/last panel, so it won't show empty spaces before/after the first/last panel
     * Only can be enabled when `circular=false`
     * @ko ???(????????? ????????????)??? ???????????? ????????? ?????? ????????? ???????????? ????????? ??????, ?????????/????????? ?????? ???/?????? ??? ????????? ????????? ????????? ?????? ???????????????
     * `circular=false`??? ???????????? ????????? ??? ????????????
     * @type {boolean}
     * @default false
     */
    get: function () {
      return this._bound;
    },
    set: function (val) {
      this._bound = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "adaptive", {
    /**
     * Update height of the viewport element after movement same to the height of the panel below. This can be only enabled when `horizontal=true`
     * @ko ????????? ??? ????????? ??????????????? ????????? ?????? ????????? ????????? ???????????? ???????????????. `horizontal=true`??? ???????????? ????????? ??? ????????????.
     * @type {boolean}
     * @default false
     */
    get: function () {
      return this._adaptive;
    },
    set: function (val) {
      this._adaptive = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "panelsPerView", {
    /**
     * A visible number of panels on viewport. Enabling this option will automatically resize panel size
     * @ko ??? ????????? ????????? ????????? ??????. ??? ????????? ???????????? ?????? ????????? ????????? ????????? ??????????????????
     * @type {number}
     * @default -1
     */
    get: function () {
      return this._panelsPerView;
    },
    set: function (val) {
      this._panelsPerView = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "noPanelStyleOverride", {
    /**
     * Enabling this option will not change `width/height` style of the panels if {@link Flicking#panelsPerView} is enabled.
     * This behavior can be useful in terms of performance when you're manually managing all panel sizes
     * @ko ??? ????????? ???????????? ??????, {@link Flicking#panelsPerView} ????????? ?????????????????? ??? ????????? `width/height` ???????????? ???????????? ????????? ???????????????.
     * ?????? ???????????? ????????? ?????? ???????????? ?????? ??????, ??? ????????? ??????????????? ??????????????? ????????? ??? ????????????
     * @type {boolean}
     * @default false
     */
    get: function () {
      return this._noPanelStyleOverride;
    },
    set: function (val) {
      this._noPanelStyleOverride = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "needPanelThreshold", {
    // EVENTS

    /**
     * A Threshold from viewport edge before triggering `needPanel` event
     * @ko `needPanel`???????????? ???????????? ?????? ????????? ?????????????????? ?????? ??????
     * @type {number}
     * @default 0
     */
    get: function () {
      return this._needPanelThreshold;
    },
    // EVENTS
    set: function (val) {
      this._needPanelThreshold = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "preventEventsBeforeInit", {
    /**
     * When enabled, events are not triggered before `ready` when initializing
     * @ko ???????????? ?????? ???????????? `ready` ????????? ????????? ???????????? ???????????? ????????????.
     * @type {boolean}
     * @default true
     */
    get: function () {
      return this._preventEventsBeforeInit;
    },
    set: function (val) {
      this._preventEventsBeforeInit = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "deceleration", {
    // ANIMATION

    /**
     * Deceleration value for panel movement animation which is triggered by user input. A higher value means a shorter animation time
     * @ko ???????????? ???????????? ???????????? ????????? ?????? ?????? ?????????????????? ?????????. ?????? ???????????? ??????????????? ?????? ????????? ???????????????
     * @type {number}
     * @default 0.0075
     */
    get: function () {
      return this._deceleration;
    },
    // ANIMATION
    set: function (val) {
      this._deceleration = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "easing", {
    /**
     * An easing function applied to the panel movement animation. Default value is `easeOutCubic`
     * @ko ?????? ?????? ?????????????????? ????????? easing ??????. ???????????? `easeOutCubic`??????
     * @type {function}
     * @default x => 1 - Math.pow(1 - x, 3)
     * @see Easing Functions Cheat Sheet {@link http://easings.net/} <ko>?????? ?????? Cheat Sheet {@link http://easings.net/}</ko>
     */
    get: function () {
      return this._easing;
    },
    set: function (val) {
      this._easing = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "duration", {
    /**
     * Default duration of the animation (ms)
     * @ko ????????? ??????????????? ?????? ?????? (ms)
     * @type {number}
     * @default 500
     */
    get: function () {
      return this._duration;
    },
    set: function (val) {
      this._duration = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "inputType", {
    // INPUT

    /**
     * Types of input devices to enable
     * @ko ???????????? ?????? ?????? ??????
     * @type {string[]}
     * @default ["touch", "mouse"]
     * @see {@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption Possible values (PanInputOption#inputType)}
     * <ko>{@link https://naver.github.io/egjs-axes/release/latest/doc/global.html#PanInputOption ????????? ?????? (PanInputOption#inputType)}</ko>
     */
    get: function () {
      return this._inputType;
    },
    // INPUT
    set: function (val) {
      this._inputType = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "moveType", {
    /**
     * Movement style by user input. This will change instance type of {@link Flicking#control}
     * You can use the values of the constant {@link MOVE_TYPE}
     * @ko ????????? ????????? ?????? ?????? ??????. ??? ?????? ?????? {@link Flicking#control}??? ???????????? ????????? ???????????????
     * ?????? {@link MOVE_TYPE}??? ????????? ????????? ????????? ??? ????????????
     * @type {MOVE_TYPE | Pair<string, object>}
     * @default "snap"
     * @example
     * |moveType|control|options|
     * |:---:|:---:|:---:|
     * |"snap"|{@link SnapControl}||
     * |"freeScroll"|{@link FreeControl}|{@link FreeControlOptions}|
     *
     * ```ts
     * import Flicking, { MOVE_TYPE } from "@egjs/flicking";
     *
     * const flicking = new Flicking({
     *   moveType: MOVE_TYPE.SNAP
     * });
     * ```
     *
     * ```ts
     * const flicking = new Flicking({
     *   // If you want more specific settings for the moveType
     *   // [moveType, options for that moveType]
     *   // In this case, it's ["freeScroll", FreeControlOptions]
     *   moveType: [MOVE_TYPE.FREE_SCROLL, { stopAtEdge: true }]
     * });
     * ```
     */
    get: function () {
      return this._moveType;
    },
    set: function (val) {
      this._moveType = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "threshold", {
    /**
     * Movement threshold to change panel (unit: px). It should be dragged above the threshold to change the current panel.
     * @ko ?????? ????????? ?????? ?????? ????????? (??????: px). ????????? ??? ???????????? ?????????????????? ?????? ????????? ????????????.
     * @type {number}
     * @default 40
     */
    get: function () {
      return this._threshold;
    },
    set: function (val) {
      this._threshold = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "interruptable", {
    /**
     * Set animation to be interruptable by click/touch.
     * @ko ???????????? ??????/????????? ?????? ?????????????????? ????????? ?????? ??? ????????? ???????????????.
     * @type {boolean}
     * @default true
     */
    get: function () {
      return this._interruptable;
    },
    set: function (val) {
      this._interruptable = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "bounce", {
    /**
     * The size value of the bounce area. Only can be enabled when `circular=false`.
     * You can set different bounce value for prev/next direction by using array.
     * `number` for px value, and `string` for px, and % value relative to viewport size.
     * You have to call {@link Control#updateInput} after changing this to take effect.
     * @ko Flicking??? ?????? ????????? ????????? ??? ??? ?????? ?????? ??????. `circular=false`??? ???????????? ????????? ??? ????????????.
     * ????????? ?????? prev/next ????????? ?????? ?????? ?????? ????????? ?????? ????????? ??? ????????????.
     * `number`??? ?????? px??????, `stirng`??? ?????? px ?????? ????????? ?????? ?????? %?????? ????????? ??? ????????????.
     * ??? ?????? ????????? {@link Control#updateInput}??? ???????????? ?????????.
     * @type {string | number | Array<string | number>}
     * @default "20%"
     * @example
     * ```ts
     * const possibleOptions = [
     *   // % values, relative to viewport element(".flicking-viewport")'s size
     *   "0%", "25%", "42%",
     *   // px values, arithmetic calculation with (+/-) is also allowed.
     *   "0px", "100px", "50% - 25px",
     *   // numbers, same to number + px ("0px", "100px")
     *   0, 100, 1000
     * ];
     * ```
     *
     * @example
     * ```ts
     * const flicking = new Flicking("#el", { bounce: "20%" });
     *
     * flicking.bounce = "100%";
     * flicking.control.updateInput(); // Call this to update!
     * ```
     */
    get: function () {
      return this._bounce;
    },
    set: function (val) {
      this._bounce = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "iOSEdgeSwipeThreshold", {
    /**
     * Size of the area from the right edge in iOS safari (in px) which enables swipe-back or swipe-forward
     * @ko iOS Safari?????? swipe??? ?????? ????????????/?????????????????? ??????????????? ????????? ?????????????????? ????????? ?????? (px)
     * @type {number}
     * @default 30
     */
    get: function () {
      return this._iOSEdgeSwipeThreshold;
    },
    set: function (val) {
      this._iOSEdgeSwipeThreshold = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "preventClickOnDrag", {
    /**
     * Automatically prevent `click` event if the user has dragged at least a single pixel on the viewport element
     * @ko ???????????? ????????? ????????? 1??????????????? ??????????????? ?????? ???????????? {@link https://developer.mozilla.org/ko/docs/Web/API/Element/click_event click} ???????????? ???????????????
     * @type {boolean}
     * @default true
     */
    get: function () {
      return this._preventClickOnDrag;
    },
    set: function (val) {
      var prevVal = this._preventClickOnDrag;
      if (val === prevVal) return;
      var controller = this._control.controller;

      if (val) {
        controller.addPreventClickHandler();
      } else {
        controller.removePreventClickHandler();
      }

      this._preventClickOnDrag = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "disableOnInit", {
    /**
     * Automatically call {@link Flicking#disableInput disableInput()} on initialization
     * @ko Flicking init?????? {@link Flicking#disableInput disableInput()}??? ?????? ???????????????
     * @type {boolean}
     * @default false
     */
    get: function () {
      return this._disableOnInit;
    },
    set: function (val) {
      this._disableOnInit = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "renderOnlyVisible", {
    // PERFORMANCE

    /**
     * Whether to render visible panels only. This can dramatically increase performance when there're many panels.
     * @ko ????????? ????????? ??????????????? ????????? ???????????????. ????????? ?????? ????????? ??????????????? ?????? ???????????? ??? ????????????.
     * @type {boolean}
     * @default false
     */
    get: function () {
      return this._renderOnlyVisible;
    },
    // PERFORMANCE
    set: function (val) {
      this._renderOnlyVisible = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "autoInit", {
    // OTHERS

    /**
     * Call {@link Flicking#init init()} automatically when creating Flicking's instance
     * @ko Flicking ??????????????? ????????? ??? ???????????? {@link Flicking#init init()}??? ???????????????
     * @type {boolean}
     * @default true
     * @readonly
     */
    get: function () {
      return this._autoInit;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "autoResize", {
    /**
     * Attach Flicking's {@link Flicking#resize resize} method to window's resize event.
     * Flicking will automatically call {@link Flicking#resize resize} window size and orientation change.
     * @ko Flicking??? {@link Flicking#resize resize} ???????????? window??? resize ????????? ???????????? ???????????????.
     * ????????? window ??? ?????? ??? orientation ????????? ?????? ???????????? {@link Flicking#resize resize}??? ???????????????.
     * @type {boolean}
     * @default true
     */
    get: function () {
      return this._autoResize;
    },
    // OTHERS
    set: function (val) {
      this._autoResize = val;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(__proto, "renderExternal", {
    /**
     * This is an option for the frameworks(React, Vue, Angular, ...). Don't set it as it's automatically managed by Flicking.
     * @ko ???????????????(React, Vue, Angular, ...)????????? ???????????? ????????????, ???????????? ??????????????? ?????? ???????????? ?????? ????????????!
     * @type {boolean}
     * @default false
     * @internal
     * @readonly
     */
    get: function () {
      return this._renderExternal;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * Initialize Flicking and move to the default index
   * This is automatically called on Flicking's constructor when `autoInit` is true(default)
   * @ko Flicking??? ???????????????, ????????? ???????????? ???????????????
   * ??? ???????????? `autoInit` ????????? true(default)??? ?????? Flicking??? ????????? ??? ???????????? ???????????????
   * @fires Flicking#ready
   * @return {this}
   */

  __proto.init = function () {
    return __awaiter(this, void 0, void 0, function () {
      var camera, renderer, control, originalTrigger, preventEventsBeforeInit;

      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (this._initialized) return [2
            /*return*/
            ];
            camera = this._camera;
            renderer = this._renderer;
            control = this._control;
            originalTrigger = this.trigger;
            preventEventsBeforeInit = this._preventEventsBeforeInit;
            camera.init(this);
            renderer.init(this);
            control.init(this);

            if (preventEventsBeforeInit) {
              this.trigger = function () {
                return _this;
              };
            }

            return [4
            /*yield*/
            , this.resize()];

          case 1:
            _a.sent(); // Look at initial panel


            return [4
            /*yield*/
            , this._moveToInitialPanel()];

          case 2:
            // Look at initial panel
            _a.sent();

            if (this._autoResize) {
              window.addEventListener("resize", this.resize);
            }

            if (this._preventClickOnDrag) {
              control.controller.addPreventClickHandler();
            }

            if (this._disableOnInit) {
              this.disableInput();
            }

            this._plugins.forEach(function (plugin) {
              return plugin.init(_this);
            }); // Done initializing & emit ready event


            this._initialized = true;

            if (preventEventsBeforeInit) {
              this.trigger = originalTrigger;
            }

            this.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.READY));
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * Destroy Flicking and remove all event handlers
   * @ko Flicking??? ?????? ?????????????????? ?????? ????????? ????????????, ????????? ?????? ????????? ???????????? ???????????????
   * @return {void}
   */


  __proto.destroy = function () {
    if (!this._initialized) return;
    this.off();
    window.removeEventListener("resize", this.resize);

    this._control.destroy();

    this._camera.destroy();

    this._renderer.destroy();

    this._plugins.forEach(function (plugin) {
      return plugin.destroy();
    });

    this._initialized = false;
  };
  /**
   * Move to the previous panel (current index - 1)
   * @ko ?????? ????????? ??????????????? (?????? ????????? - 1)
   * @param {number} [duration={@link Flicking#duration options.duration}] Duration of the panel movement animation (unit: ms)<ko>?????? ?????? ??????????????? ?????? ?????? (??????: ms)</ko>
   * @async
   * @fires Flicking#moveStart
   * @fires Flicking#move
   * @fires Flicking#moveEnd
   * @fires Flicking#willChange
   * @fires Flicking#changed
   * @fires Flicking#willRestore
   * @fires Flicking#restored
   * @fires Flicking#needPanel
   * @fires Flicking#visibleChange
   * @fires Flicking#reachEdge
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|When the previous panel does not exist|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|?????? ????????? ???????????? ?????? ??????|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|?????????????????? ?????? ???????????? ??????|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|????????? ????????? ?????? ?????????????????? ????????? ??????|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|????????? ???????????? ??? ???????????? `stop()`??? ????????? ??????|
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the previous panel<ko>?????? ?????? ???????????? resolve?????? Promise</ko>
   */


  __proto.prev = function (duration) {
    var _a, _b, _c;

    if (duration === void 0) {
      duration = this._duration;
    }

    return this.moveTo((_c = (_b = (_a = this._control.activePanel) === null || _a === void 0 ? void 0 : _a.prev()) === null || _b === void 0 ? void 0 : _b.index) !== null && _c !== void 0 ? _c : -1, duration, DIRECTION.PREV);
  };
  /**
   * Move to the next panel (current index + 1)
   * @ko ?????? ????????? ??????????????? (?????? ????????? + 1)
   * @param {number} [duration={@link Flicking#duration options.duration}] Duration of the panel movement animation (unit: ms).<ko>?????? ?????? ??????????????? ?????? ?????? (??????: ms)</ko>
   * @async
   * @fires Flicking#moveStart
   * @fires Flicking#move
   * @fires Flicking#moveEnd
   * @fires Flicking#willChange
   * @fires Flicking#changed
   * @fires Flicking#willRestore
   * @fires Flicking#restored
   * @fires Flicking#needPanel
   * @fires Flicking#visibleChange
   * @fires Flicking#reachEdge
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|When the next panel does not exist|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|?????? ????????? ???????????? ?????? ??????|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|?????????????????? ?????? ???????????? ??????|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|????????? ????????? ?????? ?????????????????? ????????? ??????|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|????????? ???????????? ??? ???????????? `stop()`??? ????????? ??????|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the next panel<ko>?????? ?????? ???????????? resolve?????? Promise</ko>
   */


  __proto.next = function (duration) {
    var _a, _b, _c;

    if (duration === void 0) {
      duration = this._duration;
    }

    return this.moveTo((_c = (_b = (_a = this._control.activePanel) === null || _a === void 0 ? void 0 : _a.next()) === null || _b === void 0 ? void 0 : _b.index) !== null && _c !== void 0 ? _c : this._renderer.panelCount, duration, DIRECTION.NEXT);
  };
  /**
   * Move to the panel with given index
   * @ko ????????? ???????????? ???????????? ????????? ???????????????
   * @param {number} index The index of the panel to move<ko>????????? ????????? ?????????</ko>
   * @param {number} [duration={@link Flicking#duration options.duration}] Duration of the animation (unit: ms)<ko>??????????????? ?????? ?????? (??????: ms)</ko>
   * @param {DIRECTION} [direction=DIRECTION.NONE] Direction to move, only available in the {@link Flicking#circular circular} mode<ko>????????? ??????. {@link Flicking#circular circular} ?????? ?????????????????? ?????? ???????????????</ko>
   * @async
   * @fires Flicking#moveStart
   * @fires Flicking#move
   * @fires Flicking#moveEnd
   * @fires Flicking#willChange
   * @fires Flicking#changed
   * @fires Flicking#willRestore
   * @fires Flicking#restored
   * @fires Flicking#needPanel
   * @fires Flicking#visibleChange
   * @fires Flicking#reachEdge
   * @throws {FlickingError}
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|When the root is not either string or HTMLElement|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|When the animation is already playing|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|When the animation is interrupted by user input|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|When the any of the event's `stop()` is called|
   * <ko>
   *
   * |code|condition|
   * |---|---|
   * |{@link ERROR_CODE INDEX_OUT_OF_RANGE}|?????? ???????????? ?????? ????????? ???????????? ?????? ??????|
   * |{@link ERROR_CODE ANIMATION_ALREADY_PLAYING}|?????????????????? ?????? ???????????? ??????|
   * |{@link ERROR_CODE ANIMATION_INTERRUPTED}|????????? ????????? ?????? ?????????????????? ????????? ??????|
   * |{@link ERROR_CODE STOP_CALLED_BY_USER}|????????? ???????????? ??? ???????????? `stop()`??? ????????? ??????|
   *
   * </ko>
   * @return {Promise<void>} A Promise which will be resolved after reaching the target panel<ko>?????? ?????? ???????????? resolve?????? Promise</ko>
   */


  __proto.moveTo = function (index, duration, direction) {
    if (duration === void 0) {
      duration = this._duration;
    }

    if (direction === void 0) {
      direction = DIRECTION.NONE;
    }

    var renderer = this._renderer;
    var panelCount = renderer.panelCount;
    var panel = renderer.getPanel(index);

    if (!panel) {
      return Promise.reject(new FlickingError(MESSAGE.INDEX_OUT_OF_RANGE(index, 0, panelCount - 1), CODE.INDEX_OUT_OF_RANGE));
    }

    if (this._control.animating) {
      return Promise.reject(new FlickingError(MESSAGE.ANIMATION_ALREADY_PLAYING, CODE.ANIMATION_ALREADY_PLAYING));
    }

    return this._control.moveToPanel(panel, {
      duration: duration,
      direction: direction
    });
  };
  /**
   * Return the {@link Panel} at the given index. `null` if it doesn't exists.
   * @ko ????????? ???????????? ???????????? {@link Panel}??? ???????????????. ????????? ???????????? ???????????? ????????? ???????????? ?????? ?????? `null`??? ???????????????.
   * @return {Panel | null} Panel at the given index<ko>????????? ???????????? ???????????? ??????</ko>
   * @see Panel
   * @example
   * ```ts
   * const panel = flicking.getPanel(0);
   * // Which is a shorthand to...
   * const samePanel = flicking.panels[0];
   * ```
   */


  __proto.getPanel = function (index) {
    return this._renderer.getPanel(index);
  };
  /**
   * Enable input from the user (mouse/touch)
   * @ko ???????????? ??????(?????????/??????)??? ??????????????????
   * @return {this}
   */


  __proto.enableInput = function () {
    this._control.enable();

    return this;
  };
  /**
   * Disable input from the user (mouse/touch)
   * @ko ???????????? ??????(?????????/??????)??? ????????????
   * @return {this}
   */


  __proto.disableInput = function () {
    this._control.disable();

    return this;
  };
  /**
   * Get current flicking status. You can restore current state by giving returned value to {@link Flicking#setStatus setStatus()}
   * @ko ?????? ????????? ???????????????. ???????????? ?????? {@link Flicking#setStatus setStatus()} ???????????? ????????? ???????????? ?????? ????????? ????????? ??? ????????????
   * @param {object} options Status retrieving options<ko>Status ?????? ??????</ko>
   * @param {boolean} [options.index=true] Include current panel index to the returning status. Camera will automatically move to the given index when the {@link Flicking#setStatus setStatus} is called<ko>?????? ?????? ???????????? ???????????? ??????????????????. {@link Flicking#setStatus setStatus} ????????? ???????????? ?????? ???????????? ???????????? ???????????????</ko>
   * @param {boolean} [options.position=true] Include camera position to the returning status. This works only when the {@link Flicking#moveType moveType} is `freeScroll`<ko>???????????? ?????? ????????? ???????????? ??????????????????. ??? ????????? {@link Flicking#moveType moveType}??? `freeScroll`??? ???????????? ???????????????</ko>
   * @param {boolean} [options.includePanelHTML=false] Include panel's `outerHTML` to the returning status<ko>????????? `outerHTML`??? ???????????? ??????????????????</ko>
   * @param {boolean} [options.visiblePanelsOnly=false] Include only {@link Flicking#visiblePanel visiblePanel}'s HTML. This option is available only when the `includePanelHTML` is true
   * <ko>?????? ????????? ??????({@link Flicking#visiblePanel visiblePanel})??? HTML??? ???????????????. `includePanelHTML`??? `true`??? ???????????? ???????????????.</ko>
   * @return {Partial<Status>} An object with current status value information<ko>?????? ????????? ????????? ?????? ??????.</ko>
   */


  __proto.getStatus = function (_a) {
    var _b, _c;

    var _d = _a === void 0 ? {} : _a,
        _e = _d.index,
        index = _e === void 0 ? true : _e,
        _f = _d.position,
        position = _f === void 0 ? true : _f,
        _g = _d.includePanelHTML,
        includePanelHTML = _g === void 0 ? false : _g,
        _h = _d.visiblePanelsOnly,
        visiblePanelsOnly = _h === void 0 ? false : _h;

    var camera = this._camera;
    var panels = visiblePanelsOnly ? this.visiblePanels : this.panels;
    var status = {
      panels: panels.map(function (panel) {
        var panelInfo = {
          index: panel.index
        };

        if (includePanelHTML) {
          panelInfo.html = panel.element.outerHTML;
        }

        return panelInfo;
      })
    };

    if (index) {
      status.index = this.index;
    }

    if (position) {
      var nearestAnchor = camera.findNearestAnchor(camera.position);

      if (nearestAnchor) {
        status.position = {
          panel: nearestAnchor.panel.index,
          progressInPanel: camera.getProgressInPanel(nearestAnchor.panel)
        };
      }
    }

    if (visiblePanelsOnly) {
      var visiblePanels = this.visiblePanels;
      status.visibleOffset = (_c = (_b = visiblePanels[0]) === null || _b === void 0 ? void 0 : _b.index) !== null && _c !== void 0 ? _c : 0;
    }

    return status;
  };
  /**
   * Restore to the state of the given {@link Status}
   * @ko ????????? {@link Status}??? ????????? ???????????????
   * @param {Partial<Status>} status Status value to be restored. You should use the return value of the {@link Flicking#getStatus getStatus()} method<ko>????????? ?????? ???. {@link Flicking#getStatus getStatus()} ???????????? ???????????? ???????????? ?????????</ko>
   * @return {void}
   */


  __proto.setStatus = function (status) {
    var _a;

    if (!this._initialized) {
      throw new FlickingError(MESSAGE.NOT_INITIALIZED, CODE.NOT_INITIALIZED);
    }

    var index = status.index,
        position = status.position,
        visibleOffset = status.visibleOffset,
        panels = status.panels;
    var renderer = this._renderer;
    var control = this._control; // Can't add/remove panels on external rendering

    if (((_a = panels[0]) === null || _a === void 0 ? void 0 : _a.html) && !this._renderExternal) {
      renderer.batchRemove({
        index: 0,
        deleteCount: this.panels.length
      });
      renderer.batchInsert({
        index: 0,
        elements: parseElement(panels.map(function (panel) {
          return panel.html;
        }))
      });
    }

    if (index) {
      var panelIndex = visibleOffset ? index - visibleOffset : index;
      void this.moveTo(panelIndex, 0).catch(function () {
        return void 0;
      });
    }

    if (position && this._moveType === MOVE_TYPE.FREE_SCROLL) {
      var panel = position.panel,
          progressInPanel = position.progressInPanel;
      var panelIndex = visibleOffset ? panel - visibleOffset : panel;
      var panelRange = renderer.panels[panelIndex].range;
      var newCameraPos = panelRange.min + (panelRange.max - panelRange.min) * progressInPanel;
      void control.moveToPosition(newCameraPos, 0).catch(function () {
        return void 0;
      });
    }
  };
  /**
   * Add plugins that can have different effects on Flicking
   * @ko ???????????? ????????? ????????? ????????? ??? ?????? ??????????????? ???????????????
   * @param {...Plugin} plugins The plugin(s) to add<ko>????????? ????????????(???)</ko>
   * @return {this}
   * @see https://github.com/naver/egjs-flicking-plugins
   */


  __proto.addPlugins = function () {
    var _a;

    var _this = this;

    var plugins = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      plugins[_i] = arguments[_i];
    }

    if (this._initialized) {
      plugins.forEach(function (item) {
        return item.init(_this);
      });
    }

    (_a = this._plugins).push.apply(_a, __spreadArray([], __read(plugins)));

    return this;
  };
  /**
   * Remove plugins from Flicking.
   * @ko ????????????????????? ?????????????????? ???????????????.
   * @param {...Plugin} plugin The plugin(s) to remove.<ko>?????? ????????????(???).</ko>
   * @return {this}
   * @see https://github.com/naver/egjs-flicking-plugins
   */


  __proto.removePlugins = function () {
    var _this = this;

    var plugins = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      plugins[_i] = arguments[_i];
    }

    plugins.forEach(function (item) {
      var foundIndex = findIndex(_this._plugins, function (val) {
        return val === item;
      });

      if (foundIndex >= 0) {
        item.destroy();

        _this._plugins.splice(foundIndex, 1);
      }
    });
    return this;
  };
  /**
   * Update viewport/panel sizes
   * @ko ?????? ??? ???????????? ????????? ???????????????
   * @method
   * @fires Flicking#beforeResize
   * @fires Flicking#afterResize
   * @return {this}
   */


  __proto.resize = function () {
    return __awaiter(this, void 0, void 0, function () {
      var viewport, renderer, camera, control, activePanel, prevWidth, prevHeight, prevProgressInPanel, newWidth, newHeight, sizeChanged;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            viewport = this._viewport;
            renderer = this._renderer;
            camera = this._camera;
            control = this._control;
            activePanel = control.activePanel;
            prevWidth = viewport.width;
            prevHeight = viewport.height;
            prevProgressInPanel = activePanel ? camera.getProgressInPanel(activePanel) : 0;
            this.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.BEFORE_RESIZE, {
              width: prevWidth,
              height: prevHeight,
              element: viewport.element
            }));
            viewport.resize();
            return [4
            /*yield*/
            , renderer.forceRenderAllPanels()];

          case 1:
            _a.sent(); // Render all panel elements, to update sizes


            renderer.updatePanelSize();
            camera.updateAlignPos();
            camera.updateRange();
            camera.updateAnchors();
            return [4
            /*yield*/
            , renderer.render()];

          case 2:
            _a.sent();

            if (!control.animating) return [3
            /*break*/
            , 3];
            return [3
            /*break*/
            , 5];

          case 3:
            return [4
            /*yield*/
            , control.updatePosition(prevProgressInPanel)];

          case 4:
            _a.sent();

            control.updateInput();
            _a.label = 5;

          case 5:
            newWidth = viewport.width;
            newHeight = viewport.height;
            sizeChanged = newWidth !== prevWidth || newHeight !== prevHeight;
            this.trigger(new _egjs_component__WEBPACK_IMPORTED_MODULE_0__.ComponentEvent(EVENTS.AFTER_RESIZE, {
              width: viewport.width,
              height: viewport.height,
              prev: {
                width: prevWidth,
                height: prevHeight
              },
              sizeChanged: sizeChanged,
              element: viewport.element
            }));
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * Add new panels after the last panel
   * @ko ?????? ????????? ?????? ?????? ????????? ???????????? ???????????????
   * @param {ElementLike | ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
   * <ko>????????? HTMLElement, ?????? ??????????????? outerHTML, ?????? ???????????? ??????</ko>
   * @return {Panel[]} An array of appended panels<ko>????????? ???????????? ??????</ko>
   * @see Panel
   * @see ElementLike
   * @throws {FlickingError} {@link ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
   * @example
   * ```ts
   * const flicking = new Flicking("#flick");
   * // These are possible parameters
   * flicking.append(document.createElement("div"));
   * flicking.append("\<div\>Panel\</div\>");
   * flicking.append(["\<div\>Panel\</div\>", document.createElement("div")]);
   * // Even this is possible
   * flicking.append("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
   * ```
   */


  __proto.append = function (element) {
    return this.insert(this._renderer.panelCount, element);
  };
  /**
   * Add new panels before the first panel
   * This will increase index of panels after by the number of panels added
   * @ko ?????? ????????? ?????? ???(index 0)??? ????????? ???????????? ???????????????
   * ????????? ????????? ???????????? ?????? ???????????? ???????????? ???????????????.
   * @param {ElementLike | ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
   * <ko>????????? HTMLElement, ?????? ??????????????? outerHTML, ?????? ???????????? ??????</ko>
   * @return {Panel[]} An array of prepended panels<ko>????????? ???????????? ??????</ko>
   * @see Panel
   * @see ElementLike
   * @throws {FlickingError} {@link ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
   * @example
   * ```ts
   * const flicking = new eg.Flicking("#flick");
   * flicking.prepend(document.createElement("div"));
   * flicking.prepend("\<div\>Panel\</div\>");
   * flicking.prepend(["\<div\>Panel\</div\>", document.createElement("div")]);
   * // Even this is possible
   * flicking.prepend("\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
   * ```
   */


  __proto.prepend = function (element) {
    return this.insert(0, element);
  };
  /**
   * Insert new panels at given index
   * This will increase index of panels after by the number of panels added
   * @ko ????????? ???????????? ????????? ???????????? ???????????????
   * ?????? ??????????????? ????????? ??? ???????????? ?????? ?????? ???????????? ????????? ????????? ???????????? ???????????? ???????????????.
   * @param {number} index Index to insert new panels at<ko>?????? ???????????? ????????? ?????????</ko>
   * @param {ElementLike | ElementLike[]} element A new HTMLElement, a outerHTML of element, or an array of both
   * <ko>????????? HTMLElement, ?????? ??????????????? outerHTML, ?????? ???????????? ??????</ko>
   * @return {Panel[]} An array of prepended panels<ko>????????? ???????????? ??????</ko>
   * @throws {FlickingError} {@link ERROR_CODE ERROR_CODE.NOT_ALLOWED_IN_FRAMEWORK} if called on frameworks (React, Angular, Vue...)
   * @example
   * ```ts
   * const flicking = new eg.Flicking("#flick");
   * flicking.insert(0, document.createElement("div"));
   * flicking.insert(2, "\<div\>Panel\</div\>");
   * flicking.insert(1, ["\<div\>Panel\</div\>", document.createElement("div")]);
   * // Even this is possible
   * flicking.insert(3, "\<div\>Panel 1\</div\>\<div\>Panel 2\</div\>");
   * ```
   */


  __proto.insert = function (index, element) {
    if (this._renderExternal) {
      throw new FlickingError(MESSAGE.NOT_ALLOWED_IN_FRAMEWORK, CODE.NOT_ALLOWED_IN_FRAMEWORK);
    }

    return this._renderer.batchInsert({
      index: index,
      elements: parseElement(element)
    });
  };
  /**
   * Remove the panel at the given index
   * This will decrease index of panels after by the number of panels removed
   * @ko ????????? ???????????? ????????? ???????????????
   * ?????? ??????????????? ??? ???????????? ?????? ?????? ???????????? ????????? ????????? ???????????? ???????????? ???????????????
   * @param {number} index Index of panel to remove<ko>????????? ????????? ?????????</ko>
   * @param {number} [deleteCount=1] Number of panels to remove from index<ko>`index` ????????? ????????? ????????? ??????</ko>
   * @return {Panel[]} An array of removed panels<ko>????????? ???????????? ??????</ko>
   */


  __proto.remove = function (index, deleteCount) {
    if (deleteCount === void 0) {
      deleteCount = 1;
    }

    if (this._renderExternal) {
      throw new FlickingError(MESSAGE.NOT_ALLOWED_IN_FRAMEWORK, CODE.NOT_ALLOWED_IN_FRAMEWORK);
    }

    return this._renderer.batchRemove({
      index: index,
      deleteCount: deleteCount
    });
  };

  __proto._createControl = function () {
    var _a;

    var moveType = this._moveType;
    var moveTypes = Object.keys(MOVE_TYPE).map(function (key) {
      return MOVE_TYPE[key];
    });
    var moveTypeStr = Array.isArray(moveType) ? moveType[0] : moveType;
    var moveTypeOptions = Array.isArray(moveType) ? (_a = moveType[1]) !== null && _a !== void 0 ? _a : {} : {};

    if (!includes(moveTypes, moveTypeStr)) {
      throw new FlickingError(MESSAGE.WRONG_OPTION("moveType", JSON.stringify(moveType)), CODE.WRONG_OPTION);
    }

    switch (moveTypeStr) {
      case MOVE_TYPE.SNAP:
        return new SnapControl(moveTypeOptions);

      case MOVE_TYPE.FREE_SCROLL:
        return new FreeControl(moveTypeOptions);

      case MOVE_TYPE.STRICT:
        return new StrictControl(moveTypeOptions);
    }
  };

  __proto._createCamera = function () {
    var cameraOption = {
      align: this._align
    };

    if (this._circular) {
      if (this._bound) {
        // eslint-disable-next-line no-console
        console.warn("\"circular\" and \"bound\" option cannot be used together, ignoring bound.");
      }

      return new CircularCamera(cameraOption);
    } else if (this._bound) {
      return new BoundCamera(cameraOption);
    } else {
      return new LinearCamera(cameraOption);
    }
  };

  __proto._createRenderer = function () {
    var rendererOptions = {
      align: this._align
    };
    var renderExternal = this._renderExternal;
    return renderExternal ? new renderExternal.renderer(__assign(__assign({}, rendererOptions), renderExternal.rendererOptions)) : new VanillaRenderer(rendererOptions);
  };

  __proto._moveToInitialPanel = function () {
    return __awaiter(this, void 0, void 0, function () {
      var renderer, control, initialPanel;
      return __generator(this, function (_a) {
        renderer = this._renderer;
        control = this._control;
        initialPanel = renderer.getPanel(this._defaultIndex) || renderer.getPanel(0);
        if (!initialPanel) return [2
        /*return*/
        ];
        return [2
        /*return*/
        , control.moveToPanel(initialPanel, {
          duration: 0
        })];
      });
    });
  };
  /**
   * Version info string
   * @ko ???????????? ?????????
   * @type {string}
   * @readonly
   * @example
   * ```ts
   * Flicking.VERSION;  // ex) 4.0.0
   * ```
   */


  Flicking.VERSION = "4.2.3";
  return Flicking;
}(_egjs_component__WEBPACK_IMPORTED_MODULE_0__.default);

/**
 * An slide data component that holds information of a single HTMLElement
 * @ko ???????????? ????????? ???????????????, ?????? HTMLElement??? ????????? ?????? ????????????
 */

var ExternalPanel = function (_super) {
  __extends(ExternalPanel, _super);
  /**
   * @param {object} options An options object<ko>?????? ????????????</ko>
   * @param {HTMLElement} [options.el] A `HTMLElement` panel's referencing<ko>????????? ???????????? `HTMLElement`</ko>
   * @param {number} [options.index] An initial index of the panel<ko>????????? ?????? ?????????</ko>
   * @param {Constants.ALIGN | string | number} [options.align] An initial {@link Flicking#align align} value of the panel<ko>????????? ?????? {@link Flicking#align align}???</ko>
   * @param {Flicking} [options.flicking] A Flicking instance panel's referencing<ko>????????? ???????????? {@link Flicking} ????????????</ko>
   */


  function ExternalPanel(options) {
    var _this = _super.call(this, options) || this;

    _this._externalComponent = options.externalComponent;
    return _this;
  }

  return ExternalPanel;
}(Panel);

/**
 * Decorator that makes the method of flicking available in the framework.
 * @ko ????????????????????? ???????????? ???????????? ????????? ??? ?????? ?????? ???????????????.
 * @memberof eg.Flicking
 * @private
 * @example
 * ```js
 * import Flicking, { withFlickingMethods } from "@egjs/flicking";
 *
 * class Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>> {
 *   &#64;withFlickingMethods
 *   private flicking: Flicking;
 * }
 * ```
 */

var withFlickingMethods = function (prototype, flickingName) {
  [_egjs_component__WEBPACK_IMPORTED_MODULE_0__.default.prototype, Flicking.prototype].forEach(function (proto) {
    Object.getOwnPropertyNames(proto).filter(function (name) {
      return !prototype[name] && !name.startsWith("_") && name !== "constructor";
    }).forEach(function (name) {
      var descriptor = Object.getOwnPropertyDescriptor(proto, name);

      if (descriptor.value) {
        // Public Function
        Object.defineProperty(prototype, name, {
          value: function () {
            var _a;

            var args = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }

            return (_a = descriptor.value).call.apply(_a, __spreadArray([this[flickingName]], __read(args)));
          }
        });
      } else {
        var getterDescriptor = {};

        if (descriptor.get) {
          getterDescriptor.get = function () {
            var _a;

            return (_a = descriptor.get) === null || _a === void 0 ? void 0 : _a.call(this[flickingName]);
          };
        }

        if (descriptor.set) {
          getterDescriptor.set = function () {
            var _a;

            var args = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }

            return (_a = descriptor.set) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([this[flickingName]], __read(args)));
          };
        }

        Object.defineProperty(prototype, name, getterDescriptor);
      }
    });
  });
};

var sync = (function (flicking, diffResult, rendered) {
  var renderer = flicking.renderer;

  if (diffResult.removed.length > 0) {
    var endIdx_1 = -1;
    var prevIdx_1 = -1;
    diffResult.removed.forEach(function (removedIdx) {
      if (endIdx_1 < 0) {
        endIdx_1 = removedIdx;
      }

      if (prevIdx_1 >= 0 && removedIdx !== prevIdx_1 - 1) {
        batchRemove(renderer, prevIdx_1, endIdx_1 + 1);
        endIdx_1 = removedIdx;
        prevIdx_1 = removedIdx;
      } else {
        prevIdx_1 = removedIdx;
      }
    });
    batchRemove(renderer, prevIdx_1, endIdx_1 + 1);
  }

  diffResult.ordered.forEach(function (_a) {
    var _b = __read(_a, 2),
        prevIdx = _b[0],
        newIdx = _b[1];

    var prevPanel = renderer.panels[prevIdx];
    var indexDiff = newIdx - prevIdx;

    if (indexDiff > 0) {
      prevPanel.increaseIndex(indexDiff);
    } else {
      prevPanel.decreaseIndex(-indexDiff);
    } // Update position


    prevPanel.resize();
  });

  if (diffResult.added.length > 0) {
    var startIdx_1 = -1;
    var prevIdx_2 = -1;
    diffResult.added.forEach(function (addedIdx, idx) {
      if (startIdx_1 < 0) {
        startIdx_1 = idx;
      }

      if (prevIdx_2 >= 0 && addedIdx !== prevIdx_2 + 1) {
        batchInsert(renderer, diffResult, rendered, startIdx_1, idx + 1);
        startIdx_1 = -1;
        prevIdx_2 = -1;
      } else {
        prevIdx_2 = addedIdx;
      }
    });

    if (startIdx_1 >= 0) {
      batchInsert(renderer, diffResult, rendered, startIdx_1);
    }
  }
});

var batchInsert = function (renderer, diffResult, rendered, startIdx, endIdx) {
  renderer.batchInsert.apply(renderer, __spreadArray([], __read(diffResult.added.slice(startIdx, endIdx).map(function (index, elIdx) {
    return {
      index: index,
      elements: [rendered[elIdx + diffResult.prevList.length]]
    };
  }))));
};

var batchRemove = function (renderer, startIdx, endIdx) {
  var removed = renderer.panels.slice(startIdx, endIdx);
  renderer.batchRemove({
    index: startIdx,
    deleteCount: removed.length
  });
};

var getRenderingPanels = (function (flicking, diffResult) {
  var removedPanels = diffResult.removed.reduce(function (map, idx) {
    map[idx] = true;
    return map;
  }, {});
  return __spreadArray(__spreadArray([], __read(flicking.panels.filter(function (panel) {
    return !removedPanels[panel.index];
  }) // Sort panels by position
  .sort(function (panel1, panel2) {
    return panel1.position + panel1.offset - (panel2.position + panel2.offset);
  }).map(function (panel) {
    return diffResult.prevList[panel.index];
  }))), __read(diffResult.added.map(function (idx) {
    return diffResult.list[idx];
  })));
});

var getDefaultCameraTransform = (function (align, horizontal, firstPanelSize) {
  if (align === void 0) {
    align = ALIGN.CENTER;
  }

  if (horizontal === void 0) {
    horizontal = true;
  }

  var cameraAlign = getCameraAlign(align);
  var panelAlign = getPanelAlign(align);
  if (panelAlign == null) return "";
  var camPosition = "calc(" + cameraAlign + " - (" + (firstPanelSize || "0px") + " * " + panelAlign.percentage + ") - " + panelAlign.absolute + "px)";
  return horizontal ? "translate(" + camPosition + ")" : "translate(0, " + camPosition + ")";
});

var getCameraAlign = function (align) {
  var alignVal = typeof align === "object" ? align.camera : align;
  return parseAlign(alignVal);
};

var getPanelAlign = function (align) {
  var alignVal = typeof align === "object" ? align.panel : align;
  return parseArithmeticExpression(parseAlign(alignVal));
};

var parseAlign = function (alignVal) {
  if (typeof alignVal === "number") {
    return alignVal + "px";
  }

  switch (alignVal) {
    case ALIGN.CENTER:
      return "50%";

    case ALIGN.NEXT:
      return "100%";

    case ALIGN.PREV:
      return "0%";

    default:
      return alignVal;
  }
};

/*
 * Copyright (c) 2015 NAVER Corp.
 * egjs projects are licensed under the MIT license
 */


//# sourceMappingURL=flicking.esm.js.map


/***/ }),

/***/ "./node_modules/@egjs/hammerjs/dist/hammer.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/@egjs/hammerjs/dist/hammer.esm.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "INPUT_START": () => (/* binding */ INPUT_START),
/* harmony export */   "INPUT_MOVE": () => (/* binding */ INPUT_MOVE),
/* harmony export */   "INPUT_END": () => (/* binding */ INPUT_END),
/* harmony export */   "INPUT_CANCEL": () => (/* binding */ INPUT_CANCEL),
/* harmony export */   "STATE_POSSIBLE": () => (/* binding */ STATE_POSSIBLE),
/* harmony export */   "STATE_BEGAN": () => (/* binding */ STATE_BEGAN),
/* harmony export */   "STATE_CHANGED": () => (/* binding */ STATE_CHANGED),
/* harmony export */   "STATE_ENDED": () => (/* binding */ STATE_ENDED),
/* harmony export */   "STATE_RECOGNIZED": () => (/* binding */ STATE_RECOGNIZED),
/* harmony export */   "STATE_CANCELLED": () => (/* binding */ STATE_CANCELLED),
/* harmony export */   "STATE_FAILED": () => (/* binding */ STATE_FAILED),
/* harmony export */   "DIRECTION_NONE": () => (/* binding */ DIRECTION_NONE),
/* harmony export */   "DIRECTION_LEFT": () => (/* binding */ DIRECTION_LEFT),
/* harmony export */   "DIRECTION_RIGHT": () => (/* binding */ DIRECTION_RIGHT),
/* harmony export */   "DIRECTION_UP": () => (/* binding */ DIRECTION_UP),
/* harmony export */   "DIRECTION_DOWN": () => (/* binding */ DIRECTION_DOWN),
/* harmony export */   "DIRECTION_HORIZONTAL": () => (/* binding */ DIRECTION_HORIZONTAL),
/* harmony export */   "DIRECTION_VERTICAL": () => (/* binding */ DIRECTION_VERTICAL),
/* harmony export */   "DIRECTION_ALL": () => (/* binding */ DIRECTION_ALL),
/* harmony export */   "Manager": () => (/* binding */ Manager),
/* harmony export */   "Input": () => (/* binding */ Input),
/* harmony export */   "TouchAction": () => (/* binding */ TouchAction),
/* harmony export */   "TouchInput": () => (/* binding */ TouchInput),
/* harmony export */   "MouseInput": () => (/* binding */ MouseInput),
/* harmony export */   "PointerEventInput": () => (/* binding */ PointerEventInput),
/* harmony export */   "TouchMouseInput": () => (/* binding */ TouchMouseInput),
/* harmony export */   "SingleTouchInput": () => (/* binding */ SingleTouchInput),
/* harmony export */   "Recognizer": () => (/* binding */ Recognizer),
/* harmony export */   "AttrRecognizer": () => (/* binding */ AttrRecognizer),
/* harmony export */   "Tap": () => (/* binding */ TapRecognizer),
/* harmony export */   "Pan": () => (/* binding */ PanRecognizer),
/* harmony export */   "Swipe": () => (/* binding */ SwipeRecognizer),
/* harmony export */   "Pinch": () => (/* binding */ PinchRecognizer),
/* harmony export */   "Rotate": () => (/* binding */ RotateRecognizer),
/* harmony export */   "Press": () => (/* binding */ PressRecognizer),
/* harmony export */   "on": () => (/* binding */ addEventListeners),
/* harmony export */   "off": () => (/* binding */ removeEventListeners),
/* harmony export */   "each": () => (/* binding */ each),
/* harmony export */   "merge": () => (/* binding */ merge),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "assign": () => (/* binding */ assign$1),
/* harmony export */   "inherit": () => (/* binding */ inherit),
/* harmony export */   "bindFn": () => (/* binding */ bindFn),
/* harmony export */   "prefixed": () => (/* binding */ prefixed),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "inArray": () => (/* binding */ inArray),
/* harmony export */   "uniqueArray": () => (/* binding */ uniqueArray),
/* harmony export */   "splitStr": () => (/* binding */ splitStr),
/* harmony export */   "boolOrFn": () => (/* binding */ boolOrFn),
/* harmony export */   "hasParent": () => (/* binding */ hasParent),
/* harmony export */   "addEventListeners": () => (/* binding */ addEventListeners),
/* harmony export */   "removeEventListeners": () => (/* binding */ removeEventListeners),
/* harmony export */   "defaults": () => (/* binding */ defaults$1)
/* harmony export */ });
/*! Hammer.JS - v2.0.17-rc - 2019-12-16
 * http://naver.github.io/egjs
 *
 * Forked By Naver egjs
 * Copyright (c) hammerjs
 * Licensed under the MIT license */
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/**
 * @private
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;

if (typeof Object.assign !== 'function') {
  assign = function assign(target) {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var output = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];

      if (source !== undefined && source !== null) {
        for (var nextKey in source) {
          if (source.hasOwnProperty(nextKey)) {
            output[nextKey] = source[nextKey];
          }
        }
      }
    }

    return output;
  };
} else {
  assign = Object.assign;
}

var assign$1 = assign;

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = typeof document === "undefined" ? {
  style: {}
} : document.createElement('div');
var TYPE_FUNCTION = 'function';
var round = Math.round,
    abs = Math.abs;
var now = Date.now;

/**
 * @private
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */

function prefixed(obj, property) {
  var prefix;
  var prop;
  var camelProp = property[0].toUpperCase() + property.slice(1);
  var i = 0;

  while (i < VENDOR_PREFIXES.length) {
    prefix = VENDOR_PREFIXES[i];
    prop = prefix ? prefix + camelProp : property;

    if (prop in obj) {
      return prop;
    }

    i++;
  }

  return undefined;
}

/* eslint-disable no-new-func, no-nested-ternary */
var win;

if (typeof window === "undefined") {
  // window is undefined in node.js
  win = {};
} else {
  win = window;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
function getTouchActionProps() {
  if (!NATIVE_TOUCH_ACTION) {
    return false;
  }

  var touchMap = {};
  var cssSupports = win.CSS && win.CSS.supports;
  ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {
    // If css.supports is not supported but there is native touch-action assume it supports
    // all values. This is the case for IE 10 and 11.
    return touchMap[val] = cssSupports ? win.CSS.supports('touch-action', val) : true;
  });
  return touchMap;
}

var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
var SUPPORT_TOUCH = 'ontouchstart' in win;
var SUPPORT_POINTER_EVENTS = prefixed(win, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';
var COMPUTE_INTERVAL = 25;
var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;
var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;
var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * @private
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
  var i;

  if (!obj) {
    return;
  }

  if (obj.forEach) {
    obj.forEach(iterator, context);
  } else if (obj.length !== undefined) {
    i = 0;

    while (i < obj.length) {
      iterator.call(context, obj[i], i, obj);
      i++;
    }
  } else {
    for (i in obj) {
      obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
    }
  }
}

/**
 * @private
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */

function boolOrFn(val, args) {
  if (typeof val === TYPE_FUNCTION) {
    return val.apply(args ? args[0] || undefined : undefined, args);
  }

  return val;
}

/**
 * @private
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
  return str.indexOf(find) > -1;
}

/**
 * @private
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */

function cleanTouchActions(actions) {
  // none
  if (inStr(actions, TOUCH_ACTION_NONE)) {
    return TOUCH_ACTION_NONE;
  }

  var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
  var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
  // for different directions, e.g. horizontal pan but vertical swipe?)
  // we need none (as otherwise with pan-x pan-y combined none of these
  // recognizers will work, since the browser would handle all panning

  if (hasPanX && hasPanY) {
    return TOUCH_ACTION_NONE;
  } // pan-x OR pan-y


  if (hasPanX || hasPanY) {
    return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
  } // manipulation


  if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
    return TOUCH_ACTION_MANIPULATION;
  }

  return TOUCH_ACTION_AUTO;
}

/**
 * @private
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */

var TouchAction =
/*#__PURE__*/
function () {
  function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
  }
  /**
   * @private
   * set the touchAction value on the element or enable the polyfill
   * @param {String} value
   */


  var _proto = TouchAction.prototype;

  _proto.set = function set(value) {
    // find out the touch-action by the event handlers
    if (value === TOUCH_ACTION_COMPUTE) {
      value = this.compute();
    }

    if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
      this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
    }

    this.actions = value.toLowerCase().trim();
  };
  /**
   * @private
   * just re-set the touchAction value
   */


  _proto.update = function update() {
    this.set(this.manager.options.touchAction);
  };
  /**
   * @private
   * compute the value for the touchAction property based on the recognizer's settings
   * @returns {String} value
   */


  _proto.compute = function compute() {
    var actions = [];
    each(this.manager.recognizers, function (recognizer) {
      if (boolOrFn(recognizer.options.enable, [recognizer])) {
        actions = actions.concat(recognizer.getTouchAction());
      }
    });
    return cleanTouchActions(actions.join(' '));
  };
  /**
   * @private
   * this method is called on each input cycle and provides the preventing of the browser behavior
   * @param {Object} input
   */


  _proto.preventDefaults = function preventDefaults(input) {
    var srcEvent = input.srcEvent;
    var direction = input.offsetDirection; // if the touch action did prevented once this session

    if (this.manager.session.prevented) {
      srcEvent.preventDefault();
      return;
    }

    var actions = this.actions;
    var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

    if (hasNone) {
      // do not prevent defaults if this is a tap gesture
      var isTapPointer = input.pointers.length === 1;
      var isTapMovement = input.distance < 2;
      var isTapTouchTime = input.deltaTime < 250;

      if (isTapPointer && isTapMovement && isTapTouchTime) {
        return;
      }
    }

    if (hasPanX && hasPanY) {
      // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
      return;
    }

    if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
      return this.preventSrc(srcEvent);
    }
  };
  /**
   * @private
   * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
   * @param {Object} srcEvent
   */


  _proto.preventSrc = function preventSrc(srcEvent) {
    this.manager.session.prevented = true;
    srcEvent.preventDefault();
  };

  return TouchAction;
}();

/**
 * @private
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
  while (node) {
    if (node === parent) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}

/**
 * @private
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */

function getCenter(pointers) {
  var pointersLength = pointers.length; // no need to loop when only one touch

  if (pointersLength === 1) {
    return {
      x: round(pointers[0].clientX),
      y: round(pointers[0].clientY)
    };
  }

  var x = 0;
  var y = 0;
  var i = 0;

  while (i < pointersLength) {
    x += pointers[i].clientX;
    y += pointers[i].clientY;
    i++;
  }

  return {
    x: round(x / pointersLength),
    y: round(y / pointersLength)
  };
}

/**
 * @private
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */

function simpleCloneInputData(input) {
  // make a simple copy of the pointers because we will get a reference if we don't
  // we only need clientXY for the calculations
  var pointers = [];
  var i = 0;

  while (i < input.pointers.length) {
    pointers[i] = {
      clientX: round(input.pointers[i].clientX),
      clientY: round(input.pointers[i].clientY)
    };
    i++;
  }

  return {
    timeStamp: now(),
    pointers: pointers,
    center: getCenter(pointers),
    deltaX: input.deltaX,
    deltaY: input.deltaY
  };
}

/**
 * @private
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */

function getDistance(p1, p2, props) {
  if (!props) {
    props = PROPS_XY;
  }

  var x = p2[props[0]] - p1[props[0]];
  var y = p2[props[1]] - p1[props[1]];
  return Math.sqrt(x * x + y * y);
}

/**
 * @private
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */

function getAngle(p1, p2, props) {
  if (!props) {
    props = PROPS_XY;
  }

  var x = p2[props[0]] - p1[props[0]];
  var y = p2[props[1]] - p1[props[1]];
  return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * @private
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */

function getDirection(x, y) {
  if (x === y) {
    return DIRECTION_NONE;
  }

  if (abs(x) >= abs(y)) {
    return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
  }

  return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

function computeDeltaXY(session, input) {
  var center = input.center; // let { offsetDelta:offset = {}, prevDelta = {}, prevInput = {} } = session;
  // jscs throwing error on defalut destructured values and without defaults tests fail

  var offset = session.offsetDelta || {};
  var prevDelta = session.prevDelta || {};
  var prevInput = session.prevInput || {};

  if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
    prevDelta = session.prevDelta = {
      x: prevInput.deltaX || 0,
      y: prevInput.deltaY || 0
    };
    offset = session.offsetDelta = {
      x: center.x,
      y: center.y
    };
  }

  input.deltaX = prevDelta.x + (center.x - offset.x);
  input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * @private
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
  return {
    x: x / deltaTime || 0,
    y: y / deltaTime || 0
  };
}

/**
 * @private
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */

function getScale(start, end) {
  return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

/**
 * @private
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */

function getRotation(start, end) {
  return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * @private
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */

function computeIntervalInputData(session, input) {
  var last = session.lastInterval || input;
  var deltaTime = input.timeStamp - last.timeStamp;
  var velocity;
  var velocityX;
  var velocityY;
  var direction;

  if (input.eventType !== INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
    var deltaX = input.deltaX - last.deltaX;
    var deltaY = input.deltaY - last.deltaY;
    var v = getVelocity(deltaTime, deltaX, deltaY);
    velocityX = v.x;
    velocityY = v.y;
    velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
    direction = getDirection(deltaX, deltaY);
    session.lastInterval = input;
  } else {
    // use latest velocity info if it doesn't overtake a minimum period
    velocity = last.velocity;
    velocityX = last.velocityX;
    velocityY = last.velocityY;
    direction = last.direction;
  }

  input.velocity = velocity;
  input.velocityX = velocityX;
  input.velocityY = velocityY;
  input.direction = direction;
}

/**
* @private
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */

function computeInputData(manager, input) {
  var session = manager.session;
  var pointers = input.pointers;
  var pointersLength = pointers.length; // store the first input to calculate the distance and direction

  if (!session.firstInput) {
    session.firstInput = simpleCloneInputData(input);
  } // to compute scale and rotation we need to store the multiple touches


  if (pointersLength > 1 && !session.firstMultiple) {
    session.firstMultiple = simpleCloneInputData(input);
  } else if (pointersLength === 1) {
    session.firstMultiple = false;
  }

  var firstInput = session.firstInput,
      firstMultiple = session.firstMultiple;
  var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
  var center = input.center = getCenter(pointers);
  input.timeStamp = now();
  input.deltaTime = input.timeStamp - firstInput.timeStamp;
  input.angle = getAngle(offsetCenter, center);
  input.distance = getDistance(offsetCenter, center);
  computeDeltaXY(session, input);
  input.offsetDirection = getDirection(input.deltaX, input.deltaY);
  var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
  input.overallVelocityX = overallVelocity.x;
  input.overallVelocityY = overallVelocity.y;
  input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
  input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
  input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
  input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
  computeIntervalInputData(session, input); // find the correct target

  var target = manager.element;
  var srcEvent = input.srcEvent;
  var srcEventTarget;

  if (srcEvent.composedPath) {
    srcEventTarget = srcEvent.composedPath()[0];
  } else if (srcEvent.path) {
    srcEventTarget = srcEvent.path[0];
  } else {
    srcEventTarget = srcEvent.target;
  }

  if (hasParent(srcEventTarget, target)) {
    target = srcEventTarget;
  }

  input.target = target;
}

/**
 * @private
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */

function inputHandler(manager, eventType, input) {
  var pointersLen = input.pointers.length;
  var changedPointersLen = input.changedPointers.length;
  var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
  var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
  input.isFirst = !!isFirst;
  input.isFinal = !!isFinal;

  if (isFirst) {
    manager.session = {};
  } // source event is the normalized value of the domEvents
  // like 'touchstart, mouseup, pointerdown'


  input.eventType = eventType; // compute scale, rotation etc

  computeInputData(manager, input); // emit secret event

  manager.emit('hammer.input', input);
  manager.recognize(input);
  manager.session.prevInput = input;
}

/**
 * @private
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
  return str.trim().split(/\s+/g);
}

/**
 * @private
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */

function addEventListeners(target, types, handler) {
  each(splitStr(types), function (type) {
    target.addEventListener(type, handler, false);
  });
}

/**
 * @private
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */

function removeEventListeners(target, types, handler) {
  each(splitStr(types), function (type) {
    target.removeEventListener(type, handler, false);
  });
}

/**
 * @private
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
  var doc = element.ownerDocument || element;
  return doc.defaultView || doc.parentWindow || window;
}

/**
 * @private
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */

var Input =
/*#__PURE__*/
function () {
  function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.

    this.domHandler = function (ev) {
      if (boolOrFn(manager.options.enable, [manager])) {
        self.handler(ev);
      }
    };

    this.init();
  }
  /**
   * @private
   * should handle the inputEvent data and trigger the callback
   * @virtual
   */


  var _proto = Input.prototype;

  _proto.handler = function handler() {};
  /**
   * @private
   * bind the events
   */


  _proto.init = function init() {
    this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
    this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
    this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
  };
  /**
   * @private
   * unbind the events
   */


  _proto.destroy = function destroy() {
    this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
    this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
    this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
  };

  return Input;
}();

/**
 * @private
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
  if (src.indexOf && !findByKey) {
    return src.indexOf(find);
  } else {
    var i = 0;

    while (i < src.length) {
      if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
        // do not use === here, test fails
        return i;
      }

      i++;
    }

    return -1;
  }
}

var POINTER_INPUT_MAP = {
  pointerdown: INPUT_START,
  pointermove: INPUT_MOVE,
  pointerup: INPUT_END,
  pointercancel: INPUT_CANCEL,
  pointerout: INPUT_CANCEL
}; // in IE10 the pointer types is defined as an enum

var IE10_POINTER_TYPE_ENUM = {
  2: INPUT_TYPE_TOUCH,
  3: INPUT_TYPE_PEN,
  4: INPUT_TYPE_MOUSE,
  5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816

};
var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel'; // IE10 has prefixed support, and case-sensitive

if (win.MSPointerEvent && !win.PointerEvent) {
  POINTER_ELEMENT_EVENTS = 'MSPointerDown';
  POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}
/**
 * @private
 * Pointer events input
 * @constructor
 * @extends Input
 */


var PointerEventInput =
/*#__PURE__*/
function (_Input) {
  _inheritsLoose(PointerEventInput, _Input);

  function PointerEventInput() {
    var _this;

    var proto = PointerEventInput.prototype;
    proto.evEl = POINTER_ELEMENT_EVENTS;
    proto.evWin = POINTER_WINDOW_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.store = _this.manager.session.pointerEvents = [];
    return _this;
  }
  /**
   * @private
   * handle mouse events
   * @param {Object} ev
   */


  var _proto = PointerEventInput.prototype;

  _proto.handler = function handler(ev) {
    var store = this.store;
    var removePointer = false;
    var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
    var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
    var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
    var isTouch = pointerType === INPUT_TYPE_TOUCH; // get index of the event in the store

    var storeIndex = inArray(store, ev.pointerId, 'pointerId'); // start and mouse must be down

    if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
      if (storeIndex < 0) {
        store.push(ev);
        storeIndex = store.length - 1;
      }
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
      removePointer = true;
    } // it not found, so the pointer hasn't been down (so it's probably a hover)


    if (storeIndex < 0) {
      return;
    } // update the event in the store


    store[storeIndex] = ev;
    this.callback(this.manager, eventType, {
      pointers: store,
      changedPointers: [ev],
      pointerType: pointerType,
      srcEvent: ev
    });

    if (removePointer) {
      // remove from the store
      store.splice(storeIndex, 1);
    }
  };

  return PointerEventInput;
}(Input);

/**
 * @private
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
  return Array.prototype.slice.call(obj, 0);
}

/**
 * @private
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */

function uniqueArray(src, key, sort) {
  var results = [];
  var values = [];
  var i = 0;

  while (i < src.length) {
    var val = key ? src[i][key] : src[i];

    if (inArray(values, val) < 0) {
      results.push(src[i]);
    }

    values[i] = val;
    i++;
  }

  if (sort) {
    if (!key) {
      results = results.sort();
    } else {
      results = results.sort(function (a, b) {
        return a[key] > b[key];
      });
    }
  }

  return results;
}

var TOUCH_INPUT_MAP = {
  touchstart: INPUT_START,
  touchmove: INPUT_MOVE,
  touchend: INPUT_END,
  touchcancel: INPUT_CANCEL
};
var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
/**
 * @private
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */

var TouchInput =
/*#__PURE__*/
function (_Input) {
  _inheritsLoose(TouchInput, _Input);

  function TouchInput() {
    var _this;

    TouchInput.prototype.evTarget = TOUCH_TARGET_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.targetIds = {}; // this.evTarget = TOUCH_TARGET_EVENTS;

    return _this;
  }

  var _proto = TouchInput.prototype;

  _proto.handler = function handler(ev) {
    var type = TOUCH_INPUT_MAP[ev.type];
    var touches = getTouches.call(this, ev, type);

    if (!touches) {
      return;
    }

    this.callback(this.manager, type, {
      pointers: touches[0],
      changedPointers: touches[1],
      pointerType: INPUT_TYPE_TOUCH,
      srcEvent: ev
    });
  };

  return TouchInput;
}(Input);

function getTouches(ev, type) {
  var allTouches = toArray(ev.touches);
  var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

  if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
    targetIds[allTouches[0].identifier] = true;
    return [allTouches, allTouches];
  }

  var i;
  var targetTouches;
  var changedTouches = toArray(ev.changedTouches);
  var changedTargetTouches = [];
  var target = this.target; // get target touches from touches

  targetTouches = allTouches.filter(function (touch) {
    return hasParent(touch.target, target);
  }); // collect touches

  if (type === INPUT_START) {
    i = 0;

    while (i < targetTouches.length) {
      targetIds[targetTouches[i].identifier] = true;
      i++;
    }
  } // filter changed touches to only contain touches that exist in the collected target ids


  i = 0;

  while (i < changedTouches.length) {
    if (targetIds[changedTouches[i].identifier]) {
      changedTargetTouches.push(changedTouches[i]);
    } // cleanup removed touches


    if (type & (INPUT_END | INPUT_CANCEL)) {
      delete targetIds[changedTouches[i].identifier];
    }

    i++;
  }

  if (!changedTargetTouches.length) {
    return;
  }

  return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
  uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
}

var MOUSE_INPUT_MAP = {
  mousedown: INPUT_START,
  mousemove: INPUT_MOVE,
  mouseup: INPUT_END
};
var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
/**
 * @private
 * Mouse events input
 * @constructor
 * @extends Input
 */

var MouseInput =
/*#__PURE__*/
function (_Input) {
  _inheritsLoose(MouseInput, _Input);

  function MouseInput() {
    var _this;

    var proto = MouseInput.prototype;
    proto.evEl = MOUSE_ELEMENT_EVENTS;
    proto.evWin = MOUSE_WINDOW_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.pressed = false; // mousedown state

    return _this;
  }
  /**
   * @private
   * handle mouse events
   * @param {Object} ev
   */


  var _proto = MouseInput.prototype;

  _proto.handler = function handler(ev) {
    var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

    if (eventType & INPUT_START && ev.button === 0) {
      this.pressed = true;
    }

    if (eventType & INPUT_MOVE && ev.which !== 1) {
      eventType = INPUT_END;
    } // mouse must be down


    if (!this.pressed) {
      return;
    }

    if (eventType & INPUT_END) {
      this.pressed = false;
    }

    this.callback(this.manager, eventType, {
      pointers: [ev],
      changedPointers: [ev],
      pointerType: INPUT_TYPE_MOUSE,
      srcEvent: ev
    });
  };

  return MouseInput;
}(Input);

/**
 * @private
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function setLastTouch(eventData) {
  var _eventData$changedPoi = eventData.changedPointers,
      touch = _eventData$changedPoi[0];

  if (touch.identifier === this.primaryTouch) {
    var lastTouch = {
      x: touch.clientX,
      y: touch.clientY
    };
    var lts = this.lastTouches;
    this.lastTouches.push(lastTouch);

    var removeLastTouch = function removeLastTouch() {
      var i = lts.indexOf(lastTouch);

      if (i > -1) {
        lts.splice(i, 1);
      }
    };

    setTimeout(removeLastTouch, DEDUP_TIMEOUT);
  }
}

function recordTouches(eventType, eventData) {
  if (eventType & INPUT_START) {
    this.primaryTouch = eventData.changedPointers[0].identifier;
    setLastTouch.call(this, eventData);
  } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
    setLastTouch.call(this, eventData);
  }
}

function isSyntheticEvent(eventData) {
  var x = eventData.srcEvent.clientX;
  var y = eventData.srcEvent.clientY;

  for (var i = 0; i < this.lastTouches.length; i++) {
    var t = this.lastTouches[i];
    var dx = Math.abs(x - t.x);
    var dy = Math.abs(y - t.y);

    if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
      return true;
    }
  }

  return false;
}

var TouchMouseInput =
/*#__PURE__*/
function () {
  var TouchMouseInput =
  /*#__PURE__*/
  function (_Input) {
    _inheritsLoose(TouchMouseInput, _Input);

    function TouchMouseInput(_manager, callback) {
      var _this;

      _this = _Input.call(this, _manager, callback) || this;

      _this.handler = function (manager, inputEvent, inputData) {
        var isTouch = inputData.pointerType === INPUT_TYPE_TOUCH;
        var isMouse = inputData.pointerType === INPUT_TYPE_MOUSE;

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
          return;
        } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


        if (isTouch) {
          recordTouches.call(_assertThisInitialized(_assertThisInitialized(_this)), inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(_assertThisInitialized(_assertThisInitialized(_this)), inputData)) {
          return;
        }

        _this.callback(manager, inputEvent, inputData);
      };

      _this.touch = new TouchInput(_this.manager, _this.handler);
      _this.mouse = new MouseInput(_this.manager, _this.handler);
      _this.primaryTouch = null;
      _this.lastTouches = [];
      return _this;
    }
    /**
     * @private
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */


    var _proto = TouchMouseInput.prototype;

    /**
     * @private
     * remove the event listeners
     */
    _proto.destroy = function destroy() {
      this.touch.destroy();
      this.mouse.destroy();
    };

    return TouchMouseInput;
  }(Input);

  return TouchMouseInput;
}();

/**
 * @private
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */

function createInputInstance(manager) {
  var Type; // let inputClass = manager.options.inputClass;

  var inputClass = manager.options.inputClass;

  if (inputClass) {
    Type = inputClass;
  } else if (SUPPORT_POINTER_EVENTS) {
    Type = PointerEventInput;
  } else if (SUPPORT_ONLY_TOUCH) {
    Type = TouchInput;
  } else if (!SUPPORT_TOUCH) {
    Type = MouseInput;
  } else {
    Type = TouchMouseInput;
  }

  return new Type(manager, inputHandler);
}

/**
 * @private
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */

function invokeArrayArg(arg, fn, context) {
  if (Array.isArray(arg)) {
    each(arg, context[fn], context);
    return true;
  }

  return false;
}

var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * @private
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
  return _uniqueId++;
}

/**
 * @private
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
  var manager = recognizer.manager;

  if (manager) {
    return manager.get(otherRecognizer);
  }

  return otherRecognizer;
}

/**
 * @private
 * get a usable string, used as event postfix
 * @param {constant} state
 * @returns {String} state
 */

function stateStr(state) {
  if (state & STATE_CANCELLED) {
    return 'cancel';
  } else if (state & STATE_ENDED) {
    return 'end';
  } else if (state & STATE_CHANGED) {
    return 'move';
  } else if (state & STATE_BEGAN) {
    return 'start';
  }

  return '';
}

/**
 * @private
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */

/**
 * @private
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */

var Recognizer =
/*#__PURE__*/
function () {
  function Recognizer(options) {
    if (options === void 0) {
      options = {};
    }

    this.options = _extends({
      enable: true
    }, options);
    this.id = uniqueId();
    this.manager = null; // default is enable true

    this.state = STATE_POSSIBLE;
    this.simultaneous = {};
    this.requireFail = [];
  }
  /**
   * @private
   * set options
   * @param {Object} options
   * @return {Recognizer}
   */


  var _proto = Recognizer.prototype;

  _proto.set = function set(options) {
    assign$1(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state

    this.manager && this.manager.touchAction.update();
    return this;
  };
  /**
   * @private
   * recognize simultaneous with an other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.recognizeWith = function recognizeWith(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
      return this;
    }

    var simultaneous = this.simultaneous;
    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

    if (!simultaneous[otherRecognizer.id]) {
      simultaneous[otherRecognizer.id] = otherRecognizer;
      otherRecognizer.recognizeWith(this);
    }

    return this;
  };
  /**
   * @private
   * drop the simultaneous link. it doesnt remove the link on the other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.dropRecognizeWith = function dropRecognizeWith(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
      return this;
    }

    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
    delete this.simultaneous[otherRecognizer.id];
    return this;
  };
  /**
   * @private
   * recognizer can only run when an other is failing
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.requireFailure = function requireFailure(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
      return this;
    }

    var requireFail = this.requireFail;
    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

    if (inArray(requireFail, otherRecognizer) === -1) {
      requireFail.push(otherRecognizer);
      otherRecognizer.requireFailure(this);
    }

    return this;
  };
  /**
   * @private
   * drop the requireFailure link. it does not remove the link on the other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.dropRequireFailure = function dropRequireFailure(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
      return this;
    }

    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
    var index = inArray(this.requireFail, otherRecognizer);

    if (index > -1) {
      this.requireFail.splice(index, 1);
    }

    return this;
  };
  /**
   * @private
   * has require failures boolean
   * @returns {boolean}
   */


  _proto.hasRequireFailures = function hasRequireFailures() {
    return this.requireFail.length > 0;
  };
  /**
   * @private
   * if the recognizer can recognize simultaneous with an other recognizer
   * @param {Recognizer} otherRecognizer
   * @returns {Boolean}
   */


  _proto.canRecognizeWith = function canRecognizeWith(otherRecognizer) {
    return !!this.simultaneous[otherRecognizer.id];
  };
  /**
   * @private
   * You should use `tryEmit` instead of `emit` directly to check
   * that all the needed recognizers has failed before emitting.
   * @param {Object} input
   */


  _proto.emit = function emit(input) {
    var self = this;
    var state = this.state;

    function emit(event) {
      self.manager.emit(event, input);
    } // 'panstart' and 'panmove'


    if (state < STATE_ENDED) {
      emit(self.options.event + stateStr(state));
    }

    emit(self.options.event); // simple 'eventName' events

    if (input.additionalEvent) {
      // additional event(panleft, panright, pinchin, pinchout...)
      emit(input.additionalEvent);
    } // panend and pancancel


    if (state >= STATE_ENDED) {
      emit(self.options.event + stateStr(state));
    }
  };
  /**
   * @private
   * Check that all the require failure recognizers has failed,
   * if true, it emits a gesture event,
   * otherwise, setup the state to FAILED.
   * @param {Object} input
   */


  _proto.tryEmit = function tryEmit(input) {
    if (this.canEmit()) {
      return this.emit(input);
    } // it's failing anyway


    this.state = STATE_FAILED;
  };
  /**
   * @private
   * can we emit?
   * @returns {boolean}
   */


  _proto.canEmit = function canEmit() {
    var i = 0;

    while (i < this.requireFail.length) {
      if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
        return false;
      }

      i++;
    }

    return true;
  };
  /**
   * @private
   * update the recognizer
   * @param {Object} inputData
   */


  _proto.recognize = function recognize(inputData) {
    // make a new copy of the inputData
    // so we can change the inputData without messing up the other recognizers
    var inputDataClone = assign$1({}, inputData); // is is enabled and allow recognizing?

    if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
      this.reset();
      this.state = STATE_FAILED;
      return;
    } // reset when we've reached the end


    if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
      this.state = STATE_POSSIBLE;
    }

    this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
    // so trigger an event

    if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
      this.tryEmit(inputDataClone);
    }
  };
  /**
   * @private
   * return the state of the recognizer
   * the actual recognizing happens in this method
   * @virtual
   * @param {Object} inputData
   * @returns {constant} STATE
   */

  /* jshint ignore:start */


  _proto.process = function process(inputData) {};
  /* jshint ignore:end */

  /**
   * @private
   * return the preferred touch-action
   * @virtual
   * @returns {Array}
   */


  _proto.getTouchAction = function getTouchAction() {};
  /**
   * @private
   * called when the gesture isn't allowed to recognize
   * like when another is being recognized or it is disabled
   * @virtual
   */


  _proto.reset = function reset() {};

  return Recognizer;
}();

/**
 * @private
 * A tap is recognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */

var TapRecognizer =
/*#__PURE__*/
function (_Recognizer) {
  _inheritsLoose(TapRecognizer, _Recognizer);

  function TapRecognizer(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _Recognizer.call(this, _extends({
      event: 'tap',
      pointers: 1,
      taps: 1,
      interval: 300,
      // max time between the multi-tap taps
      time: 250,
      // max time of the pointer to be down (like finger on the screen)
      threshold: 9,
      // a minimal movement is ok, but keep it low
      posThreshold: 10
    }, options)) || this; // previous time and center,
    // used for tap counting

    _this.pTime = false;
    _this.pCenter = false;
    _this._timer = null;
    _this._input = null;
    _this.count = 0;
    return _this;
  }

  var _proto = TapRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_MANIPULATION];
  };

  _proto.process = function process(input) {
    var _this2 = this;

    var options = this.options;
    var validPointers = input.pointers.length === options.pointers;
    var validMovement = input.distance < options.threshold;
    var validTouchTime = input.deltaTime < options.time;
    this.reset();

    if (input.eventType & INPUT_START && this.count === 0) {
      return this.failTimeout();
    } // we only allow little movement
    // and we've reached an end event, so a tap is possible


    if (validMovement && validTouchTime && validPointers) {
      if (input.eventType !== INPUT_END) {
        return this.failTimeout();
      }

      var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
      var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
      this.pTime = input.timeStamp;
      this.pCenter = input.center;

      if (!validMultiTap || !validInterval) {
        this.count = 1;
      } else {
        this.count += 1;
      }

      this._input = input; // if tap count matches we have recognized it,
      // else it has began recognizing...

      var tapCount = this.count % options.taps;

      if (tapCount === 0) {
        // no failing requirements, immediately trigger the tap event
        // or wait as long as the multitap interval to trigger
        if (!this.hasRequireFailures()) {
          return STATE_RECOGNIZED;
        } else {
          this._timer = setTimeout(function () {
            _this2.state = STATE_RECOGNIZED;

            _this2.tryEmit();
          }, options.interval);
          return STATE_BEGAN;
        }
      }
    }

    return STATE_FAILED;
  };

  _proto.failTimeout = function failTimeout() {
    var _this3 = this;

    this._timer = setTimeout(function () {
      _this3.state = STATE_FAILED;
    }, this.options.interval);
    return STATE_FAILED;
  };

  _proto.reset = function reset() {
    clearTimeout(this._timer);
  };

  _proto.emit = function emit() {
    if (this.state === STATE_RECOGNIZED) {
      this._input.tapCount = this.count;
      this.manager.emit(this.options.event, this._input);
    }
  };

  return TapRecognizer;
}(Recognizer);

/**
 * @private
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */

var AttrRecognizer =
/*#__PURE__*/
function (_Recognizer) {
  _inheritsLoose(AttrRecognizer, _Recognizer);

  function AttrRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _Recognizer.call(this, _extends({
      pointers: 1
    }, options)) || this;
  }
  /**
   * @private
   * Used to check if it the recognizer receives valid input, like input.distance > 10.
   * @memberof AttrRecognizer
   * @param {Object} input
   * @returns {Boolean} recognized
   */


  var _proto = AttrRecognizer.prototype;

  _proto.attrTest = function attrTest(input) {
    var optionPointers = this.options.pointers;
    return optionPointers === 0 || input.pointers.length === optionPointers;
  };
  /**
   * @private
   * Process the input and return the state for the recognizer
   * @memberof AttrRecognizer
   * @param {Object} input
   * @returns {*} State
   */


  _proto.process = function process(input) {
    var state = this.state;
    var eventType = input.eventType;
    var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
    var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

    if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
      return state | STATE_CANCELLED;
    } else if (isRecognized || isValid) {
      if (eventType & INPUT_END) {
        return state | STATE_ENDED;
      } else if (!(state & STATE_BEGAN)) {
        return STATE_BEGAN;
      }

      return state | STATE_CHANGED;
    }

    return STATE_FAILED;
  };

  return AttrRecognizer;
}(Recognizer);

/**
 * @private
 * direction cons to string
 * @param {constant} direction
 * @returns {String}
 */

function directionStr(direction) {
  if (direction === DIRECTION_DOWN) {
    return 'down';
  } else if (direction === DIRECTION_UP) {
    return 'up';
  } else if (direction === DIRECTION_LEFT) {
    return 'left';
  } else if (direction === DIRECTION_RIGHT) {
    return 'right';
  }

  return '';
}

/**
 * @private
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */

var PanRecognizer =
/*#__PURE__*/
function (_AttrRecognizer) {
  _inheritsLoose(PanRecognizer, _AttrRecognizer);

  function PanRecognizer(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _AttrRecognizer.call(this, _extends({
      event: 'pan',
      threshold: 10,
      pointers: 1,
      direction: DIRECTION_ALL
    }, options)) || this;
    _this.pX = null;
    _this.pY = null;
    return _this;
  }

  var _proto = PanRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    var direction = this.options.direction;
    var actions = [];

    if (direction & DIRECTION_HORIZONTAL) {
      actions.push(TOUCH_ACTION_PAN_Y);
    }

    if (direction & DIRECTION_VERTICAL) {
      actions.push(TOUCH_ACTION_PAN_X);
    }

    return actions;
  };

  _proto.directionTest = function directionTest(input) {
    var options = this.options;
    var hasMoved = true;
    var distance = input.distance;
    var direction = input.direction;
    var x = input.deltaX;
    var y = input.deltaY; // lock to axis?

    if (!(direction & options.direction)) {
      if (options.direction & DIRECTION_HORIZONTAL) {
        direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        hasMoved = x !== this.pX;
        distance = Math.abs(input.deltaX);
      } else {
        direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
        hasMoved = y !== this.pY;
        distance = Math.abs(input.deltaY);
      }
    }

    input.direction = direction;
    return hasMoved && distance > options.threshold && direction & options.direction;
  };

  _proto.attrTest = function attrTest(input) {
    return AttrRecognizer.prototype.attrTest.call(this, input) && ( // replace with a super call
    this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
  };

  _proto.emit = function emit(input) {
    this.pX = input.deltaX;
    this.pY = input.deltaY;
    var direction = directionStr(input.direction);

    if (direction) {
      input.additionalEvent = this.options.event + direction;
    }

    _AttrRecognizer.prototype.emit.call(this, input);
  };

  return PanRecognizer;
}(AttrRecognizer);

/**
 * @private
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */

var SwipeRecognizer =
/*#__PURE__*/
function (_AttrRecognizer) {
  _inheritsLoose(SwipeRecognizer, _AttrRecognizer);

  function SwipeRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _AttrRecognizer.call(this, _extends({
      event: 'swipe',
      threshold: 10,
      velocity: 0.3,
      direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
      pointers: 1
    }, options)) || this;
  }

  var _proto = SwipeRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return PanRecognizer.prototype.getTouchAction.call(this);
  };

  _proto.attrTest = function attrTest(input) {
    var direction = this.options.direction;
    var velocity;

    if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
      velocity = input.overallVelocity;
    } else if (direction & DIRECTION_HORIZONTAL) {
      velocity = input.overallVelocityX;
    } else if (direction & DIRECTION_VERTICAL) {
      velocity = input.overallVelocityY;
    }

    return _AttrRecognizer.prototype.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers === this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
  };

  _proto.emit = function emit(input) {
    var direction = directionStr(input.offsetDirection);

    if (direction) {
      this.manager.emit(this.options.event + direction, input);
    }

    this.manager.emit(this.options.event, input);
  };

  return SwipeRecognizer;
}(AttrRecognizer);

/**
 * @private
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */

var PinchRecognizer =
/*#__PURE__*/
function (_AttrRecognizer) {
  _inheritsLoose(PinchRecognizer, _AttrRecognizer);

  function PinchRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _AttrRecognizer.call(this, _extends({
      event: 'pinch',
      threshold: 0,
      pointers: 2
    }, options)) || this;
  }

  var _proto = PinchRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_NONE];
  };

  _proto.attrTest = function attrTest(input) {
    return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
  };

  _proto.emit = function emit(input) {
    if (input.scale !== 1) {
      var inOut = input.scale < 1 ? 'in' : 'out';
      input.additionalEvent = this.options.event + inOut;
    }

    _AttrRecognizer.prototype.emit.call(this, input);
  };

  return PinchRecognizer;
}(AttrRecognizer);

/**
 * @private
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */

var RotateRecognizer =
/*#__PURE__*/
function (_AttrRecognizer) {
  _inheritsLoose(RotateRecognizer, _AttrRecognizer);

  function RotateRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _AttrRecognizer.call(this, _extends({
      event: 'rotate',
      threshold: 0,
      pointers: 2
    }, options)) || this;
  }

  var _proto = RotateRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_NONE];
  };

  _proto.attrTest = function attrTest(input) {
    return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
  };

  return RotateRecognizer;
}(AttrRecognizer);

/**
 * @private
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */

var PressRecognizer =
/*#__PURE__*/
function (_Recognizer) {
  _inheritsLoose(PressRecognizer, _Recognizer);

  function PressRecognizer(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _Recognizer.call(this, _extends({
      event: 'press',
      pointers: 1,
      time: 251,
      // minimal time of the pointer to be pressed
      threshold: 9
    }, options)) || this;
    _this._timer = null;
    _this._input = null;
    return _this;
  }

  var _proto = PressRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_AUTO];
  };

  _proto.process = function process(input) {
    var _this2 = this;

    var options = this.options;
    var validPointers = input.pointers.length === options.pointers;
    var validMovement = input.distance < options.threshold;
    var validTime = input.deltaTime > options.time;
    this._input = input; // we only allow little movement
    // and we've reached an end event, so a tap is possible

    if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
      this.reset();
    } else if (input.eventType & INPUT_START) {
      this.reset();
      this._timer = setTimeout(function () {
        _this2.state = STATE_RECOGNIZED;

        _this2.tryEmit();
      }, options.time);
    } else if (input.eventType & INPUT_END) {
      return STATE_RECOGNIZED;
    }

    return STATE_FAILED;
  };

  _proto.reset = function reset() {
    clearTimeout(this._timer);
  };

  _proto.emit = function emit(input) {
    if (this.state !== STATE_RECOGNIZED) {
      return;
    }

    if (input && input.eventType & INPUT_END) {
      this.manager.emit(this.options.event + "up", input);
    } else {
      this._input.timeStamp = now();
      this.manager.emit(this.options.event, this._input);
    }
  };

  return PressRecognizer;
}(Recognizer);

var defaults = {
  /**
   * @private
   * set if DOM events are being triggered.
   * But this is slower and unused by simple implementations, so disabled by default.
   * @type {Boolean}
   * @default false
   */
  domEvents: false,

  /**
   * @private
   * The value for the touchAction property/fallback.
   * When set to `compute` it will magically set the correct value based on the added recognizers.
   * @type {String}
   * @default compute
   */
  touchAction: TOUCH_ACTION_COMPUTE,

  /**
   * @private
   * @type {Boolean}
   * @default true
   */
  enable: true,

  /**
   * @private
   * EXPERIMENTAL FEATURE -- can be removed/changed
   * Change the parent input target element.
   * If Null, then it is being set the to main element.
   * @type {Null|EventTarget}
   * @default null
   */
  inputTarget: null,

  /**
   * @private
   * force an input class
   * @type {Null|Function}
   * @default null
   */
  inputClass: null,

  /**
   * @private
   * Some CSS properties can be used to improve the working of Hammer.
   * Add them to this method and they will be set when creating a new Manager.
   * @namespace
   */
  cssProps: {
    /**
     * @private
     * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
     * @type {String}
     * @default 'none'
     */
    userSelect: "none",

    /**
     * @private
     * Disable the Windows Phone grippers when pressing an element.
     * @type {String}
     * @default 'none'
     */
    touchSelect: "none",

    /**
     * @private
     * Disables the default callout shown when you touch and hold a touch target.
     * On iOS, when you touch and hold a touch target such as a link, Safari displays
     * a callout containing information about the link. This property allows you to disable that callout.
     * @type {String}
     * @default 'none'
     */
    touchCallout: "none",

    /**
     * @private
     * Specifies whether zooming is enabled. Used by IE10>
     * @type {String}
     * @default 'none'
     */
    contentZooming: "none",

    /**
     * @private
     * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
     * @type {String}
     * @default 'none'
     */
    userDrag: "none",

    /**
     * @private
     * Overrides the highlight color shown when the user taps a link or a JavaScript
     * clickable element in iOS. This property obeys the alpha value, if specified.
     * @type {String}
     * @default 'rgba(0,0,0,0)'
     */
    tapHighlightColor: "rgba(0,0,0,0)"
  }
};
/**
 * @private
 * Default recognizer setup when calling `Hammer()`
 * When creating a new Manager these will be skipped.
 * This is separated with other defaults because of tree-shaking.
 * @type {Array}
 */

var preset = [[RotateRecognizer, {
  enable: false
}], [PinchRecognizer, {
  enable: false
}, ['rotate']], [SwipeRecognizer, {
  direction: DIRECTION_HORIZONTAL
}], [PanRecognizer, {
  direction: DIRECTION_HORIZONTAL
}, ['swipe']], [TapRecognizer], [TapRecognizer, {
  event: 'doubletap',
  taps: 2
}, ['tap']], [PressRecognizer]];

var STOP = 1;
var FORCED_STOP = 2;
/**
 * @private
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */

function toggleCssProps(manager, add) {
  var element = manager.element;

  if (!element.style) {
    return;
  }

  var prop;
  each(manager.options.cssProps, function (value, name) {
    prop = prefixed(element.style, name);

    if (add) {
      manager.oldCssProps[prop] = element.style[prop];
      element.style[prop] = value;
    } else {
      element.style[prop] = manager.oldCssProps[prop] || "";
    }
  });

  if (!add) {
    manager.oldCssProps = {};
  }
}
/**
 * @private
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */


function triggerDomEvent(event, data) {
  var gestureEvent = document.createEvent("Event");
  gestureEvent.initEvent(event, true, true);
  gestureEvent.gesture = data;
  data.target.dispatchEvent(gestureEvent);
}
/**
* @private
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */


var Manager =
/*#__PURE__*/
function () {
  function Manager(element, options) {
    var _this = this;

    this.options = assign$1({}, defaults, options || {});
    this.options.inputTarget = this.options.inputTarget || element;
    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};
    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);
    toggleCssProps(this, true);
    each(this.options.recognizers, function (item) {
      var recognizer = _this.add(new item[0](item[1]));

      item[2] && recognizer.recognizeWith(item[2]);
      item[3] && recognizer.requireFailure(item[3]);
    }, this);
  }
  /**
   * @private
   * set options
   * @param {Object} options
   * @returns {Manager}
   */


  var _proto = Manager.prototype;

  _proto.set = function set(options) {
    assign$1(this.options, options); // Options that need a little more setup

    if (options.touchAction) {
      this.touchAction.update();
    }

    if (options.inputTarget) {
      // Clean up existing event listeners and reinitialize
      this.input.destroy();
      this.input.target = options.inputTarget;
      this.input.init();
    }

    return this;
  };
  /**
   * @private
   * stop recognizing for this session.
   * This session will be discarded, when a new [input]start event is fired.
   * When forced, the recognizer cycle is stopped immediately.
   * @param {Boolean} [force]
   */


  _proto.stop = function stop(force) {
    this.session.stopped = force ? FORCED_STOP : STOP;
  };
  /**
   * @private
   * run the recognizers!
   * called by the inputHandler function on every movement of the pointers (touches)
   * it walks through all the recognizers and tries to detect the gesture that is being made
   * @param {Object} inputData
   */


  _proto.recognize = function recognize(inputData) {
    var session = this.session;

    if (session.stopped) {
      return;
    } // run the touch-action polyfill


    this.touchAction.preventDefaults(inputData);
    var recognizer;
    var recognizers = this.recognizers; // this holds the recognizer that is being recognized.
    // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
    // if no recognizer is detecting a thing, it is set to `null`

    var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
    // or when we're in a new session

    if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
      session.curRecognizer = null;
      curRecognizer = null;
    }

    var i = 0;

    while (i < recognizers.length) {
      recognizer = recognizers[i]; // find out if we are allowed try to recognize the input for this one.
      // 1.   allow if the session is NOT forced stopped (see the .stop() method)
      // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
      //      that is being recognized.
      // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
      //      this can be setup with the `recognizeWith()` method on the recognizer.

      if (session.stopped !== FORCED_STOP && ( // 1
      !curRecognizer || recognizer === curRecognizer || // 2
      recognizer.canRecognizeWith(curRecognizer))) {
        // 3
        recognizer.recognize(inputData);
      } else {
        recognizer.reset();
      } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
      // current active recognizer. but only if we don't already have an active recognizer


      if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
        session.curRecognizer = recognizer;
        curRecognizer = recognizer;
      }

      i++;
    }
  };
  /**
   * @private
   * get a recognizer by its event name.
   * @param {Recognizer|String} recognizer
   * @returns {Recognizer|Null}
   */


  _proto.get = function get(recognizer) {
    if (recognizer instanceof Recognizer) {
      return recognizer;
    }

    var recognizers = this.recognizers;

    for (var i = 0; i < recognizers.length; i++) {
      if (recognizers[i].options.event === recognizer) {
        return recognizers[i];
      }
    }

    return null;
  };
  /**
   * @private add a recognizer to the manager
   * existing recognizers with the same event name will be removed
   * @param {Recognizer} recognizer
   * @returns {Recognizer|Manager}
   */


  _proto.add = function add(recognizer) {
    if (invokeArrayArg(recognizer, "add", this)) {
      return this;
    } // remove existing


    var existing = this.get(recognizer.options.event);

    if (existing) {
      this.remove(existing);
    }

    this.recognizers.push(recognizer);
    recognizer.manager = this;
    this.touchAction.update();
    return recognizer;
  };
  /**
   * @private
   * remove a recognizer by name or instance
   * @param {Recognizer|String} recognizer
   * @returns {Manager}
   */


  _proto.remove = function remove(recognizer) {
    if (invokeArrayArg(recognizer, "remove", this)) {
      return this;
    }

    var targetRecognizer = this.get(recognizer); // let's make sure this recognizer exists

    if (recognizer) {
      var recognizers = this.recognizers;
      var index = inArray(recognizers, targetRecognizer);

      if (index !== -1) {
        recognizers.splice(index, 1);
        this.touchAction.update();
      }
    }

    return this;
  };
  /**
   * @private
   * bind event
   * @param {String} events
   * @param {Function} handler
   * @returns {EventEmitter} this
   */


  _proto.on = function on(events, handler) {
    if (events === undefined || handler === undefined) {
      return this;
    }

    var handlers = this.handlers;
    each(splitStr(events), function (event) {
      handlers[event] = handlers[event] || [];
      handlers[event].push(handler);
    });
    return this;
  };
  /**
   * @private unbind event, leave emit blank to remove all handlers
   * @param {String} events
   * @param {Function} [handler]
   * @returns {EventEmitter} this
   */


  _proto.off = function off(events, handler) {
    if (events === undefined) {
      return this;
    }

    var handlers = this.handlers;
    each(splitStr(events), function (event) {
      if (!handler) {
        delete handlers[event];
      } else {
        handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
      }
    });
    return this;
  };
  /**
   * @private emit event to the listeners
   * @param {String} event
   * @param {Object} data
   */


  _proto.emit = function emit(event, data) {
    // we also want to trigger dom events
    if (this.options.domEvents) {
      triggerDomEvent(event, data);
    } // no handlers, so skip it all


    var handlers = this.handlers[event] && this.handlers[event].slice();

    if (!handlers || !handlers.length) {
      return;
    }

    data.type = event;

    data.preventDefault = function () {
      data.srcEvent.preventDefault();
    };

    var i = 0;

    while (i < handlers.length) {
      handlers[i](data);
      i++;
    }
  };
  /**
   * @private
   * destroy the manager and unbinds all events
   * it doesn't unbind dom events, that is the user own responsibility
   */


  _proto.destroy = function destroy() {
    this.element && toggleCssProps(this, false);
    this.handlers = {};
    this.session = {};
    this.input.destroy();
    this.element = null;
  };

  return Manager;
}();

var SINGLE_TOUCH_INPUT_MAP = {
  touchstart: INPUT_START,
  touchmove: INPUT_MOVE,
  touchend: INPUT_END,
  touchcancel: INPUT_CANCEL
};
var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
/**
 * @private
 * Touch events input
 * @constructor
 * @extends Input
 */

var SingleTouchInput =
/*#__PURE__*/
function (_Input) {
  _inheritsLoose(SingleTouchInput, _Input);

  function SingleTouchInput() {
    var _this;

    var proto = SingleTouchInput.prototype;
    proto.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    proto.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.started = false;
    return _this;
  }

  var _proto = SingleTouchInput.prototype;

  _proto.handler = function handler(ev) {
    var type = SINGLE_TOUCH_INPUT_MAP[ev.type]; // should we handle the touch events?

    if (type === INPUT_START) {
      this.started = true;
    }

    if (!this.started) {
      return;
    }

    var touches = normalizeSingleTouches.call(this, ev, type); // when done, reset the started state

    if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
      this.started = false;
    }

    this.callback(this.manager, type, {
      pointers: touches[0],
      changedPointers: touches[1],
      pointerType: INPUT_TYPE_TOUCH,
      srcEvent: ev
    });
  };

  return SingleTouchInput;
}(Input);

function normalizeSingleTouches(ev, type) {
  var all = toArray(ev.touches);
  var changed = toArray(ev.changedTouches);

  if (type & (INPUT_END | INPUT_CANCEL)) {
    all = uniqueArray(all.concat(changed), 'identifier', true);
  }

  return [all, changed];
}

/**
 * @private
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
  var deprecationMessage = "DEPRECATED METHOD: " + name + "\n" + message + " AT \n";
  return function () {
    var e = new Error('get-stack-trace');
    var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
    var log = window.console && (window.console.warn || window.console.log);

    if (log) {
      log.call(window.console, deprecationMessage, stack);
    }

    return method.apply(this, arguments);
  };
}

/**
 * @private
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */

var extend = deprecate(function (dest, src, merge) {
  var keys = Object.keys(src);
  var i = 0;

  while (i < keys.length) {
    if (!merge || merge && dest[keys[i]] === undefined) {
      dest[keys[i]] = src[keys[i]];
    }

    i++;
  }

  return dest;
}, 'extend', 'Use `assign`.');

/**
 * @private
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */

var merge = deprecate(function (dest, src) {
  return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * @private
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */

function inherit(child, base, properties) {
  var baseP = base.prototype;
  var childP;
  childP = child.prototype = Object.create(baseP);
  childP.constructor = child;
  childP._super = baseP;

  if (properties) {
    assign$1(childP, properties);
  }
}

/**
 * @private
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
  return function boundFn() {
    return fn.apply(context, arguments);
  };
}

/**
 * @private
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */

var Hammer =
/*#__PURE__*/
function () {
  var Hammer =
  /**
    * @private
    * @const {string}
    */
  function Hammer(element, options) {
    if (options === void 0) {
      options = {};
    }

    return new Manager(element, _extends({
      recognizers: preset.concat()
    }, options));
  };

  Hammer.VERSION = "2.0.17-rc";
  Hammer.DIRECTION_ALL = DIRECTION_ALL;
  Hammer.DIRECTION_DOWN = DIRECTION_DOWN;
  Hammer.DIRECTION_LEFT = DIRECTION_LEFT;
  Hammer.DIRECTION_RIGHT = DIRECTION_RIGHT;
  Hammer.DIRECTION_UP = DIRECTION_UP;
  Hammer.DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
  Hammer.DIRECTION_VERTICAL = DIRECTION_VERTICAL;
  Hammer.DIRECTION_NONE = DIRECTION_NONE;
  Hammer.DIRECTION_DOWN = DIRECTION_DOWN;
  Hammer.INPUT_START = INPUT_START;
  Hammer.INPUT_MOVE = INPUT_MOVE;
  Hammer.INPUT_END = INPUT_END;
  Hammer.INPUT_CANCEL = INPUT_CANCEL;
  Hammer.STATE_POSSIBLE = STATE_POSSIBLE;
  Hammer.STATE_BEGAN = STATE_BEGAN;
  Hammer.STATE_CHANGED = STATE_CHANGED;
  Hammer.STATE_ENDED = STATE_ENDED;
  Hammer.STATE_RECOGNIZED = STATE_RECOGNIZED;
  Hammer.STATE_CANCELLED = STATE_CANCELLED;
  Hammer.STATE_FAILED = STATE_FAILED;
  Hammer.Manager = Manager;
  Hammer.Input = Input;
  Hammer.TouchAction = TouchAction;
  Hammer.TouchInput = TouchInput;
  Hammer.MouseInput = MouseInput;
  Hammer.PointerEventInput = PointerEventInput;
  Hammer.TouchMouseInput = TouchMouseInput;
  Hammer.SingleTouchInput = SingleTouchInput;
  Hammer.Recognizer = Recognizer;
  Hammer.AttrRecognizer = AttrRecognizer;
  Hammer.Tap = TapRecognizer;
  Hammer.Pan = PanRecognizer;
  Hammer.Swipe = SwipeRecognizer;
  Hammer.Pinch = PinchRecognizer;
  Hammer.Rotate = RotateRecognizer;
  Hammer.Press = PressRecognizer;
  Hammer.on = addEventListeners;
  Hammer.off = removeEventListeners;
  Hammer.each = each;
  Hammer.merge = merge;
  Hammer.extend = extend;
  Hammer.bindFn = bindFn;
  Hammer.assign = assign$1;
  Hammer.inherit = inherit;
  Hammer.bindFn = bindFn;
  Hammer.prefixed = prefixed;
  Hammer.toArray = toArray;
  Hammer.inArray = inArray;
  Hammer.uniqueArray = uniqueArray;
  Hammer.splitStr = splitStr;
  Hammer.boolOrFn = boolOrFn;
  Hammer.hasParent = hasParent;
  Hammer.addEventListeners = addEventListeners;
  Hammer.removeEventListeners = removeEventListeners;
  Hammer.defaults = assign$1({}, defaults, {
    preset: preset
  });
  return Hammer;
}();

//  style loader but by script tag, not by the loader.

var defaults$1 = Hammer.defaults;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hammer);

//# sourceMappingURL=hammer.esm.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************************!*\
  !*** ./resources/js/flicking/flicking-mobile.js ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _egjs_flicking_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @egjs/flicking-plugins */ "./node_modules/@egjs/flicking-plugins/dist/plugins.esm.js");

var docEditor = document.getElementById("editor-choice");
var docHeadline = document.getElementById("headline");
var docPhoto = document.getElementById("photo");

if (docEditor) {
  var editor = new Flicking("#editor-choice", {
    circular: true,
    horizontal: true,
    align: "center",
    autoResize: true,
    duration: 500
  });
  editor.addPlugins(new _egjs_flicking_plugins__WEBPACK_IMPORTED_MODULE_0__.AutoPlay({
    duration: 2000,
    direction: "NEXT",
    stopOnHover: false
  }));
}

if (docHeadline) {
  var headline = new Flicking("#headline", {
    circular: true,
    horizontal: true,
    align: "center",
    autoResize: true,
    duration: 500
  });
  headline.addPlugins( // new Fade(),
  new _egjs_flicking_plugins__WEBPACK_IMPORTED_MODULE_0__.Pagination({
    type: "bullet"
  }));
}

if (docPhoto) {
  var _headline = new Flicking("#photo", {
    circular: true,
    horizontal: true,
    align: "center",
    autoResize: false,
    duration: 500
  });
}
})();

/******/ })()
;