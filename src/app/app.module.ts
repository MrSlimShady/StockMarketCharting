import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ImportFormComponent } from './components/import-form/import-form.component';
import { IpoDetailsComponent } from './components/ipo-details/ipo-details.component';
import { CompareFormComponent } from './components/compare-form/compare-form.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { AddExchangeComponent } from './components/add-exchange/add-exchange.component';
import { AddIpoComponent } from './components/add-ipo/add-ipo.component';
import { ManageCompanyComponent } from './components/manage-company/manage-company.component';
import { ManageExchangeComponent } from './components/manage-exchange/manage-exchange.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { CompareCompanyComponent } from './components/compare-company/compare-company.component';
import { CompareSectorComponent } from './components/compare-sector/compare-sector.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    NavbarComponent,
    ImportFormComponent,
    IpoDetailsComponent,
    CompareFormComponent,
    AddCompanyComponent,
    AddExchangeComponent,
    AddIpoComponent,
    ManageCompanyComponent,
    ManageExchangeComponent,
    CompareCompanyComponent,
    CompareSectorComponent,
    DialogBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FusionChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
