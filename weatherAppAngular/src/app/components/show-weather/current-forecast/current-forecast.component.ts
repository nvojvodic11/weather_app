import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import { filter, takeUntil } from 'rxjs';
import { BaseComponent } from '../../utils/base-component';
import { CurrentWeather } from '../interfaces/current-weather';
import * as weatherPageActions from '../state/actions/show-weather.page-actions';
import * as  weatherSelect from '../state/actions/show-weather.select';
import * as moment from "moment";
import { ProcessingDialogComponent } from '../../dialogs/processing-dialog/processing-dialog.component';
import { DialogTypeEnum } from '../../dialogs/dialog-type.enum';

@Component({
  selector: 'app-current-forecast',
  templateUrl: './current-forecast.component.html',
  styleUrls: ['./current-forecast.component.scss', '../../../app.component.scss']
})
export class CurrentForecastComponent extends BaseComponent implements OnInit {
  currentWeatherData: CurrentWeather;
  currentDate = moment().format('DD.MM.YYYY');

  constructor(private store: Store, private dialog: MatDialog) { 
    super();
  }

  ngOnInit(): void {
    this.dialog.open(ProcessingDialogComponent, {id: DialogTypeEnum.PROCESSING});
    this.store.dispatch(weatherPageActions.getLocation({actionType: 'currentWeather'}));
    this.store.select(weatherSelect.getCurrentWeather).pipe(
      filter(value => value.weather.id !== 0),
      takeUntil(this.destroy$)
    ).subscribe(value => this.currentWeatherData = value);
  }

}
