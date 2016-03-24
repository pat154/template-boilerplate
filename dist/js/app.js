"use strict";

"use-strict";

// Handle console being undefined in IE when dev tools aren't open
if (typeof console == "undefined") {
    window.console = {
        log: function log() {}
    };
}
// Global app object
window.APP = typeof window.APP == 'undefined' ? {} : window.APP;

(function ($) {

    // Document ready
    $(function () {

        // Bootstrapping
        // Add any app components to this array that you want to be initialised after page load
        var components = [{
            selector: '.globalHeader',
            moduleName: 'Navigation',
            module: Navigation
        }];

        function init(components) {
            // Run any modules for components that are present on the page
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var component = _step.value;

                    // Skip over if component is not on this page
                    if ($(component.selector).length <= 0) continue;

                    var _module2 = component.module,
                        $el = $(component.selector);

                    console.log("[APP] Initialising module: " + component.moduleName);

                    // If there are multiple instances of an object, loop over them and initilise each one
                    if ($el.length > 1) {
                        for (var x = 0; x < $el.length; x++) {
                            APP[component.moduleName] = new _module2($el.eq(x), component.options);
                            APP[component.moduleName].init();
                        }
                    } else {
                        APP[component.moduleName] = new _module2($el, component.options);
                        APP[component.moduleName].init();
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        init(components);
    });
})(jQuery);

//Google Maps
function initMap() {
    var MyLatLng = { lat: -33.90772475434785, lng: 151.22056427001954 };
    var marker;
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
        center: MyLatLng,
        zoom: 12
    });

    map.addListener('center_changed', function () {
        $('#txtGeoLat').val(map.getCenter().lat());
        $('#txtGeoLong').val(map.getCenter().lng());
    });
};
/*****************
	Generic module class
*****************/
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Module = (function () {
	function Module($el, options) {
		_classCallCheck(this, Module);

		this.opts = options;
		this.$el = $el;
	}

	_createClass(Module, [{
		key: "getElement",
		value: function getElement() {
			return this.$el;
		}
	}]);

	return Module;
})();
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigation = (function (_Module) {
	_inherits(Navigation, _Module);

	function Navigation() {
		_classCallCheck(this, Navigation);

		_get(Object.getPrototypeOf(Navigation.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Navigation, [{
		key: 'mobileNav',
		value: function mobileNav() {
			$('.globalHeader-menuToggle, .globalHeader-closeMobileNav', this.$el).on('click', function () {
				$('.globalHeader-navigation').toggleClass('globalHeader-navigation_open');
			});
		}
	}, {
		key: 'init',
		value: function init() {
			// Sub navigation expanded
			this.mobileNav();
		}
	}]);

	return Navigation;
})(Module);