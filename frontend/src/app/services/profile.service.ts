import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Profile } from '../models/profile.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    constructor(private apiService: ApiService) { }

    getProfiles(): Observable<Profile[]> {
        return this.apiService.get<Profile[]>('/profiles');
    }

    getProfileById(id: string): Observable<Profile> {
        return this.apiService.get<Profile>(`/profiles/${id}`);
    }
}