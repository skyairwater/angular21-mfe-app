import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'merchant',
        pathMatch: 'full',
    },
    {
        path: 'merchant',
        loadComponent: () =>
            loadRemoteModule('merchant', './Component').then((m) => m.App),
    },
    {
        path: 'credit',
        loadComponent: () =>
            loadRemoteModule('credit', './Component').then((m) => m.App),
    },
    {
        path: 'wealth',
        loadComponent: () =>
            loadRemoteModule('wealth', './Component').then((m) => m.App),
    },
];
