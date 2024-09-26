import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-page',
  standalone: true,
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent {
  value: number | null = null;
  fromUnit: string = '';
  toUnit: string = '';
  result: string = '';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { value: number; fromUnit: string; toUnit: string; result: string };

    if (state) {
      this.value = state.value;
      this.fromUnit = state.fromUnit;
      this.toUnit = state.toUnit;
      this.result = state.result;
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
