if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>i(s,r),a={module:{uri:r},exports:u,require:t};e[r]=Promise.all(l.map((s=>a[s]||t(s)))).then((s=>(n(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/__commonjsHelpers__-BosuxZz1.js",revision:null},{url:"assets/__commonjsHelpers__-legacy-DUdKTVN3.js",revision:null},{url:"assets/focus-visible-legacy-CdO5cX4I.js",revision:null},{url:"assets/focus-visible-supuXXMI.js",revision:null},{url:"assets/index-CbbHwm1A.css",revision:null},{url:"assets/index-DxVRWvtv.js",revision:null},{url:"assets/index-legacy-BuvUHoHk.js",revision:null},{url:"assets/index9-legacy-BsMfdTPl.js",revision:null},{url:"assets/index9-T7LO-u0A.js",revision:null},{url:"assets/input-shims-CXdLijGh.js",revision:null},{url:"assets/input-shims-legacy-Dw94gpmu.js",revision:null},{url:"assets/ios.transition-CNDYghvQ.js",revision:null},{url:"assets/ios.transition-legacy-DwHz4waC.js",revision:null},{url:"assets/md.transition-DzIt0h3x.js",revision:null},{url:"assets/md.transition-legacy-BL1IJG5B.js",revision:null},{url:"assets/polyfills-legacy-D40FEAGT.js",revision:null},{url:"assets/status-tap-D2-G6XPo.js",revision:null},{url:"assets/status-tap-legacy-htQ_lXiT.js",revision:null},{url:"assets/swipe-back-legacy-DCcnG6XK.js",revision:null},{url:"assets/swipe-back-Rh60UM89.js",revision:null},{url:"assets/web-CuK-yjoA.js",revision:null},{url:"assets/web-legacy-DilKbWdI.js",revision:null},{url:"cusis/index.html",revision:"952c8fe16116579bed0bfda766c83fef"},{url:"cusis/script.js",revision:"9fa7745f2ae169ec9a0233be1926b672"},{url:"cusis/style.css",revision:"5d6ae4b982a6f1c3d11b5109e1adf47a"},{url:"downloadApp/index.html",revision:"9ee973431f03ae8c7f9e6284c1b77f1e"},{url:"index.html",revision:"c642ca02df647a4541f9fb024acb1d97"},{url:"pages/privacy/index.html",revision:"a0f37f3af23a2f57092ed9f0a183266b"},{url:"pages/Special-Thanks/index.html",revision:"07a7a5c53a3aa1be8252c58340215d0f"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"93ee991e3cd5a336a28dd7bb798a0358"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
