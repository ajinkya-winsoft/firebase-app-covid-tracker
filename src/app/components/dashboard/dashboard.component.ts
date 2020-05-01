import { Component, OnInit } from '@angular/core';
import { CovidService } from "../../common/services/covid.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public chartType: string = 'line';

    public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  public data: Array<any> = [];
  public covidFianlaData: Array<any> = [
      {data: [], label: "Recovered"},
      {data: [], label: "Confirmed"},
      {data: [], label: "Deceased"},
  ]

  public label: Array<any> = [];
  public covidDate: Array<any> = [];

  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

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
                console.log(data);
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
                console.log(this.data);
                console.log(this.label);
                // const tempData = [];
                // const tempLabel =[];
                //
                // const lastData = this.covidFianlaData.pop();
                // const lastDate = this.covidDate.pop();
                //
                //  for(let i = 0; i < this.data.length; i++) {
                //     if (i % 5 === 0) {
                //         tempData.push(this.covidFianlaData[i]);
                //         tempLabel.push(this.covidDate[i]);
                //     }
                //  }
                //
                //  tempData.push(lastData);
                //  tempLabel.push(lastDate);
                // this.data = tempData;
                // this.label= tempLabel;
                // console.log(this.data);
                // console.log(this.label);

            });
    }

}
