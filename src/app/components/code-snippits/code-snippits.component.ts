import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from '../../../../node_modules/rxjs';

interface Tag{
  fullList:string;
}

@Component({
  selector: 'app-code-snippits',
  templateUrl: './code-snippits.component.html',
  styleUrls: ['./code-snippits.component.css']
})
export class CodeSnippitsComponent implements OnInit {
  
  constructor(private afs: AngularFirestore) { }
  ngOnInit() {
    this.tagCollection = this.afs.collection('code-snippits').doc('tags');
    this.tagString = this.tagCollection.valueChanges();
    
    this.tagString.subscribe(res =>{
      this.tags = res.fullList.split(" ");
      this.tags = this.convertToTagModel(this.tags);
    })
  }
  
  tags:any[] = [];
  tagCollection: AngularFirestoreDocument<Tag>;
  tagString: Observable<Tag>;
  tagList: any;
  filteredTags: any[];
  
  convertToTagModel(arrayOfTags){
    var value:any[] = [];
    var listLength = arrayOfTags.length;
    for(var i = 0; i < listLength; i++){
      var temp = {
        name: arrayOfTags[i]
      }
      value.push(temp);
    }
    return value;
  }
  
  filterTagSingle(event) {
    let query = event.query;
    this.filteredTags = this.filterTag(query, this.tags);
  }
  
  filterTag(query, tags: any[]):any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    for(let i = 0; i < tags.length; i++) {
      let tag = tags[i];
      if(tag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(tag);
      }
    }
    return filtered;
  }
}
