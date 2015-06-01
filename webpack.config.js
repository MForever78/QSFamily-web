module.exports = {
  entry: "./src/app.js",
  output: {
    path: "./build",
    publicPath: "/build/",
    filename: "app.js"
  },
  module: {
    loaders: [
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.html$/, loader: "html" },
      { test: /\.css$/, loader: "style!css" }
    ]
  }
}
