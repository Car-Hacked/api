import garagesRouter from './api/controllers/garage/router';
import LoginController from './api/controllers/login';
import UsersController from './api/controllers/users/router';

export default function routes(app) {
  app.use('/api/v1/garages', garagesRouter);
  app.post('/api/v1/login', LoginController.login);
  app.use('/api/v1/users', UsersController);
}
