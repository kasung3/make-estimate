(() => {
var exports = {};
exports.id = "app/page";
exports.ids = ["app/page"];
exports.modules = {

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fpage&page=%2Fpage&appPaths=%2Fpage&pagePath=private-next-app-dir%2Fpage.tsx&appDir=%2Fhome%2Fubuntu%2Fmake_estimate%2Fnextjs_space%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Fmake_estimate%2Fnextjs_space&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fpage&page=%2Fpage&appPaths=%2Fpage&pagePath=private-next-app-dir%2Fpage.tsx&appDir=%2Fhome%2Fubuntu%2Fmake_estimate%2Fnextjs_space%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Fmake_estimate%2Fnextjs_space&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalError: () => (/* reexport default from dynamic */ next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default.a),
/* harmony export */   __next_app__: () => (/* binding */ __next_app__),
/* harmony export */   originalPathname: () => (/* binding */ originalPathname),
/* harmony export */   pages: () => (/* binding */ pages),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   tree: () => (/* binding */ tree)
/* harmony export */ });
/* harmony import */ var next_dist_server_future_route_modules_app_page_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-page/module.compiled */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/module.compiled.js?0264");
/* harmony import */ var next_dist_server_future_route_modules_app_page_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_page_module_compiled__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-kind.js");
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/client/components/error-boundary */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/error-boundary.js");
/* harmony import */ var next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_components_error_boundary__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/server/app-render/entry-base */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/app-render/entry-base.js");
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__) if(["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
"TURBOPACK { transition: next-ssr }";


// We inject the tree and pages here so that we can use them in the route
// module.
const tree = {
        children: [
        '',
        {
        children: ['__PAGE__', {}, {
          page: [() => Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(__webpack_require__, /*! ./app/page.tsx */ "(rsc)/./app/page.tsx")), "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx"],
          
        }]
      },
        {
        'layout': [() => Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(__webpack_require__, /*! ./app/layout.tsx */ "(rsc)/./app/layout.tsx")), "/home/ubuntu/make_estimate/nextjs_space/app/layout.tsx"],
'not-found': [() => Promise.resolve(/*! import() eager */).then(__webpack_require__.t.bind(__webpack_require__, /*! next/dist/client/components/not-found-error */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/not-found-error.js", 23)), "next/dist/client/components/not-found-error"],
        
      }
      ]
      }.children;
const pages = ["/home/ubuntu/make_estimate/nextjs_space/app/page.tsx"];


const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const originalPathname = "/page";
const __next_app__ = {
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__
};

// Create and export the route module that will be consumed.
const routeModule = new next_dist_server_future_route_modules_app_page_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppPageRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_PAGE,
        page: "/page",
        pathname: "/",
        // The following aren't used in production.
        bundlePath: "",
        filename: "",
        appPaths: []
    },
    userland: {
        loaderTree: tree
    }
});

//# sourceMappingURL=app-page.js.map

/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2Fhome%2Fubuntu%2Fmake_estimate%2Fnextjs_space%2Fapp%2Fpage.tsx%22%2C%22ids%22%3A%5B%5D%7D&server=true!":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2Fhome%2Fubuntu%2Fmake_estimate%2Fnextjs_space%2Fapp%2Fpage.tsx%22%2C%22ids%22%3A%5B%5D%7D&server=true! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(__webpack_require__, /*! ./app/page.tsx */ "(ssr)/./app/page.tsx"));


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2Fhome%2Fubuntu%2Fmake_estimate%2Fnextjs_space%2Fcomponents%2Fauth-provider.tsx%22%2C%22ids%22%3A%5B%22AuthProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22app%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Inter%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22inter%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fhome%2Fubuntu%2Fmake_estimate%2Fnextjs_space%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&server=true!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2Fhome%2Fubuntu%2Fmake_estimate%2Fnextjs_space%2Fcomponents%2Fauth-provider.tsx%22%2C%22ids%22%3A%5B%22AuthProvider%22%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Ffont%2Fgoogle%2Ftarget.css%3F%7B%5C%22path%5C%22%3A%5C%22app%2Flayout.tsx%5C%22%2C%5C%22import%5C%22%3A%5C%22Inter%5C%22%2C%5C%22arguments%5C%22%3A%5B%7B%5C%22subsets%5C%22%3A%5B%5C%22latin%5C%22%5D%7D%5D%2C%5C%22variableName%5C%22%3A%5C%22inter%5C%22%7D%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fhome%2Fubuntu%2Fmake_estimate%2Fnextjs_space%2Fapp%2Fglobals.css%22%2C%22ids%22%3A%5B%5D%7D&server=true! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(__webpack_require__, /*! ./components/auth-provider.tsx */ "(ssr)/./components/auth-provider.tsx"));


/***/ }),

