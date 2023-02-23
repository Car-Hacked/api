import './common/env.js';
//uncomment to run locally
import Server from './common/server.js';
import routes from './routes.js';

export default new Server().router(routes).listen(process.env.PORT);
