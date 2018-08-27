import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from '../../../../node_modules/rxjs';
import { Router } from '@angular/router';
import { TimeStampService } from '../../services/time-stamp.service';

interface ScriptureDataModel {
  endTime:string;
  startTime:string;
  scripture:string;
}

@Component({
  selector: 'app-bible-reading',
  templateUrl: './bible-reading.component.html',
  styleUrls: ['./bible-reading.component.css']
})
export class BibleReadingComponent implements OnInit {
  
  constructor(private afs: AngularFirestore, private router: Router, private timeStamp: TimeStampService) { }
  
  scriptureCollection: AngularFirestoreCollection;
  bibleBooksCollection: AngularFirestoreCollection;
  
  scriptureModel: Observable<any>;
  bibleBooks: Observable<any>;
  
  arrayOfScriptures: ScriptureDataModel[] = [];
  
  lastScripture:string;
  docName:string;
  
  ngOnInit() {
    this.scriptureCollection = this.afs.collection('habbits').doc('bibleReading').collection('dayNumber');
    this.scriptureModel = this.scriptureCollection.valueChanges();
    
    this.scriptureModel.subscribe(res =>{
      this.arrayOfScriptures = res;
      this.docName = (this.arrayOfScriptures.length + 1).toString();
      var index = this.arrayOfScriptures.length - 1;
      var tempLastScript = this.arrayOfScriptures[index].scripture.split(':');
      this.lastScripture = tempLastScript[0];
      this.lastScripture = this.lastScripture + ": " + tempLastScript[1];
      console.log(this.lastScripture);
    })
    
    this.bibleBooksCollection = this.afs.collection('habbits').doc('bibleReading').collection('booksList');
    this.bibleBooks = this.bibleBooksCollection.valueChanges();
    
    this.bibleBooks.subscribe(res =>{
      this.arrayOfScriptures = res;
      console.log('this guy');
      var stringToSplit = res[0].books;
      this.listOfBooks = stringToSplit.split('-');
      console.log(this.listOfBooks);
    })

    this.readingCollection = this.afs.collection('habbits').doc('bibleReading').collection('dayNumber');
    this.readings = this.readingCollection.valueChanges();
    
    this.readings.subscribe(res =>{
      this.arrayOfScriptures = res;
      console.log('this guy');
      console.log(res);
      this.scriptureData = res;
    })
  }

  scriptureData:any[] = [];

  readingCollection:AngularFirestoreCollection;
  readings: Observable<any>;

  saveScripture(){
    console.log(this.book);
    console.log(this.chapter);
    var stringToSave = this.book + ":" + this.chapter;
    

    this.afs
    .collection('habbits')
    .doc('bibleReading')
    .collection('dayNumber')
    .doc(this.docName)
    .set({
      'scripture': stringToSave
    })
    this.showAddScripture = false;
    this.showSaveStartTime = true;

    //this.router.navigate(['dashboard/to-do']);
  }

  currentTimeStamp:string;

  saveStartTime(){
    this.currentTimeStamp = this.timeStamp.getCurrentDateTime();
    var documentName = parseInt(this.docName);
    documentName = documentName - 1;

    this.afs
    .collection('habbits')
    .doc('bibleReading')
    .collection('dayNumber')
    .doc(documentName.toString())
    .update({
      'startTime': this.currentTimeStamp
    })
    this.showSaveStartTime = false;
    this.showSaveFinishTime = true;
  }

  saveFinishTime(){
    this.currentTimeStamp = this.timeStamp.getCurrentDateTime();
    var documentName = parseInt(this.docName);
    documentName = documentName - 1;

    this.afs
    .collection('habbits')
    .doc('bibleReading')
    .collection('dayNumber')
    .doc(documentName.toString())
    .update({
      'finishTime': this.currentTimeStamp
    })
    this.router.navigate(['dashboard/to-do']);
  }

  showAddScripture:boolean = true;
  showSaveStartTime:boolean = false;
  showSaveFinishTime:boolean = false;
  
  listOfBooks:any[] = [];
  country: any;
  filteredCountriesSingle: any[];
  chapter:string;
  book:string;
  
  filterCountrySingle(event) {
    let query = event.query;
    
    this.filteredCountriesSingle = this.filterCountry(query, this.listOfBooks);
  }
  filterCountry(query, countries: any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    for(let i = 0; i < countries.length; i++) {
      let country = countries[i];
      if(country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }
  
  
}
