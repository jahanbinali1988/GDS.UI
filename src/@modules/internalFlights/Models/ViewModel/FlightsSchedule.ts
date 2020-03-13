import { Time } from '@angular/common';

export class FlightsSchedule {
    Id: number;
    AirlineRouteId: number;
    StartDate: Date;
    StopDate: Date;
    FlightNumber: number;
    DepartureTime: Time;
    ArrivalTime: Time;
    IsDeleted: boolean;
    IsDisabled: boolean;

    StartDateCaption: string;
    StopDateCaption: string;
    AirlineRouteCaption: string;
}
