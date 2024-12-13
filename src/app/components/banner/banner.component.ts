import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CurrencyService } from '../../service/currency.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent implements OnInit {
  bannerData: any = [];
  currency: string = 'EUR';

  constructor(
    private api: ApiService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.loadBannerData();
    this.currencyService.getCurrency().subscribe((currency) => {
      this.currency = currency;
      this.loadBannerData();
    });
  }

  loadBannerData() {
    this.api.getTrendingCoins(this.currency).subscribe((data) => {
      this.bannerData = data;
    });
  }
}
