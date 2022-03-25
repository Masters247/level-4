"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "graphql-request":
/*!**********************************!*\
  !*** external "graphql-request" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("graphql-request");

/***/ }),

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/credentials":
/*!**************************************************!*\
  !*** external "next-auth/providers/credentials" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ "(api)/./lib/graph-ql.ts":
/*!*************************!*\
  !*** ./lib/graph-ql.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var graphql_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql-request */ \"graphql-request\");\n/* harmony import */ var graphql_request__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql_request__WEBPACK_IMPORTED_MODULE_0__);\n\nconst graphcms = new graphql_request__WEBPACK_IMPORTED_MODULE_0__.GraphQLClient(`${process.env.GRAPHCMS_URL}`, {\n    headers: {\n        authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (graphcms);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvZ3JhcGgtcWwudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQStDO0FBRS9DLEtBQUssQ0FBQ0MsUUFBUSxHQUFHLEdBQUcsQ0FBQ0QsMERBQWEsSUFBSUUsT0FBTyxDQUFDQyxHQUFHLENBQUNDLFlBQVksSUFBSSxDQUFDO0lBQ2pFQyxPQUFPLEVBQUUsQ0FBQztRQUNSQyxhQUFhLEdBQUcsT0FBTyxFQUFFSixPQUFPLENBQUNDLEdBQUcsQ0FBQ0ksY0FBYztJQUNyRCxDQUFDO0FBQ0gsQ0FBQztBQUVELGlFQUFlTixRQUFRLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sZXZlbDQvLi9saWIvZ3JhcGgtcWwudHM/YWZmNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHcmFwaFFMQ2xpZW50IH0gZnJvbSBcImdyYXBocWwtcmVxdWVzdFwiO1xuXG5jb25zdCBncmFwaGNtcyA9IG5ldyBHcmFwaFFMQ2xpZW50KGAke3Byb2Nlc3MuZW52LkdSQVBIQ01TX1VSTH1gLCB7XG4gIGhlYWRlcnM6IHtcbiAgICBhdXRob3JpemF0aW9uOiBgQmVhcmVyICR7cHJvY2Vzcy5lbnYuR1JBUEhDTVNfVE9LRU59YCxcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBncmFwaGNtcztcbiJdLCJuYW1lcyI6WyJHcmFwaFFMQ2xpZW50IiwiZ3JhcGhjbXMiLCJwcm9jZXNzIiwiZW52IiwiR1JBUEhDTVNfVVJMIiwiaGVhZGVycyIsImF1dGhvcml6YXRpb24iLCJHUkFQSENNU19UT0tFTiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./lib/graph-ql.ts\n");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].ts":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_graph_ql__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/graph-ql */ \"(api)/./lib/graph-ql.ts\");\n/* harmony import */ var graphql_request__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! graphql-request */ \"graphql-request\");\n/* harmony import */ var graphql_request__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(graphql_request__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst GetUserByEmail = graphql_request__WEBPACK_IMPORTED_MODULE_4__.gql`\n  query GetUserByEmail($email: String!) {\n    nextUser(where: { email: $email }, stage: DRAFT) {\n      id\n      email\n    }\n  }\n`;\nconst CreateNextUserByEmail = graphql_request__WEBPACK_IMPORTED_MODULE_4__.gql`\n  mutation CreateNextUserByEmail($email: String!, $password: String!) {\n    createNextUser(data: { email: $email, password: $password }) {\n      id\n      email\n    }\n  }\n`;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    providers: [\n        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default()({\n            name: \"Email and Password\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\",\n                    placeholder: \"jamie@graphcms.com\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\",\n                    placeholder: \"Password\"\n                }\n            },\n            authorize: async ({ email , password  })=>{\n                const { user  } = await _lib_graph_ql__WEBPACK_IMPORTED_MODULE_3__[\"default\"].request(GetUserByEmail, {\n                    email\n                });\n                console.log(\"user\", user);\n                if (!user) {\n                    const { newUser  } = await _lib_graph_ql__WEBPACK_IMPORTED_MODULE_3__[\"default\"].request(CreateNextUserByEmail, {\n                        email,\n                        password: await (0,bcrypt__WEBPACK_IMPORTED_MODULE_2__.hash)(password, 12)\n                    });\n                    return {\n                        id: newUser.id,\n                        username: email,\n                        email\n                    };\n                }\n                const isValid = await (0,bcrypt__WEBPACK_IMPORTED_MODULE_2__.compare)(password, user.password);\n                if (!isValid) {\n                    throw new Error(\"Wrong credentials. Try again.\");\n                }\n                return {\n                    id: user.id,\n                    username: email,\n                    email\n                };\n            }\n        }), \n    ],\n    secret: process.env.NEXTAUTH_SECRET\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBZ0M7QUFFaUM7QUFDM0I7QUFFTTtBQUNQO0FBRXJDLEtBQUssQ0FBQ00sY0FBYyxHQUFHRCxnREFBRyxDQUFDOzs7Ozs7O0FBTzNCO0FBRUEsS0FBSyxDQUFDRSxxQkFBcUIsR0FBR0YsZ0RBQUcsQ0FBQzs7Ozs7OztBQU9sQztBQUVBLGlFQUFlTCxnREFBUSxDQUFDLENBQUM7SUFDdkJRLFNBQVMsRUFBRSxDQUFDO1FBQ1ZQLHNFQUFtQixDQUFDLENBQUM7WUFDbkJRLElBQUksRUFBRSxDQUFvQjtZQUMxQkMsV0FBVyxFQUFFLENBQUM7Z0JBQ1pDLEtBQUssRUFBRSxDQUFDO29CQUNOQyxLQUFLLEVBQUUsQ0FBTztvQkFDZEMsSUFBSSxFQUFFLENBQU87b0JBQ2JDLFdBQVcsRUFBRSxDQUFvQjtnQkFDbkMsQ0FBQztnQkFDREMsUUFBUSxFQUFFLENBQUM7b0JBQ1RILEtBQUssRUFBRSxDQUFVO29CQUNqQkMsSUFBSSxFQUFFLENBQVU7b0JBQ2hCQyxXQUFXLEVBQUUsQ0FBVTtnQkFDekIsQ0FBQztZQUNILENBQUM7WUFDREUsU0FBUyxTQUFTLENBQUMsQ0FBQ0wsS0FBSyxHQUFFSSxRQUFRLEVBQU0sQ0FBQyxHQUFLLENBQUM7Z0JBQzlDLEtBQUssQ0FBQyxDQUFDLENBQUNFLElBQUksRUFBQyxDQUFDLEdBQUcsS0FBSyxDQUFDYiw2REFBZ0IsQ0FBQ0UsY0FBYyxFQUFFLENBQUM7b0JBQ3ZESyxLQUFLO2dCQUNQLENBQUM7Z0JBRURRLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLENBQU0sT0FBRUgsSUFBSTtnQkFFeEIsRUFBRSxHQUFHQSxJQUFJLEVBQUUsQ0FBQztvQkFDVixLQUFLLENBQUMsQ0FBQyxDQUFDSSxPQUFPLEVBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQ2pCLDZEQUFnQixDQUFDRyxxQkFBcUIsRUFBRSxDQUFDO3dCQUNqRUksS0FBSzt3QkFDTEksUUFBUSxFQUFFLEtBQUssQ0FBQ1osNENBQUksQ0FBQ1ksUUFBUSxFQUFFLEVBQUU7b0JBQ25DLENBQUM7b0JBRUQsTUFBTSxDQUFDLENBQUM7d0JBQ05PLEVBQUUsRUFBRUQsT0FBTyxDQUFDQyxFQUFFO3dCQUNkQyxRQUFRLEVBQUVaLEtBQUs7d0JBQ2ZBLEtBQUs7b0JBQ1AsQ0FBQztnQkFDSCxDQUFDO2dCQUVELEtBQUssQ0FBQ2EsT0FBTyxHQUFHLEtBQUssQ0FBQ3RCLCtDQUFPLENBQUNhLFFBQVEsRUFBRUUsSUFBSSxDQUFDRixRQUFRO2dCQUVyRCxFQUFFLEdBQUdTLE9BQU8sRUFBRSxDQUFDO29CQUNiLEtBQUssQ0FBQyxHQUFHLENBQUNDLEtBQUssQ0FBQyxDQUErQjtnQkFDakQsQ0FBQztnQkFFRCxNQUFNLENBQUMsQ0FBQztvQkFDTkgsRUFBRSxFQUFFTCxJQUFJLENBQUNLLEVBQUU7b0JBQ1hDLFFBQVEsRUFBRVosS0FBSztvQkFDZkEsS0FBSztnQkFDUCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0RlLE1BQU0sRUFBRUMsT0FBTyxDQUFDQyxHQUFHLENBQUNDLGVBQWU7QUFDckMsQ0FBQyxDQUFDLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sZXZlbDQvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzPzJlOGIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCB7IGdldFRva2VuIH0gZnJvbSBcIm5leHQtYXV0aC9qd3RcIjtcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCI7XG5pbXBvcnQgeyBjb21wYXJlLCBoYXNoIH0gZnJvbSBcImJjcnlwdFwiO1xuXG5pbXBvcnQgZ3JhcGhjbXMgZnJvbSBcIi4uLy4uLy4uL2xpYi9ncmFwaC1xbFwiO1xuaW1wb3J0IHsgZ3FsIH0gZnJvbSBcImdyYXBocWwtcmVxdWVzdFwiO1xuXG5jb25zdCBHZXRVc2VyQnlFbWFpbCA9IGdxbGBcbiAgcXVlcnkgR2V0VXNlckJ5RW1haWwoJGVtYWlsOiBTdHJpbmchKSB7XG4gICAgbmV4dFVzZXIod2hlcmU6IHsgZW1haWw6ICRlbWFpbCB9LCBzdGFnZTogRFJBRlQpIHtcbiAgICAgIGlkXG4gICAgICBlbWFpbFxuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgQ3JlYXRlTmV4dFVzZXJCeUVtYWlsID0gZ3FsYFxuICBtdXRhdGlvbiBDcmVhdGVOZXh0VXNlckJ5RW1haWwoJGVtYWlsOiBTdHJpbmchLCAkcGFzc3dvcmQ6IFN0cmluZyEpIHtcbiAgICBjcmVhdGVOZXh0VXNlcihkYXRhOiB7IGVtYWlsOiAkZW1haWwsIHBhc3N3b3JkOiAkcGFzc3dvcmQgfSkge1xuICAgICAgaWRcbiAgICAgIGVtYWlsXG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBOZXh0QXV0aCh7XG4gIHByb3ZpZGVyczogW1xuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogXCJFbWFpbCBhbmQgUGFzc3dvcmRcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7XG4gICAgICAgICAgbGFiZWw6IFwiRW1haWxcIixcbiAgICAgICAgICB0eXBlOiBcImVtYWlsXCIsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IFwiamFtaWVAZ3JhcGhjbXMuY29tXCIsXG4gICAgICAgIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7XG4gICAgICAgICAgbGFiZWw6IFwiUGFzc3dvcmRcIixcbiAgICAgICAgICB0eXBlOiBcInBhc3N3b3JkXCIsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IFwiUGFzc3dvcmRcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBhdXRob3JpemU6IGFzeW5jICh7IGVtYWlsLCBwYXNzd29yZCB9OiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgeyB1c2VyIH0gPSBhd2FpdCBncmFwaGNtcy5yZXF1ZXN0KEdldFVzZXJCeUVtYWlsLCB7XG4gICAgICAgICAgZW1haWwsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXNlclwiLCB1c2VyKTtcblxuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICBjb25zdCB7IG5ld1VzZXIgfSA9IGF3YWl0IGdyYXBoY21zLnJlcXVlc3QoQ3JlYXRlTmV4dFVzZXJCeUVtYWlsLCB7XG4gICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBhd2FpdCBoYXNoKHBhc3N3b3JkLCAxMiksXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IG5ld1VzZXIuaWQsXG4gICAgICAgICAgICB1c2VybmFtZTogZW1haWwsXG4gICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IGNvbXBhcmUocGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuXG4gICAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldyb25nIGNyZWRlbnRpYWxzLiBUcnkgYWdhaW4uXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZDogdXNlci5pZCxcbiAgICAgICAgICB1c2VybmFtZTogZW1haWwsXG4gICAgICAgICAgZW1haWwsXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn0pO1xuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImNvbXBhcmUiLCJoYXNoIiwiZ3JhcGhjbXMiLCJncWwiLCJHZXRVc2VyQnlFbWFpbCIsIkNyZWF0ZU5leHRVc2VyQnlFbWFpbCIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInVzZXIiLCJyZXF1ZXN0IiwiY29uc29sZSIsImxvZyIsIm5ld1VzZXIiLCJpZCIsInVzZXJuYW1lIiwiaXNWYWxpZCIsIkVycm9yIiwic2VjcmV0IiwicHJvY2VzcyIsImVudiIsIk5FWFRBVVRIX1NFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/[...nextauth].ts"));
module.exports = __webpack_exports__;

})();