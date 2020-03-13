import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
import { internalFlightsRoutes } from './routes';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceAuthInterceptor } from 'app/common/Utilities/Interceptors/service-auth-interceptor';
import { AuthGuard } from 'app/common/Utilities/AuthGuard/auth-guard.service';

import { RoleAlocationComponent } from 'internalFlightsPages/role/role-allocation/role-allocation.component';
import { RoleAllocationService } from 'internalFlightsServices/role/role-allocation.service';
import { RoleService } from 'internalFlightsServices/role/role.service';
import { RoleListComponent } from 'internalFlightsPages/role/role-list/role-list.component';
import { RoleManageComponent } from 'internalFlightsPages/role/role-manage/role-manage.component';
import { RoleUserAllocationComponent } from 'internalFlightsPages/user/role-user-allocation/role-user-allocation.component';
import { AircraftService } from 'internalFlightsServices/aircraft/aircraft.service';
import { AirlineHolderService } from 'internalFlightsServices/airlineHolder/airline-holder.service';
import { AirlineHolderListComponent } from 'internalFlightsPages/airlineHolder/airline-holder-list/airline-holder-list.component';
import { AirlineHolderManageComponent } from 'internalFlightsPages/airlineHolder/airline-holder-manage/airline-holder-manage.component';
import { HomeComponent } from 'internalFlightsPages/home/home.component';
import { AirlineListComponent } from 'internalFlightsPages/airline/airline-list/airline-list.component';
import { AirlineManageComponent } from 'internalFlightsPages/airline/airline-manage/airline-manage.component';
import { LocationListComponent } from 'internalFlightsPages/location/location-list/location-list.component';
import { LocationManageComponent } from 'internalFlightsPages/location/location-manage/location-manage.component';
import { LocationService } from 'internalFlightsServices/location/location.service';
import { AirlineService } from 'internalFlightsServices/airline/airline.service';
import { AirportManageComponent } from 'internalFlightsPages/airport/airport-manage/airport-manage.component';
import { AirportListComponent } from 'internalFlightsPages/airport/airport-list/airport-list.component';
import { AirportService } from 'internalFlightsServices/airport/airport.service';
import { AircraftManageComponent } from 'internalFlightsPages/aircraft/aircraft-manage/aircraft-manage.component';
import { AircraftListComponent } from 'internalFlightsPages/aircraft/aircraft-list/aircraft-list.component';
import { FareTypeService } from 'internalFlightsServices/fareType/fare-type.service';
import { FareTypeListComponent } from 'internalFlightsPages/fareType/fare-type-list/fare-type-list.component';
import { FareTypeManageComponent } from 'internalFlightsPages/fareType/fare-type-manage/fare-type-manage.component';
import { AirlineFareTypeManageComponent } from 'internalFlightsPages/airlineFareType/airline-fare-type-manage/airline-fare-type-manage.component';
import { AirlineFareTypeListComponent } from 'internalFlightsPages/airlineFareType/airline-fare-type-list/airline-fare-type-list.component';
import { AirlineFareTypeService } from 'internalFlightsServices/airlineFareType/airline-fare-type.service';
import { TravellerTypeListComponent } from 'internalFlightsPages/travellerType/traveller-type-list/traveller-type-list.component';
import { TravellerTypeService } from 'internalFlightsServices/travellerType/traveller-type.service';
import { TravellerTypeManageComponent } from 'internalFlightsPages/travellerType/traveller-type-manage/traveller-type-manage.component';
import { CurrencyService } from 'internalFlightsServices/currency/currency.service';
import { CurrencyListComponent } from 'internalFlightsPages/currency/currency-list/currency-list.component';
import { CurrencyManageComponent } from 'internalFlightsPages/currency/currency-manage/currency-manage.component';
import { CabinClassTypeListComponent } from 'internalFlightsPages/cabinClassType/cabin-class-type-list/cabin-class-type-list.component';
import { CabinClassTypeManageComponent } from 'internalFlightsPages/cabinClassType/cabin-class-type-manage/cabin-class-type-manage.component';
import { CabinClassTypeService } from 'internalFlightsServices/cabinClassType/cabin-class-type.service';
import { AirlineRouteService } from 'internalFlightsServices/airlineRoute/airline-route.service';
import { AirlineRouteListComponent } from 'internalFlightsPages/airlineRoute/airline-route-list/airline-route-list.component';
import { AirlineRouteManageComponent } from 'internalFlightsPages/airlineRoute/airline-route-manage/airline-route-manage.component';
import { AirlineRouteListChildComponent } from 'internalFlightsPages/airlineRoute/airline-route-list-child/airline-route-list-child.component';
import { CabinClassListComponent } from 'internalFlightsPages/cabinClass/cabin-class-list/cabin-class-list.component';
import { CabinClassManageComponent } from 'internalFlightsPages/cabinClass/cabin-class-manage/cabin-class-manage.component';
import { CabinClassService } from 'internalFlightsServices/cabinClass/cabin-class.service';
import { FlightListComponent } from 'internalFlightsPages/flight/flight-list/flight-list.component';
import { FlightManageComponent } from 'internalFlightsPages/flight/flight-manage/flight-manage.component';
import { FlightService } from 'internalFlightsServices/flight/flight.service';
import { FlightScheduleManageComponent } from 'internalFlightsPages/flightSchedule/flight-schedule-manage/flight-schedule-manage.component';
import { FlightScheduleListComponent } from 'internalFlightsPages/flightSchedule/flight-schedule-list/flight-schedule-list.component';
import { FlightScheduleService } from 'internalFlightsServices/flightsSchedule/flight-schedule.service';
import { BaggageUnitListComponent } from 'internalFlightsPages/BaggageUnit/baggage-unit-list/baggage-unit-list.component';
import { BaggageUnitManageComponent } from 'internalFlightsPages/BaggageUnit/baggage-unit-manage/baggage-unit-manage.component';
import { BaggageUnitService } from 'internalFlightsServices/BaggageUnit/baggage-unit.service';
import { CabinClassActionTypeManageComponent } from 'internalFlightsPages/cabinClassActionType/cabin-class-action-type-manage/cabin-class-action-type-manage.component';
import { CabinClassActionTypeListComponent } from 'internalFlightsPages/cabinClassActionType/cabin-class-action-type-list/cabin-class-action-type-list.component';
import { CabinClassActionTypeService } from 'internalFlightsServices/CabinClassActionType/cabin-class-action-type.service';
import { UserService } from 'internalFlightsServices/user/user.service';
import { UserListComponent } from 'internalFlightsPages/user/user-list/user-list.component';
import { UserManageComponent } from 'internalFlightsPages/user/user-manage/user-manage.component';
import { SeoFlightContentListComponent } from 'internalFlightsPages/seoFlightContent/seo-flight-content-list/seo-flight-content-list.component';
import { SeoFlightContentManageComponent } from 'internalFlightsPages/seoFlightContent/seo-flight-content-manage/seo-flight-content-manage.component';
import { SeoFlightContentService } from 'internalFlightsServices/seoFlightContent/seo-flight-content.service';
import { SpecialServiceRequestListComponent } from 'internalFlightsPages/specialServiceRequest/special-service-request-list/special-service-request-list.component';
import { SpecialServiceRequestManageComponent } from 'internalFlightsPages/specialServiceRequest/special-service-request-manage/special-service-request-manage.component';
import { ReserveStatusListComponent } from 'internalFlightsPages/reserveStatus/reserve-status-list/reserve-status-list.component';
import { ReserveStatusManageComponent } from 'internalFlightsPages/reserveStatus/reserve-status-manage/reserve-status-manage.component';
import { SpecialServiceRequestService } from 'internalFlightsServices/SpecialServiceRequest/special-service-request.service';
import { ReserveStatusService } from 'internalFlightsServices/ReserveStatus/reserve-status.service';
import { FlightStatusManageComponent } from 'internalFlightsPages/flightStatus/flight-status-manage/flight-status-manage.component';
import { FlightStatusListComponent } from 'internalFlightsPages/flightStatus/flight-status-list/flight-status-list.component';
import { MealListComponent } from 'internalFlightsPages/meal/meal-list/meal-list.component';
import { MealManageComponent } from 'internalFlightsPages/meal/meal-manage/meal-manage.component';
import { MealService } from 'internalFlightsServices/meal/meal.service';
import { FlightStatusService } from 'internalFlightsServices/flightStatus/flight-status.service';
import { RuleTypeService } from 'internalFlightsServices/ruleType/rule-type.service';
import { RuleTypeListComponent } from 'internalFlightsPages/ruleType/rule-type-list/rule-type-list.component';
import { RuleTypeManageComponent } from 'internalFlightsPages/ruleType/rule-type-manage/rule-type-manage.component';
import { FlightMealManageComponent } from 'internalFlightsPages/flightMeal/flight-meal-manage/flight-meal-manage.component';
import { FlightMealListComponent } from 'internalFlightsPages/flightMeal/flight-meal-list/flight-meal-list.component';
import { FlightMealService } from 'internalFlightsServices/flightMeal/flight-meal.service';
import { FlightRegisterationComponent } from 'internalFlightsPages/flightRegisteration/flight-registeration/flight-registeration.component';

