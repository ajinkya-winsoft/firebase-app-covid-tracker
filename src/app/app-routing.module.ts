import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateWiseDataComponent } from './components/state-wise-data/state-wise-data.component';
import { CityWiseComponent } from './components/city-wise/city-wise.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TreeComponent } from './components/tree/tree.component';
import { RawDataComponent } from './components/raw-data/raw-data.component';
import { LockdownSummaryComponent } from './components/lockdown-summary/lockdown-summary.component';

const routes: Routes = [
    { path: 'states', component: StateWiseDataComponent },
    { path: 'cities', component: CityWiseComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'tree', component: TreeComponent },
    { path: 'raw-data', component: RawDataComponent },
    { path: 'summary', component: LockdownSummaryComponent },
    { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
