import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateWiseDataComponent } from './components/state-wise-data/state-wise-data.component';
import { CityWiseComponent } from './components/city-wise/city-wise.component';

const routes: Routes = [
    { path: 'states', component: StateWiseDataComponent },
    { path: 'cities', component: CityWiseComponent },
    { path: '**', component: StateWiseDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
