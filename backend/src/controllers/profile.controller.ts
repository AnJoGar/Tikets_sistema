import { Request, Response, NextFunction } from 'express';
import { ProfileService } from '../services/profile.service';
import { ApiResponse } from '../types/api.types';

export class ProfileController {
    static async getAllProfiles(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const profiles = await ProfileService.getAllProfiles();
            res.json({ status: 'success', data: profiles } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }

    static async getProfileById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const profile = await ProfileService.getProfileById(req.params.id);
            res.json({ status: 'success', data: profile } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }

    static async createProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, description } = req.body;
            if (!name || !description) {
                res.status(400).json({
                    status: 'error',
                    message: 'name y description son requeridos',
                    code: 400,
                });
                return;
            }
            const profile = await ProfileService.createProfile(name, description);
            res.status(201).json({ status: 'success', data: profile } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }

    static async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, description } = req.body;
            const profile = await ProfileService.updateProfile(req.params.id, name, description);
            res.json({ status: 'success', data: profile } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }

    static async deleteProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await ProfileService.deleteProfile(req.params.id);
            res.json({ status: 'success', message: 'Perfil eliminado' } as ApiResponse);
        } catch (error) {
            next(error);
        }
    }
}