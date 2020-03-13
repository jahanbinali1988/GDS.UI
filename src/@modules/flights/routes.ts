import { Route } from '@angular/router';
import { HomeComponent } from 'FlightPages/home/home.component';


export const flightsRoutes: Route[] = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
];
