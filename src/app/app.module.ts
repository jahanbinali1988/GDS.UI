import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NotifierModule } from 'angular-notifier';
import { appRoutes } from './app.routes';
import { CommonModule } from '@angular/common';

import { AppComponent } from './components/app/app.component';
import { MainComponent } from './common/pages/main/main.component';
import { LoginComponent } from 'app/common/pages/login/login.component';
import { LoginService } from './common/services/login.service';

// Kendo and material design references
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// font awsome
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { NotAuthorizedComponent } from './common/pages/not-authorized/not-authorized.component';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { MainMenuComponent } from './common/pages/main-menu/main-menu.component';
import { PageNotFoundComponent } from './common/pages/page-not-found/page-not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        MainMenuComponent,
        PageNotFoundComponent,
        NotAuthorizedComponent,
        LoginComponent,
    ],
    entryComponents: [AppComponent],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule,
        NotifierModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        HttpModule,
        TreeViewModule
    ],
    providers: [
        LoginService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
