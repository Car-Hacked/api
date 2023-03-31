import Express from 'express';
import * as path from 'path';
import errorHandler from '../api/middlewares/error.handler.js';
import * as OpenApiValidator from 'express-openapi-validator';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function oas(app, routes) {
  const apiSpec = path.join(__dirname, 'api.yml');
  const validateResponses = !!(
    process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
    process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
  );
  app.use(OpenApiValidator.middleware({
    apiSpec,
    validateResponses,
  }))
  app.use(process.env.OPENAPI_SPEC || '/spec', Express.static(apiSpec));
  routes(app);
  app.use(errorHandler);
  return new Promise((resolve) => resolve(app));
}
