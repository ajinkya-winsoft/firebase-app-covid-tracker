import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CovidService } from "../../common/services/covid.service";
import { MatTableDataSource } from '@angular/material/table';

interface data {
    state: string;
    actice: number;
    confirmed: number;
    recovered: number;
    deceased: number
}


@Component({
  selector: 'app-city-wise',
  templateUrl: './city-wise.component.html',
  styleUrls: ['./city-wise.component.scss']
})
export class CityWiseComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['state', 'active', 'confirmed', 'recovered', 'deceased'];
  coviddata:  MatTableDataSource<any>;
  isHidden: boolean = false;
  constructor(public covidService: CovidService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
      this.covidService.getStateWiseData()
        .subscribe((data) => {
            this.isHidden = false;
            let res = [];
            const states = Object.keys(data);
            for (const state of states) {
               const districts = Object.keys( data[state].districtData);
               for (const district of districts) {
                  let d = data[state].districtData[district];

                  res.push({
                      state: district,
                      confirmed: d.confirmed,
                      recovered: d.recovered,
                      active: d.active,
                      deceased: d.deceased
                  });
              }

            }
          this.coviddata = new MatTableDataSource(res);
          this.isHidden = true;
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.coviddata.filter = filterValue.trim().toLowerCase();
  }

}
