import { Component, ChangeDetectorRef } from '@angular/core';
import { VideoService } from '../../core/services/video.service';
import { AuthService } from '../../core/services/auth.service';

declare const videojs;

@Component({
	selector: 'app-video',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.scss']
})

export class VideoComponent {

	source;
	counterTime = { min: '0', sec: '0' };

	// Flags, Controlling The Page
	waitingForFirst = false;
	noMoreToday = false;
	visibleVideo = true;

	// Use data from BE
	schedule = []

	constructor(private _authService: AuthService, private videoService: VideoService, private ref: ChangeDetectorRef) {
		this.videoService.getSchedule().then((res: any) => {
			console.log(res);
			
			this.schedule = [ ...res.schedule ];
			this.updateScreen();
		});
	}

	updateScreen() {
		let currentDate = new Date();
		let todaySchedule = this.getTodaySchedule();
		// If there is nothing for today
		if(!todaySchedule.length) {
			this.waitingForFirst = true;
			this.ref.detectChanges();
			return;
		}

		// Waiting for first
		if(+this.makeDate(todaySchedule[0].start) > +currentDate) {
			this.waitingForFirst = true;
			this.setCounter(+this.makeDate(todaySchedule[0].start));
			this.ref.detectChanges();
			return;
		}

		// Waiting For The Next School Day
		if(!todaySchedule[todaySchedule.length - 1] || +this.makeDate(todaySchedule[todaySchedule.length - 1].end) < +currentDate) {
			this.noMoreToday = true;
			this.visibleVideo = false;
			this.ref.detectChanges();
			return;
		}

		let activeSchedule = this.getTodaySchedule().filter((el) => (+this.makeDate(el.start) < +currentDate) && (+this.makeDate(el.end) > +currentDate))[0];
		this.visibleVideo = !!activeSchedule;

		if(activeSchedule) {
			this.setVideo(activeSchedule)
		} else {
			let nextSchedule = this.getTodaySchedule().filter((el) => (+this.makeDate(el.start) > +currentDate))[0];

			if(!nextSchedule) {
				this.setCounter(+this.makeDate(this.getTomorrowSchedule()[0].start));
			} else {
				this.setCounter(+this.makeDate(nextSchedule.start));
			}
		}
		this.ref.detectChanges();
	}

	setVideo(activeSchedule) {
		this.videoService.getCameraLocation(activeSchedule.camera).then((location: any) => {
			// this.source = 'http://jilanov.com:5200/streams/School1/index.m3u8';
			this.source = 'http://jilanov.com:5200/streams/' + location.name + '/index.m3u8';
			const sourceEl = document.createElement("source");
			sourceEl.type = 'application/x-mpegURL';
			sourceEl.src = this.source;
			document.getElementsByTagName('video-js')[0].appendChild(sourceEl);
			videojs('my_video_1');
			this.setTimer(this.makeDate(activeSchedule.end));
		});
	}

	setCounter(timeToRun) {
		let now = new Date();
		now.setDate(5);
		let timeDifference = (+timeToRun - +now )/1000;

		this.counterTime = {
			min: Math.floor(timeDifference/60) + '',
			sec: Math.floor(timeDifference%60) + ''
		};

		this.visibleVideo = false;

		setTimeout(() => {
			this.updateScreen();
		}, +timeToRun - +now);
	}

	setTimer(timeToRun) {
		let now = new Date();

		setTimeout(() => {
			this.updateScreen();
		}, +timeToRun - +now);
	}

	getNext() {}

	makeDate(hours) {
		let today = new Date();
		return new Date(`${today.getFullYear()}-${(today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1}-${(today.getDate() < 10 ) ? '0' + today.getDate() : today.getDate()}${hours}`);
	}

	getTodaySchedule() {
		let todayIndex = this.getNormalDay();
		return this.schedule.filter((el) => el.dayOfWeek === todayIndex);
	}

	getTomorrowSchedule() {
		let todayIndex = this.getNormalDay();
		return this.schedule.filter((el) => el.dayOfWeek === todayIndex);
	}

	getNormalDay() {
		let curr = new Date();
		if(curr.getDay() === 0) {
			return 6;
		} else {
			return curr.getDay() - 1;
		}
	}

	logout() {
		this._authService.logout();
	}
}