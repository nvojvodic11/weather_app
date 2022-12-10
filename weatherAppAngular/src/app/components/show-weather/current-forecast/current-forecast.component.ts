import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import { filter, takeUntil } from 'rxjs';
import { ContentDialogComponent } from '../../dialogs/content-dialog/content-dialog.component';
import { BaseComponent } from '../../utils/base-component';
import { CurrentWeather } from '../interfaces/current-weather';
import * as weatherPageActions from '../state/actions/show-weather.page-actions';
import * as  weatherSelect from '../state/actions/show-weather.select';

@Component({
  selector: 'app-current-forecast',
  templateUrl: './current-forecast.component.html',
  styleUrls: ['./current-forecast.component.scss']
})
export class CurrentForecastComponent extends BaseComponent implements OnInit {
  currentWeatherData: CurrentWeather;
  long: string;
  lat: string;

  constructor(private store: Store, private dialog: MatDialog) { 
    super();
  }

  ngOnInit(): void {
    this.getLocation();
    this.store.dispatch(weatherPageActions.getCurrentWeather({lat: this.lat, long: this.long}));
    this.store.select(weatherSelect.getCurrentWeather).pipe(
      filter(value => value.weather.id !== 0),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      console.log(value)
      this.currentWeatherData = value
    });
  }

  getLocation(): void{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getPosition, this.getPositionError);
    } else { 
      console.log("Geolocation is not supported by this browser.")
    }
  }

  getPosition = (position: any): void =>{
    this.long = position.coords.longitude;
    this.lat = position.coords.latitude;
    // console.log("Latitude: " + position.coords.latitude); 
    // console.log("<br>Longitude: " + position.coords.longitude);
  }

  getPositionError = (): void => {
    this.dialog.open(ContentDialogComponent, 
      {data: 
        {
          title: 'Error',
          message: 'Please allow location if you want to see weather data for current location!'
        }
      });
  };

}
