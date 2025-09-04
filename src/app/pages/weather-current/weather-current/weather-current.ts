import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Weather, WeatherBundle } from '../../../services/weather';

/**
 * Component responsible for displaying the current weather information.
 * Allows users to search for weather data by location, use their current location,
 * and toggle between light and dark themes.
 */
@Component({
  selector: 'app-weather-current',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './weather-current.html',
  styleUrls: ['./weather-current.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate('200ms ease-out')]),
      transition(':leave', [animate('150ms ease-in', style({ opacity: 0 }))])
    ])
  ]
})
export class WeatherCurrentComponent {
  private weatherSvc = inject(Weather);

  /**
   * Signal representing the current theme ('light' or 'dark').
   */
  theme = signal<'light' | 'dark'>('light');

  /**
   * Toggles the theme between 'light' and 'dark'.
   */
  toggleTheme() {
    this.theme.update(t => (t === 'light' ? 'dark' : 'light'));
  }

  /**
   * Signal representing the API key for the weather service.
   * Stored in localStorage for persistence.
   */
  apiKey = signal<string>(localStorage.getItem('weatherApiKey') || '');

  /**
   * Signal representing the user's search query for weather data.
   */
  query = signal<string>('');

  /**
   * Signal representing the loading state of the component.
   */
  loading = signal<boolean>(false);

  /**
   * Signal representing any error messages encountered during API calls.
   */
  error = signal<string | null>(null);

  /**
   * Signal representing the weather data fetched from the API.
   */
  data = signal<WeatherBundle | null>(null);

  /**
   * Computed signal indicating whether weather data is available.
   */
  hasData = computed(() => !!this.data());

  constructor() {
    if (this.apiKey()) {
      if (navigator.geolocation) {
        this.loading.set(true);
        navigator.geolocation.getCurrentPosition(
          (pos) => this.fetchByLatLng(pos.coords.latitude, pos.coords.longitude),
          () => this.loading.set(false),
          { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
        );
      }
    }

    // Automatically refresh weather data every 5 minutes.
    setInterval(() => {
      if (this.data()) {
        this.refresh();
      }
    }, 300000);
  }

  /**
   * Initializes the component. If an API key is present, fetches weather data
   * for the last known location or a default location.
   */
  ngOnInit() {
    if (!this.apiKey()) return;

    const lastLocation = localStorage.getItem('lastLocation');
    const defaultLocation = lastLocation || 'Medellín';
    this.getWeather(defaultLocation);
  }

  /**
   * Saves the provided API key and fetches weather data for a default location.
   * @param key The API key to save.
   */
  saveApiKey(key: string) {
    this.apiKey.set(key.trim());
    if (this.apiKey()) {
      localStorage.setItem('weatherApiKey', this.apiKey());
      this.error.set(null);
      this.getWeather('Medellín');
    }
  }

  /**
   * Searches for weather data based on the user's query.
   */
  search() {
    const q = this.query().trim();
    if (!q) return;
    this.getWeather(q);
  }

  /**
   * Refreshes the weather data for the current location.
   */
  refresh() {
    const d = this.data();
    if (d?.resolvedAddress) {
      this.getWeather(d.resolvedAddress);
    }
  }

  /**
   * Fetches weather data for the user's current geographic location.
   */
  useMyLocation() {
    if (!this.apiKey()) {
      this.error.set($localize`:@@wc.error.noApiKey:Please enter your API_KEY first`);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const location = `${latitude},${longitude}`;
        localStorage.setItem('lastLocation', location);
        this.getWeather(location);
      },
      () => {
        this.error.set($localize`:@@wc.error.noLocation:Could not get location`);
        this.loading.set(false);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
    );
  }

  /**
   * Fetches weather data for the specified location.
   * @param location The location to fetch weather data for.
   */
  private getWeather(location: string) {
    if (!this.apiKey()) {
      this.error.set($localize`:@@wc.error.noApiKey:Please enter your API_KEY first`);
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.weatherSvc.getByQuery(location, this.apiKey()).subscribe({
      next: (raw) => {
        this.data.set(this.weatherSvc.toBundle(raw));
        this.loading.set(false);
      },
      error: (e) => {
        if (e.status === 429) {
          this.error.set($localize`:@@wc.error.limit:⚠️ Maximum daily cost exceeded. Please create a Visual Crossing account and generate your own API Key.`);
        } else {
          this.error.set(e?.message ?? $localize`:@@wc.error.generic:Error`);
        }
        this.loading.set(false);
      }
    });
  }

  /**
   * Fetches weather data for the specified latitude and longitude.
   * @param lat The latitude of the location.
   * @param lng The longitude of the location.
   */
  private fetchByLatLng(lat: number, lng: number) {
    if (!this.apiKey()) {
      this.error.set($localize`:@@wc.error.noApiKey:Please enter your API_KEY first`);
      this.loading.set(false);
      return;
    }

    this.weatherSvc.getByLatLng(lat, lng, this.apiKey()).subscribe({
      next: (raw) => {
        this.data.set(this.weatherSvc.toBundle(raw));
        this.loading.set(false);
      },
      error: (e) => {
        if (e.status === 429) {
          this.error.set($localize`:@@wc.error.limit:⚠️ Maximum daily cost exceeded. Please create a Visual Crossing account and generate your own API Key.`);
        } else {
          this.error.set(e?.message ?? $localize`:@@wc.error.generic:Error`);
        }
        this.loading.set(false);
      }
    });
  }
}
