import garagesRouter from './api/controllers/garage/router.js';
import LoginController from './api/controllers/login.js';
import UsersController from './api/controllers/users/router.js';

export default function routes(app) {
  app.use('/api/v1/garages', garagesRouter);
  app.post('/api/v1/login', LoginController.login);
  app.use('/api/v1/users', UsersController);
}
