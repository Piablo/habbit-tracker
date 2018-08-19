import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from '../../../../node_modules/rxjs';

export interface SleepTime {
  dayNumber:number;
  inBed:String;
  outOfBed:String;
  stillAwake:String;
  sleepHours:String;
}

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.component.html',
  styleUrls: ['./sleep.component.css']
})
export class SleepComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.userCollection = this.afs.collection('habbits').doc('sleep').collection('dayNumber');
    var users = this.userCollection.valueChanges();
    users.subscribe(res =>{
      this.currentDayNumber = res.length + 1;
      this.initilizeData(res);
    })
    this.setComponentState();
  }

  userCollection:AngularFirestoreCollection;
  currentDayNumber:number = 1;
  disableInBedButton:boolean;
  sleepCollection: AngularFirestoreCollection<SleepTime>;
  sleepData: Observable<SleepTime[]>;
  sleepTimes:SleepTime[] = [];

  setComponentState(){
    var value: boolean;
    var localStorageString = localStorage.getItem('state');
    if(localStorageString === 'true'){
      this.disableInBedButton = true;
    }
  }
  initilizeData(data){
    this.sleepTimes = [];
    var listLength = data.length;
    for(var i = 0; i < listLength; i++){
      this.sleepTimes.push(data[i]);
    }
  }
  getCurrentDateTime(){
    var today: number = Date.now();
    var datePipe = new DatePipe('en-US');
    var myFormattedDate = datePipe.transform(today, 'y-M-d H:mm:ss');

    return myFormattedDate;
  }
  inBedTime(){
    var currentTimeStamp = this.getCurrentDateTime();
    var docName = this.currentDayNumber.toString();
    this.afs
    .collection('habbits')
    .doc('sleep')
    .collection('dayNumber')
    .doc(docName).set({
      'dayNumber': this.currentDayNumber,
      'inBed': currentTimeStamp
    })
    this.disableInBedButton = true;
    localStorage.setItem('state','true');
    localStorage.setItem('lastAwakeTime', currentTimeStamp);
  }
  stillAwake(){
    var currentTimeStamp = this.getCurrentDateTime();
    var docName = (this.currentDayNumber - 1).toString();
    this.afs
    .collection('habbits')
    .doc('sleep')
    .collection('dayNumber')
    .doc(docName).update({
      'stillAwake': currentTimeStamp
    })
    localStorage.setItem('lastAwakeTime', currentTimeStamp);
  }
  outOfBed(){
    var currentTimeStamp = this.getCurrentDateTime();
    var docName = (this.currentDayNumber - 1).toString();
    this.afs
    .collection('habbits')
    .doc('sleep')
    .collection('dayNumber')
    .doc(docName).update({
      'outOfBed': currentTimeStamp
    })

    this.currentDayNumber ++;
    this.disableInBedButton = false;
    localStorage.setItem('state', null);
    localStorage.setItem('awakeTime', currentTimeStamp);
  }
  handleClick(){
    var lastAwakeTime = this.sleepTimes[0].stillAwake;
    var awakeTime = this.sleepTimes[0].outOfBed; 

    console.log(lastAwakeTime);
    console.log(awakeTime);

    //localStorage.setItem('lastAwakeTime', currentTimeStamp);
  }
  calculateHours(){

  }

}
