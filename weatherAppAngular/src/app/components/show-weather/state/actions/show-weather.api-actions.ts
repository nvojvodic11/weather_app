import { createAction, props } from "@ngrx/store";
import { CurrentWeather } from "../../interfaces/current-weather";
import { FourDaysForecast } from "../../interfaces/four-days-forecast";

export const getCurrentWeatherSuccess = createAction('[Weather] Get current weather for current location success', props<{currentWeather: CurrentWeather}>());
export const getFourDaysForecastSuccess = createAction('[Weather] Get four days forecast for current location success', props<{forecast: FourDaysForecast}>());
export const getLocationSuccess = createAction('[Weather] Get current location success', props<{lat: number, long: number, actionType: string}>());
export const actionFailed = createAction('[Weather] Action failed', props<{error: string}>());
