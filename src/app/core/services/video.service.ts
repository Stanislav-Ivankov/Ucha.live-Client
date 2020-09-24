import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class VideoService {

	constructor(private apiService: ApiService) {}

	public async getSchedule() {
		const currentUserGroup = JSON.parse(localStorage.getItem('Group'));
		return await this.apiService.get(`group/${ currentUserGroup }/schedule`);
	}

	public async getCameraLocation(id) {
		return await this.apiService.get('camera/' + id);
	}
}