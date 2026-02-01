import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'merchant/dashboard',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'merchant',
        loadChildren: () =>
            loadRemoteModule('merchant', './Routes').then((m) => m.routes),
        canActivate: [authGuard],
        data: { role: 'merchant' }
    },
    {
        path: 'credit',
        loadComponent: () =>
            loadRemoteModule('credit', './Component').then((m) => m.App),
        canActivate: [authGuard],
        data: { role: 'credit' }
    },
    {
        path: 'wealth',
        loadComponent: () =>
            loadRemoteModule('wealth', './Component').then((m) => m.App),
        canActivate: [authGuard],
        data: { role: 'wealth' }
    },
];
