(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{170:function(t,e,n){var content=n(176);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(46).default)("28fe7462",content,!0,{sourceMap:!1})},171:function(t,e,n){var content=n(178);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(46).default)("1d7ebb6e",content,!0,{sourceMap:!1})},172:function(t,e,n){"use strict";var o=n(2),r=n(15),c=n(19),l=n(99),d=n(47),f=n(9),h=n(48).f,v=n(67).f,m=n(10).f,y=n(173).trim,w=o.Number,C=w,N=w.prototype,x="Number"==c(n(66)(N)),_="trim"in String.prototype,I=function(t){var e=d(t,!1);if("string"==typeof e&&e.length>2){var n,o,r,c=(e=_?e.trim():y(e,3)).charCodeAt(0);if(43===c||45===c){if(88===(n=e.charCodeAt(2))||120===n)return NaN}else if(48===c){switch(e.charCodeAt(1)){case 66:case 98:o=2,r=49;break;case 79:case 111:o=8,r=55;break;default:return+e}for(var code,l=e.slice(2),i=0,f=l.length;i<f;i++)if((code=l.charCodeAt(i))<48||code>r)return NaN;return parseInt(l,o)}}return+e};if(!w(" 0o1")||!w("0b1")||w("+0x1")){w=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof w&&(x?f(function(){N.valueOf.call(n)}):"Number"!=c(n))?l(new C(I(e)),n,w):I(e)};for(var U,E=n(7)?h(C):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),L=0;E.length>L;L++)r(C,U=E[L])&&!r(w,U)&&m(w,U,v(C,U));w.prototype=N,N.constructor=w,n(12)(o,"Number",w)}},173:function(t,e,n){var o=n(4),r=n(18),c=n(9),l=n(174),d="["+l+"]",f=RegExp("^"+d+d+"*"),h=RegExp(d+d+"*$"),v=function(t,e,n){var r={},d=c(function(){return!!l[t]()||"​"!="​"[t]()}),f=r[t]=d?e(m):l[t];n&&(r[n]=f),o(o.P+o.F*d,"String",r)},m=v.trim=function(t,e){return t=String(r(t)),1&e&&(t=t.replace(f,"")),2&e&&(t=t.replace(h,"")),t};t.exports=v},174:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},175:function(t,e,n){"use strict";var o=n(170);n.n(o).a},176:function(t,e,n){(t.exports=n(45)(!1)).push([t.i,".youtube-player[data-v-299820c9]{width:100%;max-width:640px;margin:0 auto}.youtube-player .inner[data-v-299820c9]{position:relative;width:100%;height:0;padding-top:70%}.youtube-player .iframe[data-v-299820c9]{position:absolute;top:0;left:0;width:100%;height:100%}",""])},177:function(t,e,n){"use strict";var o=n(171);n.n(o).a},178:function(t,e,n){(t.exports=n(45)(!1)).push([t.i,".button[data-v-49217ed2],.youtube[data-v-49217ed2]{margin-bottom:1.5rem}",""])},179:function(t,e,n){"use strict";n.r(e);n(33),n(16),n(49),n(50),n(98);function o(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var r=new DOMParser;function c(t,e){return r.parseFromString(t,"application/xml").getElementsByTagName(e)}var l=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.baseUrl="https://video.google.com/timedtext?"}var e,n,r;return e=t,(n=[{key:"getLanguagesByUrl",value:function(t){var e=this,n=this.getVideoIdByUrl(t),o="".concat(this.baseUrl,"type=list&v=").concat(n);return fetch(o).then(function(t){return t.text()}).then(function(t){var track=c(t,"track");return e.languages=function(track){var t=[];if(track.length<=0)return t;for(var e=0;e<track.length;e++){var n=track[e],o="true"===n.getAttribute("lang_default"),r={name:n.getAttribute("name")||"",label:n.getAttribute("lang_original")||"",code:n.getAttribute("lang_code")||"",default:o};t.push(r)}return t}(track),e.languages}).catch(function(t){return e.languages=[],t})}},{key:"getVideoIdByUrl",value:function(t){var e=t.match(/v=(.*?)(&|$)/);return!e||e.length<=0||!t.includes("https://www.youtube.com")?"":e[1]}},{key:"getCaption",value:function(t,e,n){var o="".concat(this.baseUrl||"","name=").concat(e||"")+"&hl=".concat(e||"")+"&lang=".concat(n||"")+"&v=".concat(t||"");return fetch(o).then(function(t){return t.text()}).then(function(t){for(var text=c(t,"text"),caption="",e=0;e<text.length;e++)caption+=text[e].textContent+"\n";return caption})}}])&&o(e.prototype,n),r&&o(e,r),t}()),d=document,f=(n(172),{name:"YoutubePlayer",props:{src:{type:String,default:""},width:{type:Number,default:640},height:{type:Number,default:360}}}),h=(n(175),n(23)),v={name:"PageIndex",components:{YoutubePlayer:Object(h.a)(f,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"youtube-player"},[e("div",{staticClass:"inner"},[e("iframe",{staticClass:"iframe",attrs:{type:"text/html",src:this.src,width:this.width,height:this.height}})])])},[],!1,null,"299820c9",null).exports},data:function(){return{languages:[],selectedLanguageCode:"",caption:"",notification:{success:!1,failed:!1}}},computed:{videoUrl:{get:function(){return this.$store.state.videoUrl},set:function(t){this.$store.commit("setVideoUrl",t)}},videoId:function(){return l.getVideoIdByUrl(this.videoUrl)},enabledLanguages:function(){return this.languages.length>0},enabledCaption:function(){return!!this.caption}},watch:{videoUrl:function(t){this.updateVideoUrl(t)},selectedLanguageCode:function(t){var e=this,n=this.getLangudegeNamebyCode(t);l.getCaption(this.videoId,n,t).then(function(caption){e.caption=caption}).catch(function(t){e.caption="",console.error(t)})},languages:{deep:!0,handler:function(t){var e=this;this.selectedLanguageCode="",t.forEach(function(t){t.default&&(e.selectedLanguageCode=t.code)})}}},created:function(){this.updateVideoUrl(this.videoUrl)},methods:{updateVideoUrl:function(t){var e=this;l.getLanguagesByUrl(t).then(function(t){e.languages=t}).catch(function(t){e.languages=[],e.selectedLanguageCode="",console.error(t)})},getLangudegeNamebyCode:function(t){var e="";return this.languages.forEach(function(n){n.code===t&&(e=n.name)}),e},showNotification:function(t,time){var e=this;this.notification[t]=!0,setTimeout(function(){e.notification[t]=!1},time||3e3)},copyCaption:function(){!function(t){var textarea=d.createElement("textarea");textarea.value=t,textarea.selectionStart=0,textarea.selectionEnd=textarea.value.length;var s=textarea.style;s.position="fixed",s.left="-100%",d.body.appendChild(textarea),textarea.focus();var e=d.execCommand("copy");return textarea.blur(),d.body.removeChild(textarea),e}(this.caption)?this.showNotification("failed"):this.showNotification("success")}}},m=(n(177),Object(h.a)(v,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section"},[n("b-field",{attrs:{label:"Video URL"}},[n("b-input",{attrs:{placeholder:"https://www.youtube.com/watch?v=XXXXXXXXXXX",type:"url",autofocus:""},model:{value:t.videoUrl,callback:function(e){t.videoUrl=e},expression:"videoUrl"}})],1),t._v(" "),t.enabledCaption?[n("youtube-player",{attrs:{src:"http://www.youtube.com/embed/"+t.videoId}}),t._v(" "),n("b-field",{attrs:{label:"Language"}},[n("b-select",{attrs:{placeholder:"Select a language"},model:{value:t.selectedLanguageCode,callback:function(e){t.selectedLanguageCode=e},expression:"selectedLanguageCode"}},t._l(t.languages,function(e){return n("option",{key:e.code,domProps:{value:e.code}},[t._v(t._s(e.label))])}),0)],1),t._v(" "),n("b-field",{attrs:{label:"Caption"}},[n("b-input",{attrs:{type:"textarea"},model:{value:t.caption,callback:function(e){t.caption=e},expression:"caption"}})],1),t._v(" "),n("button",{staticClass:"button is-primary is-medium",on:{click:t.copyCaption}},[t._v("Copy to clipboard")]),t._v(" "),n("b-notification",{attrs:{active:t.notification.success,type:"is-success"}},[t._v("Copied to clipboard.")]),t._v(" "),n("b-notification",{attrs:{active:t.notification.failed,type:"is-danger"}},[t._v("Copy failed.")])]:t._e()],2)},[],!1,null,"49217ed2",null));e.default=m.exports}}]);