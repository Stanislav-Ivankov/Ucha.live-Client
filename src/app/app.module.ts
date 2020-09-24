import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from "./material-module";
import { routing } from './app.routing';

@NgModule({
  declarations: [
	  AppComponent
	],
  imports: [
	  BrowserAnimationsModule,
	  CommonModule,
	  CoreModule,
	  MaterialModule,
	  routing
	],
  providers: [],
  bootstrap: [
	  AppComponent
	]
})

export class AppModule {}