import { Routes } from '@angular/router';
import { CustomersComponent } from './features/customers/customers';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'customers',
        pathMatch: 'full'
    },
    {
        path: 'customers',
        component: CustomersComponent
    }
];
