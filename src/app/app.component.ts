import { Component } from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import {FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ECOfrontend';

  constructor(private http : HttpClient) {
  }

  public fetching : boolean = false;
  public plantsData : any = [];

  handleClick($event: mapboxgl.MapMouseEvent & mapboxgl.EventData) {
    console.log($event)
    this.Lat.patchValue( $event.lngLat.lat)
    this.Long.patchValue( $event.lngLat.lng)

  }
  public Lat = new FormControl(0, [Validators.required,]);
  public Long = new FormControl(0, [Validators.required,]);
  public Raduis = new FormControl(0, [Validators.required,]);
  public Nerest = new FormControl(10, [Validators.required,]);
  data : any   = [
    [22,44],
    [2.1,2.2],
    [2.1,2.2],
    [22,44],
  ];
  data2 : any = {
    'type': 'Feature',
    'geometry': {
      'type': 'Polygon',
      'coordinates': [
        [22, 44],
        [22.1, 44.2],
        [21.1, 41.2],
        [22, 44],
      ]
    }
  };
  formatLabel(value: number) {
    if (value >= 1000) return Math.round(value/1000) + "км"

    return  value  + 'м';

  }

  getPlants() {
    this.fetching = true;
    console.log("Test")
    this.http.get<any>(`http://localhost:3300/checkPollution/${this.Lat.value}/${this.Long.value}/${this.Raduis.value}/${this.Nerest.value}`,).subscribe( response=>{
      console.log(response)
      this.plantsData = response;
      this.fetching = false;
    },
      (e)=>{
        this.fetching= false;
        console.log('erro')
      })
  }
}
