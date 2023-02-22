import * as express from 'express';
import controller from './controller.js';

export default express
    .Router()
    .post('/', controller.create)
    .delete('/', controller.remove)
    .patch('/', controller.update);
