'use strict';

//Polyfill
if (!Object.create) {
	Object.create = function (o) {
		if (arguments.length > 1) {
			throw new Error('Sorry the polyfill Object.create only accepts the first parameter.');
		}
		function F() {}
		F.prototype = o;
		return new F();
	};
}
if (!Array.indexOf){ 
	Array.prototype.indexOf = function(obj){ 
		for(var i=0; i<this.length; i++){ 
			if(this[i]==obj){ return i; } 
		} 
		return -1; 
	};
}
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback,thisArg) {
		var T,k;
		if(this === null) {
			throw new TypeError('error');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if(typeof callback !== "function"){
			throw new TypeError('error');
		}
		if(arguments.length > 1){
			T = thisArg;
		}
		k = 0;
		while(k < len){
			var kValue;
			if(k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}
if (!Array.isArray) {
	Array.isArray = function(arg){
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}
if (!Object.keys){
	Object.keys = (function() {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toDtring : null }).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'varructor'
			],
			dontEnumsLength = dontEnums.length;
		
		return function(obj) {
			if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
				throw new TypeError('Object.keys called on non=object');
			}
			var result = [], prop, i;
			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}
			if (hasDontEnumBug) {
				for (i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}()); 
}

//utils module
;(function ($, win, doc, undefined) {

	'use strict';

	var global = '$plugins';
	var namespace = 'netiveUI.plugins';
	
	//global namespace
	if (!!win[global]) {
		throw new Error("already exists global!> " + global);
	} else {
		win[global] = createNameSpace(namespace, {
			uiNameSpace: function (identifier, module) { 
				return createNameSpace(identifier, module); 
			}
		});
	}
	function createNameSpace(identifier, module) {
		var name = identifier.split('.'),
			w = win,
			p;

		if (!!identifier) {
			for (var i = 0, len = name.length; i < len; i += 1) {
				(!w[name[i]]) ? (i === 0) ? w[name[i]] = {} : w[name[i]] = {} : '';
				w = w[name[i]];
			}
		}

		if (!!module) {
			for (p in module) {
				if (!w[p]) {
					w[p] = module[p];
				} else {
					throw new Error("module already exists! >> " + p);
				}
			}
		}
		return w;
	}

	//jquery easing add
	var easings = {
		linear : function(t,b,c,d){return c*t/d+b;},
		easeInQuad : function(t,b,c,d){return c*(t/=d)*t+b;},
		easeOutQuad : function(t,b,c,d){return -c*(t/=d)*(t-2)+b;},
		easeInOutQuad : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return -c/2*((--t)*(t-2)-1)+b;},
		easeOutInQuad : function(t,b,c,d){if(t < d/2)return easings.easeOutQuad(t*2,b,c/2,d);return easings.easeInQuad((t*2)-d,b+c/2,c/2,d);},
		easeInCubic : function(t,b,c,d){return c*(t/=d)*t*t+b;},
		easeOutCubic : function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},
		easeInOutCubic : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},
		easeOutInCubic : function(t,b,c,d){if(t<d/2)return easings.easeOutCubic(t*2,b,c/2,d);return easings.easeInCubic((t*2)-d,b+c/2,c/2,d);},
		easeInQuart : function(t,b,c,d){return c*(t/=d)*t*t*t+b;},
		easeOutQuart : function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b;},
		easeInOutQuart : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return -c/2*((t-=2)*t*t*t-2)+b;},
		easeOutInQuart : function(t,b,c,d){if(t<d/2)return easings.easeOutQuart(t*2,b,c/2,d);return easings.easeInQuart((t*2)-d,b+c/2,c/2,d);},
		easeInQuint : function(t,b,c,d){return c*(t/=d)*t*t*t*t+b;},
		easeOutQuint : function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},
		easeInOutQuint : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},
		easeOutInQuint : function(t,b,c,d){if(t<d/2)return easings.easeOutQuint(t*2,b,c/2,d);return easings.easeInQuint((t*2)-d,b+c/2,c/2,d);},
		easeInSine : function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b;},
		easeOutSine : function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},
		easeInOutSine : function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b;},
		easeOutInSine : function(t,b,c,d){if(t<d/2)return easings.easeOutSine(t*2,b,c/2,d);return easings.easeInSine((t*2)-d,b+c/2,c/2,d);},
		easeInExpo : function(t,b,c,d){return (t===0)? b : c*Math.pow(2,10*(t/d-1))+b-c*0.001;},
		easeOutExpo : function(t,b,c,d){return (t==d)? b+c : c*1.001*(-Math.pow(2,-10*t/d)+1)+b;},
		easeInOutExpo : function(t,b,c,d){if(t===0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b-c*0.0005;return c/2*1.0005*(-Math.pow(2,-10*--t)+2)+b;},
		easeOutInExpo : function(t,b,c,d){if(t<d/2)return easings.easeOutExpo(t*2,b,c/2,d);return easings.easeInExpo((t*2)-d,b+c/2,c/2,d);},
		easeInCirc : function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;},
		easeOutCirc : function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},
		easeInOutCirc : function(t,b,c,d){if((t/=d/2)<1)return -c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},
		easeOutInCirc : function(t,b,c,d){if (t<d/2)return easings.easeOutCirc(t*2,b,c/2,d);return easings.easeInCirc((t*2)-d,b+c/2,c/2,d);},		
		easeInElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},
		easeOutElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return (a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b);},
		easeInOutElastic : function(t,b,c,d,a,p){if(t===0)return b;if((t/=d/2)==2)return b+c;var s,p=d*(.3*1.5),a=0;var s,p=(!p||typeof(p)!='number')? d*(.3*1.5) : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return -.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},
		easeOutInElastic : function(t,b,c,d,a,p){if (t<d/2)return easings.easeOutElastic(t*2,b,c/2,d,a,p);return easings.easeInElastic((t*2)-d,b+c/2,c/2,d,a,p);},
		easeInBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*(t/=d)*t*((s+1)*t-s)+b;},
		easeOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},
		easeInOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},
		easeOutInBack : function(t,b,c,d,s){if(t<d/2)return easings.easeOutBack(t*2,b,c/2,d,s);return easings.easeInBack((t*2)-d,b+c/2,c/2,d,s);},			
		easeInBounce : function(t,b,c,d){return c-easings.easeOutBounce(d-t,0,c,d)+b;},
		easeOutBounce : function(t,b,c,d){if((t/=d)<(1/2.75))return c*(7.5625*t*t)+b;else if(t<(2/2.75))return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;else if(t<(2.5/2.75))return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;else return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;},
		easeInOutBounce : function(t,b,c,d){if(t<d/2)return easings.easeInBounce(t*2,0,c,d)*.5+b;else return easings.easeOutBounce(t*2-d,0,c,d)*.5+c*.5+b;},
		easeOutInBounce : function(t,b,c,d){if(t<d/2)return easings.easeOutBounce(t*2,b,c/2,d);return easings.easeInBounce((t*2)-d,b+c/2,c/2,d);}
	};
	var easing;
	for (easing in easings) {
		$.easing[easing] = (function(easingname) {
			return function(x, t, b, c, d) {
				return easings[easingname](t, b, c, d);
			};
		})(easing);
	}

	//html5 tag & device size class 
	(function () {
		var devsize = [1920, 1600, 1440, 1280, 1024, 960, 840, 720, 600, 480, 400, 360];
		var html5tags = ['article', 'aside', 'details', 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'nav', 'main', 'section', 'summary'];
		var width = $('html').outerWidth(),
			colClass = width >= devsize[5] ? 'col-12' : width > devsize[8] ? 'col-8' : 'col-4',
			i = 0,
			size_len = devsize.length,
			max = html5tags.length,
			sizeMode,
			timer;

		win[global].breakpoint = width >= devsize[5] ? true : false;

		var deviceSizeClassName = function(w) {
			for (var i = 0; i < size_len; i++) {
				if (w >= devsize[i]) {
					
					sizeMode = devsize[i];
					win[global].breakpoint = width >= devsize[5] ? true : false;
					break;
				} else {
					w < devsize[size_len - 1] ? sizeMode = 300 : '';
				}
			}
		};

		for (i = 0; i < max; i++) {
			doc.createElement(html5tags[i]);
		}

		deviceSizeClassName(width);
		var sizeCls = 's' + sizeMode;
		
		$()
		$('html').addClass(sizeCls).addClass(colClass);
		win.addEventListener('resize', function() {
			clearTimeout(timer);			
			timer = setTimeout(function () {
				var $html = $('html');
				
				width = win.innerWidth; 
				// document.body.offsetWidth === $(win).outerWidth()
				// win.innerWidth : scroll 포함된 width (+17px)
				// win.outerWidth === screen.availWidth 
				deviceSizeClassName(width);

				colClass = width >= devsize[5] ? 'col-12' : width > devsize[8] ? 'col-8' : 'col-4';
				$html.removeClass('s1920 s1600 s1440 s1280 s1024 s940 s840 s720 s600 s480 s400 s360 s300 col-12 col-8 col-4');
				win[global].breakpoint = width >= devsize[5] ? true : false;

				deviceSizeClassName(width);
				sizeCls = 's' + sizeMode;
				$html.addClass(sizeCls).addClass(colClass);
			}, 100);
		});
	})();

	//requestAnimationFrame
	win.requestAFrame = (function () {
		return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame ||
			//if all else fails, use setTimeout
			function (callback) {
				return win.setTimeout(callback, 1000 / 60); //shoot for 60 fp
			};
	})();
	win.cancelAFrame = (function () {
		return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame ||
			function (id) {
				win.clearTimeout(id);
			};
	})();

	//components option 
	win[global].option = {
		pageName: function() {
			var page = document.URL.substring(document.URL.lastIndexOf("/") + 1),
				pagename = page.split('?');

			return pagename[0]
		},
		keys: { 
			'tab': 9, 'enter': 13, 'alt': 18, 'esc': 27, 'space': 32, 'pageup': 33, 'pagedown': 34, 'end': 35, 'home': 36, 'left': 37, 'up': 38, 'right': 39, 'down': 40
		},
		effect: {
			//http://cubic-bezier.com - css easing effect
			linear: '0.250, 0.250, 0.750, 0.750',
			ease: '0.250, 0.100, 0.250, 1.000',
			easeIn: '0.420, 0.000, 1.000, 1.000',
			easeOut: '0.000, 0.000, 0.580, 1.000',
			easeInOut: '0.420, 0.000, 0.580, 1.000',
			easeInQuad: '0.550, 0.085, 0.680, 0.530',
			easeInCubic: '0.550, 0.055, 0.675, 0.190',
			easeInQuart: '0.895, 0.030, 0.685, 0.220',
			easeInQuint: '0.755, 0.050, 0.855, 0.060',
			easeInSine: '0.470, 0.000, 0.745, 0.715',
			easeInExpo: '0.950, 0.050, 0.795, 0.035',
			easeInCirc: '0.600, 0.040, 0.980, 0.335',
			easeInBack: '0.600, -0.280, 0.735, 0.045',
			easeOutQuad: '0.250, 0.460, 0.450, 0.940',
			easeOutCubic: '0.215, 0.610, 0.355, 1.000',
			easeOutQuart: '0.165, 0.840, 0.440, 1.000',
			easeOutQuint: '0.230, 1.000, 0.320, 1.000',
			easeOutSine: '0.390, 0.575, 0.565, 1.000',
			easeOutExpo: '0.190, 1.000, 0.220, 1.000',
			easeOutCirc: '0.075, 0.820, 0.165, 1.000',
			easeOutBack: '0.175, 0.885, 0.320, 1.275',
			easeInOutQuad: '0.455, 0.030, 0.515, 0.955',
			easeInOutCubic: '0.645, 0.045, 0.355, 1.000',
			easeInOutQuart: '0.770, 0.000, 0.175, 1.000',
			easeInOutQuint: '0.860, 0.000, 0.070, 1.000',
			easeInOutSine: '0.445, 0.050, 0.550, 0.950',
			easeInOutExpo: '1.000, 0.000, 0.000, 1.000',
			easeInOutCirc: '0.785, 0.135, 0.150, 0.860',
			easeInOutBack: '0.680, -0.550, 0.265, 1.550'
		},
		uiComma: function(n){
			//숫자 세자리수마다 , 붙이기
			var parts = n.toString().split(".");

			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		},
		partsAdd0 :function(x) {
			//숫자 한자리수 일때 0 앞에 붙이기
			return Number(x) < 10 ? '0' + x : x;
		}
	};

	// set device information
	(function () {
		var ua = navigator.userAgent,
			ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
			deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'],
			filter = "win16|win32|win64|mac|macintel",
			uAgent = ua.toLowerCase(),
			deviceInfo_len = deviceInfo.length;

		var browser = win[global].browser = {},
			support = win[global].support = {},
			i = 0,
			version,
			device;

		for (i = 0; i < deviceInfo_len; i++) {
			if (uAgent.match(deviceInfo[i]) != null) {
				device = deviceInfo[i];
				break;
			}
		}
		
		browser.local = (/^http:\/\//).test(location.href);
		browser.firefox = (/firefox/i).test(ua);
		browser.webkit = (/applewebkit/i).test(ua);
		browser.chrome = (/chrome/i).test(ua);
		browser.opera = (/opera/i).test(ua);
		browser.ios = (/ip(ad|hone|od)/i).test(ua);
		browser.android = (/android/i).test(ua);
		browser.safari = browser.webkit && !browser.chrome;
		browser.app = ua.indexOf('appname') > -1 ? true : false;

		//touch, mobile 환경 구분
		support.touch = browser.ios || browser.android || (doc.ontouchstart !== undefined && doc.ontouchstart !== null);
		browser.mobile = support.touch && ( browser.ios || browser.android);
		//navigator.platform ? filter.indexOf(navigator.platform.toLowerCase()) < 0 ? browser.mobile = false : browser.mobile = true : '';
		
		//false 삭제
		// for (j in browser) {
		// 	if (!browser[j]) {
		// 		delete browser[j]
		// 	}
		// }
		
		//os 구분
		browser.os = (navigator.appVersion).match(/(mac|win|linux)/i);
		browser.os = browser.os ? browser.os[1].toLowerCase() : '';

		//version 체크
		if (browser.ios || browser.android) {
			version = ua.match(/applewebkit\/([0-9.]+)/i);
			version && version.length > 1 ? browser.webkitversion = version[1] : '';
			if (browser.ios) {
				version = ua.match(/version\/([0-9.]+)/i);
				version && version.length > 1 ? browser.ios = version[1] : '';
			} else if (browser.android) {
				version = ua.match(/android ([0-9.]+)/i);
				version && version.length > 1 ? browser.android = parseInt(version[1].replace(/\./g, '')) : '';
			}
		}

		if (ie) {
			browser.ie = ie = parseInt( ie[1] || ie[2] );
			( 11 > ie ) ? support.pointerevents = false : '';
			( 9 > ie ) ? support.svgimage = false : '';
		} else {
			browser.ie = false;
		}

		var clsBrowser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie' + browser.ie : 'other';
		var clsMobileSystem = browser.ios ? "ios" : browser.android ? "android" : 'etc';
		var clsMobile = browser.mobile ? browser.app ? 'ui-a ui-m' : 'ui-m' : 'ui-d';

		//doc.querySelector('html').classList.add(browser.os, clsBrowser, clsMobileSystem, clsMobile);
		$('html').addClass(browser.os);
		$('html').addClass(clsBrowser);
		$('html').addClass(clsMobileSystem);
		$('html').addClass(clsMobile);

	})();


	/* **************************************************************************************************** */
	/* **************************************************************************************************** */
	/* **************************************************************************************************** */
	/* **************************************************************************************************** */

	/* ------------------------
	 * [base] selector type
	 * date : 2020-06-09
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiSelectorType: function (v) {
			return createUiSelectorType(v);
		}
	});
	function createUiSelectorType(v) {
		var selector = $('body');
		if (v === null) {
			selector = $('body')
		} else {
			if (typeof v === 'string') {
				selector = $('#' + v);
			} else {
				selector = v;
			}
		}

		return selector;
	}

	/* ------------------------
	 * [base] loading
	 * date : 2020-06-09
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiLoading: function (opt) {
			return createUiLoading(opt);
		}
	});
	win[global].uiLoading.timerShow = {};
	win[global].uiLoading.timerHide = {};
	win[global].uiLoading.option = {
		id: null,
		visible: true,
		txt : null,
		styleClass : 'orbit' //time
	}
	function createUiLoading(opt) {
		var opt = $.extend(true, {}, win[global].uiLoading.option, opt);
		var id = opt.id;
		var styleClass = opt.styleClass;
		var loadingVisible = opt.visible;
		var txt = opt.txt;
		var	$selector = win[global].uiSelectorType(id);
		var htmlLoading = '';

		$('.ui-loading').not('.visible').remove();

		id === null ?
			htmlLoading += '<div class="ui-loading '+ styleClass +'">':
			htmlLoading += '<div class="ui-loading '+ styleClass +'" style="position:absolute">';
		htmlLoading += '<div class="ui-loading-wrap">';

		txt !== null ?
			htmlLoading += '<strong class="ui-loading-txt"><span>'+ txt +'</span></strong>':
			htmlLoading += '';

		htmlLoading += '</div>';
		htmlLoading += '<button type="button" class="btn-base" style="position:fixed; bottom:10%; right:10%; z-index:100;" onclick="$plugins.uiLoading({ visible:false });"><span>$plugins.uiLoading({ visible:false })</span></button>';
		htmlLoading += '</div>';

		if(loadingVisible) {
			clearTimeout(win[global].uiLoading.timerShow);
			clearTimeout(win[global].uiLoading.timerHide);
			win[global].uiLoading.timerShow = setTimeout(function(){
				showLoading();
			},300);
			
		}
		if(!loadingVisible) {
			clearTimeout(win[global].uiLoading.timerShow);
			win[global].uiLoading.timerHide = setTimeout(function(){
				hideLoading();
			},300)
			
		}	

		function showLoading(){
			!$selector.find('.ui-loading').length && $selector.append(htmlLoading);	
			htmlLoading = '';		
			$selector.data('loading', true);
			$('.ui-loading').addClass('visible').removeClass('close');			
		}
		function hideLoading(){
			$selector.data('loading', false);
			$('.ui-loading').addClass('close');	
			setTimeout(function(){
				$('.ui-loading').removeClass('visible')
				$('.ui-loading').remove();
			},300);
		}
	}


	/* ------------------------
	 * [base] console guide
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiConsoleGuide: function (opt) {
			return createUiConsoleGuide(opt);
		}
	});
	function createUiConsoleGuide(opt) {
		if (!win[global].browser.ie) {
			console.log('');
			for (var i = 0; i < opt.length; i++) {
				(i === 0) ? console.log("%c" + opt[i], "background:#333; color:#ffe400; font-size:12px"): console.log(opt[i]);
			}
			console.log('');
		}
	}


	/* --------------------------------------------------------------------------------------------------------
	 * [base] valueCheck
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiValueCheck: function(opt) {
			return createUivalueCheck(opt)
		}
	});
	win[global].uiValueCheck.option = {
		first: false
	}
	function createUivalueCheck(opt){
		var opt = $.extend(true, {}, win[global].uiValueCheck.option, opt),
			type = opt.type,
			target = opt.target,
			first = opt.first,
			msg = opt.message,
			callback = opt.callback,
			error,
			err;

		if (first && target.val().length === 0) {
			return false;
		}

		var	regex,
			reg_id = /^[a-z0-9][a-z0-9_\-]{4,19}$/,
			reg_pw = /^[A-Za-z0-9`\-=\\\[\];',\./~!@#\$%\^&\*\(\)_\+|\{\}:"<>\?]{8,16}$/,
			reg_phone = /^((01[1|6|7|8|9])[1-9][0-9]{6,7})$|(010[1-9][0-9]{7})$/,
			reg_email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			reg_email_id = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))$/,
			reg_email_address = /^((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
			reg_kr = /^[가-힣]{2,}$/,
			reg_en = /^[a-zA-Z]{2,}$/,
			reg_tel = /^[0-9\*]+$/,
			reg_number = /^[0-9]+$/;

		target.val().length === 0 ? err = false : '';
		!err && !!target.attr('required') ? err = true : '';

		switch(type){
			case 'test': 
				valueCheck(reg_kr, target, 'error message', err);
				break;

			case 'id': 
				target.val().length > 0 ? msg ='5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.' : '';
				valueCheck(reg_id, target, msg, err);
				break;

			case 'pw': 
				(target.val().length < 8 && target.val().length > 0) || target.val().length > 16 ? msg = '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.' : '';
				valueCheck(reg_pw, target, msg, err);
				break;

			case 'email':  
				valueCheck(reg_email, target, msg, err);
				break;

			case 'email_id':  
				valueCheck(reg_email_id, target, '정확한 이메일 아이디를 입력해주세요.', err);
				break;

			case 'email_address': 
				valueCheck(reg_email_address, target, '정확한 이메일 주소를 입력해주세요.', err);
				break;


			case 'number': 
				valueCheck(reg_number, target, '숫자로만 입력하세요', err);
				break;

			case 'phone': 
				var str = target.val();
				target.val(str.replace(/\-/g,''));
				
				valueCheck(reg_tel, target, msg, err, 'tel');
				//phoneFomatter(target.val(),0);
				break;

			case 'kr': 
				valueCheck(reg_kr, target, '한글로만 2자 이상 입력하세요.', err);
				break;
			case 'en': 
				valueCheck(reg_en, target, '한글로만 2자 이상 입력하세요.', err);
				break;
		}
		
		function phoneFomatter(num, type){
			var formatNum = '';
			
			if (num.length === 11) {
				if (type === 0) {
					formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3');
				} else {
					formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
				}
			} else if (num.length === 8) {
				formatNum = num.replace(/(\d{4})(\d{4})/, '$1-$2');
			} else {
				if (num.indexOf('02') === 0) {
					if (type === 0) {
						if (num.length === 9) {
							formatNum = num.replace(/(\d{2})(\d{3})(\d{4})/, '$1-****-$3');
						} else {
							formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-****-$3');
						}
					} else {
						if (num.length === 9) {
							formatNum = num.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
						} else {
							formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
						}
					}
				} else {
					if (type === 0) {
						formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3');
						
					} else {
						formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
					}
				}
			}
			return target.val(formatNum);
		}

		function valueCheck(reg, target, msg, err, type){
			if (reg.test(target.val())) {
				error = false;
			} else {
				error = true;
			}

			if (err !== undefined) {
				error = err;
			}

			win[global].uiError({ 
				selector:target, 
				error: error, 
				message: msg 
			});
			
			type === 'tel' ? phoneFomatter(target.val()) : '';

			callback ? callback() : '';
			// target.value = '';
			// target.focus();
		}
		
	}


	/* ------------------------
	 * [base] Ajax
	 * date : 2020-06-09
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiAjax: function (opt) {
			return createUiAjax(opt);
		}
	});
	win[global].uiAjax.option = {
		page: true,
		add: false,
		prepend: false,
		effect: false,
		loading:false,
		callback: false,
		errorCallback: false,

		type: 'GET',
		cache: false,
		async: true,
		contType: 'application/x-www-form-urlencoded',
		dataType: 'html'
	};
	function createUiAjax(opt) {
		if (opt === undefined) {
			return false;
		}

		var opt = opt === undefined ? {} : opt;
		var opt = $.extend(true, {}, win[global].uiAjax.option, opt);
		var $id = typeof opt.id === 'string' ? $('#' + opt.id) : typeof opt.id === 'object' ? opt.id : $('body');
		var loading = opt.loading;
		var effect = opt.effect;
		var callback = opt.callback === undefined ? false : opt.callback;
		var errorCallback = opt.errorCallback === undefined ? false : opt.errorCallback;

		if (loading) {
			win[global].uiLoading({
				visible: true
			});
		}

		if (effect) {
			$id.removeClass('changeover action');
			$id.addClass('changeover');
		}

		$.ajax({
			type: opt.type,
			url: opt.url,
			cache: opt.cache,
			async: opt.async,  
			headers: {
				"cache-control": "no-cache",
				"pragma": "no-cache"
			},
			error: function (request, status, err) {
				if (loading) {
					win[global].uiLoading({
						visible: false
					});
				}
				//console.log(request, status, err);
				errorCallback ? errorCallback() : '';
			},
			success: function (v) {
				if (loading) {
					win[global].uiLoading({
						visible: false
					});
				}

				if (opt.page) {
					opt.add ? opt.prepend ? $id.prepend(v) : $id.append(v) : $id.html(v);
					callback && callback();
					effect && $id.addClass('action');
				} else {
					callback && callback(v);
				}
			},
			complete: function(v){
				//console.log(v);
			}
		});
	}


	/* ------------------------
	 * [base] scroll move
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiScroll: function (opt) {
			return createUiScroll(opt);
		}
	});
	win[global].uiScroll.option = {
		value: 0,
		speed: 0,
		callback: false,
		ps: 'top',
		addLeft: false,
		focus: false,
		target: 'html, body'
	};
	function createUiScroll(opt){
		if (opt === undefined) {
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiScroll.option, opt),
			psVal = opt.value,
			s = opt.speed,
			c = opt.callback,
			p = opt.ps,
			addLeft = opt.addLeft,
			overlap = false,
			f = typeof opt.focus === 'string' ? $('#' + opt.focus) : opt.focus,
			$target = typeof opt.target === 'string' ? $(opt.target) : opt.target;
		
		if (p === 'top') {
			$target.stop().animate({ 
					scrollTop : psVal 
				}, { 
					duration: s,
					step: function(now) { 
					!!c && now !== 0 ? c({ scrolltop:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					if (overlap) {
						!!c ? c({ focus:f, complete:true }) : '';
						!!f ? f.attr('tabindex', 0).focus() : '';
					} else {
						overlap = true;
					}
				}
			});
		} else if (p === 'left') {
			$target.stop().animate({ 
					scrollLeft : psVal
				}, { 
					duration: s,
					step: function(now) { 
						!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					!!c ? c({ focus:f, complete:true }) : '';
					!!f ? f.attr('tabindex', 0).focus() : '';
				}
			});
		} else if (p === 'center') {
			var w = $target.outerWidth();

			$target.stop().animate({ 
				scrollLeft : psVal - (w / 2) + addLeft
			}, { 
				duration: s,
				step: function(now) { 
					!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					!!c ? c({ focus:f, complete:true }) : '';
					!!f ? f.attr('tabindex', 0).focus() : '';
				}
			});
		}
	}


	/* ------------------------
	 * [base] URL parameter
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiPara: function (v) {
			return createUiPara(v);
		}
	});
	function createUiPara(paraname){
		var _tempUrl = win.location.search.substring(1),
			_tempArray = _tempUrl.split('&'),
			_tempArray_len = _tempArray.length,
			_keyValue;

		for (var i = 0, len = _tempArray_len; i < len; i++) {
			_keyValue = _tempArray[i].split('=');

			if (_keyValue[0] === paraname) {
				return _keyValue[1];
			}
		}
	}


	/* ------------------------
	 * scroll bar
	 * date : 2020.06.12
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiScrollBar: function (opt) {
			return createuiScrollBar(opt);
		}
	});
	win[global].uiScrollBar.option = {
		id: false,
		callback:false,
		infiniteCallback:false,
		space: false,
		remove: false
	};
	sessionStorage.setItem('scrollbarID', 0);
	win[global].uiScrollBar.timer = {}
	function createuiScrollBar(opt) {
		var opt = $.extend(true, {}, win[global].uiScrollBar.option, opt),
			id = opt.id,
			space = opt.space,
			callback = opt.callback,
			infiniteCallback = opt.infiniteCallback,
			remove = opt.remove,
			$base = !id ? $('.ui-scrollbar') : typeof id === 'object' ? id : $('[scroll-id="' + id +'"]');
		
		var timerResize;
		
		if (win[global].support.touch) {
			return false;
		} 

		$base.each(function () {
			!remove ? scrollbarReady($(this)) : scrollbarRemove($(this));
		});
		function scrollbarUpdate(t, wrapH, wrapW, itemH, itemW, space){
			var $wrap = t;
			var	$item = $wrap.children('.ui-scrollbar-item');

			if (!$item.length) {
				return false;
			}

			var nWrapH = $wrap.outerHeight();
			var nWrapW = $wrap.outerWidth();
			var nItemH = $item.prop('scrollHeight');
			var nItemW = $item.prop('scrollWidth');

			var changeH = (itemH !== nItemH || wrapH !== nWrapH);
			var changeW = (itemW !== nItemW || wrapW !== nWrapW);

			$(win).on('resize', function(){
				clearTimeout(timerResize);
				timerResize = setTimeout(function(){
					console.log(111);
					$wrap.removeAttr('style');
					//$wrap.css('overflow', 'hidden');
					
					nWrapH = $wrap.outerHeight();
					//nWrapW = $wrap.outerWidth();
					//$wrap.css('width', nWrapW);
					$wrap.css('height', nWrapH);
				}, 300);
			});

			if (changeH || changeW) {
				var barH = Math.floor(nWrapH / (nItemH / 100));
				var barW = Math.floor(nWrapW / (nItemW / 100));
				var $barY = $wrap.find('> .ui-scrollbar-barwrap.type-y .ui-scrollbar-bar');
				var $barX = $wrap.find('> .ui-scrollbar-barwrap.type-x .ui-scrollbar-bar');

				changeH && $barY.css('height', barH + '%').data('height', barH);
				changeW && $barX.css('width', barW + '%').data('width', barW);
				
				(nWrapH < nItemH) ? $wrap.addClass('view-y') : $wrap.removeClass('view-y');
				(nWrapW < nItemW) ? $wrap.addClass('view-x') : $wrap.removeClass('view-x');

				$wrap.data('opt', {'itemH':nItemH, 'itemW':nItemW, 'wrapH':nWrapH, 'wrapW':nWrapW });
				eventFn();
				scrollEvent($item, space);
			}

			var timer;

			clearTimeout(timer);
			timer = setTimeout(function(){
				scrollbarUpdate(t, nWrapH, nWrapW, nItemH, nItemW);
			}, 300);
		}
		function scrollbarRemove(t){
			var $wrap = t;

			$wrap.removeClass('ready view-scrollbar').removeData('infiniteCallback').removeData('ready').removeAttr('style');
			$wrap.find('> .ui-scrollbar-item').contents().unwrap();
			$wrap.find('> .ui-scrollbar-wrap').contents().unwrap();
			$wrap.find('> .ui-scrollbar-barwrap').remove();
		}
		function scrollbarReady(t) {
			var $wrap = t;
			var	html_scrollbar = '';

			$wrap.removeClass('ready').data('infiniteCallback', infiniteCallback).data('ready', false);
			$wrap.find('> .ui-scrollbar-item').contents().unwrap();
			$wrap.find('> .ui-scrollbar-wrap').contents().unwrap();
			$wrap.find('> .ui-scrollbar-barwrap').remove();

			var wrapW = $wrap.innerWidth();
			var wrapH = $wrap.outerHeight();

			$wrap.wrapInner('<div class="ui-scrollbar-item"><div class="ui-scrollbar-wrap"></div></div>');

			var	$item = $wrap.find('> .ui-scrollbar-item');
			var	$itemWrap = $item.find('> .ui-scrollbar-wrap');

			var cssDisplay = $wrap.css('display');
			var cssPadding = $wrap.css('padding');

			$itemWrap.css({
				display: cssDisplay,
				padding: cssPadding
			});

			if (!space) {
				cssDisplay === 'inline-block' && $itemWrap.css('display','block');
				$itemWrap.css('width','100%');
			} 

			!space && $item.css('width','100%');
			$wrap.css('overflow','hidden');

			var itemW =  $item.prop('scrollWidth');
			var itemH =$item.prop('scrollHeight');

			$wrap.data('opt', {'itemH':itemH, 'itemW':itemW, 'wrapH':wrapH, 'wrapW':wrapW });
			
			var idN = JSON.parse(sessionStorage.getItem('scrollbarID'));

			//idN = idN === undefined ? 0 : idN;
			
			if (!$wrap.data('ready') || !$wrap.attr('scroll-id')) {
				
				if (!$wrap.attr('scroll-id')) {
					$wrap.attr('scroll-id', 'uiScrollBar_' + idN).data('ready', true).addClass('ready');
					idN = idN + 1;
					sessionStorage.setItem('scrollbarID', idN);
				} else {
					$wrap.data('ready', true).addClass('ready');
				}

				$item.attr('tabindex', 0);
				$wrap.css('height', wrapH + 'px');
				
				if (space) {
					$item.addClass('scroll-y-padding');
					$item.addClass('scroll-x-padding');
				} else {
					!!$wrap.parent('.ui-tablescroll').length && $wrap.parent('.ui-tablescroll').addClass('not-space');
				}

				html_scrollbar += '<div class="ui-scrollbar-barwrap type-y" >';
				html_scrollbar += '<button type="button" class="ui-scrollbar-bar" aria-hidden="true" tabindex="-1" data-scrollxy="y"><span class="hide">scroll</span></button>';
				html_scrollbar += '</div>';
				html_scrollbar += '<div class="ui-scrollbar-barwrap type-x" >';
				html_scrollbar += '<button type="button" class="ui-scrollbar-bar" aria-hidden="true" tabindex="-1" data-scrollxy="x"><span class="hide">scroll</span></button>';
				html_scrollbar += '</div>';
				
				$wrap.prepend(html_scrollbar);

				(wrapH < itemH) ? $wrap.addClass('view-y') : $wrap.removeClass('view-y');
				(wrapW < itemW) ? $wrap.addClass('view-x') : $wrap.removeClass('view-x');

				var barH = Math.floor(wrapH / (itemH / 100));
				var barW = Math.floor(wrapW / (itemW / 100));
				var $barY = $wrap.find('> .ui-scrollbar-barwrap.type-y .ui-scrollbar-bar');
				var $barX = $wrap.find('> .ui-scrollbar-barwrap.type-x .ui-scrollbar-bar');
				
				$barY.css('height', barH + '%').data('height', barH);
				$barX.css('width', barW + '%').data('width', barW);

				$wrap.addClass('view-scrollbar');
				!!callback && callback(); 
				scrollEvent($item);
				scrollbarUpdate(t, wrapH, wrapW, itemH, itemW, space);
				eventFn();
			}
		}	
		function eventFn(){
			$(doc).find('.ui-scrollbar-item').off('scroll.uiscr').on('scroll.uiscr', function(){
				scrollEvent(this);
			});
			$(doc).find('.ui-scrollbar-bar').off('mousedown.bar touchstart.bar').on('mousedown.bar touchstart.bar', function(e) {
				dragMoveAct(e, this);
			});
		}	
		function scrollEvent(t){
			var $this = $(t),
				$wrap = $this.closest('.ui-scrollbar'),
				$barY = $wrap.find('> .type-y .ui-scrollbar-bar'),
				$barX = $wrap.find('> .type-x .ui-scrollbar-bar');
			
			var opt = $wrap.data('opt');

			if (opt === undefined) {
				return false;
			}

			var itemH = opt.itemH,
				itemW = opt.itemW,
				wrapH = opt.wrapH,
				wrapW = opt.wrapW;

			var scrT = $this.scrollTop(),
				scrL = $this.scrollLeft(),
				barH = $barY.data('height'),
				barW = $barX.data('width');
			
			var hPer = Math.round(scrT / (itemH - wrapH) * 100),
				_hPer = (barH / 100) * hPer,
				wPer = Math.round(scrL / (itemW - wrapW) * 100),
				_wPer = (barW / 100) * wPer;

			var _infiniteCallback = $wrap.data('infiniteCallback');

			$barY.css('top', hPer - _hPer + '%');
			$barX.css('left', wPer - _wPer + '%');

			if (!!_infiniteCallback) {
				hPer === 100 && _infiniteCallback(); 
			}
		}
		function dragMoveAct(e, t) {
			var $bar = $(t),
				$uiScrollbar = $bar.closest('.ui-scrollbar'),
				$barWrap = $bar.closest('.ui-scrollbar-barwrap'),
				$wrap = $bar.closest('.ui-scrollbar'),
				$item = $uiScrollbar.find('> .ui-scrollbar-item');

			var off_t = $barWrap.offset().top,
				w_h = $barWrap.innerHeight(),
				off_l = $barWrap.offset().left,
				w_w = $barWrap.innerWidth(),
				barH = $bar.data('height'),
				barW = $bar.data('width'),
				opt = $wrap.data('opt');

			var yRPer, xRPer;
			var $btn = e.target;
			var isXY = $btn.getAttribute('data-scrollxy');
			
			$('body').addClass('scrollbar-move');

			$(doc).off('mousemove.bar touchmove.bar').on('mousemove.bar touchmove.bar', function (e) {
				var y_m, 
					x_m;
				
				if (e.touches === undefined) {
					if (e.pageY !== undefined) {
						y_m = e.pageY;
					} else if (e.pageY === undefined) {
						y_m = e.clientY;
					}

					if (e.pageX !== undefined) {
						x_m = e.pageX;
					} else if (e.pageX === undefined) {
						x_m = e.clientX;
					}
				}

				var yR = y_m - off_t;
				var xR = x_m - off_l;

				yR < 0 ? yR = 0 : '';
				yR > w_h ? yR = w_h : '';
				xR < 0 ? xR = 0 : '';
				xR > w_w ? xR = w_w : '';

				yRPer = yR / w_h * 100;
				xRPer = xR / w_w * 100;
				var nPerY = (yRPer - (barH / 100 * yRPer)).toFixed(2);
				var nPerX = (xRPer - (barW / 100 * xRPer)).toFixed(2);

				if (isXY === 'y') {
					$bar.css('top', nPerY + '%');
					$item.scrollTop(opt.itemH * nPerY / 100);
				} else {
					$bar.css('left', nPerX + '%');
					$item.scrollLeft(opt.itemW * nPerX / 100);
				}

			}).off('mouseup.bar touchcancel.bar touchend.bar').on('mouseup.bar touchcancel.bar touchend.bar', function () {
				var _infiniteCallback = $wrap.data('infiniteCallback');

				if (!!_infiniteCallback) {
					yRPer === 100 && _infiniteCallback(); 
				}

				$('body').removeClass('scrollbar-move');
				$(doc).off('mousemove.bar mouseup.bar touchmove.bar');
			});
		}
	}


	/* ------------------------
	 * [base] scroll or not
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiHasScrollBarY: function (opt) {
			return createuiHasScrollBarY(opt);
		},
		uiHasScrollBarX: function (opt) {
			return createUiHasScrollBarX(opt);
		}
	});
	function createuiHasScrollBarY(opt) {
		var $this = opt.selector;

		return ($this.prop('scrollHeight') == 0 && $this.prop('clientHeight') == 0) || ($this.prop('scrollHeight') > $this.prop('clientHeight'));
	}
	function createUiHasScrollBarX(opt) {
		var $this = opt.selector;

		return ($this.prop('scrollWidth') == 0 && $this.prop('clientWidth') == 0) || ($this.prop('scrollWidth') > $this.prop('clientWidth'));
	}


	/* ------------------------
	 * [base] focus scope
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiFocusTab: function (opt) {
			return createUiFocusTab(opt);
		}
	});
	win[global].uiFocusTab.option = {
		focusitem : '.ui-select-tit, iframe, a:not([data-disabled]), button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), label, [role="button"]',
		callback: false,
		focusnot: false,
		type: 'hold' //'hold', 'sense'
	};
	function createUiFocusTab(opt){
		if (opt === undefined) {
			return false;
		}
		
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiFocusTab.option, opt),
			$focus = $(opt.selector),
			$item = $focus.find(opt.focusitem),
			callback = opt.callback,
			focusnot = opt.focusnot,
			type = opt.type,
			timer; 

		if (!!$item.length) {
			$item.eq(0).addClass('ui-fctab-s').attr('tabindex', 0).attr('holds', true);
			$item.eq(-1).addClass('ui-fctab-e').attr('tabindex', 0).attr('holde', true);
		} else {
			$focus.prepend('<div class="ui-fctab-s" tabindex="0" holds="true"></div>');
			$focus.append('<div class="ui-fctab-e" tabindex="0" holde="true"></div>');
			$item = $focus.find('.ui-fctab-s, .ui-fctab-e');
		}
		
		clearTimeout(timer);
		timer = setTimeout(function(){
			!focusnot ? $item.eq(0).focus() : '';
		},300);
		timer = '';

		$focus.find('.ui-fctab-s').off('keydown.holds').on('keydown.holds', function (e) {
			if (type === 'hold') {
				if (e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ui-fctab-e').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.holds');
				(e.shiftKey && e.keyCode == 9) ? callback('before') : '';
			}
		});
		$focus.find('.ui-fctab-e').off('keydown.holde').on('keydown.holde', function (e) {
			if (type === 'hold') {
				if (!e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ui-fctab-s').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.holds');
				(!e.shiftKey && e.keyCode == 9) ? callback('after') : '';
			}
		});
	}


	/* ------------------------
	 * window popup
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiPopup: function (opt) {
			return createUiPopup(opt);
		}
	});
	win[global].uiPopup.option = {
		name: 'new popup',
		width: 790,
		height: 620,
		align: 'center',
		top: 0,
		left: 0,
		toolbar: 'no',
		location: 'no',
		memubar: 'no',
		status: 'no',
		resizable: 'no',
		scrolbars: 'yes'
	};
	function createUiPopup(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiPopup.option, opt),
			specs;

		if (opt.align === 'center') {
			opt.left = ($(win).outerWidth() / 2) - (opt.width / 2);
			opt.top = ($(win).outerHeight() / 2) - (opt.height / 2);
		}

		specs = 'width=' + opt.width + ', height='+ opt.height + ', left=' + opt.left + ', top=' + opt.top;
		specs += ', toolbar=' + opt.toolbar + ', location=' + opt.location + ', resizable=' + opt.resizable + ', status=' + opt.status + ', menubar=' + opt.menubar + ', scrollbars=' + opt.scrollbars;
		
		win.open(opt.link, opt.name , specs);
	}


	/* ------------------------
	 * cookie
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiCookieSet: function (opt) {
			return creaeteUiCookieSet(opt);
		},
		uiCookieGet: function (opt) {
			return creaeteUiCookieGet(opt);
		},
		uiCookieDel: function (opt) {
			return creaeteUiCookieDel(opt);
		}
	});
	function creaeteUiCookieSet(opt){
		var cookieset = opt.name + '=' + opt.value + ';',
			expdate;
		if (opt.term) {
			expdate = new Date();
			expdate.setTime( expdate.getTime() + opt.term * 1000 * 60 * 60 * 24 ); // term 1 is a day
			cookieset += 'expires=' + expdate.toGMTString() + ';';
		}
		(opt.path) ? cookieset += 'path=' + opt.path + ';' : '';
		(opt.domain) ? cookieset += 'domain=' + opt.domain + ';' : '';
		document.cookie = cookieset;
	}
	function creaeteUiCookieGet(opt){
		var match = ( document.cookie || ' ' ).match( new RegExp(opt.name + ' *= *([^;]+)') );
		return (match) ? match[1] : null;
	}
	function creaeteUiCookieDel(opt){
		var expireDate = new Date();

		expireDate.setDate(expireDate.getDate() + -1);
		win[global].uiCookieSet({ name:opt.name, term:'-1' });
	}



	/* ------------------------
	* name : parallax box
	* date : 2020-06-13
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiParallax: function (opt) {
			return createUiParallax(opt);
		}
	});
	win[global].uiParallax.option = {
		id : null,
		scope : 'window'
	}
	function createUiParallax(opt) {	
		var opt = $.extend(true, {}, win[global].uiParallax.option, opt),
			$scope = opt.scope === 'window' ? $(win) : opt.scope,
			$parallax = opt.id === null ? $('.ui-parallax') : $('#' + opt.id),
			$item = $parallax.find('> .ui-parallax-item'),
			len = $item.length,
			i = 0;

		// var checkVisible = function (){
		// 	var itemTop = $item.eq(i).offset().top;

		// 	if ($scope.outerHeight() > itemTop && i < len) {
		// 		$item.eq(i).addClass('parallax-s');
		// 		i = i + 1;
		// 		checkVisible();
		// 	}
		// }
		// checkVisible();

		parallax();
		$scope.off('scroll.win').on('scroll.win', parallax);
		$item.find('*').off('focus.parallax').on('focus.parallax', function(){
			$(this).closest('.ui-parallax-item').addClass('parallax-s');
		});

		function parallax() {
			var $parallax = $('.ui-parallax');
			var $item = $parallax.find('.ui-parallax-item');

			var scopeH = $scope.outerHeight();
			var scopeT = Math.floor($scope.scrollTop());
			var baseT = Math.floor($item.eq(0).offset().top);

			for (var i = 0; i < len; i++) {
				var $current = $item.eq(i);
				
				var attrStart = $current.attr('start');
				var attrEnd = $current.attr('end');

				attrStart === undefined ? attrStart = 0 : '';
				attrEnd === undefined ? attrEnd = 0 : '';

				var h = Math.floor($current.outerHeight());
				var start = Math.floor($current.offset().top);
				var end = h + start;
				var s = scopeH * Number(attrStart) / 100;
				var e = scopeH * Number(attrEnd) / 100;
				
				if (opt.scope !== 'window') {
					start = (start + scopeT) - (baseT + scopeT);
					end = (end + scopeT) - (baseT + scopeT);
				}

				(scopeT >= start - s) ? $current.addClass('parallax-s') : $current.removeClass('parallax-s');
				(scopeT >= end - e) ? $current.addClass('parallax-e') : $current.removeClass('parallax-e');
			}
		}

		function act() {
			var scopeH = $scope.outerHeight();
			var scopeT = $scope.scrollTop();
			var addH = (scopeH / 6);

			var $parallax = $('.ui-parallax');
			var $item = $parallax.find('> .ui-parallax-item');

			

			var n = i;
			var itemCheck = function () {
				var $itemN = $item.eq(n >= len ? len - 1 : n);
				var itemTop = opt.scope === 'window' ? $itemN.offset().top : $itemN.position().top;

				// var h = $current.outerHeight();
				// var start = $current.position().top;
				// var end = h - winH + start;

				
				if (n >= len) {
					return false;
				}

				Math.abs(scopeH - itemTop) + addH < scopeT ?
					itemShow():
					itemHide();

				function itemShow(){
					$itemN.addClass('visible');
					n = n + 1;
					itemCheck();
				}
				function itemHide(){
					n = n - 1;
					$itemN.removeClass('visible');
				}
			}
			itemCheck();
		}
	}

	
})(jQuery, window, document);