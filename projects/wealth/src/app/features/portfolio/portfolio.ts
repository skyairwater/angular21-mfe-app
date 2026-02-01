import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-portfolio',
    standalone: true,
    imports: [CommonModule],
    providers: [CurrencyPipe, DecimalPipe],
    templateUrl: './portfolio.html',
})
export class PortfolioComponent implements OnInit, OnDestroy {
    public isLoading = signal(true);

    // Portfolio Stats
    public netWorth = signal(128450.75);
    public dayGain = signal(1420.30);
    public totalReturn = signal(15.4);

    // Holding Data
    public holdings = signal([
        { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, price: 185.92, change: 1.2, color: 'bg-blue-500' },
        { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 30, price: 415.10, change: -0.5, color: 'bg-indigo-500' },
        { symbol: 'TSLA', name: 'Tesla, Inc.', shares: 100, price: 190.15, change: 2.8, color: 'bg-red-500' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 25, price: 142.65, change: 0.3, color: 'bg-green-500' },
    ]);

    private updateInterval: any;

    ngOnInit() {
        // 2-second loading animation
        setTimeout(() => {
            this.isLoading.set(false);
        }, 2000);

        // Mock real-time price ticks
        this.updateInterval = setInterval(() => {
            this.holdings.update(items => items.map(item => {
                const volatility = (Math.random() - 0.5) * 0.5;
                const newPrice = parseFloat((item.price + volatility).toFixed(2));
                const newChange = parseFloat((item.change + (volatility / 10)).toFixed(2));
                return { ...item, price: newPrice, change: newChange };
            }));

            // Update Net Worth based on price ticks
            this.netWorth.update(v => v + (Math.random() - 0.5) * 10);
            this.dayGain.update(v => v + (Math.random() - 0.5) * 5);
        }, 3000);
    }

    ngOnDestroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }

    protected getChangeClass(change: number): string {
        return change >= 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
    }
}
