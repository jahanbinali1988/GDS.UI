import { MainComponent } from './common/pages/main/main.component';
import { PageNotFoundComponent } from './common/pages/page-not-found/page-not-found.component';
import { NotAuthorizedComponent } from './common/pages/not-authorized/not-authorized.component';
import { LoginComponent } from 'app/common/pages/login/login.component';

export const appRoutes = [
{ path: '', component: MainComponent },
{ path: 'internalFlights', loadChildren: '@modules/internalFlights/module#InternalFlightsModule' },
{ path: 'flights', loadChildren: '@modules/flights/module#FlightsModule' },
{ path: 'login', component: LoginComponent },
{ path: 'NotAuthorized', component: NotAuthorizedComponent },
{ path: '**', component: PageNotFoundComponent }
];
