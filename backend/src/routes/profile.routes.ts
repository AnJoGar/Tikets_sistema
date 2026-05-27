import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// GET /api/profiles - SIN autenticación (para registro)
router.get('/', ProfileController.getAllProfiles);

// GET /api/profiles/:id - SIN autenticación
router.get('/:id', ProfileController.getProfileById);

// POST /api/profiles - SIN autenticación (temporal para setup)
router.post('/', ProfileController.createProfile);

// PUT /api/profiles/:id - CON autenticación
router.put('/:id', authenticateToken, ProfileController.updateProfile);

// DELETE /api/profiles/:id - CON autenticación
router.delete('/:id', authenticateToken, ProfileController.deleteProfile);

export default router;