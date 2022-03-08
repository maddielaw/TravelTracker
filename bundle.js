/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleServerErrors": () => (/* binding */ handleServerErrors),
/* harmony export */   "checkForErrors": () => (/* binding */ checkForErrors),
/* harmony export */   "formatDate": () => (/* binding */ formatDate),
/* harmony export */   "formatCost": () => (/* binding */ formatCost)
/* harmony export */ });
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _TravelDatabase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);





//Selector Variables -------------------------------------------------------------------------------------

const mainDashboard = document.getElementById('mainSection');
const bookTripBtn = document.getElementById('bookNowButton');
const backToMainBtn = document.getElementById('backToMain');
const quoteBtn = document.getElementById('quoteButton');
const clearFormBtn = document.getElementById('clearFormButton');
const tripSubmitBtn = document.getElementById('submitButton');
const filterBtnContainer = document.getElementById('tripFilterContainer');
const allTripsContainer = document.getElementById('allTrips');
const upcomingTripsContainer = document.getElementById('upcomingTrips');
const pendingTripsContainer = document.getElementById('pendingTrips');
const newTripForm = document.getElementById('newTripForm');
const formDepartureDate = document.getElementById('departureDate');
const travelerID = document.getElementById('currentTravelerID');
const formTripDuration = document.getElementById('tripDuration');
const formNumTravelers = document.getElementById('numTravelers');
const destinationDropDown = document.getElementById('tripDestination');
const tripQuote = document.getElementById('tripQuote');
const successMsg = document.getElementById('successMsg');
const dateErrorMsg = document.getElementById('dateError');
const formErrorTag = document.getElementById('formErrors');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const notFoundMessage = document.getElementById('notFound');
const loginPage = document.getElementById('loginPage');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginForm = document.querySelector('.login-form');

//Event Listeners -------------------------------------------------------------------------------------

filterBtnContainer.addEventListener('click', reRenderDashboard);
bookTripBtn.addEventListener('click', displayAndHideTripForm);
backToMainBtn.addEventListener('click', returnToDashboard);
quoteBtn.addEventListener('click', displayTripQuote);
clearFormBtn.addEventListener('click', clearForm);
newTripForm.addEventListener('submit', packageNewTrip);
loginForm.addEventListener('submit', validateLogin);

// Main Functions -------------------------------------------------------------------------------------------

function validateLogin(e) {
  e.preventDefault();
  const usernameLetters = usernameInput.value.split('').slice(0, 8).join('');
  const slicedNumbers = usernameInput.value.split('').slice(8, 11);
  const usernameNumbers = slicedNumbers.join('');
  const password = passwordInput.value;

  if (!slicedNumbers.includes(' ')) {
    _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.validateUsername(usernameLetters, usernameNumbers);
    _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.validatePassword(password);
  } else {
    usernameError.innerText = "username does not match";
  };

  if (usernameInput.classList.contains('correct') && passwordInput.classList.contains('correct')) {
    _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.addTravelerIDToForm(parseInt(usernameNumbers));
    usernameError.innerText = "";
    passwordError.innerText = "";
    loadDashboardAfterLogin(e);
  };
};

function reRenderDashboard(e) {
  const parsedTravelerID = parseInt(travelerID.innerText);
  createDashboardView(parsedTravelerID, e);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.hideItem(loginPage);
};

function loadDashboardAfterLogin(e) {
  const parsedTravelerID = parseInt(travelerID.innerText);
  createDashboardView(parsedTravelerID, e);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.hideItem(loginPage);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.showItem(mainDashboard);
};

function returnToDashboard(e) {
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.displayAndHideFormPage();
  reRenderDashboard(e);
};

function createDashboardView(id, e) {
  resolvePromise().then(allData => {
    const travelDatabase = new _TravelDatabase__WEBPACK_IMPORTED_MODULE_3__.default(allData);
    createTraveler(travelDatabase, id);
    displayTravelerProfile(travelDatabase);
    createDestinationList(travelDatabase);
    filterBtnGatekeeper(e, travelDatabase);
  });
};

function filterBtnGatekeeper(e, data) {
  if (e.target.id === 'allTripsButton') {
    filterAllTravelerTrips(data, allTripsContainer, data.currentTraveler.travelerTrips);
  } else if (e.target.id === 'upcomingTripsButton') {
    filterUpcomingTravelerTrips(data, upcomingTripsContainer, data.currentTraveler.upcomingTrips);
  } else if (e.target.id === 'pendingTripsButton') {
    filterPendingTravelerTrips(data, pendingTripsContainer, data.currentTraveler.pendingTrips);
  } else {
    filterAllTravelerTrips(data, allTripsContainer, data.currentTraveler.travelerTrips);
  };
};

function filterAllTravelerTrips(data, selector, arr) {
  displayAllTravelerTrips(data, selector, arr);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.showItem(allTripsContainer);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.hideItem(upcomingTripsContainer);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.hideItem(pendingTripsContainer);
};

function filterUpcomingTravelerTrips(data, selector, arr) {
  displayAllTravelerTrips(data, selector, arr);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.showItem(upcomingTripsContainer);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.hideItem(allTripsContainer);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.hideItem(pendingTripsContainer);
};

function filterPendingTravelerTrips(data, selector, arr) {
  displayAllTravelerTrips(data, selector, arr);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.showItem(pendingTripsContainer);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.hideItem(allTripsContainer);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.hideItem(upcomingTripsContainer);
};

function displayTravelerProfile(data) {
  displayTravelerData(data);
  displayTravelerSpending(data);
};

// Traveler profile -------------------------------------------------------------------------------------------

function createTraveler(data, id) {
  const newTraveler = data.findATraveler(id);
  newTraveler.findPastTrips();
  newTraveler.findPendingTrips();
  newTraveler.findUpcomingTrips();
  newTraveler.findCurrentTrip();
  return newTraveler;
};

function displayTravelerSpending(data) {
  const yearlyCost = data.currentTraveler.calculateYearlyTripCost();
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.updateTravelerSpending(data, yearlyCost);
};

function displayTravelerData(data) {
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.updateWelcomeMessage(data);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.updateTravelerProfile(data);
};

function formatDate(date) {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
  return formattedDate;
};

