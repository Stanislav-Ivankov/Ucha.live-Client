import * as moment from "moment";

import { Injectable, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {

	constructor(private _router: Router) {}

	loggedStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

	getLoggedStatus() {
		return this.loggedStatus;
	}

	emitLoggedStatus(status: boolean) {
		this.loggedStatus.emit(status);
		return;
	}

	setLocalStorage(response) {
		const expiresAt = moment().add(response.Expires[0], response.Expires[1]).valueOf();
		localStorage.setItem('Group', JSON.stringify(response.Group));
		localStorage.setItem('Token', response.Token);
		localStorage.setItem("Expires", JSON.stringify(expiresAt));
		this.emitLoggedStatus(true);
		return;
	}

	logout() {
		localStorage.removeItem("Group");
		localStorage.removeItem("Token");
		localStorage.removeItem("Expires");
		this._router.navigate(['/login']);
		this.emitLoggedStatus(false);
		return;
	}

	public isLoggedIn() {
		return moment().isBefore(this.getExpiration()) && localStorage.getItem('Token') && localStorage.getItem('Group');
	}

	isLoggedOut() {
		return !this.isLoggedIn();
	}

	getExpiration() {
		const expiration = localStorage.getItem("Expires");
		const expiresAt = JSON.parse(expiration);
		return moment(expiresAt);
	}
}