import { Routes } from '@angular/router';
import { CoinListComponent } from './components/coin-list/coin-list.component';
import { CoinDetailComponent } from './components/coin-detail/coin-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'coin-list',
    pathMatch: 'full',
  },
  {
    path: 'coin-list',
    component: CoinListComponent,
  },
  {
    path: 'coin-detail',
    component: CoinDetailComponent,
  },
];
