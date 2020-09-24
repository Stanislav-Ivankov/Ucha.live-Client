import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material-module';

import { CounterComponent } from './counter/counter.component';
import { CalendarComponent } from './calendar/calendar.component';
@NgModule({
	declarations: [
		CounterComponent,
		CalendarComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		MaterialModule
	],
	exports: [
		MaterialModule,
		CounterComponent,
		CalendarComponent,
	]
})

export class SharedModule {}