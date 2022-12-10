import { Injectable } from "@angular/core";
import { MatInkBar } from "@angular/material/tabs";
import { CurrentWeather } from "../interfaces/current-weather";
import { Weather } from "../interfaces/weather";

@Injectable({
    providedIn: 'root'
})
export class CurrentWeatherFactory{

    /**
     * We should only save temperature for current date and info about weather from data that we get from openWeather API
     * @param data - data from openWeather API
     */
    getTemperatureFromCurrentWeather(data: any): CurrentWeather{
        return {
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            temp: data.main.temp,
            temp_max: data.main.temp_max,
            temp_min: data.main.temp_min,
            weather: this.getWeatherData(data.weather[0])
        };
    }

    /**
     * Get weather info
     * @param weatherArray - array that contains required information
     * @returns 
     */
    getWeatherData(weatherArray: Weather): Weather{
        return {
            id: weatherArray.id,
            description: weatherArray.description,
            icon: weatherArray.icon,
            main: weatherArray.main
        };
    }
}