import chalk from 'chalk';
import liveServer from 'live-server';
import webpack from 'webpack';
import config from '../webpack.config.prod'

process.env.NODE_ENV = 'production';

webpack(config).run((err, stats) => {
	if(err) {
		console.log(chalk.red(err));
		return 1;
	}

	const jsonStats = stats.toJson();

	if(stats.hasErrors) {
		return jsonStats.errors.map(error => console.log(chalk.red(error)));
	}

	if(jsonStats.hasWarnings) {
		console.log(chalk.yellow("Webpack generated warnings: "));
		return jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
	}

	console.log(`Webpack stats: ${stats}`)
	return 0;
});

const params = {
	port: 8080, // Set the server port. Defaults to 8080.
	root: "src", // Set root directory that's being served. Defaults to cwd.
	open: true, // When false, it won't load your browser by default.
	file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
	logLevel: 2
};

liveServer.start(params);
