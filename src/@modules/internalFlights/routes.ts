import { Route } from '@angular/router';
import { HomeComponent } from 'internalFlightsPages/home/home.component';
import { AirlineHolderListComponent } from 'internalFlightsPages/airlineHolder/airline-holder-list/airline-holder-list.component';
import { AirlineHolderManageComponent } from 'internalFlightsPages/airlineHolder/airline-holder-manage/airline-holder-manage.component';
import { AirlineManageComponent } from 'internalFlightsPages/airline/airline-manage/airline-manage.component';
import { AirlineListComponent } from 'internalFlightsPages/airline/airline-list/airline-list.component';
import { LocationListComponent } from 'internalFlightsPages/location/location-list/location-list.component';
import { LocationManageComponent } from 'internalFlightsPages/location/location-manage/location-manage.component';
import { AirportListComponent } from 'internalFlightsPages/airport/airport-list/airport-list.component';
import { AirportManageComponent } from 'internalFlightsPages/airport/airport-manage/airport-manage.component';
import { AircraftListComponent } from 'internalFlightsPages/aircraft/aircraft-list/aircraft-list.component';
import { AircraftManageComponent } from 'internalFlightsPages/aircraft/aircraft-manage/aircraft-manage.component';
import { FareTypeListComponent } from 'internalFlightsPages/fareType/fare-type-list/fare-type-list.component';
import { FareTypeManageComponent } from 'internalFlightsPages/fareType/fare-type-manage/fare-type-manage.component';
import { AirlineFareTypeListComponent } from 'internalFlightsPages/airlineFareType/airline-fare-type-list/airline-fare-type-list.component';
import { AirlineFareTypeManageComponent } from 'internalFlightsPages/airlineFareType/airline-fare-type-manage/airline-fare-type-manage.component';
import { TravellerTypeListComponent } from 'internalFlightsPages/travellerType/traveller-type-list/traveller-type-list.component';
import { TravellerTypeManageComponent } from 'internalFlightsPages/travellerType/traveller-type-manage/traveller-type-manage.component';
import { CurrencyListComponent } from 'internalFlightsPages/currency/currency-list/currency-list.component';
import { CurrencyManageComponent } from 'internalFlightsPages/currency/currency-manage/currency-manage.component';
import { CabinClassTypeListComponent } from 'internalFlightsPages/cabinClassType/cabin-class-type-list/cabin-class-type-list.component';
import { CabinClassTypeManageComponent } from 'internalFlightsPages/cabinClassType/cabin-class-type-manage/cabin-class-type-manage.component';
import { AirlineRouteListComponent } from 'internalFlightsPages/airlineRoute/airline-route-list/airline-route-list.component';
import { AirlineRouteManageComponent } from 'internalFlightsPages/airlineRoute/airline-route-manage/airline-route-manage.component';
import { CabinClassListComponent } from 'internalFlightsPages/cabinClass/cabin-class-list/cabin-class-list.component';
import { CabinClassManageComponent } from 'internalFlightsPages/cabinClass/cabin-class-manage/cabin-class-manage.component';
import { FlightListComponent } from 'internalFlightsPages/flight/flight-list/flight-list.component';
import { FlightManageComponent } from 'internalFlightsPages/flight/flight-manage/flight-manage.component';
import { FlightScheduleListComponent } from 'internalFlightsPages/flightSchedule/flight-schedule-list/flight-schedule-list.component';
import { FlightScheduleManageComponent } from 'internalFlightsPages/flightSchedule/flight-schedule-manage/flight-schedule-manage.component';
import { BaggageUnitListComponent } from 'internalFlightsPages/BaggageUnit/baggage-unit-list/baggage-unit-list.component';
import { BaggageUnitManageComponent } from 'internalFlightsPages/BaggageUnit/baggage-unit-manage/baggage-unit-manage.component';
import { CabinClassActionTypeListComponent } from 'internalFlightsPages/cabinClassActionType/cabin-class-action-type-list/cabin-class-action-type-list.component';
import { CabinClassActionTypeManageComponent } from 'internalFlightsPages/cabinClassActionType/cabin-class-action-type-manage/cabin-class-action-type-manage.component';
import { UserListComponent } from 'internalFlightsPages/user/user-list/user-list.component';
import { UserManageComponent } from 'internalFlightsPages/user/user-manage/user-manage.component';
import { SeoFlightContentListComponent } from 'internalFlightsPages/seoFlightContent/seo-flight-content-list/seo-flight-content-list.component';
import { SeoFlightContentManageComponent } from 'internalFlightsPages/seoFlightContent/seo-flight-content-manage/seo-flight-content-manage.component';
import { ReserveStatusListComponent } from 'internalFlightsPages/reserveStatus/reserve-status-list/reserve-status-list.component';
import { ReserveStatusManageComponent } from 'internalFlightsPages/reserveStatus/reserve-status-manage/reserve-status-manage.component';
import { SpecialServiceRequestListComponent } from 'internalFlightsPages/specialServiceRequest/special-service-request-list/special-service-request-list.component';
import { SpecialServiceRequestManageComponent } from 'internalFlightsPages/specialServiceRequest/special-service-request-manage/special-service-request-manage.component';
import { MealListComponent } from 'internalFlightsPages/meal/meal-list/meal-list.component';
import { MealManageComponent } from 'internalFlightsPages/meal/meal-manage/meal-manage.component';
import { FlightStatusManageComponent } from 'internalFlightsPages/flightStatus/flight-status-manage/flight-status-manage.component';
import { FlightStatusListComponent } from 'internalFlightsPages/flightStatus/flight-status-list/flight-status-list.component';
import { RoleListComponent } from 'internalFlightsPages/role/role-list/role-list.component';
import { RoleManageComponent } from 'internalFlightsPages/role/role-manage/role-manage.component';
import { RoleUserAllocationComponent } from 'internalFlightsPages/user/role-user-allocation/role-user-allocation.component';
import { RuleTypeListComponent } from 'internalFlightsPages/ruleType/rule-type-list/rule-type-list.component';
import { RuleTypeManageComponent } from 'internalFlightsPages/ruleType/rule-type-manage/rule-type-manage.component';
import { RoleAlocationComponent } from 'internalFlightsPages/role/role-allocation/role-allocation.component';
import { FlightRegisterationComponent } from 'internalFlightsPages/flightRegisteration/flight-registeration/flight-registeration.component';

