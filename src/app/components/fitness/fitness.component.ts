import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Car {
  vin?;
  year?;
  brand?;
  color?;
  price?;
  saleDate?;
}

@Component({
  selector: 'app-fitness',
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.css']
})
export class FitnessComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCarsSmall().then(cars => this.cars = cars);
  }
  cars: Car[];

  getCarsSmall() {
    return this.http.get<any>('../../../assets/cars-small.json')
      .toPromise()
      .then(res => <Car[]>res.data)
      .then(data => { return data; });
    }


}