function formatCost(cost) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  return formatter.format(cost);
};

// Filter trips  -------------------------------------------------------------------------------------------

function displayAllTravelerTrips(data, selector, arr) {
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.hideItem(notFoundMessage);
  if (!arr.length) {
    _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.displayNotFoundMessage();
  } else {
    selector.innerHTML = ""
    arr.forEach(trip => {
      _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.updateTravelerTrips(trip, selector);
    });
  };
};

// Form Page  -------------------------------------------------------------------------------------------

function displayAndHideTripForm() {
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.displayAndHideFormPage();
  clearForm();
}; 

function createDestinationList(data) {
  destinationDropDown.innerHTML = "";
  data.destinations.forEach(destination => {
    _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.displayDestinationDropDown(destination);
  });
};

function displayTripQuote(e) {
  e.preventDefault();
  if (formDepartureDate.value <= new Date().toISOString().split('T')[0]) {
    _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.displayDateError();
  } else if (formNumTravelers.value <= 0 || !formNumTravelers.value || formTripDuration.value <= 0 || !formTripDuration.value) {
    _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.displayFormError();
  } else if (formNumTravelers.value > 10 || formTripDuration.value > 365) {
    _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.displayDurationOrTravelerError();
  } else {
    handleTripQuote();
  };
};

function handleTripQuote() {
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.showItem(tripSubmitBtn);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.showItem(tripQuote);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.hideItem(quoteBtn);
  dateErrorMsg.innerText = "";
  formErrorTag.innerText = "";
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.displayCostEstimate(getNewTripCost());
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.showItem(clearFormBtn);
};

function getNewTripCost() {
  const lodgingPerDay = parseInt(destinationDropDown.options[destinationDropDown.selectedIndex].dataset.lodging);
  const flightPerPerson = parseInt(destinationDropDown.options[destinationDropDown.selectedIndex].dataset.flight);
  const lodgingTotal = lodgingPerDay * parseInt(formTripDuration.value);
  const flightTotal = (flightPerPerson * 2) * parseInt(formNumTravelers.value);
  const baseTotal = lodgingTotal + flightTotal;
  const finalTripQuote = baseTotal + (baseTotal * .10);
  return finalTripQuote;
};

function displayTripRequestSuccess() {
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.hideItem(tripSubmitBtn);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.hideItem(tripQuote);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.hideItem(clearFormBtn);
  newTripForm.reset();
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.displayFormSuccessMsg();
};

function clearForm() {
  newTripForm.reset();
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.hideItem(tripSubmitBtn);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.hideItem(tripQuote);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.showItem(quoteBtn);
  _domUpdates__WEBPACK_IMPORTED_MODULE_2__.default.hideItem(clearFormBtn);
  successMsg.innerText = "";
};

//API & Promise/Error Handling ------------------------------------------------------------------------------------------------

function resolvePromise() {
  const allTravelerData = _apiCalls__WEBPACK_IMPORTED_MODULE_1__.default.fetchData('travelers');
  const allTripData = _apiCalls__WEBPACK_IMPORTED_MODULE_1__.default.fetchData('trips');
  const allDestinationData = _apiCalls__WEBPACK_IMPORTED_MODULE_1__.default.fetchData('destinations');
  return Promise.all([allTravelerData, allTripData, allDestinationData])
    .then(data => {
      let allData = {}
      allData.allTravelers = data[0].travelers;
      allData.allTrips = data[1].trips;
      allData.allDestinations = data[2].destinations;
      return allData
    });
};

function packageNewTrip(e) {
  e.preventDefault();
  const newTripData = {
    id: Date.now(),
    userID: parseInt(travelerID.innerText),
    destinationID: parseInt(destinationDropDown.options[destinationDropDown.selectedIndex].id),
    travelers: parseInt(formNumTravelers.value),
    date: formDepartureDate.value.split('-').join('/'),
    duration: parseInt(formTripDuration.value),
    status: 'pending',
    suggestedActivities: []
  };
  _apiCalls__WEBPACK_IMPORTED_MODULE_1__.default.postData('trips', newTripData);
  displayTripRequestSuccess();
};

function handleServerErrors(error) {
  if (error.message === "Failed to fetch") {
    window.alert("Oops! Something went wrong.");
  };
};

function checkForErrors(response) {
  if (response.ok) {
    formErrorTag.innerText = "";
    return response.json();
  } else {
    throw new Error("Make sure you fill out all form fields!");
  };
};



