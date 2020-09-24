import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { VideoComponent } from './video.component';
import { MaterialModule } from '../../material-module';
import { SharedModule } from '../../shared/shared.module';

const Routes_Array: Routes = [
	{ path: '', component: VideoComponent }
];

@NgModule({
	imports: [
		MaterialModule,
		CommonModule,
		FormsModule,
		SharedModule,
		ReactiveFormsModule,
		RouterModule.forChild(Routes_Array)
	],
	declarations: [
		VideoComponent
	],
	exports: [
		VideoComponent
	],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})

export class VideoModule {}