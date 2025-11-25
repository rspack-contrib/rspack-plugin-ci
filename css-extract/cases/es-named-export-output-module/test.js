const fs = require("fs");
const path = require("path");
module.exports = function (outputDirectory, _stats) {
  const mainContent = fs.readFileSync(path.resolve(outputDirectory, "main.mjs"), "utf8");
  expect(mainContent).toContain(`__webpack_require__.d(__webpack_exports__, {
  "a-class": () => (_1),
  b__class: () => (_2),
  cClass: () => (_3)
});
// extracted by css-extract-rspack-plugin
var _1 = "foo__style__a-class";
var _2 = "foo__style__b__class";
var _3 = "foo__style__cClass";`);
  expect(mainContent).toContain(`console.log({ css: _style_css__rspack_import_0["default"], aClass: _style_css__rspack_import_0.aClass, bClass: _style_css__rspack_import_0.bClass, cClass: _style_css__rspack_import_0.cClass })`);
};
