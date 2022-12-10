import { createFeatureSelector, createSelector } from "@ngrx/store";
import { WeatherState } from "../show-weather.state";

export const STATE_NAME = 'weather';
const FEATURE_STATE = createFeatureSelector<WeatherState>(STATE_NAME);

export const getCurrentWeather = createSelector(FEATURE_STATE, state => state.currentWeather);
export const getFourDaysForecast = createSelector(FEATURE_STATE, state => state.fourDaysForecast);