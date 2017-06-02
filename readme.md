npm install
npm start


localhost:8080/app1/app1.html

localhost:8080/app2/app2.html


 module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
          loader: 'url-loader',
          query: {
            limit: 10000, // use data url for assets <= 10KB
            name: 'assets/[name].[hash].[ext]'
          },
        },
      ]
    },
