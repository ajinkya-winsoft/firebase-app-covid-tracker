import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CovidService } from "./common/services/covid.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { StateWiseDataComponent } from './components/state-wise-data/state-wise-data.component';
import { CityWiseComponent } from './components/city-wise/city-wise.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CountryStatsComponent } from './components/dashboard/country-stats/country-stats.component';
import { TileComponent } from './common/component/tile/tile.component';
import { TreeComponent } from './components/tree/tree.component';
import { RawDataComponent } from './components/raw-data/raw-data.component';

@NgModule({
  declarations: [
    AppComponent,
    StateWiseDataComponent,
    CityWiseComponent,
    DashboardComponent,
    CountryStatsComponent,
    TileComponent,
    TreeComponent,
    RawDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [CovidService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
