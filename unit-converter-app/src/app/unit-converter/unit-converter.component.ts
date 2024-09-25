import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnitConverterService } from '../unit-converter.service';

@Component({
  selector: 'app-unit-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Unit Converter</h1>
    <div class="converter-form">
      <div class="radio-group">
        <label><input type="radio" [(ngModel)]="unitType" value="Length"> Length</label>
        <label><input type="radio" [(ngModel)]="unitType" value="Weight"> Weight</label>
        <label><input type="radio" [(ngModel)]="unitType" value="Temperature"> Temperature</label>
      </div>
      <input type="number" [(ngModel)]="value" placeholder="Enter the value to convert" required>
      <select [(ngModel)]="fromUnit">
        <option value="">Unit to Convert from</option>
        <option *ngFor="let unit of getUnits()" [value]="unit">{{unit}}</option>
      </select>
      <select [(ngModel)]="toUnit">
        <option value="">Unit to Convert to</option>
        <option *ngFor="let unit of getUnits()" [value]="unit">{{unit}}</option>
      </select>
      <button (click)="convert()">Convert</button>
      <p>{{result}}</p>
    </div>
  `,
  styles: [`
    h1 {
      color: #333;
      text-align: center;
    }
    .converter-form {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .radio-group {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }
    input[type="number"], select {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #45a049;
    }
  `]
})
export class UnitConverterComponent {
  unitType: string = 'Temperature';
  value: number | null = null;
  fromUnit: string = '';
  toUnit: string = '';
  result: string = '';

  constructor(private unitConverterService: UnitConverterService) {}

  getUnits(): string[] {
    switch (this.unitType) {
      case 'Length':
        return ['Millimeter', 'Centimeter', 'Meter', 'Kilometer', 'Inch', 'Foot', 'Yard', 'Mile'];
      case 'Weight':
        return ['Milligram', 'Gram', 'Kilogram', 'Ounce', 'Pound'];
      case 'Temperature':
        return ['Celsius', 'Fahrenheit', 'Kelvin'];
      default:
        return [];
    }
  }

  convert() {
    if (this.value === null || !this.fromUnit || !this.toUnit) {
      this.result = 'Please fill in all fields';
      return;
    }

    const request = {
      value: this.value,
      fromUnitType: this.unitType,
      fromUnitName: this.fromUnit,
      toUnitType: this.unitType,
      toUnitName: this.toUnit
    };

    this.unitConverterService.convert(request).subscribe({
      next: (response: number) => {
        this.result = `${this.value} ${this.fromUnit} = ${response} ${this.toUnit}`;
      },
      error: (err: any) => {
        console.error('Conversion error:', err);
        this.result = 'Error occurred during conversion';
      },
      complete: () => {
        console.log('Conversion completed');
      }
    });
  }
}