/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0px;\n  margin: 0px;\n  font-family: 'Work Sans', sans-serif;\n  font-weight: 300;\n}\n\nbody,\nhtml {\n  height: 100%;\n  width: 100%;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n}\n\nmain {\n  display: flex;\n  height: 100%;\n}\n\nbutton {\n  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  cursor: pointer;\n}\n\nbutton:hover {\n  color: #fa8241;\n}\n\n.nav-and-login-container {\n  display: flex;\n  flex-direction: column;\n}\n\n.main-logo {\n  display: flex;\n  width: 30%;\n}\n\n.logo {\n  font-size: 30px;\n  margin-left: 10px;\n}\n\n.welcome {\n  font-size: 23px;\n}\n\n.nav-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 50px;\n  background-color: #3e5d88;\n  border-bottom: 3px solid #2f4666;\n  color: white;\n  padding: 25px;\n}\n\n.trip-dashboard {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  background-color: white;\n}\n\n.trip-filter-button-container {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  width: 100%;\n  height: 10%;\n  background-color: #fa9763;\n}\n\n.filter-button {\n  width: 15%;\n  font-size: 17px;\n  padding: 5px;\n}\n\n/* ~~~~~~~~~~~~~~~~~~ TRIP CARD RULES ~~~~~~~~~~~~~~~~~~~~~~~~~~ */\n\n.trip-cards-container {\n  display: flex;\n  flex-flow: wrap;\n  justify-content: space-around;\n  overflow: scroll;\n  height: 100%;\n  width: 100%;\n  background-color: white;\n}\n\n.trip-card {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  height: 69%;\n  width: 28%;\n  margin: 10px;\n  padding: 10px;\n  border-radius: 10px;\n  background-color: #f2f2f2;\n  box-shadow: -5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3);\n}\n\n.trip-info-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 40%;\n  padding: 10px;\n  border-left: 1px solid #cdcdcd;\n}\n\n.trip-card-img-container {\n  height: 35%;\n  width: 100%;\n  margin-top: 10px;\n  margin-bottom: 5px;\n  align-self: center;\n}\n\nimg {\n  height: 155px;\n  width: 100%;\n  border-radius: 10px;\n}\n\n.trip-card-location {\n  width: 95%;\n  padding: 7px;\n  border-bottom: 1px solid #cdcdcdd0;\n}\n\n.trip-info {\n  font-size: 20px;\n}\n\n.not-found-msg {\n  align-self: center;\n  margin-top: 75px;\n  font-size: 50px;\n}\n\n/* ~~~~~~~~~~~~~~~~~~ SIDEBAR RULES ~~~~~~~~~~~~~~~~~~~~~~~~~~ */\n\n.profile-sidebar {\n  display: flex;\n  flex-direction: column;\n  height: 97%;\n  width: 23%;\n  padding: 10px;\n  background-color: #f2f2f2;\n}\n\n.name-date-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  height: 10%;\n  margin-top: 30px;\n  margin-bottom: 30px;\n}\n\n.traveler-name-title,\n.today-date-title,\n.trip-card-title {\n  font-size: 13px;\n}\n\n.today-date-title {\n  margin-top: 25px;\n}\n\n.traveler-name,\n.today-date {\n  font-size: 18px;\n}\n\n.trip-cost-container {\n  display: flex;\n  align-items: center;\n  height: 11%;\n  padding: 10px;\n  border-radius: 5px;\n  margin-top: 40px;\n  border-left: 5px solid #fa9863;\n  background-color: #fec09fd7;\n}\n\n.book-now-container {\n  align-self: center;\n  font-size: 21px;\n  width: 90%;\n  margin-top: 80px;\n}\n\n.icon-text-container {\n  display: flex;\n  justify-content: space-evenly;\n  margin-bottom: 10px;\n}\n\n.book-now-button {\n  font-size: 18px;\n  padding: 5px;\n  width: 90%;\n  margin-left: 10px;\n}\n\n/* ~~~~~~~~~~~~~~~~~~ FORM RULES ~~~~~~~~~~~~~~~~~~~~~~~~~~ */\n\n.new-trip-form-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n  height: 100%;\n  width: 75%;\n  margin-top: 20px;\n  align-self: center;\n}\n\n.new-trip-form {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  padding: 20px;\n  height: 65%;\n  width: 50%;\n  align-self: center;\n  border-radius: 10px;\n  background-color: #f1ede6;\n  box-shadow: -5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3);\n}\n\n.new-trip-form label,\n.login-form {\n  font-size: 18px;\n}\n\n.new-trip-form input,\n.new-trip-form select,\n.login-form input {\n  font-size: 16px;\n}\n\n.form-title-container {\n  display: flex;\n  align-self: center;\n}\n\n.form-title {\n  margin-left: 10px;\n}\n\n.trip-quote {\n  align-self: center;\n}\n\n.back-to-dashboard-button,\n.clear-form-button,\n.quote-button,\n.submit-button {\n  font-size: 15px;\n  padding: 3px;\n}\n\n.quote-button,\n.submit-button {\n  align-self: center;\n  width: 40%;\n}\n\n.form-errors,\n.date-error-message {\n  align-self: center;\n  font-size: 19px;\n  color: #f88a4f;\n  font-weight: 400;\n}\n\n.form-button-container {\n  display: flex;\n  justify-content: space-around;\n  width: 30%;\n}\n\n.trip-request-success-msg,\n.trip-quote {\n  color: #dd7b45;\n  font-size: 19px;\n  padding: 7px;\n  font-weight: 400;\n}\n\n/* ~~~~~~~~~~~~~~~~~~ LOGIN RULES ~~~~~~~~~~~~~~~~~~~~~~~~~~ */\n\n.login-page {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 30px;\n  padding: 10px;\n  height: 100%;\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height:75%;\n  width: 30%;\n  margin-top: 30px;\n  padding: 10px;\n  border-radius: 10px;\n  background-color: #f1ede6;\n  box-shadow: -5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3);\n}\n\n.username-container,\n.password-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  height: 30%;\n  width: 60%;\n}\n\n.username-container {\n  margin-bottom: 10px;\n}\n\n.password-container {\n  margin-top: 10px;\n}\n\n#username,\n#password {\n  margin-top: 5px;\n}\n\n.login-button {\n  margin-top: 20px;\n  width: 40%;\n  font-size: 15px;\n  padding: 3px;\n}\n\n.password-error,\n.username-error {\n  color: #f88a4f;\n  font-size: 14px;\n  font-weight: 400;\n}\n\n/* ~~~~~~~~~~~~~~~~~~ HIDDEN RULE ~~~~~~~~~~~~~~~~~~~~~~~~~~ */\n\n.hidden {\n  display: none;\n}\n\n/* ~~~~~~~~~~~~~~~~~~ MEDIA QUERIES ~~~~~~~~~~~~~~~~~~~~~~~~~~ */\n\n\n@media screen and (max-width: 425px) {\n  .nav-bar {\n    flex-direction: column;\n    justify-content: center;\n    align-items: flex-start;\n  }\n  .login-form {\n    width: 80%;\n  }\n}\n\n@media screen and (max-width: 1113px) {\n  .filter-button {\n    font-size: 15px;\n  }\n  .book-now-container {\n    font-size: 15px;\n  }\n  .icon-text-container {\n    align-items: center;\n  }\n  .total-cost-of-trips {\n    font-size: 15px;\n  }\n}\n\n@media screen and (max-width: 997px) {\n  .filter-button {\n    font-size: 13px;\n  }\n}\n\n@media screen and (max-width: 882px) {\n  .filter-button {\n    font-size: 10px;\n  }\n}\n\n@media screen and (max-width: 861px) {\n  .trip-card {\n    width: 39%;\n  }\n  .profile-sidebar {\n    width: 30%;\n  }\n  .trip-info-container {\n    height: 37%;\n    padding: 5px;\n  }\n  .trip-info {\n    font-size: 17px;\n  }\n  .trip-card-title {\n    font-size: 11px;\n  }\n  .trip-card-img-container {\n    margin-top: 2px;\n  }\n}\n\n@media screen and (max-width: 749px) {\n  .filter-button {\n    width: 20%;\n  }\n  .profile-sidebar {\n    width: 35%;\n  }\n  .form-title {\n    font-size: 20px;\n  }\n  .new-trip-form {\n    width: 70%;\n  }\n  .new-trip-form label {\n    font-size: 15px;\n  }\n  .login-form {\n    width: 50%;\n  }\n}\n\n@media screen and (max-width: 656px) {\n  .trip-card {\n    width: 55%;\n  }\n  .profile-sidebar {\n    width: 45%;\n  }\n}\n\n@media screen and (max-width: 630px) {\n  .filter-button {\n    width: 25%;\n  }\n}\n\n@media screen and (max-width: 508px) {\n  .filter-button {\n    height: 60%;\n  }\n  .welcome {\n    font-size: 17px;\n  }\n}\n\n@media screen and (max-width: 453px) {\n  .trip-card {\n    width: 77%;\n  }\n  .login-form {\n    width: 70%;\n  }\n  .welcome {\n    font-size: 13px;\n  }\n  .not-found-msg {\n    font-size: 20px;\n    margin-top: 20px;\n  }\n}\n\n@media screen and (max-width: 419px) {\n  .book-now-button {\n    font-size: 14px;\n  }\n  .total-cost-of-trips {\n    font-size: 14px;\n  }\n}\n\n@media screen and (max-width: 375px) {\n  .traveler-name-title,\n  .today-date-title {\n    font-size: 11px;\n  }\n  .traveler-name,\n  .today-date {\n    font-size: 15px;\n  }\n  .trip-cost-container {\n    height: 15%;\n    margin-top: 20px;\n  }\n  .filter-button {\n    font-size: 11px;\n  }\n  .login-form {\n    width: 80%;\n  }\n  .main-section {\n    flex-direction: column;\n  }\n  .profile-sidebar {\n    width: 96%;\n    height: 60%;\n    border-top: 1px solid #cdcdcd;\n  }\n  .book-now-container {\n    margin-top: 20px;\n  }\n  .icon-text-container {\n    justify-content: center;\n  }\n  .traveler-name,\n  .today-date {\n    font-size: 17px;\n  }\n  .total-cost-of-trips {\n    font-size: 18px;\n  }\n  body {\n    width: 100%;\n  }\n  .new-trip-form {\n    width: 95%;\n  }\n  .form-title {\n    font-size: 16px;\n  }\n}\n\n@media screen and (max-width: 320px) {\n  body {\n    width: 100%;\n  }\n  .quote-button {\n    width: 90%;\n  }\n  .form-title {\n    font-size: 14px;\n  }\n  .form-title-container {\n    align-items: center;\n  }\n  .back-to-dashboard-button,\n  .submit-button,\n  .clear-form-button {\n    font-size: 12px;\n  }\n  .form-errors,\n  .date-error-message {\n    font-size: 15px;\n  }\n  .new-trip-form input,\n  .new-trip-form select,\n  .login-form input {\n  font-size: 16px;\n  }\n}\n\n@media screen and (max-width: 537px) {\n  .new-trip-form {\n    width: 90%;\n  }\n  .form-button-container {\n    width: 100%;\n  }\n  .back-to-dashboard-button,\n  .submit-button {\n    width: 70%;\n  }\n  .trip-request-success-msg,\n  .trip-quote {\n    font-size: 15px;\n  }\n}\n\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,WAAW;EACX,oCAAoC;EACpC,gBAAgB;AAClB;;AAEA;;EAEE,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,YAAY;AACd;;AAEA;EACE,8EAA8E;EAC9E,eAAe;AACjB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,UAAU;AACZ;;AAEA;EACE,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,YAAY;EACZ,yBAAyB;EACzB,gCAAgC;EAChC,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,WAAW;EACX,YAAY;EACZ,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,mBAAmB;EACnB,WAAW;EACX,WAAW;EACX,yBAAyB;AAC3B;;AAEA;EACE,UAAU;EACV,eAAe;EACf,YAAY;AACd;;AAEA,kEAAkE;;AAElE;EACE,aAAa;EACb,eAAe;EACf,6BAA6B;EAC7B,gBAAgB;EAChB,YAAY;EACZ,WAAW;EACX,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,6BAA6B;EAC7B,WAAW;EACX,UAAU;EACV,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,yBAAyB;EACzB,kFAAkF;AACpF;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,8BAA8B;EAC9B,WAAW;EACX,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,WAAW;EACX,WAAW;EACX,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,WAAW;EACX,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,YAAY;EACZ,kCAAkC;AACpC;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,eAAe;AACjB;;AAEA,gEAAgE;;AAEhE;EACE,aAAa;EACb,sBAAsB;EACtB,WAAW;EACX,UAAU;EACV,aAAa;EACb,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,6BAA6B;EAC7B,WAAW;EACX,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;;;EAGE,eAAe;AACjB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;EAEE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,WAAW;EACX,aAAa;EACb,kBAAkB;EAClB,gBAAgB;EAChB,8BAA8B;EAC9B,2BAA2B;AAC7B;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,UAAU;EACV,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,UAAU;EACV,iBAAiB;AACnB;;AAEA,6DAA6D;;AAE7D;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,6BAA6B;EAC7B,YAAY;EACZ,UAAU;EACV,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,6BAA6B;EAC7B,aAAa;EACb,WAAW;EACX,UAAU;EACV,kBAAkB;EAClB,mBAAmB;EACnB,yBAAyB;EACzB,kFAAkF;AACpF;;AAEA;;EAEE,eAAe;AACjB;;AAEA;;;EAGE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;;;;EAIE,eAAe;EACf,YAAY;AACd;;AAEA;;EAEE,kBAAkB;EAClB,UAAU;AACZ;;AAEA;;EAEE,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,UAAU;AACZ;;AAEA;;EAEE,cAAc;EACd,eAAe;EACf,YAAY;EACZ,gBAAgB;AAClB;;AAEA,8DAA8D;;AAE9D;EACE,aAAa;EACb,sBAAsB;EACtB,8BAA8B;EAC9B,mBAAmB;EACnB,gBAAgB;EAChB,aAAa;EACb,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,UAAU;EACV,UAAU;EACV,gBAAgB;EAChB,aAAa;EACb,mBAAmB;EACnB,yBAAyB;EACzB,kFAAkF;AACpF;;AAEA;;EAEE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,WAAW;EACX,UAAU;AACZ;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;EAEE,eAAe;AACjB;;AAEA;EACE,gBAAgB;EAChB,UAAU;EACV,eAAe;EACf,YAAY;AACd;;AAEA;;EAEE,cAAc;EACd,eAAe;EACf,gBAAgB;AAClB;;AAEA,8DAA8D;;AAE9D;EACE,aAAa;AACf;;AAEA,gEAAgE;;;AAGhE;EACE;IACE,sBAAsB;IACtB,uBAAuB;IACvB,uBAAuB;EACzB;EACA;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,eAAe;EACjB;EACA;IACE,eAAe;EACjB;EACA;IACE,mBAAmB;EACrB;EACA;IACE,eAAe;EACjB;AACF;;AAEA;EACE;IACE,eAAe;EACjB;AACF;;AAEA;EACE;IACE,eAAe;EACjB;AACF;;AAEA;EACE;IACE,UAAU;EACZ;EACA;IACE,UAAU;EACZ;EACA;IACE,WAAW;IACX,YAAY;EACd;EACA;IACE,eAAe;EACjB;EACA;IACE,eAAe;EACjB;EACA;IACE,eAAe;EACjB;AACF;;AAEA;EACE;IACE,UAAU;EACZ;EACA;IACE,UAAU;EACZ;EACA;IACE,eAAe;EACjB;EACA;IACE,UAAU;EACZ;EACA;IACE,eAAe;EACjB;EACA;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,UAAU;EACZ;EACA;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,UAAU;EACZ;AACF;;AAEA;EACE;IACE,WAAW;EACb;EACA;IACE,eAAe;EACjB;AACF;;AAEA;EACE;IACE,UAAU;EACZ;EACA;IACE,UAAU;EACZ;EACA;IACE,eAAe;EACjB;EACA;IACE,eAAe;IACf,gBAAgB;EAClB;AACF;;AAEA;EACE;IACE,eAAe;EACjB;EACA;IACE,eAAe;EACjB;AACF;;AAEA;EACE;;IAEE,eAAe;EACjB;EACA;;IAEE,eAAe;EACjB;EACA;IACE,WAAW;IACX,gBAAgB;EAClB;EACA;IACE,eAAe;EACjB;EACA;IACE,UAAU;EACZ;EACA;IACE,sBAAsB;EACxB;EACA;IACE,UAAU;IACV,WAAW;IACX,6BAA6B;EAC/B;EACA;IACE,gBAAgB;EAClB;EACA;IACE,uBAAuB;EACzB;EACA;;IAEE,eAAe;EACjB;EACA;IACE,eAAe;EACjB;EACA;IACE,WAAW;EACb;EACA;IACE,UAAU;EACZ;EACA;IACE,eAAe;EACjB;AACF;;AAEA;EACE;IACE,WAAW;EACb;EACA;IACE,UAAU;EACZ;EACA;IACE,eAAe;EACjB;EACA;IACE,mBAAmB;EACrB;EACA;;;IAGE,eAAe;EACjB;EACA;;IAEE,eAAe;EACjB;EACA;;;EAGA,eAAe;EACf;AACF;;AAEA;EACE;IACE,UAAU;EACZ;EACA;IACE,WAAW;EACb;EACA;;IAEE,UAAU;EACZ;EACA;;IAEE,eAAe;EACjB;AACF","sourcesContent":["* {\n  padding: 0px;\n  margin: 0px;\n  font-family: 'Work Sans', sans-serif;\n  font-weight: 300;\n}\n\nbody,\nhtml {\n  height: 100%;\n  width: 100%;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n}\n\nmain {\n  display: flex;\n  height: 100%;\n}\n\nbutton {\n  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  cursor: pointer;\n}\n\nbutton:hover {\n  color: #fa8241;\n}\n\n.nav-and-login-container {\n  display: flex;\n  flex-direction: column;\n}\n\n.main-logo {\n  display: flex;\n  width: 30%;\n}\n\n.logo {\n  font-size: 30px;\n  margin-left: 10px;\n}\n\n.welcome {\n  font-size: 23px;\n}\n\n.nav-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 50px;\n  background-color: #3e5d88;\n  border-bottom: 3px solid #2f4666;\n  color: white;\n  padding: 25px;\n}\n\n.trip-dashboard {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  background-color: white;\n}\n\n.trip-filter-button-container {\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  width: 100%;\n  height: 10%;\n  background-color: #fa9763;\n}\n\n.filter-button {\n  width: 15%;\n  font-size: 17px;\n  padding: 5px;\n}\n\n/* ~~~~~~~~~~~~~~~~~~ TRIP CARD RULES ~~~~~~~~~~~~~~~~~~~~~~~~~~ */\n\n.trip-cards-container {\n  display: flex;\n  flex-flow: wrap;\n  justify-content: space-around;\n  overflow: scroll;\n  height: 100%;\n  width: 100%;\n  background-color: white;\n}\n\n.trip-card {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  height: 69%;\n  width: 28%;\n  margin: 10px;\n  padding: 10px;\n  border-radius: 10px;\n  background-color: #f2f2f2;\n  box-shadow: -5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3);\n}\n\n.trip-info-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 40%;\n  padding: 10px;\n  border-left: 1px solid #cdcdcd;\n}\n\n.trip-card-img-container {\n  height: 35%;\n  width: 100%;\n  margin-top: 10px;\n  margin-bottom: 5px;\n  align-self: center;\n}\n\nimg {\n  height: 155px;\n  width: 100%;\n  border-radius: 10px;\n}\n\n.trip-card-location {\n  width: 95%;\n  padding: 7px;\n  border-bottom: 1px solid #cdcdcdd0;\n}\n\n.trip-info {\n  font-size: 20px;\n}\n\n.not-found-msg {\n  align-self: center;\n  margin-top: 75px;\n  font-size: 50px;\n}\n\n/* ~~~~~~~~~~~~~~~~~~ SIDEBAR RULES ~~~~~~~~~~~~~~~~~~~~~~~~~~ */\n\n.profile-sidebar {\n  display: flex;\n  flex-direction: column;\n  height: 97%;\n  width: 23%;\n  padding: 10px;\n  background-color: #f2f2f2;\n}\n\n.name-date-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  height: 10%;\n  margin-top: 30px;\n  margin-bottom: 30px;\n}\n\n.traveler-name-title,\n.today-date-title,\n.trip-card-title {\n  font-size: 13px;\n}\n\n.today-date-title {\n  margin-top: 25px;\n}\n\n.traveler-name,\n.today-date {\n  font-size: 18px;\n}\n\n.trip-cost-container {\n  display: flex;\n  align-items: center;\n  height: 11%;\n  padding: 10px;\n  border-radius: 5px;\n  margin-top: 40px;\n  border-left: 5px solid #fa9863;\n  background-color: #fec09fd7;\n}\n\n.book-now-container {\n  align-self: center;\n  font-size: 21px;\n  width: 90%;\n  margin-top: 80px;\n}\n\n.icon-text-container {\n  display: flex;\n  justify-content: space-evenly;\n  margin-bottom: 10px;\n}\n\n.book-now-button {\n  font-size: 18px;\n  padding: 5px;\n  width: 90%;\n  margin-left: 10px;\n}\n\n/* ~~~~~~~~~~~~~~~~~~ FORM RULES ~~~~~~~~~~~~~~~~~~~~~~~~~~ */\n\n.new-trip-form-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n  height: 100%;\n  width: 75%;\n  margin-top: 20px;\n  align-self: center;\n}\n\n.new-trip-form {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  padding: 20px;\n  height: 65%;\n  width: 50%;\n  align-self: center;\n  border-radius: 10px;\n  background-color: #f1ede6;\n  box-shadow: -5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3);\n}\n\n.new-trip-form label,\n.login-form {\n  font-size: 18px;\n}\n\n.new-trip-form input,\n.new-trip-form select,\n.login-form input {\n  font-size: 16px;\n}\n\n.form-title-container {\n  display: flex;\n  align-self: center;\n}\n\n.form-title {\n  margin-left: 10px;\n}\n\n.trip-quote {\n  align-self: center;\n}\n\n.back-to-dashboard-button,\n.clear-form-button,\n.quote-button,\n.submit-button {\n  font-size: 15px;\n  padding: 3px;\n}\n\n.quote-button,\n.submit-button {\n  align-self: center;\n  width: 40%;\n}\n\n.form-errors,\n.date-error-message {\n  align-self: center;\n  font-size: 19px;\n  color: #f88a4f;\n  font-weight: 400;\n}\n\n.form-button-container {\n  display: flex;\n  justify-content: space-around;\n  width: 30%;\n}\n\n.trip-request-success-msg,\n.trip-quote {\n  color: #dd7b45;\n  font-size: 19px;\n  padding: 7px;\n  font-weight: 400;\n}\n\n/* ~~~~~~~~~~~~~~~~~~ LOGIN RULES ~~~~~~~~~~~~~~~~~~~~~~~~~~ */\n\n.login-page {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 30px;\n  padding: 10px;\n  height: 100%;\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height:75%;\n  width: 30%;\n  margin-top: 30px;\n  padding: 10px;\n  border-radius: 10px;\n  background-color: #f1ede6;\n  box-shadow: -5px -5px 9px rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3);\n}\n\n.username-container,\n.password-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  height: 30%;\n  width: 60%;\n}\n\n.username-container {\n  margin-bottom: 10px;\n}\n\n.password-container {\n  margin-top: 10px;\n}\n\n#username,\n#password {\n  margin-top: 5px;\n}\n\n.login-button {\n  margin-top: 20px;\n  width: 40%;\n  font-size: 15px;\n  padding: 3px;\n}\n\n.password-error,\n.username-error {\n  color: #f88a4f;\n  font-size: 14px;\n  font-weight: 400;\n}\n\n/* ~~~~~~~~~~~~~~~~~~ HIDDEN RULE ~~~~~~~~~~~~~~~~~~~~~~~~~~ */\n\n.hidden {\n  display: none;\n}\n\n/* ~~~~~~~~~~~~~~~~~~ MEDIA QUERIES ~~~~~~~~~~~~~~~~~~~~~~~~~~ */\n\n\n@media screen and (max-width: 425px) {\n  .nav-bar {\n    flex-direction: column;\n    justify-content: center;\n    align-items: flex-start;\n  }\n  .login-form {\n    width: 80%;\n  }\n}\n\n@media screen and (max-width: 1113px) {\n  .filter-button {\n    font-size: 15px;\n  }\n  .book-now-container {\n    font-size: 15px;\n  }\n  .icon-text-container {\n    align-items: center;\n  }\n  .total-cost-of-trips {\n    font-size: 15px;\n  }\n}\n\n@media screen and (max-width: 997px) {\n  .filter-button {\n    font-size: 13px;\n  }\n}\n\n@media screen and (max-width: 882px) {\n  .filter-button {\n    font-size: 10px;\n  }\n}\n\n@media screen and (max-width: 861px) {\n  .trip-card {\n    width: 39%;\n  }\n  .profile-sidebar {\n    width: 30%;\n  }\n  .trip-info-container {\n    height: 37%;\n    padding: 5px;\n  }\n  .trip-info {\n    font-size: 17px;\n  }\n  .trip-card-title {\n    font-size: 11px;\n  }\n  .trip-card-img-container {\n    margin-top: 2px;\n  }\n}\n\n@media screen and (max-width: 749px) {\n  .filter-button {\n    width: 20%;\n  }\n  .profile-sidebar {\n    width: 35%;\n  }\n  .form-title {\n    font-size: 20px;\n  }\n  .new-trip-form {\n    width: 70%;\n  }\n  .new-trip-form label {\n    font-size: 15px;\n  }\n  .login-form {\n    width: 50%;\n  }\n}\n\n@media screen and (max-width: 656px) {\n  .trip-card {\n    width: 55%;\n  }\n  .profile-sidebar {\n    width: 45%;\n  }\n}\n\n@media screen and (max-width: 630px) {\n  .filter-button {\n    width: 25%;\n  }\n}\n\n@media screen and (max-width: 508px) {\n  .filter-button {\n    height: 60%;\n  }\n  .welcome {\n    font-size: 17px;\n  }\n}\n\n@media screen and (max-width: 453px) {\n  .trip-card {\n    width: 77%;\n  }\n  .login-form {\n    width: 70%;\n  }\n  .welcome {\n    font-size: 13px;\n  }\n  .not-found-msg {\n    font-size: 20px;\n    margin-top: 20px;\n  }\n}\n\n@media screen and (max-width: 419px) {\n  .book-now-button {\n    font-size: 14px;\n  }\n  .total-cost-of-trips {\n    font-size: 14px;\n  }\n}\n\n@media screen and (max-width: 375px) {\n  .traveler-name-title,\n  .today-date-title {\n    font-size: 11px;\n  }\n  .traveler-name,\n  .today-date {\n    font-size: 15px;\n  }\n  .trip-cost-container {\n    height: 15%;\n    margin-top: 20px;\n  }\n  .filter-button {\n    font-size: 11px;\n  }\n  .login-form {\n    width: 80%;\n  }\n  .main-section {\n    flex-direction: column;\n  }\n  .profile-sidebar {\n    width: 96%;\n    height: 60%;\n    border-top: 1px solid #cdcdcd;\n  }\n  .book-now-container {\n    margin-top: 20px;\n  }\n  .icon-text-container {\n    justify-content: center;\n  }\n  .traveler-name,\n  .today-date {\n    font-size: 17px;\n  }\n  .total-cost-of-trips {\n    font-size: 18px;\n  }\n  body {\n    width: 100%;\n  }\n  .new-trip-form {\n    width: 95%;\n  }\n  .form-title {\n    font-size: 16px;\n  }\n}\n\n@media screen and (max-width: 320px) {\n  body {\n    width: 100%;\n  }\n  .quote-button {\n    width: 90%;\n  }\n  .form-title {\n    font-size: 14px;\n  }\n  .form-title-container {\n    align-items: center;\n  }\n  .back-to-dashboard-button,\n  .submit-button,\n  .clear-form-button {\n    font-size: 12px;\n  }\n  .form-errors,\n  .date-error-message {\n    font-size: 15px;\n  }\n  .new-trip-form input,\n  .new-trip-form select,\n  .login-form input {\n  font-size: 16px;\n  }\n}\n\n@media screen and (max-width: 537px) {\n  .new-trip-form {\n    width: 90%;\n  }\n  .form-button-container {\n    width: 100%;\n  }\n  .back-to-dashboard-button,\n  .submit-button {\n    width: 70%;\n  }\n  .trip-request-success-msg,\n  .trip-quote {\n    font-size: 15px;\n  }\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


const fetchCalls = {

  fetchData: function (urlPath) {
    return fetch(`http://localhost:3001/api/v1/${urlPath}`)
      .then(response => response.json())
      .catch(err => (0,_scripts__WEBPACK_IMPORTED_MODULE_0__.handleServerErrors)(err))
  },
  postData: function (urlPath, newData) {
    fetch(`http://localhost:3001/api/v1/${urlPath}`, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {'Content-Type': 'application/json'}
    })
        .then(response => (0,_scripts__WEBPACK_IMPORTED_MODULE_0__.checkForErrors)(response))
        .catch(err => (0,_scripts__WEBPACK_IMPORTED_MODULE_0__.handleServerErrors)(err))
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchCalls);

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


//Selector Variables -------------------------------------------------------------------------------------

const welcomeMessage = document.getElementById('welcome');
const travelerName = document.getElementById('travelerName');
const todayDate = document.getElementById('todayDate');
const totalTripCost = document.getElementById('totalTripCost');
const allTripsContainer = document.getElementById('allTrips');
const mainDashboard = document.getElementById('mainSection');
const upcomingTripsContainer = document.getElementById('upcomingTrips');
const notFoundMessage = document.getElementById('notFound');
const tripFormPage = document.getElementById('tripFormContainer');
const currentTravelerID = document.getElementById('currentTravelerID');
const destinationDropDown = document.getElementById('tripDestination');
const tripQuote = document.getElementById('tripQuote');
const successMsg = document.getElementById('successMsg');
const dateErrorMsg = document.getElementById('dateError');
const formErrorTag = document.getElementById('formErrors');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');

//DOM Updates -------------------------------------------------------------------------------------

let domUpdates = {

  updateWelcomeMessage: function (data) {
    const firstName = data.currentTraveler.name.split(' ')[0];
    welcomeMessage.innerText = `welcome, ${firstName.toLowerCase()}`;
  },
  updateTravelerProfile: function (data) {
    travelerName.innerText = data.currentTraveler.name;
    todayDate.innerText = `${new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric',})}`;
  },
  updateTravelerSpending: function (data, cost) {
    totalTripCost.innerText = `You've spent ${(0,_scripts__WEBPACK_IMPORTED_MODULE_0__.formatCost)(cost)} on trips this year`;
  },
  updateTravelerTrips: function (trip, selector) {
    selector.innerHTML += `
      <div class="all-trips trip-card">
        <h3 class="trip-card-location" id=${trip.id}>${trip.destinationID.destination}</h3>
        <div class="trip-card-img-container trip-info">
          <img src=${trip.destinationID.image} alt=${trip.destinationID.alt}></img>
        </div>
        <div class="trip-info-container">
          <h4 class="trip-card-title">number of travelers</h4>
          <h4 class="num-travelers trip-info" id=${trip.id}>${trip.travelers}</h4>
          <h4 class="trip-card-title">departure date</h4>
          <h4 class="departure trip-info" id=${trip.id}>${(0,_scripts__WEBPACK_IMPORTED_MODULE_0__.formatDate)(trip.date)}</h4>
          <h4 class="trip-card-title">trip duration</h4>
          <h4 class="duration trip-info" id=${trip.id}>${trip.duration} days</h4>
          <h4 class="trip-card-title">trip status</h4>
          <h4 class="trip-status trip-info" id=${trip.id}>${trip.status}</h4>
        </div>
      </div>`
  },
  showItem: function (selector) {
    selector.classList.remove('hidden');
  },
  hideItem: function (selector) {
    selector.classList.add('hidden');
  },
  displayNotFoundMessage: function () {
    notFoundMessage.classList.remove('hidden');
    allTripsContainer.classList.add('hidden');
    upcomingTripsContainer.classList.add('hidden');
  },
  displayAndHideFormPage: function () {
    mainDashboard.classList.toggle('hidden');
    tripFormPage.classList.toggle('hidden');
  },
  addTravelerIDToForm: function(id) {
    currentTravelerID.innerText = id;
  },
  displayDestinationDropDown: function (destination) {
    destinationDropDown.innerHTML += `
      <option value=${destination.destination} id=${destination.id} data-flight=${destination.estimatedFlightCostPerPerson} data-lodging=${destination.estimatedLodgingCostPerDay}>${destination.destination}</option>
    `
  },
  displayFormError: function () {
    formErrorTag.innerText = "Make sure you fill out all fields!";
  },
  displayDateError: function () {
    dateErrorMsg.innerText = "Please pick a date in the future!";
  },
  displayDurationOrTravelerError: function () {
    formErrorTag.innerText = "Number of travelers must be less than 10 and trip duration must be less than 365";
  },
  displayCostEstimate: function (cost) {
    tripQuote.innerText = `Your trip cost estimate for ${destinationDropDown.options[destinationDropDown.selectedIndex].text} is ${(0,_scripts__WEBPACK_IMPORTED_MODULE_0__.formatCost)(cost)}. Do you want to proceed with booking?`;
  },
  displayFormSuccessMsg: function () {
    successMsg.innerText = `Trip request successful! You'll hear from your travel agent once it's been approved.`;
  },
  validateUsername: function (letters, numbers) {
    if (letters !== 'traveler' || numbers === '0' || numbers === '00' || numbers === undefined || numbers === '' || parseInt(numbers) > 50) {
      usernameInput.className = 'incorrect';
      usernameError.innerText = "username does not match";
    } 
    else {
      usernameInput.className = 'correct';
    };
  },
  validatePassword: function (password) {
    if (password !== "travel") {
      passwordInput.className = 'incorrect';
      passwordError.innerText = "password does not match";
    } else {
      passwordInput.className = 'correct';
    };
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domUpdates);

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Traveler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);


class TravelDatabase {
  constructor(data){
    this.data = data;
    this.travelers = data.allTravelers;
    this.trips = data.allTrips;
    this.destinations = data.allDestinations;
    this.currentTraveler = {};
  };

  findATraveler(id) {
    const singleTravelerData = this.travelers.find(traveler => traveler.id === id);
    const singleTravelerTrips = this.trips.filter(trip => trip.userID === id);
    this.currentTraveler = new _Traveler__WEBPACK_IMPORTED_MODULE_0__.default(singleTravelerData, singleTravelerTrips, this.destinations);
    return this.currentTraveler;
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TravelDatabase);



/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Traveler {
  constructor(travelerData, travelerTrips, destinations) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.travelerTrips = travelerTrips;
    this.pastTrips = [];
    this.upcomingTrips = [];
    this.currentTrip = [];
    this.pendingTrips = [];
    this.destinations = destinations;
  };

  sortTrips() {
    const sortedTrips = this.travelerTrips.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    return sortedTrips;
  };

  findPastTrips() {
    this.sortTrips();
    const currentDate = new Date().toLocaleDateString();
    this.pastTrips = this.travelerTrips.filter(trip => {
      let departureDate = new Date(trip.date);
      let returnDate = new Date(departureDate.setDate(departureDate.getDate() + trip.duration));
      return new Date(trip.date) < new Date(currentDate) && returnDate < new Date(currentDate);
    });
    return this.pastTrips;
  };

  findUpcomingTrips() {
    this.sortTrips();
    const currentDate = new Date().toLocaleDateString();
    this.upcomingTrips = this.travelerTrips.filter(trip => {
      let departureDate = new Date(trip.date);
      let returnDate = new Date(departureDate.setDate(departureDate.getDate() + trip.duration));
      return new Date(trip.date) > new Date(currentDate) && returnDate > new Date(currentDate);
    });
    return this.upcomingTrips;
  };

  findCurrentTrip() {
    this.sortTrips();
    const currentDate = new Date().toLocaleDateString();
    this.currentTrip = this.travelerTrips.filter(trip => {
      let departureDate = new Date(trip.date);
      let returnDate = new Date(departureDate.setDate(departureDate.getDate() + trip.duration));
      return new Date(trip.date) <= new Date(currentDate) && returnDate >= new Date(currentDate);
    })
    return this.currentTrip;
  };

  findPendingTrips() {
    this.sortTrips();
    this.pendingTrips = this.travelerTrips.filter(trip => trip.status === "pending");
    return this.pendingTrips;
  };

  findTravelerDestinations() {
    this.sortTrips();
    this.travelerTrips.map(trip => {
      const matchingDestination = this.destinations.find(destination => destination.id === trip.destinationID);
      return trip.destinationID = matchingDestination;
    });
    return this.travelerTrips;
  };

  findYearlyTrips() {
    this.findTravelerDestinations();
    const thisYearsTrips = [];
    const currentYear = new Date().getFullYear();
    this.travelerTrips.forEach(trip => {
      if (new Date(trip.date).getFullYear() === currentYear) {
        thisYearsTrips.push(trip);
      };
    })
    return thisYearsTrips;
  };

  calculateYearlyTripCost() {
    const thisYearTrips = this.findYearlyTrips();
    const lodgingCost = thisYearTrips.reduce((total, trip) => {
      return total += trip.destinationID.estimatedLodgingCostPerDay * trip.duration;
    }, 0);
    const flightCost = thisYearTrips.reduce((total, trip) => {
      return total += (trip.destinationID.estimatedFlightCostPerPerson * 2) * trip.travelers;
    }, 0);
    const baseCost = lodgingCost + flightCost;
    const travelAgentFee = baseCost / 10;
    const finalTotal = baseCost + travelAgentFee;
    return finalTotal;
  };

  findNumDaysTraveled() {
    const approvedTrips = this.travelerTrips.filter(trip => trip.status === "approved");
    return approvedTrips.reduce((total, trip) => {
      return total += trip.duration;
    }, 0)
  };
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Traveler);

/***/ })
/******/ 	]);
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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map