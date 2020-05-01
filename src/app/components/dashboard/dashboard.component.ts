import { Component, OnInit } from '@angular/core';
import { CovidService } from "../../common/services/covid.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public chartType: string = 'line';

  public data: Array<any> = [];
  public covidFianlaData: Array<any> = [
      {data: [], label: "Recovered"},
      {data: [], label: "Confirmed"},
      {data: [], label: "Deceased"},
  ]

  public label: Array<any> = [];
  public covidDate: Array<any> = [];

  public chartColors: Array<any> = [
      {
        backgroundColor: 'rgba(153, 255, 51, .2)',
        borderColor: 'rgba(59, 97, 20, .7)',
        borderWidth: 2,
      },
      {
        backgroundColor: 'rgba(0, 137, 132, .2)',
        borderColor: 'rgba(0, 10, 130, .7)',
        borderWidth: 2,
    },
    {
        backgroundColor: 'rgba(105, 0, 132, .2)',
        borderColor: 'rgba(200, 99, 132, .7)',
        borderWidth: 2,
    }
    ];

    public chartOptions: any = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
            xAxes: [{
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10
                },
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: true,
                    lineWidth: 0.3
                }
            }]
        },
        elements: { point: { radius: 0 } }
    };
    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }

    constructor(public covidService: CovidService) {}

    ngOnInit(): void {
        this.covidService.getDailyStats()
            .subscribe((data) => {
                let counter = 0;
                data.states_daily.forEach(d => {
                    const states = Object.keys(d);
                    let count = 0;
                    for (const state of states) {
                        if (state === 'date' || state === 'status') {
                            continue;
                        }
                        count = count + parseInt(d[state]);
                    }
                    if (d['status'] === 'Recovered') {
                        this.covidFianlaData[0].data.push(count);
                    }
                    if (d['status'] === 'Confirmed') {
                        this.covidFianlaData[1].data.push(count);
                    }
                    if (d['status'] === 'Deceased') {
                        this.covidFianlaData[2].data.push(count);
                    }

                    if(this.covidDate.indexOf(d['date']) === -1) {
                        this.covidDate.push(d['date']);
                    }

                });
                this.data = this.covidFianlaData;
                this.label = this.covidDate;
            });
    }

}
