export interface cityType {
  name: string;
  admin1: string;
  latitude: number;
  longitude: number;
  country_code: string;
}

interface forecastData {
  temperature: number;
  temperatureUnit: string;
  startTime: number;
  endTime: number;
  isDaytime: boolean;
}

export interface forecastType {
  properties: {
    periods: forecastData[];
  };
}
