import { Routes } from '@angular/router';
import { CoinDetailComponent } from './components/coin-detail/coin-detail.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'coin-detail/:id',
    component: CoinDetailComponent,
  },
];
