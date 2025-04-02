const expect = require("expect");
const { createIntegrityPlugin, getDist } = require("../wsi-test-helper");
module.exports = {
  mode: "production",
  entry: "./a.js",
  output: {
    filename: "[name]-[hash]-[hash:4]-[id]-[query].js",
    chunkFilename:
      "[name]-[hash]-[chunkhash]-[hash:4]-[chunkhash:4]-[id]-[query].js",
    crossOriginLoading: "anonymous",
    path: getDist(__dirname),
  },
  plugins: [
    createIntegrityPlugin({ hashFuncNames: ["sha256", "sha384"] }),
    {
      apply: (compiler) => {
        compiler.hooks.done.tap("wsi-test", (stats) => {
          expect(
            stats.compilation.warnings.filter(
              (warning) =>
                !warning.message.match(
                  /Using \[hash\], \[fullhash\], \[modulehash\], or \[chunkhash\] can be risky/
                )
            )
          .length).toEqual(0);
        });
      },
    },
  ],
};
