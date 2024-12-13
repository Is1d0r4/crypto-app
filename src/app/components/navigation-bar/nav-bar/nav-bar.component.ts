import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CurrencyService } from '../../../service/currency.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoinListComponent } from '../../coin-list/coin-list.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CoinListComponent,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  selectedCurrency: string = 'EUR';

  constructor(private service: CurrencyService, private router: Router) {}

  sendCurrency(currency: string) {
    this.service.setCurrency(currency);
  }

  goToHome() {
    this.router.navigate(['home']);
  }
}
