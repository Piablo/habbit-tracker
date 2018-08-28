import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { TimeStampService } from '../../services/time-stamp.service';
import { Router } from '@angular/router';

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
  newTaskHolder:string;

  navigationSelector(selectorString){
    if(selectorString === 'Bible Reading'){
      this.router.navigate(['dashboard/bible-reading']);
    }else if(selectorString === 'Sleep Recorder'){
      this.router.navigate(['dashboard/sleep']);
    }
  }
  currentListOfStrings:string;

  populateListOfTasks(res){
    var value = {
      listOfStrings: ""
    }
    console.log(res);
    value = res;
    this.currentListOfStrings = value.listOfStrings;
    var listToSplit = value.listOfStrings;
    this.tasks = listToSplit.split('-');
  }
  
  ngOnInit() {

    var collectionHolder = this.afs.collection('habbits').doc('list');
    var tasks = collectionHolder.valueChanges();
    tasks.subscribe(res =>{
      console.log(res);
      this.populateListOfTasks(res);
    })

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
  newTask(){

    this.currentListOfStrings = this.newTaskHolder + "-" + this.currentListOfStrings;
    console.log(this.currentListOfStrings);

    this.afs
    .collection('habbits')
    .doc('list').set({
      'listOfStrings': this.currentListOfStrings
    })
    this.newTaskHolder = "";
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
  tasks: any[];
}
