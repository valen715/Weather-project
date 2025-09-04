import { Injectable, inject, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Interface representing the current weather conditions.
 */
export interface CurrentConditions {
  temp: number;
  windspeed: number;
  precipprob?: number;
  conditions?: string;
  datetime?: string;
}

/**
 * Interface representing a single hourly weather record.
 */
export interface HourRecord {
  datetime: string;
  temp?: number;
  precipprob?: number;
  conditions?: string;
}

/**
 * Interface representing a structured weather data bundle.
 */
export interface WeatherBundle {
  resolvedAddress?: string;
  timezone?: string;
  currentConditions?: CurrentConditions;
  hoursPrev24: HourRecord[];
  hoursNext24: HourRecord[];
}

/**
 * Injectable Angular service for interacting with the Visual Crossing Weather API.
 * Provides methods to fetch weather data by location query or geographic coordinates.
 */
@Injectable({ providedIn: 'root' })
export class Weather {
  private http = inject(HttpClient);
  private localeId = inject(LOCALE_ID);
  private baseUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

  /**
   * Calculates the start and end dates for a 48-hour range (24 hours before and after the current time).
   * @returns An object containing the start and end dates in ISO 8601 format.
   */
  private rangeDates(): { start: string; end: string } {
    const now = new Date();
    const start = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const end = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const iso = (d: Date) => d.toISOString().slice(0, 19);
    return { start: iso(start), end: iso(end) };
  }

  /**
   * Fetches weather data for a given location query (e.g., city name, address).
   * @param query The location query string.
   * @param apiKey The API key for authenticating with the Visual Crossing Weather API.
   * @returns An observable containing the raw weather data response.
   */
  getByQuery(query: string, apiKey: string) {
    const { start, end } = this.rangeDates();
    const url = `${this.baseUrl}/${encodeURIComponent(query)}/${start}/${end}?unitGroup=metric&lang=es&key=${apiKey}&contentType=json`;
    return this.http.get<any>(url);
  }

  /**
   * Fetches weather data for a given geographic location (latitude and longitude).
   * @param lat The latitude of the location.
   * @param lng The longitude of the location.
   * @param apiKey The API key for authenticating with the Visual Crossing Weather API.
   * @returns An observable containing the raw weather data response.
   */
  getByLatLng(lat: number, lng: number, apiKey: string) {
    const { start, end } = this.rangeDates();
    const url = `${this.baseUrl}/${lat},${lng}/${start}/${end}?unitGroup=metric&lang=es&key=${apiKey}&contentType=json`;
    return this.http.get<any>(url);
  }

  /**
   * Converts raw weather data from the API into a structured `WeatherBundle` object.
   * @param raw The raw weather data response from the API.
   * @returns A `WeatherBundle` object containing structured weather data.
   */
  toBundle(raw: any): WeatherBundle {
    const hours: any[] =
      raw?.days?.flatMap((d: any) =>
        (d?.hours ?? []).map((h: any) => ({ ...h, date: d.datetime }))
      ) ?? [];

    const now = new Date();
    const split = now.getTime();
    const toMillis = (dt: string) => new Date(dt).getTime();

    const hoursSorted: HourRecord[] = hours
      .map(h => ({
        datetime: (h.datetimeEpoch ? new Date(h.datetimeEpoch * 1000).toISOString() : h.datetime),
        temp: h.temp ?? h.tempC,
        precipprob: h.precipprob,
        conditions: h.conditions
      }))
      .sort((a, b) => toMillis(a.datetime) - toMillis(b.datetime));

    const prev24 = hoursSorted.filter(h => toMillis(h.datetime) <= split).slice(-24);
    const next24 = hoursSorted.filter(h => toMillis(h.datetime) > split).slice(0, 24);

    return {
      resolvedAddress: raw?.resolvedAddress,
      timezone: raw?.timezone,
      currentConditions: raw?.currentConditions,
      hoursPrev24: prev24,
      hoursNext24: next24
    };
  }
}
