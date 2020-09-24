import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './guards/auth.guard';
import { AuthenticationInterceptor } from "./interceptors/authentication.interceptor";

import { ApiService } from './services/api.service';
import { AuthService } from "./services/auth.service";
import { VideoService } from './services/video.service';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule
	],
	declarations: [],
	exports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule
	],
	providers: [
		AuthGuard,
		AuthService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthenticationInterceptor,
			multi: true
		},
		ApiService,
		VideoService,
	],
})

export class CoreModule {

	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error('Core Module Is Already Loaded. Import Only In AppModule.');
		}
	}
}