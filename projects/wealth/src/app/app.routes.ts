import { Routes } from '@angular/router';
import { PortfolioComponent } from './features/portfolio/portfolio';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'portfolio',
        pathMatch: 'full'
    },
    {
        path: 'portfolio',
        component: PortfolioComponent
    }
];
