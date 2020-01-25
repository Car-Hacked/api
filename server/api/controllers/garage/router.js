import * as express from 'express';
import controller from './controller';

export default express
    .Router()
    .post('/', controller.create)
    .delete('/:id', controller.delete)
    .get('/', controller.all)
    .get('/:id', controller.byId);