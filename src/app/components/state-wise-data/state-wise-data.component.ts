import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CovidService } from "../../common/services/covid.service";
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


interface data {
    state: string;
    actice: number;
    confirmed: number;
    recovered: number;
    deceased: number
}

@Component({
  selector: 'app-state-wise-data',
  templateUrl: './state-wise-data.component.html',
  styleUrls: ['./state-wise-data.component.css']
})
export class StateWiseDataComponent implements OnInit, AfterViewInit {
    // coviddata: any[] = [];

    coviddata:  MatTableDataSource<any>;

    constructor(public covidService: CovidService) {

    }

    ngAfterViewInit() {
        this.covidService.getStateWiseData()
          .subscribe((data) => {
              let res = [];
              console.log(data);
              const states = Object.keys(data);


              for (const state of states) {
                  // console.log(data[state]);

                 let confirmed = 0;
                 let recovered = 0;
                 let active = 0;
                 let deceased = 0;
                 const districts = Object.keys( data[state].districtData);
                 for (const district of districts) {
                    // console.log(data[state].districtData[district]);
                    let d = data[state].districtData[district];
                    confirmed = confirmed + d.confirmed;
                    recovered = recovered + d.recovered;
                    active = active + d.active;
                    deceased = deceased + d.deceased;
                }
                res.push({
                    state: state,
                    confirmed: confirmed,
                    recovered: recovered,
                    active: active,
                    deceased: deceased
                });
              }
            this.coviddata = new MatTableDataSource(res) ;
            console.log(this.coviddata);
          });
    }
    displayedColumns: string[] = ['state', 'active', 'confirmed', 'recovered', 'deceased'];
    dataSource = this.coviddata;

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);

    this.coviddata.filter = filterValue.trim().toLowerCase();
    console.log(this.coviddata.filter);

  }

}
