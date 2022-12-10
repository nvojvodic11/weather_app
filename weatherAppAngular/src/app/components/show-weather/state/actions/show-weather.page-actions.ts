import { createAction, props } from "@ngrx/store";

export const getCurrentWeather = createAction('[Weather] Get current weather for current location', props<{long: number, lat: number}>());
export const getFourDaysForecast = createAction('[Weather] Get four days forecast for current location', props<{long: number, lat: number}>());
export const getLocation = createAction('[Weather] Get current location', props<{actionType: string}>());
