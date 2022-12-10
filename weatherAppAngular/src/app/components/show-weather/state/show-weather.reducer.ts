import { WeatherState, CURRENT_WEATHER_STATE_DEFAULT } from "./show-weather.state";
import { createReducer, on } from "@ngrx/store";
import * as weatherApiActions from './actions/show-weather.api-actions'; 

export const weatherReducer = createReducer<WeatherState>(
    CURRENT_WEATHER_STATE_DEFAULT,
    on(weatherApiActions.getCurrentWeatherSuccess, (state, action): WeatherState => {
        return{
            ...state,
            currentWeather: action.currentWeather
        }
    }),
    on(weatherApiActions.getFourDaysForecastSuccess, (state, action): WeatherState => {
        return{
            ...state,
            fourDaysForecast: action.forecast
        }
    })
);
