import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CovidService } from "./common/services/covid.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { StateWiseDataComponent } from './components/state-wise-data/state-wise-data.component';
import { CityWiseComponent } from './components/city-wise/city-wise.component';

@NgModule({
  declarations: [
    AppComponent,
    StateWiseDataComponent,
    CityWiseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [CovidService],
  bootstrap: [AppComponent]
})
export class AppModule { }
