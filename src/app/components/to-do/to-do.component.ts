import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { TimeStampService } from '../../services/time-stamp.service';
import { Router } from '@angular/router';
import { debug } from 'util';

interface TimeStamp {
  timeStampString:string;
}

interface TimeModel{
  hours:number[];
  mins:number[];
  seconds:number[];
}

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})

export class ToDoComponent implements OnInit {
  
  constructor(private router: Router, private afs: AngularFirestore, private timeStampService: TimeStampService) { }

  timeRecorder: AngularFirestoreDocument;
  timeStamp: any;
  timeModel:TimeModel[] = [];
  
  ngOnInit() {
    this.tasks = [
      { vin: 'Record sleep data:', header: 'Vin' },
    ];

    this.timeRecorder = this.afs.collection('stats').doc('sleepRecorder');
    var sleepRecorder = this.timeRecorder.valueChanges();
    sleepRecorder.subscribe(res =>{
      this.timeStamp = res;
      var temp = this.timeStampService.getCurrentDateTime();
      //Testing data

      var value = [];
      value.push("22:50:47");
      value.push("22:45:59");
      value.push("22:30:34");

      value = this.timeStringToNumber(value);
      this.calculateAverage(value);
    })
  }

  openBibleReading(){
    this.router.navigate(['dashboard/bible-reading']);
  }

  timeStringToNumber(timeStringArray){
    var value;
    var returnValue = [];

    var listLength = timeStringArray.length;
    for(var i = 0; i < listLength;i++){
      var tempValue = timeStringArray[i].split(":");
      var value:any = {
        hours:parseInt(tempValue[0]),
        mins:parseInt(tempValue[1]),
        seconds:parseInt(tempValue[2])
      }
      returnValue.push(value);
    }
    return returnValue;
  }

  calculateAverage(timeStampArray){
    var listLength = timeStampArray.length;
    var sumOfSeconds:number = 0;
    var sumOfMins:number = 0;
    var SumOfHours:number = 0;

    for(var i = 0; i < listLength; i++){
      sumOfSeconds = sumOfSeconds + timeStampArray[i].seconds;
      sumOfMins = sumOfMins + timeStampArray[i].mins;
      SumOfHours = SumOfHours + timeStampArray[i].hours;
    }
    sumOfSeconds = sumOfSeconds / listLength;
    sumOfMins = sumOfMins / listLength;
    SumOfHours = SumOfHours / listLength;
  }

  openSleep(){
    this.saveClickTime();
    this.router.navigate(['dashboard/sleep']);
  }
  saveClickTime(){

  }
  
  tasks: any[];
  
}
