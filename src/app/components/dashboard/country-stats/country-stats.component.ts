import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CovidService } from "../../../common/services/covid.service";
import WAVES from 'vanta/dist/vanta.waves.min';

@Component({
  selector: 'app-country-stats',
  templateUrl: './country-stats.component.html',
  styleUrls: ['./country-stats.component.css']
})
export class CountryStatsComponent implements OnInit, AfterViewInit {
    public latestData: any = {};

    constructor(private covidService: CovidService) {
      this.latestData.data = new Date();
    }

    ngAfterViewInit() {
        // BIRDS({
        //     el: "#vantajs",
        //     mouseControls: true,
        //     touchControls: true,
        //     minHeight: 200.00,
        //     minWidth: 200.00,
        //     scale: 1.00,
        //     scaleMobile: 1.00,
        //     backgroundColor: 0xffffff
        // });
    }

  ngOnInit(): void {
        // GLOBE({
        //     el: "#vantajs",
        //     mouseControls: true,
        //     touchControls: true,
        //     minHeight: 200.00,
        //     minWidth: 200.00,
        //     scale: 1.00,
        //     scaleMobile: 1.00,
        //     points: 5.00,
        //     maxDistance: 17.00,
        //     spacing: 11.00
        // })
        //
        // GLOBE({
        //     el: "#vantajs",
        //     mouseControls: true,
        //     touchControls: true,
        //     minHeight: 200.00,
        //     minWidth: 200.00,
        //     scale: 1.00,
        //     scaleMobile: 1.00,
        //     color2: 0xb91274,
        //     backgroundColor: 0xf9f8fc
        // })

        // DOTS({
        //     el: "#vantajs",
        //     mouseControls: true,
        //     touchControls: true,
        //     minHeight: 200.00,
        //     minWidth: 200.00,
        //     scale: 1.00,
        //     scaleMobile: 1.00
        // })




        WAVES({
            el: "#vantajs",
            mouseControls: true,
            touchControls: true,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0xffffff
        })


      this.covidService.getDialyCountryStats()
          .subscribe((data) => {
              const {cases_time_series} = data;
              this.latestData = cases_time_series.pop();

              const active = parseInt(this.latestData.totalconfirmed) - (parseInt(this.latestData.totalrecovered) + parseInt(this.latestData.totaldeceased));
              this.latestData["active"] = active;
          });


  }

}