/***/ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Fapp-router.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Fclient-page.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Ferror-boundary.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Flayout-router.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Fnot-found-boundary.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Frender-from-template-context.js%22%2C%22ids%22%3A%5B%5D%7D&server=true!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Fapp-router.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Fclient-page.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Ferror-boundary.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Flayout-router.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Fnot-found-boundary.js%22%2C%22ids%22%3A%5B%5D%7D&modules=%7B%22request%22%3A%22%2Fopt%2Fhostedapp%2Fnode%2Froot%2Fapp%2Fnode_modules%2Fnext%2Fdist%2Fclient%2Fcomponents%2Frender-from-template-context.js%22%2C%22ids%22%3A%5B%5D%7D&server=true! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/*! import() eager */).then(__webpack_require__.t.bind(__webpack_require__, /*! ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/app-router.js */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/app-router.js", 23));
;
Promise.resolve(/*! import() eager */).then(__webpack_require__.t.bind(__webpack_require__, /*! ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/client-page.js */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/client-page.js", 23));
;
Promise.resolve(/*! import() eager */).then(__webpack_require__.t.bind(__webpack_require__, /*! ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/error-boundary.js */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/error-boundary.js", 23));
;
Promise.resolve(/*! import() eager */).then(__webpack_require__.t.bind(__webpack_require__, /*! ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/layout-router.js */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/layout-router.js", 23));
;
Promise.resolve(/*! import() eager */).then(__webpack_require__.t.bind(__webpack_require__, /*! ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/not-found-boundary.js */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/not-found-boundary.js", 23));
;
Promise.resolve(/*! import() eager */).then(__webpack_require__.t.bind(__webpack_require__, /*! ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/render-from-template-context.js */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/client/components/render-from-template-context.js", 23));


/***/ }),

/***/ "(ssr)/./app/page.tsx":
/*!**********************!*\
  !*** ./app/page.tsx ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/api/link.js");
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/button */ "(ssr)/./components/ui/button.tsx");
/* harmony import */ var _components_marketing_navbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/marketing/navbar */ "(ssr)/./components/marketing/navbar.tsx");
/* harmony import */ var _components_marketing_footer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/marketing/footer */ "(ssr)/./components/marketing/footer.tsx");
/* harmony import */ var _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowRight,Building2,Calculator,CheckCircle2,ChevronDown,Download,FileCheck,FileText,Palette,Shield,Sparkles,Users,XCircle,Zap!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/zap.js");
/* harmony import */ var _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowRight,Building2,Calculator,CheckCircle2,ChevronDown,Download,FileCheck,FileText,Palette,Shield,Sparkles,Users,XCircle,Zap!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/file-check.js");
/* harmony import */ var _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowRight,Building2,Calculator,CheckCircle2,ChevronDown,Download,FileCheck,FileText,Palette,Shield,Sparkles,Users,XCircle,Zap!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/palette.js");
/* harmony import */ var _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowRight,Building2,Calculator,CheckCircle2,ChevronDown,Download,FileCheck,FileText,Palette,Shield,Sparkles,Users,XCircle,Zap!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/file-text.js");
/* harmony import */ var _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowRight,Building2,Calculator,CheckCircle2,ChevronDown,Download,FileCheck,FileText,Palette,Shield,Sparkles,Users,XCircle,Zap!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/users.js");
/* harmony import */ var _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowRight,Building2,Calculator,CheckCircle2,ChevronDown,Download,FileCheck,FileText,Palette,Shield,Sparkles,Users,XCircle,Zap!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/shield.js");
/* harmony import */ var _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowRight,Building2,Calculator,CheckCircle2,ChevronDown,Download,FileCheck,FileText,Palette,Shield,Sparkles,Users,XCircle,Zap!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/circle-x.js");
/* harmony import */ var _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowRight,Building2,Calculator,CheckCircle2,ChevronDown,Download,FileCheck,FileText,Palette,Shield,Sparkles,Users,XCircle,Zap!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/calculator.js");
/* harmony import */ var _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowRight,Building2,Calculator,CheckCircle2,ChevronDown,Download,FileCheck,FileText,Palette,Shield,Sparkles,Users,XCircle,Zap!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/download.js");
/* harmony import */ var _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowRight,Building2,Calculator,CheckCircle2,ChevronDown,Download,FileCheck,FileText,Palette,Shield,Sparkles,Users,XCircle,Zap!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/chevron-down.js");
/* harmony import */ var _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowRight,Building2,Calculator,CheckCircle2,ChevronDown,Download,FileCheck,FileText,Palette,Shield,Sparkles,Users,XCircle,Zap!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/sparkles.js");
/* harmony import */ var _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowRight,Building2,Calculator,CheckCircle2,ChevronDown,Download,FileCheck,FileText,Palette,Shield,Sparkles,Users,XCircle,Zap!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/arrow-right.js");
/* harmony import */ var _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowRight,Building2,Calculator,CheckCircle2,ChevronDown,Download,FileCheck,FileText,Palette,Shield,Sparkles,Users,XCircle,Zap!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/circle-check.js");
/* harmony import */ var _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowRight,Building2,Calculator,CheckCircle2,ChevronDown,Download,FileCheck,FileText,Palette,Shield,Sparkles,Users,XCircle,Zap!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/building-2.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/lib/utils */ "(ssr)/./lib/utils.ts");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! framer-motion */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/framer-motion/dist/es/utils/use-in-view.mjs");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! framer-motion */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/framer-motion/dist/es/render/dom/motion.mjs");
/* __next_internal_client_entry_do_not_use__ default auto */ 









// ====== FEATURES DATA ======
const features = [
    {
        icon: _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_7__["default"],
        title: "Lightning-Fast BOQ Builder",
        description: "Create categories and items with instant totals. No formulas, no errors—just fast estimation that wins projects."
    },
    {
        icon: _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_8__["default"],
        title: "Professional PDF Export",
        description: "Generate clean, A4-formatted PDFs ready for clients. Cover pages and item details exported in seconds."
    },
    {
        icon: _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"],
        title: "Custom Templates & Themes",
        description: "Start projects faster with reusable templates. Customize colors for consistent, professional branding."
    },
    {
        icon: _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"],
        title: "Notes & Specifications",
        description: "Add detailed notes and specifications to any item. Keep all project details organized in one place."
    },
    {
        icon: _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_11__["default"],
        title: "Customer Management",
        description: "Track all your clients effortlessly. Quickly assign customers to new BOQs with one click."
    },
    {
        icon: _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_12__["default"],
        title: "Secure & Multi-tenant",
        description: "Your data is isolated and secure. Invite team members to collaborate on estimates together."
    }
];
// ====== PAIN POINTS / SOLUTIONS ======
const painPoints = [
    {
        pain: "Hours spent in Excel fixing formula errors",
        solution: "Automatic calculations with zero errors",
        icon: _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__["default"]
    },
    {
        pain: "Unprofessional quotes losing you contracts",
        solution: "Polished PDFs that impress clients",
        icon: _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__["default"]
    },
    {
        pain: "Starting from scratch on every project",
        solution: "Reusable templates save hours",
        icon: _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__["default"]
    }
];
// ====== HOW IT WORKS STEPS ======
const steps = [
    {
        step: "1",
        title: "Create Your BOQ",
        description: "Add categories and items with quantities and rates. Totals calculate automatically.",
        icon: _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_14__["default"]
    },
    {
        step: "2",
        title: "Customize & Brand",
        description: "Add your logo, customize cover pages, and apply your color theme.",
        icon: _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_9__["default"]
    },
    {
        step: "3",
        title: "Export Professional PDF",
        description: "Generate a polished A4 document ready to send to clients in seconds.",
        icon: _barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_15__["default"]
    }
];
// ====== FAQs ======
const faqs = [
    {
        question: "What is a Bill of Quantities (BOQ)?",
        answer: "A Bill of Quantities is a document used in construction that lists all materials, parts, and labor with their costs. It helps contractors provide accurate project estimates and win more bids."
    },
    {
        question: "Can I customize the PDF output?",
        answer: "Yes! You can customize cover pages with your logo, project details, and styling. Apply color themes to match your company branding across all exports."
    },
    {
        question: "Is my data secure?",
        answer: "Absolutely. Each company's data is completely isolated using row-level security. We use industry-standard encryption and security practices to protect your information."
    },
    {
        question: "Can I invite team members?",
        answer: "Yes, you can invite team members to your company workspace. Everyone shares access to BOQs, customers, and templates while maintaining data security."
    },
    {
        question: "Is there a free plan available?",
        answer: "Yes! Our Free Forever plan lets you create unlimited BOQs with up to 15 items each. Perfect for trying out MakeEstimate or for small projects."
    }
];
// ====== ANIMATED SECTION WRAPPER ======
function AnimatedSection({ children, className, delay = 0 }) {
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_5__.useRef)(null);
    const isInView = (0,framer_motion__WEBPACK_IMPORTED_MODULE_16__.useInView)(ref, {
        once: false,
        margin: "-100px"
    });
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_17__.motion.div, {
        ref: ref,
        initial: {
            opacity: 0,
            y: 40
        },
        animate: isInView ? {
            opacity: 1,
            y: 0
        } : {
            opacity: 0,
            y: 40
        },
        transition: {
            duration: 0.6,
            delay,
            ease: "easeOut"
        },
        className: className,
        children: children
    }, void 0, false, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
// ====== FAQ ACCORDION ITEM ======
function FAQItem({ question, answer }) {
    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)(false);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: "border-b border-purple-100",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                className: "w-full py-5 flex items-center justify-between text-left group",
                onClick: ()=>setOpen(!open),
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        className: "font-medium text-foreground group-hover:text-purple-600 transition-colors",
                        children: question
                    }, void 0, false, {
                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_18__["default"], {
                        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("h-5 w-5 text-purple-400 transition-transform duration-300", open && "rotate-180")
                    }, void 0, false, {
                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("overflow-hidden transition-all duration-300", open ? "max-h-40 pb-5" : "max-h-0"),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                    className: "text-muted-foreground",
                    children: answer
                }, void 0, false, {
                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                    lineNumber: 191,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
        lineNumber: 170,
        columnNumber: 5
    }, this);
}
// ====== MAIN HOME PAGE ======
function HomePage() {
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        className: "min-h-screen bg-background",
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_marketing_navbar__WEBPACK_IMPORTED_MODULE_3__.MarketingNavbar, {}, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("section", {
                className: "relative pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden gradient-hero",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "absolute inset-0 overflow-hidden pointer-events-none",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                className: "absolute -top-40 -right-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse-glow"
                            }, void 0, false, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                className: "absolute -bottom-40 -left-40 w-96 h-96 bg-lavender-200/30 rounded-full blur-3xl animate-pulse-glow",
                                style: {
                                    animationDelay: "1.5s"
                                }
                            }, void 0, false, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-glow opacity-50"
                            }, void 0, false, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "max-w-7xl mx-auto relative z-10",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                className: "text-center max-w-4xl mx-auto",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_17__.motion.div, {
                                        initial: {
                                            opacity: 0,
                                            y: 30
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            duration: 0.7
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_19__["default"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                        lineNumber: 223,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                        children: "Built for Construction Professionals"
                                                    }, void 0, false, {
                                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                        lineNumber: 224,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 222,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h1", {
                                                className: "text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight",
                                                children: [
                                                    "Win More Projects by",
                                                    " ",
                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                        className: "gradient-text",
                                                        children: "Creating BOQs Faster"
                                                    }, void 0, false, {
                                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                        lineNumber: 228,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 226,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                        lineNumber: 217,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_17__.motion.p, {
                                        className: "mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto",
                                        initial: {
                                            opacity: 0,
                                            y: 30
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            duration: 0.7,
                                            delay: 0.15
                                        },
                                        children: "Create professional Bills of Quantities in minutes—not hours. No Excel, no formulas, no errors. Just fast, clean estimates that help you win contracts."
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                        lineNumber: 232,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_17__.motion.div, {
                                        className: "mt-10 flex flex-col sm:flex-row items-center justify-center gap-4",
                                        initial: {
                                            opacity: 0,
                                            y: 30
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            duration: 0.7,
                                            delay: 0.3
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                                href: "/register",
                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                                    size: "lg",
                                                    className: "text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all",
                                                    children: [
                                                        "Start Free",
                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_20__["default"], {
                                                            className: "ml-2 h-5 w-5"
                                                        }, void 0, false, {
                                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                            lineNumber: 252,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                    lineNumber: 250,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 249,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                                href: "/pricing",
                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                                    variant: "outline",
                                                    size: "lg",
                                                    className: "text-base px-8 py-6",
                                                    children: "View Pricing"
                                                }, void 0, false, {
                                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 255,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_17__.motion.div, {
                                className: "mt-16 max-w-4xl mx-auto",
                                initial: {
                                    opacity: 0,
                                    y: 50
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.8,
                                    delay: 0.4
                                },
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                    className: "relative bg-white rounded-3xl shadow-xl border border-purple-100/50 p-4 sm:p-6",
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                        className: "aspect-video bg-gradient-to-br from-purple-50 to-lavender-50 rounded-2xl flex items-center justify-center",
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                            className: "text-center p-8",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                    className: "w-20 h-20 bg-gradient-to-br from-purple-500 to-lavender-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg",
                                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_10__["default"], {
                                                        className: "w-10 h-10 text-white"
                                                    }, void 0, false, {
                                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                        lineNumber: 274,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                                    className: "mt-4 text-muted-foreground font-medium",
                                                    children: "Your Professional BOQ Dashboard"
                                                }, void 0, false, {
                                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                    lineNumber: 276,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                    className: "mt-6 flex justify-center gap-3 flex-wrap",
                                                    children: [
                                                        "Categories",
                                                        "Items",
                                                        "Totals",
                                                        "PDF Export"
                                                    ].map((label, i)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_6__.cn)("px-4 py-2 rounded-xl text-sm font-medium", i === 0 && "bg-purple-100 text-purple-700", i === 1 && "bg-lavender-100 text-lavender-600", i === 2 && "bg-emerald-100 text-emerald-700", i === 3 && "bg-blue-100 text-blue-700"),
                                                            children: label
                                                        }, label, false, {
                                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                            lineNumber: 272,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                        lineNumber: 271,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 270,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                lineNumber: 264,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("section", {
                className: "py-12 px-4 sm:px-6 lg:px-8 bg-white border-y border-purple-100/50",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    className: "max-w-4xl mx-auto text-center",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                            className: "text-lg font-medium text-muted-foreground",
                            children: [
                                "Built for",
                                " ",
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                    className: "text-purple-600",
                                    children: "Quantity Surveyors"
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 305,
                                    columnNumber: 13
                                }, this),
                                ",",
                                " ",
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                    className: "text-lavender-600",
                                    children: "Contractors"
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 306,
                                    columnNumber: 13
                                }, this),
                                ", and",
                                " ",
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                    className: "text-purple-600",
                                    children: "Project Managers"
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                            lineNumber: 303,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                            className: "mt-8 flex flex-wrap justify-center gap-4",
                            children: [
                                "Fast Setup",
                                "No Excel Needed",
                                "Cloud-Based",
                                "Secure Data"
                            ].map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                    className: "flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-xl",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__["default"], {
                                            className: "w-4 h-4 text-purple-500"
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                            lineNumber: 315,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                            className: "text-sm font-medium text-purple-700",
                                            children: item
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                            lineNumber: 316,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item, true, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 311,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                            lineNumber: 309,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                    lineNumber: 302,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                lineNumber: 301,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("section", {
                className: "py-24 px-4 sm:px-6 lg:px-8 bg-background",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    className: "max-w-6xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AnimatedSection, {
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h2", {
                                    className: "text-3xl sm:text-4xl font-bold text-foreground",
                                    children: [
                                        "Stop Wasting Time on",
                                        " ",
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                            className: "gradient-text",
                                            children: "Broken Spreadsheets"
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                            lineNumber: 329,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 327,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                    className: "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto",
                                    children: "Traditional methods are costing you projects. MakeEstimate solves the problems that hold back construction professionals."
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 331,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                            lineNumber: 326,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                            className: "grid md:grid-cols-3 gap-8",
                            children: painPoints.map((item, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AnimatedSection, {
                                    delay: index * 0.1,
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                        className: "bg-white rounded-2xl border border-purple-100/50 p-6 shadow-card hover:shadow-card-hover transition-all duration-200",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                className: "flex items-start gap-3 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                        className: "w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0",
                                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_13__["default"], {
                                                            className: "w-4 h-4 text-red-500"
                                                        }, void 0, false, {
                                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                            lineNumber: 343,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                        lineNumber: 342,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                                        className: "text-red-600 font-medium text-sm line-through decoration-red-300",
                                                        children: item.pain
                                                    }, void 0, false, {
                                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                        lineNumber: 345,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 341,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                className: "flex items-start gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                        className: "w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0",
                                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_21__["default"], {
                                                            className: "w-4 h-4 text-emerald-500"
                                                        }, void 0, false, {
                                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                            lineNumber: 351,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                        lineNumber: 350,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                                        className: "text-emerald-700 font-medium text-sm",
                                                        children: item.solution
                                                    }, void 0, false, {
                                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                        lineNumber: 353,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 349,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                        lineNumber: 340,
                                        columnNumber: 17
                                    }, this)
                                }, index, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 339,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                            lineNumber: 337,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                    lineNumber: 325,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                lineNumber: 324,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("section", {
                id: "features",
                className: "py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50/50 to-background",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AnimatedSection, {
                            className: "text-center max-w-3xl mx-auto mb-16",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h2", {
                                    className: "text-3xl sm:text-4xl font-bold text-foreground",
                                    children: [
                                        "Everything You Need for",
                                        " ",
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                            className: "gradient-text",
                                            children: "Professional Estimates"
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                            lineNumber: 373,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 371,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                    className: "mt-4 text-lg text-muted-foreground",
                                    children: "Powerful features designed specifically for construction professionals who want to create better estimates, faster."
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 375,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                            lineNumber: 370,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                            children: features.map((feature, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AnimatedSection, {
                                    delay: index * 0.1,
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                        className: "p-6 bg-white rounded-2xl border border-purple-100/50 shadow-card hover:shadow-card-hover transition-all duration-200 h-full",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                className: "w-12 h-12 bg-gradient-to-br from-purple-100 to-lavender-100 rounded-xl flex items-center justify-center",
                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(feature.icon, {
                                                    className: "w-6 h-6 text-purple-600"
                                                }, void 0, false, {
                                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                    lineNumber: 386,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 385,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h3", {
                                                className: "mt-4 text-lg font-semibold text-foreground",
                                                children: feature.title
                                            }, void 0, false, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 388,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                                className: "mt-2 text-muted-foreground",
                                                children: feature.description
                                            }, void 0, false, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 391,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                        lineNumber: 384,
                                        columnNumber: 17
                                    }, this)
                                }, feature.title, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 383,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                            lineNumber: 381,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                    lineNumber: 369,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                lineNumber: 365,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("section", {
                className: "py-24 px-4 sm:px-6 lg:px-8 bg-white",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    className: "max-w-5xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AnimatedSection, {
                            className: "text-center mb-16",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h2", {
                                    className: "text-3xl sm:text-4xl font-bold text-foreground",
                                    children: [
                                        "Get Started in",
                                        " ",
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                            className: "gradient-text",
                                            children: "3 Simple Steps"
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                            lineNumber: 405,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 403,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                    className: "mt-4 text-lg text-muted-foreground",
                                    children: "From empty document to professional PDF in minutes, not hours."
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 407,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                            lineNumber: 402,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                            className: "grid md:grid-cols-3 gap-8",
                            children: steps.map((step, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AnimatedSection, {
                                    delay: index * 0.15,
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                        className: "relative text-center",
                                        children: [
                                            index < steps.length - 1 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                className: "hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-200 to-lavender-200"
                                            }, void 0, false, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 418,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                className: "relative z-10",
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                        className: "w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-lavender-500 rounded-2xl flex items-center justify-center shadow-lg",
                                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(step.icon, {
                                                            className: "w-10 h-10 text-white"
                                                        }, void 0, false, {
                                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                            lineNumber: 422,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                        lineNumber: 421,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                        className: "mt-1 -translate-y-3",
                                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                            className: "inline-flex items-center justify-center w-8 h-8 bg-white border-2 border-purple-200 rounded-full text-purple-600 font-bold text-sm shadow-sm",
                                                            children: step.step
                                                        }, void 0, false, {
                                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                            lineNumber: 425,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                        lineNumber: 424,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 420,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h3", {
                                                className: "mt-2 text-xl font-semibold text-foreground",
                                                children: step.title
                                            }, void 0, false, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 430,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                                className: "mt-2 text-muted-foreground",
                                                children: step.description
                                            }, void 0, false, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 433,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                        lineNumber: 415,
                                        columnNumber: 17
                                    }, this)
                                }, step.title, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 414,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                            lineNumber: 412,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                    lineNumber: 401,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                lineNumber: 400,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("section", {
                className: "py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 to-lavender-600",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    className: "max-w-4xl mx-auto text-center",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AnimatedSection, {
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h2", {
                                className: "text-3xl sm:text-4xl font-bold text-white",
                                children: "Simple, Transparent Pricing"
                            }, void 0, false, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                lineNumber: 445,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                className: "mt-4 text-lg text-purple-100",
                                children: "Start free and upgrade as you grow. No hidden fees, no surprises."
                            }, void 0, false, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                lineNumber: 448,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                className: "mt-8 flex flex-col sm:flex-row items-center justify-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                        className: "bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 text-white",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                className: "text-3xl font-bold",
                                                children: "$0"
                                            }, void 0, false, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 453,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                className: "text-purple-100",
                                                children: "Free Forever Plan"
                                            }, void 0, false, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 454,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                        lineNumber: 452,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                        className: "text-white text-2xl hidden sm:block",
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                        lineNumber: 456,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                        className: "bg-white rounded-2xl px-8 py-4 text-purple-700 shadow-lg",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                className: "text-3xl font-bold",
                                                children: "From $19"
                                            }, void 0, false, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 458,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                className: "text-purple-500",
                                                children: "Pro Plans"
                                            }, void 0, false, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 459,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                        lineNumber: 457,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                lineNumber: 451,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                className: "mt-8",
                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                    href: "/pricing",
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                        size: "lg",
                                        className: "bg-white text-purple-600 hover:bg-purple-50 px-8 py-6 text-base shadow-lg",
                                        children: [
                                            "View All Plans",
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_20__["default"], {
                                                className: "ml-2 h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 469,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                        lineNumber: 464,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 463,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                lineNumber: 462,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                        lineNumber: 444,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                    lineNumber: 443,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                lineNumber: 442,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("section", {
                className: "py-24 px-4 sm:px-6 lg:px-8 bg-background",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    className: "max-w-3xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AnimatedSection, {
                            className: "text-center mb-12",
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h2", {
                                className: "text-3xl sm:text-4xl font-bold text-foreground",
                                children: [
                                    "Frequently Asked",
                                    " ",
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                        className: "gradient-text",
                                        children: "Questions"
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                        lineNumber: 483,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                lineNumber: 481,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                            lineNumber: 480,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AnimatedSection, {
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                className: "bg-white rounded-2xl border border-purple-100/50 p-6 sm:p-8 shadow-card",
                                children: faqs.map((faq)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(FAQItem, {
                                        question: faq.question,
                                        answer: faq.answer
                                    }, faq.question, false, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                        lineNumber: 490,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                lineNumber: 488,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                            lineNumber: 487,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                    lineNumber: 479,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                lineNumber: 478,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("section", {
                className: "py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-50 to-background",
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    className: "max-w-4xl mx-auto text-center",
                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AnimatedSection, {
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                            className: "bg-white rounded-3xl border border-purple-100/50 p-8 sm:p-12 shadow-xl",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                    className: "w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-lavender-500 rounded-2xl flex items-center justify-center shadow-lg",
                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_22__["default"], {
                                        className: "w-8 h-8 text-white"
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                        lineNumber: 503,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 502,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h2", {
                                    className: "mt-6 text-3xl sm:text-4xl font-bold text-foreground",
                                    children: "Ready to Win More Projects?"
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 505,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                    className: "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto",
                                    children: "Join hundreds of construction professionals who save hours every week with MakeEstimate. Start creating professional BOQs today—completely free."
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 508,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                    className: "mt-8 flex flex-col sm:flex-row items-center justify-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                            href: "/register",
                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                                size: "lg",
                                                className: "px-8 py-6 text-base shadow-lg",
                                                children: [
                                                    "Get Started Free",
                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowRight_Building2_Calculator_CheckCircle2_ChevronDown_Download_FileCheck_FileText_Palette_Shield_Sparkles_Users_XCircle_Zap_lucide_react__WEBPACK_IMPORTED_MODULE_20__["default"], {
                                                        className: "ml-2 h-5 w-5"
                                                    }, void 0, false, {
                                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                        lineNumber: 517,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 515,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                            lineNumber: 514,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                            href: "/pricing",
                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                                variant: "outline",
                                                size: "lg",
                                                className: "px-8 py-6 text-base",
                                                children: "Compare Plans"
                                            }, void 0, false, {
                                                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                                lineNumber: 521,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                            lineNumber: 520,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 513,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                    className: "mt-6 text-sm text-muted-foreground",
                                    children: "No credit card required • Free forever plan available"
                                }, void 0, false, {
                                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                                    lineNumber: 526,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                            lineNumber: 501,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                        lineNumber: 500,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                    lineNumber: 499,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                lineNumber: 498,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_marketing_footer__WEBPACK_IMPORTED_MODULE_4__.MarketingFooter, {}, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
                lineNumber: 534,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/page.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}


/***/ }),

/***/ "(ssr)/./components/auth-provider.tsx":
/*!**************************************!*\
  !*** ./components/auth-provider.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/react/index.js");
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-toast */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/react-hot-toast/dist/index.mjs");
/* __next_internal_client_entry_do_not_use__ AuthProvider auto */ 


function AuthProvider({ children }) {
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_auth_react__WEBPACK_IMPORTED_MODULE_1__.SessionProvider, {
        children: [
            children,
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_hot_toast__WEBPACK_IMPORTED_MODULE_2__.Toaster, {
                position: "top-right"
            }, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/components/auth-provider.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/auth-provider.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}


/***/ }),

/***/ "(ssr)/./components/marketing/footer.tsx":
/*!*****************************************!*\
  !*** ./components/marketing/footer.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarketingFooter: () => (/* binding */ MarketingFooter)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/api/link.js");
/* harmony import */ var _barrel_optimize_names_FileText_lucide_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=FileText!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/file-text.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* __next_internal_client_entry_do_not_use__ MarketingFooter auto */ 



function MarketingFooter() {
    const [year, setYear] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(2026);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        setYear(new Date().getFullYear());
    }, []);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("footer", {
        className: "bg-gradient-to-b from-white to-purple-50/50 border-t border-purple-100/50",
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                className: "flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0",
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "flex flex-col items-center md:items-start space-y-3",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                href: "/",
                                className: "flex items-center space-x-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                        className: "w-8 h-8 bg-gradient-to-br from-purple-500 to-lavender-500 rounded-lg flex items-center justify-center shadow-sm",
                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FileText_lucide_react__WEBPACK_IMPORTED_MODULE_3__["default"], {
                                            className: "w-4 h-4 text-white"
                                        }, void 0, false, {
                                            fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/footer.tsx",
                                            lineNumber: 22,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/footer.tsx",
                                        lineNumber: 21,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                        className: "text-base font-bold gradient-text",
                                        children: "MakeEstimate"
                                    }, void 0, false, {
                                        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/footer.tsx",
                                        lineNumber: 24,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/footer.tsx",
                                lineNumber: 20,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("p", {
                                className: "text-sm text-muted-foreground",
                                children: [
                                    "\xa9 ",
                                    year,
                                    " MakeEstimate. All rights reserved."
                                ]
                            }, void 0, true, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/footer.tsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/footer.tsx",
                        lineNumber: 19,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        className: "flex items-center space-x-8",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                href: "/pricing",
                                className: "text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200",
                                children: "Pricing"
                            }, void 0, false, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/footer.tsx",
                                lineNumber: 35,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                href: "/login",
                                className: "text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200",
                                children: "Login"
                            }, void 0, false, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/footer.tsx",
                                lineNumber: 41,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                href: "/register",
                                className: "text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200",
                                children: "Register"
                            }, void 0, false, {
                                fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/footer.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/footer.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/footer.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/footer.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/components/marketing/footer.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}


/***/ }),

/***/ "(ssr)/./components/marketing/navbar.tsx":
/*!*****************************************!*\
  !*** ./components/marketing/navbar.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarketingNavbar: () => (/* binding */ MarketingNavbar)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/api/link.js");
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next-auth/react/index.js");
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/button */ "(ssr)/./components/ui/button.tsx");
/* harmony import */ var _barrel_optimize_names_FileText_Menu_X_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=FileText,Menu,X!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/file-text.js");
/* harmony import */ var _barrel_optimize_names_FileText_Menu_X_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=FileText,Menu,X!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/x.js");
/* harmony import */ var _barrel_optimize_names_FileText_Menu_X_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! __barrel_optimize__?names=FileText,Menu,X!=!lucide-react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/lucide-react/dist/esm/icons/menu.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/utils */ "(ssr)/./lib/utils.ts");
/* __next_internal_client_entry_do_not_use__ MarketingNavbar auto */ 






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


/***/ }),

/***/ "(ssr)/./components/ui/button.tsx":
/*!**********************************!*\
  !*** ./components/ui/button.tsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: () => (/* binding */ Button),
/* harmony export */   buttonVariants: () => (/* binding */ buttonVariants)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-slot */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/@radix-ui/react-slot/dist/index.mjs");
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! class-variance-authority */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/class-variance-authority/dist/index.mjs");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/utils */ "(ssr)/./lib/utils.ts");





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
const Button = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(({ className, variant, size, asChild = false, ...props }, ref)=>{
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
Button.displayName = "Button";



/***/ }),

/***/ "(ssr)/./lib/utils.ts":
/*!**********************!*\
  !*** ./lib/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cn: () => (/* binding */ cn),
/* harmony export */   formatDuration: () => (/* binding */ formatDuration)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var tailwind_merge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tailwind-merge */ "(ssr)/../../../../opt/hostedapp/node/root/app/node_modules/tailwind-merge/dist/bundle-mjs.mjs");


function cn(...inputs) {
    return (0,tailwind_merge__WEBPACK_IMPORTED_MODULE_1__.twMerge)((0,clsx__WEBPACK_IMPORTED_MODULE_0__.clsx)(inputs));
}
function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}


/***/ }),

/***/ "(rsc)/./app/globals.css":
/*!*************************!*\
  !*** ./app/globals.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("1fb705580c00");
if (false) {}


/***/ }),

/***/ "(rsc)/./app/layout.tsx":
/*!************************!*\
  !*** ./app/layout.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RootLayout),
/* harmony export */   dynamic: () => (/* binding */ dynamic),
/* harmony export */   metadata: () => (/* binding */ metadata)
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_font_google_target_css_path_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/font/google/target.css?{"path":"app/layout.tsx","import":"Inter","arguments":[{"subsets":["latin"]}],"variableName":"inter"} */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/font/google/target.css?{\"path\":\"app/layout.tsx\",\"import\":\"Inter\",\"arguments\":[{\"subsets\":[\"latin\"]}],\"variableName\":\"inter\"}");
/* harmony import */ var next_font_google_target_css_path_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_font_google_target_css_path_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals.css */ "(rsc)/./app/globals.css");
/* harmony import */ var _components_auth_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/auth-provider */ "(rsc)/./components/auth-provider.tsx");




const dynamic = "force-dynamic";
const metadata = {
    title: "MakeEstimate — Fast BOQs, Professional PDFs",
    description: "Create professional Bills of Quantities in minutes. No Excel, no spreadsheets — just fast estimation with clean PDF exports.",
    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.svg"
    },
    openGraph: {
        title: "MakeEstimate — Fast BOQs, Professional PDFs",
        description: "Create professional Bills of Quantities in minutes. No Excel, no spreadsheets — just fast estimation with clean PDF exports.",
        images: [
            "/og-image.png"
        ]
    },
    metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000")
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("html", {
        lang: "en",
        suppressHydrationWarning: true,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("head", {
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("script", {
                    src: "https://apps.abacus.ai/chatllm/appllm-lib.js"
                }, void 0, false, {
                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/layout.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/layout.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("body", {
                className: (next_font_google_target_css_path_app_layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter___WEBPACK_IMPORTED_MODULE_3___default().className),
                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_auth_provider__WEBPACK_IMPORTED_MODULE_2__.AuthProvider, {
                    children: children
                }, void 0, false, {
                    fileName: "/home/ubuntu/make_estimate/nextjs_space/app/layout.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "/home/ubuntu/make_estimate/nextjs_space/app/layout.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "/home/ubuntu/make_estimate/nextjs_space/app/layout.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}


/***/ }),

/***/ "(rsc)/./app/page.tsx":
/*!**********************!*\
  !*** ./app/page.tsx ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/build/webpack/loaders/next-flight-loader/module-proxy */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/home/ubuntu/make_estimate/nextjs_space/app/page.tsx#default`));


/***/ }),

/***/ "(rsc)/./components/auth-provider.tsx":
/*!**************************************!*\
  !*** ./components/auth-provider.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthProvider: () => (/* binding */ e0)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/build/webpack/loaders/next-flight-loader/module-proxy */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js");


const e0 = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/home/ubuntu/make_estimate/nextjs_space/components/auth-provider.tsx#AuthProvider`);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/@radix-ui","vendor-chunks/tailwind-merge","vendor-chunks/lucide-react","vendor-chunks/react-hot-toast","vendor-chunks/class-variance-authority","vendor-chunks/goober","vendor-chunks/@swc","vendor-chunks/clsx","vendor-chunks/framer-motion"], () => (__webpack_exec__("(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fpage&page=%2Fpage&appPaths=%2Fpage&pagePath=private-next-app-dir%2Fpage.tsx&appDir=%2Fhome%2Fubuntu%2Fmake_estimate%2Fnextjs_space%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Fmake_estimate%2Fnextjs_space&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();