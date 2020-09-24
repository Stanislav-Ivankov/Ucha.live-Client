import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
	{
		path: 'login',
		loadChildren: './pages/login/login.module#LoginModule'
	},
	{
		// TODO: Comment for testing
		canActivate: [AuthGuard],
		path: 'video',
		loadChildren: './pages/video/video.module#VideoModule',
	},
	{
		path: '**',
		redirectTo: '/login'
		// TODO: Uncomment for testing
		// redirectTo: '/video'
	}
];

export const routing = RouterModule.forRoot(routes);