import { AuthGuard } from 'app/common/Utilities/AuthGuard/auth-guard.service';

export const internalFlightsRoutes: Route[] = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'airlineholder', component: AirlineHolderListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'airlineholder/:id', component: AirlineHolderManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'airline', component: AirlineListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'airline/:id', component: AirlineManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'location/:paretnId/:locationTypeId', component: LocationListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'location/:id', component: LocationManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'airport', component: AirportListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'airport/:id', component: AirportManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'aircraft', component: AircraftListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'aircraft/:id', component: AircraftManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'faretype', component: FareTypeListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'faretype/:id', component: FareTypeManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'airlinefaretype', component: AirlineFareTypeListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'airlinefaretype/:id', component: AirlineFareTypeManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'travellertype', component: TravellerTypeListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'travellertype/:id', component: TravellerTypeManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'currency', component: CurrencyListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'currency/:id', component: CurrencyManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'cabinclasstype', component: CabinClassTypeListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'cabinclasstype/:id', component: CabinClassTypeManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'airlineroute', component: AirlineRouteListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'airlineroute/:parentId/:id', component: AirlineRouteManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'cabinclass', component: CabinClassListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'cabinclass/:id', component: CabinClassManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'flight', component: FlightListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'flight/:id', component: FlightManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'flightsschedule/:airlineRouteId', component: FlightScheduleListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'flightsschedule/:id/:airlineRouteId', component: FlightScheduleManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'baggageunit', component: BaggageUnitListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'baggageunit/:id', component: BaggageUnitManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'cabinclassactiontype', component: CabinClassActionTypeListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'cabinclassactiontype/:id', component: CabinClassActionTypeManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'user', component: UserListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'user/:id', component: UserManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'seoflightcontent', component: SeoFlightContentListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'seoflightcontent/:id', component: SeoFlightContentManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'specialservicerequest', component: SpecialServiceRequestListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'specialservicerequest/:id', component: SpecialServiceRequestManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'reservestatus', component: ReserveStatusListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'reservestatus/:id', component: ReserveStatusManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'meal', component: MealListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'meal/:id', component: MealManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'flightstatus', component: FlightStatusListComponent, pathMatch: 'full' },
    { path: 'flightstatus/:id', component: FlightStatusManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'role', component: RoleListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'role/:id', component: RoleManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'userrole/:id', component: RoleUserAllocationComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'roleaction/:id', component: RoleAlocationComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'ruletype', component: RuleTypeListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'ruletype/:id', component: RuleTypeManageComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'flightregisteration', component: FlightRegisterationComponent, pathMatch: 'full', canActivate: [AuthGuard] }
];
