import { Component, OnInit } from '@angular/core';
import { CovidService } from "../../common/services/covid.service";

@Component({
  selector: 'app-lockdown-summary',
  templateUrl: './lockdown-summary.component.html',
  styleUrls: ['./lockdown-summary.component.css']
})
export class LockdownSummaryComponent implements OnInit {

    constructor(public covidService: CovidService) {}

  public chartType: string = 'line';

  public data: Array<any> = [];
  public dailyData: Array<any> = [];
  // public covidFianlaData: Array<any> = [
  //   {data: [], label: "Pre Lockdown Phase"}, 40, 571, 10
  //   {data: [], label: "First Lockdown - 21 days (25 March – 14 April)"}, 1365, 11485, 396
  //   {data: [], label: "Second Lockdown - Extension (15 April – 3 May)"}, 11763, 42778, 1463
  //   {data: [], label: "Third Lockdown - Additional extension (4 May – 17 May)"},12845, 46434, 1566
  // ];

  public covidFianlaData: Array<any> = [
      {data: [], label: "Recovered"},
      {data: [], label: "Confirmed"},
      {data: [], label: "Deceased"},
  ];

  public covidDailyData: Array<any> = [
    {data: [], label: "Recovered"},
    {data: [], label: "Confirmed"},
    {data: [], label: "Deceased"},
  ];

  public label: Array<any> = [];
  public covidDate: Array<any> = [];
  public chartReady: boolean = false;

  public percentRecovered: number = 0;


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

  ngOnInit(): void {
      this.covidService.getDialyCountryStats()
          .subscribe((d) => {
              this.chartReady = false;

               const arr: any[] = d.cases_time_series;
               console.log(arr[55]);
               // Pre Lockdown Phase
               let totalrecovered = parseInt(arr[54].totalrecovered);
               let totalconfirmed = parseInt(arr[54].totalconfirmed);
               let totaldeceased = parseInt(arr[54].totaldeceased);
               this.covidFianlaData[0].data.push(totalrecovered);
               this.covidFianlaData[1].data.push(totalconfirmed);
               this.covidFianlaData[2].data.push(totaldeceased);
               this.covidDate.push("Pre Lockdown");

                // First Lockdown - 21 days (25 March – 14 April)
                const recoveredInFirstPhase = parseInt(arr[54+21].totalrecovered) - totalrecovered;
                const confirmedInFirstPhase = parseInt(arr[54+21].totalconfirmed) - totalconfirmed;
                const deceasedInFirstPhase = parseInt(arr[54+21].totaldeceased) - totaldeceased;
                this.covidFianlaData[0].data.push(recoveredInFirstPhase);
                this.covidFianlaData[1].data.push(confirmedInFirstPhase);
                this.covidFianlaData[2].data.push(deceasedInFirstPhase);
                this.covidDate.push("First 21 days");
                totalrecovered = parseInt(arr[54+21].totalrecovered);
                totalconfirmed = parseInt(arr[54+21].totalconfirmed);
                totaldeceased = parseInt(arr[54+21].totaldeceased);

                // Second Lockdown - Extension (15 April – 3 May)
                 this.covidFianlaData[0].data.push(parseInt(arr[54+21+19].totalrecovered) - totalrecovered);
                 this.covidFianlaData[1].data.push(parseInt(arr[54+21+19].totalconfirmed) - totalconfirmed);
                 this.covidFianlaData[2].data.push(parseInt(arr[54+21+19].totaldeceased) - totaldeceased);
                 this.covidDate.push("15 April – 3 May");
                 totalrecovered = parseInt(arr[54+21+19].totalrecovered);
                 totalconfirmed = parseInt(arr[54+21+19].totalconfirmed);
                 totaldeceased = parseInt(arr[54+21+19].totaldeceased);


                 // Third Lockdown - Additional extension (4 May – 17 May)
                  this.covidFianlaData[0].data.push(parseInt(arr[arr.length-1].totalrecovered) - totalrecovered);
                  this.covidFianlaData[1].data.push(parseInt(arr[arr.length-1].totalconfirmed) - totalconfirmed);
                  this.covidFianlaData[2].data.push(parseInt(arr[arr.length-1].totaldeceased) - totaldeceased);
                  this.covidDate.push("In progress");

                  const lastRecord = arr.pop();
                  this.percentRecovered = Math.round((recoveredInFirstPhase)/parseInt(lastRecord.totalrecovered)*100);

              //
              // // console.log(arr);
              // const dd = arr.slice(55+21+19, arr.length);
              // dd.forEach(data => {
              //     this.covidFianlaData[0].data.push(parseInt(data.totalrecovered));
              //     this.covidFianlaData[1].data.push(parseInt(data.totalconfirmed));
              //     this.covidFianlaData[2].data.push(parseInt(data.totaldeceased));
              //     this.covidDate.push(data.date);
              //
              //     this.covidDailyData[0].data.push(parseInt(data.dailyrecovered));
              //     this.covidDailyData[1].data.push(parseInt(data.dailyconfirmed));
              //     this.covidDailyData[2].data.push(parseInt(data.dailydeceased));
              //
              //
              // });
              // this.covidFianlaData[0].data.splice(this.covidFianlaData[0].data.length-30, this.covidFianlaData[0].data.length);
              // this.covidFianlaData[1].data.splice(this.covidFianlaData[1].data.length-30, this.covidFianlaData[1].data.length);
              // this.covidFianlaData[2].data.splice(this.covidFianlaData[2].data.length-30, this.covidFianlaData[2].data.length);
              //
              // this.covidDailyData[0].data.splice(this.covidDailyData[0].data.length-30, this.covidDailyData[0].data.length);
              // this.covidDailyData[1].data.splice(this.covidDailyData[1].data.length-30, this.covidDailyData[1].data.length);
              // this.covidDailyData[2].data.splice(this.covidDailyData[2].data.length-30, this.covidDailyData[2].data.length);
              //
              // this.covidDate = this.covidDate.slice(this.covidDate.length-30, this.covidDate.length);
              // this.splice[1].slice(this.covidDate[1].length-30, this.covidDate[1].length);
              // this.covidDate[2].slice(this.covidDate[2].length-30, this.covidDate[2].length);

              this.data = this.covidFianlaData;
              this.dailyData = this.covidDailyData;
              this.label = this.covidDate;

              // console.log();

              this.chartReady = true;
          });
  }

}
