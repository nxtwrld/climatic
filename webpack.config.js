module.exports.getConfig = function(type) {

  var isDev = type === 'development';

  var config = {
    entry: './app/scripts/main.js',
    output: {
      path: __dirname,
      filename: 'main.js'
    },
    debug : isDev,
    node: {
      net: "empty",
      tls: "empty",
      fs: "empty",
      file: "empty",
      directory: "empty"
    },
    module: {
      loaders: [
         {include: /\.json$/, loaders: ["json-loader"]},
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'stage-0', 'react']
          }
        }
      ]
    }
  };

  if(isDev){
    config.devtool = 'eval';
  }

  return config;
}
