import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CurrencyService } from '../../service/currency.service';

@Component({
  selector: 'app-coin-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.scss',
})
export class CoinListComponent implements OnInit {
  currency: string = 'EUR';
  bannerData: any = [];
  displayedColumns: string[] = [
    'symbol',
    'current_price',
    'price_change_percentage_24h',
    'market_cap',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(undefined);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private router: Router,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.getBannerData();
    this.getAllData();
    this.currencyService.getCurrency().subscribe((currency) => {
      this.currency = currency;
      this.getBannerData();
      this.getAllData();
    });
  }

  getBannerData() {
    this.api.getTrendingCurrency(this.currency).subscribe((data) => {
      this.bannerData = data;
    });
  }

  getAllData() {
    this.api.getCurrency(this.currency).subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  goToDetails(coinId: string) {
    this.router.navigate(['coin-detail', coinId]);
  }
}
