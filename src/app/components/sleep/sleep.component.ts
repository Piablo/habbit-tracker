import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.component.html',
  styleUrls: ['./sleep.component.css']
})
export class SleepComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  currentDateTime(){
    var today: number = Date.now();
    var datePipe = new DatePipe('en-US');
    var myFormattedDate = datePipe.transform(today, 'EEEE, MMMM d, y, h:mm:ss');

    return myFormattedDate;
  }

  inBedTime(){
    console.log(this.currentDateTime());
  }
  stillAwake(){

  }
  outOfBed(){

  }
}
