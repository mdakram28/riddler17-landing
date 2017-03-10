const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/riddler-registration');

var User = require("./models/user.js");

var mailObj = {
	table: []
};
var outputJson = JSON.stringify(mailObj);

if (isDeveloping) {
	const compiler = webpack(config);
	const middleware = webpackMiddleware(compiler, {
		publicPath: config.output.publicPath,
		contentBase: 'src',
		stats: {
			colors: true,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false,
			modules: false
		}
	});

	app.use(middleware);
	app.use(webpackHotMiddleware(compiler));
	app.get('*', function response(req, res) {
		res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
		res.end();
	});
} else {
	app.use(express.static(__dirname + '/dist'));
	// app.get('*', function response(req, res) {
	// 	res.sendFile(path.join(__dirname, 'dist/index.html'));
	// });
}

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/form", function (req, res) {
	var mail = Object.keys(req.body)[0];
	// console.log(mail);
	var newUser = new User({
		mail: mail.toString(),
		createdAt : new Date()
	});
	newUser.save(function(err){
		if(err){
			console.log(err);
		}else{
			console.log("Email added :: "+mail);
		}
	});
});

app.listen(port, '0.0.0.0', function onStart(err) {
	if (err) {
		console.log(err);
	}
	console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
