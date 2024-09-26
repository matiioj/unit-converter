import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnitConverterService } from '../unit-converter.service';

@Component({
  selector: 'app-unit-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit-converter.component.html',
  styleUrls: ['./unit-converter.component.css']
})
export class UnitConverterComponent {
  // Define unitType as a union of specific keys
  unitType: 'Length' | 'Weight' | 'Temperature' = 'Temperature';

  value: number | null = null;
  fromUnit: string = '';
  toUnit: string = '';
  result: string = '';

  // Define the enums for UnitType and UnitName
  unitTypes = {
    Length: 0,
    Weight: 1,
    Temperature: 2
  };

  lengthUnits = {
    Millimeter: 0,
    Centimeter: 1,
    Meter: 2,
    Kilometer: 3,
    Inch: 4,
    Foot: 5,
    Yard: 6,
    Mile: 7
  };

  weightUnits = {
    Milligram: 8,
    Gram: 9,
    Kilogram: 10,
    Ounce: 11,
    Pound: 12
  };

  temperatureUnits = {
    Celsius: 13,
    Fahrenheit: 14,
    Kelvin: 15
  };

  constructor(private unitConverterService: UnitConverterService) {}

  getUnits(): string[] {
    switch (this.unitType) {
      case 'Length':
        return Object.keys(this.lengthUnits);
      case 'Weight':
        return Object.keys(this.weightUnits);
      case 'Temperature':
        return Object.keys(this.temperatureUnits);
      default:
        return [];
    }
  }

  convert() {
    if (this.value === null || !this.fromUnit || !this.toUnit) {
      this.result = 'Please fill in all fields';
      return;
    }

    // Map the unit type and unit name to integers as per the schema
    const request = {
      value: this.value,
      fromUnitType: this.unitTypes[this.unitType], // Enum for UnitType
      fromUnitName: this.getUnitEnum(this.fromUnit), // Enum for UnitName
      toUnitType: this.unitTypes[this.unitType], // Enum for UnitType
      toUnitName: this.getUnitEnum(this.toUnit) // Enum for UnitName
    };

    this.unitConverterService.convert(request).subscribe({
      next: (response: number) => {
        this.result = `${this.value} ${this.fromUnit} = ${response} ${this.toUnit}`;
      },
      error: (err: any) => {
        console.log(request);
        console.error('Conversion error:', err);
        this.result = 'Error occurred during conversion';
      },
      complete: () => {
        console.log('Conversion completed');
      }
    });
  }

  // Helper method to get the unit enum based on unit type
  getUnitEnum(unit: string): number {
    switch (this.unitType) {
      case 'Length':
        return this.lengthUnits[unit as keyof typeof this.lengthUnits];
      case 'Weight':
        return this.weightUnits[unit as keyof typeof this.weightUnits];
      case 'Temperature':
        return this.temperatureUnits[unit as keyof typeof this.temperatureUnits];
      default:
        throw new Error('Invalid unit type');
    }
  }
  
}
