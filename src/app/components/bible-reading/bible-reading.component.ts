import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from '../../../../node_modules/rxjs';

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

  constructor(private afs: AngularFirestore) { }

  scriptureCollection: AngularFirestoreCollection;
  
  scriptureModel: Observable<any>;
  arrayOfScriptures: ScriptureDataModel[] = [];

  lastScripture:string;
  

  ngOnInit() {
    this.scriptureCollection = this.afs.collection('habbits').doc('bibleReading').collection('dayNumber');
    this.scriptureModel = this.scriptureCollection.valueChanges();
    
    this.scriptureModel.subscribe(res =>{
      this.arrayOfScriptures = res;
      var index = this.arrayOfScriptures.length - 1;
      var tempLastScript = this.arrayOfScriptures[index].scripture.split(':');
      this.lastScripture = tempLastScript[0];
      this.lastScripture = this.lastScripture + ": " + tempLastScript[1];
      console.log(this.lastScripture);
    })

  }

}
