const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./example/index.tsx", // Asegúrate de que este sea tu punto de entrada
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // Añade '@babel/preset-react' aquí si usas React
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // Agrega más reglas si es necesario
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./example/index.html", // Ajusta esto a tu archivo HTML
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Añade aquí las extensiones que necesites
  },
};
