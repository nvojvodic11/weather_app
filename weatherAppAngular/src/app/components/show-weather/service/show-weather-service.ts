import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { API_KEY } from "../../utils/api-key";
import { CurrentWeatherFactory } from "./current-weather.factory";
import { map, Observable } from "rxjs";
import { CurrentWeather } from "../interfaces/current-weather";

@Injectable({
    providedIn: 'root'
})
export class ShowWeatherService{
    private readonly GET_CURRENT_FORECAST = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={APIKey}';

    constructor(private httpClient: HttpClient, private currentWeatherFactory: CurrentWeatherFactory){}
 
    getCurrentForeacast(lat: string, long: string): Observable<any>{
        // const url = this.GET_CURRENT_FORECAST.replace('{APIKey}', API_KEY).replace('{lat}', '47.373878').replace('{lon}', '8.545094');
        const url = this.GET_CURRENT_FORECAST.replace('{APIKey}', API_KEY).replace('{lat}', lat).replace('{lon}', long);
        return this.httpClient.get<CurrentWeather>(url).pipe(
            map((value: any) => this.currentWeatherFactory.getTemperatureFromCurrentWeather(value))
        );
    }
}