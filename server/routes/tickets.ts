import express from 'express';
import { JWTAuthMiddleware } from '../middlewares/auth';
import { TicketController } from '../controllers/tickets';
const router = express.Router();

router.get('/tickets', JWTAuthMiddleware, TicketController.getTickets);
router.get('/tickets/:id', JWTAuthMiddleware, TicketController.getTicketById);
router.post('/tickets', JWTAuthMiddleware, TicketController.addTicket);
router.put('/tickets/:id', JWTAuthMiddleware, TicketController.updateTicket);
router.delete('/tickets/:id', JWTAuthMiddleware, TicketController.deleteTicket);

export default router;
