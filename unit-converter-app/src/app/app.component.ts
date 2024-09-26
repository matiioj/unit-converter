import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UnitConverterComponent } from './unit-converter/unit-converter.component';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, UnitConverterComponent, RouterModule, RouterLink, RouterLinkActive], 
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
}