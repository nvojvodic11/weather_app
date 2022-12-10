import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentForecastComponent } from './components/show-weather/current-forecast/current-forecast.component';
import { FourDaysForecastComponent } from './components/show-weather/four-days-forecast/four-days-forecast.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContentDialogComponent } from './components/dialogs/content-dialog/content-dialog.component';
import { ProcessingDialogComponent } from './components/dialogs/processing-dialog/processing-dialog.component';
import { HttpErrorInterceptor } from './components/http-interceptor/http-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ShowWeatherEffect } from './components/show-weather/state/show-weather.effect';
import { weatherReducer } from './components/show-weather/state/show-weather.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CurrentForecastComponent,
    FourDaysForecastComponent,
    PageNotFoundComponent,
    ContentDialogComponent,
    ProcessingDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    CommonModule,
    MatTabsModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    StoreModule.forRoot({}), 
    StoreModule.forFeature('weather', weatherReducer),
    EffectsModule.forRoot([ShowWeatherEffect])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
