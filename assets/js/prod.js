(function(){
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-prefixed-testprop-testallprops-domprefixes-getusermedia
 */
;window.Modernizr=function(a,b,c){function w(a){i.cssText=a}function x(a,b){return w(prefixes.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b){for(var d in a){var e=a[d];if(!z(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}function C(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+m.join(d+" ")+d).split(" ");return y(b,"string")||y(b,"undefined")?A(e,b):(e=(a+" "+n.join(d+" ")+d).split(" "),B(e,b,c))}var d="2.8.3",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l="Webkit Moz O ms",m=l.split(" "),n=l.toLowerCase().split(" "),o={},p={},q={},r=[],s=r.slice,t,u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=s.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(s.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(s.call(arguments)))};return e});for(var D in o)v(o,D)&&(t=D.toLowerCase(),e[t]=o[D](),r.push((e[t]?"":"no-")+t));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),h=j=null,e._version=d,e._domPrefixes=n,e._cssomPrefixes=m,e.testProp=function(a){return A([a])},e.testAllProps=C,e.prefixed=function(a,b,c){return b?C(a,b,c):C(a,"pfx")},e}(this,this.document),Modernizr.addTest("getusermedia",!!Modernizr.prefixed("getUserMedia",navigator));
// MIT License:
//
// Copyright (c) 2010-2013, Joe Walnes
//               2013-2014, Drew Noakes
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
!function(e){function t(e){this.options=a.extend({},t.defaultOptions,e),this.clear()}function i(e){this.options=a.extend({},i.defaultChartOptions,e),this.seriesSet=[],this.currentValueRange=1,this.currentVisMinValue=0,this.lastRenderTimeMillis=0}var a={extend:function(){arguments[0]=arguments[0]||{};for(var e=1;e<arguments.length;e++)for(var t in arguments[e])arguments[e].hasOwnProperty(t)&&(arguments[0][t]="object"==typeof arguments[e][t]?arguments[e][t]instanceof Array?arguments[e][t]:a.extend(arguments[0][t],arguments[e][t]):arguments[e][t]);return arguments[0]}};t.defaultOptions={resetBoundsInterval:3e3,resetBounds:!0},t.prototype.clear=function(){this.data=[],this.maxValue=Number.NaN,this.minValue=Number.NaN},t.prototype.resetBounds=function(){if(this.data.length){this.maxValue=this.data[0][1],this.minValue=this.data[0][1];for(var e=1;e<this.data.length;e++){var t=this.data[e][1];t>this.maxValue&&(this.maxValue=t),t<this.minValue&&(this.minValue=t)}}else this.maxValue=Number.NaN,this.minValue=Number.NaN},t.prototype.append=function(e,t,i){for(var a=this.data.length-1;a>=0&&this.data[a][0]>e;)a--;-1===a?this.data.splice(0,0,[e,t]):this.data.length>0&&this.data[a][0]===e?i?(this.data[a][1]+=t,t=this.data[a][1]):this.data[a][1]=t:a<this.data.length-1?this.data.splice(a+1,0,[e,t]):this.data.push([e,t]),this.maxValue=isNaN(this.maxValue)?t:Math.max(this.maxValue,t),this.minValue=isNaN(this.minValue)?t:Math.min(this.minValue,t)},t.prototype.dropOldData=function(e,t){for(var i=0;this.data.length-i>=t&&this.data[i+1][0]<e;)i++;0!==i&&this.data.splice(0,i)},i.defaultChartOptions={millisPerPixel:20,enableDpiScaling:!0,yMinFormatter:function(e,t){return parseFloat(e).toFixed(t)},yMaxFormatter:function(e,t){return parseFloat(e).toFixed(t)},maxValueScale:1,minValueScale:1,interpolation:"bezier",scaleSmoothing:.125,maxDataSetLength:2,scrollBackwards:!1,grid:{fillStyle:"#000000",strokeStyle:"#777777",lineWidth:1,sharpLines:!1,millisPerLine:1e3,verticalSections:2,borderVisible:!0},labels:{fillStyle:"#ffffff",disabled:!1,fontSize:10,fontFamily:"monospace",precision:2},horizontalLines:[]},i.AnimateCompatibility=function(){var e=function(e,t){var i=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return window.setTimeout(function(){e((new Date).getTime())},16)};return i.call(window,e,t)},t=function(e){var t=window.cancelAnimationFrame||function(e){clearTimeout(e)};return t.call(window,e)};return{requestAnimationFrame:e,cancelAnimationFrame:t}}(),i.defaultSeriesPresentationOptions={lineWidth:1,strokeStyle:"#ffffff"},i.prototype.addTimeSeries=function(e,t){this.seriesSet.push({timeSeries:e,options:a.extend({},i.defaultSeriesPresentationOptions,t)}),e.options.resetBounds&&e.options.resetBoundsInterval>0&&(e.resetBoundsTimerId=setInterval(function(){e.resetBounds()},e.options.resetBoundsInterval))},i.prototype.removeTimeSeries=function(e){for(var t=this.seriesSet.length,i=0;t>i;i++)if(this.seriesSet[i].timeSeries===e){this.seriesSet.splice(i,1);break}e.resetBoundsTimerId&&clearInterval(e.resetBoundsTimerId)},i.prototype.getTimeSeriesOptions=function(e){for(var t=this.seriesSet.length,i=0;t>i;i++)if(this.seriesSet[i].timeSeries===e)return this.seriesSet[i].options},i.prototype.bringToFront=function(e){for(var t=this.seriesSet.length,i=0;t>i;i++)if(this.seriesSet[i].timeSeries===e){var a=this.seriesSet.splice(i,1);this.seriesSet.push(a[0]);break}},i.prototype.streamTo=function(e,t){this.canvas=e,this.delay=t,this.start()},i.prototype.resize=function(){if(this.options.enableDpiScaling&&window&&1!==window.devicePixelRatio){var e=window.devicePixelRatio,t=parseInt(this.canvas.getAttribute("width")),i=parseInt(this.canvas.getAttribute("height"));this.originalWidth&&Math.floor(this.originalWidth*e)===t||(this.originalWidth=t,this.canvas.setAttribute("width",Math.floor(t*e).toString()),this.canvas.style.width=t+"px",this.canvas.getContext("2d").scale(e,e)),this.originalHeight&&Math.floor(this.originalHeight*e)===i||(this.originalHeight=i,this.canvas.setAttribute("height",Math.floor(i*e).toString()),this.canvas.style.height=i+"px",this.canvas.getContext("2d").scale(e,e))}},i.prototype.start=function(){if(!this.frame){var e=function(){this.frame=i.AnimateCompatibility.requestAnimationFrame(function(){this.render(),e()}.bind(this))}.bind(this);e()}},i.prototype.stop=function(){this.frame&&(i.AnimateCompatibility.cancelAnimationFrame(this.frame),delete this.frame)},i.prototype.updateValueRange=function(){for(var e=this.options,t=Number.NaN,i=Number.NaN,a=0;a<this.seriesSet.length;a++){var s=this.seriesSet[a].timeSeries;isNaN(s.maxValue)||(t=isNaN(t)?s.maxValue:Math.max(t,s.maxValue)),isNaN(s.minValue)||(i=isNaN(i)?s.minValue:Math.min(i,s.minValue))}if(null!=e.maxValue?t=e.maxValue:t*=e.maxValueScale,null!=e.minValue?i=e.minValue:i-=Math.abs(i*e.minValueScale-i),this.options.yRangeFunction){var n=this.options.yRangeFunction({min:i,max:t});i=n.min,t=n.max}if(!isNaN(t)&&!isNaN(i)){var r=t-i,l=r-this.currentValueRange,o=i-this.currentVisMinValue;this.isAnimatingScale=Math.abs(l)>.1||Math.abs(o)>.1,this.currentValueRange+=e.scaleSmoothing*l,this.currentVisMinValue+=e.scaleSmoothing*o}this.valueRange={min:i,max:t}},i.prototype.render=function(e,t){var i=(new Date).getTime();if(!this.isAnimatingScale){var a=Math.min(1e3/6,this.options.millisPerPixel);if(i-this.lastRenderTimeMillis<a)return}this.resize(),this.lastRenderTimeMillis=i,e=e||this.canvas,t=t||i-(this.delay||0),t-=t%this.options.millisPerPixel;var s=e.getContext("2d"),n=this.options,r={top:0,left:0,width:e.clientWidth,height:e.clientHeight},l=t-r.width*n.millisPerPixel,o=function(e){var t=e-this.currentVisMinValue;return 0===this.currentValueRange?r.height:r.height-Math.round(t/this.currentValueRange*r.height)}.bind(this),h=function(e){return Math.round(n.scrollBackwards?(t-e)/n.millisPerPixel:r.width-(t-e)/n.millisPerPixel)};if(this.updateValueRange(),s.font=n.labels.fontSize+"px "+n.labels.fontFamily,s.save(),s.translate(r.left,r.top),s.beginPath(),s.rect(0,0,r.width,r.height),s.clip(),s.save(),s.fillStyle=n.grid.fillStyle,s.clearRect(0,0,r.width,r.height),s.fillRect(0,0,r.width,r.height),s.restore(),s.save(),s.lineWidth=n.grid.lineWidth,s.strokeStyle=n.grid.strokeStyle,n.grid.millisPerLine>0){s.beginPath();for(var u=t-t%n.grid.millisPerLine;u>=l;u-=n.grid.millisPerLine){var m=h(u);n.grid.sharpLines&&(m-=.5),s.moveTo(m,0),s.lineTo(m,r.height)}s.stroke(),s.closePath()}for(var d=1;d<n.grid.verticalSections;d++){var c=Math.round(d*r.height/n.grid.verticalSections);n.grid.sharpLines&&(c-=.5),s.beginPath(),s.moveTo(0,c),s.lineTo(r.width,c),s.stroke(),s.closePath()}if(n.grid.borderVisible&&(s.beginPath(),s.strokeRect(0,0,r.width,r.height),s.closePath()),s.restore(),n.horizontalLines&&n.horizontalLines.length)for(var f=0;f<n.horizontalLines.length;f++){var g=n.horizontalLines[f],p=Math.round(o(g.value))-.5;s.strokeStyle=g.color||"#ffffff",s.lineWidth=g.lineWidth||1,s.beginPath(),s.moveTo(0,p),s.lineTo(r.width,p),s.stroke(),s.closePath()}for(var v=0;v<this.seriesSet.length;v++){s.save();var S=this.seriesSet[v].timeSeries,w=S.data,x=this.seriesSet[v].options;S.dropOldData(l,n.maxDataSetLength),s.lineWidth=x.lineWidth,s.strokeStyle=x.strokeStyle,s.beginPath();for(var y=0,b=0,V=0,N=0;N<w.length&&1!==w.length;N++){var T=h(w[N][0]),P=o(w[N][1]);if(0===N)y=T,s.moveTo(T,P);else switch(n.interpolation){case"linear":case"line":s.lineTo(T,P);break;case"bezier":default:s.bezierCurveTo(Math.round((b+T)/2),V,Math.round(b+T)/2,P,T,P);break;case"step":s.lineTo(T,V),s.lineTo(T,P)}b=T,V=P}w.length>1&&(x.fillStyle&&(s.lineTo(r.width+x.lineWidth+1,V),s.lineTo(r.width+x.lineWidth+1,r.height+x.lineWidth+1),s.lineTo(y,r.height+x.lineWidth),s.fillStyle=x.fillStyle,s.fill()),x.strokeStyle&&"none"!==x.strokeStyle&&s.stroke(),s.closePath()),s.restore()}if(!n.labels.disabled&&!isNaN(this.valueRange.min)&&!isNaN(this.valueRange.max)){var M=n.yMaxFormatter(this.valueRange.max,n.labels.precision),k=n.yMinFormatter(this.valueRange.min,n.labels.precision),F=n.scrollBackwards?0:r.width-s.measureText(M).width-2;s.fillStyle=n.labels.fillStyle,s.fillText(M,F,n.labels.fontSize),s.fillText(k,F,r.height-2)}if(n.timestampFormatter&&n.grid.millisPerLine>0)for(var R=n.scrollBackwards?s.measureText(k).width:r.width-s.measureText(k).width+4,u=t-t%n.grid.millisPerLine;u>=l;u-=n.grid.millisPerLine){var m=h(u);if(!n.scrollBackwards&&R>m||n.scrollBackwards&&m>R){var A=new Date(u),B=n.timestampFormatter(A),L=s.measureText(B).width;R=n.scrollBackwards?m+L+2:m-L-2,s.fillStyle=n.labels.fillStyle,n.scrollBackwards?s.fillText(B,m,r.height-2):s.fillText(B,m-L,r.height-2)}}s.restore()},i.timeFormatter=function(e){function t(e){return(10>e?"0":"")+e}return t(e.getHours())+":"+t(e.getMinutes())+":"+t(e.getSeconds())},e.TimeSeries=t,e.SmoothieChart=i}("undefined"==typeof exports?this:exports);
/**
 * tracking.js - A modern approach for Computer Vision on the web.
 * @author Eduardo Lundgren <edu@rdo.io>
 * @version v1.0.0
 * @link http://trackingjs.com
 * @license BSD
 */
