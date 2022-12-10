import { createAction, props } from "@ngrx/store";

export const getCurrentWeather = createAction('[Weather] Get current weather for current location', props<{long: string, lat: string}>());