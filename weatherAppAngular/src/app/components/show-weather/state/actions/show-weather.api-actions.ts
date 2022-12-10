import { createAction, props } from "@ngrx/store";
import { CurrentWeather } from "../../interfaces/current-weather";

export const getCurrentWeatherSuccess = createAction('[Weather] Get current weather for current location success', props<{currentWeather: CurrentWeather}>());