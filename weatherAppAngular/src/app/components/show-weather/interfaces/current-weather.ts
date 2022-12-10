import { Weather } from "./weather";

export interface CurrentWeather{
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
    weather: Weather
}
