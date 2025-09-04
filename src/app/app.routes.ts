import { Routes } from '@angular/router';
import { WeatherCurrentComponent } from './pages/weather-current/weather-current/weather-current';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'weather-current' },
  { path: 'weather-current', component: WeatherCurrentComponent, title: $localize`Weather` },
  { path: '**', redirectTo: 'weather-current' }
];