!function(t){t.tracking=t.tracking||{},tracking.inherits=function(t,r){function n(){}n.prototype=r.prototype,t.superClass_=r.prototype,t.prototype=new n,t.prototype.constructor=t,t.base=function(t,n){var e=Array.prototype.slice.call(arguments,2);return r.prototype[n].apply(t,e)}},tracking.initUserMedia_=function(r,n){t.navigator.getUserMedia({video:!0,audio:n.audio},function(n){try{r.src=t.URL.createObjectURL(n)}catch(e){r.src=n}},function(){throw Error("Cannot capture user camera.")})},tracking.isNode=function(t){return t.nodeType||this.isWindow(t)},tracking.isWindow=function(t){return!!(t&&t.alert&&t.document)},tracking.one=function(t,r){return this.isNode(t)?t:(r||document).querySelector(t)},tracking.track=function(t,r,n){if(t=tracking.one(t),!t)throw new Error("Element not found, try a different element or selector.");if(!r)throw new Error("Tracker not specified, try `tracking.track(element, new tracking.FaceTracker())`.");switch(t.nodeName.toLowerCase()){case"canvas":return this.trackCanvas_(t,r,n);case"img":return this.trackImg_(t,r,n);case"video":return n&&n.camera&&this.initUserMedia_(t,n),this.trackVideo_(t,r,n);default:throw new Error("Element not supported, try in a canvas, img, or video.")}},tracking.trackCanvas_=function(t,r){var n=this,e=new tracking.TrackerTask(r);return e.on("run",function(){n.trackCanvasInternal_(t,r)}),e.run()},tracking.trackCanvasInternal_=function(t,r){var n=t.width,e=t.height,i=t.getContext("2d"),a=i.getImageData(0,0,n,e);r.track(a.data,n,e)},tracking.trackImg_=function(t,r){var n=t.width,e=t.height,i=document.createElement("canvas");i.width=n,i.height=e;var a=new tracking.TrackerTask(r);return a.on("run",function(){tracking.Canvas.loadImage(i,t.src,0,0,n,e,function(){tracking.trackCanvasInternal_(i,r)})}),a.run()},tracking.trackVideo_=function(r,n){var e,i,a=document.createElement("canvas"),o=a.getContext("2d"),c=function(){e=r.offsetWidth,i=r.offsetHeight,a.width=e,a.height=i};c(),r.addEventListener("resize",c);var s,g=function(){s=t.requestAnimationFrame(function(){if(r.readyState===r.HAVE_ENOUGH_DATA){try{o.drawImage(r,0,0,e,i)}catch(t){}tracking.trackCanvasInternal_(a,n)}g()})},h=new tracking.TrackerTask(n);return h.on("stop",function(){t.cancelAnimationFrame(s)}),h.on("run",function(){g()}),h.run()},t.URL||(t.URL=t.URL||t.webkitURL||t.msURL||t.oURL),navigator.getUserMedia||(navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia)}(window),function(){tracking.EventEmitter=function(){},tracking.EventEmitter.prototype.events_=null,tracking.EventEmitter.prototype.addListener=function(t,r){if("function"!=typeof r)throw new TypeError("Listener must be a function");return this.events_||(this.events_={}),this.emit("newListener",t,r),this.events_[t]||(this.events_[t]=[]),this.events_[t].push(r),this},tracking.EventEmitter.prototype.listeners=function(t){return this.events_&&this.events_[t]},tracking.EventEmitter.prototype.emit=function(t){var r=this.listeners(t);if(r){for(var n=Array.prototype.slice.call(arguments,1),e=0;e<r.length;e++)r[e]&&r[e].apply(this,n);return!0}return!1},tracking.EventEmitter.prototype.on=tracking.EventEmitter.prototype.addListener,tracking.EventEmitter.prototype.once=function(t,r){var n=this;n.on(t,function e(){n.removeListener(t,e),r.apply(this,arguments)})},tracking.EventEmitter.prototype.removeAllListeners=function(t){return this.events_?(t?delete this.events_[t]:delete this.events_,this):this},tracking.EventEmitter.prototype.removeListener=function(t,r){if("function"!=typeof r)throw new TypeError("Listener must be a function");if(!this.events_)return this;var n=this.listeners(t);if(Array.isArray(n)){var e=n.indexOf(r);if(0>e)return this;n.splice(e,1)}return this},tracking.EventEmitter.prototype.setMaxListeners=function(){throw new Error("Not implemented")}}(),function(){tracking.Canvas={},tracking.Canvas.loadImage=function(t,r,n,e,i,a,o){var c=this,s=new window.Image;s.onload=function(){var r=t.getContext("2d");t.width=i,t.height=a,r.drawImage(s,n,e,i,a),o&&o.call(c),s=null},s.src=r}}(),function(){tracking.DisjointSet=function(t){if(void 0===t)throw new Error("DisjointSet length not specified.");this.length=t,this.parent=new Uint32Array(t);for(var r=0;t>r;r++)this.parent[r]=r},tracking.DisjointSet.prototype.length=null,tracking.DisjointSet.prototype.parent=null,tracking.DisjointSet.prototype.find=function(t){return this.parent[t]===t?t:this.parent[t]=this.find(this.parent[t])},tracking.DisjointSet.prototype.union=function(t,r){var n=this.find(t),e=this.find(r);this.parent[n]=e}}(),function(){tracking.Image={},tracking.Image.blur=function(t,r,n,e){if(e=Math.abs(e),1>=e)throw new Error("Diameter should be greater than 1.");for(var i=e/2,a=Math.ceil(e)+(1-Math.ceil(e)%2),o=new Float32Array(a),c=(i+.5)/3,s=c*c,g=1/Math.sqrt(2*Math.PI*s),h=-1/(2*c*c),k=0,u=Math.floor(a/2),f=0;a>f;f++){var l=f-u,p=g*Math.exp(l*l*h);o[f]=p,k+=p}for(var v=0;v<o.length;v++)o[v]/=k;return this.separableConvolve(t,r,n,o,o,!1)},tracking.Image.computeIntegralImage=function(t,r,n,e,i,a,o){if(arguments.length<4)throw new Error("You should specify at least one output array in the order: sum, square, tilted, sobel.");var c;o&&(c=tracking.Image.sobel(t,r,n));for(var s=0;n>s;s++)for(var g=0;r>g;g++){var h=s*r*4+4*g,k=~~(.299*t[h]+.587*t[h+1]+.114*t[h+2]);if(e&&this.computePixelValueSAT_(e,r,s,g,k),i&&this.computePixelValueSAT_(i,r,s,g,k*k),a){var u=h-4*r,f=~~(.299*t[u]+.587*t[u+1]+.114*t[u+2]);this.computePixelValueRSAT_(a,r,s,g,k,f||0)}o&&this.computePixelValueSAT_(o,r,s,g,c[h])}},tracking.Image.computePixelValueRSAT_=function(t,r,n,e,i,a){var o=n*r+e;t[o]=(t[o-r-1]||0)+(t[o-r+1]||0)-(t[o-r-r]||0)+i+a},tracking.Image.computePixelValueSAT_=function(t,r,n,e,i){var a=n*r+e;t[a]=(t[a-r]||0)+(t[a-1]||0)+i-(t[a-r-1]||0)},tracking.Image.grayscale=function(t,r,n,e){for(var i=new Uint8ClampedArray(e?t.length:t.length>>2),a=0,o=0,c=0;n>c;c++)for(var s=0;r>s;s++){var g=.299*t[o]+.587*t[o+1]+.114*t[o+2];i[a++]=g,e&&(i[a++]=g,i[a++]=g,i[a++]=t[o+3]),o+=4}return i},tracking.Image.horizontalConvolve=function(t,r,n,e,i){for(var a=e.length,o=Math.floor(a/2),c=new Float32Array(r*n*4),s=i?1:0,g=0;n>g;g++)for(var h=0;r>h;h++){for(var k=g,u=h,f=4*(g*r+h),l=0,p=0,v=0,m=0,y=0;a>y;y++){var d=k,w=Math.min(r-1,Math.max(0,u+y-o)),T=4*(d*r+w),C=e[y];l+=t[T]*C,p+=t[T+1]*C,v+=t[T+2]*C,m+=t[T+3]*C}c[f]=l,c[f+1]=p,c[f+2]=v,c[f+3]=m+s*(255-m)}return c},tracking.Image.verticalConvolve=function(t,r,n,e,i){for(var a=e.length,o=Math.floor(a/2),c=new Float32Array(r*n*4),s=i?1:0,g=0;n>g;g++)for(var h=0;r>h;h++){for(var k=g,u=h,f=4*(g*r+h),l=0,p=0,v=0,m=0,y=0;a>y;y++){var d=Math.min(n-1,Math.max(0,k+y-o)),w=u,T=4*(d*r+w),C=e[y];l+=t[T]*C,p+=t[T+1]*C,v+=t[T+2]*C,m+=t[T+3]*C}c[f]=l,c[f+1]=p,c[f+2]=v,c[f+3]=m+s*(255-m)}return c},tracking.Image.separableConvolve=function(t,r,n,e,i,a){var o=this.verticalConvolve(t,r,n,i,a);return this.horizontalConvolve(o,r,n,e,a)},tracking.Image.sobel=function(t,r,n){t=this.grayscale(t,r,n,!0);for(var e=new Float32Array(r*n*4),i=new Float32Array([-1,0,1]),a=new Float32Array([1,2,1]),o=this.separableConvolve(t,r,n,i,a),c=this.separableConvolve(t,r,n,a,i),s=0;s<e.length;s+=4){var g=o[s],h=c[s],k=Math.sqrt(h*h+g*g);e[s]=k,e[s+1]=k,e[s+2]=k,e[s+3]=255}return e}}(),function(){tracking.ViolaJones={},tracking.ViolaJones.REGIONS_OVERLAP=.5,tracking.ViolaJones.classifiers={},tracking.ViolaJones.detect=function(t,r,n,e,i,a,o,c){var s,g=0,h=[],k=new Int32Array(r*n),u=new Int32Array(r*n),f=new Int32Array(r*n);o>0&&(s=new Int32Array(r*n)),tracking.Image.computeIntegralImage(t,r,n,k,u,f,s);for(var l=c[0],p=c[1],v=e*i,m=v*l|0,y=v*p|0;r>m&&n>y;){for(var d=v*a+.5|0,w=0;n-y>w;w+=d)for(var T=0;r-m>T;T+=d)o>0&&this.isTriviallyExcluded(o,s,w,T,r,m,y)||this.evalStages_(c,k,u,f,w,T,r,m,y,v)&&(h[g++]={width:m,height:y,x:T,y:w});v*=i,m=v*l|0,y=v*p|0}return this.mergeRectangles_(h)},tracking.ViolaJones.isTriviallyExcluded=function(t,r,n,e,i,a,o){var c=n*i+e,s=c+a,g=c+o*i,h=g+a,k=(r[c]-r[s]-r[g]+r[h])/(a*o*255);return t>k?!0:!1},tracking.ViolaJones.evalStages_=function(t,r,n,e,i,a,o,c,s,g){var h=1/(c*s),k=i*o+a,u=k+c,f=k+s*o,l=f+c,p=(r[k]-r[u]-r[f]+r[l])*h,v=(n[k]-n[u]-n[f]+n[l])*h-p*p,m=1;v>0&&(m=Math.sqrt(v));for(var y=t.length,d=2;y>d;){for(var w=0,T=t[d++],C=t[d++];C--;){for(var _=0,E=t[d++],M=t[d++],x=0;M>x;x++){var I,b,O,A,S=a+t[d++]*g+.5|0,D=i+t[d++]*g+.5|0,R=t[d++]*g+.5|0,j=t[d++]*g+.5|0,F=t[d++];E?(I=S-j+R+(D+R+j-1)*o,b=S+(D-1)*o,O=S-j+(D+j-1)*o,A=S+R+(D+R-1)*o,_+=(e[I]+e[b]-e[O]-e[A])*F):(I=D*o+S,b=I+R,O=I+j*o,A=O+R,_+=(r[I]-r[b]-r[O]+r[A])*F)}var L=t[d++],V=t[d++],U=t[d++];w+=L*m>_*h?V:U}if(T>w)return!1}return!0},tracking.ViolaJones.mergeRectangles_=function(t){for(var r=new tracking.DisjointSet(t.length),n=0;n<t.length;n++)for(var e=t[n],i=0;i<t.length;i++){var a=t[i];if(tracking.Math.intersectRect(e.x,e.y,e.x+e.width,e.y+e.height,a.x,a.y,a.x+a.width,a.y+a.height)){var o=Math.max(e.x,a.x),c=Math.max(e.y,a.y),s=Math.min(e.x+e.width,a.x+a.width),g=Math.min(e.y+e.height,a.y+a.height),h=(o-s)*(c-g),k=e.width*e.height,u=a.width*a.height;h/(k*(k/u))>=this.REGIONS_OVERLAP&&h/(u*(k/u))>=this.REGIONS_OVERLAP&&r.union(n,i)}}for(var f={},l=0;l<r.length;l++){var p=r.find(l);f[p]?(f[p].total++,f[p].width+=t[l].width,f[p].height+=t[l].height,f[p].x+=t[l].x,f[p].y+=t[l].y):f[p]={total:1,width:t[l].width,height:t[l].height,x:t[l].x,y:t[l].y}}var v=[];return Object.keys(f).forEach(function(t){var r=f[t];v.push({total:r.total,width:r.width/r.total+.5|0,height:r.height/r.total+.5|0,x:r.x/r.total+.5|0,y:r.y/r.total+.5|0})}),v}}(),function(){tracking.Brief={},tracking.Brief.N=512,tracking.Brief.randomImageOffsets_={},tracking.Brief.randomWindowOffsets_=null,tracking.Brief.getDescriptors=function(t,r,n){for(var e=new Int32Array((n.length>>1)*(this.N>>5)),i=0,a=this.getRandomOffsets_(r),o=0,c=0;c<n.length;c+=2)for(var s=r*n[c+1]+n[c],g=0,h=0,k=this.N;k>h;h++)t[a[g++]+s]<t[a[g++]+s]&&(i|=1<<(31&h)),h+1&31||(e[o++]=i,i=0);return e},tracking.Brief.match=function(t,r,n,e){for(var i=t.length>>1,a=n.length>>1,o=new Array(i),c=0;i>c;c++){for(var s=1/0,g=0,h=0;a>h;h++){for(var k=0,u=0,f=this.N>>5;f>u;u++)k+=tracking.Math.hammingWeight(r[c*f+u]^e[h*f+u]);s>k&&(s=k,g=h)}o[c]={index1:c,index2:g,keypoint1:[t[2*c],t[2*c+1]],keypoint2:[n[2*g],n[2*g+1]],confidence:1-s/this.N}}return o},tracking.Brief.reciprocalMatch=function(t,r,n,e){var i=[];if(0===t.length||0===n.length)return i;for(var a=tracking.Brief.match(t,r,n,e),o=tracking.Brief.match(n,e,t,r),c=0;c<a.length;c++)o[a[c].index2].index2===c&&i.push(a[c]);return i},tracking.Brief.getRandomOffsets_=function(t){if(!this.randomWindowOffsets_){for(var r=0,n=new Int32Array(4*this.N),e=0;e<this.N;e++)n[r++]=Math.round(tracking.Math.uniformRandom(-15,16)),n[r++]=Math.round(tracking.Math.uniformRandom(-15,16)),n[r++]=Math.round(tracking.Math.uniformRandom(-15,16)),n[r++]=Math.round(tracking.Math.uniformRandom(-15,16));this.randomWindowOffsets_=n}if(!this.randomImageOffsets_[t]){for(var i=0,a=new Int32Array(2*this.N),o=0;o<this.N;o++)a[i++]=this.randomWindowOffsets_[4*o]*t+this.randomWindowOffsets_[4*o+1],a[i++]=this.randomWindowOffsets_[4*o+2]*t+this.randomWindowOffsets_[4*o+3];this.randomImageOffsets_[t]=a}return this.randomImageOffsets_[t]}}(),function(){tracking.Fast={},tracking.Fast.THRESHOLD=40,tracking.Fast.circles_={},tracking.Fast.findCorners=function(t,r,n,e){var i=this.getCircleOffsets_(r),a=new Int32Array(16),o=[];void 0===e&&(e=this.THRESHOLD);for(var c=3;n-3>c;c++)for(var s=3;r-3>s;s++){for(var g=c*r+s,h=t[g],k=0;16>k;k++)a[k]=t[g+i[k]];this.isCorner(h,a,e)&&(o.push(s,c),s+=3)}return o},tracking.Fast.isBrighter=function(t,r,n){return t-r>n},tracking.Fast.isCorner=function(t,r,n){if(this.isTriviallyExcluded(r,t,n))return!1;for(var e=0;16>e;e++){for(var i=!0,a=!0,o=0;9>o;o++){var c=r[e+o&15];if(!this.isBrighter(t,c,n)&&(a=!1,i===!1))break;if(!this.isDarker(t,c,n)&&(i=!1,a===!1))break}if(a||i)return!0}return!1},tracking.Fast.isDarker=function(t,r,n){return r-t>n},tracking.Fast.isTriviallyExcluded=function(t,r,n){var e=0,i=t[8],a=t[12],o=t[4],c=t[0];return this.isBrighter(c,r,n)&&e++,this.isBrighter(o,r,n)&&e++,this.isBrighter(i,r,n)&&e++,this.isBrighter(a,r,n)&&e++,3>e&&(e=0,this.isDarker(c,r,n)&&e++,this.isDarker(o,r,n)&&e++,this.isDarker(i,r,n)&&e++,this.isDarker(a,r,n)&&e++,3>e)?!0:!1},tracking.Fast.getCircleOffsets_=function(t){if(this.circles_[t])return this.circles_[t];var r=new Int32Array(16);return r[0]=-t-t-t,r[1]=r[0]+1,r[2]=r[1]+t+1,r[3]=r[2]+t+1,r[4]=r[3]+t,r[5]=r[4]+t,r[6]=r[5]+t-1,r[7]=r[6]+t-1,r[8]=r[7]-1,r[9]=r[8]-1,r[10]=r[9]-t-1,r[11]=r[10]-t-1,r[12]=r[11]-t,r[13]=r[12]-t,r[14]=r[13]-t+1,r[15]=r[14]-t+1,this.circles_[t]=r,r}}(),function(){tracking.Math={},tracking.Math.distance=function(t,r,n,e){var i=n-t,a=e-r;return Math.sqrt(i*i+a*a)},tracking.Math.hammingWeight=function(t){return t-=t>>1&1431655765,t=(858993459&t)+(t>>2&858993459),16843009*(t+(t>>4)&252645135)>>24},tracking.Math.uniformRandom=function(t,r){return t+Math.random()*(r-t)},tracking.Math.intersectRect=function(t,r,n,e,i,a,o,c){return!(i>n||t>o||a>e||r>c)}}(),function(){tracking.Matrix={},tracking.Matrix.forEach=function(t,r,n,e,i){i=i||1;for(var a=0;n>a;a+=i)for(var o=0;r>o;o+=i){var c=a*r*4+4*o;e.call(this,t[c],t[c+1],t[c+2],t[c+3],c,a,o)}}}(),function(){tracking.EPnP={},tracking.EPnP.solve=function(){}}(),function(){tracking.Tracker=function(){tracking.Tracker.base(this,"constructor")},tracking.inherits(tracking.Tracker,tracking.EventEmitter),tracking.Tracker.prototype.track=function(){}}(),function(){tracking.TrackerTask=function(t){if(tracking.TrackerTask.base(this,"constructor"),!t)throw new Error("Tracker instance not specified.");this.setTracker(t)},tracking.inherits(tracking.TrackerTask,tracking.EventEmitter),tracking.TrackerTask.prototype.tracker_=null,tracking.TrackerTask.prototype.running_=!1,tracking.TrackerTask.prototype.getTracker=function(){return this.tracker_},tracking.TrackerTask.prototype.inRunning=function(){return this.running_},tracking.TrackerTask.prototype.setRunning=function(t){this.running_=t},tracking.TrackerTask.prototype.setTracker=function(t){this.tracker_=t},tracking.TrackerTask.prototype.run=function(){var t=this;if(!this.inRunning())return this.setRunning(!0),this.reemitTrackEvent_=function(r){t.emit("track",r)},this.tracker_.on("track",this.reemitTrackEvent_),this.emit("run"),this},tracking.TrackerTask.prototype.stop=function(){return this.inRunning()?(this.setRunning(!1),this.emit("stop"),this.tracker_.removeListener("track",this.reemitTrackEvent_),this):void 0}}(),function(){tracking.ColorTracker=function(t){tracking.ColorTracker.base(this,"constructor"),"string"==typeof t&&(t=[t]),t&&(t.forEach(function(t){if(!tracking.ColorTracker.getColor(t))throw new Error('Color not valid, try `new tracking.ColorTracker("magenta")`.')}),this.setColors(t))},tracking.inherits(tracking.ColorTracker,tracking.Tracker),tracking.ColorTracker.knownColors_={},tracking.ColorTracker.neighbours_={},tracking.ColorTracker.registerColor=function(t,r){tracking.ColorTracker.knownColors_[t]=r},tracking.ColorTracker.getColor=function(t){return tracking.ColorTracker.knownColors_[t]},tracking.ColorTracker.prototype.colors=["magenta"],tracking.ColorTracker.prototype.minDimension=20,tracking.ColorTracker.prototype.maxDimension=1/0,tracking.ColorTracker.prototype.minGroupSize=30,tracking.ColorTracker.prototype.calculateDimensions_=function(t,r){for(var n=-1,e=-1,i=1/0,a=1/0,o=0;r>o;o+=2){var c=t[o],s=t[o+1];i>c&&(i=c),c>n&&(n=c),a>s&&(a=s),s>e&&(e=s)}return{width:n-i,height:e-a,x:i,y:a}},tracking.ColorTracker.prototype.getColors=function(){return this.colors},tracking.ColorTracker.prototype.getMinDimension=function(){return this.minDimension},tracking.ColorTracker.prototype.getMaxDimension=function(){return this.maxDimension},tracking.ColorTracker.prototype.getMinGroupSize=function(){return this.minGroupSize},tracking.ColorTracker.prototype.getNeighboursForWidth_=function(t){if(tracking.ColorTracker.neighbours_[t])return tracking.ColorTracker.neighbours_[t];var r=new Int32Array(8);return r[0]=4*-t,r[1]=4*-t+4,r[2]=4,r[3]=4*t+4,r[4]=4*t,r[5]=4*t-4,r[6]=-4,r[7]=4*-t-4,tracking.ColorTracker.neighbours_[t]=r,r},tracking.ColorTracker.prototype.mergeRectangles_=function(t){for(var r,n=[],e=this.getMinDimension(),i=this.getMaxDimension(),a=0;a<t.length;a++){var o=t[a];r=!0;for(var c=a+1;c<t.length;c++){var s=t[c];if(tracking.Math.intersectRect(o.x,o.y,o.x+o.width,o.y+o.height,s.x,s.y,s.x+s.width,s.y+s.height)){r=!1;var g=Math.min(o.x,s.x),h=Math.min(o.y,s.y),k=Math.max(o.x+o.width,s.x+s.width),u=Math.max(o.y+o.height,s.y+s.height);s.height=u-h,s.width=k-g,s.x=g,s.y=h;break}}r&&o.width>=e&&o.height>=e&&o.width<=i&&o.height<=i&&n.push(o)}return n},tracking.ColorTracker.prototype.setColors=function(t){this.colors=t},tracking.ColorTracker.prototype.setMinDimension=function(t){this.minDimension=t},tracking.ColorTracker.prototype.setMaxDimension=function(t){this.maxDimension=t},tracking.ColorTracker.prototype.setMinGroupSize=function(t){this.minGroupSize=t},tracking.ColorTracker.prototype.track=function(t,r,n){var e=this,i=this.getColors();if(!i)throw new Error('Colors not specified, try `new tracking.ColorTracker("magenta")`.');var a=[];i.forEach(function(i){a=a.concat(e.trackColor_(t,r,n,i))}),this.emit("track",{data:a})},tracking.ColorTracker.prototype.trackColor_=function(n,e,i,a){var o,c,s,g,h,k=tracking.ColorTracker.knownColors_[a],u=new Int32Array(n.length>>2),f=new Int8Array(n.length),l=this.getMinGroupSize(),p=this.getNeighboursForWidth_(e),v=new Int32Array(n.length),m=[],y=-4;if(!k)return m;for(var d=0;i>d;d++)for(var w=0;e>w;w++)if(y+=4,!f[y]){for(o=0,h=-1,v[++h]=y,v[++h]=d,v[++h]=w,f[y]=1;h>=0;)if(s=v[h--],c=v[h--],g=v[h--],k(n[g],n[g+1],n[g+2],n[g+3],g,c,s)){u[o++]=s,u[o++]=c;for(var T=0;T<p.length;T++){var C=g+p[T],_=c+t[T],E=s+r[T];!f[C]&&_>=0&&i>_&&E>=0&&e>E&&(v[++h]=C,v[++h]=_,v[++h]=E,f[C]=1)}}if(o>=l){var M=this.calculateDimensions_(u,o);M&&(M.color=a,m.push(M))}}return this.mergeRectangles_(m)},tracking.ColorTracker.registerColor("cyan",function(t,r,n){var e=50,i=70,a=t-0,o=r-255,c=n-255;return r-t>=e&&n-t>=i?!0:6400>a*a+o*o+c*c}),tracking.ColorTracker.registerColor("magenta",function(t,r,n){var e=50,i=t-255,a=r-0,o=n-255;return t-r>=e&&n-r>=e?!0:19600>i*i+a*a+o*o}),tracking.ColorTracker.registerColor("yellow",function(t,r,n){var e=50,i=t-255,a=r-255,o=n-0;return t-n>=e&&r-n>=e?!0:1e4>i*i+a*a+o*o});var t=new Int32Array([-1,-1,0,1,1,1,0,-1]),r=new Int32Array([0,1,1,1,0,-1,-1,-1])}(),function(){tracking.ObjectTracker=function(t){tracking.ObjectTracker.base(this,"constructor"),t&&(Array.isArray(t)||(t=[t]),Array.isArray(t)&&t.forEach(function(r,n){if("string"==typeof r&&(t[n]=tracking.ViolaJones.classifiers[r]),!t[n])throw new Error('Object classifier not valid, try `new tracking.ObjectTracker("face")`.')})),this.setClassifiers(t)},tracking.inherits(tracking.ObjectTracker,tracking.Tracker),tracking.ObjectTracker.prototype.edgesDensity=.2,tracking.ObjectTracker.prototype.initialScale=1,tracking.ObjectTracker.prototype.scaleFactor=1.25,tracking.ObjectTracker.prototype.stepSize=1.5,tracking.ObjectTracker.prototype.getClassifiers=function(){return this.classifiers},tracking.ObjectTracker.prototype.getEdgesDensity=function(){return this.edgesDensity},tracking.ObjectTracker.prototype.getInitialScale=function(){return this.initialScale},tracking.ObjectTracker.prototype.getScaleFactor=function(){return this.scaleFactor},tracking.ObjectTracker.prototype.getStepSize=function(){return this.stepSize},tracking.ObjectTracker.prototype.track=function(t,r,n){var e=this,i=this.getClassifiers();if(!i)throw new Error('Object classifier not specified, try `new tracking.ObjectTracker("face")`.');var a=[];i.forEach(function(i){a=a.concat(tracking.ViolaJones.detect(t,r,n,e.getInitialScale(),e.getScaleFactor(),e.getStepSize(),e.getEdgesDensity(),i))}),this.emit("track",{data:a})},tracking.ObjectTracker.prototype.setClassifiers=function(t){this.classifiers=t},tracking.ObjectTracker.prototype.setEdgesDensity=function(t){this.edgesDensity=t},tracking.ObjectTracker.prototype.setInitialScale=function(t){this.initialScale=t},tracking.ObjectTracker.prototype.setScaleFactor=function(t){this.scaleFactor=t},tracking.ObjectTracker.prototype.setStepSize=function(t){this.stepSize=t}}();
/***** TRACKING *****/
var Tracking = (function(_, tracking, document){
	var trackingCanvas  = document.getElementById('tracking-canvas'),
		trackingContext = trackingCanvas.getContext('2d'),
		isTracking 		= false,
		FastTracker 	= function(){
			FastTracker.base(this, 'constructor');

			this.corners   	 		   = [];   // Point d'intérêts
			this.descriptors 		   = [];   // Descripteurs de ces points d'intérêts, utilisés pour faire le match
			this.translationIntensity  = 0;    // Enregistrement de l'intensité (la hauteur) de translation de l'image
			this.blur 	   			   = 4;    // Taux de flou à appliquer sur l'image (suppression des points d'intérêts peu précis)
			this.uncertainty		   = 3;    // Hauteur d'incertitude en pixels pour valider le déplacement d'un point
			this.translationThreshold  = 1;    // Hauteur en pixel nécessaire pour détecter qu'un mouvement est une translation
			this.translationPercentage = 0.98; // Pourcentages des points d'intérêts qui doivent avoir bougé de la même hauteur pour que ce soit une translation d'image
			
			this.bouncing		   		   = false;	// Booléen pour savoir si l'image est en train d'osciller
			this.bounceIntensities 		   = [];	// Tableau qui enregistre les intensités de bounce à chaque translation d'image
			this.lastBouncesLength 		   = 0;		// Enregistrement de la taille du tableau bounceIntensities
			this.startTracking	   		   = false;	// Booléen pour savoir si on est prêt tracker une nouvelle translation d'image
			this.startTrackingIndex 	   = 0;		// On enregistre à partir de quel index on peut rechercher ces nouveaux knock dans this.bounceIntensities
			this.increasingBounceThreshold = 3; 	// Nombre de rebonds devant être supérieurs au précédent pour décider qu'un nouveau knock a eu lieu
			this.interval 				   = null;	// Initialisation pour setInterval
		};

	tracking.inherits(FastTracker, tracking.Tracker);

	FastTracker.prototype.isTranslation = function(matches){
		if (matches.length > 1){ // Si il y a plus d'un match
			var reliableKeypoint  = _.max(matches, function(match){return match.confidence;}),
				translationHeight = reliableKeypoint.keypoint2[1] - reliableKeypoint.keypoint1[1]; // Hauteur de la translation du keypoint avec la meilleure confidence

			this.translationIntensity = translationHeight; // On enregistre l'intensité de la translation d'image
			translationHeight 		  = Math.abs(translationHeight);

			if (translationHeight >= this.translationThreshold) { // Si l'intensité de la translation est supérieure ou égale à notre seuil de translation (1px)
				/* 
				Si plus de this.translationPercentage pourcent des points d'intérêts ont bougé de la même hauteur (en tenant compte de this.uncertainty)
				c'est qu'il y a bien eu translation d'image 
				*/
				return _.filter(matches, function(match){
					var difference = Math.abs(match.keypoint2[1] - match.keypoint1[1]);

					if (difference > 0 && difference - this.uncertainty <= translationHeight && difference + this.uncertainty >= translationHeight){
						return true;
					}
				}, this).length >= Math.floor(this.translationPercentage * matches.length);
			}
		}

		return false;
	};

	FastTracker.prototype.knock = function(){ // Feedback
		Templating.activeModule.reference.feedback();
	};

	FastTracker.prototype.checkNewBounce = function(){
		// Si depuis la dernière exécution de la fonction (intervalle de 300ms), aucun nouveau rebond n'a eu lieu
		if (this.bounceIntensities.length == this.lastBouncesLength){
			console.log('                             reset');
			// On reset les valeurs et on attends la prochaine translation d'image
			this.resetValues();
			this.bouncing 		   = false;
			this.bounceIntensities = [];
		}

		else { // Sinon, on mets à jour le nombre de rebonds
			this.lastBouncesLength = this.bounceIntensities.length;
		}
	};

	FastTracker.prototype.resetValues = function(){
		clearInterval(this.interval);
		this.startTracking 		= false;
		this.startTrackingIndex = 0;
		this.lastBouncesLength 	= 0;
	};

	FastTracker.prototype.initiateTimeout = function(that, timer){ // Feedback timer
		setTimeout(function(){
		/*	if (that.bounceIntensities.length){ // Si on a eu des rebonds après avoir lancé le timeout*/
				console.log('Knock Knock, intensity ' + Math.abs(_.max(that.bounceIntensities))); // On enregistre l'intensité en prenant le rebond le plus important
				that.knock(); // On lance le feedback

				setTimeout(function(){ // 50ms plus tard, on initialise des variables utilisées pour détecter si un nouveau rebond a eu lieu
					that.startTracking 		= true;
					that.startTrackingIndex = that.bounceIntensities.length - 1;
				}, 50);

				that.interval = setInterval(function(){that.checkNewBounce();}, 300); // On lance l'interval pour savoir si les rebonds se sont arrêtés
		/*	}

			else { // Sinon, c'est que les rebonds n'étaient pas assez importants pour être enregistrés
				that.bouncing = false;
			}*/
		}, timer);
	};

	FastTracker.prototype.track = function(pixels, width, height){
		var blur 		   = tracking.Image.blur(pixels, width, height, this.blur),
	    	gray 		   = tracking.Image.grayscale(blur, width, height),
			corners 	   = tracking.Fast.findCorners(gray, width, height),
			descriptors    = tracking.Brief.getDescriptors(gray, width, corners),
			matchedCorners = tracking.Brief.reciprocalMatch(this.corners, this.descriptors, corners, descriptors);

		// Filtrage des matchs avec une confidence inférieure à 0.75 ou avec une valeur de -Infinity/Infinity (?)
		matchedCorners = _.filter(matchedCorners, function(match){return match.confidence >= 0.75 && match.confidence !== Math.abs(Infinity);}); 

		if (this.isTranslation(matchedCorners)){ // Si il y a eu une translation sur cette frame
			if (!this.bouncing){ // Si cette translation n'est pas un des rebonds d'un autre knock
				this.bouncing = true;
				this.initiateTimeout(this, 100); // On lance le timer de feedback
			}

			else {
				var bounceIntensities = this.bounceIntensities,
					positiveBounces   = _.filter(bounceIntensities.slice(this.startTrackingIndex), function(bounce){return bounce > 0;}), // On ne prends que les bonds d'intensité positive après le début du track
					lastBounces 	  = _.last(positiveBounces, this.increasingBounceThreshold); // On prends les this.increasingBounceThreshold dernière valeures de bounceIntensities

				bounceIntensities.push(this.translationIntensity); // On ajoute le nouveau rebond au tableau bounceIntensities

				if (this.startTracking && lastBounces.length && _.every(lastBounces, function(bounce){return bounce > positiveBounces[positiveBounces.length - this.increasingBounceThreshold - 1];}, this)){
					/* Si tous les this.increasingBounceThreshold derniers rebonds sont d'une intensité supérieure à l'index this.increasingBounceThreshold
					C'est que c'est un nouveau knock */
					this.resetValues(); // On reset les valeurs
					this.bounceIntensities = [_.last(bounceIntensities)]; // La dernière valeur du tableau actuel devient la première et le reste des valeurs sont supprimées
					this.initiateTimeout(this, 50); // On relance le timer de feedback
				}
			}
		}

		// Les corners et descriptors de la nouvelle frame sont enregistrés et remplacent donc les valeurs de l'ancienne frame
		this.corners 	 = corners;
		this.descriptors = descriptors;

		this.emit('track', {data: corners});
	};

	var tracker = new FastTracker();

	tracker.on('track', function(event){
		var corners = event.data;

		trackingContext.clearRect(0, 0, trackingCanvas.width, trackingCanvas.height);
		trackingContext.fillStyle = '#F00';

		for (var i = 0; i < corners.length; i += 2){
			trackingContext.fillRect(corners[i], corners[i+1], 2, 2);
		}
	});

	function startTracking(){
		tracking.track('#tracking-video', tracker, {camera: true});
		isTracking = true;
	}

	return {
		get isTracking(){return isTracking;},
		tracker: tracker,
		tracking: tracking,
		startTracking: startTracking
	};
})(_, tracking, document);
/********* Polyfills requestAnimationFrame / cancelAnimationFrame *********/
window.requestAnimFrame = (function(){ 
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(callback){window.setTimeout(callback, 1000 / 60);};
})();

