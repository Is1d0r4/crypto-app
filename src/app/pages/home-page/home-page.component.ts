import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { CoinListComponent } from '../../components/coin-list/coin-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BannerComponent, CoinListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