// Kendo references
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
// RTL Support
import { RTL } from '@progress/kendo-angular-l10n';
// material design references
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';

// Date picker
import { MatDatepickerModulePersian } from '@angular-persian/material-date-picker';

@NgModule({
    declarations: [
        FlightRegisterationComponent,
        RoleAlocationComponent,
        FlightMealListComponent,
        FlightMealManageComponent,
        RuleTypeListComponent,
        RuleTypeManageComponent,
        RoleUserAllocationComponent,
        RoleListComponent,
        RoleManageComponent,
        FlightStatusManageComponent,
        FlightStatusListComponent,
        MealListComponent,
        MealManageComponent,
        ReserveStatusListComponent,
        ReserveStatusManageComponent,
        SpecialServiceRequestListComponent,
        SpecialServiceRequestManageComponent,
        SeoFlightContentListComponent,
        SeoFlightContentManageComponent,
        UserListComponent,
        UserManageComponent,
        AirlineHolderListComponent,
        AirlineHolderManageComponent,
        AirlineListComponent,
        AirlineManageComponent,
        LocationListComponent,
        LocationManageComponent,
        HomeComponent,
        AircraftListComponent,
        AircraftManageComponent,
        AirportListComponent,
        AirportManageComponent,
        FareTypeListComponent,
        FareTypeManageComponent,
        AirlineFareTypeListComponent,
        AirlineFareTypeManageComponent,
        TravellerTypeListComponent,
        TravellerTypeManageComponent,
        CurrencyListComponent,
        CurrencyManageComponent,
        CabinClassTypeListComponent,
        CabinClassTypeManageComponent,
        AirlineRouteListComponent,
        AirlineRouteManageComponent,
        AirlineRouteListChildComponent,
        CabinClassListComponent,
        CabinClassManageComponent,
        FlightListComponent,
        FlightManageComponent,
        FlightScheduleListComponent,
        FlightScheduleManageComponent,
        BaggageUnitListComponent,
        BaggageUnitManageComponent,
        CabinClassActionTypeListComponent,
        CabinClassActionTypeManageComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        GridModule,
        InputsModule,
        RouterModule.forChild(internalFlightsRoutes),
        // HttpClientModule after BrowserModule.
        HttpClientModule,
        // material design
        CdkTableModule,
        CdkTreeModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        // DatePicker
        MatDatepickerModulePersian,
        // tree
        TreeViewModule
    ],
    providers: [
        FlightMealService,
        RuleTypeService,
        RoleService,
        RoleAllocationService,
        MealService,
        FlightStatusService,
        SeoFlightContentService,
        SpecialServiceRequestService,
        ReserveStatusService,
        BaggageUnitService,
        AirlineHolderService,
        CurrencyService,
        AirlineService,
        LocationService,
        AirportService,
        AircraftService,
        FareTypeService,
        AirlineFareTypeService,
        TravellerTypeService,
        CabinClassTypeService,
        AirlineRouteService,
        CabinClassService,
        FlightService,
        FlightScheduleService,
        CabinClassActionTypeService,
        UserService,
        // set RTL For kendo grid
        { provide: RTL, useValue: true },
        // Athorization and authentication
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ServiceAuthInterceptor,
            multi: true
        }
    ]
})
export class InternalFlightsModule {
    constructor() {}
}