window.cancelAnimFrame = (function(){
	return window.cancelAnimationFrame 	  	 ||
		   window.webkitCancelAnimationFrame ||
		   window.mozCancelAnimationFrame 	 ||
		   window.oCancelAnimationFrame		 ||
		   window.msCancelAnimationFrame 	 ||
		   window.clearTimeout;
})();

/***** ELEMENTS & EVENTS *****/
var Elements = (function($, window){
	var container 	= $('.container'),
		content 	= container.find('.content'),
		menu 	    = $('.menu'),
		modulesList = menu.find('.modules li'),
		presetsList = menu.find('.presets li'),
		menuButton  = menu.find('.toggle-button');


	$(window).on('popstate', function(){
		if (!Templating.isChanging){
			Templating.loadTemplate(window.location.hash.split('#')[1]);
		}
	});

	$('.modules .module-switch').on('click', function(event){
		event.stopPropagation();

		Templating.loadTemplate($(this).attr('href').split('#')[1]);
	});

	modulesList.on('click', function(){
		$(this).find('a').trigger('click');
	});

	presetsList.on('click', function(){
		Templating.activePreset = $(this).data('preset');
		Templating.loadPreset(Templating.activePreset);
	});

	menuButton.on('click', function(){
		menu.clearQueue();
		menuButton.toggleClass('opened');
		menu.toggleClass('closed open');
		container.toggleClass('pushed');

		return false;
	});

	$(window).unload(function(){
		localStorage.setItem('preset', Templating.activePreset);
	});

	$('.btn-confirm').on('click', function(){
		Templating.loadTemplate(Templating.activeModule.name);
	});

	return {
		content: content,
		modulesList: modulesList,
		presetsList: presetsList
	};
})(jQuery, window);

