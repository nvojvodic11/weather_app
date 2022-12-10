import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourDaysForecastComponent } from './four-days-forecast.component';

describe('FourDaysForecastComponent', () => {
  let component: FourDaysForecastComponent;
  let fixture: ComponentFixture<FourDaysForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourDaysForecastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourDaysForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
