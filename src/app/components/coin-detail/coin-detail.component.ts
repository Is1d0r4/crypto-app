import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { CurrencyService } from '../../service/currency.service';
import { combineLatestWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-coin-detail',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './coin-detail.component.html',
  styleUrl: './coin-detail.component.scss',
})
export class CoinDetailComponent implements OnInit {
  coinId!: string;
  data$!: Observable<any>;
  days: number = 30;
  currentPrice!: string;
  marketCap!: string;
  selectedCurrency$ = this.currencyService.getCurrency();
  currency: string = 'EUR';

  // START Chart configuration
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',
      },
    ],
    labels: [],
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;
  // END Chart configuration

  constructor(
    private api: ApiService,
    private activedRoute: ActivatedRoute,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.loadCoinData();
    this.loadGraphData(this.days);
    this.selectedCurrency$
      .pipe(combineLatestWith(this.data$))
      .subscribe(([selectedKey, data]) => {
        this.currentPrice =
          data.market_data.current_price[selectedKey.toLowerCase()];
        this.marketCap = data.market_data.market_cap[selectedKey.toLowerCase()];
        this.currency = selectedKey;
        this.loadGraphData(this.days);
      });
  }

  loadCoinData() {
    this.activedRoute.params.subscribe((params) => {
      this.coinId = params['id'];
      this.data$ = this.api.getCoinById(this.coinId);
    });
  }

  loadGraphData(days: number) {
    this.days = days;
    this.api
      .getGrpahicalCoinData(this.coinId, this.currency, this.days)
      .subscribe((data) => {
        setTimeout(() => {
          this.myLineChart.chart?.update();
        }, 200);
        this.lineChartData.datasets[0].data = data.prices.map((a: any) => {
          return a[1];
        });
        this.lineChartData.labels = data.prices.map((a: any) => {
          let date = new Date(a[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
              : `${date.getHours()}: ${date.getMinutes()} AM`;
          return this.days === 1 ? time : date.toLocaleDateString();
        });
      });
  }
}