/***** MODULES *****/
var Modules = {};
Modules.graph = function(){
	var title  = 'Intensity Graph',
		canvas = document.getElementById('chart-canvas'),
		resize = function(){
			canvas.width  = Elements.content.width();
			canvas.height = Elements.content.height();
		}();

	$(window).on('resize', resize);

	var smoothie = new SmoothieChart({
			grid: {strokeStyle: 'transparent', verticalSections: 0, borderVisible: false, fillStyle: 'transparent'},
			labels: {disabled: true},
			millisPerPixel: 5,
			maxValue: 10,
			minValue: -8
		}),
		intensityLine = new TimeSeries();

	function feedback(){
		return;
	}

	function loop(){
		var intensity = Math.abs(_.last(Tracking.tracker.bounceIntensities)) || 0;

		intensityLine.append(new Date().getTime(), intensity);
		Templating.requestId = window.requestAnimFrame(loop);
	}

	smoothie.addTimeSeries(intensityLine, {lineWidth: '4', strokeStyle: '#AAA'});
	smoothie.streamTo(canvas, 0);

	loop();

	return {
		feedback: feedback,
		title: title
	};
};
Modules.sidlee = function(){
	var title			= 'SidLee Particles',
		canvas 		 	= document.getElementById('particles-canvas'),
		context    	 	= canvas.getContext('2d'),
		particles  	 	= [],
		randomParticles = [],
		reposition 	 	= true,
		positions  	 	= [{"x":4,"y":0},{"x":5,"y":0},{"x":6,"y":0},{"x":7,"y":0},{"x":8,"y":0},{"x":9,"y":0},{"x":10,"y":0},{"x":11,"y":0},{"x":16,"y":0},{"x":17,"y":0},{"x":18,"y":0},{"x":19,"y":0},{"x":20,"y":0},{"x":23,"y":0},{"x":24,"y":0},{"x":25,"y":0},{"x":26,"y":0},{"x":27,"y":0},{"x":28,"y":0},{"x":29,"y":0},{"x":30,"y":0},{"x":31,"y":0},{"x":32,"y":0},{"x":41,"y":0},{"x":42,"y":0},{"x":43,"y":0},{"x":44,"y":0},{"x":45,"y":0},{"x":55,"y":0},{"x":56,"y":0},{"x":57,"y":0},{"x":58,"y":0},{"x":59,"y":0},{"x":60,"y":0},{"x":61,"y":0},{"x":62,"y":0},{"x":63,"y":0},{"x":64,"y":0},{"x":65,"y":0},{"x":68,"y":0},{"x":69,"y":0},{"x":70,"y":0},{"x":71,"y":0},{"x":72,"y":0},{"x":73,"y":0},{"x":74,"y":0},{"x":75,"y":0},{"x":76,"y":0},{"x":77,"y":0},{"x":78,"y":0},{"x":3,"y":1},{"x":4,"y":1},{"x":5,"y":1},{"x":6,"y":1},{"x":7,"y":1},{"x":8,"y":1},{"x":9,"y":1},{"x":10,"y":1},{"x":11,"y":1},{"x":12,"y":1},{"x":16,"y":1},{"x":17,"y":1},{"x":18,"y":1},{"x":19,"y":1},{"x":20,"y":1},{"x":23,"y":1},{"x":24,"y":1},{"x":25,"y":1},{"x":26,"y":1},{"x":27,"y":1},{"x":28,"y":1},{"x":29,"y":1},{"x":30,"y":1},{"x":31,"y":1},{"x":32,"y":1},{"x":33,"y":1},{"x":41,"y":1},{"x":42,"y":1},{"x":43,"y":1},{"x":44,"y":1},{"x":45,"y":1},{"x":55,"y":1},{"x":56,"y":1},{"x":57,"y":1},{"x":58,"y":1},{"x":59,"y":1},{"x":60,"y":1},{"x":61,"y":1},{"x":62,"y":1},{"x":63,"y":1},{"x":64,"y":1},{"x":65,"y":1},{"x":68,"y":1},{"x":69,"y":1},{"x":70,"y":1},{"x":71,"y":1},{"x":72,"y":1},{"x":73,"y":1},{"x":74,"y":1},{"x":75,"y":1},{"x":76,"y":1},{"x":77,"y":1},{"x":78,"y":1},{"x":2,"y":2},{"x":3,"y":2},{"x":4,"y":2},{"x":5,"y":2},{"x":6,"y":2},{"x":7,"y":2},{"x":8,"y":2},{"x":9,"y":2},{"x":10,"y":2},{"x":11,"y":2},{"x":12,"y":2},{"x":13,"y":2},{"x":16,"y":2},{"x":17,"y":2},{"x":18,"y":2},{"x":19,"y":2},{"x":20,"y":2},{"x":23,"y":2},{"x":24,"y":2},{"x":25,"y":2},{"x":26,"y":2},{"x":27,"y":2},{"x":28,"y":2},{"x":29,"y":2},{"x":30,"y":2},{"x":31,"y":2},{"x":32,"y":2},{"x":33,"y":2},{"x":34,"y":2},{"x":41,"y":2},{"x":42,"y":2},{"x":43,"y":2},{"x":44,"y":2},{"x":45,"y":2},{"x":55,"y":2},{"x":56,"y":2},{"x":57,"y":2},{"x":58,"y":2},{"x":59,"y":2},{"x":60,"y":2},{"x":61,"y":2},{"x":62,"y":2},{"x":63,"y":2},{"x":64,"y":2},{"x":65,"y":2},{"x":68,"y":2},{"x":69,"y":2},{"x":70,"y":2},{"x":71,"y":2},{"x":72,"y":2},{"x":73,"y":2},{"x":74,"y":2},{"x":75,"y":2},{"x":76,"y":2},{"x":77,"y":2},{"x":78,"y":2},{"x":1,"y":3},{"x":2,"y":3},{"x":3,"y":3},{"x":4,"y":3},{"x":5,"y":3},{"x":6,"y":3},{"x":7,"y":3},{"x":8,"y":3},{"x":9,"y":3},{"x":10,"y":3},{"x":11,"y":3},{"x":12,"y":3},{"x":13,"y":3},{"x":16,"y":3},{"x":17,"y":3},{"x":18,"y":3},{"x":19,"y":3},{"x":20,"y":3},{"x":23,"y":3},{"x":24,"y":3},{"x":25,"y":3},{"x":26,"y":3},{"x":27,"y":3},{"x":28,"y":3},{"x":29,"y":3},{"x":30,"y":3},{"x":31,"y":3},{"x":32,"y":3},{"x":33,"y":3},{"x":34,"y":3},{"x":35,"y":3},{"x":41,"y":3},{"x":42,"y":3},{"x":43,"y":3},{"x":44,"y":3},{"x":45,"y":3},{"x":55,"y":3},{"x":56,"y":3},{"x":57,"y":3},{"x":58,"y":3},{"x":59,"y":3},{"x":60,"y":3},{"x":61,"y":3},{"x":62,"y":3},{"x":63,"y":3},{"x":64,"y":3},{"x":65,"y":3},{"x":68,"y":3},{"x":69,"y":3},{"x":70,"y":3},{"x":71,"y":3},{"x":72,"y":3},{"x":73,"y":3},{"x":74,"y":3},{"x":75,"y":3},{"x":76,"y":3},{"x":77,"y":3},{"x":78,"y":3},{"x":1,"y":4},{"x":2,"y":4},{"x":3,"y":4},{"x":4,"y":4},{"x":5,"y":4},{"x":6,"y":4},{"x":7,"y":4},{"x":10,"y":4},{"x":11,"y":4},{"x":12,"y":4},{"x":13,"y":4},{"x":16,"y":4},{"x":17,"y":4},{"x":18,"y":4},{"x":19,"y":4},{"x":20,"y":4},{"x":23,"y":4},{"x":24,"y":4},{"x":25,"y":4},{"x":26,"y":4},{"x":27,"y":4},{"x":28,"y":4},{"x":29,"y":4},{"x":30,"y":4},{"x":31,"y":4},{"x":32,"y":4},{"x":33,"y":4},{"x":34,"y":4},{"x":35,"y":4},{"x":36,"y":4},{"x":41,"y":4},{"x":42,"y":4},{"x":43,"y":4},{"x":44,"y":4},{"x":45,"y":4},{"x":55,"y":4},{"x":56,"y":4},{"x":57,"y":4},{"x":58,"y":4},{"x":59,"y":4},{"x":68,"y":4},{"x":69,"y":4},{"x":70,"y":4},{"x":71,"y":4},{"x":72,"y":4},{"x":1,"y":5},{"x":2,"y":5},{"x":3,"y":5},{"x":4,"y":5},{"x":5,"y":5},{"x":6,"y":5},{"x":7,"y":5},{"x":16,"y":5},{"x":17,"y":5},{"x":18,"y":5},{"x":19,"y":5},{"x":20,"y":5},{"x":23,"y":5},{"x":24,"y":5},{"x":25,"y":5},{"x":26,"y":5},{"x":27,"y":5},{"x":31,"y":5},{"x":32,"y":5},{"x":33,"y":5},{"x":34,"y":5},{"x":35,"y":5},{"x":36,"y":5},{"x":41,"y":5},{"x":42,"y":5},{"x":43,"y":5},{"x":44,"y":5},{"x":45,"y":5},{"x":55,"y":5},{"x":56,"y":5},{"x":57,"y":5},{"x":58,"y":5},{"x":59,"y":5},{"x":68,"y":5},{"x":69,"y":5},{"x":70,"y":5},{"x":71,"y":5},{"x":72,"y":5},{"x":1,"y":6},{"x":2,"y":6},{"x":3,"y":6},{"x":4,"y":6},{"x":5,"y":6},{"x":6,"y":6},{"x":7,"y":6},{"x":8,"y":6},{"x":9,"y":6},{"x":10,"y":6},{"x":11,"y":6},{"x":16,"y":6},{"x":17,"y":6},{"x":18,"y":6},{"x":19,"y":6},{"x":20,"y":6},{"x":23,"y":6},{"x":24,"y":6},{"x":25,"y":6},{"x":26,"y":6},{"x":27,"y":6},{"x":31,"y":6},{"x":32,"y":6},{"x":33,"y":6},{"x":34,"y":6},{"x":35,"y":6},{"x":36,"y":6},{"x":41,"y":6},{"x":42,"y":6},{"x":43,"y":6},{"x":44,"y":6},{"x":45,"y":6},{"x":55,"y":6},{"x":56,"y":6},{"x":57,"y":6},{"x":58,"y":6},{"x":59,"y":6},{"x":60,"y":6},{"x":61,"y":6},{"x":62,"y":6},{"x":63,"y":6},{"x":64,"y":6},{"x":68,"y":6},{"x":69,"y":6},{"x":70,"y":6},{"x":71,"y":6},{"x":72,"y":6},{"x":73,"y":6},{"x":74,"y":6},{"x":75,"y":6},{"x":76,"y":6},{"x":77,"y":6},{"x":2,"y":7},{"x":3,"y":7},{"x":4,"y":7},{"x":5,"y":7},{"x":6,"y":7},{"x":7,"y":7},{"x":8,"y":7},{"x":9,"y":7},{"x":10,"y":7},{"x":11,"y":7},{"x":12,"y":7},{"x":16,"y":7},{"x":17,"y":7},{"x":18,"y":7},{"x":19,"y":7},{"x":20,"y":7},{"x":23,"y":7},{"x":24,"y":7},{"x":25,"y":7},{"x":26,"y":7},{"x":27,"y":7},{"x":31,"y":7},{"x":32,"y":7},{"x":33,"y":7},{"x":34,"y":7},{"x":35,"y":7},{"x":36,"y":7},{"x":41,"y":7},{"x":42,"y":7},{"x":43,"y":7},{"x":44,"y":7},{"x":45,"y":7},{"x":55,"y":7},{"x":56,"y":7},{"x":57,"y":7},{"x":58,"y":7},{"x":59,"y":7},{"x":60,"y":7},{"x":61,"y":7},{"x":62,"y":7},{"x":63,"y":7},{"x":64,"y":7},{"x":68,"y":7},{"x":69,"y":7},{"x":70,"y":7},{"x":71,"y":7},{"x":72,"y":7},{"x":73,"y":7},{"x":74,"y":7},{"x":75,"y":7},{"x":76,"y":7},{"x":77,"y":7},{"x":4,"y":8},{"x":5,"y":8},{"x":6,"y":8},{"x":7,"y":8},{"x":8,"y":8},{"x":9,"y":8},{"x":10,"y":8},{"x":11,"y":8},{"x":12,"y":8},{"x":13,"y":8},{"x":16,"y":8},{"x":17,"y":8},{"x":18,"y":8},{"x":19,"y":8},{"x":20,"y":8},{"x":23,"y":8},{"x":24,"y":8},{"x":25,"y":8},{"x":26,"y":8},{"x":27,"y":8},{"x":31,"y":8},{"x":32,"y":8},{"x":33,"y":8},{"x":34,"y":8},{"x":35,"y":8},{"x":36,"y":8},{"x":41,"y":8},{"x":42,"y":8},{"x":43,"y":8},{"x":44,"y":8},{"x":45,"y":8},{"x":55,"y":8},{"x":56,"y":8},{"x":57,"y":8},{"x":58,"y":8},{"x":59,"y":8},{"x":60,"y":8},{"x":61,"y":8},{"x":62,"y":8},{"x":63,"y":8},{"x":64,"y":8},{"x":68,"y":8},{"x":69,"y":8},{"x":70,"y":8},{"x":71,"y":8},{"x":72,"y":8},{"x":73,"y":8},{"x":74,"y":8},{"x":75,"y":8},{"x":76,"y":8},{"x":77,"y":8},{"x":7,"y":9},{"x":8,"y":9},{"x":9,"y":9},{"x":10,"y":9},{"x":11,"y":9},{"x":12,"y":9},{"x":13,"y":9},{"x":16,"y":9},{"x":17,"y":9},{"x":18,"y":9},{"x":19,"y":9},{"x":20,"y":9},{"x":23,"y":9},{"x":24,"y":9},{"x":25,"y":9},{"x":26,"y":9},{"x":27,"y":9},{"x":31,"y":9},{"x":32,"y":9},{"x":33,"y":9},{"x":34,"y":9},{"x":35,"y":9},{"x":36,"y":9},{"x":41,"y":9},{"x":42,"y":9},{"x":43,"y":9},{"x":44,"y":9},{"x":45,"y":9},{"x":55,"y":9},{"x":56,"y":9},{"x":57,"y":9},{"x":58,"y":9},{"x":59,"y":9},{"x":68,"y":9},{"x":69,"y":9},{"x":70,"y":9},{"x":71,"y":9},{"x":72,"y":9},{"x":2,"y":10},{"x":3,"y":10},{"x":4,"y":10},{"x":8,"y":10},{"x":9,"y":10},{"x":10,"y":10},{"x":11,"y":10},{"x":12,"y":10},{"x":13,"y":10},{"x":16,"y":10},{"x":17,"y":10},{"x":18,"y":10},{"x":19,"y":10},{"x":20,"y":10},{"x":23,"y":10},{"x":24,"y":10},{"x":25,"y":10},{"x":26,"y":10},{"x":27,"y":10},{"x":31,"y":10},{"x":32,"y":10},{"x":33,"y":10},{"x":34,"y":10},{"x":35,"y":10},{"x":36,"y":10},{"x":41,"y":10},{"x":42,"y":10},{"x":43,"y":10},{"x":44,"y":10},{"x":45,"y":10},{"x":55,"y":10},{"x":56,"y":10},{"x":57,"y":10},{"x":58,"y":10},{"x":59,"y":10},{"x":68,"y":10},{"x":69,"y":10},{"x":70,"y":10},{"x":71,"y":10},{"x":72,"y":10},{"x":1,"y":11},{"x":2,"y":11},{"x":3,"y":11},{"x":4,"y":11},{"x":5,"y":11},{"x":6,"y":11},{"x":7,"y":11},{"x":8,"y":11},{"x":9,"y":11},{"x":10,"y":11},{"x":11,"y":11},{"x":12,"y":11},{"x":13,"y":11},{"x":16,"y":11},{"x":17,"y":11},{"x":18,"y":11},{"x":19,"y":11},{"x":20,"y":11},{"x":23,"y":11},{"x":24,"y":11},{"x":25,"y":11},{"x":26,"y":11},{"x":27,"y":11},{"x":28,"y":11},{"x":29,"y":11},{"x":30,"y":11},{"x":31,"y":11},{"x":32,"y":11},{"x":33,"y":11},{"x":34,"y":11},{"x":35,"y":11},{"x":41,"y":11},{"x":42,"y":11},{"x":43,"y":11},{"x":44,"y":11},{"x":45,"y":11},{"x":46,"y":11},{"x":47,"y":11},{"x":48,"y":11},{"x":49,"y":11},{"x":50,"y":11},{"x":51,"y":11},{"x":52,"y":11},{"x":55,"y":11},{"x":56,"y":11},{"x":57,"y":11},{"x":58,"y":11},{"x":59,"y":11},{"x":60,"y":11},{"x":61,"y":11},{"x":62,"y":11},{"x":63,"y":11},{"x":64,"y":11},{"x":65,"y":11},{"x":68,"y":11},{"x":69,"y":11},{"x":70,"y":11},{"x":71,"y":11},{"x":72,"y":11},{"x":73,"y":11},{"x":74,"y":11},{"x":75,"y":11},{"x":76,"y":11},{"x":77,"y":11},{"x":78,"y":11},{"x":1,"y":12},{"x":2,"y":12},{"x":3,"y":12},{"x":4,"y":12},{"x":5,"y":12},{"x":6,"y":12},{"x":7,"y":12},{"x":8,"y":12},{"x":9,"y":12},{"x":10,"y":12},{"x":11,"y":12},{"x":12,"y":12},{"x":13,"y":12},{"x":16,"y":12},{"x":17,"y":12},{"x":18,"y":12},{"x":19,"y":12},{"x":20,"y":12},{"x":23,"y":12},{"x":24,"y":12},{"x":25,"y":12},{"x":26,"y":12},{"x":27,"y":12},{"x":28,"y":12},{"x":29,"y":12},{"x":30,"y":12},{"x":31,"y":12},{"x":32,"y":12},{"x":33,"y":12},{"x":34,"y":12},{"x":41,"y":12},{"x":42,"y":12},{"x":43,"y":12},{"x":44,"y":12},{"x":45,"y":12},{"x":46,"y":12},{"x":47,"y":12},{"x":48,"y":12},{"x":49,"y":12},{"x":50,"y":12},{"x":51,"y":12},{"x":52,"y":12},{"x":55,"y":12},{"x":56,"y":12},{"x":57,"y":12},{"x":58,"y":12},{"x":59,"y":12},{"x":60,"y":12},{"x":61,"y":12},{"x":62,"y":12},{"x":63,"y":12},{"x":64,"y":12},{"x":65,"y":12},{"x":68,"y":12},{"x":69,"y":12},{"x":70,"y":12},{"x":71,"y":12},{"x":72,"y":12},{"x":73,"y":12},{"x":74,"y":12},{"x":75,"y":12},{"x":76,"y":12},{"x":77,"y":12},{"x":78,"y":12},{"x":2,"y":13},{"x":3,"y":13},{"x":4,"y":13},{"x":5,"y":13},{"x":6,"y":13},{"x":7,"y":13},{"x":8,"y":13},{"x":9,"y":13},{"x":10,"y":13},{"x":11,"y":13},{"x":12,"y":13},{"x":16,"y":13},{"x":17,"y":13},{"x":18,"y":13},{"x":19,"y":13},{"x":20,"y":13},{"x":23,"y":13},{"x":24,"y":13},{"x":25,"y":13},{"x":26,"y":13},{"x":27,"y":13},{"x":28,"y":13},{"x":29,"y":13},{"x":30,"y":13},{"x":31,"y":13},{"x":32,"y":13},{"x":33,"y":13},{"x":41,"y":13},{"x":42,"y":13},{"x":43,"y":13},{"x":44,"y":13},{"x":45,"y":13},{"x":46,"y":13},{"x":47,"y":13},{"x":48,"y":13},{"x":49,"y":13},{"x":50,"y":13},{"x":51,"y":13},{"x":52,"y":13},{"x":55,"y":13},{"x":56,"y":13},{"x":57,"y":13},{"x":58,"y":13},{"x":59,"y":13},{"x":60,"y":13},{"x":61,"y":13},{"x":62,"y":13},{"x":63,"y":13},{"x":64,"y":13},{"x":65,"y":13},{"x":68,"y":13},{"x":69,"y":13},{"x":70,"y":13},{"x":71,"y":13},{"x":72,"y":13},{"x":73,"y":13},{"x":74,"y":13},{"x":75,"y":13},{"x":76,"y":13},{"x":77,"y":13},{"x":78,"y":13},{"x":3,"y":14},{"x":4,"y":14},{"x":5,"y":14},{"x":6,"y":14},{"x":7,"y":14},{"x":8,"y":14},{"x":9,"y":14},{"x":10,"y":14},{"x":16,"y":14},{"x":17,"y":14},{"x":18,"y":14},{"x":19,"y":14},{"x":20,"y":14},{"x":23,"y":14},{"x":24,"y":14},{"x":25,"y":14},{"x":26,"y":14},{"x":27,"y":14},{"x":28,"y":14},{"x":29,"y":14},{"x":30,"y":14},{"x":31,"y":14},{"x":41,"y":14},{"x":42,"y":14},{"x":43,"y":14},{"x":44,"y":14},{"x":45,"y":14},{"x":46,"y":14},{"x":47,"y":14},{"x":48,"y":14},{"x":49,"y":14},{"x":50,"y":14},{"x":51,"y":14},{"x":52,"y":14},{"x":55,"y":14},{"x":56,"y":14},{"x":57,"y":14},{"x":58,"y":14},{"x":59,"y":14},{"x":60,"y":14},{"x":61,"y":14},{"x":62,"y":14},{"x":63,"y":14},{"x":64,"y":14},{"x":65,"y":14},{"x":68,"y":14},{"x":69,"y":14},{"x":70,"y":14},{"x":71,"y":14},{"x":72,"y":14},{"x":73,"y":14},{"x":74,"y":14},{"x":75,"y":14},{"x":76,"y":14},{"x":77,"y":14},{"x":78,"y":14}];

	context.fillStyle = '#FFF';

	var feedback = _.throttle(function(){
		_.each(particles, function(particle){
			particle.vx = particle.vx * 30 * (0.6 + Math.random() * 0.4);
			particle.vy = particle.vy * 30 * (0.6 + Math.random() * 0.4);
		});

		reposition = false;

		setTimeout(function() {
			reposition = true;
		}, 1000);
	}, 2100, {trailing: false});

	function createParticles(){
		for(var i = 0; i < positions.length; i++){
			var initialX = positions[i].x * 10 + (canvas.width / 2 - 80 /* Width img originale */ * 10 / 2),
				initialY = positions[i].y * 10 + (canvas.height / 2 - 15 /* Height img originale */ * 10 / 2);

			particles.push({
				x: initialX, 
				y: initialY, 
				initialX: initialX,
				initialY: initialY,
				radius: Math.floor(Math.random() * 2) + 1,
				alpha: Math.max(Math.random(), 0.5),
				vx: Math.random() - 0.5,
				vy: Math.random() - 0.5,
				distanceFromOrigin: 0
			});
		}

		loop();
	}

	function createRandomParticles(){
		for (var i = 0; i < 100; i++){
			var initialX = Math.random()*canvas.width,
				initialY = Math.random()*canvas.height;

			randomParticles.push({
				x: initialX,
				y: initialY,
				initialX: initialX,
				initialY: initialY,
				radius: Math.random() + 1,
				alpha: Math.max(Math.random(), 0.5),
				vx: Math.random() - 0.5,
				vy: Math.random() - 0.5
			});
		}
	}

	function loop(){
		context.clearRect(0, 0, canvas.width, canvas.height);	
		update();
		render();
		Templating.requestId = window.requestAnimFrame(loop);
	}

	function render(){
		var allParticles = particles.concat(randomParticles);

		_.each(allParticles, function(particle){
			context.globalAlpha = particle.alpha;
			context.beginPath();
			context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
			context.fill();
		});
	}

	function getDistanceFromOrigin(particle){
		var deltaX = particle.x - particle.initialX,
			deltaY = particle.y - particle.initialY;

		return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
	}

	function update(){
		_.each(particles, function(particle){
			particle.x += particle.vx;
			particle.y += particle.vy;

			var distanceFromOrigin = getDistanceFromOrigin(particle),
				friction 		   = (1000 - distanceFromOrigin) / 1000;

			if (reposition){
				if (distanceFromOrigin > 3){
				/*	
					var deltaX = particle.x - particle.initialX,
						deltaY = particle.y - particle.initialY;
				*/

					if (distanceFromOrigin > particle.distanceFromOrigin) {
						particle.vx *= -1 * (0.6 + Math.random() * 0.4);
						particle.vy *= -1 * (0.6 + Math.random() * 0.4);	
					}

					else {
						particle.vx /= friction;
						particle.vy /= friction;
					}
				}

				else if (distanceFromOrigin > 2 && distanceFromOrigin > particle.distanceFromOrigin){
					particle.vx = Math.random()/2 - 0.25;
					particle.vy = Math.random()/2 - 0.25;
				}
			}

			else {
				particle.vx *= friction;
				particle.vy *= friction;
			}

			particle.distanceFromOrigin = distanceFromOrigin;
		});

		_.each(randomParticles, function(particle){
			particle.x += particle.vx;
			particle.y += particle.vy;
		});
	}

	createParticles();

	return {
		feedback: feedback,
		title: title
	};
};
Modules.watercup = function(){
	var title 	  = 'Jurassic Watercup',
		video1    = $('#water'),
		video2    = $('#ripple'),
		video3    = $('#trex'),
		count     = 0,
		isPlaying = false;

	function feedback(){
		if (!isPlaying){
			isPlaying = true;
		    video1.hide();

		    if (count < 3){
			    video2.show();
			    video2[0].play();

			    video2[0].onended = function(){
			    	video2.hide();
			    	video1[0].currentTime = 0;
			    	video1.show();
			    	isPlaying = false;
			    };

			    count++;
		    }

		    else {
		    	video3.show();
		    	video3[0].play();
		    	video3[0].onended = function(){
		    		video1[0].currentTime = 0;
		    		video1.fadeIn();
		    		video3.fadeOut();

		    		isPlaying = false;
		    		count 	  = 0;
		    	};
		    }
		}
	}

	return {
		feedback: feedback,
		title: title
	};
};
/***** TEMPLATING *****/
var Templating = (function($, _, Modernizr, window, document){
	var activeModule 	= getActiveModule(window.location.hash.split('#')[1]),
		activePreset 	= localStorage.getItem('preset') || 'normal',
		isChanging		= false,
		requestId;

	function getActiveModule(hash){
		var active = hash === '' ? 'sidlee' : hash;

		active = _.has(Modules, active) ? active : 'sidlee';

		return {
			name: active,
			reference: null
		};
	}

	function loadTemplate(hash){
		if (!Tracking.isTracking){
			Tracking.startTracking();
		}

		stopAnimations();
		isChanging = true;

		activeModule = getActiveModule(hash);

		Elements.content.load('assets/templates/'+ activeModule.name +'.html', function(){
			isChanging = false;

			activeModule.reference = new Modules[activeModule.name]();
			document.title 		   = 'Knock - ' + activeModule.reference.title;
		});

		Elements.modulesList.filter('.active').toggleClass('active');
		Elements.modulesList.find('a').filter('[href="#'+ activeModule.name +'"]').parent().addClass('active');

		window.location.hash = '#' + activeModule.name;
	}

	function loadPreset(preset){
		switch (preset){
			case 'normal':
				Tracking.tracking.Fast.THRESHOLD = 35;
				Tracking.tracker.blur = 4;
				Tracking.tracker.translationPercentage = 0.98;
				break;
			case 'white':
				Tracking.tracking.Fast.THRESHOLD = 20;
				Tracking.tracker.blur = 3;
				Tracking.tracker.translationPercentage = 0.95;
				break;
			case 'low':
				Tracking.tracking.Fast.THRESHOLD = 20;
				Tracking.tracker.blur = 3;
				Tracking.tracker.translationPercentage = 0.95;
				break;
			default:
				return;
		}

		Elements.presetsList.filter('.active').toggleClass('active');
		Elements.presetsList.filter('[data-preset="'+ activePreset +'"]').addClass('active');
	}

	function stopAnimations(){
		if (requestId){
			window.cancelAnimFrame(requestId);
			requestId = undefined;
		}
	}

	loadPreset(activePreset);

	if (!Modernizr.getusermedia){
		Elements.content.html('<div class="center"><p>It looks like your browser cannot capture your camera\'s video, which is required for the experiment to work.<p><p>We recommend the latest versions of Google Chrome or Firefox.</p></div>');
	}

	return {
		loadTemplate: loadTemplate,
		loadPreset: loadPreset,
		stopAnimations: stopAnimations,
		get activeModule(){return activeModule;},
		get activePreset(){return activePreset;},
		set activePreset(value){activePreset = value;},
		get requestId(){return requestId;},
		set requestId(value){requestId = value;},
		get isChanging(){return isChanging;}
	};
})(jQuery, _, Modernizr, window, document);
})();