import garagesRouter from './api/controllers/garage/router';

export default function routes(app) {
  app.use('/api/v1/garages', garagesRouter);

}
