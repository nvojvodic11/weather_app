import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
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
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
