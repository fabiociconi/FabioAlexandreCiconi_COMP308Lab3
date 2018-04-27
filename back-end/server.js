require("ts-node/register");

const tsConfig = require("./tsconfig.json");
const tsConfigPaths = require("tsconfig-paths");

tsConfigPaths.register({
	baseUrl: tsConfig.compilerOptions.baseUrl,
	paths: tsConfig.compilerOptions.paths
});

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const server = require('./config/express-server');
const app = server.init();
app.listen(3000);

module.exports = app;