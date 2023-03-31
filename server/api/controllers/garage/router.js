import * as express from 'express';
import controller from './controller.js';

export default express
    .Router()
    .post('/', controller.create)
    .patch('/', controller.update)
    .delete('/:id', controller.delete)
    .get('/', controller.all)
    .get('/:id', controller.byId);