import { Injectable } from "@angular/core";
import { ShowWeatherService } from "../service/show-weather-service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs";
import * as weatherPageActions from './actions/show-weather.page-actions';
import * as weatherApiActions from './actions/show-weather.api-actions';
import { CurrentWeather } from "../interfaces/current-weather";
import { MatDialog } from "@angular/material/dialog";
import { ContentDialogComponent } from "../../dialogs/content-dialog/content-dialog.component";
import { DialogTypeEnum } from "../../dialogs/dialog-type.enum";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ShowWeatherEffect {

    ERROR = 'Error';

    constructor(
        private actions$: Actions,
        private router: Router,
        private store: Store,
        private dialog: MatDialog,
        private weatherService: ShowWeatherService){}

    getCurrentWeatherEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType(weatherPageActions.getCurrentWeather),
            switchMap((action) => {
                return this.weatherService.getCurrentForeacast(action.lat, action.long).pipe(
                    map((result: CurrentWeather) => {
                        result
                            ? this.store.dispatch(weatherApiActions.getCurrentWeatherSuccess({currentWeather: result}))
                            : ''
                    })
                );
            })
        ), {dispatch: false}
    );

    getFourDaysForecastEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType(weatherPageActions.getFourDaysForecast),
            switchMap((action) => {
                return this.weatherService.getFourDaysForecast(action.lat, action.long).pipe(
                    map((result: any) => {
                        result
                            ? this.store.dispatch(weatherApiActions.getFourDaysForecastSuccess({forecast: result}))
                            : ''
                    })
                );
            })
        ), {dispatch: false}
    );
    
    getLocationEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType(weatherPageActions.getLocation),
            map((action) => {
                this.weatherService.getLocation().then((value: any) => {
                    value.coords
                    ? this.store.dispatch(weatherApiActions.getLocationSuccess({lat: value.coords.latitude, long: value.coords.longitude, actionType: action.actionType}))
                    : this.store.dispatch(weatherApiActions.actionFailed({error: value.message}));
                });
            })
        ), {dispatch: false}
    );

    getLocationSuccessEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType(weatherApiActions.getLocationSuccess),
            map((action) => {
                    this.dialog.getDialogById(DialogTypeEnum.PROCESSING)?.close();
                    return action.actionType === 'currentWeather'
                    ? weatherPageActions.getCurrentWeather({lat: action.lat, long: action.long})
                    : weatherPageActions.getFourDaysForecast({lat: action.lat, long: action.long})
                }
            ))
                
    );

    actionFailedEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType(weatherApiActions.actionFailed),
            map((action) => {
                this.dialog.getDialogById(DialogTypeEnum.PROCESSING)?.close();
                this.dialog.open(ContentDialogComponent, this.weatherService.getDialogRefData(this.ERROR, action.error)).afterClosed().subscribe(
                    value => this.router.navigateByUrl('/404')
                );
            })
        ), {dispatch: false}
    );
}
