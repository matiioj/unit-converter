import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnitConverterService } from './unit-converter.service';
import { UnitConverterComponent } from './unit-converter/unit-converter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, UnitConverterComponent], 
  template: `
    <div class="container">
      <app-unit-converter></app-unit-converter>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
  `]
})

export class AppComponent {
  unitTypes = ['Length', 'Weight', 'Temperature'];
  selectedUnitType = 'Length';
  value: number | null = null;
  fromUnit = '';
  toUnit = '';
  result: string | null = null;

  constructor(private unitConverterService: UnitConverterService) {}

  convert() {
    if (this.value === null || !this.fromUnit || !this.toUnit) {
      return;
    }

    this.unitConverterService.convert({
      value: this.value,
      fromUnitType: this.selectedUnitType,
      fromUnitName: this.fromUnit,
      toUnitType: this.selectedUnitType,
      toUnitName: this.toUnit
    }).subscribe(
      (result) => {
        this.result = `${this.value} ${this.fromUnit} = ${result} ${this.toUnit}`;
      },
      (error) => {
        console.error('Conversion error:', error);
        this.result = 'Error occurred during conversion';
      }
    );
  }

  reset() {
    this.value = null;
    this.fromUnit = '';
    this.toUnit = '';
    this.result = null;
  }
}