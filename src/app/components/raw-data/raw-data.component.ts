import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CovidService } from "../../common/services/covid.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-raw-data',
  templateUrl: './raw-data.component.html',
  styleUrls: ['./raw-data.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class RawDataComponent implements OnInit, AfterViewInit {
    public columnsToDisplay : string[] = ['patientnumber', 'agebracket', 'currentstatus', 'typeoftransmission', 'detecteddistrict'];
    public dataSource = new MatTableDataSource<any>();
    expandedElement: any | null;
    public isHidden: boolean = false;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private covidService: CovidService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.covidService.getTree()
          .subscribe(res => {
              this.isHidden = false;
               const data = res[0].raw_data.concat(res[1].raw_data);
              console.log(data[0]);
              this.dataSource = data.slice(0, 200);
              this.isHidden = true;
          })
  }

  getStyle (status) {
      if (status === 'Recovered') {
          return 'positive';
      } else if (status === 'Hospitalized') {
          return 'neutral';
      } else if (status === 'Deceased') {
          return 'negative';
      }
  }

}
