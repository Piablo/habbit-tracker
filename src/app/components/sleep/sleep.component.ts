import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from '../../../../node_modules/rxjs';

interface SleepData{
  dayNumber:number;
  inBed:String;
  outOfBed:String;
  stillAwake:String;
}
export interface SleepTime {
  dayNumber: number;
  inBed;
  outOfBed;
  stillAwake;
}

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.component.html',
  styleUrls: ['./sleep.component.css']
})
export class SleepComponent implements OnInit {

  constructor(private afs: AngularFirestore) { }

  userCollection:AngularFirestoreCollection;
  currentDayNumber:number = 1;
  disableInBedButton:boolean = false;
  sleepCollection: AngularFirestoreCollection<SleepData>;
  sleepData: Observable<SleepData[]>;
  sleepTimes:SleepTime[] = [];

  ngOnInit() {
    this.userCollection = this.afs.collection('habbits').doc('sleep').collection('dayNumber');
    var users = this.userCollection.valueChanges();
    users.subscribe(res =>{
      this.currentDayNumber = res.length + 1;
      this.initilizeData(res);
    })
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
  }
}
