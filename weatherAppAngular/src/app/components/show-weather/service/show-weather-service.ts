import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { API_KEY } from "../../utils/api-key";
import { CurrentWeatherFactory } from "./current-weather.factory";
import { map, Observable } from "rxjs";
import { CurrentWeather } from "../interfaces/current-weather";
import { DialogRefData } from "../../dialogs/interfaces/dialogRefData";
import { FourDaysForecastFactory } from "./four-days-forecast.factory";
import { FourDaysForecast } from "../interfaces/four-days-forecast";

@Injectable({
    providedIn: 'root'
})
export class ShowWeatherService{
    private readonly GET_CURRENT_FORECAST = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={APIKey}&units=metric';
    private readonly GET_FOUR_DAYS_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={APIKey}&cnt=32&units=metric';

    constructor(
        private httpClient: HttpClient,
        private currentWeatherFactory: CurrentWeatherFactory,
        private fourDaysForecastFactory: FourDaysForecastFactory){}
 
    /**
     * Get weather data for current day
     * @param lat - latitude of location
     * @param long - longitude of location
     * @returns 
     */
    getCurrentForeacast(lat: number, long: number): Observable<any>{
        const url = this.GET_CURRENT_FORECAST.replace('{APIKey}', API_KEY).replace('{lat}', lat.toString()).replace('{lon}', long.toString());
        return this.httpClient.get<CurrentWeather>(url).pipe(
            map((value: any) => this.currentWeatherFactory.getTemperatureFromCurrentWeather(value))
        );
    }

    /**
     * Get four days forecast for required location
     * @param lat - latitude of location
     * @param long - longitude of location
     * @returns 
     */
    getFourDaysForecast(lat: number, long: number): Observable<FourDaysForecast>{
        const url = this.GET_FOUR_DAYS_FORECAST.replace('{APIKey}', API_KEY).replace('{lat}', lat.toString()).replace('{lon}', long.toString());
        return this.httpClient.get<any>(url).pipe(
            map(value => this.fourDaysForecastFactory.getTemperatureDataForEachDay(value.list, value.city.name))
        );
    }

    /**
     * Get location from browser
     * @returns 
     */
    async getLocation(): Promise<GeolocationPosition | GeolocationPositionError>{
        let returnVal: any;

        await this.getPosition()
        .then((value: GeolocationPosition) => returnVal = value)
        .catch((error: GeolocationPositionError) => returnVal = error);

        return returnVal;
    }
    
      /**
       * Get coordiantes for location or return any error that occurs
       * @returns 
       */
    getPosition(): Promise<any>{
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
        });
    }

    /**
     * Get data for content dialog
     * @param title - dialog title
     * @param message - dialog message
     * @returns 
     */
    getDialogRefData(title: string, message: string): DialogRefData{
        return {
            data:{
                title,
                message
            }
        };
    }
}
