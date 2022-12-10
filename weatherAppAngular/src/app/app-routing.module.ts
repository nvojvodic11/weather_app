import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentForecastComponent } from './components/show-weather/current-forecast/current-forecast.component';
import { FourDaysForecastComponent } from './components/show-weather/four-days-forecast/four-days-forecast.component';

const routes: Routes = [
  {
    path: '',
    component: CurrentForecastComponent
  },
  {
    path: 'four-days',
    component: FourDaysForecastComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
