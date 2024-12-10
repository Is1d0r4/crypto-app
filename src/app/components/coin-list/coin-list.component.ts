import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coin-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.scss',
})
export class CoinListComponent implements OnInit {
  bannerData: any = [];

  constructor(private api: ApiService) {}
  ngOnInit() {
    this.getBannerData();
    this.getAllData();
  }
  getBannerData() {
    this.api.getTrendingCurrency('eur').subscribe((data) => {
      console.log(data);
      this.bannerData = data;
    });
  }
  getAllData() {
    this.api.getCurrency('eur').subscribe((data) => console.log(data));
  }
}
