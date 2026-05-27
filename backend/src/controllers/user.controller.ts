import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { ApiResponse } from '../types/api.types';

export class UserController {
    static async getAllUsers(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await UserService.getAllUsers();
            res.json({ status: 'success', data: users } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.json({ status: 'success', data: user } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }

    static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email, profileId } = req.body;
            if (!name || !email || !profileId) {
                res.status(400).json({
                    status: 'error',
                    message: 'name, email, profileId son requeridos',
                    code: 400,
                });
                return;
            }
            const user = await UserService.createUser(name, email, profileId);
            res.status(201).json({ status: 'success', data: user } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, profileId } = req.body;
            const user = await UserService.updateUser(req.params.id, name, profileId);
            res.json({ status: 'success', data: user } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await UserService.deleteUser(req.params.id);
            res.json({ status: 'success', message: 'Usuario eliminado' } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }
}