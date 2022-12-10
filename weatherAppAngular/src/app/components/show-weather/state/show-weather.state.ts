import { CurrentWeather } from "../interfaces/current-weather"

export interface WeatherState{
    currentWeather: CurrentWeather;
}

export const CURRENT_WEATHER_STATE_DEFAULT: WeatherState = {
    currentWeather: {
        feels_like: 0,
        humidity: 0,
        pressure: 0,
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        weather: {
            description: '',
            icon: '',
            id: 0,
            main: ''
        }
    }
}
