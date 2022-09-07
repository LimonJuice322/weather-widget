export interface LocationInterface {
  city: string,
  country: string
}

export interface WeatherInterface {
  main: {
    temp: number,
    feels_like: number,
    description: string,
    icon: string,
  }
  info: {
    humidity: number,
    wind: number,
    wind_rotation: number,
    pressure: number,
    visibility: number,
  },
  location: {
    city: string,
    country: string,
  }
}

export interface SwapLocations {
  oldIndex: number,
  newIndex: number,
}
