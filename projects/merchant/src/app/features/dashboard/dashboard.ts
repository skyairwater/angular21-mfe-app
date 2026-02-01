import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DecimalPipe, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    providers: [DecimalPipe, CurrencyPipe],
    templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    // Stats Signals
    public totalRevenue = signal(12450.50);
    public activeOrders = signal(42);
    public conversionRate = signal(3.8);
    public customerSatisfaction = signal(98.2);

    // Mock Sparkline Data (Revenue over last 12 hours)
    public sparklinePoints = signal('0,80 50,60 100,75 150,40 200,65 250,30 300,50 350,20 400,45 450,15 500,35');

    // Activity Feed
    public recentSales = signal([
        { id: 'ORD-9921', customer: 'Alex Rivers', amount: 154.00, status: 'Completed', time: '2 mins ago' },
        { id: 'ORD-9920', customer: 'Sarah Chen', amount: 89.50, status: 'Processing', time: '15 mins ago' },
        { id: 'ORD-9919', customer: 'Mike Ross', amount: 210.00, status: 'Completed', time: '45 mins ago' },
        { id: 'ORD-9918', customer: 'Elena Gilbert', amount: 45.99, status: 'Flagged', time: '1 hour ago' },
    ]);

    private updateInterval: any;

    ngOnInit() {
        // Simulate real-time data ticks
        this.updateInterval = setInterval(() => {
            // Tick revenue up slightly
            this.totalRevenue.update(v => v + (Math.random() * 5));

            // Randomly fluctuation orders
            if (Math.random() > 0.7) {
                this.activeOrders.update(v => Math.max(0, v + (Math.random() > 0.5 ? 1 : -1)));
            }

            // Slightly shift conversion rate
            this.conversionRate.update(v => parseFloat((v + (Math.random() * 0.2 - 0.1)).toFixed(2)));
        }, 3000);
    }

    ngOnDestroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }

    protected getStatusClass(status: string): string {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
            case 'Processing': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Flagged': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    }
}
