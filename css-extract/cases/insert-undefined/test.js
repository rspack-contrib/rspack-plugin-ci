const fs = require("fs");
const path = require("path");
module.exports = function (outputDirectory, _stats) {
	const mainContent = fs.readFileSync(path.resolve(outputDirectory, "main.js"), "utf8");
	expect(mainContent).toContain(`if (oldTag) {`);
  expect(mainContent).toContain(`oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);`);
  expect(mainContent).toContain(`} else {`);
  expect(mainContent).toContain(`document.head.appendChild(linkTag);`);
  expect(mainContent).toContain(`}`);
};
