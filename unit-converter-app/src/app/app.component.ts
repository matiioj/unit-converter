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
}