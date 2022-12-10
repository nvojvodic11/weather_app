import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '../../utils/base-component';
import {Store} from '@ngrx/store';
import * as weatherPageActions from '../state/actions/show-weather.page-actions';
import * as  weatherSelect from '../state/actions/show-weather.select';
import { FourDaysForecast, TemperatureData } from '../interfaces/four-days-forecast';
import { filter, takeUntil } from 'rxjs';
import { DialogTypeEnum } from '../../dialogs/dialog-type.enum';
import { ProcessingDialogComponent } from '../../dialogs/processing-dialog/processing-dialog.component';

@Component({
  selector: 'app-four-days-forecast',
  templateUrl: './four-days-forecast.component.html',
  styleUrls: ['./four-days-forecast.component.scss', '../../../app.component.scss']
})
export class FourDaysForecastComponent extends BaseComponent implements OnInit {
  forecastData: FourDaysForecast;
  dates: Array<string> = [];

  constructor(private store: Store, private dialog: MatDialog) { 
    super();
  }

  ngOnInit(): void {
    this.dialog.open(ProcessingDialogComponent, {id: DialogTypeEnum.PROCESSING});
    this.store.dispatch(weatherPageActions.getLocation({actionType: 'forecast'}));
    this.store.select(weatherSelect.getFourDaysForecast).pipe(
      filter(value => value.temperatureData.length > 0),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.forecastData = value;
      this.getAllDates(value.temperatureData);
    });
  }

  getAllDates(arrayOfTemperatureObjects: TemperatureData[]): void{
      for(let item of arrayOfTemperatureObjects){
        this.dates.push(Object.keys(item)[0]);
      }
  }

}
