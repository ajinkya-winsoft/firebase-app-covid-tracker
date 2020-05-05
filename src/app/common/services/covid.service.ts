import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, forkJoin } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private http: HttpClient) { }
  public simpleObservable = new Observable();

  getStateWiseData = () => {
       return this.http.get<any>("https://api.covid19india.org/state_district_wise.json");
  }

  getDailyStats = () => {
      return this.http.get<any>("https://api.covid19india.org/states_daily.json");
  }

  getDialyCountryStats = () => {
      return this.http.get<any>("https://api.covid19india.org/data.json");
  }

  getTree = () => {
      // return this.http.get<any>("assets/json/raw_data1.json");

      return forkJoin([this.http.get<any>("assets/json/raw_data1.json"), this.http.get<any>("assets/json/raw_data2.json")]);
  }

  getProcessedTree = () => {
      return this.http.get<any>("assets/json/processed_tree.json");
  }


}
