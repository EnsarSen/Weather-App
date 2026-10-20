export interface cityType {
  name: string;
  admin1: string;
  latitude: number;
  longitude: number;
}

interface forecastData {
    temperature: number,
    temperatureUnit: string,
    startTime: number,
    isDaytime: boolean
}

export interface forecastType {
  properties: {
    periods: forecastData[];
  };
}
