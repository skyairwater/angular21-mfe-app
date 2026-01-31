import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
        return router.createUrlTree(['/login']);
    }

    const requiredRole = route.data['role'];
    if (requiredRole) {
        if (authService.hasAccess(requiredRole)) {
            return true;
        } else {
            // Role not authorized, maybe redirect to a forbidden page or stay put
            // For now, redirect to login with error or just block
            alert('You do not have access to this module.');
            return false;
        }
    }

    return true;
};
