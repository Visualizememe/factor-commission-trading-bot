(this.webpackJsonpv1=this.webpackJsonpv1||[]).push([[0],{47:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return r}));var a="SESSION_LOGIN",o="SESSION_LOGOUT",r=function(e){return function(t){return t({type:a,authToken:e})}}},55:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return o}));var a={authToken:null,userData:null},o="pk_test_51ILBKjE3PATAwyWiEHcP5b6MV18yAuonQBNENrjEtI8mTqA8afj2M3axECzfHgrUcF8gh0sBbpBLHfaMXDaQVgbn00QWBJ5JeN"},75:function(e,t,n){e.exports=n(94)},93:function(e,t,n){},94:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(11),c=n(42),i=n(41),l=n(44),u=n(6),s=n(120),b=Object(s.a)((function(e){return{root:{backgroundColor:e.palette.primary.main,minHeight:"100vh",zIndex:1e4}}})),m=function(){var e=b();return o.a.createElement("div",{className:e.root})},f=n(16),d=Object(f.a)({}),g=n(62),O=n(63),h=n(67),p=n(66),j=n(35),E=n(68),v=n(4),k=n(122),S=n(123),w=n(124),N=n(125),y=n(39),x=n(64),B=n.n(x),C=n(127),I=Object(s.a)((function(e){return{root:{boxShadow:"none",backgroundColor:"#322d2d"},flexGrow:{flexGrow:1},signOutButton:{marginLeft:e.spacing(2)},title:{color:"white",textDecoration:"none"},logoLink:{textDecoration:"none",paddingLeft:"auto",paddingRight:"auto"},toolbar:{alignContent:"center",textAlign:"center"}}}));function L(e){var t=Object(i.b)(),n=e.className,r=(e.onSidebarOpen,Object(E.a)(e,["className","onSidebarOpen"])),l=I(),u=Object(C.a)(),s=Object(j.a)(u,3),b=(s[0],s[1],s[2]),m=Object(c.b)(),f=Object(a.useState)(!1),g=Object(j.a)(f,2),O=g[0],h=g[1];Object(a.useEffect)((function(){var e=t.getState();console.log(e),e.session.authToken?h(!0):h(!1)}),[]);return o.a.createElement(k.a,Object.assign({},r,{className:Object(v.a)(l.root,n)}),o.a.createElement(S.a,{className:l.toolbar},o.a.createElement(y.a,{to:"/",className:l.logoLink},o.a.createElement(w.a,{variant:"h4",display:"inline",align:"center",className:l.title},"TradingJEDI")),o.a.createElement("div",{className:l.flexGrow}),O?o.a.createElement(N.a,{className:l.signOutButton,color:"inherit",onClick:function(){b("session"),m.enqueueSnackbar("You're now logged out",{variant:"success",anchorOrigin:{horizontal:"center",vertical:"bottom"}}),d.push("/")}},o.a.createElement(B.a,null)):null))}var T=n(128),D=n(126),A=Object(s.a)((function(e){return{root:{minHeight:"100vh"}}})),G=function(e){var t=A(),n=Object(a.useState)(!1),r=Object(j.a)(n,2),c=r[0],i=r[1];return Object(a.useEffect)((function(){setTimeout((function(){return i(!0)}),e.duration||1e3)})),o.a.createElement("div",{className:t.root},c&&o.a.createElement(T.a,{implementation:"js"},o.a.createElement(D.a,{style:{height:4,color:"#cf1717",backgroundColor:"#008eff"}})))},H=[{path:"/",component:function(e){Object(h.a)(n,e);var t=Object(p.a)(n);function n(e){var a;return Object(g.a)(this,n),(a=t.call(this,e)).onSideBarOpen=function(){},a}return Object(O.a)(n,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(L,{onSidebarOpen:this.onSideBarOpen}),o.a.createElement(a.Suspense,{fallback:o.a.createElement(G,null)},Object(l.a)(this.props.route.routes)))}}]),n}(o.a.Component),routes:[{path:"/",exact:!0,component:Object(a.lazy)((function(){return Promise.all([n.e(2),n.e(4)]).then(n.bind(null,431))}))},{path:"*",component:function(){return o.a.createElement(u.a,{to:"/"})}}]}],J=n(24),z=n(65),W=n(30),_=n(47),M=n(55),P=Object(J.c)({session:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M.b,t=arguments.length>1?arguments[1]:void 0;switch(console.log("REDUCER:",t.type,t),t.type){case _.a:return console.log("logging in"),console.log(e,t.session),console.log(Object(W.a)(Object(W.a)({},e),t.session)),Object(W.a)({},e);case _.b:return Object(W.a)(Object(W.a)({},e),t.session);default:return e}}});var Q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=[z.a],n=J.a.apply(void 0,t),a=[n],o=J.d.apply(void 0,a);return Object(J.e)(P,e,o)}();function R(e){return a.createElement(i.a,{store:Q},a.createElement(c.a,{maxSnack:5},a.createElement(u.c,{history:d},a.createElement(a.Suspense,{fallback:a.createElement(m,null)},Object(l.a)(H)))))}n(93),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.render(a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[75,1,3]]]);
//# sourceMappingURL=main.3615149f.chunk.js.map