import { Router } from 'express';
import todoController from './todoController';

const router = Router();

router.use('/todos', todoController);

export default router;