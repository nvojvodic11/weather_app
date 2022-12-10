import { CurrentWeather } from "../interfaces/current-weather"
import { FourDaysForecast } from "../interfaces/four-days-forecast";

export interface WeatherState{
    currentWeather: CurrentWeather;
    fourDaysForecast: FourDaysForecast;
}

export const CURRENT_WEATHER_STATE_DEFAULT: WeatherState = {
    currentWeather: {
        feels_like: 0,
        humidity: 0,
        pressure: 0,
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        city: '',
        weather: {
            description: '',
            icon: '',
            id: 0,
            main: ''
        }
    },
    fourDaysForecast: {
        city: '',
        temperatureData: []
    }
}
