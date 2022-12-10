import { Injectable } from "@angular/core";
import { CurrentWeather } from "../interfaces/current-weather";
import { Weather } from "../interfaces/weather";
import * as moment from 'moment';
import { ArrayUtilsService } from "../../utils/array-utils.service";
import { FourDaysForecast, TemperatureData } from "../interfaces/four-days-forecast";

@Injectable({
    providedIn: 'root'
})
export class FourDaysForecastFactory{

    constructor(private arrayUtils: ArrayUtilsService){}

    /**
     * Get average temperature for each day
     * @param data - forecast data from openWeather API
     * @param city - forecast for this city
     */
    getTemperatureDataForEachDay(data: any, city: string): FourDaysForecast{
        // Format date so we can group them values easly
        data.map((value: any) => value.dt_txt = moment(value.dt_txt).format('DD.MM.YYYY'));
        data = this.arrayUtils.groupByKey(data, 'dt_txt');
        const forecastArray = this.getDisplayDataForEachDay(data);
        return {
            city,
            temperatureData: forecastArray
        };
    };

    /**
     * Get avrege temperature, minimum and maximum temperature for each day
     * @param forecastObject - object of data group by date
     * @returns 
     */
    getDisplayDataForEachDay(forecastObject: any): TemperatureData[]{
        let sum = 0;
        let counter = 0;
        let maxTemp;
        let minTemp;
        const avregeTempForecastArray = [];
        const dates = Object.keys(forecastObject);

        for(let date of dates){
            maxTemp = forecastObject[date][0].main.temp_max;
            minTemp = forecastObject[date][0].main.temp_min;

            for(let forecast of forecastObject[date]){
                sum += forecast.main.temp
                counter++;
                maxTemp = maxTemp > forecast.main.temp_max ? maxTemp : forecast.main.temp_max;
                minTemp = minTemp < forecast.main.temp_min ? minTemp : forecast.main.temp_min;
            }

            avregeTempForecastArray.push({
                [date]:{
                    averageTemp: Math.round(sum/counter),
                    maxTemp,
                    minTemp
                }
            });
            
            //restart values
            sum = 0;
            counter = 0;
        }
        return avregeTempForecastArray;
    }
}
