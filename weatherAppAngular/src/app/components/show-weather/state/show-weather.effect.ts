import { Injectable } from "@angular/core";
import { ShowWeatherService } from "../service/show-weather-service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs";
import * as weatherPageActions from './actions/show-weather.page-actions';
import * as weatherApiActions from './actions/show-weather.api-actions';
import { CurrentWeather } from "../interfaces/current-weather";

@Injectable({
    providedIn: 'root'
})
export class ShowWeatherEffect {

    constructor(
        private actions$: Actions,
        private store: Store,
        private weatherService: ShowWeatherService){}

    getAllHeroesEffect$ = createEffect(
        () => this.actions$.pipe(
            ofType(weatherPageActions.getCurrentWeather),
            switchMap((action) => {
                return this.weatherService.getCurrentForeacast(action.lat, action.long).pipe(
                    map((result: CurrentWeather) => {
                        result.temp
                            ? this.store.dispatch(weatherApiActions.getCurrentWeatherSuccess({currentWeather: result}))
                            : ''
                    })
                )

                // return this.heroesService.getAllHeroes()
                // .pipe(
                //     map((result) => {
                //         // this.dialogService.close(DialogTypeEnum.PROCESSING);
                //         result
                //             ? this.store.dispatch(heroesApiAction.getAllHeroesSuccessfull({heroes: result}))
                //             : this.store.dispatch(heroesApiAction.actionFailed())
                //     })
                // );
            })
        ), {dispatch: false}
    );
}