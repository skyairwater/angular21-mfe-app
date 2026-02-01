import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-customers',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './customers.html',
})
export class CustomersComponent {
    public customers = signal([
        { id: 1, name: 'John Doe', email: 'john@example.com', creditScore: 720, status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', creditScore: 680, status: 'Pending' },
        { id: 3, name: 'Robert Brown', email: 'robert@example.com', creditScore: 750, status: 'Active' },
        { id: 4, name: 'Emily Davis', email: 'emily@example.com', creditScore: 640, status: 'Under Review' },
    ]);

    protected getStatusClass(status: string): string {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Under Review': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
}
