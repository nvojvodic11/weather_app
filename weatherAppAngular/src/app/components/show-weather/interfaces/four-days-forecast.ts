export interface FourDaysForecast{
    city: string;
    temperatureData: TemperatureData[]
}

export interface TemperatureData{
    [key: string]: {
        averageTemp: number;
        maxTemp: number;
        minTemp: number;
    }
}
