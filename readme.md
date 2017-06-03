npm install

webpack-dev-server --env.appName=app1
webpack --env.appName=app1





{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					'url-loader?limit=10000',
					'img-loader'
				]
			}



            resolve: {
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
	},