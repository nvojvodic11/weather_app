import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentForecastComponent } from './components/show-weather/current-forecast/current-forecast.component';

const routes: Routes = [
  {
    path: '',
    component: CurrentForecastComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
