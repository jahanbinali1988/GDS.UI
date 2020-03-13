export class AirlineRoute {
    Id: number;
    ParentId: number;
    IsDirect: boolean;
    AirlineId: number;
    FromAirportId: number;
    ToAirportId: number;
    Duration: number;
    Sequence: number;
    IsDeleted: boolean;
    IsDisabled: boolean;

    AirlineCaption: string;
    FromAirportCaption: string;
    ToAirportCaption: string;
}
