import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export type Role = 'merchant' | 'credit' | 'wealth' | 'admin';

export interface User {
    username: string;
    role: Role;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Hardcoded users for POC
    private readonly USERS: Record<string, User> = {
        'merchantuser': { username: 'merchantuser', role: 'merchant', name: 'Merchant User' },
        'credituser': { username: 'credituser', role: 'credit', name: 'Credit User' },
        'wealthuser': { username: 'wealthuser', role: 'wealth', name: 'Wealth User' },
        'admin': { username: 'admin', role: 'admin', name: 'Administrator' }
    };

    private readonly PASSWORD = 'abcd123';

    // Signals for reactive state
    private _currentUser = signal<User | null>(null);
    currentUser = this._currentUser.asReadonly();
    isLoggedIn = computed(() => !!this._currentUser());

    constructor(private router: Router) { }

    login(username: string, password: string): boolean {
        if (password !== this.PASSWORD) {
            return false;
        }

        const user = this.USERS[username];
        if (user) {
            this._currentUser.set(user);
            this.redirectAfterLogin(user.role);
            return true;
        }
        return false;
    }

    logout(): void {
        this._currentUser.set(null);
        this.router.navigate(['/login']);
    }

    hasAccess(requiredRole: Role): boolean {
        const user = this._currentUser();
        if (!user) return false;
        if (user.role === 'admin') return true;
        return user.role === requiredRole;
    }

    private redirectAfterLogin(role: Role): void {
        if (role === 'admin') {
            this.router.navigate(['/merchant']); // Admin goes to merchant by default
        } else {
            this.router.navigate(['/' + role]);
        }
    }
}
