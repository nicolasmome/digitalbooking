// import { createBrowserHistory } from "history";
// import { isEqual } from "lodash";
// import { parse, stringify } from "query-string";

// const routeManager = {
//   initialize() {
//     this.history = createBrowserHistory();
//   },

//   get currentParams() {
//     return parse(this.history.location.search);
//   },

//   get currentStringParams() {
//     return this.history.location.search;
//   },

//   pushParams(params) {
//     const nextParameters = {
//       ...this.currentParams,
//       ...params,
//     };
//     const filterParameters = Object.keys(nextParameters).reduce(
//       (previousValue, currentValue) => {
//         if (nextParameters[currentValue] !== "") {
//           return {
//             ...previousValue,
//             [currentValue]: nextParameters[currentValue],
//           };
//         }
//         return previousValue;
//       },
//       {}
//     );

//     if (!isEqual(filterParameters, this.currentParams)) {
//       const nextURI = stringify(filterParameters, {
//         strict: false,
//         encode: false,
//       });
//       this.history.replace({ search: `?${nextURI}` });
//     }
//   },

//   resetParams(params) {
//     const nextParameters = {
//       ...params,
//     };
//     const nextURI = stringify(nextParameters, {
//       strict: false,
//       encode: false,
//     });
//     this.history.replace({ search: `?${nextURI}` });
//   },

//   subscribeToHistory(fn) {
//     this.history.listen(() => fn(this.currentParams));
//   },
// };

// if (typeof window !== "undefined") {
//   routeManager.initialize();
// }


// export default routeManager;
