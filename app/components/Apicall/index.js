/**
*
* Apicall
*
*/

let hostRoot = 'https://app.topicpulse.com',
 	apiRoot = 'https://app.topicpulse.com/v4/',
	appRoot = '/v4';
// Auto-detect the environment
let ENV = appRoot = process.env.NODE_ENV;
switch (process.env.NODE_ENV) {
	case 'development':
		hostRoot = 'http://hknieriem.tp-dev-01.ldrhub.com';
		apiRoot = 'http://hknieriem.tp-dev-01.ldrhub.com/pulse-v4/app/v4/api/';
		appRoot = '/pulse/app/v4/www';
		break;
	case 'stage':
		hostRoot = 'http://hknieriem.tp-dev-01.ldrhub.com';
		apiRoot = 'http://hknieriem.tp-dev-01.ldrhub.com/pulse-stage/app/v4/api/';
		appRoot = '/pulse-stage/app/v4';
		break;
	case 'hrk':
		hostRoot = 'http://hknieriem.tp-dev-01.ldrhub.com';
		apiRoot = 'http://hknieriem.tp-dev-01.ldrhub.com/pulse-v4/app/v4/api/';
		appRoot = '/pulse-v4/app/v4/www';
		break;

	// ADDED for testing
	case 'production':
		hostRoot = 'http://hknieriem.tp-dev-01.ldrhub.com';
		apiRoot = 'http://hknieriem.tp-dev-01.ldrhub.com/pulse-stage/app/v4/api/';
		appRoot = '/pulse-stage/app/v4';
		break;
}


module.exports = {

	env: ENV,
	HOST_URL: hostRoot,
	BASE_URL: apiRoot,
	PATH_PREFIX: appRoot,
	
	google_analytics_tracker_id: 'UA-45676417-2'

}