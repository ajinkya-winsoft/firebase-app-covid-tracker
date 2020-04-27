import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private http: HttpClient) { }

  getStateWiseData = () => {
       return this.http.get<any>("https://api.covid19india.org/state_district_wise.json");
  }
}
