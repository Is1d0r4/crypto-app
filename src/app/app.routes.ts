import { Routes } from '@angular/router';
import { CoinDetailComponent } from './components/coin-detail/coin-detail.component';
import { CoinListComponent } from './components/coin-list/coin-list.component';

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
    path: 'coin-detail/:id',
    component: CoinDetailComponent,
  },
];
