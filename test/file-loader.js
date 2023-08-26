const path = require("path");
const webpack = require("webpack");

const compiler = webpack({
  mode: "development",
  devtool: false,
  entry: path.resolve(__dirname, "./file-loader-demo.js"),
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "./outputs"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
  },
  module: {
    rules: [
      {
        test: /(png|jpg|svg)/i,
        rules: [
          {
            loader: "url-loader",
            options: {
              name: "img/[name][hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [],
});

// const outputFileSystem = createFsFromVolume(new Volume());
// outputFileSystem.join = path.join.bind(path);

// compiler.outputFileSystem = outputFileSystem;

compiler.run((err, stats) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(
    stats.toString({
      chunks: false, // Makes the build much quieter
      colors: true, // Shows colors in the console
    })
  );
});
