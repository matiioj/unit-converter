import { Routes } from '@angular/router';
import { ResultPageComponent } from './result-page/result-page.component';
import { UnitConverterComponent } from './unit-converter/unit-converter.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: UnitConverterComponent },
  { path: 'result', component: ResultPageComponent },
  { path: '**', redirectTo: '' }  
];
