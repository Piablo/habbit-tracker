import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from '../../../../node_modules/rxjs';
import { SleepService } from '../../services/sleep.service';
import { Router } from '@angular/router';

export interface SleepTime {
  dayNumber:number;
  inBed:String;
  outOfBed:String;
  stillAwake:String;
  sleepHours:String;
}

export interface AppState {
  timerEnabled:boolean;
}

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.component.html',
  styleUrls: ['./sleep.component.css']
})
export class SleepComponent implements OnInit {

  constructor(
    private afs: AngularFirestore,
    private sleepService: SleepService,
    private router: Router) { }

  ngOnInit() {
    this.userCollection = this.afs.collection('habbits').doc('sleep').collection('dayNumber');
    var users = this.userCollection.valueChanges();
    users.subscribe(res =>{
      this.currentDayNumber = res.length + 1;
      this.initilizeData(res);
      
    })
    this.updateComponentState();
  }

  userCollection:AngularFirestoreCollection;
  currentDayNumber:number = 1;
  sleepCollection: AngularFirestoreCollection<SleepTime>;
  sleepData: Observable<SleepTime[]>;
  sleepTimes:SleepTime[] = [];
  disableInBedButton:boolean;
  appState;
  display:boolean = false;

  updateComponentState(){
    var collection = this.afs.collection('app-state').doc('sleep');
    var state = collection.valueChanges();
    state.subscribe(res => {
      this.appState = res;
      this.disableInBedButton = this.appState.timerEnabled;
    })
  }

  setButtonState(state){
    this.afs
    .collection('app-state')
    .doc('sleep').update({
      'timerEnabled': state
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
    this.setButtonState(true);
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

  setQualityOfSleep(userSelection){
    var docName = (this.currentDayNumber - 1).toString();
    this.afs
    .collection('habbits')
    .doc('sleep')
    .collection('dayNumber')
    .doc(docName).update({
      'sleepQuality': userSelection
    })
    this.display = false;
    this.router.navigate(['dashboard/to-do']);
  }
  outOfBed(){
    var currentTimeStamp = this.getCurrentDateTime();
    localStorage.setItem('awakeTime', currentTimeStamp);

    var sleepData = {
      stillAwake: localStorage.getItem('lastAwakeTime'),
      outOfBed: localStorage.getItem('awakeTime')
    }

    var hoursOfSleep = this.sleepService.calculateSleepHours(sleepData);

    var docName = (this.currentDayNumber - 1).toString();
    this.afs
    .collection('habbits')
    .doc('sleep')
    .collection('dayNumber')
    .doc(docName).update({
      'outOfBed': currentTimeStamp
    })

    this.afs
    .collection('habbits')
    .doc('sleep')
    .collection('dayNumber')
    .doc(docName).update({
      'sleepHours': hoursOfSleep
    })

    this.currentDayNumber ++;
    this.setButtonState(false);
    localStorage.setItem('state', null);

    this.display = true;
    
  }

  tempVar = true;
  cancel(){
   this.router.navigate(['dashboard/to-do']);
    
  }

}
